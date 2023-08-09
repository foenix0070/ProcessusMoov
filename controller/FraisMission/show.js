var showFraisMission = showFraisMission || {};
var clientContext;
showFraisMission.clientContext;
showFraisMission.isSoldeImpact = 0;

showFraisMission.InitializePage = function () {
  showFraisMission.clientContext = SP.ClientContext.get_current();
  clientContext = SP.ClientContext.get_current();

  let tacheId = appHelper.GetQueryStringFromAjaxQuery('tacheid');
  let Id = appHelper.GetQueryStringFromAjaxQuery('id');

  appSpHelper.CheckAttachmentFolder(showFraisMission.clientContext, Id, appHelper.ListName.Mission, null);

  appSpHelper.GetMyProperties(function () {
    showFraisMission.ShowDetails(Id);
    showFraisMission.ShowFichierJoint(Id);
    showFraisMission.ShowValidation(Id);
    if (tacheId) {
      showFraisMission.TestShowForm(tacheId, Id);
    }
  });
}

showFraisMission.TestShowForm = function (tacheId, demandeid) {
  let oList = clientContext.get_web().get_lists().getByTitle(appHelper.ListName.Validation);
  let It = oList.getItemById(tacheId);
  clientContext.load(It);
  clientContext.executeQueryAsync(function () {
    if (It.get_item('Status') == "En cours") {
      showFraisMission.ShowForm(tacheId, demandeid);
    }
  }, appSpHelper.writeError);
}

showFraisMission.ShowForm = function (tacheId, demandeid) {

  let view = {};
  view.did = demandeid;
  view.tid = tacheId;
  view.process = appHelper.AppCode.MISSION;
  appHelper.renderTemplate("tmpl_form_validation", "SectionValidation", view);

  const TxtCommentaire = document.getElementById("TxtCommentaire");
  const BtnMod = document.getElementById("BtnValidationModification");
  const BtnOK = document.getElementById("BtnValidationOK");
  const BtnNOK = document.getElementById("BtnValidationNOK");
  const WF = new WFManager(appHelper.AppCode.MISSION, appHelper.AppConstante.SiteUrl, appHelper.ListName.Validation, ACTIV_WORKFLOW);

  BtnOK.addEventListener("click", function () {
    WF.goToNextTask(showFraisMission.clientContext, tacheId, appHelper.AppCode.MISSION, demandeid, TxtCommentaire.value, function (nextTask) {
      console.log(nextTask);
      showFraisMission.UpDateItemStatus(nextTask, demandeid, function () {
        location.reload();
      });
    });
  });

  BtnNOK.addEventListener("click", function () {
    WF.goToRefusedTask(showFraisMission.clientContext, tacheId, appHelper.AppCode.MISSION, demandeid, TxtCommentaire.value, function (nextTask) {
      console.log(nextTask);
      showFraisMission.UpDateItemStatusRejet(true, demandeid, function () {
        location.reload();
      });
    });
  });

  BtnMod.addEventListener("click", function () {
    WF.goToRefusedTask(showFraisMission.clientContext, tacheId, appHelper.AppCode.MISSION, demandeid, TxtCommentaire.value, function (nextTask) {
      console.log(nextTask);
      showFraisMission.UpDateItemStatusRejet(false, demandeid, function () {
        location.reload();
      });
    });
  });
}

showFraisMission.UpDateItemStatusRejet = function (isRejet, demandeid, callBack) {

  let oList = clientContext.get_web().get_lists().getByTitle(appHelper.ListName.Mission);
  let It = oList.getItemById(demandeid);

  if (isRejet) {
    It.set_item("Statut", "REJETEE");
    It.set_item("StatutLibelle", 'Demande rejetée');
  } else {
    It.set_item("Statut", "DEMANDEMODIFICATION");
    It.set_item("StatutLibelle", 'Demande renvoyée pour modification');
  }
  It.update();
  clientContext.load(It);
  clientContext.executeQueryAsync(function () {
    if (callBack) {
      callBack();
    }
  }, appSpHelper.writeError);

}

showFraisMission.UpDateItemStatus = function (nextTask, demandeid, callBack) {
  let oList = clientContext.get_web().get_lists().getByTitle(appHelper.ListName.Mission);
  let It = oList.getItemById(demandeid);

  if (nextTask) {
    It.set_item("Statut", "ENCOURS");
    It.set_item("StatutLibelle", nextTask.get_item('Title'));
  } else {
    It.set_item("Statut", "VALIDEE");
    It.set_item("StatutLibelle", "DEMANDE APPROUVEE");
  }
  It.update();
  clientContext.load(It);
  clientContext.executeQueryAsync(function () {
    if (callBack) {
      callBack();
    }
  }, appSpHelper.writeError);
}



showFraisMission.ShowFichierJoint = function (demandeid) {

  let view = {};

  let appName = appHelper.ListName.Mission;
  let id = demandeid;
  let folderPath = `/Lists/${appName}/Attachments/${id}/`;
  console.log(folderPath);
  let attachmentFolder = clientContext.get_web().getFolderByServerRelativeUrl(folderPath);
  let attachmentFiles = attachmentFolder.get_files();
  clientContext.load(attachmentFiles);
  clientContext.executeQueryAsync(function () {
    if (attachmentFiles) {
      if (attachmentFiles.get_count() > 0) {
        console.log('111');
        view.fichiers = [];

        for (var i = 0; i < attachmentFiles.get_count(); i++) {
          view.fichiers.push({
            nom: attachmentFiles.itemAt(i).get_name(),
            dateajout: new Date(attachmentFiles.itemAt(i).get_timeLastModified()).toLocaleString(), //   new Date( attachmentFiles.itemAt(i).get_timeLastModified ()).toLocaleDateString() + ' ' +
            taille: appHelper.ConvertOctetToKo(attachmentFiles.itemAt(i).get_length()),
            auteur: attachmentFiles.itemAt(i).get_author(),
            url: appHelper.AppConstante.SiteUrl + '/' + attachmentFiles.itemAt(i).get_serverRelativeUrl()
          });
        }
        showFraisMission.ShowUploadForm(demandeid, view);

      } else {
        view.fichiers = [];
        showFraisMission.ShowUploadForm(demandeid, view);
      }
    }
  },

    function () {
      view.fichiers = [];
      showFraisMission.ShowUploadForm(demandeid, view);
    });
}

showFraisMission.ShowUploadForm = function (demandeid, view) {
  appHelper.renderTemplate("tmpl_form_fichiers_attaches", "SectionDocumentsJoint", view);
  let FpUploadAttachement = document.getElementById('FpUploadAttachement');
  FpUploadAttachement.addEventListener('change', (e) => {
    files = e.target.files;
    for (const file of files) {
      let reader = new FileReader();
      reader.onload = function (e) {
        showFraisMission.AttachFile(demandeid, e.target.result, file.name)
      }
      reader.onerror = function (e) {
        console.log(e.target.error);
      }
      reader.readAsArrayBuffer(file);
    }
  });
}

showFraisMission.AttachFile = function (demandeid, arrayBuffer, fileName) {

  //Get Client Context and Web object.
  var oWeb = clientContext.get_web();
  //Get list and Attachment folder where the attachment of a particular list item is stored.
  var oList = oWeb.get_lists().getByTitle(appHelper.ListName.Mission);
  var urlToAttach = '/Lists/' + appHelper.ListName.Mission + '/Attachments/' + demandeid + '/'
  var attachmentFolder = oWeb.getFolderByServerRelativeUrl(urlToAttach);
  console.log(attachmentFolder);
  //Convert the file contents into base64 data
  var bytes = new Uint8Array(arrayBuffer);
  var i, length, out = '';
  for (i = 0, length = bytes.length; i < length; i += 1) {
    out += String.fromCharCode(bytes[i]);
  }
  var base64 = btoa(out);
  //Create FileCreationInformation object using the read file data
  createInfo = new SP.FileCreationInformation();
  createInfo.set_content(base64);
  createInfo.set_url(fileName);

  //Add the file to the list item
  attachmentFiles = attachmentFolder.get_files().add(createInfo);
  //Load client context and execute the batch
  clientContext.load(oList);
  clientContext.load(attachmentFiles);
  clientContext.executeQueryAsync(function () {
    showFraisMission.ShowFichierJoint(demandeid);
  }, appSpHelper.writeError);

};

showFraisMission.ShowValidation = function (demandeid) {
  let view = {};

  let oList = showFraisMission.clientContext.get_web().get_lists().getByTitle(appHelper.ListName.Validation);
  var QryGetNextOne = '<View>' +
    '<Query>' +
    '<Where>' +
    '<And>' +
    '<And>' +
    '<Eq><FieldRef Name="Parent" /><Value Type="Text">' + appHelper.AppCode.MISSION + '</Value></Eq>' +
    '<Eq><FieldRef Name="ParentID0" /><Value Type="Text">' + demandeid + '</Value></Eq>' +
    '</And>' +
    '<Eq><FieldRef Name="Status" /><Value Type="Choice">Terminé</Value></Eq>' +
    '</And>' +
    '</Where>' +
    '</Query>' +
    '</View>';

  let camlQuery = new SP.CamlQuery();
  camlQuery.set_viewXml(QryGetNextOne);
  let collListItem = oList.getItems(camlQuery);
  showFraisMission.clientContext.load(collListItem);
  showFraisMission.clientContext.executeQueryAsync(function (sender, args) {

    if (collListItem.get_count() > 0) {
      var listItemEnumerator = collListItem.getEnumerator();
      let view = {};
      view.historique = [];
      while (listItemEnumerator.moveNext()) {
        var oListItem = listItemEnumerator.get_current();

        view.historique.push({
          auteur: '',
          dateaction: '',
          decision: '',
          commentaire: oListItem.get_item('_Comment') != null ? oListItem.get_item('_Comment').toString() : ''
          //etat: It.get_item('StatutLibelle') != null ? It.get_item('StatutLibelle') : ''
        });
      }
      appHelper.renderTemplate("tmpl_form_historique_validation", "SectionHistoriqueValidation", view);
    }




  }, appSpHelper.writeError);


}

showFraisMission.ShowDetails = function (demandeid) {

  let oList = showFraisMission.clientContext.get_web().get_lists().getByTitle(appHelper.ListName.Mission);
  let It = oList.getItemById(demandeid);

  showFraisMission.clientContext.load(It);
  showFraisMission.clientContext.executeQueryAsync(function () {
    if (It) {
      let view = {
        title: It.get_item('Title') != null ? It.get_item('Title') : '',
        datedepart: It.get_item('DateDebut') != null ? new Date(It.get_item('DateDebut')).toLocaleDateString() : '',
        dateretour: It.get_item('DateFin') != null ? It.get_item('DateFin').toLocaleDateString() : '',
        motif: It.get_item('Motif') != null ? It.get_item('Motif') : '',
        destination: It.get_item('Destination') != null ? It.get_item('Destination') : '',
        cout: It.get_item('CoutTotal') != null ? It.get_item('CoutTotal') : '',
        etat: It.get_item('StatutLibelle') != null ? It.get_item('StatutLibelle') : ''
      };
      appHelper.renderTemplate("tmpl_form_details", "SectionDetails", view);

    }
  }, appSpHelper.writeError);
}

SP.SOD.executeFunc('sp.js', 'SP.ClientContext', showFraisMission.InitializePage);

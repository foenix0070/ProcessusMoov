var showMateriel = showMateriel || {};
var clientContext;
showMateriel.clientContext;
showMateriel.isSoldeImpact = 0;

showMateriel.InitializePage = function () {
  showMateriel.clientContext = SP.ClientContext.get_current();
  clientContext = SP.ClientContext.get_current();

  let tacheId = appHelper.getQueryStringParameter('tacheid');
  let Id = appHelper.getQueryStringParameter('id');

  appSpHelper.CheckAttachmentFolder(showMateriel.clientContext, Id, appHelper.ListName.Materiel, null);

  appSpHelper.GetMyProperties(function () {
    showMateriel.ShowDetails(Id);
    showMateriel.ShowFichierJoint(Id);
    showMateriel.ShowValidation(Id);
    if (tacheId) {
      showMateriel.TestShowForm(tacheId, Id);
    }
  });
}

showMateriel.TestShowForm = function (tacheId, demandeid) {
  let oList = clientContext.get_web().get_lists().getByTitle(appHelper.ListName.Validation);
  let It = oList.getItemById(tacheId);
  clientContext.load(It);
  clientContext.executeQueryAsync(function () {
    if (It.get_item('Status') == "En cours") {
      showMateriel.ShowForm(tacheId, demandeid);
    }
  }, appSpHelper.writeError);
}

showMateriel.ShowForm = function (tacheId, demandeid) {

  let view = {};
  view.did = demandeid;
  view.tid = tacheId;
  view.process = appHelper.AppCode.MATERIEL;
  appHelper.renderTemplate("tmpl_form_validation", "SectionValidation", view);

  const TxtCommentaire = document.getElementById("TxtCommentaire");
  const BtnMod = document.getElementById("BtnValidationModification");
  const BtnOK = document.getElementById("BtnValidationOK");
  const BtnNOK = document.getElementById("BtnValidationNOK");
  const WF = new WFManager(appHelper.AppCode.MATERIEL, appHelper.AppConstante.SiteUrl, appHelper.ListName.Validation, ACTIV_WORKFLOW);

  BtnOK.addEventListener("click", function () {
    WF.goToNextTask(showMateriel.clientContext, tacheId, appHelper.AppCode.MATERIEL, demandeid, TxtCommentaire.value, function (nextTask) {
      console.log(nextTask);
      showMateriel.UpDateItemStatus(nextTask, demandeid, function () {
        location.reload();
      });
    });
  });

  BtnNOK.addEventListener("click", function () {
    WF.goToRefusedTask(showMateriel.clientContext, tacheId, appHelper.AppCode.MATERIEL, demandeid, TxtCommentaire.value, function (nextTask) {
      console.log(nextTask);
      showMateriel.UpDateItemStatusRejet(true, demandeid, function () {
        location.reload();
      });
    });
  });

  BtnMod.addEventListener("click", function () {
    WF.goToRefusedTask(showMateriel.clientContext, tacheId, appHelper.AppCode.MATERIEL, demandeid, TxtCommentaire.value, function (nextTask) {
      console.log(nextTask);
      showMateriel.UpDateItemStatusRejet(false, demandeid, function () {
        location.reload();
      });
    });
  });
}

showMateriel.UpDateItemStatusRejet = function (isRejet, demandeid, callBack) {

  let oList = clientContext.get_web().get_lists().getByTitle(appHelper.ListName.Materiel);
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

showMateriel.UpDateItemStatus = function (nextTask, demandeid, callBack) {
  let oList = clientContext.get_web().get_lists().getByTitle(appHelper.ListName.Materiel);
  let It = oList.getItemById(demandeid);

  if (nextTask) {
    It.set_item("Statut", "ENCOURS");
    It.set_item("StatutLibelle", nextTask.get_item('Title'));
  } else {
    It.set_item("Statut", "VALIDEE");
    It.set_item("StatutLibelle", "Demande approuvée");
  }
  It.update();
  clientContext.load(It);
  clientContext.executeQueryAsync(function () {
    if (callBack) {
      callBack();
    }
  }, appSpHelper.writeError);
}



showMateriel.ShowFichierJoint = function (demandeid) {

  let view = {};

  let appName = appHelper.ListName.Materiel;
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
        showMateriel.ShowUploadForm(demandeid, view);

      } else {
        view.fichiers = [];
        showMateriel.ShowUploadForm(demandeid, view);
      }
    }
  },

    function () {
      view.fichiers = [];
      showMateriel.ShowUploadForm(demandeid, view);
    });
}

showMateriel.ShowUploadForm = function (demandeid, view) {
  appHelper.renderTemplate("tmpl_form_fichiers_attaches", "SectionDocumentsJoint", view);
  let FpUploadAttachement = document.getElementById('FpUploadAttachement');
  FpUploadAttachement.addEventListener('change', (e) => {
    files = e.target.files;
    for (const file of files) {
      let reader = new FileReader();
      reader.onload = function (e) {
        showMateriel.AttachFile(demandeid, e.target.result, file.name)
      }
      reader.onerror = function (e) {
        console.log(e.target.error);
      }
      reader.readAsArrayBuffer(file);
    }
  });
}

showMateriel.AttachFile = function (demandeid, arrayBuffer, fileName) {

  //Get Client Context and Web object.
  var oWeb = clientContext.get_web();
  //Get list and Attachment folder where the attachment of a particular list item is stored.
  var oList = oWeb.get_lists().getByTitle(appHelper.ListName.Materiel);
  var urlToAttach = '/Lists/' + appHelper.ListName.Materiel + '/Attachments/' + demandeid + '/'
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
    showMateriel.ShowFichierJoint(demandeid);
  }, appSpHelper.writeError);

};

showMateriel.ShowValidation = function (demandeid) {
  let view = {};

  let oList = showMateriel.clientContext.get_web().get_lists().getByTitle(appHelper.ListName.Validation);
  var QryGetNextOne = '<View>' +
    '<Query>' +
    '<Where>' +
    '<And>' +
    '<And>' +
    '<Eq><FieldRef Name="Parent" /><Value Type="Text">' + appHelper.AppCode.MATERIEL + '</Value></Eq>' +
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
  showMateriel.clientContext.load(collListItem);
  showMateriel.clientContext.executeQueryAsync(function (sender, args) {

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
        });
      }
      appHelper.renderTemplate("tmpl_form_historique_validation", "SectionHistoriqueValidation", view);
    }




  }, appSpHelper.writeError);


}

showMateriel.ShowDetails = function (demandeid) {

  let oList = showMateriel.clientContext.get_web().get_lists().getByTitle(appHelper.ListName.Materiel);
  let It = oList.getItemById(demandeid);

  showMateriel.clientContext.load(It);
  showMateriel.clientContext.executeQueryAsync(function () {
    if (It) {
      let view = {
        typeconge: It.get_item('Title') != null ? It.get_item('Title') : '',
        nbrejour: It.get_item('NombreJourAccorde') != null ? It.get_item('NombreJourAccorde') : '',
        datedepart: It.get_item('DateDepart') != null ? new Date(It.get_item('DateDepart')).toLocaleDateString() : '',
        interimaire: It.get_item('Demandeur') != null ? It.get_item('Demandeur').get_lookupValue() : '',
        motif: It.get_item('Motif') != null ? It.get_item('Motif') : '',

        quantite: It.get_item('Quantite') != null ? It.get_item('Quantite') : ''
      };
      appHelper.renderTemplate("tmpl_form_details", "SectionDetails", view);

    }
  }, appSpHelper.writeError);
}

//document.addEventListener("DOMContentLoaded", () => {
//ExecuteOrDelayUntilScriptLoaded(function(){
SP.SOD.executeFunc('sp.js', 'SP.ClientContext', showMateriel.InitializePage);
  //}, "SP.ClientContext");
//});

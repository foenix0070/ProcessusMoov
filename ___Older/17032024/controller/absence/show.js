var showAbsence = showAbsence || {};
var clientContext;
showAbsence.clientContext;
showAbsence.isSoldeImpact = 0;

showAbsence.InitializePage = function () {
  showAbsence.clientContext = SP.ClientContext.get_current();
  clientContext = SP.ClientContext.get_current();

  let tacheId = appHelper.GetQueryStringFromAjaxQuery('tacheid');
  let Id = appHelper.GetQueryStringFromAjaxQuery('id');

  appSpHelper.CheckAttachmentFolder(showAbsence.clientContext, Id, appHelper.ListName.Absence, null);

  appSpHelper.GetMyProperties(function () {
    showAbsence.ShowDetails(Id);
    showAbsence.ShowFirst(Id);
    showAbsence.ShowFichierJoint(Id);
    showAbsence.ShowValidation(Id);
    if (tacheId) {
      showAbsence.TestShowForm(tacheId, Id);
    }
  });
}

showAbsence.TestShowForm = function (tacheId, demandeid) {
  let oList = clientContext.get_web().get_lists().getByTitle(appHelper.ListName.Validation);
  let It = oList.getItemById(tacheId);
  clientContext.load(It);
  clientContext.executeQueryAsync(function () {
    if (It.get_item('Status') == "En cours") {
      showAbsence.ShowForm(tacheId, demandeid);
    }
  }, appSpHelper.writeError);
}

showAbsence.ShowForm = function (tacheId, demandeid) {

  let view = {};
  view.did = demandeid;
  view.tid = tacheId;
  view.process = appHelper.AppCode.ABSENCE;
  appHelper.renderTemplate("tmpl_form_validation", "SectionValidation", view);

  const TxtCommentaire = document.getElementById("TxtCommentaire");
  const BtnMod = document.getElementById("BtnValidationModification");
  const BtnOK = document.getElementById("BtnValidationOK");
  const BtnNOK = document.getElementById("BtnValidationNOK");
  const WF = new WFManager(appHelper.AppCode.ABSENCE, appHelper.AppConstante.SiteUrl, appHelper.ListName.Validation, ACTIV_WORKFLOW);

  BtnOK.addEventListener("click", function () {
    WF.goToNextTask(showAbsence.clientContext, tacheId, appHelper.AppCode.ABSENCE, demandeid, TxtCommentaire.value, function (nextTask) {
      appHelper.Log(nextTask);
      showAbsence.UpDateItemStatus(nextTask, demandeid, function () {
        location.reload();
      });
    });
  });

  BtnNOK.addEventListener("click", function () {
    WF.goToRefusedTask(showAbsence.clientContext, tacheId, appHelper.AppCode.ABSENCE, demandeid, TxtCommentaire.value, "REJETER", function (nextTask) {
      appHelper.Log(nextTask);
      showAbsence.UpDateItemStatusRejet(true, demandeid, function () {
        location.reload();
      });
    });
  });

  BtnMod.addEventListener("click", function () {
    WF.goToRefusedTask(showAbsence.clientContext, tacheId, appHelper.AppCode.ABSENCE, demandeid, TxtCommentaire.value, "MODIFIER", function (nextTask) {
      appHelper.Log(nextTask);
      showAbsence.UpDateItemStatusRejet(false, demandeid, function () {
        location.reload();
      });
    });
  });
}

showAbsence.UpDateItemStatusRejet = function (isRejet, demandeid, callBack) {

  let oList = clientContext.get_web().get_lists().getByTitle(appHelper.ListName.Absence);
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

showAbsence.UpDateItemStatus = function (nextTask, demandeid, callBack) {
  let oList = clientContext.get_web().get_lists().getByTitle(appHelper.ListName.Absence);
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



showAbsence.ShowFichierJoint = function (demandeid) {

  let view = {};

  let appName = appHelper.ListName.Absence;
  let id = demandeid;
  let folderPath = `Lists/${appName}/Attachments/${id}/`;
  appHelper.Log(folderPath);
  let attachmentFolder = clientContext.get_web().getFolderByServerRelativeUrl(folderPath);
  let attachmentFiles = attachmentFolder.get_files();
  clientContext.load(attachmentFiles);
  clientContext.executeQueryAsync(function () {
    if (attachmentFiles) {
      if (attachmentFiles.get_count() > 0) {
        appHelper.Log('111');
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
        showAbsence.ShowUploadForm(demandeid, view);

      } else {
        view.fichiers = [];
        showAbsence.ShowUploadForm(demandeid, view);
      }
    }
  },

    function () {
      view.fichiers = [];
      showAbsence.ShowUploadForm(demandeid, view);
    });
}

showAbsence.ShowUploadForm = function (demandeid, view) {
  appHelper.renderTemplate("tmpl_form_fichiers_attaches", "SectionDocumentsJoint", view);
  let FpUploadAttachement = document.getElementById('FpUploadAttachement');
  FpUploadAttachement.addEventListener('change', function () {



    if(appHelper.TestIsOverFileMinSize("FpUploadAttachement")){
      appHelper.upploadAttachmentFiles("FpUploadAttachement", demandeid, appHelper.ListName.Absence, 0, function () {
        showAbsence.ShowFichierJoint(demandeid);
      });
    }else{
      appHelper.ShowMinusFileSizeMessage();
    }



  });
  // FpUploadAttachement.addEventListener('change', (e) => {
  //   files = e.target.files;
  //   for (const file of files) {
  //     let reader = new FileReader();
  //     reader.onload = function (e) {
  //       showAbsence.AttachFile(demandeid, e.target.result, file.name)
  //     }
  //     reader.onerror = function (e) {
  //       appHelper.Log(e.target.error);
  //     }
  //     reader.readAsArrayBuffer(file);
  //   }
  // });
}

showAbsence.AttachFile = function (demandeid, arrayBuffer, fileName) {

  //Get Client Context and Web object.
  var oWeb = clientContext.get_web();
  //Get list and Attachment folder where the attachment of a particular list item is stored.
  var oList = oWeb.get_lists().getByTitle(appHelper.ListName.Absence);
  var urlToAttach = 'Lists/' + appHelper.ListName.Absence + '/Attachments/' + demandeid + '/'
  var attachmentFolder = oWeb.getFolderByServerRelativeUrl(urlToAttach);
  appHelper.Log(attachmentFolder);
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
    showAbsence.ShowFichierJoint(demandeid);
  }, appSpHelper.writeError);

};

showAbsence.ShowValidation = function (demandeid) {
  let view = {};

  let oList = showAbsence.clientContext.get_web().get_lists().getByTitle(appHelper.ListName.Validation);
  var QryGetNextOne = '<View>' +
    '<Query>' +
    '<Where>' +
    '<And>' +
    '<And>' +
    '<Eq><FieldRef Name="Parent" /><Value Type="Text">' + appHelper.AppCode.ABSENCE + '</Value></Eq>' +
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
  showAbsence.clientContext.load(collListItem);
  showAbsence.clientContext.executeQueryAsync(function (sender, args) {

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

showAbsence.ShowDetails = function (demandeid) {

  let oList = showAbsence.clientContext.get_web().get_lists().getByTitle(appHelper.ListName.Absence);
  let It = oList.getItemById(demandeid);


  showAbsence.clientContext.load(It);
  showAbsence.clientContext.executeQueryAsync(function () {
    if (It) {
      let demandeurField = It.get_item('Demandeur');
      let directeurField = It.get_item('ResponsableN2');
      let superieurField = It.get_item('ResponsableN1');
      let interimaireField = It.get_item('Interimaire') != null ? It.get_item('Interimaire').get_lookupValue() : '';
      let demandeurName = demandeurField.get_lookupValue();
      let directeurName = directeurField.get_lookupValue();
      let superieurName = superieurField.get_lookupValue();
      //let interimaireName = interimaireField.get_lookupValue();

      let view = {
        id: (It.get_item('Statut') == 'DEMANDEMODIFICATION' ? demandeid : false),
        title: It.get_item('Title') != null ? It.get_item('Title') : '',
        nbrejour: It.get_item('NombreJourAccorde') != null ? It.get_item('NombreJourAccorde') : '',
        datedepart: It.get_item('DateDepart') != null ? new Date(It.get_item('DateDepart')).toLocaleDateString() : '',
        //dateretour: It.get_item('DateRetour') != null ? new Date(It.get_item('DateRetour')).toLocaleDateString() : '',
        datereprise: It.get_item('DateReprise') != null ? new Date(It.get_item('DateReprise')).toLocaleDateString() : '',
        interimaire: interimaireField,
        demandeur: demandeurName,
        motif: It.get_item('Motif') != null ? It.get_item('Motif') : '',
        superieur: superieurName,
        demandeuremail: It.get_item('DemandeurEmail') != null ? It.get_item('DemandeurEmail') : '',
        directeur: directeurName,
        etat: It.get_item('StatutLibelle') != null ? It.get_item('StatutLibelle') : ''
      };
      appHelper.renderTemplate("tmpl_form_details", "SectionDetails", view);

      setTimeout(function() {
        const addfile = document.getElementById("addfile");
        addfile.addEventListener("click", function () {
          showAbsence.OpenFileUpload('FpUploadAttachement');
        });
      }, 1000);

    }
  }, appSpHelper.writeError);
}

showAbsence.ShowFirst = function (demandeid) {

  let oList = showAbsence.clientContext.get_web().get_lists().getByTitle(appHelper.ListName.Absence);
  let It = oList.getItemById(demandeid);

  showAbsence.clientContext.load(It);
  showAbsence.clientContext.executeQueryAsync(function () {


    if (It) {
      appHelper.Log("test showFirst");

      let createdValue = It.get_item('Created');
      let formattedTime = '';

      let createdDate = new Date(createdValue);

      var options = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
      formattedTime = createdDate.toLocaleTimeString(undefined, options);

      let creeerpar = It.get_item('Author');
      let creer = creeerpar.get_lookupValue();
      appHelper.Log(creer);
      let viewData = {
        id: It.get_item("ID"),
        heure: formattedTime,
        create: creer,
        requestdate: It.get_item('Created') != null ? new Date(It.get_item('Created')).toLocaleDateString() : '',
      };
      appHelper.renderTemplate("tmpl_form_first", "SectionFirst", viewData);

    }
  }, appSpHelper.writeError);
}

showAbsence.OpenFileUpload = function(str_select) {
  let transElt = document.getElementById(str_select);
  transElt.click();
}

//document.addEventListener("DOMContentLoaded", () => {
//ExecuteOrDelayUntilScriptLoaded(function(){
SP.SOD.executeFunc('sp.js', 'SP.ClientContext', showAbsence.InitializePage);
  //}, "SP.ClientContext");
//});

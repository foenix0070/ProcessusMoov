var showRegularisationSortieCaisse = showRegularisationSortieCaisse || {};
var clientContext;
showRegularisationSortieCaisse.clientContext;
showRegularisationSortieCaisse.isSoldeImpact = 0;

showRegularisationSortieCaisse.InitializePage = function () {
  showRegularisationSortieCaisse.clientContext = SP.ClientContext.get_current();
  clientContext = SP.ClientContext.get_current();

  let tacheId = appHelper.GetQueryStringFromAjaxQuery('tacheid');
  let Id = appHelper.GetQueryStringFromAjaxQuery('id');

  appSpHelper.CheckAttachmentFolder(showRegularisationSortieCaisse.clientContext, Id, appHelper.ListName.RegularisationSortieCaisse, null);

  appSpHelper.GetMyProperties(function () {

    console.log(tacheId, Id);
    showRegularisationSortieCaisse.ShowDetails(Id);
    showRegularisationSortieCaisse.ShowFirst(Id);
    showRegularisationSortieCaisse.ShowFichierJoint(Id);
    showRegularisationSortieCaisse.ShowValidation(Id);
    if (tacheId) {
      showRegularisationSortieCaisse.TestShowForm(tacheId, Id);
    }
  });
}

showRegularisationSortieCaisse.TestShowForm = function (tacheId, demandeid) {
  console.log(tacheId, demandeid);
  let oList = clientContext.get_web().get_lists().getByTitle(appHelper.ListName.Validation);
  let It = oList.getItemById(tacheId);
  clientContext.load(It);
  clientContext.executeQueryAsync(function () {
    if (It.get_item('Status') == "En cours") {
      showRegularisationSortieCaisse.ShowForm(tacheId, demandeid);
    }
  }, appSpHelper.writeError);
}

showRegularisationSortieCaisse.ShowForm = function (tacheId, demandeid) {

  let view = {};
  view.did = demandeid;
  view.tid = tacheId;
  view.process = appHelper.AppCode.REGULARISATIONSORTIECAISSE;
  appHelper.renderTemplate("tmpl_form_validation", "SectionValidation", view);

  const TxtCommentaire = document.getElementById("TxtCommentaire");
  const BtnMod = document.getElementById("BtnValidationModification");
  const BtnOK = document.getElementById("BtnValidationOK");
  const BtnNOK = document.getElementById("BtnValidationNOK");
  const WF = new WFManager(appHelper.AppCode.REGULARISATIONSORTIECAISSE, appHelper.AppConstante.SiteUrl, appHelper.ListName.Validation, ACTIV_WORKFLOW);

  BtnOK.addEventListener("click", function () {
    BtnOK.disabled = true;
    WF.goToNextTask(showRegularisationSortieCaisse.clientContext, tacheId, appHelper.AppCode.REGULARISATIONSORTIECAISSE, demandeid, TxtCommentaire.value, function (nextTask) {
      console.log(nextTask);
      showRegularisationSortieCaisse.UpDateItemStatus(nextTask, demandeid, function () {
        location.reload();
      });
    });
  });

  BtnNOK.addEventListener("click", function () {
    BtnNOK.disabled = true;
    WF.goToRefusedTask(showRegularisationSortieCaisse.clientContext, tacheId, appHelper.AppCode.REGULARISATIONSORTIECAISSE, demandeid, TxtCommentaire.value, "REJETER", function (nextTask) {
      console.log(nextTask);
      showRegularisationSortieCaisse.UpDateItemStatusRejet(true, demandeid, function () {
        location.reload();
      });
    });
  });

  BtnMod.addEventListener("click", function () {
    BtnMod.disabled = true;
    WF.goToRefusedTask(showRegularisationSortieCaisse.clientContext, tacheId, appHelper.AppCode.REGULARISATIONSORTIECAISSE, demandeid, TxtCommentaire.value, "MODIFIER", function (nextTask) {
      console.log(nextTask);
      showRegularisationSortieCaisse.UpDateItemStatusRejet(false, demandeid, function () {
        location.reload();
      });
    });
  });
}

showRegularisationSortieCaisse.UpDateItemStatusRejet = function (isRejet, demandeid, callBack) {

  let oList = clientContext.get_web().get_lists().getByTitle(appHelper.ListName.RegularisationSortieCaisse);
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

showRegularisationSortieCaisse.UpDateItemStatus = function (nextTask, demandeid, callBack) {
  let oList = clientContext.get_web().get_lists().getByTitle(appHelper.ListName.RegularisationSortieCaisse);
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


showRegularisationSortieCaisse.ShowFichierJoint = function (demandeid) {

  let view = {};

  let appName = appHelper.ListName.RegularisationSortieCaisse;
  let id = demandeid;
  let folderPath = `Lists/${appName}/Attachments/${id}/`;
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
            url: appHelper.AppConstante.RootSiteUrl + '/' + attachmentFiles.itemAt(i).get_serverRelativeUrl()
          });
        }
        showRegularisationSortieCaisse.ShowUploadForm(demandeid, view);

      } else {
        view.fichiers = [];
        showRegularisationSortieCaisse.ShowUploadForm(demandeid, view);
      }
    }
  },

    function () {
      view.fichiers = [];
      showRegularisationSortieCaisse.ShowUploadForm(demandeid, view);
    });
}

showRegularisationSortieCaisse.ShowUploadForm = function (demandeid, view) {
  appHelper.renderTemplate("tmpl_form_fichiers_attaches", "SectionDocumentsJoint", view);
  let FpUploadAttachement = document.getElementById('FpUploadAttachement');
  FpUploadAttachement.addEventListener('change', function () {

    appHelper.upploadAttachmentFiles("FpUploadAttachement", demandeid, appHelper.ListName.RegularisationSortieCaisse, 0, function () {
      showRegularisationSortieCaisse.ShowFichierJoint(demandeid);
    });
  });
  // FpUploadAttachement.addEventListener('change', (e) => {
  //   files = e.target.files;
  //   for (const file of files) {
  //     let reader = new FileReader();
  //     reader.onload = function (e) {
  //       showRegularisationSortieCaisse.AttachFile(demandeid, e.target.result, file.name)
  //     }
  //     reader.onerror = function (e) {
  //       console.log(e.target.error);
  //     }
  //     reader.readAsArrayBuffer(file);
  //   }
  // });

  setTimeout(function() {
    const addfile = document.getElementById("addfile");
    addfile.addEventListener("click", function () {
     showRegularisationSortieCaisse.OpenFileUpload('FpUploadAttachement');
    });
  }, 1000);

}

showRegularisationSortieCaisse.AttachFile = function (demandeid, arrayBuffer, fileName) {

  //Get Client Context and Web object.
  var oWeb = clientContext.get_web();
  //Get list and Attachment folder where the attachment of a particular list item is stored.
  var oList = oWeb.get_lists().getByTitle(appHelper.ListName.RegularisationSortieCaisse);
  var urlToAttach = 'Lists/' + appHelper.ListName.SortieCaisse + '/Attachments/' + demandeid + '/'
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
    showRegularisationSortieCaisse.ShowFichierJoint(demandeid);
  }, appSpHelper.writeError);

};

showRegularisationSortieCaisse.ShowValidation = function (demandeid) {
  let view = {};

  let oList = showRegularisationSortieCaisse.clientContext.get_web().get_lists().getByTitle(appHelper.ListName.Validation);
  var QryGetNextOne = '<View>' +
    '<Query>' +
    '<Where>' +
    '<And>' +
    '<And>' +
    '<Eq><FieldRef Name="Parent" /><Value Type="Text">' + appHelper.AppCode.REGULARISATIONSORTIECAISSE + '</Value></Eq>' +
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
  showRegularisationSortieCaisse.clientContext.load(collListItem);
  showRegularisationSortieCaisse.clientContext.executeQueryAsync(function (sender, args) {

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

function ajouterEspacesEntreChiffres(nombre) {
  if(nombre>999){
    // Convertir le nombre en une chaîne de caractères
    var nombreString = nombre.toString();
   
    // Utiliser une expression régulière pour ajouter des espaces entre les chiffres
    var nombreAvecEspaces = nombreString.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    
    return nombreAvecEspaces;
  }
  else{
   return nombre;
  }
}

showRegularisationSortieCaisse.ShowDetails = function (demandeid) {

  let oList = showRegularisationSortieCaisse.clientContext.get_web().get_lists().getByTitle(appHelper.ListName.RegularisationSortieCaisse);
  let It = oList.getItemById(demandeid);
  console.log("OUT");

  showRegularisationSortieCaisse.clientContext.load(It);
  showRegularisationSortieCaisse.clientContext.executeQueryAsync(function () {
    if (It) {
      console.log("IN");
      let demandeurField = It.get_item('Demandeur');
      let superieurField = It.get_item('ResponsableN1');
      let demandeurName = demandeurField.get_lookupValue();
      let superieurName = superieurField.get_lookupValue();
      let mont = ajouterEspacesEntreChiffres(It.get_item('Montant'));
      let sold = ajouterEspacesEntreChiffres(It.get_item('Solde'));
      let view = {
        id :  (It.get_item('Statut') == 'DEMANDEMODIFICATION' ? demandeid : false ) ,
        etat: It.get_item('StatutLibelle') != null ? It.get_item('StatutLibelle') : '',
        sortie: It.get_item('Sortie') != null ? It.get_item('Sortie') : '',
        sortieid: It.get_item('SortieID') != null ? It.get_item('SortieID') : '',
        titre: It.get_item('Title') != null ? It.get_item('Title') : '',
        date: It.get_item('Created').toLocaleDateString() != null ? It.get_item('Created').toLocaleDateString() : '',
        montant: mont,
        solde: sold,
        demandeur: demandeurName,
        demandeuremail: It.get_item('DemandeurEmail') != null ? It.get_item('DemandeurEmail') : '',
        superieur: superieurName,
        observation: It.get_item('Observation') != null ?  It.get_item('Observation') : ''
      };

      appHelper.renderTemplate("tmpl_form_details", "SectionDetails", view);

    }
  }, appSpHelper.writeError);
}

showRegularisationSortieCaisse.ShowFirst = function (demandeid) {

  let oList = showRegularisationSortieCaisse.clientContext.get_web().get_lists().getByTitle(appHelper.ListName.RegularisationSortieCaisse);
  let It = oList.getItemById(demandeid);

  showRegularisationSortieCaisse.clientContext.load(It);
  showRegularisationSortieCaisse.clientContext.executeQueryAsync(function () {


    if (It) {
      console.log("test showFirst");

      let createdValue = It.get_item('Created');
      let formattedTime = '';

      let createdDate = new Date(createdValue);

      var options = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
      formattedTime = createdDate.toLocaleTimeString(undefined, options);

      let creeerpar = It.get_item('Author');
      let creer = creeerpar.get_lookupValue();
      console.log(creer);
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

showRegularisationSortieCaisse.OpenFileUpload = function(str_select) {
  let transElt = document.getElementById(str_select);
  transElt.click();
}

// document.addEventListener("DOMContentLoaded", () => {
//   ExecuteOrDelayUntilScriptLoaded(function(){
SP.SOD.executeFunc('sp.js', 'SP.ClientContext', showRegularisationSortieCaisse.InitializePage);
//   }, "SP.ClientContext");
// });

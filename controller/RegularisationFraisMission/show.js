var showRegularisationFraisMission = showRegularisationFraisMission || {};
var clientContext;
showRegularisationFraisMission.clientContext;

showRegularisationFraisMission.InitializePage = function () {
  showRegularisationFraisMission.clientContext = SP.ClientContext.get_current();
  clientContext = SP.ClientContext.get_current();

  let tacheId = appHelper.GetQueryStringFromAjaxQuery('tacheid');
  let Id = appHelper.GetQueryStringFromAjaxQuery('id');

  appSpHelper.CheckAttachmentFolder(showRegularisationFraisMission.clientContext, Id, appHelper.ListName.RegularisationFraisMission, null);

  appSpHelper.GetMyProperties(function () {
    showRegularisationFraisMission.ShowDetails(Id);
    showRegularisationFraisMission.ShowFirst(Id);
    showRegularisationFraisMission.ShowFichierJoint(Id);
    showRegularisationFraisMission.ShowValidation(Id);
    if (tacheId) {
      showRegularisationFraisMission.TestShowForm(tacheId, Id);
    }
  });
}

showRegularisationFraisMission.TestShowForm = function (tacheId, demandeid) {
  let oList = clientContext.get_web().get_lists().getByTitle(appHelper.ListName.Validation);
  let It = oList.getItemById(tacheId);
  clientContext.load(It);
  clientContext.executeQueryAsync(function () {
    if (It.get_item('Status') == "En cours") {
      showRegularisationFraisMission.ShowForm(tacheId, demandeid);
    }
  }, appSpHelper.writeError);
}

showRegularisationFraisMission.ShowForm = function (tacheId, demandeid) {

  let view = {};
  view.did = demandeid;
  view.tid = tacheId;
  view.process = appHelper.AppCode.REGULARISATIONFRAISMISSION;
  appHelper.renderTemplate("tmpl_form_validation", "SectionValidation", view);

  const TxtCommentaire = document.getElementById("TxtCommentaire");
  const BtnMod = document.getElementById("BtnValidationModification");
  const BtnOK = document.getElementById("BtnValidationOK");
  const BtnNOK = document.getElementById("BtnValidationNOK");
  const WF = new WFManager(appHelper.AppCode.REGULARISATIONFRAISMISSION, appHelper.AppConstante.SiteUrl, appHelper.ListName.Validation, ACTIV_WORKFLOW);

  BtnOK.addEventListener("click", function () {
    BtnOK.disabled = true;
    WF.goToNextTask(showRegularisationFraisMission.clientContext, tacheId, appHelper.AppCode.REGULARISATIONFRAISMISSION, demandeid, TxtCommentaire.value, function (nextTask) {
      console.log(nextTask);
      showRegularisationFraisMission.UpDateItemStatus(nextTask, demandeid, function () {
        location.reload();
      });
    });
  });

  BtnNOK.addEventListener("click", function () {
    BtnNOK.disabled = true;
    WF.goToRefusedTask(showRegularisationFraisMission.clientContext, tacheId, appHelper.AppCode.REGULARISATIONFRAISMISSION, demandeid, TxtCommentaire.value,  "REJETER", function (nextTask) {
      console.log(nextTask);
      showRegularisationFraisMission.UpDateItemStatusRejet(true, demandeid, function () {
        location.reload();
      });
    });
  });

  BtnMod.addEventListener("click", function () {
    BtnMod.disabled = true;
    WF.goToRefusedTask(showRegularisationFraisMission.clientContext, tacheId, appHelper.AppCode.REGULARISATIONFRAISMISSION, demandeid, TxtCommentaire.value,  "MODIFIER", function (nextTask) {
      console.log(nextTask);
      showRegularisationFraisMission.UpDateItemStatusRejet(false, demandeid, function () {
        location.reload();
      });
    });
  });
}

showRegularisationFraisMission.UpDateItemStatusRejet = function (isRejet, demandeid, callBack) {

  let oList = clientContext.get_web().get_lists().getByTitle(appHelper.ListName.RegularisationFraisMission);
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

showRegularisationFraisMission.UpDateItemStatus = function (nextTask, demandeid, callBack) {
  let oList = clientContext.get_web().get_lists().getByTitle(appHelper.ListName.RegularisationFraisMission);
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



showRegularisationFraisMission.ShowFichierJoint = function (demandeid) {

  let view = {};

  let appName = appHelper.ListName.RegularisationFraisMission;
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
        showRegularisationFraisMission.ShowUploadForm(demandeid, view);

      } else {
        view.fichiers = [];
        showRegularisationFraisMission.ShowUploadForm(demandeid, view);
      }
    }
  },

    function () {
      view.fichiers = [];
      showRegularisationFraisMission.ShowUploadForm(demandeid, view);
    });
}

showRegularisationFraisMission.ShowUploadForm = function (demandeid, view) {
  appHelper.renderTemplate("tmpl_form_fichiers_attaches", "SectionDocumentsJoint", view);
  let FpUploadAttachement = document.getElementById('FpUploadAttachement');
  FpUploadAttachement.addEventListener('change', function () {

    appHelper.upploadAttachmentFiles("FpUploadAttachement", demandeid, appHelper.ListName.RegularisationFraisMission, 0, function () {
      showRegularisationFraisMission.ShowFichierJoint(demandeid);
    });
  });
  // FpUploadAttachement.addEventListener('change', (e) => {
  //   files = e.target.files;
  //   for (const file of files) {
  //     let reader = new FileReader();
  //     reader.onload = function (e) {
  //       showRegularisationFraisMission.AttachFile(demandeid, e.target.result, file.name)
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
      showRegularisationFraisMission.OpenFileUpload('FpUploadAttachement');
    });
  }, 1000);
}

showRegularisationFraisMission.AttachFile = function (demandeid, arrayBuffer, fileName) {

  //Get Client Context and Web object.
  var oWeb = clientContext.get_web();
  //Get list and Attachment folder where the attachment of a particular list item is stored.
  var oList = oWeb.get_lists().getByTitle(appHelper.ListName.RegularisationFraisMission);
  var urlToAttach = 'Lists/' + appHelper.ListName.RegularisationFraisMission + '/Attachments/' + demandeid + '/'
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
    showRegularisationFraisMission.ShowFichierJoint(demandeid);
  }, appSpHelper.writeError);

};

showRegularisationFraisMission.ShowValidation = function (demandeid) {
  let view = {};

  let oList = showRegularisationFraisMission.clientContext.get_web().get_lists().getByTitle(appHelper.ListName.Validation);
  var QryGetNextOne = '<View>' +
    '<Query>' +
    '<Where>' +
    '<And>' +
    '<And>' +
    '<Eq><FieldRef Name="Parent" /><Value Type="Text">' + appHelper.AppCode.REGULARISATIONFRAISMISSION + '</Value></Eq>' +
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
  showRegularisationFraisMission.clientContext.load(collListItem);
  showRegularisationFraisMission.clientContext.executeQueryAsync(function (sender, args) {

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


showRegularisationFraisMission.ShowDetails = function (demandeid) {

  let oList = showRegularisationFraisMission.clientContext.get_web().get_lists().getByTitle(appHelper.ListName.RegularisationFraisMission);
  let It = oList.getItemById(demandeid);



  showRegularisationFraisMission.clientContext.load(It);
  showRegularisationFraisMission.clientContext.executeQueryAsync(function () {
    if (It) {
      let demandeurField = It.get_item('Demandeur');
      let superieurField = It.get_item('ResponsableN1');
      let demandeurName = demandeurField.get_lookupValue();
      let superieurName = superieurField.get_lookupValue();
      let nbre = ajouterEspacesEntreChiffres(It.get_item('Nombre'));
      let forf = ajouterEspacesEntreChiffres(It.get_item('Forfait'));
      let tot = ajouterEspacesEntreChiffres(It.get_item('Total'));
      let view = {
        id :  (It.get_item('Statut') == 'DEMANDEMODIFICATION' ? demandeid : false ) ,
        title: It.get_item('Title') != null ? It.get_item('Title') : '',
        choix: It.get_item('Etat') != null ? It.get_item('Etat') : '',
        datedepart: It.get_item('DateDebut') != null ? new Date(It.get_item('DateDebut')).toLocaleDateString() : '',
        dateretour: It.get_item('DateFin') != null ? It.get_item('DateFin').toLocaleDateString() : '',
        //nombre: It.get_item('Nombre') != null ? It.get_item('Nombre') : '',
        //forfait: It.get_item('Forfait') != null ? It.get_item('Forfait') : '',
        //total: It.get_item('Total') != null ? It.get_item('Total') : '',
        sortie: It.get_item('Mission') != null ? It.get_item('Mission') : '',
        sortieid: It.get_item('MissionID') != null ? It.get_item('MissionID') : '',
        nombre: nbre,
        forfait: forf,
        total: tot,
        demandeur: demandeurName,
        demandeuremail: It.get_item('DemandeurEmail') != null ? It.get_item('DemandeurEmail') : '',
        superieur: superieurName,
        etat: It.get_item('StatutLibelle') != null ? It.get_item('StatutLibelle') : ''
      };
      appHelper.renderTemplate("tmpl_form_details", "SectionDetails", view);


      

    }
  }, appSpHelper.writeError);
}

showRegularisationFraisMission.ShowFirst = function (demandeid) {

  let oList = showRegularisationFraisMission.clientContext.get_web().get_lists().getByTitle(appHelper.ListName.RegularisationFraisMission);
  let It = oList.getItemById(demandeid);

  showRegularisationFraisMission.clientContext.load(It);
  showRegularisationFraisMission.clientContext.executeQueryAsync(function () {


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

showRegularisationFraisMission.OpenFileUpload = function(str_select) {
  let transElt = document.getElementById(str_select);
  transElt.click();
}


SP.SOD.executeFunc('sp.js', 'SP.ClientContext', showRegularisationFraisMission.InitializePage);

var showVehicule = showVehicule || {};
var clientContext;
showVehicule.clientContext;
showVehicule.isSoldeImpact = 0;
var Test = "";
var ids = "";
showVehicule.InitializePage = function () {
  showVehicule.clientContext = SP.ClientContext.get_current();
  clientContext = SP.ClientContext.get_current();

  let tacheId = appHelper.GetQueryStringFromAjaxQuery('tacheid');
  let Id = appHelper.GetQueryStringFromAjaxQuery('id');
  ids = Id;
  appSpHelper.CheckAttachmentFolder(showVehicule.clientContext, Id, appHelper.ListName.Vehicule, null);

  appSpHelper.GetMyProperties(function () {
    showVehicule.ShowDetails(Id);
    showVehicule.ShowFirst(Id);
    showVehicule.ShowFichierJoint(Id);
    showVehicule.ShowValidation(Id);
    if (tacheId) {
      showVehicule.TestShowForm(tacheId, Id);
    }
  });
}

showVehicule.TestShowForm = function (tacheId, demandeid) {
  let oList = clientContext.get_web().get_lists().getByTitle(appHelper.ListName.Validation);
  let It = oList.getItemById(tacheId);
  clientContext.load(It);
  clientContext.executeQueryAsync(function () {
    if (It.get_item('Status') == "En cours") {
      showVehicule.ShowForm(tacheId, demandeid);
    }
  }, appSpHelper.writeError);
}

showVehicule.ShowForm = function (tacheId, demandeid) {

  let view = {};
  view.did = demandeid;
  view.tid = tacheId;
  view.process = appHelper.AppCode.VEHICULE;
  appHelper.renderTemplate("tmpl_form_validation", "SectionValidation", view);

  const TxtCommentaire = document.getElementById("TxtCommentaire");
  const BtnMod = document.getElementById("BtnValidationModification");
  const BtnOK = document.getElementById("BtnValidationOK");
  const BtnNOK = document.getElementById("BtnValidationNOK");



  const WF = new WFManager(appHelper.AppCode.VEHICULE, appHelper.AppConstante.SiteUrl, appHelper.ListName.Validation, ACTIV_WORKFLOW);

  BtnOK.addEventListener("click", function () {


    if(Test == "VALIDATION DU GESTIONNAIRE PARC AUTOMOBILE - ETAT VEHICULE"){
      showVehicule.UpdateEtatVehicule();
    }


    WF.goToNextTask(showVehicule.clientContext, tacheId, appHelper.AppCode.VEHICULE, demandeid, TxtCommentaire.value, function (nextTask) {
      console.log(nextTask);
      showVehicule.UpDateItemStatus(nextTask, demandeid, function () {
        location.reload();
      });
    });
  });

  BtnNOK.addEventListener("click", function () {
    WF.goToRefusedTask(showVehicule.clientContext, tacheId, appHelper.AppCode.VEHICULE, demandeid, TxtCommentaire.value, "REJETER", function (nextTask) {
      console.log(nextTask);
      showVehicule.UpDateItemStatusRejet(true, demandeid, function () {
        location.reload();
      });
    });
  });

  BtnMod.addEventListener("click", function () {
    WF.goToRefusedTask(showVehicule.clientContext, tacheId, appHelper.AppCode.VEHICULE, demandeid, TxtCommentaire.value, "MODIFIER", function (nextTask) {
      console.log(nextTask);
      showVehicule.UpDateItemStatusRejet(false, demandeid, function () {
        location.reload();
      });
    });
  });
}

showVehicule.UpdateEtatVehicule = function (){
  let oList = clientContext.get_web().get_lists().getByTitle(appHelper.ListName.Vehicule);
  let It = oList.getItemById(ids);

  It.set_item("IndexDepart",  document.getElementById("TxtIndexDepart").value);
  It.set_item("NiveauCarburantDepart", $('#CmbNiveauCarburant').val());
  It.set_item("RSDepart", ($("#ChkRS").is(':checked') ? 'Oui':'Non' ));
  It.set_item("CRICDepart", ($("#ChkCRIC").is(':checked') ? 'Oui':'Non' ));
  It.set_item("MANIVELLEDepart", ($("#ChkMANIVELLE").is(':checked') ? 'Oui':'Non' ));
  It.set_item("ENJOLIVEURSDepart", ($("#ChkENJOLIVEURS").is(':checked') ? 'Oui':'Non' ));
  It.set_item("RADIODepart", ($("#ChkRADIO").is(':checked') ? 'Oui':'Non' ));
  It.set_item("PIECESADMINISTRATIVESDepart", ($("#ChkPIECESADMINISTRATIVES").is(':checked') ? 'Oui':'Non' ));

  It.update();
  clientContext.load(It);
  clientContext.executeQueryAsync(function () {

  }, appSpHelper.writeError);
}

showVehicule.UpdateEtatRetourVehicule = function (){
  let oList = clientContext.get_web().get_lists().getByTitle(appHelper.ListName.Vehicule);
  let It = oList.getItemById(ids);

  It.set_item("IndexRetour",  document.getElementById("TxtIndexDepart").value);
  It.set_item("NiveauCarburantRetour", $('#CmbNiveauCarburant').val());
  It.set_item("RSRetour", ($("#ChkRS").is(':checked') ? 'Oui':'Non' ));
  It.set_item("CRICRetour", ($("#ChkCRIC").is(':checked') ? 'Oui':'Non' ));
  It.set_item("MANIVELLERetour", ($("#ChkMANIVELLE").is(':checked') ? 'Oui':'Non' ));
  It.set_item("ENJOLIVEURSRetour", ($("#ChkENJOLIVEURS").is(':checked') ? 'Oui':'Non' ));
  It.set_item("RADIORetour", ($("#ChkRADIO").is(':checked') ? 'Oui':'Non' ));
  It.set_item("PIECESADMINISTRATIVESRetour", ($("#ChkPIECESADMINISTRATIVES").is(':checked') ? 'Oui':'Non' ));

  It.update();
  clientContext.load(It);
  clientContext.executeQueryAsync(function () {
  }, appSpHelper.writeError);
}

showVehicule.UpDateItemStatusRejet = function (isRejet, demandeid, callBack) {

  let oList = clientContext.get_web().get_lists().getByTitle(appHelper.ListName.Vehicule);
  let It = oList.getItemById(demandeid);

  if (isRejet) {
    It.set_item("Statut", "REJETEE");
    It.set_item("StatutLibelle", 'DEMANDE REJETEE');
  } else {
    It.set_item("Statut", "DEMANDEMODIFICATION");
    It.set_item("StatutLibelle", 'DEMANDE RENVOYEE POUR MODIFICATION');
  }
  It.update();
  clientContext.load(It);
  clientContext.executeQueryAsync(function () {
    if (callBack) {
      callBack();
    }
  }, appSpHelper.writeError);

}

showVehicule.UpDateItemStatus = function (nextTask, demandeid, callBack) {
  let oList = clientContext.get_web().get_lists().getByTitle(appHelper.ListName.Vehicule);
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



showVehicule.ShowFichierJoint = function (demandeid) {

  let view = {};

  let appName = appHelper.ListName.Vehicule;
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
        showVehicule.ShowUploadForm(demandeid, view);

      } else {
        view.fichiers = [];
        showVehicule.ShowUploadForm(demandeid, view);
      }
    }
  },

    function () {
      view.fichiers = [];
      showVehicule.ShowUploadForm(demandeid, view);
    });
}

showVehicule.ShowUploadForm = function (demandeid, view) {
  appHelper.renderTemplate("tmpl_form_fichiers_attaches", "SectionDocumentsJoint", view);
  let FpUploadAttachement = document.getElementById('FpUploadAttachement');
  FpUploadAttachement.addEventListener('change', function () {
    if(appHelper.TestIsOverFileMinSize("FpUploadAttachement") ){
      appHelper.upploadAttachmentFiles("FpUploadAttachement", demandeid, appHelper.ListName.Vehicule, 0, function () {
        showVehicule.ShowFichierJoint(demandeid);
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
  //       showVehicule.AttachFile(demandeid, e.target.result, file.name)
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
     showVehicule.OpenFileUpload('FpUploadAttachement');
    });
  }, 1000);
}

showVehicule.AttachFile = function (demandeid, arrayBuffer, fileName) {

  //Get Client Context and Web object.
  var oWeb = clientContext.get_web();
  //Get list and Attachment folder where the attachment of a particular list item is stored.
  var oList = oWeb.get_lists().getByTitle(appHelper.ListName.Vehicule);
  var urlToAttach = 'Lists/' + appHelper.ListName.Vehicule + '/Attachments/' + demandeid + '/'
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
    showVehicule.ShowFichierJoint(demandeid);
  }, appSpHelper.writeError);

};

showVehicule.ShowValidation = function (demandeid) {
  let view = {};

  let oList = showVehicule.clientContext.get_web().get_lists().getByTitle(appHelper.ListName.Validation);
  var QryGetNextOne = '<View>' +
    '<Query>' +
    '<Where>' +
    '<And>' +
    '<And>' +
    '<Eq><FieldRef Name="Parent" /><Value Type="Text">' + appHelper.AppCode.VEHICULE + '</Value></Eq>' +
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
  showVehicule.clientContext.load(collListItem);
  showVehicule.clientContext.executeQueryAsync(function (sender, args) {

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

showVehicule.ShowDetails = function (demandeid) {

  let oList = showVehicule.clientContext.get_web().get_lists().getByTitle(appHelper.ListName.Vehicule);
  let It = oList.getItemById(demandeid);

  showVehicule.clientContext.load(It);
  showVehicule.clientContext.executeQueryAsync(function () {
    if (It) {
      let demandeurField = It.get_item('Demandeur');
      let superieurField = It.get_item('ResponsableN1');
      let demandeurName = demandeurField.get_lookupValue();
      let superieurName = superieurField.get_lookupValue();
      let view = {
        id :  (It.get_item('Statut') == 'DEMANDEMODIFICATION' ? demandeid : false ) ,
        title: It.get_item('Title') != null ? It.get_item('Title') : '',
        //nbrejour: It.get_item('NombreJourAccorde') != null ?  It.get_item('NombreJourAccorde') : '',
        datedepart: It.get_item('DateDepart') != null ? new Date(It.get_item('DateDepart')).toLocaleDateString() : '',
        dateretour: It.get_item('DateRetour') != null ? new Date(It.get_item('DateRetour')).toLocaleDateString() : '',
        //interimaire: It.get_item('Demandeur') != null ?  It.get_item('Demandeur').get_lookupValue() : '',
        demandeur: demandeurName,
        demandeuremail: It.get_item('DemandeurEmail') != null ? It.get_item('DemandeurEmail') : '',
        superieur: superieurName,
        motif: It.get_item('Motif') != null ? It.get_item('Motif') : '',


        IndexDepart: It.get_item('IndexDepart') != null ? It.get_item('IndexDepart') : '',
        NiveauCarburantDepart: It.get_item('NiveauCarburantDepart') != null ? It.get_item('NiveauCarburantDepart') : '',
        RSDepart: It.get_item('RSDepart') != null ? It.get_item('RSDepart') : '',
        CRICDepart: It.get_item('CRICDepart') != null ? It.get_item('CRICDepart') : '',
        MANIVELLEDepart: It.get_item('MANIVELLEDepart') != null ? It.get_item('MANIVELLEDepart') : '',
        ENJOLIVEURSDepart: It.get_item('ENJOLIVEURSDepart') != null ? It.get_item('ENJOLIVEURSDepart') : '',
        RADIODepart: It.get_item('RADIODepart') != null ? It.get_item('RADIODepart') : '',
        PIECESADMINISTRATIVESDepart: It.get_item('PIECESADMINISTRATIVESDepart') != null ? It.get_item('PIECESADMINISTRATIVESDepart') : '',

        IndexRetour: It.get_item('IndexRetour') != null ? It.get_item('IndexRetour') : '',
        NiveauCarburantRetour: It.get_item('NiveauCarburantRetour') != null ? It.get_item('NiveauCarburantRetour') : '',
        RSRetour: It.get_item('RSRetour') != null ? It.get_item('RSRetour') : '',
        CRICRetour: It.get_item('CRICRetour') != null ? It.get_item('CRICRetour') : '',
        MANIVELLERetour: It.get_item('MANIVELLERetour') != null ? It.get_item('MANIVELLERetour') : '',
        ENJOLIVEURSRetour: It.get_item('ENJOLIVEURSRetour') != null ? It.get_item('ENJOLIVEURSRetour') : '',
        RADIORetour: It.get_item('RADIORetour') != null ? It.get_item('RADIORetour') : '',
        PIECESADMINISTRATIVESRetour: It.get_item('PIECESADMINISTRATIVESRetour') != null ? It.get_item('PIECESADMINISTRATIVESRetour') : '',


        etat: It.get_item('StatutLibelle') != null ? It.get_item('StatutLibelle') : ''

      };



      appHelper.renderTemplate("tmpl_form_details", "SectionDetails", view);

      let tacheId = appHelper.GetQueryStringFromAjaxQuery('tacheid');

      if(tacheId){
        Test =  (It.get_item('StatutLibelle') != null ? It.get_item('StatutLibelle').toString().trim() : '');
      if(   (It.get_item('StatutLibelle') != null ? It.get_item('StatutLibelle').toString().trim() : '') == "VALIDATION DU GESTIONNAIRE PARC AUTOMOBILE - ETAT VEHICULE"){
        $('#SectionVehiculeSortie').removeClass('d-none');
        }
      }

    }
  }, appSpHelper.writeError);
}

showVehicule.ShowFirst = function (demandeid) {

  let oList = showVehicule.clientContext.get_web().get_lists().getByTitle(appHelper.ListName.Vehicule);
  let It = oList.getItemById(demandeid);

  showVehicule.clientContext.load(It);
  showVehicule.clientContext.executeQueryAsync(function () {


    if (It) {

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

showVehicule.OpenFileUpload = function(str_select) {
  let transElt = document.getElementById(str_select);
  transElt.click();
}

SP.SOD.executeFunc('sp.js', 'SP.ClientContext', showVehicule.InitializePage);


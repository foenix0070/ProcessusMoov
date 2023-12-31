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
    showFraisMission.ShowFirst(Id);
    showFraisMission.ShowFichierJoint(Id);
    showFraisMission.ShowValidation(Id);
    showFraisMission.ShowDetailsFraisMission(Id);
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
    BtnOK.disabled = true;
    WF.goToNextTask(showFraisMission.clientContext, tacheId, appHelper.AppCode.MISSION, demandeid, TxtCommentaire.value, "REJETER", function (nextTask) {
      console.log(nextTask);
      showFraisMission.UpDateItemStatus(nextTask, demandeid, function () {
        location.reload();
      });
    });
  });

  BtnNOK.addEventListener("click", function () {
    BtnNOK.disabled = true;
    WF.goToRefusedTask(showFraisMission.clientContext, tacheId, appHelper.AppCode.MISSION, demandeid, TxtCommentaire.value, "MODIFIER", function (nextTask) {
      console.log(nextTask);
      showFraisMission.UpDateItemStatusRejet(true, demandeid, function () {
        location.reload();
      });
    });
  });

  BtnMod.addEventListener("click", function () {
    BtnMod.disabled = true;
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
            url: appHelper.AppConstante.RootSiteUrl + '/' + attachmentFiles.itemAt(i).get_serverRelativeUrl()
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
  FpUploadAttachement.addEventListener('change', function () {

    appHelper.upploadAttachmentFiles("FpUploadAttachement", demandeid, appHelper.ListName.Mission, 0, function () {
      showFraisMission.ShowFichierJoint(demandeid);
    });
  });
  // FpUploadAttachement.addEventListener('change', (e) => {
  //   files = e.target.files;
  //   for (const file of files) {
  //     let reader = new FileReader();
  //     reader.onload = function (e) {
  //       showFraisMission.AttachFile(demandeid, e.target.result, file.name)
  //     }
  //     reader.onerror = function (e) {
  //       console.log(e.target.error);
  //     }
  //     reader.readAsArrayBuffer(file);
  //   }
  // });

  setTimeout(function () {
    const addfile = document.getElementById("addfile");
    addfile.addEventListener("click", function () {
      showFraisMission.OpenFileUpload('FpUploadAttachement');
    });
  }, 1000);
}

showFraisMission.AttachFile = function (demandeid, arrayBuffer, fileName) {

  //Get Client Context and Web object.
  var oWeb = clientContext.get_web();
  //Get list and Attachment folder where the attachment of a particular list item is stored.
  var oList = oWeb.get_lists().getByTitle(appHelper.ListName.Mission);
  var urlToAttach = 'Lists/' + appHelper.ListName.Mission + '/Attachments/' + demandeid + '/'
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

function ajouterEspacesEntreChiffres(nombre) {
  if (nombre > 999) {
    // Convertir le nombre en une chaîne de caractères
    var nombreString = nombre.toString();

    // Utiliser une expression régulière pour ajouter des espaces entre les chiffres
    var nombreAvecEspaces = nombreString.replace(/\B(?=(\d{3})+(?!\d))/g, " ");

    return nombreAvecEspaces;
  }
  else {
    return nombre;
  }
}

showFraisMission.ShowDetails = function (demandeid) {

  let oList = showFraisMission.clientContext.get_web().get_lists().getByTitle(appHelper.ListName.Mission);
  let It = oList.getItemById(demandeid);

  showFraisMission.clientContext.load(It);
  showFraisMission.clientContext.executeQueryAsync(function () {


    if (It) {
      let demandeurField = It.get_item('Demandeur');
      let superieurField = It.get_item('ResponsableN1');
      let demandeurName = demandeurField.get_lookupValue();
      let superieurName = superieurField.get_lookupValue();
      let mont = ajouterEspacesEntreChiffres(It.get_item('CoutTotal'));
      let view = {
        regul: (It.get_item('Statut') == 'VALIDEE' ? demandeid : false),
        id: (It.get_item('Statut') == 'DEMANDEMODIFICATION' ? demandeid : false),
        title: It.get_item('Title') != null ? It.get_item('Title') : '',
        datedepart: It.get_item('DateDebut') != null ? new Date(It.get_item('DateDebut')).toLocaleDateString() : '',
        dateretour: It.get_item('DateFin') != null ? It.get_item('DateFin').toLocaleDateString() : '',
        motif: It.get_item('Motif') != null ? It.get_item('Motif') : '',
        destination: It.get_item('Destination') != null ? It.get_item('Destination') : '',
        cout: mont,
        //cout: It.get_item('CoutTotal') != null ? It.get_item('CoutTotal') : '',
        demandeur: demandeurName,
        demandeuremail: It.get_item('DemandeurEmail') != null ? It.get_item('DemandeurEmail') : '',
        superieur: superieurName,
        caisse: It.get_item('CaissePaiement') != null ? It.get_item('CaissePaiement') : '',
        mode: It.get_item('ModePaiement') != null ? It.get_item('ModePaiement') : '',
        zone: It.get_item('ZoneGeographique') != null ? It.get_item('ZoneGeographique') : '',
        etat: It.get_item('StatutLibelle') != null ? It.get_item('StatutLibelle') : ''
      };
      appHelper.renderTemplate("tmpl_form_details", "SectionDetails", view);




    }
  }, appSpHelper.writeError);
}

showFraisMission.ShowFirst = function (demandeid) {

  let oList = showFraisMission.clientContext.get_web().get_lists().getByTitle(appHelper.ListName.Mission);
  let It = oList.getItemById(demandeid);

  showFraisMission.clientContext.load(It);
  showFraisMission.clientContext.executeQueryAsync(function () {


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

showFraisMission.ShowDetailsFraisMission = function (demandeid) {

  let oList = showFraisMission.clientContext.get_web().get_lists().getByTitle(appHelper.ListName.FraisMission);

  console.log("demande id dans frais de mission est : "+demandeid);

  let q = `<View><Query><Where>
              <Eq><FieldRef Name="MissionID"/><Value Type="Text">${demandeid}</Value></Eq>
          </Where></Query></View>`;

  let camlQuery = new SP.CamlQuery();
  camlQuery.set_viewXml(q);
  let It = oList.getItems(camlQuery);
  showFraisMission.clientContext.load(It);
  showFraisMission.clientContext.executeQueryAsync(function () {
    console.log("Nombre : "+ It.get_count());
    if (It.get_count() > 0) {

      console.log("Frais Mission");

      var listItemEnumerator = It.getEnumerator();
      let viewFrais = {};
      viewFrais.Frais = [];

      while (listItemEnumerator.moveNext()) {

        var oListItem = listItemEnumerator.get_current();
        console.log("oListItem");
        console.log(oListItem);

        //let nbre = ajouterEspacesEntreChiffres(oListItem.get_item('Nombre'));
        var forf = ajouterEspacesEntreChiffres(oListItem.get_item('Forfait'));
        var totalM = ajouterEspacesEntreChiffres(oListItem.get_item('Total'));
        var dtetdebut = oListItem.get_item('DateDebut').toLocaleDateString();
        var dtefin = oListItem.get_item('DateFin').toLocaleDateString();

        console.log("forfait, total, debut, fin ");
        console.log(forf, totalM, dtetdebut, dtefin);

        viewFrais.Frais.push({
          titre: oListItem.get_item('Title') != null ? oListItem.get_item('Title') : '',
          debut: dtetdebut,
          fin: dtefin,
          nombre: oListItem.get_item('Nombre'),
          forfait: forf,
          total: totalM,
        });
      }

      appHelper.renderTemplate("tmpl_form_details_frais", "SectionDetailsFrais", viewFrais);

    }
  }, appSpHelper.writeError);
}

showFraisMission.OpenFileUpload = function (str_select) {
  let transElt = document.getElementById(str_select);
  transElt.click();
}

SP.SOD.executeFunc('sp.js', 'SP.ClientContext', showFraisMission.InitializePage);

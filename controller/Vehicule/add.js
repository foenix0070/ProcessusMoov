var appVehicule = appVehicule || {};
var clientContext;
appVehicule.clientContext;

appVehicule.InitializePage = function () {
  appVehicule.clientContext = SP.ClientContext.get_current();
  clientContext =  SP.ClientContext.get_current();
  appSpHelper.GetMyProperties(function () {
    appSpHelper.LoadUserCongeParam(
      appHelper.ListName.Employe,
      document.getElementById("TxtCurrentUserLogin").value,
      function () {
        appSpHelper.GetEmploye(
          appHelper.ListName.Employe,
          document.getElementById("TxtSpManagerN1Login").value,
          function (item) {
            console.log(item);
            appSpHelper.GetEmployeeManagerLogin(
              "N2",
              item.get_item("EmpManager"),
              function () {

              // span= document.getElementById('spanSolde');
              // span.innerHTML =document.getElementById('TxtSpUserNbreJrsAcquis').value;
              //  appVehicule.initCmbTypeConge(function(){
                  appVehicule.List();
              //  });
              }
            );
          }
        );
      }
    );
  });

  const BtnAdd = document.querySelector("#demande");
  const BtnSave = document.querySelector("#BtnSave");



  BtnAdd.addEventListener("click", function () {
    // setTimeout(function () {
    //   appSpHelper.InitializePeoplePicker(
    //     "plePickerInterimaireDiv",
    //     false,
    //     "350px"
    //   );
    // }, 2000);

  });

  BtnSave.addEventListener("click", function () {
    alert("test et pret à effectuer le add");
    appVehicule.Add (function(){

      location.reload();

    });
  });

};

function getRating (str){
  document.getElementById('TxtNature').value = str;
}

appVehicule.initCmbTypeConge = function (callBack) {
  ListerMotif(function(){
    let cmb = document.getElementById("cmbTypeConge");
    let txtColor = document.getElementById("TxtTypeCongeColeur");
    let txtText = document.getElementById("TxtTypeCongeText");
    cmb.addEventListener("change", function () {
      let selectedOption = this.options[this.selectedIndex];
      let color = selectedOption.getAttribute("data-color");
      txtColor.value = color;
      txtText.value = selectedOption.text;
    });

    if(callBack){
      callBack();
    }
  });

};




function ListerMotif( callBack) {
  let oList = clientContext.get_web().get_lists().getByTitle(appHelper.ListName.TypeConge);
  let q = '<View><Query><Where>' +
               '<Eq><FieldRef Name=\'active\' /><Value Type=\'Boolean\' >1</Value></Eq>' +
          '</Where></Query></View>';
  let camlQuery = new SP.CamlQuery();
  camlQuery.set_viewXml(q);
  let listItemMotif = oList.getItems(camlQuery);
  clientContext.load(listItemMotif);
  clientContext.executeQueryAsync(
      function () {
          var listItemEnumerator = listItemMotif.getEnumerator();

          while (listItemEnumerator.moveNext()) {
              let oListItemTp = listItemEnumerator.get_current();
              let opt = document.createElement("option");
              opt.setAttribute("data-duree", oListItemTp.get_item('Duree'));
              opt.setAttribute("data-color", oListItemTp.get_item('Background'));
              opt.setAttribute("value", oListItemTp.get_id());
              opt.innerHTML = oListItemTp.get_item('Title');
              document.getElementById('cmbTypeConge').appendChild(opt);
          }


          if(callBack){
            callBack();
          }
      },
      function (sender, args) { console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace()); });
}

appVehicule.List = function () {
  let oList = appVehicule.clientContext
    .get_web()
    .get_lists()
    .getByTitle(appHelper.ListName.Vehicule);
  let camlQuery = new SP.CamlQuery();
  camlQuery.set_viewXml(
    "<View><Query><Where>" +
      '<Eq><FieldRef ID="Demandeur" /><Value Type="Integer"><UserID/></Value></Eq>' +
      "</Where></Query></View>"
  );
  let collListItem = oList.getItems(camlQuery);
  appVehicule.clientContext.load(collListItem);
  appVehicule.clientContext.executeQueryAsync(function (sender, args) {
    if (collListItem.get_count() > 0) {
      var listItemEnumerator = collListItem.getEnumerator();
      let view = {};
      view.vehicule = [];
      while (listItemEnumerator.moveNext()) {
        var oListItem = listItemEnumerator.get_current();
        view.vehicule.push({
          id: oListItem.get_item("ID"),
          title: oListItem.get_item("Title"),
          startdate: new Date( oListItem.get_item("DateDepart")).toLocaleDateString(),
          reprise: new Date( oListItem.get_item("DateReprise")).toLocaleDateString(),
          nbre: oListItem.get_item("NombreJours"),
          status: oListItem.get_item("StatutLibelle"),
          classe: appHelper.Status.GetClass(oListItem.get_item("Statut")),
        });
      }

      appHelper.renderTemplate("tmpl_table_vehicule", "DivvehiculeTableShow", view);

      const linkClick = document.getElementsByClassName('click');
      for (var i = 0; i < linkClick.length; i++) {
        linkClick[i].addEventListener("click", function () {
          let url = this.getAttribute("data-url");
          location.href = url;
          return false;
        });
      }

    }
  }, appSpHelper.writeError);
};

appVehicule.Add = function ( callBack) {
  let oList = appVehicule.clientContext
    .get_web()
    .get_lists()
    .getByTitle(appHelper.ListName.Vehicule);
  let itemCreateInfo = new window.SP.ListItemCreationInformation();
  let oListItem = oList.addItem(itemCreateInfo);

  let startDate = new Date();

  let repDate = new Date();

  let endDate = startDate.addDays(2);

  oListItem.set_item("Statut", appHelper.Status.ENATTENTE);
  oListItem.set_item("StatutLibelle", "Validation du supérieur hiérarchique");

  oListItem.set_item("DateDepart", startDate);
  oListItem.set_item("DateRetour", endDate);
  oListItem.set_item("DateReprise", repDate);

  oListItem.set_item(
    "Title",
    document.getElementById("TxtObjet").value
  );

  oListItem.set_item(
    "Nature",
    document.getElementById("TxtObjet").value
  );

  oListItem.set_item(
    "Motif",
    document.getElementById("TxtMotif").value
  );

  oListItem.set_item(
    "NombreJours",
    1
  );
  oListItem.set_item(
    "NombreJourAccorde",
   1
  );
  oListItem.set_item(
    "DemandeurEmail",
    document.getElementById("TxtCurrentUserEmail").value
  );

 // oListItem.set_item("Historique", "#");

  oListItem.set_item(
    "Demandeur",
    SP.FieldUserValue.fromUser(document.getElementById("TxtCurrentUserLogin").value)
  );

  oListItem.set_item(
    "ResponsableN1",
    SP.FieldUserValue.fromUser(
      document.getElementById("TxtSpManagerN1Login").value
    )
  );
  oListItem.set_item(
    "ResponsableN2",
    SP.FieldUserValue.fromUser(
      document.getElementById("TxtSpManagerN2Login").value
    )
  );

  oListItem.set_item(
    "ResponsableN1Email",
    SP.FieldUserValue.fromUser(
      document.getElementById("TxtSpManagerN1Email").value
    )
  );
  oListItem.set_item(
    "ResponsableN2Email",
    SP.FieldUserValue.fromUser(
      document.getElementById("TxtSpManagerN2Email").value
    )
  );

  oListItem.update();
  clientContext.load(oListItem);
  clientContext.executeQueryAsync(function () {

const appUrl = '/tools/vehicule/show.aspx?ID=' + oListItem.get_id();
      let WF = new WFManager(appHelper.AppCode.VEHICULE,  appHelper.AppConstante.SiteUrl, appHelper.ListName.Validation,  ACTIV_WORKFLOW  );
      WF.createWFTask(clientContext,appUrl, appHelper.AppCode.VEHICULE, oListItem.get_id(), document.getElementById("TxtSpManagerN1Login").value,document.getElementById("TxtSpManagerN2Login").value, function(){}   )
      if(callBack){
        callBack(oListItem);
      }
  }, appSpHelper.writeError);
};


//document.addEventListener("DOMContentLoaded", () => {
  //console.log("test lister");
  //ExecuteOrDelayUntilScriptLoaded(function(){
    //console.log("test dcriptLoaded");
    SP.SOD.executeFunc('sp.js', 'SP.ClientContext', appVehicule.InitializePage);
  //}, "SP.ClientContext");
//});




/*var showVehicule = showVehicule || {};
var clientContext;
showVehicule.clientContext;
showVehicule.isSoldeImpact = 0;

showVehicule.InitializePage = function () {
  showVehicule.clientContext = SP.ClientContext.get_current();
  clientContext =  SP.ClientContext.get_current();

  let tacheId =  appHelper.GetQueryStringFromAjaxQuery('tacheid');
  let Id =  appHelper.GetQueryStringFromAjaxQuery('id');

  appSpHelper.CheckAttachmentFolder(showVehicule.clientContext, Id, appHelper.ListName.Vehicule, null);

  appSpHelper.GetMyProperties(function () {

    console.log(tacheId, Id);
    showVehicule.ShowDetails (Id);
    showVehicule.ShowFichierJoint(Id);
    showVehicule.ShowValidation(Id);
  if(tacheId){
    showVehicule.TestShowForm (tacheId, Id);
  }
  });
}

showVehicule.TestShowForm = function(tacheId, demandeid){
  console.log(tacheId, demandeid);
  let oList = clientContext .get_web().get_lists() .getByTitle(appHelper.ListName.Validation);
  let It = oList .getItemById(tacheId);
  clientContext.load(It);
  clientContext.executeQueryAsync(function () {
    if(It.get_item('Status') == "En cours"){
      showVehicule.ShowForm (tacheId, demandeid);
    }
  }, appSpHelper.writeError);
}

showVehicule.ShowForm = function(tacheId, demandeid){

  let view = {};
  view.did = demandeid;
  view.tid = tacheId;
  view.process = appHelper.AppCode.VEHICULE;
  appHelper.renderTemplate("tmpl_form_validation", "SectionValidation", view);

  const TxtCommentaire = document.getElementById("TxtCommentaire");
  const BtnMod = document.getElementById("BtnValidationModification");
  const BtnOK = document.getElementById("BtnValidationOK");
  const BtnNOK = document.getElementById("BtnValidationNOK");
  const WF  =  new WFManager(appHelper.AppCode.Vehicule,  appHelper.AppConstante.SiteUrl, appHelper.ListName.Validation,  ACTIV_WORKFLOW  );

  BtnOK.addEventListener("click", function () {
    WF.goToNextTask(showVehicule.clientContext ,tacheId, appHelper.AppCode.VEHICULE, demandeid, TxtCommentaire.value, function(nextTask){
      console.log(nextTask);
      showVehicule.UpDateItemStatus (nextTask, demandeid, function(){
        location.reload();
      });
    });
  });

  BtnNOK.addEventListener("click", function () {
    WF.goToRefusedTask(showVehicule.clientContext ,tacheId, appHelper.AppCode.VEHICULE, demandeid, TxtCommentaire.value, function(nextTask){
      console.log(nextTask);
      showVehicule.UpDateItemStatusRejet (true, demandeid, function(){
        location.reload();
      });
    });
  });

  BtnMod.addEventListener("click", function () {
    WF.goToRefusedTask(showVehicule.clientContext ,tacheId, appHelper.AppCode.VEHICULE, demandeid, TxtCommentaire.value, function(nextTask){
      console.log(nextTask);
      showVehicule.UpDateItemStatusRejet (false, demandeid, function(){
        location.reload();
      });
    });
  });
}

showVehicule.UpDateItemStatusRejet = function(isRejet, demandeid, callBack){

  let oList = clientContext .get_web().get_lists() .getByTitle(appHelper.ListName.Vehicule);
  let It = oList .getItemById(demandeid);

  if(isRejet){
    It.set_item("Statut", "REJETEE");
    It.set_item("StatutLibelle", 'Demande rejetée');
  }else{
    It.set_item("Statut", "DEMANDEMODIFICATION");
    It.set_item("StatutLibelle", 'Demande renvoyée pour modification');
  }
  It.update();
  clientContext.load(It);
  clientContext.executeQueryAsync(function () {
    if(callBack){
      callBack();
    }
  }, appSpHelper.writeError);

}

showVehicule.UpDateItemStatus = function(nextTask, demandeid, callBack){
  let oList = clientContext .get_web().get_lists() .getByTitle(appHelper.ListName.Vehicule);
  let It = oList .getItemById(demandeid);

  if(nextTask){
    It.set_item("Statut", "ENCOURS");
    It.set_item("StatutLibelle", nextTask.get_item('Title'));
  }else{
    It.set_item("Statut", "VALIDEE");
    It.set_item("StatutLibelle", "Demande approuvée");
  }
  It.update();
  clientContext.load(It);
  clientContext.executeQueryAsync(function () {
    if(callBack){
      callBack();
    }
  }, appSpHelper.writeError);
}



showVehicule.ShowFichierJoint = function(demandeid) {

  let view = {};

  let appName = appHelper.ListName.Vehicule;
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

          for (var i = 0; i < attachmentFiles.get_count() ; i++) {
            view.fichiers.push({
              nom : attachmentFiles.itemAt(i).get_name(),
              dateajout :  new Date( attachmentFiles.itemAt(i).get_timeLastModified ()).toLocaleString (), //   new Date( attachmentFiles.itemAt(i).get_timeLastModified ()).toLocaleDateString() + ' ' +
              taille : appHelper.ConvertOctetToKo( attachmentFiles.itemAt(i).get_length ()),
              auteur : attachmentFiles.itemAt(i).get_author (),
              url : appHelper.AppConstante.SiteUrl + '/'+  attachmentFiles.itemAt(i).get_serverRelativeUrl()
            });
          }
          showVehicule.ShowUploadForm (demandeid, view);

        }else{
          view.fichiers = [];
          showVehicule.ShowUploadForm (demandeid, view);
        }
      }
  },

  function(){
    view.fichiers = [];
    showVehicule.ShowUploadForm (demandeid, view);
  });
}

showVehicule.ShowUploadForm = function(demandeid, view){
  appHelper.renderTemplate("tmpl_form_fichiers_attaches", "SectionDocumentsJoint", view);
  let FpUploadAttachement = document.getElementById('FpUploadAttachement');
  FpUploadAttachement.addEventListener('change', (e) => {
    files = e.target.files;
   for (const file of files) {
      let reader = new FileReader();
      reader.onload = function(e) {
        showVehicule.AttachFile (demandeid,  e.target.result, file.name)
      }
      reader.onerror = function(e)
      {
          console.log( e.target.error);
      }
      reader.readAsArrayBuffer(file);
    }
    });
}

showVehicule.AttachFile = function(demandeid,  arrayBuffer, fileName)   {

      //Get Client Context and Web object.
      var oWeb = clientContext.get_web();
      //Get list and Attachment folder where the attachment of a particular list item is stored.
      var oList = oWeb.get_lists().getByTitle(appHelper.ListName.Vehicule);
      var urlToAttach = '/Lists/'+ appHelper.ListName.Vehicule +'/Attachments/'+ demandeid + '/'
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
      clientContext.executeQueryAsync(function(){
        showVehicule.ShowFichierJoint(demandeid);
      }, appSpHelper.writeError);

};

showVehicule.ShowValidation = function(demandeid) {
  let view = {};

  let oList = showVehicule.clientContext  .get_web()  .get_lists()  .getByTitle(appHelper.ListName.Validation);
  var QryGetNextOne = '<View>' +
  '<Query>' +
     '<Where>' +
      '<And>' +
      '<And>' +
      '<Eq><FieldRef Name="Parent" /><Value Type="Text">'+ appHelper.AppCode.VEHICULE +'</Value></Eq>' +
      '<Eq><FieldRef Name="ParentID0" /><Value Type="Text">'+ demandeid +'</Value></Eq>' +
      '</And>' +
      '<Eq><FieldRef Name="Status" /><Value Type="Choice">Terminé</Value></Eq>' +
     '</And>' +
   '</Where>' +
  '</Query>' +
  '</View>';

  let camlQuery = new SP.CamlQuery();
  camlQuery.set_viewXml( QryGetNextOne);
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
            auteur : '',
            dateaction : '',
            decision : '',
            commentaire : oListItem.get_item('Motif') != null ? oListItem.get_item('Motif').toString() : ''
            });
      }
      appHelper.renderTemplate("tmpl_form_historique_validation", "SectionHistoriqueValidation", view);
    }




   }, appSpHelper.writeError);


}

showVehicule.ShowDetails = function (demandeid){

  let oList = showVehicule.clientContext.get_web().get_lists() .getByTitle(appHelper.ListName.Vehicule);
  let It = oList .getItemById(demandeid);

  showVehicule.clientContext.load(It);
  showVehicule.clientContext.executeQueryAsync(function () {
  if(It){
    //showVehicule.isSoldeImpact = (It.get_item('TypeCongeID') != null ? It.get_item('TypeCongeID') : 0)
  let view = {
    Title : It.get_item('Title') != null ?  It.get_item('Title') : '',
    Nature: It.get_item('Nature') != null ?  It.get_item('Nature').get_lookupValue() : '',
    nbrejour: It.get_item('NombreJours') != null ?  It.get_item('NombreJours') : '',
    datedepart: It.get_item('DateDepart') != null ?  new Date( It.get_item('DateDepart')).toLocaleDateString() : '',
  };

  appHelper.renderTemplate("tmpl_form_details", "SectionDetails", view);


  const addfile = document.getElementById("addfile");
  addfile.addEventListener("click", function () {

    OpenFileUpload('FpUploadAttachement');
   });


  }
}, appSpHelper.writeError);
}

function OpenFileUpload(str_select){
  let transElt = document.getElementById(str_select);
  transElt.click();
}

// document.addEventListener("DOMContentLoaded", () => {
//   ExecuteOrDelayUntilScriptLoaded(function(){
    SP.SOD.executeFunc('sp.js', 'SP.ClientContext', showVehicule.InitializePage);
//   }, "SP.ClientContext");
// });

*/

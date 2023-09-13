var appMateriel = appMateriel || {};
var clientContext;
appMateriel.clientContext;

appMateriel.InitializePage = function () {
  appMateriel.clientContext = SP.ClientContext.get_current();
  clientContext = SP.ClientContext.get_current();
  appSpHelper.GetMyProperties(function () {

    document.getElementById("TxtNom").value = App.CurrentUser.DisplayName;
    document.getElementById("TxtMatricule").value = App.CurrentUser.Matricule;
    document.getElementById("TxtEmail").value = App.CurrentUser.Email;

    appMateriel.ShowDetails(appHelper.GetQueryStringFromAjaxQuery('DID'), function () { });


  });

  var monInput = document.getElementById("TxtQuantite");

  var autoNumeric = new AutoNumeric(monInput, {
    digitGroupSeparator: " ",
    decimalPlaces: 0,
    unformatOnSubmit: true,
  });

  //const BtnAdd = document.querySelector("#demande");
  const BtnSave = document.querySelector("#BtnSave");


  BtnSave.addEventListener("click", function () {
    
    if (appMateriel.TestFields ()) {
      BtnSave.disabled = true;
      let verif = document.getElementById("TxtVerif").value;
      if (verif == "Edit") {
        let valID = document.getElementById("TxtID").value;
        console.log(valID);
        appMateriel.Edit(valID, function (a) {
          //location.reload();
          const appUrl = '/pages/materiel/show.aspx?ID=' + a.get_id();
          const url = "/tools" + appUrl;
          appHelper.navigation("DivMainPageContainer", url);
          var closeButton = document.querySelector('[aria-label="Close"]');
          closeButton.click();
        });
      }
      else {
        appMateriel.Add(function (a) {
          //location.reload();
          const appUrl = '/pages/materiel/show.aspx?ID=' + a.get_id();
          const url = "/tools" + appUrl;
          appHelper.navigation("DivMainPageContainer", url);
          var closeButton = document.querySelector('[aria-label="Close"]');
          closeButton.click();
        });
      }
    }
  });

};

appMateriel.TestFields = function(){

  let v = true;
  let str = '';
  
   // Récupérer les valeurs des champs
   var nom = document.getElementById("TxtNom").value;
 var matricule = document.getElementById("TxtMatricule").value;
 var email = document.getElementById("TxtEmail").value;
    let materiel = document.getElementById("TxtMateriel").value;
    let qte = document.getElementById("TxtQuantite").value;
    let motif = document.getElementById("TxtMotif").value;
  
  
   // Vérifier si les champs obligatoires sont vides
   if (nom === "" || matricule === "" || email === "" || materiel === "" || qte === "0" || motif === "" ) {
     str += ("Veuillez remplir tous les champs obligatoires. <br>");
       v= false; // Empêche l'envoi du formulaire
   }
  
   // Valider le champ "Nombre de Jours" pour être supérieur ou égal à 1
   if (parseInt(qte) < 1) {
     str +=  ("La quantité doit être supérieur ou égal à 1. <br>");
       v= false; // Empêche l'envoi du formulaire
   }
  
   let div = document.getElementById('DivErreurMessage');
   div.innerHTML = '';
   if(v==false){
    str = `<div style="border:2px solid red; background:#ffe6ff;padding:3px;color:#330033;margin:3px;">${str}</div>`;
    div.innerHTML = str;
   }
  
   return v;
};

function getRating(str) {
  document.getElementById('TxtNature').value = str;
}

appMateriel.initCmbTypeMateriel = function (callBack) {
  ListerMotif(function () {
    let cmb = document.getElementById("cmbTypeConge");
    let txtColor = document.getElementById("TxtTypeCongeColeur");
    let txtText = document.getElementById("TxtTypeCongeText");
    cmb.addEventListener("change", function () {
      let selectedOption = this.options[this.selectedIndex];
      let color = selectedOption.getAttribute("data-color");
      txtColor.value = color;
      txtText.value = selectedOption.text;
    });

    if (callBack) {
      callBack();
    }
  });

};




function ListerMotif(callBack) {
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


      if (callBack) {
        callBack();
      }
    },
    function (sender, args) { console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace()); });
}

appMateriel.List = function () {
  let oList = appMateriel.clientContext
    .get_web()
    .get_lists()
    .getByTitle(appHelper.ListName.Materiel);
  let camlQuery = new SP.CamlQuery();
  camlQuery.set_viewXml(
    "<View><Query><Where>" +
    '<Eq><FieldRef ID="Demandeur" /><Value Type="Integer"><UserID/></Value></Eq>' +
    "</Where></Query></View>"
  );
  let collListItem = oList.getItems(camlQuery);
  appMateriel.clientContext.load(collListItem);
  appMateriel.clientContext.executeQueryAsync(function (sender, args) {
    if (collListItem.get_count() > 0) {
      var listItemEnumerator = collListItem.getEnumerator();
      let view = {};
      view.materiel = [];
      while (listItemEnumerator.moveNext()) {
        var oListItem = listItemEnumerator.get_current();
        view.materiel.push({
          id: oListItem.get_item("ID"),
          title: oListItem.get_item("Title"),
          startdate: new Date(oListItem.get_item("DateDepart")).toLocaleDateString(),
          reprise: new Date(oListItem.get_item("DateReprise")).toLocaleDateString(),
          nbre: oListItem.get_item("NombreJours"),
          status: oListItem.get_item("StatutLibelle"),
          classe: appHelper.Status.GetClass(oListItem.get_item("Statut")),

          quantite: oListItem.get_item("Quantite"),

        });
      }

      appHelper.renderTemplate("tmpl_table_materiel", "DivMaterielTableShow", view);

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

appMateriel.Add = function (callBack) {
  let oList = appMateriel.clientContext
    .get_web()
    .get_lists()
    .getByTitle(appHelper.ListName.Materiel);
  let itemCreateInfo = new window.SP.ListItemCreationInformation();
  let oListItem = oList.addItem(itemCreateInfo);

  let startDate = new Date();

  let repDate = new Date();

  let endDate = startDate.addDays(2);

  var Input = document.getElementById("TxtQuantite");

  var autoNumericObject = AutoNumeric.getAutoNumericElement(Input);

  var qte = autoNumericObject.getNumber();

  let ref = appHelper.getReference("MTRL");

  console.log(qte);

  oListItem.set_item("Statut", appHelper.Status.ENATTENTE);
  oListItem.set_item("StatutLibelle", "VALIDATION DU SUPERIEUR HIERARCHIQUE");
  oListItem.set_item("Reference", ref);

  oListItem.set_item("DateDepart", startDate);
  oListItem.set_item("DateRetour", endDate);
  oListItem.set_item("DateReprise", repDate);

  oListItem.set_item("Title", document.getElementById("TxtMateriel").value);


  oListItem.set_item("Quantite", qte);


  oListItem.set_item("Nature", document.getElementById("TxtMateriel").value);

  oListItem.set_item("Motif", document.getElementById("TxtMotif").value);

  oListItem.set_item("NombreJours", qte);
  oListItem.set_item("NombreJourAccorde", qte);
  oListItem.set_item("DemandeurEmail", App.CurrentUser.Email);

  // oListItem.set_item("Historique", "#");

  oListItem.set_item("Demandeur", SP.FieldUserValue.fromUser(App.CurrentUser.Login));

  oListItem.set_item("ResponsableN1", App.CurrentUser.ManagerPersonne);
  oListItem.set_item("ResponsableN2", App.CurrentUser.ManagerPersonne2);

  oListItem.set_item("ResponsableN1Email", App.CurrentUser.Manager.Email);
  oListItem.set_item("ResponsableN2Email", App.CurrentUser.Manager2.Email);

  oListItem.update();
  clientContext.load(oListItem);
  clientContext.executeQueryAsync(function () {

    const appUrl = '/pages/materiel/show.aspx?ID=' + oListItem.get_id();
    let WF = new WFManager(appHelper.AppCode.MATERIEL, appHelper.AppConstante.SiteUrl, appHelper.ListName.Validation, ACTIV_WORKFLOW);
    WF.createWFTask(clientContext, appUrl, appHelper.AppCode.MATERIEL, oListItem.get_id(), App.CurrentUser.Manager.Login, App.CurrentUser.Manager2.Login, ref, function () { })
    if (callBack) {
      callBack(oListItem);
    }
  }, appSpHelper.writeError);
};

appMateriel.Edit = function (demandeid, callBack) {

  let oList = clientContext.get_web().get_lists().getByTitle(appHelper.ListName.Materiel);
  let oListItem = oList.getItemById(demandeid);

  var Input = document.getElementById("TxtQuantite");

  var autoNumericObject = AutoNumeric.getAutoNumericElement(Input);

  var qte = autoNumericObject.getNumber();
  console.log(qte);

  oListItem.set_item("Statut", appHelper.Status.ENATTENTE);
  oListItem.set_item("StatutLibelle", "VALIDATION DU SUPERIEUR HIERARCHIQUE");

  oListItem.set_item("Title", document.getElementById("TxtMateriel").value);

  oListItem.set_item("Nature", document.getElementById("TxtMateriel").value);

  oListItem.set_item("Motif", document.getElementById("TxtMotif").value);
  oListItem.set_item("Reference", document.getElementById("TxtRef").value);

  oListItem.set_item("Quantite", qte);

  oListItem.set_item("DemandeurEmail", App.CurrentUser.Email);

  oListItem.set_item("Demandeur", SP.FieldUserValue.fromUser(App.CurrentUser.Login));

  oListItem.set_item("ResponsableN1", App.CurrentUser.ManagerPersonne);
  oListItem.set_item("ResponsableN2", App.CurrentUser.ManagerPersonne2);

  oListItem.set_item("ResponsableN1Email", App.CurrentUser.Manager.Email);
  oListItem.set_item("ResponsableN2Email", App.CurrentUser.Manager2.Email);

  oListItem.update();
  clientContext.load(oListItem);
  clientContext.executeQueryAsync(function () {

    appHelper.upploadAttachmentFiles("FileDoc", oListItem.get_id(), appHelper.ListName.Materiel, 0, function(){

      const appUrl = '/pages/materiel/show.aspx?ID=' + oListItem.get_id();
      console.log(appUrl);
      let WF = new WFManager(appHelper.AppCode.MATERIEL, appHelper.AppConstante.SiteUrl, appHelper.ListName.Validation, ACTIV_WORKFLOW);
      WF.createWFTask(clientContext, appUrl, appHelper.AppCode.MATERIEL, oListItem.get_id(), App.CurrentUser.Manager.Login, App.CurrentUser.Manager2.Login, function () { })
      if (callBack) {
        callBack(oListItem);
      }
    }, appSpHelper.writeError);
  })
};

appMateriel.ShowDetails = function (demandeid, callBack) {

  let oList = appMateriel.clientContext.get_web().get_lists().getByTitle(appHelper.ListName.Materiel);
  let It = oList.getItemById(demandeid);
  console.log(demandeid);
  console.log("IN ShowDetails");

  appMateriel.clientContext.load(It);
  appMateriel.clientContext.executeQueryAsync(function () {
    if (It) {

      document.getElementById("TxtMateriel").value = It.get_item('Title') != null ? It.get_item('Title') : '';
      document.getElementById("TxtMotif").value = It.get_item('Motif') != null ? It.get_item('Motif') : '';
      document.getElementById("TxtQuantite").value = It.get_item('Quantite') != null ? It.get_item('Quantite') : '';
      document.getElementById("TxtRef").value = It.get_item('Reference') != null ? It.get_item('Reference') : '';

      document.getElementById("TxtVerif").value = 'Edit';
      document.getElementById("TxtID").value = It.get_item('ID') != null ? It.get_item('ID') : 0;

      if (callBack) { callBack(); }

    } else { if (callBack) { callBack(); } }
  }, appSpHelper.writeError);
}


//document.addEventListener("DOMContentLoaded", () => {
//  ExecuteOrDelayUntilScriptLoaded(function(){
SP.SOD.executeFunc('sp.js', 'SP.ClientContext', appMateriel.InitializePage);
 // }, "SP.ClientContext");
//});

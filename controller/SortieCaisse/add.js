var appSortieCaisse = appSortieCaisse || {};
var clientContext;
appSortieCaisse.clientContext;


appSortieCaisse.InitializePage = function () {
  appSortieCaisse.clientContext = SP.ClientContext.get_current();
  clientContext = SP.ClientContext.get_current();

  appSpHelper.GetMyProperties(function () {

    appSortieCaisse.initCmbMode(function () { });

    appSortieCaisse.initCmbCaisse(function () {

      document.getElementById("TxtNom").value = App.CurrentUser.DisplayName;
      document.getElementById("TxtMatricule").value = App.CurrentUser.Matricule;
      document.getElementById("TxtEmail").value = App.CurrentUser.Email;

      appSortieCaisse.ShowDetails(appHelper.GetQueryStringFromAjaxQuery('DID'), function () { });

    });
  });

  var monInput = document.getElementById("TxtMontant");

  var autoNumeric = new AutoNumeric(monInput, {
    digitGroupSeparator: " ",
    decimalPlaces: 0,
    unformatOnSubmit: true,
  });

  /*appSpHelper.GetMyProperties(function () {
    

    appSortieCaisse.initCmbMode(function () { });
    appSortieCaisse.initSomme(function () { });
    appSortieCaisse.initCmbCaisse(function () { });


    document.getElementById("TxtNom").value = App.CurrentUser.DisplayName;
    document.getElementById("TxtMatricule").value = App.CurrentUser.Matricule;
    document.getElementById("TxtEmail").value = App.CurrentUser.Email;

  });*/

  //const BtnAdd = document.querySelector("#demande");
  const BtnSave = document.querySelector("#BtnSave");

  BtnSave.addEventListener("click", function () {
    let mode = document.getElementById("cmbMode").value;
    let payera = document.getElementById("TxtPayerA").value;
    let caisse = document.getElementById("cmbCaisse").value;
    let montant = document.getElementById("TxtMontant").value;
    if (mode != "" && payera != "" && caisse != "" && montant != 0) {
      let verif = document.getElementById("TxtVerif").value;
      if (verif == "Edit") {
        let valID = document.getElementById("TxtID").value;
        console.log(valID);
        appSortieCaisse.Edit(valID, function (a) {
          // location.reload();
          const appUrl = '/pages/sortieCaisse/show.aspx?ID=' + a.get_id();
          const url = "/tools1" + appUrl;
          appHelper.navigation("DivMainPageContainer", url);
          var closeButton = document.querySelector('[aria-label="Close"]');
          closeButton.click();
        });
      }
      else {
        appSortieCaisse.Add(function (a) {
          // location.reload();
          const appUrl = '/pages/sortieCaisse/show.aspx?ID=' + a.get_id();
          const url = "/tools1" + appUrl;
          appHelper.navigation("DivMainPageContainer", url);
          var closeButton = document.querySelector('[aria-label="Close"]');
          closeButton.click();
        });
      }
    }
    else {
      alert("Veillez renseigner correctement les champs");
    }
  });

};


appSortieCaisse.initSomme = function (callBack) {
  ListerSomme(function () {
    const sommeInput = document.getElementById('TxtMontant');

    sommeInput.addEventListener('change', function () {
      const valeur = parseFloat(sommeInput.value);

      if (isNaN(valeur)) {
        console.log("Veuillez saisir un nombre valide.");
        sommeInput.value = '';
        return;
      }

      sommeInput.value = valeur.toFixed(2);
    });


    if (callBack) {
      callBack();
    }
  });

};


appSortieCaisse.initCmbCaisse = function (callBack) {
  ListerCaisse(function () {
    let cmb = document.getElementById("cmbCaisse");
    let txtColor = document.getElementById("TxtCaisseColeur");
    let txtText = document.getElementById("TxtCaisseText");
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



appSortieCaisse.initCmbMode = function (callBack) {
  ListerMode(function () {
    let cmb = document.getElementById("cmbMode");
    let txtColor = document.getElementById("TxtModeColeur");
    let txtText = document.getElementById("TxtModeText");
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


function ListerCaisse(callBack) {
  let oList = clientContext.get_web().get_lists().getByTitle(appHelper.ListName.Caisse);
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
        document.getElementById('cmbCaisse').appendChild(opt);
      }


      if (callBack) {
        callBack();
      }
    },
    function (sender, args) { console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace()); });
}

function ListerMode(callBack) {
  let oList = clientContext.get_web().get_lists().getByTitle(appHelper.ListName.Mode);
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
        document.getElementById('cmbMode').appendChild(opt);
      }


      if (callBack) {
        callBack();
      }
    },
    function (sender, args) { console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace()); });
}


appSortieCaisse.Add = function (callBack) {
  let oList = appSortieCaisse.clientContext
    .get_web()
    .get_lists()
    .getByTitle(appHelper.ListName.SortieCaisse);
  let itemCreateInfo = new window.SP.ListItemCreationInformation();
  let oListItem = oList.addItem(itemCreateInfo);

  var Input = document.getElementById("TxtMontant");

  var autoNumericObject = AutoNumeric.getAutoNumericElement(Input);

  var montant = autoNumericObject.getNumber();
  console.log(montant);

  oListItem.set_item("Statut", appHelper.Status.ENATTENTE);
  oListItem.set_item("StatutLibelle", "VALIDATION DU SUPERIEUR HIERARCHIQUE");
  oListItem.set_item("Montant", montant);
  oListItem.set_item("ModePaiementID", parseInt(document.getElementById("cmbMode").value));
  oListItem.set_item("ModePaiement", document.getElementById("TxtModeText").value);
  oListItem.set_item("PayerA", document.getElementById("TxtPayerA").value);
  oListItem.set_item("CaissePaiementID", parseInt(document.getElementById("cmbCaisse").value));
  oListItem.set_item("CaissePaiement", document.getElementById("TxtCaisseText").value);
  oListItem.set_item("ObjetReglement", document.getElementById("TxtObjetReglement").value);
  oListItem.set_item("Title", document.getElementById("TxtTitle").value);
  //oListItem.set_item("DocJustificatifs",document.getElementById("FileDoc").value);

  oListItem.set_item("Demandeur", SP.FieldUserValue.fromUser(App.CurrentUser.Login));

  oListItem.set_item("DemandeurEmail", App.CurrentUser.Email);


  oListItem.set_item("ResponsableN1", App.CurrentUser.ManagerPersonne);
  oListItem.set_item("ResponsableN2", App.CurrentUser.ManagerPersonne2);

  oListItem.set_item("ResponsableN1Email", App.CurrentUser.Manager.Email);
  oListItem.set_item("ResponsableN2Email", App.CurrentUser.Manager2.Email);

  console.log(SP.FieldUserValue.fromUser(App.CurrentUser.Login), App.CurrentUser.ManagerPersonne, App.CurrentUser.ManagerPersonne2);


  oListItem.update();
  clientContext.load(oListItem);
  clientContext.executeQueryAsync(function () {

    const appUrl = '/pages/sortieCaisse/show.aspx?ID=' + oListItem.get_id();
    console.log(ACTIV_WORKFLOW);
    let WF = new WFManager(appHelper.AppCode.SORTIECAISSE, appHelper.AppConstante.SiteUrl, appHelper.ListName.Validation, ACTIV_WORKFLOW);
    WF.createWFTask(clientContext, appUrl, appHelper.AppCode.SORTIECAISSE, oListItem.get_id(), App.CurrentUser.Manager.Login, App.CurrentUser.Manager2.Login, function () { })
    if (callBack) {
      callBack(oListItem);
    }
  }, appSpHelper.writeError);
};

appSortieCaisse.Edit = function (demandeid, callBack) {

  let oList = clientContext.get_web().get_lists().getByTitle(appHelper.ListName.SortieCaisse);
  let oListItem = oList.getItemById(demandeid);
  console.log(document.getElementById("TxtCaisseText").value, document.getElementById("TxtModeText").value);

  var Input = document.getElementById("TxtMontant");

  var autoNumericObject = AutoNumeric.getAutoNumericElement(Input);

  var montant = autoNumericObject.getNumber();
  console.log(montant);

  oListItem.set_item("Statut", appHelper.Status.ENATTENTE);
  oListItem.set_item("StatutLibelle", "VALIDATION DU SUPERIEUR HIERARCHIQUE");

  oListItem.set_item("Montant", montant);
  oListItem.set_item("ModePaiementID", parseInt(document.getElementById("cmbMode").value));
  oListItem.set_item("ModePaiement", document.getElementById("TxtModeText").value);
  oListItem.set_item("PayerA", document.getElementById("TxtPayerA").value);
  oListItem.set_item("CaissePaiementID", parseInt(document.getElementById("cmbCaisse").value));
  oListItem.set_item("CaissePaiement", document.getElementById("TxtCaisseText").value);
  oListItem.set_item("ObjetReglement", document.getElementById("TxtObjetReglement").value);
  oListItem.set_item("Title", document.getElementById("TxtTitle").value);

  oListItem.set_item("DemandeurEmail", App.CurrentUser.Email);

  oListItem.set_item("Demandeur", SP.FieldUserValue.fromUser(App.CurrentUser.Login));

  oListItem.set_item("ResponsableN1", App.CurrentUser.ManagerPersonne);
  oListItem.set_item("ResponsableN2", App.CurrentUser.ManagerPersonne2);

  oListItem.set_item("ResponsableN1Email", App.CurrentUser.Manager.Email);
  oListItem.set_item("ResponsableN2Email", App.CurrentUser.Manager2.Email);

  oListItem.update();
  clientContext.load(oListItem);
  clientContext.executeQueryAsync(function () {

    const appUrl = '/pages/sortieCaisse/show.aspx?ID=' + oListItem.get_id();
    console.log(appUrl);
    let WF = new WFManager(appHelper.AppCode.SORTIECAISSE, appHelper.AppConstante.SiteUrl, appHelper.ListName.Validation, ACTIV_WORKFLOW);
    WF.createWFTask(clientContext, appUrl, appHelper.AppCode.SORTIECAISSE, oListItem.get_id(), App.CurrentUser.Manager.Login, App.CurrentUser.Manager2.Login, function () { })
    if (callBack) {
      callBack(oListItem);
    }
  }, appSpHelper.writeError);
};

appSortieCaisse.ShowDetails = function (demandeid, callBack) {

  let oList = appSortieCaisse.clientContext.get_web().get_lists().getByTitle(appHelper.ListName.SortieCaisse);
  let It = oList.getItemById(demandeid);
  console.log(demandeid);
  console.log("IN ShowDetails");

  appSortieCaisse.clientContext.load(It);
  appSortieCaisse.clientContext.executeQueryAsync(function () {
    if (It) {

      document.getElementById("TxtTitle").value = It.get_item('Title') != null ? It.get_item('Title') : '';
      document.getElementById("TxtMontant").value = It.get_item('Montant') != null ? It.get_item('Montant') : 0;
      document.getElementById("TxtObjetReglement").value = It.get_item('ObjetReglement') != null ? It.get_item('ObjetReglement') : '';
      document.getElementById("TxtPayerA").value = It.get_item('PayerA') != null ? It.get_item('PayerA') : '';
      document.getElementById("TxtCaisseText").value = It.get_item('CaissePaiement') != null ? It.get_item('CaissePaiement') : '';
      document.getElementById("TxtModeText").value = It.get_item('ModePaiement') != null ? It.get_item('ModePaiement') : '';
      document.getElementById("cmbCaisse").value = It.get_item('CaissePaiement') != null ? It.get_item('CaissePaiement') : '';
      document.getElementById("cmbMode").value = It.get_item('ModePaiement') != null ? It.get_item('ModePaiement') : '';
      document.getElementById("TxtVerif").value = 'Edit';
      document.getElementById("TxtID").value = It.get_item('ID') != null ? It.get_item('ID') : 0;

      if (callBack) { callBack(); }

    } else { if (callBack) { callBack(); } }
  }, appSpHelper.writeError);
}


// document.addEventListener("DOMContentLoaded", () => {
//   ExecuteOrDelayUntilScriptLoaded(function(){
SP.SOD.executeFunc('sp.js', 'SP.ClientContext', appSortieCaisse.InitializePage);
//   }, "SP.ClientContext");
// });

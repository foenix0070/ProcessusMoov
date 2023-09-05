var appRegularisationSortieCaisse = appRegularisationSortieCaisse || {};
var clientContext;
appRegularisationSortieCaisse.clientContext;


appRegularisationSortieCaisse.InitializePage = function () {
  appRegularisationSortieCaisse.clientContext = SP.ClientContext.get_current();
  clientContext = SP.ClientContext.get_current();
  appSpHelper.GetMyProperties(function () {

    // let param = sessionStorage.getItem("ajax_url");
    // console.log(param);
    //appSpHelper.LoadUserCongeParam(
    //appHelper.ListName.Employe, "ETISALAT-AFRICA\pouattara", App.CurrentUser.Login, CurrentUser.Matricule, CurrentUser.Email, CurrentUser.Nom,
    //document.getElementById("TxtCurrentUserLogin").value,
    //function () {
    //appSpHelper.GetEmploye(appHelper.ListName.Employe,document.getElementById("TxtSpManagerN1Login").value,
    //function (item) {
    //console.log(item);
    //appSpHelper.GetEmployeeManagerLogin("N2",item.get_item("EmpManager"),
    //function () {
    // span= document.getElementById('spanSolde');
    // span.innerHTML =document.getElementById('TxtSpUserNbreJrsAcquis').value;
    //  appRegularisationSortieCaisse.initCmbTypeConge(function(){
    //appRegularisationSortieCaisse.List();
    //  });
    //}
    //);
    //}
    //);
    //}
    //);

    var elementsWithDataInfo = document.querySelectorAll('[data-info]');

    // Loop through the selected elements
    elementsWithDataInfo.forEach(function (element) {
      var info = element.getAttribute('data-info');
      console.log(info);

      if (info == "sortieCaisseRegul") {
        // document.getElementById("cmbSortie").disabled=true;
        document.getElementById("cmbSortie").style.display = "none";
        document.getElementById("TxtSortie").style.display = "block";
        appRegularisationSortieCaisse.ShowSortie(appHelper.GetQueryStringFromAjaxQuery('DID'), function () { });
      }
      else {
        appRegularisationSortieCaisse.initCmbSortie(function () { });
        appRegularisationSortieCaisse.ShowDetails(appHelper.GetQueryStringFromAjaxQuery('DID'), function () { });
      }
    });

    // var btnRegularisation = document.getElementById("BtnRegularisation");
    // var info = btnRegularisation.getAttribute("data-info");
    // console.log(info);

    


    document.getElementById("TxtNom").value = App.CurrentUser.DisplayName;
    document.getElementById("TxtMatricule").value = App.CurrentUser.Matricule;
    document.getElementById("TxtEmail").value = App.CurrentUser.Email;


  });

  var monInput = document.getElementById("TxtMontant");
  var monInputsolde = document.getElementById("TxtSolde");

  var autoNumeric = new AutoNumeric(monInput, {
    digitGroupSeparator: " ",
    decimalPlaces: 0,
    unformatOnSubmit: true,
  });

  var autoNumeric1 = new AutoNumeric(monInputsolde, {
    digitGroupSeparator: " ",
    decimalPlaces: 0,
    unformatOnSubmit: true,
  });

  //const BtnAdd = document.querySelector("#demande");
  const BtnSave = document.querySelector("#BtnSave");

  BtnSave.addEventListener("click", function () {
    //let sortie = document.getElementById("cmbSortie").value;
    let montant = document.getElementById("TxtMontant").value;
    let Solde = document.getElementById("TxtSolde").value;
    if(montant!="" && Solde!=0)
    {
    let verif = document.getElementById("TxtVerif").value;
    if (verif == "Edit") {
      let valID = document.getElementById("TxtID").value;
      console.log(valID);
      appRegularisationSortieCaisse.Edit(valID, function (a) {
        // location.reload();
        const appUrl = '/pages/regularisationSortieCaisse/show.aspx?ID=' + a.get_id();
        const url = "/tools1" + appUrl;
        appHelper.navigation("DivMainPageContainer", url);
        var closeButton = document.querySelector('[aria-label="Close"]');
        closeButton.click();
      });
    }
    else {
      appRegularisationSortieCaisse.Add(function (a) {
        //location.reload();
        const appUrl = '/pages/regularisationSortieCaisse/show.aspx?ID=' + a.get_id();
        const url = "/tools1" + appUrl;
        appHelper.navigation("DivMainPageContainer", url);
        var closeButton = document.querySelector('[aria-label="Close"]');
        closeButton.click();
      });
    }
  }
  else{
    alert("Veillez renseigner correctement les champs");
  }
  });
};

appRegularisationSortieCaisse.initCmbSortie = function (callBack) {
  ListerSortie(function () {
    let cmb = document.getElementById("cmbSortie");
    // let txtColor = document.getElementById("TxtSortieColeur");
    let txtText = document.getElementById("TxtSortieText");
    cmb.addEventListener("change", function () {
      let selectedOption = this.options[this.selectedIndex];
      //let color = selectedOption.getAttribute("data-color");
      //txtColor.value = color;
      txtText.value = selectedOption.text;
    });

    if (callBack) {
      callBack();
    }
  });

};


function ListerSortie(callBack) {
  let oList = clientContext.get_web().get_lists().getByTitle(appHelper.ListName.SortieCaisse);
  let q = `<View><Query><Where><And>
              <Eq><FieldRef ID="Demandeur"/><Value Type="Integer"><UserID/></Value></Eq>
              <Eq><FieldRef ID="Statut"/><Value Type="Text">VALIDEE</Value></Eq>
          </And></Where></Query></View>`;

  let camlQuery = new SP.CamlQuery();
  camlQuery.set_viewXml(q);
  let listItemSortie = oList.getItems(camlQuery);
  clientContext.load(listItemSortie);
  clientContext.executeQueryAsync(
    function () {
      var listItemEnumerator = listItemSortie.getEnumerator();

      while (listItemEnumerator.moveNext()) {
        console.log("IN");
        let oListItemTp = listItemEnumerator.get_current();
        let opt = document.createElement("option");
        //opt.setAttribute("data-duree", oListItemTp.get_item('Duree'));
        //opt.setAttribute("data-color", oListItemTp.get_item('Background'));
        opt.setAttribute("value", oListItemTp.get_id());
        opt.innerHTML = oListItemTp.get_item('Title');
        document.getElementById('cmbSortie').appendChild(opt);
      }


      if (callBack) {
        callBack();
      }
    },
    function (sender, args) { console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace()); });
}

appRegularisationSortieCaisse.Add = function (callBack) {
  let oList = appRegularisationSortieCaisse.clientContext
    .get_web()
    .get_lists()
    .getByTitle(appHelper.ListName.RegularisationSortieCaisse);
  let itemCreateInfo = new window.SP.ListItemCreationInformation();
  let oListItem = oList.addItem(itemCreateInfo);

  var Input = document.getElementById("TxtMontant");
  var Inputsolde = document.getElementById("TxtSolde");

  var autoNumericObject = AutoNumeric.getAutoNumericElement(Input);
  var autoNumericObjectsolde = AutoNumeric.getAutoNumericElement(Inputsolde);

  var montant = autoNumericObject.getNumber();
  var Solde = autoNumericObjectsolde.getNumber();
  console.log(montant, Solde);

  let verifid = document.getElementById("TxtSortieID").value;
  if (verifid) {
    console.log("l'id sortie : " + verifid);
    oListItem.set_item("SortieID", document.getElementById("TxtSortieID").value);
    oListItem.set_item("Sortie", document.getElementById("TxtSortie").value);
    oListItem.set_item("Statut", appHelper.Status.ENATTENTE);
    oListItem.set_item("StatutLibelle", "VALIDATION DU SUPERIEUR HIERARCHIQUE");
    oListItem.set_item("Montant", montant);
    oListItem.set_item("Solde", Solde);

    oListItem.set_item("Observation", document.getElementById("TxtObservation").value);
    oListItem.set_item("Title", document.getElementById("TxtTitle").value);

    oListItem.set_item("Demandeur", SP.FieldUserValue.fromUser(App.CurrentUser.Login));
    oListItem.set_item("DemandeurEmail", App.CurrentUser.Email);

    oListItem.set_item("ResponsableN1", App.CurrentUser.ManagerPersonne);
    oListItem.set_item("ResponsableN2", App.CurrentUser.ManagerPersonne2);

    oListItem.set_item("ResponsableN1Email", App.CurrentUser.Manager.Email);
    oListItem.set_item("ResponsableN2Email", App.CurrentUser.Manager2.Email);

    oListItem.update();
    clientContext.load(oListItem);
    clientContext.executeQueryAsync(function () {

      const appUrl = '/pages/regularisationSortieCaisse/show.aspx?ID=' + oListItem.get_id();
      let WF = new WFManager(appHelper.AppCode.REGULARISATIONSORTIECAISSE, appHelper.AppConstante.SiteUrl, appHelper.ListName.Validation, ACTIV_WORKFLOW);
      WF.createWFTask(clientContext, appUrl, appHelper.AppCode.REGULARISATIONSORTIECAISSE, oListItem.get_id(), App.CurrentUser.Manager.Login, App.CurrentUser.Manager2.Login, function () { })

      appRegularisationSortieCaisse.UpDateStatusSortieCaisse(verifid, function () { });

      if (callBack) {
        callBack(oListItem);
      }

    }, appSpHelper.writeError);
  }
  else {
    oListItem.set_item("SortieID", parseInt(document.getElementById("cmbSortie").value));
    oListItem.set_item("Sortie", document.getElementById("TxtSortieText").value);
    oListItem.set_item("Statut", appHelper.Status.ENATTENTE);
    oListItem.set_item("StatutLibelle", "VALIDATION DU SUPERIEUR HIERARCHIQUE");
    oListItem.set_item("Montant", montant);
    oListItem.set_item("Solde", Solde);

    oListItem.set_item("Observation", document.getElementById("TxtObservation").value);
    oListItem.set_item("Title", document.getElementById("TxtTitle").value);

    oListItem.set_item("Demandeur", SP.FieldUserValue.fromUser(App.CurrentUser.Login));
    oListItem.set_item("DemandeurEmail", App.CurrentUser.Email);

    oListItem.set_item("ResponsableN1", App.CurrentUser.ManagerPersonne);
    oListItem.set_item("ResponsableN2", App.CurrentUser.ManagerPersonne2);

    oListItem.set_item("ResponsableN1Email", App.CurrentUser.Manager.Email);
    oListItem.set_item("ResponsableN2Email", App.CurrentUser.Manager2.Email);

    oListItem.update();
    clientContext.load(oListItem);
    clientContext.executeQueryAsync(function () {

      const appUrl = '/pages/regularisationSortieCaisse/show.aspx?ID=' + oListItem.get_id();
      let WF = new WFManager(appHelper.AppCode.REGULARISATIONSORTIECAISSE, appHelper.AppConstante.SiteUrl, appHelper.ListName.Validation, ACTIV_WORKFLOW);
      WF.createWFTask(clientContext, appUrl, appHelper.AppCode.REGULARISATIONSORTIECAISSE, oListItem.get_id(), App.CurrentUser.Manager.Login, App.CurrentUser.Manager2.Login, function () { })

      let idcmb = document.getElementById("cmbSortie").value;
      console.log(idcmb);
      
      appRegularisationSortieCaisse.UpDateStatusSortieCaisse(idcmb, function () { });

      if (callBack) {
        callBack(oListItem);
      }
    }, appSpHelper.writeError);
  }

};


appRegularisationSortieCaisse.Edit = function (demandeid, callBack) {

  let oList = clientContext.get_web().get_lists().getByTitle(appHelper.ListName.RegularisationSortieCaisse);
  let oListItem = oList.getItemById(demandeid);

  var Input = document.getElementById("TxtMontant");
  var Inputsolde = document.getElementById("TxtTxtSolde");

  var autoNumericObject = AutoNumeric.getAutoNumericElement(Input);
  var autoNumericObjectsolde = AutoNumeric.getAutoNumericElement(Inputsolde);

  var montant = autoNumericObject.getNumber();
  var Solde = autoNumericObjectsolde.getNumber();
  console.log(montant, Solde);

  oListItem.set_item("Statut", appHelper.Status.ENATTENTE);
  oListItem.set_item("StatutLibelle", "VALIDATION DU SUPERIEUR HIERARCHIQUE");
  oListItem.set_item("Montant", montant);
  oListItem.set_item("Solde", Solde);

  oListItem.set_item("Observation", document.getElementById("TxtObservation").value);
  oListItem.set_item("Title", document.getElementById("TxtTitle").value);

  oListItem.set_item("Demandeur", SP.FieldUserValue.fromUser(App.CurrentUser.Login));
  oListItem.set_item("DemandeurEmail", App.CurrentUser.Email);


  oListItem.set_item("ResponsableN1", App.CurrentUser.ManagerPersonne);
  oListItem.set_item("ResponsableN2", App.CurrentUser.ManagerPersonne2);

  oListItem.set_item("ResponsableN1Email", App.CurrentUser.Manager.Email);
  oListItem.set_item("ResponsableN2Email", App.CurrentUser.Manager2.Email);


  oListItem.update();
  clientContext.load(oListItem);
  clientContext.executeQueryAsync(function () {

    const appUrl = '/pages/regularisationSortieCaisse/show.aspx?ID=' + oListItem.get_id();
    let WF = new WFManager(appHelper.AppCode.REGULARISATIONSORTIECAISSE, appHelper.AppConstante.SiteUrl, appHelper.ListName.Validation, ACTIV_WORKFLOW);
    WF.createWFTask(clientContext, appUrl, appHelper.AppCode.REGULARISATIONSORTIECAISSE, oListItem.get_id(), App.CurrentUser.Manager.Login, App.CurrentUser.Manager2.Login, function () { })
    if (callBack) {
      callBack(oListItem);
    }
  }, appSpHelper.writeError);
};


appRegularisationSortieCaisse.ShowDetails = function (demandeid, callBack) {

  let oList = appRegularisationSortieCaisse.clientContext.get_web().get_lists().getByTitle(appHelper.ListName.RegularisationSortieCaisse);
  let It = oList.getItemById(demandeid);
  console.log(demandeid);
  console.log("IN ShowDetails");

  appRegularisationSortieCaisse.clientContext.load(It);
  appRegularisationSortieCaisse.clientContext.executeQueryAsync(function () {
    if (It) {

      document.getElementById("TxtTitle").value = It.get_item('Title') != null ? It.get_item('Title') : '';
      document.getElementById("TxtMontant").value = It.get_item('Montant') != null ? It.get_item('Montant') : 0;
      document.getElementById("TxtObservation").value = It.get_item('Observation') != null ? It.get_item('Observation') : '';
      document.getElementById("TxtSolde").value = It.get_item('Solde') != null ? It.get_item('Solde') : '';
      document.getElementById("TxtVerif").value = 'Edit';
      document.getElementById("TxtID").value = It.get_item('ID') != null ? It.get_item('ID') : 0;

      if (callBack) { callBack(); }

    } else { if (callBack) { callBack(); } }
  }, appSpHelper.writeError);
}

appRegularisationSortieCaisse.ShowSortie = function (demandeid, callBack) {

  let oList = appRegularisationSortieCaisse.clientContext.get_web().get_lists().getByTitle(appHelper.ListName.SortieCaisse);
  let It = oList.getItemById(demandeid);
  console.log(demandeid);
  console.log("IN ShowSortie");

  appRegularisationSortieCaisse.clientContext.load(It);
  appRegularisationSortieCaisse.clientContext.executeQueryAsync(function () {
    if (It) {

      document.getElementById("TxtSortieID").value = demandeid;
      document.getElementById("TxtSortie").value = It.get_item('Title') != null ? It.get_item('Title') : '';

      if (callBack) { callBack(); }

    } else { if (callBack) { callBack(); } }
  }, appSpHelper.writeError);
}

appRegularisationSortieCaisse.UpDateStatusSortieCaisse = function (demandeid, callBack) {
  let oList1 = clientContext.get_web().get_lists().getByTitle(appHelper.ListName.SortieCaisse);
  let It1 = oList1.getItemById(demandeid);

  console.log("ID UPDATE : " + demandeid);

  if (It1) {
    console.log("test");
    It1.set_item("Statut", "ENATTENTEREGULARISATION");
    It1.set_item("StatutLibelle", "En attente de regularisation ");
  }
  It1.update();
  clientContext.load(It1);
  clientContext.executeQueryAsync(function () {
    if (callBack) {
      callBack();
    }
  }, appSpHelper.writeError);
}

// document.addEventListener("DOMContentLoaded", () => {
//   ExecuteOrDelayUntilScriptLoaded(function(){
SP.SOD.executeFunc('sp.js', 'SP.ClientContext', appRegularisationSortieCaisse.InitializePage);
//   }, "SP.ClientContext");
// });

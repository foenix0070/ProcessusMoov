var appRegularisationSortieCaisse = appRegularisationSortieCaisse || {};
var clientContext;
appRegularisationSortieCaisse.clientContext;


appRegularisationSortieCaisse.InitializePage = function () {
  appRegularisationSortieCaisse.clientContext = SP.ClientContext.get_current();
  clientContext = SP.ClientContext.get_current();
  appSpHelper.GetMyProperties(function () {
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


    document.getElementById("TxtNom").value = App.CurrentUser.DisplayName;
    document.getElementById("TxtMatricule").value = App.CurrentUser.Matricule;
    document.getElementById("TxtEmail").value = App.CurrentUser.Email;

  });

  //const BtnAdd = document.querySelector("#demande");
  const BtnSave = document.querySelector("#BtnSave");

  BtnSave.addEventListener("click", function () {
    appRegularisationSortieCaisse.Add(function () {
      location.reload();
    });
  });


  /*
  BtnAdd.addEventListener("click", function () {
    // setTimeout(function () {
    //   appSpHelper.InitializePeoplePicker(
    //     "plePickerInterimaireDiv",
    //     false,
    //     "350px"
    //   );
    // }, 2000);

  });
  */


};

appRegularisationSortieCaisse.Add = function (callBack) {
  let oList = appRegularisationSortieCaisse.clientContext
    .get_web()
    .get_lists()
    .getByTitle(appHelper.ListName.SortieCaisse);
  let itemCreateInfo = new window.SP.ListItemCreationInformation();
  let oListItem = oList.addItem(itemCreateInfo);

  oListItem.set_item("Statut", appHelper.Status.ENATTENTE);
  oListItem.set_item("StatutLibelle", "Validation du supérieur hiérarchique");
  oListItem.set_item("Montant", parseInt(document.getElementById("TxtMontant").value));
  oListItem.set_item("Solde", document.getElementById("TxtSolde").value);
 
  oListItem.set_item("Observation", document.getElementById("TxtObservation").value);
  oListItem.set_item("Title", document.getElementById("TxtTitle").value);
  //oListItem.set_item("DocJustificatifs",document.getElementById("FileDoc").value);

  oListItem.set_item("Demandeur", SP.FieldUserValue.fromUser(App.CurrentUser.Login));
  oListItem.set_item("DemandeurEmail", App.CurrentUser.Email);


  oListItem.set_item("ResponsableN1", App.CurrentUser.ManagerPersonne);
  oListItem.set_item("ResponsableN2", App.CurrentUser.ManagerPersonne2);

  oListItem.set_item("ResponsableN1Email", App.CurrentUser.Manager.Email);
  oListItem.set_item("ResponsableN2Email", App.CurrentUser.Manager2.Email);


  oListItem.update();
  clientContext.load(oListItem);
  clientContext.executeQueryAsync(function () {


    //const appUrl = '/pages/regularisationSortieCaisse/show.aspx?ID=' + oListItem.get_id();
    /*let WF = new WFManager(appHelper.AppCode.SORTIECAISSE, appHelper.AppConstante.SiteUrl, appHelper.ListName.Validation, ACTIV_WORKFLOW);
    WF.createWFTask(clientContext, appUrl, appHelper.AppCode.SORTIECAISSE, oListItem.get_id(), App.CurrentUser.Manager.Login, App.CurrentUser.Manager2.Login, function () {

      if (callBack) {
        callBack(oListItem);
      }

    })*/

    const appUrl = '/pages/regularisationSortieCaisse/show.aspx?ID=' + oListItem.get_id();
      let WF = new WFManager(appHelper.AppCode.REGULARISATIONSORTIECAISSE,  appHelper.AppConstante.SiteUrl, appHelper.ListName.Validation,  ACTIV_WORKFLOW  );
      WF.createWFTask(clientContext,appUrl, appHelper.AppCode.REGULARISATIONSORTIECAISSE, oListItem.get_id(), App.CurrentUser.Manager.Login, App.CurrentUser.Manager2.Login, function(){}   )
      if(callBack){
        callBack(oListItem);
      }
  }, appSpHelper.writeError);
};


// document.addEventListener("DOMContentLoaded", () => {
//   ExecuteOrDelayUntilScriptLoaded(function(){
SP.SOD.executeFunc('sp.js', 'SP.ClientContext', appRegularisationSortieCaisse.InitializePage);
//   }, "SP.ClientContext");
// });

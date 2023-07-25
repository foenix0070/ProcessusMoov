var appVehicule = appVehicule || {};
var clientContext;
appVehicule.clientContext;

appVehicule.InitializePage = function () {
  appVehicule.clientContext = SP.ClientContext.get_current();
  clientContext =  SP.ClientContext.get_current();
  
  const BtnSave = document.querySelector("#BtnSave");
  const TxtIntName = document.querySelector("#TxtIntName");

  TxtIntName.addEventListener("click", function () {

   // document.querySelector("#TxtIntName").value = 'Consultant INOVA';

   });

  BtnSave.addEventListener("click", function () {
    appVehicule.Add (function(){
      location.reload();
    });
  });

};

appVehicule.Add = function ( callBack) {
  let oList = appVehicule.clientContext
    .get_web()
    .get_lists()
    .getByTitle(appHelper.ListName.Vehicule);
  let itemCreateInfo = new window.SP.ListItemCreationInformation();
  let oListItem = oList.addItem(itemCreateInfo);

  let startDate = new Date(
    document.getElementById("TxtDateDepart").value
  );
  let endDate = startDate.addDays(
    parseInt(document.getElementById("TxtNbreJour").value)
  );

  oListItem.set_item("Statut", appHelper.Status.ENATTENTE);

  oListItem.set_item("DateDepart", startDate);
  oListItem.set_item("DateRetour", endDate);
  oListItem.set_item("DateReprise", endDate);
  
  oListItem.set_item(
    "Title",
    document.getElementById("TxtObjet").value
  );

  oListItem.set_item(
    "Nature",
    document.getElementById("TxtNature").value
  );

  oListItem.set_item(
    "NombreJours",
    parseInt(document.getElementById("TxtNbreJour").value)
  );

  oListItem.set_item(
    "Motif",
    parseInt(document.getElementById("TxtMotif").value)
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

//const appUrl = '/tools1/pages/Vehicule/show.aspx?ID=' + oListItem.get_id();
const appUrl = '/pages/Vehicule/show.aspx?ID=' + oListItem.get_id();
      let WF = new WFManager(appHelper.AppCode.Vehicule,  appHelper.AppConstante.SiteUrl, appHelper.ListName.Validation,  ACTIV_WORKFLOW  );
      WF.createWFTask(clientContext,appUrl, appHelper.AppCode.Vehicule, oListItem.get_id(), document.getElementById("TxtSpManagerN1Login").value,document.getElementById("TxtSpManagerN2Login").value, function(){}   )
      if(callBack){
        callBack(oListItem);
      }
  }, appSpHelper.writeError);
};


// document.addEventListener("DOMContentLoaded", () => {
//   ExecuteOrDelayUntilScriptLoaded(function(){
    SP.SOD.executeFunc('sp.js', 'SP.ClientContext', appVehicule.InitializePage);
//   }, "SP.ClientContext");
// });

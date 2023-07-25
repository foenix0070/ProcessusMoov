var appMateriel = appConge || {};
var clientContext;
appMateriel.clientContext;

appMateriel.InitializePage = function () {
  appMateriel.clientContext = SP.ClientContext.get_current();
  clientContext =  SP.ClientContext.get_current();
  
  /*appMateriel.GetInterimData= function(login){
    appSpHelper. GetEmploye(appHelper.ListName.Employe, login, function(it){
      document.getElementById("TxtIntName").value = it.get_item('EmpPrenom') + ' ' + it.get_item('EmpNom');
      document.getElementById("TxtIntMatricule").value =  it.get_item('EmpMatricule');
      document.getElementById("TxtIntEmail").value = it.get_item('EmpMail');
    });
  }*/


  const BtnSave = document.querySelector("#BtnSave");

  /*
  const TxtIntName = document.querySelector("#TxtIntName");
  TxtIntName.addEventListener("click", function () {

   document.querySelector("#TxtIntName").value = 'Consultant INOVA';

   });
   */

  BtnSave.addEventListener("click", function () {
    appMateriel.Add (function(){
      location.reload();
    });
  });

};

appappMateriel.Add = function ( callBack) {
  let oList = appappMateriel.clientContext
    .get_web()
    .get_lists()
    .getByTitle(appHelper.ListName.Conge);
  let itemCreateInfo = new window.SP.ListItemCreationInformation();
  let oListItem = oList.addItem(itemCreateInfo);

  oListItem.set_item("Statut", appHelper.Status.ENATTENTE);
  oListItem.set_item("StatutLibelle", "Validation du supérieur hiérarchique");
  oListItem.set_item(
    "Materiel",
    document.getElementById("TxtMateriel").value
  );
  oListItem.set_item(
    "Quantite",
    parseInt(document.getElementById("TxtQuantite").value)
  );
  oListItem.set_item(
    "Description",
    document.getElementById("TxtMotif").value
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

//const appUrl = '/tools1/pages/conge/show.aspx?ID=' + oListItem.get_id();
const appUrl = '/pages/Materiel/show.aspx?ID=' + oListItem.get_id();
      let WF = new WFManager(appHelper.AppCode.SortieCisse,  appHelper.AppConstante.SiteUrl, appHelper.ListName.Validation,  ACTIV_WORKFLOW  );
      WF.createWFTask(clientContext,appUrl, appHelper.AppCode.SortieCisse, oListItem.get_id(), document.getElementById("TxtSpManagerN1Login").value,document.getElementById("TxtSpManagerN2Login").value, function(){}   )
      if(callBack){
        callBack(oListItem);
      }
  }, appSpHelper.writeError);
};


// document.addEventListener("DOMContentLoaded", () => {
//   ExecuteOrDelayUntilScriptLoaded(function(){
    SP.SOD.executeFunc('sp.js', 'SP.ClientContext', appMateriel.InitializePage);
//   }, "SP.ClientContext");
// });

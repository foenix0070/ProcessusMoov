
var appAdminUserEdit = appAdminUserEdit || {};
var clientContext;
appAdminUserEdit.clientContext;

appAdminUserEdit.InitializePage = function () {
  appAdminUserEdit.clientContext = SP.ClientContext.get_current();
  clientContext =  SP.ClientContext.get_current();
  let Id =  appHelper.GetQueryStringFromAjaxQuery('id');
  appAdminUserEdit.ID = Id;

    setTimeout(function () {
      appSpHelper.InitializePeoplePicker(
        "plePickerManagerDiv", false, "400px" );

        appAdminUserEdit.Show(Id, function(){



        });

    }, 2000);

    const BtnSave = document.querySelector("#BtnSave");
    BtnSave.addEventListener("click", function () {
      appAdminUserEdit.Add (function(){
        appAdminUser.loadUser();
        $('.btn-close').click();
      });
    });




}


appAdminUserEdit.Show = function( id, callBack){

  var oList = clientContext.get_web().get_lists().getByTitle(appHelper.ListName.Employe);
  wbs_oListItem = oList.getItemById(id);

  clientContext.load(wbs_oListItem);
  clientContext.executeQueryAsync(
      function () {
          document.getElementById("TxtEmail").value = wbs_oListItem.get_item('EmpEmail');
          document.getElementById("TxtPrenom").value = wbs_oListItem.get_item('EmpPrenom');
          document.getElementById("TxtNom").value = wbs_oListItem.get_item('EmpNom');
          document.getElementById("TxtMatricule").value = wbs_oListItem.get_item('EmpMatricule');
          document.getElementById("TxtNbreJour").value = (wbs_oListItem.get_item('NombreJoursAcquis') ? wbs_oListItem.get_item('NombreJoursAcquis')  : '0' );
          appSpHelper.SetPeoplePickerField("plePickerManagerDiv", wbs_oListItem.get_item("EmpManager").get_lookupValue());

          if(callBack){
            callBack();
          }
      }, function (sender, args) { console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace()); });

}

appAdminUserEdit.Add = function(callBack){

  var oList = clientContext.get_web().get_lists().getByTitle(appHelper.ListName.Employe);
  let  wbs_oListItem = oList.getItemById(appAdminUserEdit.ID);

  wbs_oListItem.set_item('EmpEmail', document.getElementById("TxtEmail").value);
  wbs_oListItem.set_item('EmpPrenom',  document.getElementById("TxtPrenom").value );
   wbs_oListItem.set_item('EmpNom', document.getElementById("TxtNom").value );
   wbs_oListItem.set_item('EmpMatricule', document.getElementById("TxtMatricule").value );
  wbs_oListItem.set_item('NombreJoursAcquis', document.getElementById("TxtNbreJour").value ) ;
  wbs_oListItem.set_item("EmpManager", appSpHelper.GetPeoplePickerVal("plePickerManagerDiv")  );

  wbs_oListItem.update();
  clientContext.load(wbs_oListItem);
  clientContext.executeQueryAsync(function(){

    if(callBack){
    callBack();}

  }, function (sender, args) { console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace()); });

}

// document.addEventListener("DOMContentLoaded", () => {
//   ExecuteOrDelayUntilScriptLoaded(function(){
  SP.SOD.executeFunc('sp.js', 'SP.ClientContext', appAdminUserEdit.InitializePage);
  //   }, "SP.ClientContext");
  // });
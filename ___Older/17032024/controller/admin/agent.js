var appAdminUser = appAdminUser || {};
var clientContext;
appAdminUser.clientContext;



appAdminUser.InitializePage = function () {
  appAdminUser.clientContext = SP.ClientContext.get_current();
  clientContext =  SP.ClientContext.get_current();
  appAdminUser.loadUser();


}



appAdminUser.loadUser = function(){

  let oList = appAdminUser.clientContext
  .get_web()
  .get_lists()
  .getByTitle(appHelper.ListName.Employe);


let camlQuery = new SP.CamlQuery();
camlQuery.set_viewXml(
  "<View><Query>" +
    "</Query></View>"
);

let collListItem = oList.getItems(camlQuery);
appAdminUser.clientContext.load(collListItem);

appAdminUser.clientContext.executeQueryAsync(function (sender, args) {
  if (collListItem.get_count() > 0) {
    var listItemEnumerator = collListItem.getEnumerator();
    let view = {};
    view.emp = [];
    while (listItemEnumerator.moveNext()) {
      var oListItem = listItemEnumerator.get_current();
      view.emp.push({
        id: oListItem.get_item("ID"),
        nom: oListItem.get_item("EmpPrenom") + ' ' + oListItem.get_item("EmpNom") ,
        matricule : oListItem.get_item("EmpMatricule"),
        login: oListItem.get_item("EmpLogin"),
        email: oListItem.get_item("EmpEmail"),
        url : '/tools/pages/admin/agent_edit.aspx?ID=' +oListItem.get_item("ID"),
      });
    }

    appHelper.renderTemplate("tmpl_list_employee", "DivListUser", view);

    appHelper.listenNavigationOffCanvas ("linkOffCanvasNavigationUser", "ffcMainForm");

    $('#tab_user').DataTable();

  }
}, appSpHelper.writeError);

};


// document.addEventListener("DOMContentLoaded", () => {
//   ExecuteOrDelayUntilScriptLoaded(function(){
  SP.SOD.executeFunc('sp.js', 'SP.ClientContext', appAdminUser.InitializePage);
  //   }, "SP.ClientContext");
  // });
var TacheTools = TacheTools || {};
TacheTools.view = {};
TacheTools.view.demandesVal = [];
TacheTools.view.demandesRej = [];
TacheTools.view.demandesEn = [];
TacheTools.view.demandesMod = [];

TacheTools.InitializePage = function () {
  TacheTools.clientContext = SP.ClientContext.get_current();
  clientContext = SP.ClientContext.get_current();


  App.LoadUser(function (CurrentUser) {
    App.LoadManager(CurrentUser.ManagerPersonne, function (manager) {
      App.LoadManager(manager.ManagerPersonne, function (manager2) {
        manager.Manager = manager2;
        CurrentUser.Manager = manager;
        CurrentUser.Manager2 = manager2;
        CurrentUser.ManagerPersonne2 = manager.ManagerPersonne;

        appHelper.Log(CurrentUser);

        TacheTools.listTache();

        TacheTools.listTacheEffectuer();

      });
      //}
      //);
    });
  });
  // TacheTools.Param();

};

TacheTools.listTache = function () {
    let oList = TacheTools.clientContext
      .get_web()
      .get_lists()
      .getByTitle(appHelper.ListName.Validation);
    let camlQuery = new SP.CamlQuery();
  
    var q = '<View>' +
      '<Query>' +
      '<Where>' +
      '<And>' +
      '<Or>' +
      '<Eq>' +
      '<FieldRef ID="AssignedTo" />' +
      '<Value Type="Integer">' +
      '<UserID/>' +
      '</Value>' +
      '</Eq>' +
      '<Membership Type="CurrentUserGroups">' +
      '<FieldRef Name="AssignedTo" />' +
      '</Membership>' +
      '</Or>' +
      '<Eq><FieldRef Name="Status" /><Value Type="Choice">En cours</Value></Eq>' +
      '</And>' +
      '</Where>' +
      '<OrderBy>' +
      '<FieldRef ID="Created" Ascending="False" />' +
      '</OrderBy>' +
      '</Query>' +
      '</View>';
    camlQuery.set_viewXml(q);
  
    let collListItem = oList.getItems(camlQuery);
    TacheTools.clientContext.load(collListItem);
    TacheTools.clientContext.executeQueryAsync(function (sender, args) {
  
      if (collListItem.get_count() > 0) {
        var listItemEnumerator = collListItem.getEnumerator();
        let view = {};
        view.taches = [];
        let _i = 1;
        while (listItemEnumerator.moveNext()) {
          var oListItem = listItemEnumerator.get_current();
          let lien = oListItem.get_item("AppUrl") + '&tacheid=' + oListItem.get_item("ID");
          let creeerpar = oListItem.get_item('Author');
          let creer = creeerpar.get_lookupValue();
          console.log(lien);
  
          view.taches.push({
            //demandeur: demandeurName,
            i: _i,
            id: oListItem.get_item("ID"),
            title: oListItem.get_item("Body"),
            reference: oListItem.get_item("Reference"),
            author: creer,
            requestdate: new Date(oListItem.get_item("Created")).toLocaleDateString(),
            //requestdate: new Date(oListItem.get_item("Created")).toLocaleDateString(),
            startdate: new Date(oListItem.get_item("StartDate")).toLocaleDateString(),
            url: oListItem.get_item("AppUrl") + '&tacheid=' + oListItem.get_item("ID")
          });
          _i++;
        }
        appHelper.renderTemplate("tmpl_table_tache", "DivTacheTableShow", view);
        $('#tab_tache').DataTable();
        //    appHelper.listenNavigationLink ('linkMainNavigation');
  
      }
    }, appSpHelper.writeError);
};

TacheTools.listTacheEffectuer = function () {
    let oList = TacheTools.clientContext
      .get_web()
      .get_lists()
      .getByTitle(appHelper.ListName.Validation);
    let camlQuery = new SP.CamlQuery();
  
    var q = '<View>' +
      '<Query>' +
      '<Where>' +
      '<And>' +
      '<Or>' +
      '<Eq>' +
      '<FieldRef ID="AssignedTo" />' +
      '<Value Type="Integer">' +
      '<UserID/>' +
      '</Value>' +
      '</Eq>' +
      '<Membership Type="CurrentUserGroups">' +
      '<FieldRef Name="AssignedTo" />' +
      '</Membership>' +
      '</Or>' +
      '<Eq><FieldRef Name="Status" /><Value Type="Choice">Terminé</Value></Eq>' +
      '</And>' +
      '</Where>' +
      '<OrderBy>' +
      '<FieldRef ID="Created" Ascending="False" />' +
      '</OrderBy>' +
      '</Query>' +
      '</View>';
    camlQuery.set_viewXml(q);
  
    let collListItem = oList.getItems(camlQuery);
    TacheTools.clientContext.load(collListItem);
    TacheTools.clientContext.executeQueryAsync(function (sender, args) {
  
      if (collListItem.get_count() > 0) {
        var listItemEnumerator = collListItem.getEnumerator();
        let view = {};
        view.taches = [];
        let _i = 1;
        while (listItemEnumerator.moveNext()) {
          var oListItem = listItemEnumerator.get_current();
          let lien = oListItem.get_item("AppUrl") + '&tacheid=' + oListItem.get_item("ID");
          let creeerpar = oListItem.get_item('Author');
          let creer = creeerpar.get_lookupValue();
          console.log(lien);
  
          view.taches.push({
            //demandeur: demandeurName,
            i: _i,
            id: oListItem.get_item("ID"),
            title: oListItem.get_item("Body"),
            reference: oListItem.get_item("Reference"),
            author: creer,
            requestdate: new Date(oListItem.get_item("Created")).toLocaleDateString(),
            //requestdate: new Date(oListItem.get_item("Created")).toLocaleDateString(),
            startdate: new Date(oListItem.get_item("StartDate")).toLocaleDateString(),
            url: oListItem.get_item("AppUrl") + '&tacheid=' + oListItem.get_item("ID")
          });
          _i++;
        }
        appHelper.renderTemplate("tmpl_table_tache", "DivTacheEffectuerTableShow", view);
        $('.table').DataTable();
        //    appHelper.listenNavigationLink ('linkMainNavigation');
  
      }
    }, appSpHelper.writeError);
};

//document.addEventListener("DOMContentLoaded", () => {
// ExecuteOrDelayUntilScriptLoaded(function () {
SP.SOD.executeFunc("sp.js", "SP.ClientContext", TacheTools.InitializePage);
    // }, "SP.ClientContext");
   //});

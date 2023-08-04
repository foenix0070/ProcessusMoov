var MoovTools = MoovTools || {};
MoovTools.view = {};
MoovTools.view.demandes = [];

MoovTools.InitializePage = function () {
  MoovTools.clientContext = SP.ClientContext.get_current();
  clientContext = SP.ClientContext.get_current();


  App.LoadUser(function (CurrentUser) {
    App.LoadManager(CurrentUser.ManagerPersonne, function (manager) {
      App.LoadManager(manager.ManagerPersonne, function (manager2) {
        manager.Manager = manager2;
        CurrentUser.Manager = manager;
        CurrentUser.Manager2 = manager2;
        CurrentUser.ManagerPersonne2 = manager.ManagerPersonne;
        console.log(CurrentUser);
        //appSpHelper.GetMyProperties(function () {
        //appSpHelper.LoadUserCongeParam(
        //appHelper.ListName.Employe,
        //document.getElementById("TxtCurrentUserLogin").value,
        //function () {
        //appSpHelper.GetEmploye(
        //appHelper.ListName.Employe,
        //document.getElementById("TxtSpManagerN1Login").value,
        //function (item) {
        //console.log(item);
        //appSpHelper.GetEmployeeManagerLogin(
        //"N2",
        //item.get_item("EmpManager"),
        //function () {
        span = document.getElementById('spanSolde');
        h4User = document.getElementById('h4User');
        span.innerHTML = App.CurrentUser.NombreJoursAcquis;
        h4User.innerHTML = App.CurrentUser.DisplayName;

        MoovTools.listTache();

        //MoovTools.ListConge();
        MoovTools.ListDemande(appHelper.ListName.Conge, "conge", "CONGES", function () {
          MoovTools.ListDemande(appHelper.ListName.SortieCaisse, "sortieCaisse", "SORTIE CAISSE", function () {
            MoovTools.ListDemande(appHelper.ListName.RegularisationSortieCaisse, "regularisationSortieCaisse", "REGULARISATION SORTIE CAISSE", function () {
              MoovTools.ListDemande(appHelper.ListName.Materiel, "materiel", "MATERIEL", function () {
                MoovTools.ListDemande(appHelper.ListName.FraisMission, "fraisMission", "FRAIS MISSION", function () {
                  MoovTools.ListDemande(appHelper.ListName.RegularisationFraisMission, "regularisationFraisMission", "REGULARISATION FRAIS MISSION", function () {
                    MoovTools.ListDemande(appHelper.ListName.Vehicule, "vehicule", "VEHICULE", function () {
                      MoovTools.ListDemande(appHelper.ListName.Gadget, "gadget", "GADGET", function () {
                        MoovTools.ListDemande(appHelper.ListName.Absence, "autorisationAbsence", "ABSENCE", function () {
                          appHelper.renderTemplate("tmpl_table_demande", "DivDemandeTableShow", MoovTools.view);

                          //   appHelper.listenNavigationLink ('linkMainNavigation');
                          const linkClick = document.getElementsByClassName('click');
                          for (var i = 0; i < linkClick.length; i++) {
                            linkClick[i].addEventListener("click", function () {
                              let url = this.getAttribute("data-url");
                              sessionStorage.setItem("ajax_url", url);
                              $.ajax({
                                url: url,
                                method: 'GET',
                                dataType: 'html',
                                success: function (data) {
                                  $('#reponseAjax').html(data);
                                },
                                error: function () {
                                  $('#reponseAjax').html('Erreur lors du chargement des données.');
                                }
                              });

                              return false;
                            });
                          }
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });

        //}
        //);
        //  }
        //);
      });
    });
    //}
    //);
  });

};


MoovTools.hidePopup = function () {
  document.getElementById("popup").style.display = "none";
};

MoovTools.hidePopup();


MoovTools.ListConge = function () {
  let oList = MoovTools.clientContext
    .get_web()
    .get_lists()
    .getByTitle(appHelper.ListName.Conge);
  let camlQuery = new SP.CamlQuery();
  camlQuery.set_viewXml(
    "<View><Query><Where>" +
    '<Eq><FieldRef ID="Demandeur" /><Value Type="Integer"><UserID/></Value></Eq>' +
    "</Where></Query></View>"
  );
  let collListItem = oList.getItems(camlQuery);
  MoovTools.clientContext.load(collListItem);
  MoovTools.clientContext.executeQueryAsync(function (sender, args) {
    if (collListItem.get_count() > 0) {
      var listItemEnumerator = collListItem.getEnumerator();
      let view = {};
      view.conges = [];
      while (listItemEnumerator.moveNext()) {
        var oListItem = listItemEnumerator.get_current();
        view.conges.push({
          id: oListItem.get_item("ID"),
          title: oListItem.get_item("Title"),
          startdate: new Date(oListItem.get_item("DateDepart")).toLocaleDateString(),
          nbre: oListItem.get_item("NombreJours"),
          status: oListItem.get_item("StatutLibelle"),
          classe: appHelper.Status.GetClass(oListItem.get_item("Statut")),
        });
      }

      appHelper.renderTemplate("tmpl_table_conge", "DivCongeTableShow", view);

      //   appHelper.listenNavigationLink ('linkMainNavigation');
      const linkClick = document.getElementsByClassName('click');
      for (var i = 0; i < linkClick.length; i++) {
        linkClick[i].addEventListener("click", function () {
          let url = this.getAttribute("data-url");
          sessionStorage.setItem("ajax_url", url);
          $.ajax({
            url: url,
            method: 'GET',
            dataType: 'html',
            success: function (data) {
              $('#reponseAjax').html(data);
            },
            error: function () {
              $('#reponseAjax').html('Erreur lors du chargement des données.');
            }
          });

          return false;
        });
      }

    }
  }, appSpHelper.writeError);
};

MoovTools.ListDemande = function (DemandeList, nomdurepertoire, nomduprocessus, callback) {
  let oList = MoovTools.clientContext
    .get_web()
    .get_lists()
    .getByTitle(DemandeList);
  let camlQuery = new SP.CamlQuery();
  camlQuery.set_viewXml(
    "<View><Query><Where>" +
    '<Eq><FieldRef ID="Demandeur" /><Value Type="Integer"><UserID/></Value></Eq>' +
    "</Where></Query></View>"
  );
  let collListItem = oList.getItems(camlQuery);
  MoovTools.clientContext.load(collListItem);
  MoovTools.clientContext.executeQueryAsync(function (sender, args) {
    if (collListItem.get_count() > 0) {
      var listItemEnumerator = collListItem.getEnumerator();

      while (listItemEnumerator.moveNext()) {
        var oListItem = listItemEnumerator.get_current();
        MoovTools.view.demandes.push({
          id: oListItem.get_item("ID"),
          title: oListItem.get_item("Title"),
          requestdate: new Date(oListItem.get_item("Created")).toLocaleDateString(),
          status: oListItem.get_item("StatutLibelle"),
          classe: appHelper.Status.GetClass(oListItem.get_item("Statut")),
          repertoire: nomdurepertoire,
          nomdemande: nomduprocessus,
        });

      }
    }

    if (callback) {
      callback();
    }
  }, appSpHelper.writeError);
};


MoovTools.listTache = function () {
  let oList = MoovTools.clientContext
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
    '</Query>' +
    '</View>';
  camlQuery.set_viewXml(q);

  let collListItem = oList.getItems(camlQuery);
  MoovTools.clientContext.load(collListItem);
  MoovTools.clientContext.executeQueryAsync(function (sender, args) {

    if (collListItem.get_count() > 0) {
      var listItemEnumerator = collListItem.getEnumerator();
      let view = {};
      view.taches = [];
      while (listItemEnumerator.moveNext()) {
        var oListItem = listItemEnumerator.get_current();
        view.taches.push({
          id: oListItem.get_item("ID"),
          title: oListItem.get_item("Body"),
          startdate: new Date(oListItem.get_item("StartDate")).toLocaleDateString(),
          url: oListItem.get_item("AppUrl") + '&tacheid=' + oListItem.get_item("ID")
        });
      }

      appHelper.renderTemplate("tmpl_table_tache", "DivTacheTableShow", view);
      //    appHelper.listenNavigationLink ('linkMainNavigation');

    }
  }, appSpHelper.writeError);
};

MoovTools.listTacheTest = function () {
  let oList = MoovTools.clientContext
    .get_web()
    .get_lists()
    .getByTitle(appHelper.ListName.Validation);
  let camlQuery = new SP.CamlQuery();

  var q = '<View>' +
    '<Query>' +
    '<Where>' +
    '<Eq><FieldRef Name="Status" /><Value Type="Choice">En cours</Value></Eq>' +
    '</Where>' +
    '</Query>' +
    '</View>';
  camlQuery.set_viewXml(q);

  let collListItem = oList.getItems(camlQuery);
  MoovTools.clientContext.load(collListItem);
  MoovTools.clientContext.executeQueryAsync(function (sender, args) {

    if (collListItem.get_count() > 0) {
      var listItemEnumerator = collListItem.getEnumerator();
      let view = {};
      view.taches = [];
      while (listItemEnumerator.moveNext()) {
        var oListItem = listItemEnumerator.get_current();
        view.taches.push({
          id: oListItem.get_item("ID"),
          title: oListItem.get_item("Body"),
          startdate: new Date(oListItem.get_item("StartDate")).toLocaleDateString(),
          url: oListItem.get_item("AppUrl") + '&tacheid=' + oListItem.get_item("ID")
        });
      }

      appHelper.renderTemplate("tmpl_table_tache", "DivTacheTableShow", view);
      //    appHelper.listenNavigationLink ('linkMainNavigation');

    }
  }, appSpHelper.writeError);
};

//document.addEventListener("DOMContentLoaded", () => {
// ExecuteOrDelayUntilScriptLoaded(function () {
SP.SOD.executeFunc("sp.js", "SP.ClientContext", MoovTools.InitializePage);
 // }, "SP.ClientContext");
//});

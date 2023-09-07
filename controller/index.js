var MoovTools = MoovTools || {};
MoovTools.view = {};
MoovTools.view.demandes = [];
MoovTools.view.demandesEn = [];
MoovTools.view.demandesEnt = [];
MoovTools.view.demandesVal = [];
MoovTools.totalDemandes = 0;
MoovTools.totalDemandesEnt = 0;
MoovTools.totalDemandesValider = 0;
MoovTools.totalTaches = 0;

MoovTools.InitializePage = function () {
  MoovTools.clientContext = SP.ClientContext.get_current();
  clientContext = SP.ClientContext.get_current();

  appHelper.renderTemplate('tmpl_side_main_menu item', 'accSideMainMenuItem', main.view1);

  App.LoadUser(function (CurrentUser) {
    App.LoadManager(CurrentUser.ManagerPersonne, function (manager) {
      App.LoadManager(manager.ManagerPersonne, function (manager2) {
        manager.Manager = manager2;
        CurrentUser.Manager = manager;
        CurrentUser.Manager2 = manager2;
        CurrentUser.ManagerPersonne2 = manager.ManagerPersonne;
        appHelper.Log(CurrentUser);

        MoovTools.listTache();

        MoovTools.ListDemandeEnAttente(appHelper.ListName.Absence, "autorisationAbsence", "ABSENCE", function () {
          document.getElementById("demenattente").innerHTML = MoovTools.totalDemandesEnt;
          MoovTools.ListDemandeEnAttente(appHelper.ListName.Conge, "conge", "CONGES", function () {
            document.getElementById("demenattente").innerHTML = MoovTools.totalDemandesEnt;
            MoovTools.ListDemandeEnAttente(appHelper.ListName.Gadget, "gadget", "GADGET", function () {
              document.getElementById("demenattente").innerHTML = MoovTools.totalDemandesEnt;
              MoovTools.ListDemandeEnAttente(appHelper.ListName.Materiel, "materiel", "MATERIEL", function () {
                document.getElementById("demenattente").innerHTML = MoovTools.totalDemandesEnt;
                MoovTools.ListDemandeEnAttente(appHelper.ListName.Mission, "fraisMission", "MISSION", function () {
                  document.getElementById("demenattente").innerHTML = MoovTools.totalDemandesEnt;
                  MoovTools.ListDemandeEnAttente(appHelper.ListName.RegularisationFraisMission, "regularisationFraisMission", "REGULARISATION MISSION", function () {
                    document.getElementById("demenattente").innerHTML = MoovTools.totalDemandesEnt;
                    MoovTools.ListDemandeEnAttente(appHelper.ListName.RegularisationSortieCaisse, "regularisationSortieCaisse", "REGULARISATION DE SORTIE DE CAISSE", function () {
                      document.getElementById("demenattente").innerHTML = MoovTools.totalDemandesEnt;
                      MoovTools.ListDemandeEnAttente(appHelper.ListName.SortieCaisse, "sortieCaisse", "SORTIE DE CAISSE", function () {
                        document.getElementById("demenattente").innerHTML = MoovTools.totalDemandesEnt;
                        MoovTools.ListDemandeEnAttente(appHelper.ListName.Vehicule, "vehicule", "VEHICULE", function () {
                          document.getElementById("demenattente").innerHTML = MoovTools.totalDemandesEnt;


                          appHelper.renderTemplate("tmpl_table_demande_enattente", "DivDemandeENTTableShow", MoovTools.view);

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

        MoovTools.ListDemandeEnCours(appHelper.ListName.Conge, "conge", "CONGES", function () {
          document.getElementById("demcours").innerHTML = MoovTools.totalDemandes;
          MoovTools.ListDemandeEnCours(appHelper.ListName.SortieCaisse, "sortieCaisse", "SORTIE DE CAISSE", function () {
            document.getElementById("demcours").innerHTML = MoovTools.totalDemandes;
            MoovTools.ListDemandeEnCours(appHelper.ListName.RegularisationSortieCaisse, "regularisationSortieCaisse", "REGULARISATION DE SORTIE DE CAISSE", function () {
              document.getElementById("demcours").innerHTML = MoovTools.totalDemandes;
              MoovTools.ListDemandeEnCours(appHelper.ListName.Materiel, "materiel", "MATERIEL", function () {
                document.getElementById("demcours").innerHTML = MoovTools.totalDemandes;

                MoovTools.ListDemandeEnCours(appHelper.ListName.Vehicule, "vehicule", "VEHICULE", function () {
                  document.getElementById("demcours").innerHTML = MoovTools.totalDemandes;

                  MoovTools.ListDemandeEnCours(appHelper.ListName.Gadget, "gadget", "GADGET", function () {
                    document.getElementById("demcours").innerHTML = MoovTools.totalDemandes;

                    MoovTools.ListDemandeEnCours(appHelper.ListName.Absence, "autorisationAbsence", "ABSENCE", function () {
                      document.getElementById("demcours").innerHTML = MoovTools.totalDemandes;

                      MoovTools.ListDemandeEnCours(appHelper.ListName.Mission, "fraisMission", "MISSION", function () {
                        document.getElementById("demcours").innerHTML = MoovTools.totalDemandes;

                        MoovTools.ListDemandeEnCours(appHelper.ListName.RegularisationFraisMission, "regularisationFraisMission", "REGULARISATION MISSION", function () {
                          document.getElementById("demcours").innerHTML = MoovTools.totalDemandes;

                          appHelper.renderTemplate("tmpl_table_demande_encours", "DivDemandeETableShow", MoovTools.view);

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
                        //});
                      });
                    });
                  });
                });
              });
            });
          });

        });

        MoovTools.ListDemandeValider(appHelper.ListName.Conge, "conge", "CONGES", function () {
          document.getElementById("demval").innerHTML = MoovTools.totalDemandesValider;
          MoovTools.ListDemandeValider(appHelper.ListName.SortieCaisse, "sortieCaisse", "SORTIE DE CAISSE", function () {
            document.getElementById("demval").innerHTML = MoovTools.totalDemandesValider;
            MoovTools.ListDemandeValider(appHelper.ListName.RegularisationSortieCaisse, "regularisationSortieCaisse", "REGULARISATION DE SORTIE DE CAISSE", function () {
              document.getElementById("demval").innerHTML = MoovTools.totalDemandesValider;
              MoovTools.ListDemandeValider(appHelper.ListName.Materiel, "materiel", "MATERIEL", function () {
                document.getElementById("demval").innerHTML = MoovTools.totalDemandesValider;

                MoovTools.ListDemandeValider(appHelper.ListName.Vehicule, "vehicule", "VEHICULE", function () {
                  document.getElementById("demval").innerHTML = MoovTools.totalDemandesValider;

                  MoovTools.ListDemandeValider(appHelper.ListName.Gadget, "gadget", "GADGET", function () {
                    document.getElementById("demval").innerHTML = MoovTools.totalDemandesValider;

                    MoovTools.ListDemandeValider(appHelper.ListName.Absence, "autorisationAbsence", "ABSENCE", function () {
                      document.getElementById("demval").innerHTML = MoovTools.totalDemandesValider;

                      MoovTools.ListDemandeValider(appHelper.ListName.Mission, "fraisMission", "MISSION", function () {
                        document.getElementById("demval").innerHTML = MoovTools.totalDemandesValider;

                        MoovTools.ListDemandeValider(appHelper.ListName.RegularisationFraisMission, "regularisationFraisMission", "REGULARISATION MISSION", function () {
                          document.getElementById("demval").innerHTML = MoovTools.totalDemandesValider;

                          appHelper.renderTemplate("tmpl_table_demande_val", "DivDemandeVTableShow", MoovTools.view);

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
                        //});
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
    });
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
        let demandeurField = oListItem.get_item('Demandeur');
        let demandeurName = demandeurField.get_lookupValue();
        let creeerpar = oListItem.get_item('Author');
        let creer = creeerpar.get_lookupValue();
        MoovTools.view.demandes.push({
          demandeur: demandeurName,
          create: creer,
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

MoovTools.ListDemandeEnAttente = function (DemandeList, nomdurepertoire, nomduprocessus, callback) {
  let oList = MoovTools.clientContext
    .get_web()
    .get_lists()
    .getByTitle(DemandeList);
  let camlQuery = new SP.CamlQuery();
  var q = `<View>
              <Query>
                <Where>
                  <And>
                    <Eq><FieldRef ID="Demandeur"/><Value Type="Integer"><UserID/></Value></Eq>
                    <Eq><FieldRef ID="Statut"/><Value Type="Text">ENATTENTE</Value></Eq>
                  </And>
                </Where>
                <OrderBy>
                <FieldRef ID="Created" Ascending="False" />
                </OrderBy>
              </Query>
              <RowLimit Paged='False'>5</RowLimit>
            </View>`;

  camlQuery.set_viewXml(q);

  let collListItem = oList.getItems(camlQuery);
  MoovTools.clientContext.load(collListItem);
  MoovTools.clientContext.executeQueryAsync(function (sender, args) {
    if (collListItem.get_count() > 0) {

      MoovTools.totalDemandesEnt += collListItem.get_count();
      appHelper.Log(MoovTools.totalDemandesEnt);
      var listItemEnumerator = collListItem.getEnumerator();

      while (listItemEnumerator.moveNext()) {
        var oListItem = listItemEnumerator.get_current();
        let demandeurField = oListItem.get_item('Demandeur');
        let demandeurName = demandeurField.get_lookupValue();
        let creeerpar = oListItem.get_item('Author');
        let creer = creeerpar.get_lookupValue();
        MoovTools.view.demandesEnt.push({
          date: oListItem.get_item("Created"),
          demandeur: demandeurName,
          create: creer,
          id: oListItem.get_item("ID"),
          title: oListItem.get_item("Title"),
          requestdate: new Date(oListItem.get_item("Created")).toLocaleDateString(),
          status: oListItem.get_item("StatutLibelle"),
          classe: appHelper.Status.GetClass(oListItem.get_item("Statut")),
          repertoire: nomdurepertoire,
          nomdemande: nomduprocessus,
        });

      }
      MoovTools.view.demandesEnt.sort((a, b) => b.date - a.date);

    }

    if (callback) {
      callback();
    }
  }, appSpHelper.writeError);
};

MoovTools.ListDemandeEnCours = function (DemandeList, nomdurepertoire, nomduprocessus, callback) {
  let oList = MoovTools.clientContext
    .get_web()
    .get_lists()
    .getByTitle(DemandeList);
  let camlQuery = new SP.CamlQuery();
  var q = `<View>
              <Query>
                <Where>
                  <And>
                    <Eq><FieldRef ID="Demandeur"/><Value Type="Integer"><UserID/></Value></Eq>
                    <Eq><FieldRef ID="Statut"/><Value Type="Text">ENCOURS</Value></Eq>
                  </And>
                </Where>
              </Query>
              <RowLimit Paged='False'>5</RowLimit>
            </View>`;

  camlQuery.set_viewXml(q);

  let collListItem = oList.getItems(camlQuery);
  MoovTools.clientContext.load(collListItem);
  MoovTools.clientContext.executeQueryAsync(function (sender, args) {
    if (collListItem.get_count() > 0) {
      MoovTools.totalDemandes += collListItem.get_count();
      appHelper.Log(MoovTools.totalDemandes);
      var listItemEnumerator = collListItem.getEnumerator();

      while (listItemEnumerator.moveNext()) {
        var oListItem = listItemEnumerator.get_current();
        let demandeurField = oListItem.get_item('Demandeur');
        let demandeurName = demandeurField.get_lookupValue();
        let creeerpar = oListItem.get_item('Author');
        let creer = creeerpar.get_lookupValue();
        MoovTools.view.demandesEn.push({
          demandeur: demandeurName,
          create: creer,
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

MoovTools.ListDemandeValider = function (DemandeList, nomdurepertoire, nomduprocessus, callback) {
  let oList = MoovTools.clientContext
    .get_web()
    .get_lists()
    .getByTitle(DemandeList);
  let camlQuery = new SP.CamlQuery();
  var q = `<View>
              <Query>
                <Where>
                <Or>
                  <And>
                    <Eq><FieldRef ID="Demandeur"/><Value Type="Integer"><UserID/></Value></Eq>
                    <Eq><FieldRef ID="Statut"/><Value Type="Text">VALIDEE</Value></Eq>
                  </And>
                  <Eq><FieldRef ID="Statut" /><Value Type="Text">ENATTENTEREGULARISATION</Value></Eq>
                </Or>
                </Where>
              </Query>
              <RowLimit Paged='False'>5</RowLimit>
            </View>`;

  camlQuery.set_viewXml(q);

  let collListItem = oList.getItems(camlQuery);
  MoovTools.clientContext.load(collListItem);
  MoovTools.clientContext.executeQueryAsync(function (sender, args) {
    if (collListItem.get_count() > 0) {
      MoovTools.totalDemandesValider += collListItem.get_count();
      appHelper.Log("Valider : " + MoovTools.totalDemandesValider);
      var listItemEnumerator = collListItem.getEnumerator();

      while (listItemEnumerator.moveNext()) {
        var oListItem = listItemEnumerator.get_current();
        let demandeurField = oListItem.get_item('Demandeur');
        let demandeurName = demandeurField.get_lookupValue();
        let creeerpar = oListItem.get_item('Author');
        let creer = creeerpar.get_lookupValue();
        MoovTools.view.demandesVal.push({
          demandeur: demandeurName,
          create: creer,
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
    '<OrderBy>' +
    '<FieldRef ID="Created" Ascending="False" />' +
    '</OrderBy>' +
    '</Query>' +
    '</View>';
  camlQuery.set_viewXml(q);

  let collListItem = oList.getItems(camlQuery);
  MoovTools.clientContext.load(collListItem);
  MoovTools.clientContext.executeQueryAsync(function (sender, args) {

    if (collListItem.get_count() > 0) {
      MoovTools.totalTaches += collListItem.get_count();
      appHelper.Log("Taches : " + MoovTools.totalTaches);
      document.getElementById("tachetotal").innerHTML = MoovTools.totalTaches;
      var listItemEnumerator = collListItem.getEnumerator();
      let view = {};
      view.taches = [];
      while (listItemEnumerator.moveNext()) {
        var oListItem = listItemEnumerator.get_current();
        let lien = oListItem.get_item("AppUrl") + '&tacheid=' + oListItem.get_item("ID");
        console.log(lien);
        view.taches.push({
          id: oListItem.get_item("ID"),
          title: oListItem.get_item("Body"),
          startdate: new Date(oListItem.get_item("StartDate")).toLocaleDateString(),
          url: oListItem.get_item("AppUrl") + '&tacheid=' + oListItem.get_item("ID")
        });
      }

      document.getElementById("divListTaches").style.display = "block";
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

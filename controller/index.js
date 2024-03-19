var MoovTools = MoovTools || {};
MoovTools.view = {};
MoovTools.view.demandes = [];
MoovTools.view.reprise = [];
MoovTools.view.demandesEn = [];
MoovTools.view.demandesEnt = [];
MoovTools.view.demandesVal = [];
MoovTools.totalDemandes = 0;
MoovTools.totalDemandesEnt = 0;
MoovTools.totalDemandesValider = 0;
MoovTools.totalTaches = 0;
MoovTools.totalReprise = 0;
MoovTools.listeReprise = [];

MoovTools.InitializePage = function () {
  MoovTools.clientContext = SP.ClientContext.get_current();
  clientContext = SP.ClientContext.get_current();

  appHelper.renderTemplate('tmpl_side_main_menu_item', 'accSideMainMenuItem', main.view1);

  App.LoadUser(function (CurrentUser) {

    App.LoadManager(CurrentUser.ManagerPersonne, function (manager) {
      console.log('Donnee Manager 1 Loadxx resultat Login', manager);
      App.LoadManager(manager.ManagerPersonne, function (manager2) {
        console.log('Donnee Manager 2 Loadxx resultat Login', manager2);
        App.LoadGroups(ACTIV_GROUPS2.slice(), function () {
          manager.Manager = manager2;
          CurrentUser.Manager = manager;
          CurrentUser.Manager2 = manager2;
          CurrentUser.ManagerPersonne2 = manager.ManagerPersonne;
          appHelper.Log(CurrentUser);
          console.log("CurrentUser.Email");
          console.log(CurrentUser.Email);
          console.log(CurrentUser.Mail);
          console.log(CurrentUser.MailPersonnel);

          //document.getElementById("reprise").style.display = "block";

          MoovTools.Verification(CurrentUser.Email, CurrentUser.Mail);

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
                    MoovTools.ListDemandeEnAttente(appHelper.ListName.RegularisationFraisMission, "regularisationFraisMission", "REGULARISATION FRAIS DE MISSION", function () {
                      document.getElementById("demenattente").innerHTML = MoovTools.totalDemandesEnt;
                      MoovTools.ListDemandeEnAttente(appHelper.ListName.RegularisationSortieCaisse, "regularisationSortieCaisse", "REGULARISATION DE SORTIE DE CAISSE", function () {
                        document.getElementById("demenattente").innerHTML = MoovTools.totalDemandesEnt;
                        MoovTools.ListDemandeEnAttente(appHelper.ListName.SortieCaisse, "sortieCaisse", "SORTIE DE CAISSE", function () {
                          document.getElementById("demenattente").innerHTML = MoovTools.totalDemandesEnt;
                          MoovTools.ListDemandeEnAttente(appHelper.ListName.Vehicule, "vehicule", "VEHICULE", function () {
                            MoovTools.ListDemandeEnAttente(appHelper.ListName.Reprise, "reprise", "REPRISE DE SERVICE", function () {
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

                            MoovTools.ListDemandeEnCours(appHelper.ListName.Reprise, "reprise", "REPRISE DE SERVICE", function () {
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

                            MoovTools.ListDemandeValider(appHelper.ListName.Reprise, "reprise", "REPRISE DE SERVICE", function () {
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

          MoovTools.ListeReprise(appHelper.ListName.Conge, "Conge", function () {
            // MoovTools.ListeReprise(appHelper.ListName.Conge, "Conge", function (reprise) {
            // MoovTools.listeReprise = reprise;
            MoovTools.ListeReprise(appHelper.ListName.Absence, "Absence", function () {
              // MoovTools.listeReprise = reprise;
              appHelper.renderTemplate("tmpl_table_reprise", "DivRepriseTable", MoovTools.view);
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

              if (MoovTools.totalReprise > 0) {
                // if (MoovTools.listeReprise.length > 0) {
                // alert("Vous avez une demande de Reprise de service à effectuer !");
                MoovTools.AfficherNotification();
              }
            });
          });


        })


      });
      //}
      //);
    });
  });

  // Récupérez l'élément du titre dans le DOM
  var titreofcanvas = document.getElementById('ffcMainFormTitle');

  // Récupérez le conteneur du menu dans le DOM
  var menubutton = document.getElementById('accSideMainMenuItem');

  // Écoutez les clics sur les éléments du menu
  menubutton.addEventListener('click', function (event) {
    var demande = event.target.getAttribute('data-menu-id');
    if (demande) {
      // Mettez à jour le titre lorsque l'élément du menu est cliqué
      titreofcanvas.textContent = "Demande de " + demande;
    }
  });

};


MoovTools.hidePopup = function () {
  document.getElementById("popup").style.display = "none";
};

MoovTools.hidePopup();

MoovTools.Verification = function (email, mail) {
  if (email == null || mail == null) {
    document.getElementById("accSideMainMenuItem").style.display = "none";
  }
}


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
          reference: oListItem.get_item("Reference"),
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
                  <Or>
                    <And>
                      <Eq><FieldRef ID="Demandeur"/><Value Type="Integer"><UserID/></Value></Eq>
                      <Eq><FieldRef ID="Statut"/><Value Type="Text">VALIDEE</Value></Eq>
                    </And>
                    <Eq><FieldRef ID="Statut" /><Value Type="Text">ENATTENTEREPRISE</Value></Eq>
                  </Or>
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


MoovTools.ListeReprise = function (DemandeList, type, callback) {
  let oList = MoovTools.clientContext
    .get_web()
    .get_lists()
    .getByTitle(DemandeList);
  let q = `<View><Query><Where><And>
              <Eq><FieldRef ID="Demandeur"/><Value Type="Integer"><UserID/></Value></Eq>
              <Eq><FieldRef ID="Statut"/><Value Type="Text">RETOURCONGE</Value></Eq>
          </And></Where></Query></View>`;

  let camlQuery = new SP.CamlQuery();

  camlQuery.set_viewXml(q);
  let collListItem = oList.getItems(camlQuery);
  MoovTools.clientContext.load(collListItem);
  MoovTools.clientContext.executeQueryAsync(function (sender, args) {
    if (collListItem.get_count() > 0) {
      MoovTools.totalReprise += collListItem.get_count();
      console.log("total reprise : "+MoovTools.totalReprise);

      var listItemEnumerator = collListItem.getEnumerator();
      while (listItemEnumerator.moveNext()) {
        var oListItem = listItemEnumerator.get_current();
        MoovTools.view.reprise.push({
          id: oListItem.get_item("ID"),
          title: oListItem.get_item("Title"),
          nombre: oListItem.get_item("NombreJours"),
          startdate: oListItem.get_item("DateDepart"),
          reprisedate: oListItem.get_item("DateReprise"),
          interim: oListItem.get_item("Interimaire"),
          typerep: type
        });

      }
    }

    if (callback) {
      callback();
      // callback(MoovTools.view.reprise);
    }
  }, appSpHelper.writeError);
};

MoovTools.AfficherNotification = function () {
  let message = "Vous avez une demande de Reprise de Service à effectuer !";
  const notification = document.createElement("div");
  notification.className = `position-fixed top-0 end-0 m-3 alert alert-success alert-dismissible fade show`;
  notification.setAttribute("role", "alert");
  notification.innerHTML = `</br>
    ${message} </br>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Fermer"></button>
  `;

  document.body.appendChild(notification);

  setTimeout(function () {
    notification.remove();
  }, 60000);
}

// MoovTools.AddReprise = function (type, nom, nbre, debut, rep, interim, ident) {
//   let oList = MoovTools.clientContext
//     .get_web()
//     .get_lists()
//     .getByTitle(appHelper.ListName.Reprise);
//   let itemCreateInfo = new window.SP.ListItemCreationInformation();
//   let oListItem = oList.addItem(itemCreateInfo);

//   let startDate = new Date(debut);
//   let endDate = new Date(rep);

//   let ref = appHelper.getReference("REP");

//   oListItem.set_item("Statut", appHelper.Status.ENATTENTE);
//   oListItem.set_item("StatutLibelle", "VALIDATION DU SUPERIEUR HIERARCHIQUE");
//   oListItem.set_item("Reference", ref);

//   oListItem.set_item("DateDepart", startDate);
//   oListItem.set_item("DateReprise", endDate);

//   oListItem.set_item("NombreJours", parseInt(nbre));
//   oListItem.set_item("Interimaire", interim);

//   oListItem.set_item("Title", nom);
//   oListItem.set_item("Identifiant", ident);
//   oListItem.set_item("TypeReprise", type);


//   oListItem.set_item("Demandeur", SP.FieldUserValue.fromUser(App.CurrentUser.Login));

//   oListItem.set_item("DemandeurEmail", App.CurrentUser.Email);


//   oListItem.set_item("ResponsableN1", App.CurrentUser.ManagerPersonne);
//   oListItem.set_item("ResponsableN2", App.CurrentUser.ManagerPersonne2);

//   oListItem.set_item("ResponsableN1Email", App.CurrentUser.Manager.Email);
//   oListItem.set_item("ResponsableN2Email", App.CurrentUser.Manager2.Email);

//   oListItem.update();
//   clientContext.load(oListItem);
//   clientContext.executeQueryAsync(function () {
//     appHelper.upploadAttachmentFiles("FileDoc", oListItem.get_id(), appHelper.ListName.Reprise, 0, function () {
//       const appUrl = '/pages/reprise/show.aspx?ID=' + oListItem.get_id();
//       console.log(ACTIV_WORKFLOW);
//       let WF = new WFManager(appHelper.AppCode.REPRISE, appHelper.AppConstante.SiteUrl, appHelper.ListName.Validation, ACTIV_WORKFLOWREP);
//       WF.createWFTask(clientContext, appUrl, appHelper.AppCode.REPRISE, oListItem.get_id(), App.CurrentUser.Manager, App.CurrentUser.Manager2, ref, function () { })
//       if (callBack) {
//         callBack(oListItem);
//       }
//     }, appSpHelper.writeError);
//   })
// }

//document.addEventListener("DOMContentLoaded", () => {
// ExecuteOrDelayUntilScriptLoaded(function () {
SP.SOD.executeFunc("sp.js", "SP.ClientContext", MoovTools.InitializePage);
// }, "SP.ClientContext");
//});

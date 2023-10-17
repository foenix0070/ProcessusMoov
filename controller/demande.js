var DemandeTools = DemandeTools || {};
DemandeTools.view = {};
DemandeTools.view.demandesVal = [];
DemandeTools.view.demandesRej = [];
DemandeTools.view.demandesEn = [];
DemandeTools.view.demandesMod = [];

DemandeTools.InitializePage = function () {
  DemandeTools.clientContext = SP.ClientContext.get_current();
  clientContext = SP.ClientContext.get_current();


  App.LoadUser(function (CurrentUser) {
    App.LoadManager(CurrentUser.ManagerPersonne, function (manager) {
      App.LoadManager(manager.ManagerPersonne, function (manager2) {
        manager.Manager = manager2;
        CurrentUser.Manager = manager;
        CurrentUser.Manager2 = manager2;
        CurrentUser.ManagerPersonne2 = manager.ManagerPersonne;

        appHelper.Log(CurrentUser);

        DemandeTools.ListDemandeENATTENTE(function () {
          appHelper.Log("ENATTENTE");
          DemandeTools.view.demandesEn = [];
          DemandeTools.ListDemandeEncours(function () {
            appHelper.Log("ENCOURS");
            DemandeTools.view.demandesEn = [];
            DemandeTools.ListDemandeAModifier(function () {
              appHelper.Log("MODIFIER");
              DemandeTools.view.demandesEn = [];
              DemandeTools.ListDemandeApprouvee(function () {
                appHelper.Log("VALIDER");
                DemandeTools.view.demandesEn = [];
                DemandeTools.ListDemandeRejeter(function () {
                  appHelper.Log("REJETER");
                  DemandeTools.view.demandesEn = [];
                  $('.table').DataTable();
                  DemandeTools.Param();
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
  // DemandeTools.Param();

};



DemandeTools.ListDemande = function (DemandeList, nomdurepertoire, nomduprocessus, statut, callback) {
  let oList = DemandeTools.clientContext
    .get_web()
    .get_lists()
    .getByTitle(DemandeList);

  let camlQuery = new SP.CamlQuery();
  var q = `<View>
          <Query>
            <Where>
              <And>
                <Eq><FieldRef ID="Demandeur" /><Value Type="Integer"><UserID/></Value></Eq>
                <Eq><FieldRef ID="Statut" /><Value Type="Text">${statut}</Value></Eq>
              </And>
            </Where>
            <OrderBy>
            <FieldRef ID="Created" Ascending="False" />
            </OrderBy>
          </Query>
        </View>`;

  camlQuery.set_viewXml(q);

  let collListItem = oList.getItems(camlQuery);
  DemandeTools.clientContext.load(collListItem);
  DemandeTools.clientContext.executeQueryAsync(function (sender, args) {
    if (collListItem.get_count() > 0) {
      var listItemEnumerator = collListItem.getEnumerator();

      while (listItemEnumerator.moveNext()) {
        var oListItem = listItemEnumerator.get_current();
        let demandeurField = oListItem.get_item('Demandeur');
        let demandeurName = demandeurField.get_lookupValue();
        let creeerpar = oListItem.get_item('Author');
        let creer = creeerpar.get_lookupValue();
        DemandeTools.view.demandesEn.push({
          date: oListItem.get_item("Created"),
          demandeur: demandeurName,
          create: creer,
          id: oListItem.get_item("ID"),
          title: oListItem.get_item("Title"),
          requestdate: new Date(oListItem.get_item("Created")).toLocaleDateString(),
          status: oListItem.get_item("StatutLibelle"),
          reference: oListItem.get_item("Reference"),
          classe: appHelper.Status.GetClass(oListItem.get_item("Statut")),
          repertoire: nomdurepertoire,
          nomdemande: nomduprocessus,
        });

      }
      DemandeTools.view.demandesEn.sort((a, b) => b.date - a.date);

    }


    if (callback) {
      callback();
    }
  }, appSpHelper.writeError);
};

DemandeTools.ListDemandeVal = function (DemandeList, nomdurepertoire, nomduprocessus, callback) {
  let oList = DemandeTools.clientContext
    .get_web()
    .get_lists()
    .getByTitle(DemandeList);

  let camlQuery = new SP.CamlQuery();
  var q = `<View>
          <Query>
            <Where>
            <Or>
              <And>
                <Eq><FieldRef ID="Demandeur" /><Value Type="Integer"><UserID/></Value></Eq>
                <Eq><FieldRef ID="Statut" /><Value Type="Text">VALIDEE</Value></Eq>
              </And>
              <Eq><FieldRef ID="Statut" /><Value Type="Text">ENATTENTEREGULARISATION</Value></Eq>
            </Or>
            </Where>
            <OrderBy>
            <FieldRef ID="Created" Ascending="False" />
            </OrderBy>
          </Query>
        </View>`;

  camlQuery.set_viewXml(q);

  let collListItem = oList.getItems(camlQuery);
  DemandeTools.clientContext.load(collListItem);
  DemandeTools.clientContext.executeQueryAsync(function (sender, args) {
    if (collListItem.get_count() > 0) {
      var listItemEnumerator = collListItem.getEnumerator();

      while (listItemEnumerator.moveNext()) {
        var oListItem = listItemEnumerator.get_current();
        let demandeurField = oListItem.get_item('Demandeur');
        let demandeurName = demandeurField.get_lookupValue();
        let creeerpar = oListItem.get_item('Author');
        let creer = creeerpar.get_lookupValue();
        DemandeTools.view.demandesEn.push({
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
      DemandeTools.view.demandesEn.sort((a, b) => b.date - a.date);
    }


    if (callback) {
      callback();
    }
  }, appSpHelper.writeError);
};

DemandeTools.ListDemandeENATTENTE = function (callBack) {
  DemandeTools.ListDemande(appHelper.ListName.Absence, "autorisationAbsence", "ABSENCE", "ENATTENTE", function () {
    DemandeTools.ListDemande(appHelper.ListName.Conge, "conge", "CONGES", "ENATTENTE", function () {
      DemandeTools.ListDemande(appHelper.ListName.Gadget, "gadget", "GADGET", "ENATTENTE", function () {
        DemandeTools.ListDemande(appHelper.ListName.Materiel, "materiel", "MATERIEL", "ENATTENTE", function () {
          DemandeTools.ListDemande(appHelper.ListName.Mission, "fraisMission", "MISSION", "ENATTENTE", function () {
            DemandeTools.ListDemande(appHelper.ListName.RegularisationFraisMission, "regularisationFraisMission", "REGULARISATION MISSION", "ENATTENTE", function () {
              DemandeTools.ListDemande(appHelper.ListName.RegularisationSortieCaisse, "regularisationSortieCaisse", "REGULARISATION DE SORTIE DE CAISSE", "ENATTENTE", function () {
                DemandeTools.ListDemande(appHelper.ListName.SortieCaisse, "sortieCaisse", "SORTIE DE CAISSE", "ENATTENTE", function () {
                  DemandeTools.ListDemande(appHelper.ListName.Vehicule, "vehicule", "VEHICULE", "ENATTENTE", function () {
                    appHelper.renderTemplate("tmpl_table_demande", "DivDemandeENTTableShow", DemandeTools.view);

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

                    if (callBack) {
                      callBack();
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
}


DemandeTools.ListDemandeEncours = function (callBack) {
  DemandeTools.ListDemande(appHelper.ListName.Absence, "autorisationAbsence", "ABSENCE", "ENCOURS", function () {
    DemandeTools.ListDemande(appHelper.ListName.Conge, "conge", "CONGES", "ENCOURS", function () {
      DemandeTools.ListDemande(appHelper.ListName.Gadget, "gadget", "GADGET", "ENCOURS", function () {
        DemandeTools.ListDemande(appHelper.ListName.Materiel, "materiel", "MATERIEL", "ENCOURS", function () {
          DemandeTools.ListDemande(appHelper.ListName.Mission, "fraisMission", "MISSION", "ENCOURS", function () {
            DemandeTools.ListDemande(appHelper.ListName.RegularisationFraisMission, "regularisationFraisMission", "REGULARISATION MISSION", "ENCOURS", function () {
              DemandeTools.ListDemande(appHelper.ListName.RegularisationSortieCaisse, "regularisationSortieCaisse", "REGULARISATION DE SORTIE DE CAISSE", "ENCOURS", function () {
                DemandeTools.ListDemande(appHelper.ListName.SortieCaisse, "sortieCaisse", "SORTIE DE CAISSE", "ENCOURS", function () {
                  DemandeTools.ListDemande(appHelper.ListName.Vehicule, "vehicule", "VEHICULE", "ENCOURS", function () {
                    appHelper.renderTemplate("tmpl_table_demande", "DivDemandeETableShow", DemandeTools.view);

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

                    if (callBack) {
                      callBack();
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
}

DemandeTools.ListDemandeAModifier = function (callBack) {
  DemandeTools.ListDemande(appHelper.ListName.Absence, "autorisationAbsence", "ABSENCE", "DEMANDEMODIFICATION", function () {
    DemandeTools.ListDemande(appHelper.ListName.Conge, "conge", "CONGES", "DEMANDEMODIFICATION", function () {
      DemandeTools.ListDemande(appHelper.ListName.Gadget, "gadget", "GADGET", "DEMANDEMODIFICATION", function () {
        DemandeTools.ListDemande(appHelper.ListName.Materiel, "materiel", "MATERIEL", "DEMANDEMODIFICATION", function () {
          DemandeTools.ListDemande(appHelper.ListName.Mission, "fraisMission", "MISSION", "DEMANDEMODIFICATION", function () {
            DemandeTools.ListDemande(appHelper.ListName.RegularisationFraisMission, "regularisationFraisMission", "REGULARISATION MISSION", "DEMANDEMODIFICATION", function () {
              DemandeTools.ListDemande(appHelper.ListName.RegularisationSortieCaisse, "regularisationSortieCaisse", "REGULARISATION DE SORTIE DE CAISSE", "DEMANDEMODIFICATION", function () {
                DemandeTools.ListDemande(appHelper.ListName.SortieCaisse, "sortieCaisse", "SORTIE DE CAISSE", "DEMANDEMODIFICATION", function () {
                  DemandeTools.ListDemande(appHelper.ListName.Vehicule, "vehicule", "VEHICULE", "DEMANDEMODIFICATION", function () {
                    appHelper.renderTemplate("tmpl_table_demande", "DivDemandeMTableShow", DemandeTools.view);

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

                    if (callBack) {
                      callBack();
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
}

DemandeTools.ListDemandeApprouvee = function (callBack) {
  DemandeTools.ListDemandeVal(appHelper.ListName.Absence, "autorisationAbsence", "ABSENCE", function () {
    DemandeTools.ListDemandeVal(appHelper.ListName.Conge, "conge", "CONGES", function () {
      DemandeTools.ListDemandeVal(appHelper.ListName.Gadget, "gadget", "GADGET", function () {
        DemandeTools.ListDemandeVal(appHelper.ListName.Materiel, "materiel", "MATERIEL", function () {
          DemandeTools.ListDemandeVal(appHelper.ListName.Mission, "fraisMission", "MISSION", function () {
            DemandeTools.ListDemandeVal(appHelper.ListName.RegularisationFraisMission, "regularisationFraisMission", "REGULARISATION MISSION", function () {
              DemandeTools.ListDemandeVal(appHelper.ListName.RegularisationSortieCaisse, "regularisationSortieCaisse", "REGULARISATION DE SORTIE DE CAISSE", function () {
                DemandeTools.ListDemandeVal(appHelper.ListName.SortieCaisse, "sortieCaisse", "SORTIE DE CAISSE", function () {
                  DemandeTools.ListDemandeVal(appHelper.ListName.Vehicule, "vehicule", "VEHICULE", function () {
                    appHelper.renderTemplate("tmpl_table_demande", "DivDemandeVTableShow", DemandeTools.view);

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

                    if (callBack) {
                      callBack();
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

}

// DemandeTools.ListDemandeApprouvee = function (callBack) {
//   DemandeTools.ListDemande(appHelper.ListName.Conge, "conge", "CONGES", "VALIDEE", function () {
//     DemandeTools.ListDemande(appHelper.ListName.SortieCaisse, "sortieCaisse", "SORTIE DE CAISSE", "VALIDEE", function () {
//       DemandeTools.ListDemande(appHelper.ListName.RegularisationSortieCaisse, "regularisationSortieCaisse", "REGULARISATION DE SORTIE DE CAISSE", "VALIDEE", function () {
//         DemandeTools.ListDemande(appHelper.ListName.Materiel, "materiel", "MATERIEL", "VALIDEE", function () {
//           DemandeTools.ListDemande(appHelper.ListName.Vehicule, "vehicule", "VEHICULE", "VALIDEE", function () {
//             DemandeTools.ListDemande(appHelper.ListName.Gadget, "gadget", "GADGET", "VALIDEE", function () {
//               DemandeTools.ListDemande(appHelper.ListName.Absence, "autorisationAbsence", "ABSENCE", "VALIDEE", function () {
//                 DemandeTools.ListDemande(appHelper.ListName.Mission, "fraisMission", "MISSION", "VALIDEE", function () {
//                   DemandeTools.ListDemande(appHelper.ListName.RegularisationFraisMission, "regularisationFraisMission", "REGULARISATION MISSION", "VALIDEE", function () {
//                     appHelper.renderTemplate("tmpl_table_demande", "DivDemandeVTableShow", DemandeTools.view);

//                     //   appHelper.listenNavigationLink ('linkMainNavigation');
//                     const linkClick = document.getElementsByClassName('click');
//                     for (var i = 0; i < linkClick.length; i++) {
//                       linkClick[i].addEventListener("click", function () {
//                         let url = this.getAttribute("data-url");
//                         sessionStorage.setItem("ajax_url", url);
//                         $.ajax({
//                           url: url,
//                           method: 'GET',
//                           dataType: 'html',
//                           success: function (data) {
//                             $('#reponseAjax').html(data);
//                           },
//                           error: function () {
//                             $('#reponseAjax').html('Erreur lors du chargement des données.');
//                           }
//                         });

//                         return false;
//                       });
//                     }

//                     if (callBack) {
//                       callBack();
//                     }
//                   });
//                   //});
//                 });
//               });
//             });
//           });
//         });
//       });
//     });

//   });

// }

DemandeTools.ListDemandeRejeter = function (callBack) {
  DemandeTools.ListDemande(appHelper.ListName.Absence, "autorisationAbsence", "ABSENCE", "REJETEE", function () {
    DemandeTools.ListDemande(appHelper.ListName.Conge, "conge", "CONGES", "REJETEE", function () {
      DemandeTools.ListDemande(appHelper.ListName.Gadget, "gadget", "GADGET", "REJETEE", function () {
        DemandeTools.ListDemande(appHelper.ListName.Materiel, "materiel", "MATERIEL", "REJETEE", function () {
          DemandeTools.ListDemande(appHelper.ListName.Mission, "fraisMission", "MISSION", "REJETEE", function () {
            DemandeTools.ListDemande(appHelper.ListName.RegularisationFraisMission, "regularisationFraisMission", "REGULARISATION MISSION", "REJETEE", function () {
              DemandeTools.ListDemande(appHelper.ListName.RegularisationSortieCaisse, "regularisationSortieCaisse", "REGULARISATION DE SORTIE DE CAISSE", "REJETEE", function () {
                DemandeTools.ListDemande(appHelper.ListName.SortieCaisse, "sortieCaisse", "SORTIE DE CAISSE", "REJETEE", function () {
                  DemandeTools.ListDemande(appHelper.ListName.Vehicule, "vehicule", "VEHICULE", "REJETEE", function () {
                    appHelper.renderTemplate("tmpl_table_demande", "DivDemandeRTableShow", DemandeTools.view);

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

                    if (callBack) {
                      callBack();
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
}

DemandeTools.Param = function () {

  var currentURLFonction = appHelper.GetQueryStringFromAjaxQuery("action");

  if (currentURLFonction !== null) {
    const steps = document.querySelectorAll('.step');
    const contents = document.querySelectorAll('.content');
    const navtab = document.getElementById("DivDemandeENTTableShow");

    steps.forEach(step => {
      const dataAction = step.getAttribute('data-action');
      if (dataAction === currentURLFonction) {
        // Affichez le contenu associé
        const target = step.getAttribute('data-target');
        const targetContent = document.getElementById(target);
        if (targetContent) {
          navtab.style.display = 'none';
          targetContent.style.display = 'block';
          steps.forEach(s => s.classList.remove('active'));
          step.classList.add('active');
        }
      }
    });
  }


}

//document.addEventListener("DOMContentLoaded", () => {
// ExecuteOrDelayUntilScriptLoaded(function () {
SP.SOD.executeFunc("sp.js", "SP.ClientContext", DemandeTools.InitializePage);
    // }, "SP.ClientContext");
   //});

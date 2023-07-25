var arrMenu = [
  {
    id: "dmd_conge",
    title: "Demande de congé",
    icon: "fa fa-2x fa-globe",
    arrsmenu: [
      {
        offcanvas: {
          id: "dmd_conge_new",
          title: "Effectuer une demande",
          url: "/tools1/pages/conge/add.aspx",
         // url: "/pages/conge/add.html",
          target: "ffcMainFormContainer",
        },
        link: false,
      },

      {
        offcanvas: false,
        link: {
          id: "dmd_conge_list_en_cours",
          title: "Demande en cours",
          url: "tools1/pages/conge/ici.html",
         // url: "/pages/conge/ici.html",
          target: "DivMainPageContainer",
        },
      },
      {
        offcanvas: false,
        link: {
          id: "dmd_conge_list_validee",
          title: "Demandes validées",
          //url: "#",
          target: "DivMainPageContainer",
        },
      },

      {
        offcanvas: false,
        link: {
          id: "dmd_conge_list_rejetee",
          title: "Demandes réjetées",
          //url: "#",
          target: "DivMainPageContainer",
        },
      },
    ],
  },

  {
    id: "dmd_autorisationAbsence",
    title: "Demande d'autorisation d'absence",
    icon: "fa fa-2x fa-globe",
    arrsmenu: [
      {
        offcanvas: {
          id: "dmd_autorisationAbsence_new",
          title: "Effectuer une demande",
          url: "tools1/pages/autorisationAbsence/add.aspx",
         // url: "/pages/autorisationAbsence/add.html",
          target: "ffcMainFormContainer",
        },
        link: false,
      },

      {
        offcanvas: false,
        link: {
          id: "dmd_autorisationAbsence_list_en_cours",
          title: "Demande en cours",
          url: "tools1/pages/autorisationAbsence/ici.html",
          target: "DivMainPageContainer",
        },
      },
      {
        offcanvas: false,
        link: {
          id: "dmd_autorisationAbsence_list_validee",
          title: "Demandes validées",
          //url: "#",
          target: "DivMainPageContainer",
        },
      },

      {
        offcanvas: false,
        link: {
          id: "dmd_autorisationAbsence_list_rejetee",
          title: "Demandes réjetées",
          //url: "#",
          target: "DivMainPageContainer",
        },
      },
    ],
  },

  {
    id: "dmd_fraismission",
    title: "Demande de frais de mission",
    icon: "fa fa-2x fa-globe",
    arrsmenu: [
      {
        offcanvas: {
          id: "dmd_fraismission_new",
          title: "Effectuer une demande",
          // url: "/pages/fraisMission/add.aspx",
          url: "tools1/pages/fraisMission/add.aspx",
          target: "ffcMainFormContainer",
        },
        link: false,
      },

      {
        offcanvas: false,
        link: {
          id: "dmd_fraismission_list_en_cours",
          title: "Demande en cours",
          url: "tools1/pages/fraisMission/ici.html",
          target: "DivMainPageContainer",
        },
      },
      {
        offcanvas: false,
        link: {
          id: "dmd_fraismission_list_validee",
          title: "Demandes validées",
          //url: "#",
          target: "DivMainPageContainer",
        },
      },

      {
        offcanvas: false,
        link: {
          id: "dmd_fraismission_list_rejetee",
          title: "Demandes réjetées",
          //url: "#",
          target: "DivMainPageContainer",
        },
      },
    ],
  },

  {
    id: "dmd_regularisationFinMission",
    title: "Demande de régularisation de frais de mission",
    icon: "fa fa-2x fa-globe",
    arrsmenu: [
      {
        offcanvas: {
          id: "dmd_regularisationFinMission_new",
          title: "Effectuer une demande",
          url: "tools1/pages/regularisationFinMission/add.aspx",
         // url: "/pages/regularisationFraisMission/add.html",
          target: "ffcMainFormContainer",
        },
        link: false,
      },

      {
        offcanvas: false,
        link: {
          id: "dmd_regularisationFinMission_list_en_cours",
          title: "Demande en cours",
          url: "/pages/conge/ici.html",
          target: "DivMainPageContainer",
        },
      },
      {
        offcanvas: false,
        link: {
          id: "dmd_regularisationFinMission_list_validee",
          title: "Demandes validées",
          //url: "#",
          target: "DivMainPageContainer",
        },
      },

      {
        offcanvas: false,
        link: {
          id: "dmd_regularisationFinMission_list_rejetee",
          title: "Demandes réjetées",
          //url: "#",
          target: "DivMainPageContainer",
        },
      },
    ],
  },

  {
    id: "dmd_sortieCaisse",
    title: "Demande de sortie de caisse",
    icon: "fa fa-2x fa-globe",
    arrsmenu: [
      {
        offcanvas: {
          id: "dmd_sortieCaisse_new",
          title: "Effectuer une demande",
          url: "tools1/pages/sortieCaisse/add.aspx",
         // url: "/pages/sortieCaisse/add.aspx",
          target: "ffcMainFormContainer",
        },
        link: false,
      },

      {
        offcanvas: false,
        link: {
          id: "dmd_sortieCaisse_list_en_cours",
          title: "Demande en cours",
          url: "/pages/sortieCaisse/ici.html",
          target: "DivMainPageContainer",
        },
      },
      {
        offcanvas: false,
        link: {
          id: "dmd_sortieCaisse_list_validee",
          title: "Demandes validées",
          //url: "#",
          target: "DivMainPageContainer",
        },
      },

      {
        offcanvas: false,
        link: {
          id: "dmd_sortieCaisse_list_rejetee",
          title: "Demandes réjetées",
          //url: "#",
          target: "DivMainPageContainer",
        },
      },
    ],
  },

  {
    id: "dmd_regularisationSortieCaisse",
    title: "Demande de regularisation de sortie de caisse",
    icon: "fa fa-2x fa-globe",
    arrsmenu: [
      {
        offcanvas: {
          id: "dmd_regularisationSortieCaisse_new",
          title: "Effectuer une demande",
          url: "tools1/pages/regularisationSortieCaisse/add.aspx",
         // url: "/pages/regularisationSortieCaisse/add.html",
          target: "ffcMainFormContainer",
        },
        link: false,
      },

      {
        offcanvas: false,
        link: {
          id: "dmd_regularisationSortieCaisse_list_en_cours",
          title: "Demande en cours",
          url: "/pages/regularisationSortieCaisse/ici.html",
          target: "DivMainPageContainer",
        },
      },
      {
        offcanvas: false,
        link: {
          id: "dmd_regularisationSortieCaisse_list_validee",
          title: "Demandes validées",
          //url: "#",
          target: "DivMainPageContainer",
        },
      },

      {
        offcanvas: false,
        link: {
          id: "dmd_regularisationSortieCaisse_list_rejetee",
          title: "Demandes réjetées",
          //url: "#",
          target: "DivMainPageContainer",
        },
      },
    ],
  },


  {
    id: "dmd_gadget",
    title: "Demande de gadget",
    icon: "fa fa-2x fa-globe",
    arrsmenu: [
      {
        offcanvas: {
          id: "dmd_gadget_new",
          title: "Effectuer une demande",
          url: "tools1/pages/gadget/add.aspx",
          //url: "/pages/gadget/add.html",
          target: "ffcMainFormContainer",
        },
        link: false,
      },

      {
        offcanvas: false,
        link: {
          id: "dmd_gadget_list_en_cours",
          title: "Demande en cours",
          // url: "/pages/gadget/ici.html",
          url: "tools1/pages/gadget/ici.html",

          target: "DivMainPageContainer",
        },
      },
      {
        offcanvas: false,
        link: {
          id: "dmd_gadget_list_validee",
          title: "Demandes validées",
          url: "#",
          target: "DivMainPageContainer",
        },
      },

      {
        offcanvas: false,
        link: {
          id: "dmd_gadget_list_rejetee",
          title: "Demandes réjetées",
          //url: "#",
          target: "DivMainPageContainer",
        },
      },
    ],
  },


  {
    id: "dmd_materiel",
    title: "Demande de materiel",
    icon: "fa fa-2x fa-globe",
    arrsmenu: [
      {
        offcanvas: {
          id: "dmd_materiel_new",
          title: "Effectuer une demande",
          url: "tools1/pages/materiel/add.aspx",
          //url: "/pages/materiel/add.html",
          target: "ffcMainFormContainer",
        },
        link: false,
      },

      {
        offcanvas: false,
        link: {
          id: "dmd_materiel_list_en_cours",
          title: "Demande en cours",
          // url: "/pages/materiel/ici.html",
          url: "tools1/pages/materiel/ici.html",

          target: "DivMainPageContainer",
        },
      },
      {
        offcanvas: false,
        link: {
          id: "dmd_materiel_list_validee",
          title: "Demandes validées",
          //url: "#",
          target: "DivMainPageContainer",
        },
      },

      {
        offcanvas: false,
        link: {
          id: "dmd_materiel_list_rejetee",
          title: "Demandes réjetées",
          //url: "#",
          target: "DivMainPageContainer",
        },
      },
    ],
  },

  {
    id: "dmd_vehicule",
    title: "Demande de vehicule",
    icon: "fa fa-2x fa-globe",
    arrsmenu: [
      {
        offcanvas: {
          id: "dmd_vehicule_new",
          title: "Effectuer une demande",
          url: "tools1/pages/vehicule/add.aspx",
         // url: "/pages/vehicule/add.html",
          target: "ffcMainFormContainer",
        },
        link: false,
      },

      {
        offcanvas: false,
        link: {
          id: "dmd_vehicule_list_en_cours",
          title: "Demande en cours",
          // url: "/pages/vehicule/ici.html",
          url: "tools1/pages/vehicule/ici.html",

          target: "DivMainPageContainer",
        },
      },
      {
        offcanvas: false,
        link: {
          id: "dmd_vehicule_list_validee",
          title: "Demandes validées",
          //url: "#",
          target: "DivMainPageContainer",
        },
      },

      {
        offcanvas: false,
        link: {
          id: "dmd_vehicule_list_rejetee",
          title: "Demandes réjetées",
          //url: "#",
          target: "DivMainPageContainer",
        },
      },
    ],
  },

  {
    id: "admin",
    title: "ADMINISTRATION",
    icon: "fa fa-2x fa-cog",
    arrsmenu: [
      {
        offcanvas: false,
        link: {
          id: "admin_new",
          title: "Gestion des utilisateurs",
          url: "/tools1/pages/admin/agent.aspx",
          target: "DivMainPageContainer",
        }
      },

      /*

      {
        offcanvas: false,
        link: {
          id: "admin_list_en_cours",
          title: "Gestion des types de congés",
          url: "tools1/pages/admin/typeconge.aspx",
          target: "DivMainPageContainer",
        },
      },

      */

    ],
  },

];





function loadMainSideBarMenu() {
  let view = {};
  view.menus = arrMenu;
  appHelper.renderTemplate('tmpl_side_main_menu', 'accSideMainMenu', view);
  appHelper.navigation(null, '/tools1/pages/index.aspx');
}



document.addEventListener('DOMContentLoaded', function () {
  loadMainSideBarMenu();
  appHelper.listenNavigationLink2('linkMainNavigation2');
  appHelper.listenNavigationLink('linkMainNavigation');
  appHelper.listenNavigationOffCanvas("linkOffCanvasNavigation", "ffcMainForm");
});

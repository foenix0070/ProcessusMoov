var main = main || {};

main.arrMenu1 = [
  {
    id: "dmd_conge_new",
    title: "Demande de congé",
    icon: "fa fa-2x fa-globe",
    url: "/tools/pages/conge/add.aspx",
    target: "ffcMainFormContainer",
    arrsmenu: [
      {
        offcanvas: {
          id: "dmd_sortieCaisse_new",
          title: "Sortie de caisse",
          url: "tools/pages/sortieCaisse/add.aspx",
          target: "ffcMainFormContainer",
          dataInfo: "sortieCaisse",
        },
        link: false,
      },
      {
        offcanvas: {
          id: "dmd_regularisationSortieCaisse_new",
          title: "Regularisation sortie de caisse",
          url: "tools/pages/regularisationSortieCaisse/add.aspx",
          target: "ffcMainFormContainer",
          dataInfo: "regularisationSortieCaisse",
        },
        link: false,
      },
      
      {
        offcanvas: {
          id: "dmd_conge_new",
          title: "Congés",
          url: "/tools/pages/conge/add.aspx",
          target: "ffcMainFormContainer",
          dataInfo: "conge",
        },
        link: false,
      },
      {
        offcanvas: {
          id: "dmd_autorisationAbsence_new",
          title: "Absence",
          url: "tools/pages/autorisationAbsence/add.aspx",
          target: "ffcMainFormContainer",
          dataInfo: "autorisationAbsence",
        },
        link: false,
      },
      {
        offcanvas: {
          id: "dmd_gadget_new",
          title: "Gadget",
          url: "tools/pages/gadget/add.aspx",
          target: "ffcMainFormContainer",
          dataInfo: "gadget",
        },
        link: false,
      },
      {
        offcanvas: {
          id: "dmd_materiel_new",
          title: "Materiel",
          url: "tools/pages/materiel/add.aspx",
          target: "ffcMainFormContainer",
          dataInfo: "materiel",
        },
        link: false,
      },
      {
        offcanvas: {
          id: "dmd_vehicule_new",
          title: "Vehicule",
          url: "tools/pages/vehicule/add.aspx",
          target: "ffcMainFormContainer",
          dataInfo: "vehicule",
        },
        link: false,
      },

      
      {
        offcanvas: {
          id: "dmd_fraismission_new",
          title: "Frais de mission",
          url: "tools/pages/fraisMission/add.aspx",
          target: "ffcMainFormContainer",
          dataInfo: "fraisMission",
        },
        link: false,
      },

      {
        offcanvas: {
          id: "dmd_regularisationFinMission_new",
          title: "Regularisation Frais de mission",
          url: "tools/pages/regularisationFraisMission/add.aspx",
          target: "ffcMainFormContainer",
          dataInfo: "regularisationFraisMission",
        },
        link: false,
      },
      {
        offcanvas: false,
        link: {
          id: "admin_new",
          title: "Gestion des utilisateurs",
          url: "/tools/pages/admin/agent.aspx",
          target: "DivMainPageContainer",
          dataInfo: "admin",
        },
      },
    ],
  },
];

main.arrMenu = [
  {
    id: "dmd_conge",
    title: "Demande de congé",
    icon: "fa fa-2x fa-globe",
    arrsmenu: [
      {
        offcanvas: {
          id: "dmd_conge_new",
          title: "Effectuer une demande",
          url: "/tools/pages/conge/add.aspx",
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
          url: "tools/pages/conge/list.aspx?t=E",
          target: "DivMainPageContainer",
        },
      },
      {
        offcanvas: false,
        link: {
          id: "dmd_conge_list_validee",
          title: "Demandes validées",
          url: "tools/pages/conge/list.aspx?t=V",
          target: "DivMainPageContainer",
        },
      },

      {
        offcanvas: false,
        link: {
          id: "dmd_conge_list_rejetee",
          title: "Demandes réjetées",
          url: "tools/pages/conge/list.aspx?t=R",
          target: "DivMainPageContainer",
        },
      },
      {
        offcanvas: false,
        link: {
          id: "dmd_conge_list_modification",
          title: "Demandes à modifier",
          url: "tools/pages/conge/list.aspx?t=M",
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
          url: "tools/pages/autorisationAbsence/add.aspx",
          target: "ffcMainFormContainer",
        },
        link: false,
      },

      {
        offcanvas: false,
        link: {
          id: "dmd_autorisationAbsence_list_en_cours",
          title: "Demande en cours",
          url: "tools/pages/autorisationAbsence/list.aspx?t=E",
          target: "DivMainPageContainer",
        },
      },
      {
        offcanvas: false,
        link: {
          id: "dmd_autorisationAbsence_list_validee",
          title: "Demandes validées",
          url: "tools/pages/autorisationAbsence/list.aspx?t=V",
          target: "DivMainPageContainer",
        },
      },

      {
        offcanvas: false,
        link: {
          id: "dmd_autorisationAbsence_list_rejetee",
          title: "Demandes réjetées",
          url: "tools/pages/autorisationAbsence/list.aspx?t=R",
          target: "DivMainPageContainer",
        },
      },

      {
        offcanvas: false,
        link: {
          id: "dmd_autorisationAbsence_list_modifier",
          title: "Demandes à modifier",
          url: "tools/pages/autorisationAbsence/list.aspx?t=M",
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
          url: "tools/pages/fraisMission/add.aspx",
          target: "ffcMainFormContainer",
        },
        link: false,
      },

      {
        offcanvas: false,
        link: {
          id: "dmd_fraismission_list_en_cours",
          title: "Demande en cours",
          url: "tools/pages/fraisMission/list.aspx?t=E",
          target: "DivMainPageContainer",
        },
      },
      {
        offcanvas: false,
        link: {
          id: "dmd_fraismission_list_validee",
          title: "Demandes validées",
          url: "tools/pages/fraisMission/list.aspx?t=V",
          target: "DivMainPageContainer",
        },
      },

      {
        offcanvas: false,
        link: {
          id: "dmd_fraismission_list_rejetee",
          title: "Demandes réjetées",
          url: "tools/pages/fraisMission/list.aspx?t=R",
          target: "DivMainPageContainer",
        },
      },

      {
        offcanvas: false,
        link: {
          id: "dmd_fraismission_list_modifier",
          title: "Demandes à modifier",
          url: "tools/pages/fraisMission/list.aspx?t=M",
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
          url: "tools/pages/sortieCaisse/add.aspx",
          target: "ffcMainFormContainer",
        },
        link: false,
      },

      {
        offcanvas: false,
        link: {
          id: "dmd_sortieCaisse_list_en_cours",
          title: "Demande en cours",
          url: "tools/pages/sortieCaisse/list.aspx?t=E",
          target: "DivMainPageContainer",
        },
      },
      {
        offcanvas: false,
        link: {
          id: "dmd_sortieCaisse_list_validee",
          title: "Demandes validées",
          url: "tools/pages/sortieCaisse/list.aspx?t=V",
          target: "DivMainPageContainer",
        },
      },

      {
        offcanvas: false,
        link: {
          id: "dmd_sortieCaisse_list_rejetee",
          title: "Demandes réjetées",
          url: "tools/pages/sortieCaisse/list.aspx?t=R",
          target: "DivMainPageContainer",
        },
      },

      {
        offcanvas: false,
        link: {
          id: "dmd_sortieCaisse_list_modifier",
          title: "Demandes à modifier",
          url: "tools/pages/sortieCaisse/list.aspx?t=M",
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
          url: "tools/pages/regularisationSortieCaisse/add.aspx",
          target: "ffcMainFormContainer",
        },
        link: false,
      },

      {
        offcanvas: false,
        link: {
          id: "dmd_regularisationSortieCaisse_list_en_cours",
          title: "Demande en cours",
          url: "tools/pages/regularisationSortieCaisse/list.aspx?t=E",
          target: "DivMainPageContainer",
        },
      },
      {
        offcanvas: false,
        link: {
          id: "dmd_regularisationSortieCaisse_list_validee",
          title: "Demandes validées",
          url: "tools/pages/regularisationSortieCaisse/list.aspx?t=V",
          target: "DivMainPageContainer",
        },
      },

      {
        offcanvas: false,
        link: {
          id: "dmd_regularisationSortieCaisse_list_rejetee",
          title: "Demandes réjetées",
          url: "tools/pages/regularisationSortieCaisse/list.aspx?t=R",
          target: "DivMainPageContainer",
        },
      },

      {
        offcanvas: false,
        link: {
          id: "dmd_regularisationSortieCaisse_list_modifier",
          title: "Demandes à modifier",
          url: "tools/pages/regularisationSortieCaisse/list.aspx?t=M",
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
          url: "tools/pages/gadget/add.aspx",
          target: "ffcMainFormContainer",
        },
        link: false,
      },

      {
        offcanvas: false,
        link: {
          id: "dmd_gadget_list_en_cours",
          title: "Demande en cours",
          url: "tools/pages/gadget/list.aspx?t=E",

          target: "DivMainPageContainer",
        },
      },
      {
        offcanvas: false,
        link: {
          id: "dmd_gadget_list_validee",
          title: "Demandes validées",
          url: "tools/pages/gadget/list.aspx?t=V",

          target: "DivMainPageContainer",
        },
      },

      {
        offcanvas: false,
        link: {
          id: "dmd_gadget_list_rejetee",
          title: "Demandes réjetées",
          url: "tools/pages/gadget/list.aspx?t=R",

          target: "DivMainPageContainer",
        },
      },
      {
        offcanvas: false,
        link: {
          id: "dmd_gadget_list_modification",
          title: "Demandes à modifier",
          url: "tools/pages/gadget/list.aspx?t=M",

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
          url: "tools/pages/materiel/add.aspx",
          target: "ffcMainFormContainer",
        },
        link: false,
      },

      {
        offcanvas: false,
        link: {
          id: "dmd_materiel_list_en_cours",
          title: "Demande en cours",
          url: "tools/pages/materiel/list.aspx?t=E",

          target: "DivMainPageContainer",
        },
      },
      {
        offcanvas: false,
        link: {
          id: "dmd_materiel_list_validee",
          title: "Demandes validées",
          url: "tools/pages/materiel/list.aspx?t=V",

          target: "DivMainPageContainer",
        },
      },

      {
        offcanvas: false,
        link: {
          id: "dmd_materiel_list_rejetee",
          title: "Demandes réjetées",
          url: "tools/pages/materiel/list.aspx?t=R",

          target: "DivMainPageContainer",
        },
      },

      {
        offcanvas: false,
        link: {
          id: "dmd_materiel_list_modification",
          title: "Demandes de modification",
          url: "tools/pages/materiel/list.aspx?t=M",

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
          url: "tools/pages/vehicule/add.aspx",

          target: "ffcMainFormContainer",
        },
        link: false,
      },

      {
        offcanvas: false,
        link: {
          id: "dmd_vehicule_list_en_cours",
          title: "Demande en cours",
          url: "tools/pages/vehicule/list.aspx?t=E",

          target: "DivMainPageContainer",
        },
      },
      {
        offcanvas: false,
        link: {
          id: "dmd_vehicule_list_validee",
          title: "Demandes validées",
          url: "tools/pages/vehicule/list.aspx?t=V",

          target: "DivMainPageContainer",
        },
      },

      {
        offcanvas: false,
        link: {
          id: "dmd_vehicule_list_rejetee",
          title: "Demandes réjetées",
          url: "tools/pages/vehicule/list.aspx?t=R",

          target: "DivMainPageContainer",
        },
      },

      {
        offcanvas: false,
        link: {
          id: "dmd_vehicule_list_modifier",
          title: "Demandes à modifier",
          url: "tools/pages/vehicule/list.aspx?t=M",

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
          url: "tools/pages/regularisationFraisMission/add.aspx",
          target: "ffcMainFormContainer",
        },
        link: false,
      },

      {
        offcanvas: false,
        link: {
          id: "dmd_regularisationFinMission_list_en_cours",
          title: "Demande en cours",
          url: "tools/pages/regularisationFraisMission/list.aspx?t=E",
          target: "DivMainPageContainer",
        },
      },
      {
        offcanvas: false,
        link: {
          id: "dmd_regularisationFinMission_list_validee",
          title: "Demandes validées",
          url: "tools/pages/regularisationFraisMission/list.aspx?t=V",
          target: "DivMainPageContainer",
        },
      },

      {
        offcanvas: false,
        link: {
          id: "dmd_regularisationFinMission_list_rejetee",
          title: "Demandes réjetées",
          url: "tools/pages/regularisationFraisMission/list.aspx?t=R",
          target: "DivMainPageContainer",
        },
      },

      {
        offcanvas: false,
        link: {
          id: "dmd_regularisationFinMission_list_modifier",
          title: "Demandes à modifier",
          url: "tools/pages/regularisationFraisMission/list.aspx?t=M",
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
          url: "/tools/pages/admin/agent.aspx",
          target: "DivMainPageContainer",
        },
      },
    ],
  },
];

// function loadMainSideBarMenu() {
//   let view = {};
//   view.menus = arrMenu;
//   appHelper.navigation(null, '/tools/pages/index.aspx');
//   appHelper.renderTemplate('tmpl_side_main_menu_drop', 'accSideMainMenuDrop', view);
// }

main.loadMainSideBarMenu = function () {
  main.view = {};
  main.view1 = {};
  main.view.menus = main.arrMenu;
  main.view1.menus = main.arrMenu1;
  appHelper.navigation(null, `/${appHelper.ListName.AppListe}/pages/index.aspx`);
  //appHelper.renderTemplate('tmpl_side_main_menu', 'accSideMainMenu', main.view);
};

document.addEventListener("DOMContentLoaded", function () {
  main.loadMainSideBarMenu();
  appHelper.listenNavigationLink2("linkMainNavigation2");
  appHelper.listenNavigationLink("linkMainNavigation");
  appHelper.listenNavigationOffCanvas("linkOffCanvasNavigation", "ffcMainForm");
});

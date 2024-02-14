var ListRegularisationMission = ListRegularisationMission || {};
var clientContext;
ListRegularisationMission.clientContext;

ListRegularisationMission.InitializePage = function () {
  ListRegularisationMission.clientContext = SP.ClientContext.get_current();
  clientContext = SP.ClientContext.get_current();


  let T = appHelper.GetQueryStringFromAjaxQuery('t');
  let x = document.getElementById('h2Titre');
  switch (T) {
    case 'E': ListRegularisationMission.ListRegularisationMission('ENCOURS');
      x.innerHTML = " Listes des demandes de regularisation de mission en cours";
      break;
    case 'V': ListRegularisationMission.ListRegularisationMission('VALIDEE');
      x.innerHTML = " Listes des demandes de regularisation de mission validées";
      break;
    case 'R': ListRegularisationMission.ListRegularisationMission('REJETEE');
      x.innerHTML = " Listes des demandes de regularisation de mission rejétées";
      break;
    case 'M': ListRegularisationMission.ListRegularisationMission('DEMANDEMODIFICATION');
      x.innerHTML = " Listes des demandes de regularisation de mission à modifier";
      break;
    default: ListRegularisationMission.ListRegularisationMission('ENCOURS');
      x.innerHTML = " Listes des demandes de regularisation de mission en cours";
      break;
  }


};


ListRegularisationMission.ListRegularisationMission = function (T) {
  let oList = ListRegularisationMission.clientContext
    .get_web()
    .get_lists()
    .getByTitle(appHelper.ListName.RegularisationFraisMission);
  let camlQuery = new SP.CamlQuery();
  camlQuery.set_viewXml(
    "<View><Query><Where>" +
    '<And>' +
    '<Eq><FieldRef ID="Demandeur" /><Value Type="Integer"><UserID/></Value></Eq>' +
    '<Eq><FieldRef ID="Statut" /><Value Type="Choice">' + T + '</Value></Eq>' +
    '</And>' +
    "</Where></Query></View>"
  );
  let collListItem = oList.getItems(camlQuery);
  ListRegularisationMission.clientContext.load(collListItem);
  ListRegularisationMission.clientContext.executeQueryAsync(function (sender, args) {
    if (collListItem.get_count() > 0) {
      var listItemEnumerator = collListItem.getEnumerator();
      let view = {};
      view.mission = [];
      while (listItemEnumerator.moveNext()) {
        var oListItem = listItemEnumerator.get_current();
        view.mission.push({
          id: oListItem.get_item("ID"),
          title: oListItem.get_item("Title"),
          startdate: new Date(oListItem.get_item("DateDebut")).toLocaleDateString(),
          enddate: new Date(oListItem.get_item("DateFin")).toLocaleDateString(),
          classe: appHelper.Status.GetClass(oListItem.get_item("Statut")),
        });
      }

      appHelper.renderTemplate("tmpl_table_RegularisationMission", "DivMissionTableShow", view);

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




// document.addEventListener("DOMContentLoaded", () => {
//   ExecuteOrDelayUntilScriptLoaded(function(){
SP.SOD.executeFunc('sp.js', 'SP.ClientContext', ListRegularisationMission.InitializePage);
  //   }, "SP.ClientContext");
  // });

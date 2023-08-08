var ListMission = ListMission || {};
var clientContext;
ListMission.clientContext;

ListMission.InitializePage = function () {
  ListMission.clientContext = SP.ClientContext.get_current();
  clientContext =  SP.ClientContext.get_current();


  let T =  appHelper.GetQueryStringFromAjaxQuery('t');
  let x = document.getElementById('h2Titre');
  switch(T){
    case 'E' :  ListMission.ListMission('ENCOURS');
                x.innerHTML = " Listes des demandes de mission en cours";
    break;
    case 'V' :  ListMission.ListMission('VALIDEE');
    x.innerHTML = " Listes des demandes de mission validées";
    break;
    case 'R' :  ListMission.ListMission('REJETEE');
    x.innerHTML = " Listes des demandes de mission rejétées";
    break;
    default : ListMission.ListMission('ENCOURS');
    x.innerHTML = " Listes des demandes de mission en cours";
    break;
  }


};





ListMission.ListMission = function (T) {
  let oList = ListMission.clientContext
    .get_web()
    .get_lists()
    .getByTitle(appHelper.ListName.Mission);
  let camlQuery = new SP.CamlQuery();
  camlQuery.set_viewXml(
    "<View><Query><Where>" +
      '<And>'+
      '<Eq><FieldRef ID="Demandeur" /><Value Type="Integer"><UserID/></Value></Eq>' +
      '<Eq><FieldRef ID="Statut" /><Value Type="Choice">'+ T +'</Value></Eq>' +
      '</And>'+
      "</Where></Query></View>"
  );
  let collListItem = oList.getItems(camlQuery);
  ListMission.clientContext.load(collListItem);
  ListMission.clientContext.executeQueryAsync(function (sender, args) {
    if (collListItem.get_count() > 0) {
      var listItemEnumerator = collListItem.getEnumerator();
      let view = {};
      view.mission = [];
      while (listItemEnumerator.moveNext()) {
        var oListItem = listItemEnumerator.get_current();
        view.mission.push({
          id: oListItem.get_item("ID"),
          title: oListItem.get_item("Title"),
          startdate: new Date( oListItem.get_item("DateDebut")).toLocaleDateString(),
          enddate: new Date( oListItem.get_item("DateFin")).toLocaleDateString(),
          destination: new Date( oListItem.get_item("Destination")).toLocaleDateString(),
          status: oListItem.get_item("StatutLibelle"),
          classe: appHelper.Status.GetClass(oListItem.get_item("Status")),
        });
      }

      appHelper.renderTemplate("tmpl_table_Mission", "DivMissionTableShow", view);

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
  SP.SOD.executeFunc('sp.js', 'SP.ClientContext', ListMission.InitializePage);
  //   }, "SP.ClientContext");
  // });

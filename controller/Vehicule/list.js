var ListVoiture = ListVoiture || {};
var clientContext;
ListVoiture.clientContext;

ListVoiture.InitializePage = function () {
  ListVoiture.clientContext = SP.ClientContext.get_current();
  clientContext =  SP.ClientContext.get_current();


  let T =  appHelper.GetQueryStringFromAjaxQuery('t');
  let x = document.getElementById('h2Titre');
  switch(T){
    case 'E' :  ListVoiture.ListVoiture('ENCOURS');
                x.innerHTML = " Listes des demandes de congés en cours";
    break;
    case 'V' :  ListVoiture.ListVoiture('VALIDEE');
    x.innerHTML = " Listes des demandes de congés validées";
    break;
    case 'R' :  ListVoiture.ListVoiture('REJETEE');
    x.innerHTML = " Listes des demandes de congés rejétées";
    break;
    default : ListVoiture.ListVoiture('ENCOURS');
    x.innerHTML = " Listes des demandes de congés en cours";
    break;
  }


};


ListConge.ListVoiture = function (T) {
  let oList = ListVoiture.clientContext
    .get_web()
    .get_lists()
    .getByTitle(appHelper.ListName.Voiture);
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
  ListVoiture.clientContext.load(collListItem);
  ListVoiture.clientContext.executeQueryAsync(function (sender, args) {
    if (collListItem.get_count() > 0) {
      var listItemEnumerator = collListItem.getEnumerator();
      let view = {};
      view.voiture = [];
      while (listItemEnumerator.moveNext()) {
        var oListItem = listItemEnumerator.get_current();
        view.voiture.push({
          id: oListItem.get_item("ID"),
          title: oListItem.get_item("Title"),
          startdate: new Date( oListItem.get_item("DateDepart")).toLocaleDateString(),
          nbre: oListItem.get_item("NombreJours"),
          status: oListItem.get_item("StatutLibelle"),
          classe: appHelper.Status.GetClass(oListItem.get_item("Statut")),
        });
      }

      appHelper.renderTemplate("tmpl_table_Voiture", "DivVoitureTableShow", view);

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
  SP.SOD.executeFunc('sp.js', 'SP.ClientContext', ListVehicule.InitializePage);
  //   }, "SP.ClientContext");
  // });

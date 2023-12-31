var ListVehicule = ListVehicule || {};
var clientContext;
ListVehicule.clientContext;

ListVehicule.InitializePage = function () {
  ListVehicule.clientContext = SP.ClientContext.get_current();
  clientContext =  SP.ClientContext.get_current();


  let T =  appHelper.GetQueryStringFromAjaxQuery('t');
  let x = document.getElementById('h2Titre');
  switch(T){
    case 'E' :  ListVehicule.ListVehicule('ENCOURS');
                x.innerHTML = " Listes des demandes de vehicule en cours";
    break;
    case 'V' :  ListVehicule.ListVehicule('VALIDEE');
    x.innerHTML = " Listes des demandes de vehicule validées";
    break;
    case 'R' :  ListVehicule.ListVehicule('REJETEE');
    x.innerHTML = " Listes des demandes de vehicule rejétées";
    break;
    case 'M' :  ListVehicule.ListVehicule('DEMANDEMODIFICATION');
    x.innerHTML = " Listes des demandes de vehicule à modifier";
    break;
    default : ListVehicule.ListVehicule('ENCOURS');
    x.innerHTML = " Listes des demandes de vehicule en cours";
    break;
  }


};


ListVehicule.ListVehicule = function (T) {
  let oList = ListVehicule.clientContext
    .get_web()
    .get_lists()
    .getByTitle(appHelper.ListName.Vehicule);
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
  ListVehicule.clientContext.load(collListItem);
  ListVehicule.clientContext.executeQueryAsync(function (sender, args) {
    if (collListItem.get_count() > 0) {
      var listItemEnumerator = collListItem.getEnumerator();
      let view = {};
      view.vehicule = [];
      while (listItemEnumerator.moveNext()) {
        var oListItem = listItemEnumerator.get_current();
        view.vehicule.push({
          id: oListItem.get_item("ID"),
          title: oListItem.get_item("Title"),
          startdate: new Date( oListItem.get_item("Created")).toLocaleDateString(),
          motif: oListItem.get_item("Motif"),
          status: oListItem.get_item("StatutLibelle"),
          classe: appHelper.Status.GetClass(oListItem.get_item("Statut")),
        });
      }

      appHelper.renderTemplate("tmpl_table_Vehicule", "DivVehiculeTableShow", view);

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

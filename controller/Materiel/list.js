var ListMateriel = ListMateriel || {};
var clientContext;
ListMateriel.clientContext;

ListMateriel.InitializePage = function () {
  ListMateriel.clientContext = SP.ClientContext.get_current();
  clientContext =  SP.ClientContext.get_current();


  let T =  appHelper.GetQueryStringFromAjaxQuery('t');
  let x = document.getElementById('h2Titre');
  switch(T){
    case 'E' :  ListMateriel.ListMateriel('ENCOURS');
                x.innerHTML = " Listes des demandes de materiel en cours";
    break;
    case 'V' :  ListMateriel.ListMateriel('VALIDEE');
    x.innerHTML = " Listes des demandes de materiel validées";
    break;
    case 'R' :  ListMateriel.ListMateriel('REJETEE');
    x.innerHTML = " Listes des demandes de materiel rejétées";
    break;
    case 'M' :  ListMateriel.ListMateriel('DEMANDEMODIFICATION');
    x.innerHTML = " Listes des demandes de materiel à modifier";
    break;
    default : ListMateriel.ListMateriel('ENCOURS');
    x.innerHTML = " Listes des demandes de materiel en cours";
    break;
  }

};

ListMateriel.ListMateriel = function (T) {
  let oList = ListMateriel.clientContext
    .get_web()
    .get_lists()
    .getByTitle(appHelper.ListName.Materiel);
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
  ListMateriel.clientContext.load(collListItem);
  ListMateriel.clientContext.executeQueryAsync(function (sender, args) {
    if (collListItem.get_count() > 0) {
      var listItemEnumerator = collListItem.getEnumerator();
      let view = {};
      view.materiel = [];
      while (listItemEnumerator.moveNext()) {
        var oListItem = listItemEnumerator.get_current();
        view.materiel.push({
          id: oListItem.get_item("ID"),
          title: oListItem.get_item("Title"),
          startdate: new Date( oListItem.get_item("DateDepart")).toLocaleDateString(),
          motif: oListItem.get_item("Motif"),
          status: oListItem.get_item("StatutLibelle"),
          classe: appHelper.Status.GetClass(oListItem.get_item("Statut")),

          /*
          quantite: oListItem.get_item("Quantite"),
          motif: oListItem.get_item("Motif"),
          */

        });
      }

      appHelper.renderTemplate("tmpl_table_materiel", "DivMaterielTableShow", view);


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
  SP.SOD.executeFunc('sp.js', 'SP.ClientContext', ListMateriel.InitializePage);
  //   }, "SP.ClientContext");
  // });

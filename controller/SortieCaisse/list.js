var ListSortieCaisse = ListSortieCaisse || {};
var clientContext;
ListSortieCaisse.clientContext;

ListSortieCaisse.InitializePage = function () {
  ListSortieCaisse.clientContext = SP.ClientContext.get_current();
  clientContext =  SP.ClientContext.get_current();


  let T =  appHelper.GetQueryStringFromAjaxQuery('t');
  let x = document.getElementById('h2Titre');
  switch(T){
    case 'E' :  ListSortieCaisse.ListSortieCaisse('ENCOURS');
                x.innerHTML = " Listes des demandes de sortie de caisse en cours";
    break;
    case 'V' :  ListSortieCaisse.ListSortieCaisse('VALIDEE');
    x.innerHTML = " Listes des demandes de sortie de caisse validées";
    break;
    case 'R' :  ListSortieCaisse.ListSortieCaisse('REJETEE');
    x.innerHTML = " Listes des demandes de sortie de caisse rejétées";
    break;
    default : ListSortieCaisse.ListSortieCaisse('ENCOURS');
    x.innerHTML = " Listes des demandes de sortie de caisse en cours";
    break;
  }


};





ListSortieCaisse.ListSortieCaisse = function (T) {
  let oList = ListSortieCaisse.clientContext
    .get_web()
    .get_lists()
    .getByTitle(appHelper.ListName.SortieCaisse);
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
  ListSortieCaisse.clientContext.load(collListItem);
  ListSortieCaisse.clientContext.executeQueryAsync(function (sender, args) {
    if (collListItem.get_count() > 0) {
      var listItemEnumerator = collListItem.getEnumerator();
      let view = {};
      view.sortiecaisse = [];
      while (listItemEnumerator.moveNext()) {
        var oListItem = listItemEnumerator.get_current();
        view.sortiecaisse.push({
          id: oListItem.get_item("ID"),
          objetReglement: oListItem.get_item("ObjetReglement"),
          //title: oListItem.get_item("Title"),
          // startdate: new Date( oListItem.get_item("DateDepart")).toLocaleDateString(),
          //motif: oListItem.get_item("Motif"),
          montant: oListItem.get_item("Montant"),
          payerA: oListItem.get_item("PayerA"),
          status: oListItem.get_item("StatutLibelle"),
          classe: appHelper.Status.GetClass(oListItem.get_item("Statut")),

          /*
          quantite: oListItem.get_item("Quantite"),
          motif: oListItem.get_item("Motif"),
          */

        });
      }

      appHelper.renderTemplate("tmpl_table_sortieCaisse", "DivSortieCaisseTableShow", view);


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
  SP.SOD.executeFunc('sp.js', 'SP.ClientContext', ListSortieCaisse.InitializePage);
  //   }, "SP.ClientContext");
  // });

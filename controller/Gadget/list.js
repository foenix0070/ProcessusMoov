var ListGadget = ListGadget || {};
var clientContext;
ListGadget.clientContext;

ListGadget.InitializePage = function () {
  ListGadget.clientContext = SP.ClientContext.get_current();
  clientContext =  SP.ClientContext.get_current();


  let T =  appHelper.GetQueryStringFromAjaxQuery('t');
  let x = document.getElementById('h2Titre');
  switch(T){
    case 'E' :  ListGadget.ListGadget('ENCOURS');
                x.innerHTML = " Liste des demandes de gadget en cours";
    break;
    case 'V' :  ListGadget.ListGadget('VALIDEE');
    x.innerHTML = " Liste des demandes de gadget validées";
    break;
    case 'R' :  ListGadget.ListGadget('REJETEE');
    x.innerHTML = " Liste des demandes de gadget rejétées";
    break;
    case 'M' :  ListGadget.ListGadget('DEMANDEMODIFICATION');
    x.innerHTML = " Liste des demandes de gadget à modifier";
    break;
    default : ListGadget.ListGadget('ENCOURS');
    x.innerHTML = " Liste des demandes de gadget en cours";
    break;
  }


};





ListGadget.ListGadget = function (T) {
  let oList = ListGadget.clientContext
    .get_web()
    .get_lists()
    .getByTitle(appHelper.ListName.Gadget);
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
  ListGadget.clientContext.load(collListItem);
  ListGadget.clientContext.executeQueryAsync(function (sender, args) {
    if (collListItem.get_count() > 0) {
      var listItemEnumerator = collListItem.getEnumerator();
      let view = {};
      view.gadget = [];
      while (listItemEnumerator.moveNext()) {
        var oListItem = listItemEnumerator.get_current();
        view.gadget.push({
          id: oListItem.get_item("ID"),
          title: oListItem.get_item("Title"),
          startdate: new Date( oListItem.get_item("DateDepart")).toLocaleDateString(),
          nbre: oListItem.get_item("NombreJours"),
          status: oListItem.get_item("StatutLibelle"),
          classe: appHelper.Status.GetClass(oListItem.get_item("Statut")),
        });
      }

      appHelper.renderTemplate("tmpl_table_gadget", "DivGadgetTableShow", view);

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
  SP.SOD.executeFunc('sp.js', 'SP.ClientContext', ListGadget.InitializePage);
  //   }, "SP.ClientContext");
  // });

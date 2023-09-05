var ListAbsence = ListAbsence || {};
var clientContext;
ListAbsence.clientContext;

ListAbsence.InitializePage = function () {
  ListAbsence.clientContext = SP.ClientContext.get_current();
  clientContext =  SP.ClientContext.get_current();


  let T =  appHelper.GetQueryStringFromAjaxQuery('t');
  let x = document.getElementById('h2Titre');
  switch(T){
    case 'E' :  ListAbsence.ListAbsence('ENCOURS');
                x.innerHTML = " Listes des demandes d'absences en cours";
    break;
    case 'V' :  ListAbsence.ListAbsence('VALIDEE');
    x.innerHTML = " Listes des demandes d'absences validées";
    break;
    case 'R' :  ListAbsence.ListAbsence('REJETEE');
    x.innerHTML = " Listes des demandes d'absences rejétées";
    break;
    case 'M' :  ListAbsence.ListAbsence('DEMANDEMODIFICATION');
    x.innerHTML = " Listes des demandes d'absences à modifier";
    break;
    default : ListAbsence.ListAbsence('ENCOURS');
    x.innerHTML = " Listes des demandes d'absences en cours";
    break;
  }

};


ListAbsence.ListAbsence = function (T) {
  let oList = ListAbsence.clientContext
    .get_web()
    .get_lists()
    .getByTitle(appHelper.ListName.Absence);
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
  ListAbsence.clientContext.load(collListItem);
  ListAbsence.clientContext.executeQueryAsync(function (sender, args) {
    if (collListItem.get_count() > 0) {
      var listItemEnumerator = collListItem.getEnumerator();
      let view = {};
      view.absences = [];
      while (listItemEnumerator.moveNext()) {
        var oListItem = listItemEnumerator.get_current();
        view.absences.push({
          id: oListItem.get_item("ID"),
          title: oListItem.get_item("Title"),
          startdate: new Date( oListItem.get_item("DateDepart")).toLocaleDateString(),
          nbre: oListItem.get_item("NombreJours"),
          status: oListItem.get_item("StatutLibelle"),
          classe: appHelper.Status.GetClass(oListItem.get_item("Statut")),
        });
      }

      appHelper.renderTemplate("tmpl_table_absence", "DivAbsenceTableShow", view);

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
  SP.SOD.executeFunc('sp.js', 'SP.ClientContext', ListAbsence.InitializePage);
  //   }, "SP.ClientContext");
  // });

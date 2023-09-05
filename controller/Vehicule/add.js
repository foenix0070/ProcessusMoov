var appVehicule = appVehicule || {};
var clientContext;
appVehicule.clientContext;

appVehicule.InitializePage = function () {
  appVehicule.clientContext = SP.ClientContext.get_current();
  clientContext =  SP.ClientContext.get_current();
  appSpHelper.GetMyProperties(function () {


      document.getElementById("TxtNom").value = App.CurrentUser.DisplayName;
      document.getElementById("TxtMatricule").value = App.CurrentUser.Matricule;
      document.getElementById("TxtEmail").value = App.CurrentUser.Email;

    appVehicule.ShowDetails(appHelper.GetQueryStringFromAjaxQuery('DID'), function(){});

  });

  const BtnSave = document.querySelector("#BtnSave");

  BtnSave.addEventListener("click", function () {
    let objet = document.getElementById("TxtObjet").value;
    let motif = document.getElementById("TxtMotif").value;
    if(objet!="" && motif!="")
    {
    let verif = document.getElementById("TxtVerif").value;
    if(verif=="Edit")
    {
      let valID = document.getElementById("TxtID").value;
      console.log(valID);
      appVehicule.Edit (valID, function(a){
        // location.reload();
        const appUrl = '/pages/vehicule/show.aspx?ID=' + a.get_id();
        const url = "/tools1"+appUrl;
        appHelper.navigation("DivMainPageContainer", url);
        var closeButton = document.querySelector('[aria-label="Close"]');
        closeButton.click();
      });
    }
    else{
      appVehicule.Add (function(a){
        // location.reload();
        const appUrl = '/pages/vehicule/show.aspx?ID=' + a.get_id();
        const url = "/tools1"+appUrl;
        appHelper.navigation("DivMainPageContainer", url);
        var closeButton = document.querySelector('[aria-label="Close"]');
        closeButton.click();
      });
    }
  }
  else{
    alert("Veillez renseigner correctement les champs");
  }
  });

};

function getRating (str){
  document.getElementById('TxtNature').value = str;
}


appVehicule.List = function () {
  let oList = appVehicule.clientContext
    .get_web()
    .get_lists()
    .getByTitle(appHelper.ListName.Vehicule);
  let camlQuery = new SP.CamlQuery();
  camlQuery.set_viewXml(
    "<View><Query><Where>" +
      '<Eq><FieldRef ID="Demandeur" /><Value Type="Integer"><UserID/></Value></Eq>' +
      "</Where></Query></View>"
  );
  let collListItem = oList.getItems(camlQuery);
  appVehicule.clientContext.load(collListItem);
  appVehicule.clientContext.executeQueryAsync(function (sender, args) {
    if (collListItem.get_count() > 0) {
      var listItemEnumerator = collListItem.getEnumerator();
      let view = {};
      view.vehicule = [];
      while (listItemEnumerator.moveNext()) {
        var oListItem = listItemEnumerator.get_current();
        view.vehicule.push({
          id: oListItem.get_item("ID"),
          title: oListItem.get_item("Title"),
          startdate: new Date( oListItem.get_item("DateDepart")).toLocaleDateString(),
          reprise: new Date( oListItem.get_item("DateReprise")).toLocaleDateString(),
          nbre: oListItem.get_item("NombreJours"),
          status: oListItem.get_item("StatutLibelle"),
          classe: appHelper.Status.GetClass(oListItem.get_item("Statut")),
        });
      }

      appHelper.renderTemplate("tmpl_table_vehicule", "DivVehiculeTableShow", view);

      const linkClick = document.getElementsByClassName('click');
      for (var i = 0; i < linkClick.length; i++) {
        linkClick[i].addEventListener("click", function () {
          let url = this.getAttribute("data-url");
          location.href = url;
          return false;
        });
      }

    }
  }, appSpHelper.writeError);
};

appVehicule.Add = function ( callBack) {
  let oList = appVehicule.clientContext
    .get_web()
    .get_lists()
    .getByTitle(appHelper.ListName.Vehicule);
  let itemCreateInfo = new window.SP.ListItemCreationInformation();
  let oListItem = oList.addItem(itemCreateInfo);

  let startDate = new Date();

  let repDate = new Date();

  let endDate = startDate.addDays(2);

  oListItem.set_item("Statut", appHelper.Status.ENATTENTE);
  oListItem.set_item("StatutLibelle", "VALIDATION DU SUPERIEUR HIERARCHIQUE");

  oListItem.set_item("DateDepart", startDate);
  oListItem.set_item("DateRetour", endDate);
  oListItem.set_item("DateReprise", repDate);

  oListItem.set_item("Title",document.getElementById("TxtObjet").value);

  oListItem.set_item("Nature",document.getElementById("TxtObjet").value);

  oListItem.set_item("Motif",document.getElementById("TxtMotif").value);

  oListItem.set_item("NombreJours",1);
  oListItem.set_item("NombreJourAccorde",1);
  oListItem.set_item("DemandeurEmail",App.CurrentUser.Email);

 // oListItem.set_item("Historique", "#");

  oListItem.set_item("Demandeur",SP.FieldUserValue.fromUser(App.CurrentUser.Login));

  oListItem.set_item("ResponsableN1", App.CurrentUser.ManagerPersonne);
  oListItem.set_item("ResponsableN2", App.CurrentUser.ManagerPersonne2);

  oListItem.set_item("ResponsableN1Email", App.CurrentUser.Manager.Email);
  oListItem.set_item("ResponsableN2Email", App.CurrentUser.Manager2.Email);

  oListItem.update();
  clientContext.load(oListItem);
  clientContext.executeQueryAsync(function () {

const appUrl = '/pages/vehicule/show.aspx?ID=' + oListItem.get_id();
      let WF = new WFManager(appHelper.AppCode.VEHICULE,  appHelper.AppConstante.SiteUrl, appHelper.ListName.Validation,  ACTIV_WORKFLOW  );
      WF.createWFTask(clientContext,appUrl, appHelper.AppCode.VEHICULE, oListItem.get_id(), App.CurrentUser.Manager.Login, App.CurrentUser.Manager2.Login, function(){}   )
      if(callBack){
        callBack(oListItem);
      }
  }, appSpHelper.writeError);
};

appVehicule.Edit = function (demandeid, callBack) {

  let oList = clientContext.get_web().get_lists().getByTitle(appHelper.ListName.Vehicule);
  let oListItem = oList.getItemById(demandeid);

  oListItem.set_item("Statut", appHelper.Status.ENATTENTE);
  oListItem.set_item("StatutLibelle", "VALIDATION DU SUPERIEUR HIERARCHIQUE");

  oListItem.set_item("Title", document.getElementById("TxtObjet").value);

  oListItem.set_item("Nature", document.getElementById("TxtObjet").value);

  oListItem.set_item("Motif", document.getElementById("TxtMotif").value);

  oListItem.set_item("DemandeurEmail",App.CurrentUser.Email);
 
  oListItem.set_item("Demandeur", SP.FieldUserValue.fromUser(App.CurrentUser.Login));

  oListItem.set_item("ResponsableN1", App.CurrentUser.ManagerPersonne);
  oListItem.set_item("ResponsableN2", App.CurrentUser.ManagerPersonne2);

  oListItem.set_item("ResponsableN1Email", App.CurrentUser.Manager.Email);
  oListItem.set_item("ResponsableN2Email", App.CurrentUser.Manager2.Email);

  oListItem.update();
  clientContext.load(oListItem);
  clientContext.executeQueryAsync(function () {

  const appUrl = '/pages/vehicule/show.aspx?ID=' + oListItem.get_id();
      console.log(appUrl);
      let WF = new WFManager(appHelper.AppCode.VEHICULE,  appHelper.AppConstante.SiteUrl, appHelper.ListName.Validation,  ACTIV_WORKFLOW  );
      WF.createWFTask(clientContext,appUrl, appHelper.AppCode.VEHICULE, oListItem.get_id(), App.CurrentUser.Manager.Login, App.CurrentUser.Manager2.Login, function(){}   )
      if(callBack){
        callBack(oListItem);
      }
  }, appSpHelper.writeError);
};

appVehicule.ShowDetails = function (demandeid, callBack) {

  let oList = appVehicule.clientContext.get_web().get_lists().getByTitle(appHelper.ListName.Vehicule);
  let It = oList.getItemById(demandeid);
  console.log(demandeid);
  console.log("IN ShowDetails");

  appVehicule.clientContext.load(It);
  appVehicule.clientContext.executeQueryAsync(function () {
    if (It) {
      
        document.getElementById("TxtObjet").value = It.get_item('Title') != null ? It.get_item('Title') : ''; 
        document.getElementById("TxtMotif").value = It.get_item('Motif') != null ? It.get_item('Motif') : '';
        document.getElementById("TxtVerif").value = 'Edit';
        document.getElementById("TxtID").value = It.get_item('ID') != null ? It.get_item('ID') : 0;
        
if(callBack){callBack();}

    }else{if(callBack){callBack();}}
  }, appSpHelper.writeError);
};

    SP.SOD.executeFunc('sp.js', 'SP.ClientContext', appVehicule.InitializePage);

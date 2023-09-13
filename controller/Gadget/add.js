var appGadget = appGadget || {};
var clientContext;
//const appUrlrecup = '';
appGadget.clientContext;

appGadget.InitializePage = function () {
  appGadget.clientContext = SP.ClientContext.get_current();
  clientContext =  SP.ClientContext.get_current();
  appSpHelper.GetMyProperties(function () {
    
      document.getElementById("TxtNom").value = App.CurrentUser.DisplayName;
      document.getElementById("TxtMatricule").value = App.CurrentUser.Matricule;
      document.getElementById("TxtEmail").value = App.CurrentUser.Email;

      appGadget.ShowDetails(appHelper.GetQueryStringFromAjaxQuery('DID'), function(){});
  
  });

  var monInput = document.getElementById("TxtQuantite");
    
    var autoNumeric = new AutoNumeric(monInput, {
      decimalPlaces: 0,
      digitGroupSeparator: ' ',
      unformatOnSubmit: true,
    });

    //window.globale = autoNumeric;

  // const BtnAdd = document.querySelector("#demande");
  const BtnSave = document.querySelector("#BtnSave");

  

  BtnSave.addEventListener("click", function () {
    
    if(appGadget.TestFields ())
    {
    BtnSave.disabled = true;
    let verif = document.getElementById("TxtVerif").value;
    if(verif=="Edit")
    {
      let valID = document.getElementById("TxtID").value;
      console.log(valID);
      appGadget.Edit (valID, function(a){
        //location.reload();
        const appUrl = '/pages/gadget/show.aspx?ID=' + a.get_id();
        const url = "/tools"+appUrl;
        appHelper.navigation("DivMainPageContainer", url);
        var closeButton = document.querySelector('[aria-label="Close"]');
        closeButton.click();
      });
    }
    else{
      appGadget.Add (function(a){
        //location.reload();
        const appUrl = '/pages/gadget/show.aspx?ID=' + a.get_id();
        const url = "/tools"+appUrl;
        appHelper.navigation("DivMainPageContainer", url);
        var closeButton = document.querySelector('[aria-label="Close"]');
        closeButton.click();
        
      });
    }
  }
  });

  

};


appGadget.TestFields = function(){

  let v = true;
  let str = '';
  
   // Récupérer les valeurs des champs
    var nom = document.getElementById("TxtNom").value;
    var matricule = document.getElementById("TxtMatricule").value;
    var email = document.getElementById("TxtEmail").value;
    let gadget = document.getElementById("TxtArticle").value;
    let qte = document.getElementById("TxtQuantite").value;
    let motif = document.getElementById("TxtMotif").value;
  
  
   // Vérifier si les champs obligatoires sont vides
   if (nom === "" || matricule === "" || email === "" || gadget === "" || qte === "0" || motif === "" ) {
     str += ("Veuillez remplir tous les champs obligatoires. <br>");
       v= false; // Empêche l'envoi du formulaire
   }
  
   // Valider le champ "Nombre de Jours" pour être supérieur ou égal à 1
   if (parseInt(qte) < 1) {
     str +=  ("La quantité doit être supérieur ou égal à 1. <br>");
       v= false; // Empêche l'envoi du formulaire
   }
  
   let div = document.getElementById('DivErreurMessage');
   div.innerHTML = '';
   if(v==false){
    str = `<div style="border:2px solid red; background:#ffe6ff;padding:3px;color:#330033;margin:3px;">${str}</div>`;
    div.innerHTML = str;
   }
  
   return v;
};

function getRating (str){
  document.getElementById('TxtNature').value = str;
}

function use_number(node) {
  var empty_val = false;
  const value = node.value;
  if (node.value == '')
      empty_val = true;
  node.type = 'number';
  if (!empty_val){
    node.value = Number(value.replace(/./g, '')); 
    use_text(node);
  }
}

function use_text(node) {
  var empty_val = false;
  const value = Number(node.value);
  if (node.value == '')
      empty_val = true;
  node.type = 'text';
  if (!empty_val)
      node.value = value.toLocaleString('fr');
}

function number(nombre){
  var empty_val = false;
  const value = node.value;
  if (node.value == '')
      empty_val = true;
  node.type = 'number';
  if (!empty_val){
    node.value = Number(value.replace(/./g, '')); 
    
  }
}


appGadget.List = function () {
  let oList = appGadget.clientContext
    .get_web()
    .get_lists()
    .getByTitle(appHelper.ListName.Gadget);
  let camlQuery = new SP.CamlQuery();
  camlQuery.set_viewXml(
    "<View><Query><Where>" +
      '<Eq><FieldRef ID="Demandeur" /><Value Type="Integer"><UserID/></Value></Eq>' +
      "</Where></Query></View>"
  );
  let collListItem = oList.getItems(camlQuery);
  appGadget.clientContext.load(collListItem);
  appGadget.clientContext.executeQueryAsync(function (sender, args) {
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
          reprise: new Date( oListItem.get_item("DateReprise")).toLocaleDateString(),
          nbre: oListItem.get_item("NombreJours"),
          status: oListItem.get_item("StatutLibelle"),
          classe: appHelper.Status.GetClass(oListItem.get_item("Statut")),
        });
      }

      appHelper.renderTemplate("tmpl_table_gadget", "DivGadgetTableShow", view);

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

appGadget.Add = function ( callBack) {
  let oList = appGadget.clientContext
    .get_web()
    .get_lists()
    .getByTitle(appHelper.ListName.Gadget);
  let itemCreateInfo = new window.SP.ListItemCreationInformation();
  let oListItem = oList.addItem(itemCreateInfo);

  let startDate = new Date();

  let repDate = new Date();

  let endDate = startDate.addDays(2);

  var Input = document.getElementById("TxtQuantite");

  var autoNumericObject = AutoNumeric.getAutoNumericElement(Input);

  var qte = autoNumericObject.getNumber();

  let ref = appHelper.getReference("GDT");

  console.log(qte);


  console.log("TEST");

  oListItem.set_item("Statut", appHelper.Status.ENATTENTE);
  oListItem.set_item("StatutLibelle", "VALIDATION DU SUPERIEUR HIERARCHIQUE");
  oListItem.set_item("Reference", ref);

  oListItem.set_item("DateDepart", startDate);
  oListItem.set_item("DateRetour", endDate);
  oListItem.set_item("DateReprise", repDate);

  oListItem.set_item("Title", document.getElementById("TxtArticle").value);

  oListItem.set_item("Nature", document.getElementById("TxtArticle").value);

  oListItem.set_item("Motif", document.getElementById("TxtMotif").value);

  //oListItem.set_item("Quantite", parseInt(valqte));
  oListItem.set_item("Quantite", qte);

  oListItem.set_item("NombreJours", qte);

  oListItem.set_item("NombreJourAccorde", qte);

  oListItem.set_item("DemandeurEmail",App.CurrentUser.Email);
 
  oListItem.set_item("Demandeur", SP.FieldUserValue.fromUser(App.CurrentUser.Login));

  oListItem.set_item("ResponsableN1", App.CurrentUser.ManagerPersonne);
  oListItem.set_item("ResponsableN2", App.CurrentUser.ManagerPersonne2);

  oListItem.set_item("ResponsableN1Email", App.CurrentUser.Manager.Email);
  oListItem.set_item("ResponsableN2Email", App.CurrentUser.Manager2.Email);

  
  oListItem.update();
  clientContext.load(oListItem);
  clientContext.executeQueryAsync(function () {

  appHelper.upploadAttachmentFiles("FileDoc", oListItem.get_id(), appHelper.ListName.Gadget, 0, function(){

    const appUrl = '/pages/gadget/show.aspx?ID=' + oListItem.get_id();
    let WF = new WFManager(appHelper.AppCode.GADGET,  appHelper.AppConstante.SiteUrl, appHelper.ListName.Validation,  ACTIV_WORKFLOW  );
    WF.createWFTask(clientContext,appUrl, appHelper.AppCode.GADGET, oListItem.get_id(), App.CurrentUser.Manager.Login, App.CurrentUser.Manager2.Login, ref, function(){})
      
    if(callBack){
      callBack(oListItem);
    }

    }, appSpHelper.writeError);
  })
  
};

appGadget.Edit = function (demandeid, callBack) {

  let oList = clientContext.get_web().get_lists().getByTitle(appHelper.ListName.Gadget);
  let oListItem = oList.getItemById(demandeid);

  var Input = document.getElementById("TxtQuantite");

  var autoNumericObject = AutoNumeric.getAutoNumericElement(Input);

  var qte = autoNumericObject.getNumber();
  console.log(qte);


  oListItem.set_item("Statut", appHelper.Status.ENATTENTE);
  oListItem.set_item("StatutLibelle", "VALIDATION DU SUPERIEUR HIERARCHIQUE");

  oListItem.set_item("Title", document.getElementById("TxtArticle").value);

  oListItem.set_item("Nature", document.getElementById("TxtArticle").value);

  oListItem.set_item("Motif", document.getElementById("TxtMotif").value);
  oListItem.set_item("Reference", document.getElementById("TxtRef").value);

  oListItem.set_item("Quantite", qte);

  oListItem.set_item("DemandeurEmail",App.CurrentUser.Email);
 
  oListItem.set_item("Demandeur", SP.FieldUserValue.fromUser(App.CurrentUser.Login));

  oListItem.set_item("ResponsableN1", App.CurrentUser.ManagerPersonne);
  oListItem.set_item("ResponsableN2", App.CurrentUser.ManagerPersonne2);

  oListItem.set_item("ResponsableN1Email", App.CurrentUser.Manager.Email);
  oListItem.set_item("ResponsableN2Email", App.CurrentUser.Manager2.Email);

  oListItem.update();
  clientContext.load(oListItem);
  clientContext.executeQueryAsync(function () {

  const appUrl = '/pages/gadget/show.aspx?ID=' + oListItem.get_id();
      console.log(appUrl);
      let WF = new WFManager(appHelper.AppCode.GADGET,  appHelper.AppConstante.SiteUrl, appHelper.ListName.Validation,  ACTIV_WORKFLOW  );
      WF.createWFTask(clientContext,appUrl, appHelper.AppCode.GADGET, oListItem.get_id(), App.CurrentUser.Manager.Login, App.CurrentUser.Manager2.Login, ref, function(){}   )
      
      if(callBack){
        callBack(oListItem);
      }
  }, appSpHelper.writeError);
};

appGadget.ShowDetails = function (demandeid, callBack) {

  let oList = appGadget.clientContext.get_web().get_lists().getByTitle(appHelper.ListName.Gadget);
  let It = oList.getItemById(demandeid);
  console.log(demandeid);
  console.log("IN ShowDetails");

  appGadget.clientContext.load(It);
  appGadget.clientContext.executeQueryAsync(function () {
    if (It) {
      
        document.getElementById("TxtArticle").value = It.get_item('Title') != null ? It.get_item('Title') : ''; 
        document.getElementById("TxtMotif").value = It.get_item('Motif') != null ? It.get_item('Motif') : '';
        document.getElementById("TxtQuantite").value = It.get_item('Quantite') != null ? It.get_item('Quantite') : '';
        document.getElementById("TxtRef").value = It.get_item('Reference') != null ? It.get_item('Reference') : '';
        document.getElementById("TxtVerif").value = 'Edit';
        document.getElementById("TxtID").value = It.get_item('ID') != null ? It.get_item('ID') : 0;
        
if(callBack){callBack();}

    }else{if(callBack){callBack();}}
  }, appSpHelper.writeError);
}


SP.SOD.executeFunc('sp.js', 'SP.ClientContext', appGadget.InitializePage);
// document.addEventListener("DOMContentLoaded", () => {
//   ExecuteOrDelayUntilScriptLoaded(function(){
    
//   }, "SP.ClientContext");
// });

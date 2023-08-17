var appConge = appConge || {};
var clientContext;
appConge.clientContext;

appConge.InitializePage = function () {
  appConge.clientContext = SP.ClientContext.get_current();
  clientContext = SP.ClientContext.get_current();
  appSpHelper.GetMyProperties(function () {

    appConge.initCmbTypeConge(function () {

      document.getElementById("TxtNom").value = App.CurrentUser.DisplayName;
      document.getElementById("TxtMatricule").value = App.CurrentUser.Matricule;
      document.getElementById("TxtEmail").value = App.CurrentUser.Email;

      setTimeout(function () {
        appSpHelper.InitializePeoplePicker("plePickerInterimaireDiv", false, "350px");

        appSpHelper.PeoplePickerOnChangeEvent("plePickerInterimaireDiv", function (key) {
          appConge.GetInterimData(key);
        });

        appConge.ShowDetails(appHelper.GetQueryStringFromAjaxQuery('DID'), function(){});

      }, 2000);

    });
  });


  appConge.GetInterimData = function (login) {
    appSpHelper.GetEmploye(appHelper.ListName.Employe, login, function (it) {
      document.getElementById("TxtIntName").value = it.get_item('EmpPrenom') + ' ' + it.get_item('EmpNom');
      document.getElementById("TxtIntMatricule").value = it.get_item('EmpMatricule');
      document.getElementById("TxtIntEmail").value = it.get_item('EmpMail');
    });
  }


  const BtnSave = document.querySelector("#BtnSave");
  const TxtIntName = document.querySelector("#TxtIntName");

  TxtIntName.addEventListener("click", function () {

    // document.querySelector("#TxtIntName").value = 'Consultant INOVA';

  });

  BtnSave.addEventListener("click", function () {
    appConge.Add(function () {
      location.reload();
    });
  });

};



appConge.initCmbTypeConge = function (callBack) {
  ListerMotif(function () {
    let cmb = document.getElementById("cmbTypeConge");
    let txtColor = document.getElementById("TxtTypeCongeColeur");
    let txtText = document.getElementById("TxtTypeCongeText");
    cmb.addEventListener("change", function () {
      let selectedOption = this.options[this.selectedIndex];
      let color = selectedOption.getAttribute("data-color");
      txtColor.value = color;
      txtText.value = selectedOption.text;
    });

    if (callBack) {
      callBack();
    }
  });

};


function ListerMotif(callBack) {
  let oList = clientContext.get_web().get_lists().getByTitle(appHelper.ListName.TypeConge);
  let q = '<View><Query><Where>' +
    '<Eq><FieldRef Name=\'active\' /><Value Type=\'Boolean\' >1</Value></Eq>' +
    '</Where></Query></View>';
  let camlQuery = new SP.CamlQuery();
  camlQuery.set_viewXml(q);
  let listItemMotif = oList.getItems(camlQuery);
  clientContext.load(listItemMotif);
  clientContext.executeQueryAsync(
    function () {
      var listItemEnumerator = listItemMotif.getEnumerator();

      while (listItemEnumerator.moveNext()) {
        let oListItemTp = listItemEnumerator.get_current();
        let opt = document.createElement("option");
        opt.setAttribute("data-duree", oListItemTp.get_item('Duree'));
        opt.setAttribute("data-color", oListItemTp.get_item('Background'));
        opt.setAttribute("value", oListItemTp.get_id());
        opt.innerHTML = oListItemTp.get_item('Title');
        document.getElementById('cmbTypeConge').appendChild(opt);
      }


      if (callBack) {
        callBack();
      }
    },
    function (sender, args) { console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace()); });
}

appConge.List = function () {
  let oList = appConge.clientContext
    .get_web()
    .get_lists()
    .getByTitle(appHelper.ListName.Conge);
  let camlQuery = new SP.CamlQuery();
  camlQuery.set_viewXml(
    "<View><Query><Where>" +
    '<Eq><FieldRef ID="Demandeur" /><Value Type="Integer"><UserID/></Value></Eq>' +
    "</Where></Query></View>"
  );
  let collListItem = oList.getItems(camlQuery);
  appConge.clientContext.load(collListItem);
  appConge.clientContext.executeQueryAsync(function (sender, args) {
    if (collListItem.get_count() > 0) {
      var listItemEnumerator = collListItem.getEnumerator();
      let view = {};
      view.conges = [];
      while (listItemEnumerator.moveNext()) {
        var oListItem = listItemEnumerator.get_current();
        view.conges.push({
          id: oListItem.get_item("ID"),
          title: oListItem.get_item("Title"),
          startdate: new Date(oListItem.get_item("DateDepart")).toLocaleDateString(),
          nbre: oListItem.get_item("NombreJours"),
          status: oListItem.get_item("StatutLibelle"),
          classe: appHelper.Status.GetClass(oListItem.get_item("Statut")),
        });
      }

      appHelper.renderTemplate("tmpl_table_conge", "DivCongeTableShow", view);

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

appConge.Add = function (callBack) {
  let oList = appConge.clientContext
    .get_web()
    .get_lists()
    .getByTitle(appHelper.ListName.Conge);
  let itemCreateInfo = new window.SP.ListItemCreationInformation();
  let oListItem = oList.addItem(itemCreateInfo);

  let startDate = new Date(
    document.getElementById("TxtDateDepart").value
    //appHelper.ReturnISODate()
  );
  let endDate = startDate.addDays(
    parseInt(document.getElementById("TxtNbreJour").value)
  );

  oListItem.set_item("Statut", appHelper.Status.ENATTENTE);
  oListItem.set_item("StatutLibelle", "VALIDATION DU SUPERIEUR HIERARCHIQUE");

  oListItem.set_item("DateDepart", startDate);
  oListItem.set_item("DateRetour", endDate);
  oListItem.set_item("DateReprise", endDate);
  oListItem.set_item("DateRetourPrevisionnelle", endDate);

  oListItem.set_item("Title", document.getElementById("TxtTypeCongeText").value);

  oListItem.set_item("NombreJours", parseInt(document.getElementById("TxtNbreJour").value));
  oListItem.set_item("NombreJourAcquis", parseInt(document.getElementById("TxtNbreJour").value));
  oListItem.set_item("NombreJourAccorde", parseInt(document.getElementById("TxtNbreJour").value));
  oListItem.set_item("DomicileConge", document.getElementById("TxtCongeDomicile").value);
  oListItem.set_item("CongeTelephone", document.getElementById("TxtCongeTelephone").value);
  oListItem.set_item("CongeContact", document.getElementById("TxtCongeContact").value);
  oListItem.set_item("TypeCongeID", document.getElementById("cmbTypeConge").value);
  oListItem.set_item("TypeCongeLibelle", document.getElementById("TxtTypeCongeText").value);
  oListItem.set_item("DemandeurEmail", App.CurrentUser.Email);
  oListItem.set_item("Couleur", document.getElementById("TxtTypeCongeColeur").value);
  oListItem.set_item("Historique", "#");

  oListItem.set_item("Demandeur", SP.FieldUserValue.fromUser(App.CurrentUser.Login));
  oListItem.set_item("Interimaire", SP.FieldUserValue.fromUser(SPClientPeoplePicker.SPClientPeoplePickerDict.plePickerInterimaireDiv_TopSpan.GetAllUserKeys()));

  oListItem.set_item("ResponsableN1", App.CurrentUser.ManagerPersonne);
  oListItem.set_item("ResponsableN2", App.CurrentUser.ManagerPersonne2);

  oListItem.set_item("ResponsableN1Email", App.CurrentUser.Manager.Email);
  oListItem.set_item("ResponsableN2Email", App.CurrentUser.Manager2.Email);

  oListItem.update();
  clientContext.load(oListItem);
  clientContext.executeQueryAsync(function () {

    const appUrl = '/pages/conge/show.aspx?ID=' + oListItem.get_id();
    let WF = new WFManager(appHelper.AppCode.CONGE, appHelper.AppConstante.SiteUrl, appHelper.ListName.Validation, ACTIV_WORKFLOW);
    WF.createWFTask(clientContext, appUrl, appHelper.AppCode.CONGE, oListItem.get_id(), App.CurrentUser.Manager.Login, App.CurrentUser.Manager2.Login, function () {

      if (callBack) {
        callBack(oListItem);
      }
    })

  }, appSpHelper.writeError);
};



appConge.ShowDetails = function (demandeid, callBack) {

  let oList = appConge.clientContext.get_web().get_lists().getByTitle(appHelper.ListName.Conge);
  let It = oList.getItemById(demandeid);
  console.log("IN ShowDetails");

  appConge.clientContext.load(It);
  appConge.clientContext.executeQueryAsync(function () {
    if (It) {
      
        document.getElementById("TxtDateDepart").value = new Date(It.get_item('DateDepart')).toLocaleDateString(); 
        document.getElementById("TxtTypeCongeText").value = It.get_item('TypeCongeLibelle') != null ? It.get_item('TypeCongeLibelle') : '';
        document.getElementById("TxtNbreJour").value = It.get_item('NombreJours') != null ? It.get_item('NombreJours') : '';
        document.getElementById("TxtCongeDomicile").value = It.get_item('DomicileConge') != null ? It.get_item('DomicileConge') : '';
        document.getElementById("TxtCongeTelephone").value = It.get_item('CongeTelephone') != null ? It.get_item('CongeTelephone') : '';
        document.getElementById("TxtCongeContact").value = It.get_item('CongeContact') != null ? It.get_item('CongeContact') : '';

        document.getElementById("cmbTypeConge").value = It.get_item('TypeCongeID') != null ? It.get_item('TypeCongeID') : '';
        document.getElementById("TxtTypeCongeText").value =  It.get_item('TypeCongeLibelle') != null ? It.get_item('TypeCongeLibelle') : '';
        document.getElementById("TxtTypeCongeColeur").value =  It.get_item('Couleur') != null ? It.get_item('Couleur') : '';
       
        appSpHelper.SetPeoplePickerField ('plePickerInterimaireDiv', It.get_item('Interimaire') != null ? It.get_item('Interimaire').get_lookupValue() : '');
        
if(callBack){callBack();}

    }else{if(callBack){callBack();}}
  }, appSpHelper.writeError);
}


// document.addEventListener("DOMContentLoaded", () => {
//   ExecuteOrDelayUntilScriptLoaded(function(){
SP.SOD.executeFunc('sp.js', 'SP.ClientContext', appConge.InitializePage);
//   }, "SP.ClientContext");
// });

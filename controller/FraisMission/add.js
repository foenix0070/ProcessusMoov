var appMission = appMission || {};
var clientContext;
appMission.clientContext;

appMission.InitializePage = function () {
  appMission.clientContext = SP.ClientContext.get_current();
  clientContext =  SP.ClientContext.get_current();

  
  appSpHelper.GetMyProperties(function () {

    appMission.initCmbMode(function () {});
    appMission.initCmbCaisse(function () {});

    appMission.initCmbZone(function () {

      document.getElementById("TxtNom").value = App.CurrentUser.DisplayName;
      document.getElementById("TxtMatricule").value = App.CurrentUser.Matricule;
      document.getElementById("TxtEmail").value = App.CurrentUser.Email;

      setTimeout(function () {
        appSpHelper.InitializePeoplePicker("plePickerInterimaireDiv", false, "350px");

        appSpHelper.PeoplePickerOnChangeEvent("plePickerInterimaireDiv", function (key) {
          appMission.GetInterimData(key);
          
        });

        appMission.ShowDetails(appHelper.GetQueryStringFromAjaxQuery('DID'), function(){});
        FraisMission.ShowDetails(appHelper.GetQueryStringFromAjaxQuery('DID'), function(){});

      }, 2000);

  });
  });

  var monInput = document.getElementById("TxtCoutTotal");

  var autoNumeric = new AutoNumeric(monInput, {
    digitGroupSeparator: " ",
    decimalPlaces: 0,
    unformatOnSubmit: true,
  });

  

  appMission.GetInterimData = function (login) {
    appSpHelper.GetEmploye(appHelper.ListName.Employe, login, function (it) {
      document.getElementById("TxtIntName").value = it.get_item('EmpPrenom') + ' ' + it.get_item('EmpNom');
      document.getElementById("TxtIntMatricule").value = it.get_item('EmpMatricule');
      document.getElementById("TxtIntEmail").value = it.get_item('EmpMail');
    });
  }

  var monInput = document.getElementById("TxtCoutTotal");
    
  var autoNumeric = new AutoNumeric(monInput, {
      digitGroupSeparator: " ",
  });

  const TxtIntName = document.querySelector("#TxtIntName");

  TxtIntName.addEventListener("click", function () {

    // document.querySelector("#TxtIntName").value = 'Consultant INOVA';

  });


  const BtnSave = document.querySelector("#BtnSave");

  BtnSave.addEventListener("click", function () {
    let zone = document.getElementById("cmbZoneGeo").value;
    let caisse = document.getElementById("cmbCaisse").value;
    let mode = document.getElementById("cmbMode").value;
    let cout = document.getElementById("TxtCoutTotal").value;
    let nombre = document.getElementById("TxtNombre").value;
    let forfait = document.getElementById("TxtForfait").value;
    let startdate = document.getElementById("DateDebut").value;
    let enddate = document.getElementById("DateFin").value;

    if(zone!="" && caisse!="" && nombre!=0 && forfait!=0 && mode!="" && cout!=0 && startdate!="" && enddate!="")
    {
    let verif = document.getElementById("TxtVerif").value;
    if(verif=="Edit")
    {
      let valID = document.getElementById("TxtID").value;
      console.log(valID,);
      appMission.Edit (valID, function(a){
        //location.reload();
        const appUrl = '/pages/fraisMission/show.aspx?ID=' + a.get_id();
        const url = "/tools1"+appUrl;
        appHelper.navigation("DivMainPageContainer", url);
        var closeButton = document.querySelector('[aria-label="Close"]');
        closeButton.click();
      });
    }
    else{
      appMission.Add (function(a){
        //location.reload();
        const appUrl = '/pages/fraisMission/show.aspx?ID=' + a.get_id();
        const url = "/tools1"+appUrl;
        appHelper.navigation("DivMainPageContainer", url);
        var closeButton = document.querySelector('[aria-label="Close"]');
        closeButton.click();
      });
    }
  }
  else {
    alert("Veillez renseigner correctement les champs");
  }
  });

};

function calculTotal() {
  var nombre = parseFloat(document.getElementById("TxtNombre").value);
  var forfait = parseFloat(document.getElementById("TxtForfait").value);

  if (!isNaN(nombre) && !isNaN(forfait)) {
      var total = nombre * forfait;
      document.getElementById("TxtTotal").value = total;
      //   document.getElementById("TxtTotal").value = total.toFixed(2);
  } else {
      document.getElementById("TxtTotal").value = "";
  }
}

function getRating (str){
  document.getElementById('TxtNature').value = str;
}

/*Mission.initCmbTypefraisMission = function (callBack) {
  ListerMotif(function(){
    let cmb = document.getElementById("cmbTypefraisMission");
    let txtColor = document.getElementById("TxtTypefraisMissionColeur");
    let txtText = document.getElementById("TxtTypefraisMissionText");
    cmb.addEventListener("change", function () {
      let selectedOption = this.options[this.selectedIndex];
      let color = selectedOption.getAttribute("data-color");
      txtColor.value = color;
      txtText.value = selectedOption.text;
    });

    if(callBack){
      callBack();
    }
  });

};*/

appMission.initCmbZone = function (callBack) {
  ListerZone(function(){
    let cmb = document.getElementById("cmbZoneGeo");
    let txtColor = document.getElementById("TxtZoneGeoColeur");
    let txtText = document.getElementById("TxtZoneGeoText");
    cmb.addEventListener("change", function () {
      let selectedOption = this.options[this.selectedIndex];
      let color = selectedOption.getAttribute("data-color");
      txtColor.value = color;
      txtText.value = selectedOption.text;
    });

    if(callBack){
      callBack();
    }
  });

};


appMission.initCmbCaisse = function (callBack) {
  ListerCaisse(function(){
    let cmb = document.getElementById("cmbCaisse");
    let txtColor = document.getElementById("TxtCaisseColeur");
    let txtText = document.getElementById("TxtCaisseText");
    cmb.addEventListener("change", function () {
      let selectedOption = this.options[this.selectedIndex];
      let color = selectedOption.getAttribute("data-color");
      txtColor.value = color;
      txtText.value = selectedOption.text;
    });

    if(callBack){
      callBack();
    }
  });

};

appMission.initCmbMode = function (callBack) {
  ListerMode(function(){
    let cmb = document.getElementById("cmbMode");
    let txtColor = document.getElementById("TxtModeColeur");
    let txtText = document.getElementById("TxtModeText");
    cmb.addEventListener("change", function () {
      let selectedOption = this.options[this.selectedIndex];
      let color = selectedOption.getAttribute("data-color");
      txtColor.value = color;
      txtText.value = selectedOption.text;
    });

    if(callBack){
      callBack();
    }
  });

};


function ListerZone( callBack) {
  let oList = clientContext.get_web().get_lists().getByTitle(appHelper.ListName.Zone);
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
              document.getElementById('cmbZoneGeo').appendChild(opt);
          }


          if(callBack){
            callBack();
          }
      },
      function (sender, args) { console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace()); });
}

function ListerCaisse( callBack) {
  let oList = clientContext.get_web().get_lists().getByTitle(appHelper.ListName.Caisse);
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
              document.getElementById('cmbCaisse').appendChild(opt);
          }


          if(callBack){
            callBack();
          }
      },
      function (sender, args) { console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace()); });
}

function ListerMode( callBack) {
  let oList = clientContext.get_web().get_lists().getByTitle(appHelper.ListName.Mode);
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
              document.getElementById('cmbMode').appendChild(opt);
          }


          if(callBack){
            callBack();
          }
      },
      function (sender, args) { console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace()); });
}

/*function ListerMotif( callBack) {
  let oList = clientContext.get_web().get_lists().getByTitle(appHelper.ListName.TypefraisMission);
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
              document.getElementById('cmbTypefraisMission').appendChild(opt);
          }


          if(callBack){
            callBack();
          }
      },
      function (sender, args) { console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace()); });
}*/

appMission.List = function () {
  let oList = Mission.clientContext
    .get_web()
    .get_lists()
    .getByTitle(appHelper.ListName.Mission);
  let camlQuery = new SP.CamlQuery();
  camlQuery.set_viewXml(
    "<View><Query><Where>" +
      '<Eq><FieldRef ID="Demandeur" /><Value Type="Integer"><UserID/></Value></Eq>' +
      "</Where></Query></View>"
  );
  let collListItem = oList.getItems(camlQuery);
  Mission.clientContext.load(collListItem);
  Mission.clientContext.executeQueryAsync(function (sender, args) {
    if (collListItem.get_count() > 0) {
      var listItemEnumerator = collListItem.getEnumerator();
      let view = {};
      view.Mission = [];
      while (listItemEnumerator.moveNext()) {
        var oListItem = listItemEnumerator.get_current();
        view.Mission.push({
          id: oListItem.get_item("ID"),
          title: oListItem.get_item("Title"),
          startdate: new Date( oListItem.get_item("DateDepart")).toLocaleDateString(),
          reprise: new Date( oListItem.get_item("DateReprise")).toLocaleDateString(),
          nbre: oListItem.get_item("NombreJours"),
          status: oListItem.get_item("StatutLibelle"),
          classe: appHelper.Status.GetClass(oListItem.get_item("Statut")),
        });
      }

      appHelper.renderTemplate("tmpl_table_fraisMission", "DivfraisMissionTableShow", view);

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

function afficher() {
  var selectValue = document.getElementById("CmbCaisse").value;
  
  var inputMasque = document.getElementById("AutreCaisse");
  
  if (selectValue === "Autre") {
    //alert("OK");
    inputMasque.style.display = "block";
  } else {
    inputMasque.style.display = "none";
  }
}

function ajouterLigne() {
  var table = document.getElementById("TableFraisMission");
  var newRow = table.insertRow(table.rows.length);
  
  //var cell = newRow.insertCell(0);
  var cell1 = newRow.insertCell(1);
  var cell2 = newRow.insertCell(2);
  var cell3 = newRow.insertCell(3);
  var cell4 = newRow.insertCell(4);
  var cell5 = newRow.insertCell(5);
  var cell6 = newRow.insertCell(6);
  
  //cell.innerHTML = '<select class="mt-3" id="CmbPerdieme" name"CmbPerdieme"><option value"Hotel">Hotel</option></select>';
  cell1.innerHTML = '<input type="date" id="DateDebut" name="DateDebut">';
  cell2.innerHTML = '<input type="date" id="DateFin" name="DateFin">';
  cell3.innerHTML = '<input type="text" id="TxtNombre" name="TxtNombre">';
  cell4.innerHTML = '<input type="text" id="TxtForfait" name="TxtForfait">';
  cell5.innerHTML = '<input type="text" id="TxtTotal" name="TxtTotal">';
  cell6.innerHTML = '<button onclick="supprimerLigne(this)">Supprimer</button>';
}

function supprimerLigne(button) {
  var row = button.parentNode.parentNode;
  var table = row.parentNode;
  table.removeChild(row);
}


appMission.Add = function ( callBack) {
  let oList = appMission.clientContext
    .get_web()
    .get_lists()
    .getByTitle(appHelper.ListName.Mission);
  let itemCreateInfo = new window.SP.ListItemCreationInformation();
  let oListItem = oList.addItem(itemCreateInfo);

  /*let startDate = new Date();

  let repDate = new Date();*/

  let startDate = new Date(
    document.getElementById("DateDebut").value
    //appHelper.ReturnISODate()
  );
  let endDate = new Date(
    document.getElementById("DateFin").value
    //appHelper.ReturnISODate()
  );

  let pickerDict = SPClientPeoplePicker.SPClientPeoplePickerDict.plePickerInterimaireDiv_TopSpan;
  let userKeys = pickerDict.GetAllUserKeys();

  var Input = document.getElementById("TxtCoutTotal");

  var autoNumericObject = AutoNumeric.getAutoNumericElement(Input);

  var cout = autoNumericObject.getNumber();

  //let endDate = startDate.addDays(2);

  oListItem.set_item("Statut", appHelper.Status.ENATTENTE);
  oListItem.set_item("StatutLibelle", "VALIDATION DU SUPERIEUR HIERARCHIQUE");

  oListItem.set_item("DateDebut", startDate);
  //oListItem.set_item("DateRetour", endDate);
  oListItem.set_item("DateFin", endDate);

  oListItem.set_item("Title", document.getElementById("TxtMotif").value);

  oListItem.set_item("Motif", document.getElementById("TxtMotif").value);

  oListItem.set_item("Destination", document.getElementById("TxtDestination").value);

  oListItem.set_item("Commentaire", document.getElementById("TxtCommentaire").value);

  oListItem.set_item("SiteBTS", document.getElementById("TxtSite").value);

  oListItem.set_item("CoutTotal", cout);
  oListItem.set_item("ZoneGeographiqueID",parseInt(document.getElementById("cmbZoneGeo").value));
  oListItem.set_item("ZoneGeographique", document.getElementById("TxtZoneGeoText").value);
  oListItem.set_item("CaissePaiementID",parseInt(document.getElementById("cmbCaisse").value));
  oListItem.set_item("CaissePaiement", document.getElementById("TxtCaisseText").value);
  oListItem.set_item("ModePaiementID",parseInt(document.getElementById("cmbMode").value));
  oListItem.set_item("ModePaiement", document.getElementById("TxtModeText").value);
  oListItem.set_item("AutreCaissePaiement", parseInt(document.getElementById("TxtAutreCaisse").value));
  oListItem.set_item("DemandeurEmail", App.CurrentUser.Email);

 
  oListItem.set_item("Demandeur",SP.FieldUserValue.fromUser(App.CurrentUser.Login));

  oListItem.set_item("ResponsableN1", App.CurrentUser.ManagerPersonne);
  oListItem.set_item("ResponsableN2", App.CurrentUser.ManagerPersonne2);

  oListItem.set_item("ResponsableN1Email", App.CurrentUser.Manager.Email);
  oListItem.set_item("ResponsableN2Email", App.CurrentUser.Manager2.Email);

  if(userKeys.length >0)
  {
    oListItem.set_item("Interimaire", SP.FieldUserValue.fromUser(SPClientPeoplePicker.SPClientPeoplePickerDict.plePickerInterimaireDiv_TopSpan.GetAllUserKeys()));
  }


  oListItem.update();
  clientContext.load(oListItem);
  clientContext.executeQueryAsync(function () {
    AddFM(oListItem);
    console.log("Test");

    if(cout < 500000)
    {
      const appUrl = '/pages/fraisMission/show.aspx?ID=' + oListItem.get_id();
      let WF = new WFManager(appHelper.AppCode.MISSION,  appHelper.AppConstante.SiteUrl, appHelper.ListName.Validation,  ACTIV_WORKFLOW  );
      WF.createWFTask(clientContext,appUrl, appHelper.AppCode.MISSION, oListItem.get_id(), App.CurrentUser.Manager.Login, App.CurrentUser.Manager2.Login, function(){}   )
      if(callBack){
        callBack(oListItem);
      }
    }
    else
    {
      const appUrl = '/pages/fraisMission/show.aspx?ID=' + oListItem.get_id();
      let WF = new WFManager(appHelper.AppCode.MISSION,  appHelper.AppConstante.SiteUrl, appHelper.ListName.Validation,  ACTIV_WORKFLOW1  );
      WF.createWFTask(clientContext,appUrl, appHelper.AppCode.MISSION, oListItem.get_id(), App.CurrentUser.Manager.Login, App.CurrentUser.Manager2.Login, function(){}   )
      if(callBack){
        callBack(oListItem);
      }
    }

  
  }, appSpHelper.writeError);
};

appMission.Edit = function (demandeid, callBack) {
  let oList = clientContext.get_web().get_lists().getByTitle(appHelper.ListName.Mission);
  let oListItem = oList.getItemById(demandeid);

  let startDate = new Date(
    document.getElementById("DateDebut").value
    //appHelper.ReturnISODate()
  );
  let endDate = new Date(
    document.getElementById("DateFin").value
    //appHelper.ReturnISODate()
  );

  let pickerDict = SPClientPeoplePicker.SPClientPeoplePickerDict.plePickerInterimaireDiv_TopSpan;
  let userKeys = pickerDict.GetAllUserKeys();

  var Input = document.getElementById("TxtCoutTotal");

  var autoNumericObject = AutoNumeric.getAutoNumericElement(Input);

  var cout = autoNumericObject.getNumber();

  //let endDate = startDate.addDays(2);

  oListItem.set_item("Statut", appHelper.Status.ENATTENTE);
  oListItem.set_item("StatutLibelle", "VALIDATION DU SUPERIEUR HIERARCHIQUE");

  oListItem.set_item("DateDebut", startDate);
  //oListItem.set_item("DateRetour", endDate);
  oListItem.set_item("DateFin", endDate);

  oListItem.set_item("Title", document.getElementById("TxtMotif").value);

  oListItem.set_item("Motif", document.getElementById("TxtMotif").value);

  oListItem.set_item("Destination", document.getElementById("TxtDestination").value);

  oListItem.set_item("Commentaire", document.getElementById("TxtCommentaire").value);

  oListItem.set_item("SiteBTS", document.getElementById("TxtSite").value);

  oListItem.set_item("CoutTotal", cout);
  oListItem.set_item("ZoneGeographiqueID", parseInt(document.getElementById("cmbZoneGeo").value));
  oListItem.set_item("ZoneGeographique", document.getElementById("TxtZoneGeoText").value);
  oListItem.set_item("CaissePaiementID", parseInt(document.getElementById("cmbCaisse").value));
  oListItem.set_item("CaissePaiement", document.getElementById("TxtCaisseText").value);
  oListItem.set_item("ModePaiementID",parseInt(document.getElementById("cmbMode").value));
  oListItem.set_item("ModePaiement", document.getElementById("TxtModeText").value);
  oListItem.set_item("AutreCaissePaiement", parseInt(document.getElementById("TxtAutreCaisse").value));
  oListItem.set_item("DemandeurEmail", App.CurrentUser.Email);

 
  oListItem.set_item("Demandeur",SP.FieldUserValue.fromUser(App.CurrentUser.Login));

  oListItem.set_item("ResponsableN1", App.CurrentUser.ManagerPersonne);
  oListItem.set_item("ResponsableN2", App.CurrentUser.ManagerPersonne2);

  oListItem.set_item("ResponsableN1Email", App.CurrentUser.Manager.Email);
  oListItem.set_item("ResponsableN2Email", App.CurrentUser.Manager2.Email);

  if(userKeys.length >0)
  {
    oListItem.set_item("Interimaire", SP.FieldUserValue.fromUser(SPClientPeoplePicker.SPClientPeoplePickerDict.plePickerInterimaireDiv_TopSpan.GetAllUserKeys()));
  }


  oListItem.update();
  clientContext.load(oListItem);
  clientContext.executeQueryAsync(function () {
    EditFM(demandeid);
    console.log("Test");

    if(cout < 500000)
    {
      const appUrl = '/pages/fraisMission/show.aspx?ID=' + oListItem.get_id();
      let WF = new WFManager(appHelper.AppCode.MISSION,  appHelper.AppConstante.SiteUrl, appHelper.ListName.Validation,  ACTIV_WORKFLOW  );
      WF.createWFTask(clientContext,appUrl, appHelper.AppCode.MISSION, oListItem.get_id(), App.CurrentUser.Manager.Login, App.CurrentUser.Manager2.Login, function(){}   )
      if(callBack){
        callBack(oListItem);
      }
    }
    else
    {
      const appUrl = '/pages/fraisMission/show.aspx?ID=' + oListItem.get_id();
      let WF = new WFManager(appHelper.AppCode.MISSION,  appHelper.AppConstante.SiteUrl, appHelper.ListName.Validation,  ACTIV_WORKFLOW1  );
      WF.createWFTask(clientContext,appUrl, appHelper.AppCode.MISSION, oListItem.get_id(), App.CurrentUser.Manager.Login, App.CurrentUser.Manager2.Login, function(){}   )
      if(callBack){
        callBack(oListItem);
      }
    }

  
  }, appSpHelper.writeError);
};

function AddFM (oListItem) {
  var table = document.getElementById("TableFraisMission");
  var data = [];

  for (var i = 1; i < table.rows.length; i++) { 
    var row = table.rows[i];
    var cells = row.getElementsByTagName('td');
    var rowData = {};

    for (var j = 0; j < cells.length; j++) {
      var input = cells[j].getElementsByTagName('input')[0];
      var name = input.getAttribute('name');
      var value = input.value;
      rowData[name] = value;
    }

    data.push(rowData);
  }

  FraisMission.AddFraisMission(data, oListItem);
}


function EditFM (demandeid) {
  var table = document.getElementById("TableFraisMission");
  var data = [];

  for (var i = 1; i < table.rows.length; i++) { 
    var row = table.rows[i];
    var cells = row.getElementsByTagName('td');
    var rowData = {};

    for (var j = 0; j < cells.length; j++) {
      var input = cells[j].getElementsByTagName('input')[0];
      var name = input.getAttribute('name');
      var value = input.value;
      rowData[name] = value;
    }

    data.push(rowData);
  }

  FraisMission.EditFraisMission(data, demandeid);
}

/*
function AddFraisMission(data, oListItem) {

  for (var i = 0; i < data.length; i++) {
    var item = data[i];

    let oList = FraisMission.clientContext
    .get_web()
    .get_lists()
    .getByTitle(appHelper.ListName.FraisMission);
    let itemCreateInfo = new window.SP.ListItemCreationInformation();
    let oListItem1 = oList.addItem(itemCreateInfo);

    let startDate = new Date();

    let repDate = new Date();


    oListItem1.set_item("DateDebut", startDate);
    oListItem1.set_item("DateFin", repDate);

    oListItem1.set_item(
      "MissionID", oListItem.get_id());

    oListItem1.set_item(
      "PerdiemeID", item.CmbPerdieme);

    oListItem1.set_item(
      "Forfait", item.TxtForfait);

    oListItem1.set_item(
      "Total", item.TxtTotal);

    oListItem1.set_item(
      "Nombre", item.TxtNombre);

    oListItem1.update();
    clientContext.load(oListItem1);
    clientContext.executeQueryAsync(function (callBack) {
          callBack(oListItem1);
    });
    
  }
}

function EditFraisMission(data, demandeid) {

  for (var i = 0; i < data.length; i++) {
    var item = data[i];
    //let demandeid = oListItem.get_id();

    let oList = clientContext.get_web().get_lists().getByTitle(appHelper.ListName.FraisMission);
    let oListItem1 = oList.getItemById(demandeid);

    let startDate = new Date();

    let repDate = new Date();


    oListItem1.set_item("DateDebut", startDate);
    oListItem1.set_item("DateFin", repDate);

    oListItem1.set_item(
      "MissionID", demandeid);

    oListItem1.set_item(
      "PerdiemeID", item.CmbPerdieme);

    oListItem1.set_item(
      "Forfait", item.TxtForfait);

    oListItem1.set_item(
      "Total", item.TxtTotal);

    oListItem1.set_item(
      "Nombre", item.TxtNombre);

    oListItem1.update();
    clientContext.load(oListItem1);
    clientContext.executeQueryAsync(function (callBack) {
          callBack(oListItem1);
    });
    
  }
}
*/


appMission.ShowDetails = function (demandeid, callBack) {

  let oList = appMission.clientContext.get_web().get_lists().getByTitle(appHelper.ListName.Mission);
  let It = oList.getItemById(demandeid);
  console.log("IN ShowDetails");

  appMission.clientContext.load(It);
  appMission.clientContext.executeQueryAsync(function () {
    if (It) {
      
        //document.getElementById("DateDebut").value = new Date(It.get_item('DateDebut')).toLocaleDateString(); 
        //document.getElementById("DateFin").value = new Date(It.get_item('DateFin')).toLocaleDateString(); 
        document.getElementById("TxtMotif").value = It.get_item('Motif') != null ? It.get_item('Motif') : '';
        document.getElementById("TxtDestination").value = It.get_item('Destination') != null ? It.get_item('Destination') : '';
        document.getElementById("TxtCommentaire").value = It.get_item('Commentaire') != null ? It.get_item('Commentaire') : '';
        document.getElementById("TxtSite").value = It.get_item('SiteBTS') != null ? It.get_item('SiteBTS') : '';
        document.getElementById("TxtCoutTotal").value = It.get_item('CoutTotal') != null ? It.get_item('CoutTotal') : '';

        document.getElementById("cmbZoneGeo").value = It.get_item('ZoneGeographiqueID') != null ? It.get_item('ZoneGeographiqueID') : '';
        document.getElementById("TxtZoneGeoText").value =  It.get_item('ZoneGeographique') != null ? It.get_item('ZoneGeographique') : '';

        document.getElementById("cmbCaisse").value = It.get_item('CaissePaiementID') != null ? It.get_item('CaissePaiementID') : '';
        document.getElementById("TxtCaisseText").value =  It.get_item('CaissePaiement') != null ? It.get_item('CaissePaiement') : '';

        document.getElementById("cmbMode").value = It.get_item('ModePaiementID') != null ? It.get_item('ModePaiementID') : '';
        document.getElementById("TxtModeText").value =  It.get_item('ModePaiement') != null ? It.get_item('ModePaiement') : '';

        document.getElementById("TxtVerif").value = 'Edit';
        document.getElementById("TxtID").value = It.get_item('ID') != null ? It.get_item('ID') : 0;
       
        appSpHelper.SetPeoplePickerField ('plePickerInterimaireDiv', It.get_item('Interimaire') != null ? It.get_item('Interimaire').get_lookupValue() : '');
        
      if(callBack){callBack();}

    }else{if(callBack){callBack();}}
  }, appSpHelper.writeError);
}

SP.SOD.executeFunc('sp.js', 'SP.ClientContext', appMission.InitializePage);
// document.addEventListener("DOMContentLoaded", () => {
//   ExecuteOrDelayUntilScriptLoaded(function(){
    
//   }, "SP.ClientContext");
// });

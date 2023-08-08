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

      }, 2000);

  });
  });

  appMission.GetInterimData = function (login) {
    appSpHelper.GetEmploye(appHelper.ListName.Employe, login, function (it) {
      document.getElementById("TxtIntName").value = it.get_item('EmpPrenom') + ' ' + it.get_item('EmpNom');
      document.getElementById("TxtIntMatricule").value = it.get_item('EmpMatricule');
      document.getElementById("TxtIntEmail").value = it.get_item('EmpMail');
    });
  }

  const TxtIntName = document.querySelector("#TxtIntName");

  TxtIntName.addEventListener("click", function () {

    // document.querySelector("#TxtIntName").value = 'Consultant INOVA';

  });


  const BtnSave = document.querySelector("#BtnSave");


  BtnSave.addEventListener("click", function () {
    appMission.Add (function(){
      location.reload();
    });
  });

};

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

  //let endDate = startDate.addDays(2);

  oListItem.set_item("Statut", appHelper.Status.ENATTENTE);
  oListItem.set_item("StatutLibelle", "Validation du supérieur hiérarchique");

  oListItem.set_item("DateDebut", startDate);
  //oListItem.set_item("DateRetour", endDate);
  oListItem.set_item("DateFin", endDate);

  oListItem.set_item("Title",document.getElementById("TxtMotif").value);

  oListItem.set_item("Motif",document.getElementById("TxtMotif").value);

  oListItem.set_item("Destination",document.getElementById("TxtDestination").value);

  oListItem.set_item("Commentaire",document.getElementById("TxtCommentaire").value);

  oListItem.set_item("SiteBTS",parseInt(document.getElementById("TxtSite").value));

  oListItem.set_item("CoutTotal",parseInt(document.getElementById("TxtCoutTotal").value));
  oListItem.set_item("ZoneGeographiqueID",parseInt(document.getElementById("cmbZoneGeo").value));
  oListItem.set_item("CaissePaiementID",parseInt(document.getElementById("cmbCaisse").value));
  oListItem.set_item("ModePaiementID",parseInt(document.getElementById("cmbMode").value));
  oListItem.set_item("AutreCaissePaiement",parseInt(document.getElementById("TxtAutreCaisse").value));
  oListItem.set_item("DemandeurEmail", App.CurrentUser.Email);

 
  oListItem.set_item("Demandeur",SP.FieldUserValue.fromUser(App.CurrentUser.Login));

  oListItem.set_item("ResponsableN1", App.CurrentUser.ManagerPersonne);
  oListItem.set_item("ResponsableN2", App.CurrentUser.ManagerPersonne2);

  oListItem.set_item("ResponsableN1Email", App.CurrentUser.Manager.Email);
  oListItem.set_item("ResponsableN2Email", App.CurrentUser.Manager2.Email);


  oListItem.update();
  clientContext.load(oListItem);
  clientContext.executeQueryAsync(function () {
    AddFM(oListItem);
    console.log("Test");

  const appUrl = '/pages/fraisMission/show.aspx?ID=' + oListItem.get_id();
      let WF = new WFManager(appHelper.AppCode.MISSION,  appHelper.AppConstante.SiteUrl, appHelper.ListName.Validation,  ACTIV_WORKFLOW  );
      WF.createWFTask(clientContext,appUrl, appHelper.AppCode.MISSION, oListItem.get_id(), App.CurrentUser.Manager.Login, App.CurrentUser.Manager2.Login, function(){}   )
      if(callBack){
        callBack(oListItem);
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
*/

SP.SOD.executeFunc('sp.js', 'SP.ClientContext', appMission.InitializePage);
// document.addEventListener("DOMContentLoaded", () => {
//   ExecuteOrDelayUntilScriptLoaded(function(){
    
//   }, "SP.ClientContext");
// });

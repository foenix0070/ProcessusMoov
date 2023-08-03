var Mission = Mission || {};
var clientContext;
Mission.clientContext;

Mission.InitializePage = function () {
  Mission.clientContext = SP.ClientContext.get_current();
  clientContext =  SP.ClientContext.get_current();

  
  appSpHelper.GetMyProperties(function () {

    /*
   // appSpHelper.LoadUserCongeParam(
     // appHelper.ListName.Employe, 	"ETISALAT-AFRICA\pouattara",  App.CurrentUser.Login, CurrentUser.Matricule, CurrentUser.Email, CurrentUser.Nom,
      //function () {
        //appSpHelper.GetEmploye(
          //appHelper.ListName.Employe,
          //document.getElementById("TxtSpManagerN1Login").value,
          //function (item) {
            //console.log(item);
            //appSpHelper.GetEmployeeManagerLogin(
              //"N2",
              //item.get_item("EmpManager"),
              //function () {

              // span= document.getElementById('spanSolde');
              // span.innerHTML =document.getElementById('TxtSpUserNbreJrsAcquis').value;






              //  fraisMission.initCmbTypeConge(function(){
                Mission.List();
              //  });
             // }
            //);
          //}
        //);
      //}
   // );
   */

    document.getElementById("TxtNom").value = App.CurrentUser.DisplayName;
    document.getElementById("TxtMatricule").value = App.CurrentUser.Matricule;
    document.getElementById("TxtEmail").value = App.CurrentUser.Email;




  });


  // const BtnAdd = document.querySelector("#demande");
  const BtnSave = document.querySelector("#BtnSave");



  // BtnAdd.addEventListener("click", function () {
  //   // setTimeout(function () {
  //   //   appSpHelper.InitializePeoplePicker(
  //   //     "plePickerInterimaireDiv",
  //   //     false,
  //   //     "350px"
  //   //   );
  //   // }, 2000);

  // });

  BtnSave.addEventListener("click", function () {
    Mission.Add (function(){
      location.reload();
    });
  });

};

function getRating (str){
  document.getElementById('TxtNature').value = str;
}

Mission.initCmbTypefraisMission = function (callBack) {
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

};




function ListerMotif( callBack) {
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
}

Mission.List = function () {
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
  
  var cell = newRow.insertCell(0);
  var cell1 = newRow.insertCell(1);
  var cell2 = newRow.insertCell(2);
  var cell3 = newRow.insertCell(3);
  var cell4 = newRow.insertCell(4);
  var cell5 = newRow.insertCell(5);
  var cell6 = newRow.insertCell(6);
  
  cell.innerHTML = '<select id="CmbPerdieme" name"CmbPerdieme"><option value"Hotel">Hotel</option></select>';
  cell1.innerHTML = '<input type="date" id="DateDebut" name="DateDebut">';
  cell2.innerHTML = '<input type="date" id="DateFin" name="DateFin">';
  cell3.innerHTML = '<input type="text" id="TxtNombre" name="TxtNombre">';
  cell4.innerHTML = '<input type="text" id="TxtForfait" name="TxtForfait">';
  cell5.innerHTML = '<input type="text" id="TxtTotal" name="TxtTotal"></';
  cell6.innerHTML = '<button onclick="supprimerLigne(this)">Supprimer</button>';
}

function supprimerLigne(button) {
  var row = button.parentNode.parentNode;
  var table = row.parentNode;
  table.removeChild(row);
}


Mission.Add = function ( callBack) {
  let oList = Mission.clientContext
    .get_web()
    .get_lists()
    .getByTitle(appHelper.ListName.Mission);
  let itemCreateInfo = new window.SP.ListItemCreationInformation();
  let oListItem = oList.addItem(itemCreateInfo);

  let startDate = new Date();

  let repDate = new Date();

  //let endDate = startDate.addDays(2);

  oListItem.set_item("Status", appHelper.Status.ENATTENTE);
  oListItem.set_item("StatutLibelle", "Validation du supérieur hiérarchique");

  oListItem.set_item("DateDebut", startDate);
  //oListItem.set_item("DateRetour", endDate);
  oListItem.set_item("DateFin", repDate);

  oListItem.set_item("Title",document.getElementById("TxtMotif").value);

  oListItem.set_item("Motif",document.getElementById("TxtMotif").value);

  oListItem.set_item("Destination",document.getElementById("TxtDestination").value);

  oListItem.set_item("Commentaire",document.getElementById("TxtCommentaire").value);

  oListItem.set_item("SiteBTS",parseInt(document.getElementById("TxtSite").value));

  oListItem.set_item("CoutTotal",parseInt(document.getElementById("TxtCoutTotal").value));
  oListItem.set_item("ZoneGeographiqueID",parseInt(document.getElementById("CmbZone").value));
  oListItem.set_item("CaissePaiementID",parseInt(document.getElementById("CmbCaisse").value));
  oListItem.set_item("ModePaiementID",parseInt(document.getElementById("CmbMode").value));
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

  const appUrl = '/pages/fraisMission/show.aspx?ID=' + oListItem.get_id();
      //AddFM(oListItem);
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

  AddFraisMission(data, oListItem);
}

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

SP.SOD.executeFunc('sp.js', 'SP.ClientContext', Mission.InitializePage);
// document.addEventListener("DOMContentLoaded", () => {
//   ExecuteOrDelayUntilScriptLoaded(function(){
    
//   }, "SP.ClientContext");
// });

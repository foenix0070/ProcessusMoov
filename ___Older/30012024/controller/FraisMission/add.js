var appMission = appMission || {};
var clientContext;
appMission.clientContext;
let rowCount = 1;

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
        //FraisMission.ShowDetails(appHelper.GetQueryStringFromAjaxQuery('DID'), function(){});

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

  const TxtIntName = document.querySelector("#TxtIntName");

  TxtIntName.addEventListener("click", function () {

    // document.querySelector("#TxtIntName").value = 'Consultant INOVA';

  });


  const BtnSave = document.querySelector("#BtnSave");

  const BtnAjout = document.querySelector("#ajouterLigne");

  BtnAjout.addEventListener("click", function () {
    rowCount++;
    appMission.ajouterLigne(rowCount);
    // appMission.ajouterLigne();
  });

  BtnSave.addEventListener("click", function () {
    

    if(appMission.TestFields())
    {
      BtnSave.disabled = true;
    let verif = document.getElementById("TxtVerif").value;
    if(verif=="Edit")
    {
      let valID = document.getElementById("TxtID").value;
      console.log(valID,);
      appMission.Edit (valID, function(a){
        //location.reload();
        const appUrl = '/pages/fraisMission/show.aspx?ID=' + a.get_id();
        const url = "/tools"+appUrl;
        appHelper.navigation("DivMainPageContainer", url);
        var closeButton = document.querySelector('[aria-label="Close"]');
        closeButton.click();
      });
    }
    else{
      appMission.Add (function(a){
        //location.reload();
        const appUrl = '/pages/fraisMission/show.aspx?ID=' + a.get_id();
        const url = "/tools"+appUrl;
        appHelper.navigation("DivMainPageContainer", url);
        var closeButton = document.querySelector('[aria-label="Close"]');
        closeButton.click();
      });
    }
  }
  });

};

appMission.TestFields = function(){

  let v = true;
  let str = '';
  
   // Récupérer les valeurs des champs
   var nom = document.getElementById("TxtNom").value;
   var matricule = document.getElementById("TxtMatricule").value;
   var email = document.getElementById("TxtEmail").value;
   var zone = document.getElementById("cmbZoneGeo").value;
   var caisse = document.getElementById("cmbCaisse").value;
   var mode = document.getElementById("cmbMode").value;
   var destination = document.getElementById("TxtDestination").value;
   var motif = document.getElementById("TxtMotif").value;
   //var cout = document.getElementById("TxtCoutTotal").value;
   var nombre = document.getElementById("TxtNombre").value;
   var total = document.getElementById("TxtTotal").value;
   var forfait = document.getElementById("TxtForfait").value;
   var startdate = document.getElementById("TxtDateDebut").value;
   var enddate = document.getElementById("TxtDateFin").value;
   var startdate1 = document.getElementById("DateDebut").value;
   var enddate1 = document.getElementById("DateFin").value;

   var Input = document.getElementById("TxtCoutTotal");

  var autoNumericObject = AutoNumeric.getAutoNumericElement(Input);

  var cout = autoNumericObject.getNumber();
  
   var debutDate = new Date(document.getElementById("TxtDateDebut").value);
  
   var findate = new Date(document.getElementById("TxtDateFin").value);

   var debutDate1 = new Date(document.getElementById("DateDebut").value);
  
   var findate1 = new Date(document.getElementById("DateFin").value);

   var todaydate = new Date();
  
   // Vérifier si les champs obligatoires sont vides
   if (nom === "" || matricule === "" || email === "" || cout === "0" || nombre === "0" || forfait === "0" || zone === "" || startdate === "" || enddate === "" || startdate1 === "" || enddate1 === "" || caisse === "" || mode === "" || destination === "" || motif === "") {
     str += ("Veuillez remplir tous les champs obligatoires. <br>");
       v= false; // Empêche l'envoi du formulaire
   }
  
   // Valider le champ "Nombre de Jours" pour être supérieur ou égal à 1
   if (parseInt(cout) < 1) {
     str +=  ("Le coût doit être supérieur ou égal à 1. <br>");
       v= false; // Empêche l'envoi du formulaire
   }

   // Valider le champ "Nombre de Jours" pour être supérieur ou égal à 1
   if (parseInt(forfait) < 1) {
    str +=  ("Le forfait doit être supérieur ou égal à 1. <br>");
      v= false; // Empêche l'envoi du formulaire
  }

  // Valider le champ "Nombre de Jours" pour être supérieur ou égal à 1
  if (parseInt(nombre) < 1) {
    str +=  ("Le nombre doit être supérieur ou égal à 1. <br>");
      v= false; // Empêche l'envoi du formulaire
  }
  
  if (parseInt(total) > parseInt(cout)) {
    str +=  ("Le total ne peut pas être supérieur au cout de la mission. <br>");
      v= false; // Empêche l'envoi du formulaire
  }
   // Verifier si la date est supérieure ou égales à celle d'aujourd'hui
   if (debutDate < todaydate || findate < todaydate || debutDate > findate) {
    str +=  ("La date choisit n'est pas valide. <br>");
      v= false; // Empêche l'envoi du formulaire
  }

  // Verifier si la date est supérieure ou égales à celle d'aujourd'hui
  if (debutDate1 < todaydate || findate1 < todaydate || debutDate1 > findate1) {
    str +=  ("La date choisit pour les frais n'est pas valide. <br>");
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

// function calculTotal() {
//   var nombre = parseFloat(document.getElementById("TxtNombre").value);
//   // var nombre = parseFloat(document.querySelector("TxtNombre").value);
//   // var forfait = parseFloat(document.querySelector("TxtForfait").value);
//   var forfait = parseFloat(document.getElementById("TxtForfait").value);

//   if (!isNaN(nombre) && !isNaN(forfait)) {
//       var total = nombre * forfait;
//       document.getElementById("TxtTotal").value = total;
//       //   document.getElementById("TxtTotal").value = total.toFixed(2);
//   } else {
//       document.getElementById("TxtTotal").value = "";
//   }
// }

function calculTotal() {
  const table = document.getElementById('TableFraisMission');
  const rows = table.getElementsByTagName('tr');
  let total = 0;

  console.log(rows.length);

  for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      const inputs = row.getElementsByTagName('input');
      const txtTotal = inputs[5];

      // const nombre = parseFloat(inputs[3].value) || 0;
      // const forfait = parseFloat(inputs[4].value) || 0;
      // const ligneTotal = nombre * forfait;

      const nombre = parseFloat(inputs[3].value);
      const forfait = parseFloat(inputs[4].value);

      console.log(nombre, forfait);

      if (!isNaN(nombre) && !isNaN(forfait)) {
        const ligneTotal = nombre * forfait;
        txtTotal.value = ligneTotal;
        // txtTotal.value = ligneTotal.toFixed(2);
        total += ligneTotal;
        } 
      else {
        txtTotal.value = 0;
      }

      // txtTotal.value = ligneTotal.toFixed(2);
      // total += ligneTotal;
  }

  const totalGeneralInput = document.getElementById('totalGeneral');
  if (totalGeneralInput) {
      totalGeneralInput.value = total;
  }
}

function getRating (str){
  document.getElementById('TxtNature').value = str;
}


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
          document.getElementById('cmbZoneGeo').innerHTML = "";

          let opt = document.createElement("option");
          opt.setAttribute("value", "0");
          opt.innerHTML = "Choisir la zone geographique";
          document.getElementById("cmbZoneGeo").appendChild(opt);

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
          document.getElementById('cmbCaisse').innerHTML = "";

          let opt = document.createElement("option");
          opt.setAttribute("value", "0");
          opt.innerHTML = "Choisir la caisse de paiement";
          document.getElementById("cmbCaisse").appendChild(opt);

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
          document.getElementById('cmbMode').innerHTML = "";

          let opt = document.createElement("option");
          opt.setAttribute("value", "0");
          opt.innerHTML = "Choisir le mode de paiement";
          document.getElementById("cmbMode").appendChild(opt);

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

// function afficher() {
//   var selectValue = document.getElementById("CmbCaisse").value;
  
//   var inputMasque = document.getElementById("AutreCaisse");
  
//   if (selectValue === "Autre") {
//     //alert("OK");
//     inputMasque.style.display = "block";
//   } else {
//     inputMasque.style.display = "none";
//   }
// }

appMission.ajouterLigne = function(indice) {
  var table = document.getElementById("TableFraisMission");
  var newRow = table.insertRow(table.rows.length);
  
  var cell = newRow.insertCell(0);
  var cell1 = newRow.insertCell(1);
  var cell2 = newRow.insertCell(2);
  var cell3 = newRow.insertCell(3);
  var cell4 = newRow.insertCell(4);
  var cell5 = newRow.insertCell(5);
  var cell6 = newRow.insertCell(6);

  cell.innerHTML = '<input type="text" id="Txtlibelle' + indice + '" name="Txtlibelle' + indice + '">';
  cell1.innerHTML = '<input type="date" id="DateDebut' + indice + '" name="DateDebut' + indice + '">';
  cell2.innerHTML = '<input type="date" id="DateFin' + indice + '" name="DateFin' + indice + '">';
  cell3.innerHTML = '<input type="number" id="TxtNombre' + indice + '" name="TxtNombre' + indice + '" oninput="calculTotal()">';
  cell4.innerHTML = '<input type="number" id="TxtForfait' + indice + '" name="TxtForfait' + indice + '" oninput="calculTotal()">';
  cell5.innerHTML = '<input type="number" id="TxtTotal' + indice + '" name="TxtTotal' + indice + '" readonly>';
  cell6.innerHTML = '<span class="delete-icon" onclick="supprimerLigne(this)">×</span>';
  // cell6.innerHTML = '<i class="fas fa-trash-alt" onclick="supprimerLigne(this)"></i>';
  // cell6.innerHTML = '<button onclick="supprimerLigne(this)">Supprimer</button>';
  
  // cell.innerHTML = '<input type="text" id="Txtlibelle" name"Txtlibelle">';
  // cell1.innerHTML = '<input type="date" id="DateDebut" name="DateDebut">';
  // cell2.innerHTML = '<input type="date" id="DateFin" name="DateFin">';
  // cell3.innerHTML = '<input type="number" id="TxtNombre" name="TxtNombre" oninput="calculTotal()">';
  // cell4.innerHTML = '<input type="number" id="TxtForfait" name="TxtForfait" oninput="calculTotal()">';
  // cell5.innerHTML = '<input type="number" id="TxtTotal" name="TxtTotal" readonly>';
  // cell6.innerHTML = '<button onclick="supprimerLigne(this)">Supprimer</button>';
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

  let startDate = new Date(
    document.getElementById("TxtDateDebut").value
    //appHelper.ReturnISODate()
  );
  let endDate = new Date(
    document.getElementById("TxtDateFin").value
    //appHelper.ReturnISODate()
  );

  let pickerDict = SPClientPeoplePicker.SPClientPeoplePickerDict.plePickerInterimaireDiv_TopSpan;
  let userKeys = pickerDict.GetAllUserKeys();

  var Input = document.getElementById("TxtCoutTotal");

  var autoNumericObject = AutoNumeric.getAutoNumericElement(Input);

  var cout = autoNumericObject.getNumber();

  let ref = appHelper.getReference("FDM");

  console.log(cout);

  //let endDate = startDate.addDays(2);

  oListItem.set_item("Statut", appHelper.Status.ENATTENTE);
  oListItem.set_item("StatutLibelle", "VALIDATION DU SUPERIEUR HIERARCHIQUE");
  oListItem.set_item("Reference", ref);

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
  //oListItem.set_item("AutreCaissePaiement", parseInt(document.getElementById("TxtAutreCaisse").value));
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
      appHelper.upploadAttachmentFiles("FileDoc", oListItem.get_id(), appHelper.ListName.Mission, 0, function () {
        const appUrl = '/pages/fraisMission/show.aspx?ID=' + oListItem.get_id();
        let WF = new WFManager(appHelper.AppCode.MISSION,  appHelper.AppConstante.SiteUrl, appHelper.ListName.Validation,  ACTIV_WORKFLOW  );
        WF.createWFTask(clientContext,appUrl, appHelper.AppCode.MISSION, oListItem.get_id(), App.CurrentUser.Manager, App.CurrentUser.Manager2, ref, function(){}   )
        if(callBack){
          callBack(oListItem);
        }
      });
    }
    else
    {
      appHelper.upploadAttachmentFiles("FileDoc", oListItem.get_id(), appHelper.ListName.Mission, 0, function () {
        const appUrl = '/pages/fraisMission/show.aspx?ID=' + oListItem.get_id();
        let WF = new WFManager(appHelper.AppCode.MISSION,  appHelper.AppConstante.SiteUrl, appHelper.ListName.Validation,  ACTIV_WORKFLOW1  );
        WF.createWFTask(clientContext,appUrl, appHelper.AppCode.MISSION, oListItem.get_id(), App.CurrentUser.Manager, App.CurrentUser.Manager2, ref, function(){}   )
        if(callBack){
          callBack(oListItem);
        }
      });
    }

  
  }, appSpHelper.writeError);
};

appMission.Edit = function (demandeid, callBack) {
  let oList = clientContext.get_web().get_lists().getByTitle(appHelper.ListName.Mission);
  let oListItem = oList.getItemById(demandeid);

  let startDate = new Date(
    document.getElementById("TxtDateDebut").value
    //appHelper.ReturnISODate()
  );
  let endDate = new Date(
    document.getElementById("TxtDateFin").value
    //appHelper.ReturnISODate()
  );

  let pickerDict = SPClientPeoplePicker.SPClientPeoplePickerDict.plePickerInterimaireDiv_TopSpan;
  let userKeys = pickerDict.GetAllUserKeys();

  var Input = document.getElementById("TxtCoutTotal");

  var autoNumericObject = AutoNumeric.getAutoNumericElement(Input);

  var cout = autoNumericObject.getNumber();
  let ref = document.getElementById("TxtRef").value;

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
  //oListItem.set_item("AutreCaissePaiement", parseInt(document.getElementById("TxtAutreCaisse").value));
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
      appHelper.upploadAttachmentFiles("FileDoc", oListItem.get_id(), appHelper.ListName.Gadget, 0, function(){
      const appUrl = '/pages/fraisMission/show.aspx?ID=' + oListItem.get_id();
      let WF = new WFManager(appHelper.AppCode.MISSION,  appHelper.AppConstante.SiteUrl, appHelper.ListName.Validation,  ACTIV_WORKFLOW  );
      WF.createWFTask(clientContext,appUrl, appHelper.AppCode.MISSION, oListItem.get_id(), App.CurrentUser.Manager, App.CurrentUser.Manager2, ref, function(){}   )
      if(callBack){
        callBack(oListItem);
      }
    }, appSpHelper.writeError);
    }
    else
    {
      appHelper.upploadAttachmentFiles("FileDoc", oListItem.get_id(), appHelper.ListName.Gadget, 0, function(){
      const appUrl = '/pages/fraisMission/show.aspx?ID=' + oListItem.get_id();
      let WF = new WFManager(appHelper.AppCode.MISSION,  appHelper.AppConstante.SiteUrl, appHelper.ListName.Validation,  ACTIV_WORKFLOW1  );
      WF.createWFTask(clientContext,appUrl, appHelper.AppCode.MISSION, oListItem.get_id(), App.CurrentUser.Manager, App.CurrentUser.Manager2, ref, function(){}   )
      if(callBack){
        callBack(oListItem);
      }
    }, appSpHelper.writeError);
    }

  
  }, appSpHelper.writeError);
};

function AddFM (oListItem) {
  // var table = document.getElementById("TableFraisMission");
  // var data = [];

  // for (var i = 1; i < table.rows.length; i++) { 
  //   var row = table.rows[i];
  //   var cells = row.getElementsByTagName('td');
  //   var rowData = {};

  //   for (var j = 0; j < cells.length; j++) {
  //     var input = cells[j].getElementsByTagName('input')[0];
  //     var name = input.getAttribute('name');
  //     var value = input.value;
  //     rowData[name] = value;
  //   }

  //   data.push(rowData);
  // }

  //FraisMission.AddFraisMission(data, oListItem);
  
  const table = document.getElementById('TableFraisMission');
    const rows = table.getElementsByTagName('tr');
    const data = [];

    for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        const inputs = row.getElementsByTagName('input');
        const rowData = {};

        rowData.libelle = inputs[0].value;
        rowData.dateDebut = inputs[1].value;
        rowData.dateFin = inputs[2].value;
        rowData.nombre = inputs[3].value;
        rowData.forfait = inputs[4].value;
        rowData.total = inputs[5].value;

        data.push(rowData);
    }
  
  appMission.AddFraisMission(data, oListItem, function(){});
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

  appMission.EditFraisMission(data, demandeid);
}

appMission.AddFraisMission = function (data, oListItem, callBack) {

  for (var i = 0; i < data.length; i++) {
    var item = data[i];

    let oList = appMission.clientContext
      .get_web()
      .get_lists()
      .getByTitle(appHelper.ListName.FraisMission);
    let itemCreateInfo = new window.SP.ListItemCreationInformation();
    let oListItem1 = oList.addItem(itemCreateInfo);

    let startDate = new Date(item.dateDebut);

    let repDate = new Date(item.dateFin);

    oListItem1.set_item("Title", item.libelle);

    oListItem1.set_item("DateDebut", startDate);
    
    oListItem1.set_item("DateFin", repDate);

    oListItem1.set_item("MissionID", oListItem.get_id());

    oListItem1.set_item("Forfait", item.forfait);

    oListItem1.set_item("Total", item.total);

    oListItem1.set_item("Nombre", item.nombre);

    oListItem1.update();
    clientContext.load(oListItem1);
    clientContext.executeQueryAsync(function () {
      if(callBack){
        callBack(oListItem1);
      }
    });

  }
  console.log("Add FraisMission");
}


// appMission.AddFraisMission = function (data, oListItem, callBack) {

//   for (var i = 0; i < data.length; i++) {
//     var item = data[i];

//     let oList = appMission.clientContext
//       .get_web()
//       .get_lists()
//       .getByTitle(appHelper.ListName.FraisMission);
//     let itemCreateInfo = new window.SP.ListItemCreationInformation();
//     let oListItem1 = oList.addItem(itemCreateInfo);

//     let startDate = new Date(document.getElementById("DateDebut").value);

//     let repDate = new Date(document.getElementById("DateFin").value);


//     oListItem1.set_item("Title", item.Txtlibelle);


//     oListItem1.set_item("DateDebut", startDate);
//     oListItem1.set_item("DateFin", repDate);

//     oListItem1.set_item(
//       "MissionID", oListItem.get_id());

//     oListItem1.set_item(
//       "Forfait", item.TxtForfait);

//     oListItem1.set_item(
//       "Total", item.TxtTotal);

//     oListItem1.set_item(
//       "Nombre", item.TxtNombre);

//     oListItem1.update();
//     clientContext.load(oListItem1);
//     clientContext.executeQueryAsync(function () {
//       if(callBack){
//         callBack(oListItem1);
//       }
//     });

//   }
//   console.log("Add FraisMission");
// }

appMission.EditFraisMission = function (data, demandeid) {

  for (var i = 0; i < data.length; i++) {
    var item = data[i];

    let oList = clientContext.get_web().get_lists().getByTitle(appHelper.ListName.FraisMission);
    let oListItem1 = oList.getItemById(demandeid);

    let startDate = new Date(document.getElementById("DateDebut").value);

    let repDate = new Date(document.getElementById("DateFin").value);


    oListItem1.set_item("DateDebut", startDate);
    oListItem1.set_item("DateFin", repDate);
    oListItem1.set_item("Reference", document.getElementById("TxtRef").value);


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
  console.log("Add FraisMission");
}


appMission.ShowDetails = function (demandeid, callBack) {

  let oList = appMission.clientContext.get_web().get_lists().getByTitle(appHelper.ListName.Mission);
  let It = oList.getItemById(demandeid);
  console.log("IN ShowDetails");

  appMission.clientContext.load(It);
  appMission.clientContext.executeQueryAsync(function () {
    if (It) {
      
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

        document.getElementById("TxtRef").value = It.get_item('Reference') != null ? It.get_item('Reference') : '';


        document.getElementById("TxtVerif").value = 'Edit';
        document.getElementById("TxtID").value = It.get_item('ID') != null ? It.get_item('ID') : 0;

        //var idmission = It.get_item('ID') != null ? It.get_item('ID') : 0;
       
        appSpHelper.SetPeoplePickerField ('plePickerInterimaireDiv', It.get_item('Interimaire') != null ? It.get_item('Interimaire').get_lookupValue() : '');

        //appMission.ShowDetails1(idmission, function(){});
        
      if(callBack){callBack();}

    }else{if(callBack){callBack();}}
  }, appSpHelper.writeError);
}

appMission.ShowDetails1 = function (demandeid, callBack) {

  let oList = appMission.clientContext.get_web().get_lists().getByTitle(appHelper.ListName.FraisMission);
  //let It = oList.getItemById(demandeid);
  console.log("IN ShowDetails");

  let camlQuery = new SP.CamlQuery();
  camlQuery.set_viewXml("<View><Query><Where><Eq><FieldRef Name='MissionID' /><Value Type='Text'>" + demandeid + "</Value></Eq></Where></Query></View>");

  let It = oList.getItems(camlQuery);

  appMission.clientContext.load(It);
  appMission.clientContext.executeQueryAsync(function () {
    if (It.get_count() > 0) {
      //var itemEnumerator = It.getEnumerator();
      console.log("BOUCLE");
      //while (itemEnumerator.moveNext()) {
        let test = new Date(It.get_item('DateDebut')).toLocaleDateString();
        console.log(test);
        //document.getElementById("DateDebut").value = new Date(It.get_item('DateDebut')).toLocaleDateString();
        //document.getElementById("DateFin").value = new Date(It.get_item('DateFin')).toLocaleDateString();
        document.getElementById("TxtForfait").value = It.get_item('Forfait') != null ? It.get_item('Forfait') : '';
        document.getElementById("TxtTotal").value = It.get_item('Total') != null ? It.get_item('Total') : '';
        document.getElementById("TxtNombre").value = It.get_item('Nombre') != null ? It.get_item('Nombre') : '';

      //}
      if(callBack){callBack();}
    }else{if(callBack){callBack();}}
  }, appSpHelper.writeError);
}

SP.SOD.executeFunc('sp.js', 'SP.ClientContext', appMission.InitializePage);
// document.addEventListener("DOMContentLoaded", () => {
//   ExecuteOrDelayUntilScriptLoaded(function(){
    
//   }, "SP.ClientContext");
// });

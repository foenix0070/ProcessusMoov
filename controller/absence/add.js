var appAbsence = appAbsence || {};
var clientContext;
appAbsence.clientContext;

appAbsence.InitializePage = function () {

  App.LoadFormNote (appHelper.AppCode.ABSENCE ,'DivNoteFormulaire');

  appAbsence.clientContext = SP.ClientContext.get_current();
  clientContext = SP.ClientContext.get_current();
  appSpHelper.GetMyProperties(function () {
    appAbsence.initCmbTypeAbsence(function () {
      document.getElementById("TxtNom").value = App.CurrentUser.DisplayName;
      document.getElementById("TxtMatricule").value = App.CurrentUser.Matricule;
      document.getElementById("TxtEmail").value = App.CurrentUser.Email;

      setTimeout(function () {
        appSpHelper.InitializePeoplePicker("plePickerInterimaireDiv", false, "350px");

        appSpHelper.PeoplePickerOnChangeEvent("plePickerInterimaireDiv", function (key) {
          appAbsence.GetInterimData(key);
        });

        appAbsence.ShowDetails(appHelper.GetQueryStringFromAjaxQuery('DID'), function () { });

      }, 2000);


      appAbsence.GetInterimData = function (login) {
        appSpHelper.GetEmploye(appHelper.ListName.Employe, login, function (it) {
          document.getElementById("TxtIntName").value = it.get_item('EmpPrenom') + ' ' + it.get_item('EmpNom');
          document.getElementById("TxtIntMatricule").value = it.get_item('EmpMatricule');
          document.getElementById("TxtIntEmail").value = it.get_item('EmpMail');
        });
      }

    });
  });

  const TxtIntName = document.querySelector("#TxtIntName");
  const BtnSave = document.querySelector("#BtnSave");


  TxtIntName.addEventListener("click", function () {

  });


  BtnSave.addEventListener("click", function () {

    if (appAbsence.TestFields()) {
      BtnSave.disabled = true;
      let verif = document.getElementById("TxtVerif").value;
      if (verif == "Edit") {
        let valID = document.getElementById("TxtID").value;
        appHelper.Log(valID);
        appAbsence.Edit(valID, function (a) {
          //location.reload();
          const appUrl = '/pages/autorisationAbsence/show.aspx?ID=' + a.get_id();
          const url = "/tools" + appUrl;
          appHelper.navigation("DivMainPageContainer", url);
          var closeButton = document.querySelector('[aria-label="Close"]');
          closeButton.click();
        });
      }
      else {
        appAbsence.Add(function (a) {
          //location.reload();
          const appUrl = '/pages/autorisationAbsence/show.aspx?ID=' + a.get_id();
          const url = "/tools" + appUrl;
          appHelper.navigation("DivMainPageContainer", url);
          var closeButton = document.querySelector('[aria-label="Close"]');
          closeButton.click();
        });
      }
    }


  });

};

appAbsence.TestFields = function () {

  let v = true;
  let str = '';

  // Récupérer les valeurs des champs
  var nom = document.getElementById("TxtNom").value;
  var matricule = document.getElementById("TxtMatricule").value;
  var email = document.getElementById("TxtEmail").value;
  var nature = document.getElementById("cmbTypeAbsence").value;
  var motif = document.getElementById("TxtMotif").value;
  var duree = document.getElementById("TxtDuree").value;
  var startdate = document.getElementById("DateDebut").value;
  //var enddate = document.getElementById("DateReprise").value;

  var todaydate = new Date();

  // Vérifier si les champs obligatoires sont vides
  if (nom === "" || matricule === "" || email === "" || duree === "0" || nature === "" || motif === "" || startdate === "") {
    str += ("Veuillez remplir tous les champs obligatoires. <br>");
    v = false; // Empêche l'envoi du formulaire
  }

  // Valider le champ "Nombre de Jours" pour être supérieur ou égal à 1
  if (parseInt(duree) < 1) {
    str += ("Le nombre de jours doit être supérieur ou égal à 1. <br>");
    v = false; // Empêche l'envoi du formulaire
  }

  var debutDate = new Date(document.getElementById("DateDebut").value);


  // Verifier si la date est supérieure ou égales à celle d'aujourd'hui
  if (debutDate < todaydate) {
    str += ("La date choisit n'est pas valide. <br>");
    v = false; // Empêche l'envoi du formulaire
  }


  if(appHelper.TestIsOverFileMinSize("FileDoc") == false){
    str += ("Le fichier joint à cette demande ne pas être vide <br>");
    v = false; // Empêche l'envoi du formulaire
  }

  let div = document.getElementById('DivErreurMessage');
  div.innerHTML = '';
  if (v == false) {
    str = `<div style="border:2px solid red; background:#ffe6ff;padding:3px;color:#330033;margin:3px;">${str}</div>`;
    div.innerHTML = str;
  }

  return v;
};

function getRating(str) {
  document.getElementById('TxtNature').value = str;
}

appAbsence.initCmbTypeAbsence = function (callBack) {
  ListerMotif(function () {
    let cmb = document.getElementById("cmbTypeAbsence");
    //let txtColor = document.getElementById("TxtTypeAbsenceColeur");
    let txtText = document.getElementById("TxtTypeAbsenceText");
    cmb.addEventListener("change", function () {
      let selectedOption = this.options[this.selectedIndex];
      //let color = selectedOption.getAttribute("data-color");
      //txtColor.value = color;
      txtText.value = selectedOption.text;
    });

    if (callBack) {
      callBack();
    }
  });

};


function ListerMotif(callBack) {
  let oList = clientContext.get_web().get_lists().getByTitle(appHelper.ListName.TypeAbsence);
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
      document.getElementById("cmbTypeAbsence").innerHTML = "";


      let opt = document.createElement("option");
      opt.setAttribute("value", "0");
      opt.innerHTML = "Choisir le type d'Absence";
      document.getElementById("cmbTypeAbsence").appendChild(opt);

      while (listItemEnumerator.moveNext()) {
        let oListItemTp = listItemEnumerator.get_current();
        let opt = document.createElement("option");
        //opt.setAttribute("data-duree", oListItemTp.get_item('Duree'));
        //opt.setAttribute("data-color", oListItemTp.get_item('Background'));
        opt.setAttribute("value", oListItemTp.get_id());
        opt.innerHTML = oListItemTp.get_item('Title');
        document.getElementById('cmbTypeAbsence').appendChild(opt);
      }


      if (callBack) {
        callBack();
      }
    },
    function (sender, args) { appHelper.Log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace()); });
}

appAbsence.List = function () {
  let oList = appAbsence.clientContext
    .get_web()
    .get_lists()
    .getByTitle(appHelper.ListName.Absence);
  let camlQuery = new SP.CamlQuery();
  camlQuery.set_viewXml(
    "<View><Query><Where>" +
    '<Eq><FieldRef ID="Demandeur" /><Value Type="Integer"><UserID/></Value></Eq>' +
    "</Where></Query></View>"
  );
  let collListItem = oList.getItems(camlQuery);
  appAbsence.clientContext.load(collListItem);
  appAbsence.clientContext.executeQueryAsync(function (sender, args) {
    if (collListItem.get_count() > 0) {
      var listItemEnumerator = collListItem.getEnumerator();
      let view = {};
      view.absences = [];
      while (listItemEnumerator.moveNext()) {
        var oListItem = listItemEnumerator.get_current();
        view.absences.push({
          id: oListItem.get_item("ID"),
          title: oListItem.get_item("Title"),
          startdate: new Date(oListItem.get_item("DateDepart")).toLocaleDateString(),
          reprise: new Date(oListItem.get_item("DateReprise")).toLocaleDateString(),
          nbre: oListItem.get_item("NombreJours"),
          status: oListItem.get_item("StatutLibelle"),
          classe: appHelper.Status.GetClass(oListItem.get_item("Statut")),
        });
      }

      appHelper.renderTemplate("tmpl_table_absence", "DivAbsenceTableShow", view);

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

appAbsence.Add = function (callBack) {
  let oList = appAbsence.clientContext
    .get_web()
    .get_lists()
    .getByTitle(appHelper.ListName.Absence);
  let itemCreateInfo = new window.SP.ListItemCreationInformation();
  let oListItem = oList.addItem(itemCreateInfo);

  let startDate = new Date(
    document.getElementById("DateDebut").value
    //appHelper.ReturnISODate()
  );

  let duree = parseInt(document.getElementById("TxtDuree").value);
  let endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + duree);

  let repDate = new Date(endDate);
  repDate.setDate(endDate.getDate() + 1);

  if (endDate.getDay() === 6) {
    endDate.setDate(endDate.getDate() + 2);
  } else if (endDate.getDay() === 0) {
    endDate.setDate(endDate.getDate() + 1);
  }

  let ref = appHelper.getReference("ABS");


  let pickerDict = SPClientPeoplePicker.SPClientPeoplePickerDict.plePickerInterimaireDiv_TopSpan;
  let userKeys = pickerDict.GetAllUserKeys();

  oListItem.set_item("Statut", appHelper.Status.ENATTENTE);
  oListItem.set_item("StatutLibelle", "VALIDATION DU SUPERIEUR HIERARCHIQUE");
  oListItem.set_item("Reference", ref);
  oListItem.set_item("DateDepart", startDate);
  oListItem.set_item("DateRetour", endDate);
  oListItem.set_item("DateReprise", endDate);
  oListItem.set_item("Title", document.getElementById("TxtTypeAbsenceText").value);
  oListItem.set_item("Nature", document.getElementById("TxtTypeAbsenceText").value);
  oListItem.set_item("TypeAbsenceID", document.getElementById("cmbTypeAbsence").value);
  oListItem.set_item("Motif", document.getElementById("TxtMotif").value);
  oListItem.set_item("NombreJours", parseInt(document.getElementById("TxtDuree").value));
  oListItem.set_item("NombreJourAccorde", parseInt(document.getElementById("TxtDuree").value));
  oListItem.set_item("DemandeurEmail", App.CurrentUser.Email);
  oListItem.set_item("Demandeur", SP.FieldUserValue.fromUser(App.CurrentUser.Login));
  oListItem.set_item("ResponsableN1", App.CurrentUser.ManagerPersonne);
  oListItem.set_item("ResponsableN2", App.CurrentUser.ManagerPersonne2);

  oListItem.set_item("ResponsableN1Email", App.CurrentUser.Manager.Email);
  oListItem.set_item("ResponsableN2Email", App.CurrentUser.Manager2.Email);

  if (userKeys.length > 0) {
    oListItem.set_item("Interimaire", SP.FieldUserValue.fromUser(SPClientPeoplePicker.SPClientPeoplePickerDict.plePickerInterimaireDiv_TopSpan.GetAllUserKeys()));
  }

  oListItem.update();
  clientContext.load(oListItem);
  clientContext.executeQueryAsync(function () {

    appHelper.upploadAttachmentFiles("FileDoc", oListItem.get_id(), appHelper.ListName.Absence, 0, function () {

      const appUrl = '/pages/autorisationAbsence/show.aspx?ID=' + oListItem.get_id();
      let WF = new WFManager(appHelper.AppCode.ABSENCE, appHelper.AppConstante.SiteUrl, appHelper.ListName.Validation, ACTIV_WORKFLOW);
      WF.createWFTask(clientContext, appUrl, appHelper.AppCode.ABSENCE, oListItem.get_id(), App.CurrentUser.Manager, App.CurrentUser.Manager2, ref, function () { })
      if (callBack) {
        callBack(oListItem);
      }
    }, appSpHelper.writeError);
  })
};


appAbsence.Edit = function (demandeid, callBack) {

  let oList = clientContext.get_web().get_lists().getByTitle(appHelper.ListName.Absence);
  let oListItem = oList.getItemById(demandeid);

  let startDate = new Date(
    document.getElementById("DateDebut").value
    //appHelper.ReturnISODate()
  );

  // let repDate = new Date(
  //   document.getElementById("DateReprise").value
  //   //appHelper.ReturnISODate()
  // );


  // let endDate = startDate.addDays(
  //   parseInt(document.getElementById("TxtDuree").value)
  // );

  let duree = parseInt(document.getElementById("TxtDuree").value);
  let endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + duree);

  let repDate = new Date(endDate);
  repDate.setDate(endDate.getDate() + 1);

  if (endDate.getDay() === 6) {
    endDate.setDate(repDate.getDate() + 2);
  } else if (endDate.getDay() === 0) {
    endDate.setDate(endDate.getDate() + 1);
  }

  //let repDate = endDate.addDays(1);

  let pickerDict = SPClientPeoplePicker.SPClientPeoplePickerDict.plePickerInterimaireDiv_TopSpan;
  let userKeys = pickerDict.GetAllUserKeys();
  let ref = document.getElementById("TxtRef").value;

  oListItem.set_item("Statut", appHelper.Status.ENATTENTE);
  oListItem.set_item("StatutLibelle", "VALIDATION DU SUPERIEUR HIERARCHIQUE");

  oListItem.set_item("DateDepart", startDate);
  oListItem.set_item("DateRetour", endDate);
  oListItem.set_item("DateReprise", endDate);

  oListItem.set_item("Title", document.getElementById("TxtTypeAbsenceText").value);
  oListItem.set_item("Reference", document.getElementById("TxtRef").value);

  oListItem.set_item("Nature", document.getElementById("TxtTypeAbsenceText").value);

  oListItem.set_item("TypeAbsenceID", document.getElementById("cmbTypeAbsence").value);

  oListItem.set_item("Motif", document.getElementById("TxtMotif").value);

  oListItem.set_item("NombreJours", parseInt(document.getElementById("TxtDuree").value));

  oListItem.set_item("NombreJourAccorde", parseInt(document.getElementById("TxtDuree").value));

  oListItem.set_item("DemandeurEmail", App.CurrentUser.Email);

  oListItem.set_item("Demandeur", SP.FieldUserValue.fromUser(App.CurrentUser.Login));

  //oListItem.set_item("Interimaire", SP.FieldUserValue.fromUser(SPClientPeoplePicker.SPClientPeoplePickerDict.plePickerInterimaireDiv_TopSpan.GetAllUserKeys()));

  oListItem.set_item("ResponsableN1", App.CurrentUser.ManagerPersonne);
  oListItem.set_item("ResponsableN2", App.CurrentUser.ManagerPersonne2);

  oListItem.set_item("ResponsableN1Email", App.CurrentUser.Manager.Email);
  oListItem.set_item("ResponsableN2Email", App.CurrentUser.Manager2.Email);

  if (userKeys.length > 0) {
    oListItem.set_item("Interimaire", SP.FieldUserValue.fromUser(SPClientPeoplePicker.SPClientPeoplePickerDict.plePickerInterimaireDiv_TopSpan.GetAllUserKeys()));
  }

  oListItem.update();
  clientContext.load(oListItem);
  clientContext.executeQueryAsync(function () {

    appHelper.upploadAttachmentFiles("FileDoc", oListItem.get_id(), appHelper.ListName.Gadget, 0, function () {
      const appUrl = '/pages/autorisationAbsence/show.aspx?ID=' + oListItem.get_id();
      let WF = new WFManager(appHelper.AppCode.ABSENCE, appHelper.AppConstante.SiteUrl, appHelper.ListName.Validation, ACTIV_WORKFLOW);
      WF.createWFTask(clientContext, appUrl, appHelper.AppCode.ABSENCE, oListItem.get_id(), App.CurrentUser.Manager, App.CurrentUser.Manager2, ref, function () { })

      if (callBack) {
        callBack(oListItem);
      }

    }, appSpHelper.writeError);
  })
};

appAbsence.ShowDetails = function (demandeid, callBack) {

  let oList = appAbsence.clientContext.get_web().get_lists().getByTitle(appHelper.ListName.Absence);
  let It = oList.getItemById(demandeid);
  appHelper.Log(demandeid);
  appHelper.Log("IN ShowDetails");

  appAbsence.clientContext.load(It);
  appAbsence.clientContext.executeQueryAsync(function () {
    if (It) {

      document.getElementById("DateDebut").value = new Date(It.get_item("DateDepart")).toISOString().split('T')[0];

      document.getElementById("cmbTypeAbsence").value = It.get_item('TypeAbsenceID') != null ? It.get_item('TypeAbsenceID') : '';
      document.getElementById("TxtTypeAbsenceText").value = It.get_item('Title') != null ? It.get_item('Title') : '';
      document.getElementById("TxtDuree").value = It.get_item('NombreJours') != null ? It.get_item('NombreJours') : 0;
      document.getElementById("TxtMotif").value = It.get_item('Motif') != null ? It.get_item('Motif') : '';
      document.getElementById("TxtRef").value = It.get_item('Reference') != null ? It.get_item('Reference') : '';
      document.getElementById("TxtVerif").value = 'Edit';
      document.getElementById("TxtID").value = It.get_item('ID') != null ? It.get_item('ID') : 0;
      appHelper.Log(It.get_item("Interimaire") != null
        ? It.get_item("Interimaire").get_lookupValue()
        : "");
      appSpHelper.SetPeoplePickerField(
        "plePickerInterimaireDiv",
        It.get_item("Interimaire") != null
          ? It.get_item("Interimaire").get_lookupValue()
          : ""
      );

      if (callBack) { callBack(); }

    } else { if (callBack) { callBack(); } }
  }, appSpHelper.writeError);
};

//document.addEventListener("DOMContentLoaded", () => {
//ExecuteOrDelayUntilScriptLoaded(function(){
SP.SOD.executeFunc('sp.js', 'SP.ClientContext', appAbsence.InitializePage);
  //}, "SP.ClientContext");
//});

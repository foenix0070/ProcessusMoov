var appConge = appConge || {};
var clientContext;
appConge.clientContext;

appConge.InitializePage = function () {
  App.LoadFormNote (appHelper.AppCode.CONGE ,'DivNoteFormulaire');
  appConge.clientContext = SP.ClientContext.get_current();
  clientContext = SP.ClientContext.get_current();
  appSpHelper.GetMyProperties(function () {
    appConge.initCmbTypeConge(function () {
      document.getElementById("TxtNom").value = App.CurrentUser.DisplayName;
      document.getElementById("TxtMatricule").value = App.CurrentUser.Matricule;
      document.getElementById("TxtEmail").value = App.CurrentUser.Email;
      //document.getElementById("bSolde").innerText = App.CurrentUser.NombreJoursAcquis;

      setTimeout(function () {
        appSpHelper.InitializePeoplePicker(
          "plePickerInterimaireDiv",
          false,
          "350px"
        );

        appSpHelper.PeoplePickerOnChangeEvent(
          "plePickerInterimaireDiv",
          function (key) {
            appConge.GetInterimData(key);
          }
        );

        appConge.ShowDetails(
          appHelper.GetQueryStringFromAjaxQuery("DID"),
          function () { }
        );
      }, 2000);
    });
  });

  appConge.GetInterimData = function (login) {
    appSpHelper.GetEmploye(appHelper.ListName.Employe, login, function (it) {
      document.getElementById("TxtIntName").value =
        it.get_item("EmpPrenom") + " " + it.get_item("EmpNom");
      document.getElementById("TxtIntMatricule").value =
        it.get_item("EmpMatricule");
      document.getElementById("TxtIntEmail").value = it.get_item("EmpMail");
    });
  };

  const BtnSave = document.querySelector("#BtnSave");
  const TxtIntName = document.querySelector("#TxtIntName");
  const CmbType = document.getElementById("cmbTypeConge");

  CmbType.addEventListener("change", function () { });

  TxtIntName.addEventListener("click", function () {
    // document.querySelector("#TxtIntName").value = 'Consultant INOVA';
  });

  BtnSave.addEventListener("click", function () {
    let nature = document.getElementById("cmbTypeConge").value;
    let duree = document.getElementById("TxtNbreJour").value;
    let startdate = document.getElementById("TxtDateDepart").value;
    if (appConge.TestFields()) {
      BtnSave.disabled = true;

      let verif = document.getElementById("TxtVerif").value;
      if (verif == "Edit") {
        let valID = document.getElementById("TxtID").value;
        appHelper.Log(valID);
        appConge.Edit(valID, function (a) {
          //location.reload();
          const appUrl = "/pages/conge/show.aspx?ID=" + a.get_id();
          const url = "/tools" + appUrl;
          appHelper.navigation("DivMainPageContainer", url);
          var closeButton = document.querySelector('[aria-label="Close"]');
          closeButton.click();
        });
      } else {
        appConge.Add(function (a) {
          //location.reload();
          const appUrl = "/pages/conge/show.aspx?ID=" + a.get_id();
          const url = "/tools" + appUrl;
          appHelper.navigation("DivMainPageContainer", url);
          var closeButton = document.querySelector('[aria-label="Close"]');
          closeButton.click();
        });
      }
    }
  });
};

appConge.TestFields = function () {

  let v = true;
  let str = '';

  // Récupérer les valeurs des champs
  var nom = document.getElementById("TxtNom").value;
  var matricule = document.getElementById("TxtMatricule").value;
  var email = document.getElementById("TxtEmail").value;
  var typeConge = document.getElementById("cmbTypeConge").value;
  var nbreJour = document.getElementById("TxtNbreJour").value;
  var dateDepart = document.getElementById("TxtDateDepart").value;

  e = document.getElementById("cmbTypeConge");
  value = e.value;
  text = e.options[e.selectedIndex].getAttribute('data-impact');
  var isImpact = appHelper.parseBool(text);

  var startDate = new Date(document.getElementById("TxtDateDepart").value);

  var todaydate = new Date();

  // Vérifier si les champs obligatoires sont vides
  if (nom === "" || matricule === "" || email === "" || typeConge === "0" || nbreJour === "" || dateDepart === "") {
    str += ("Veuillez remplir tous les champs obligatoires. <br>");
    v = false; // Empêche l'envoi du formulaire
  }

  // Valider le champ "Nombre de Jours" pour être supérieur ou égal à 1
  if (parseInt(nbreJour) < 1) {
    str += ("Le nombre de jours doit être supérieur ou égal à 1. <br>");
    v = false; // Empêche l'envoi du formulaire
  }

  // Verifier si la date est supérieure ou égales à celle d'aujourd'hui
  // if (startDate < todaydate) {
  //   str += ("La date choisit n'est pas valide. <br>");
  //   v = false; // Empêche l'envoi du formulaire
  // }


  if (isImpact) {
    if (parseInt(nbreJour) > App.CurrentUser.NombreJoursAcquis) {
      str += "Votre solde de congé est inférieur à votre demande. <br>";
      v = false; // Empêche l'envoi du formulaire
    }
  }



  let div = document.getElementById('DivErreurMessage');
  div.innerHTML = '';
  if (v == false) {
    str = `<div style="border:2px solid red; background:#ffe6ff;padding:3px;color:#330033;margin:3px;">${str}</div>`;
    div.innerHTML = str;
  }

  return v;
};

appConge.initCmbTypeConge = function (callBack) {
  appConge.ListerMotif(function () {
    let cmb = document.getElementById("cmbTypeConge");
    let txtColor = document.getElementById("TxtTypeCongeColeur");
    let txtText = document.getElementById("TxtTypeCongeText");
    let txtDuree = document.getElementById("TxtNbreJour");

    cmb.addEventListener("change", function () {
      let selectedOption = this.options[this.selectedIndex];
      let color = selectedOption.getAttribute("data-color");
      txtColor.value = color;
      txtText.value = selectedOption.text;
      txtDuree.value = selectedOption.getAttribute("data-duree");
    });

    if (callBack) {
      callBack();
    }
  });
};

appConge.ListerMotif = function (callBack) {
  let oList = clientContext
    .get_web()
    .get_lists()
    .getByTitle(appHelper.ListName.TypeConge);
  let q =
    "<View><Query><Where>" +
    "<Eq><FieldRef Name='active' /><Value Type='Boolean' >1</Value></Eq>" +
    "</Where></Query></View>";
  let camlQuery = new SP.CamlQuery();
  camlQuery.set_viewXml(q);
  let listItemMotif = oList.getItems(camlQuery);
  clientContext.load(listItemMotif);
  clientContext.executeQueryAsync(
    function () {
      var listItemEnumerator = listItemMotif.getEnumerator();
      document.getElementById("cmbTypeConge").innerHTML ="" ;

      while (document.getElementById("cmbTypeConge").options.length > 0) {
        document.getElementById("cmbTypeConge").remove(0);
      }

      let opt = document.createElement("option");
      opt.setAttribute("data-duree", "0");
      opt.setAttribute("data-color", "#000");
      opt.setAttribute("value", "0");
      opt.innerHTML = "Choisir le type de congé";
      document.getElementById("cmbTypeConge").appendChild(opt);

      while (listItemEnumerator.moveNext()) {
        let oListItemTp = listItemEnumerator.get_current();
        let opt = document.createElement("option");
        opt.setAttribute("data-duree", oListItemTp.get_item("Duree"));
        opt.setAttribute("data-color", oListItemTp.get_item("Background"));
        opt.setAttribute("data-impact", oListItemTp.get_item('IsSoldeImpact'));

        opt.setAttribute("value", oListItemTp.get_id());
        opt.innerHTML = oListItemTp.get_item("Title");
        document.getElementById("cmbTypeConge").appendChild(opt);
      }

      if (callBack) {
        callBack();
      }
    },
    function (sender, args) {
      appHelper.Log(
        "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
      );
    }
  );
};

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
          startdate: new Date(
            oListItem.get_item("DateDepart")
          ).toLocaleDateString(),
          nbre: oListItem.get_item("NombreJours"),
          status: oListItem.get_item("StatutLibelle"),
          classe: appHelper.Status.GetClass(oListItem.get_item("Statut")),
        });
      }

      appHelper.renderTemplate("tmpl_table_conge", "DivCongeTableShow", view);

      const linkClick = document.getElementsByClassName("click");
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


  let duree = parseInt(document.getElementById("TxtNbreJour").value);
  let endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + duree);

  let repDate = new Date(endDate);
  repDate.setDate(endDate.getDate() + 1);

  if (repDate.getDay() === 6) {
    repDate.setDate(repDate.getDate() + 2);
  } else if (endDate.getDay() === 0) {
    repDate.setDate(repDate.getDate() + 1);
  }

  let pickerDict =
    SPClientPeoplePicker.SPClientPeoplePickerDict
      .plePickerInterimaireDiv_TopSpan;
  let userKeys = pickerDict.GetAllUserKeys();

  e = document.getElementById("cmbTypeConge");
  value = e.value;
  text = e.options[e.selectedIndex].getAttribute('data-impact');
  let ref = appHelper.getReference("CNG");

  oListItem.set_item("Statut", appHelper.Status.ENATTENTE);
  oListItem.set_item("StatutLibelle", "VALIDATION DU SUPERIEUR HIERARCHIQUE");
  oListItem.set_item("Reference", ref);

  oListItem.set_item("DateDepart", startDate);
  oListItem.set_item("DateRetour", endDate);
  oListItem.set_item("DateReprise", endDate);
  oListItem.set_item("DateRetourPrevisionnelle", repDate);

  oListItem.set_item(
    "Title",
    document.getElementById("TxtTypeCongeText").value
  );
  oListItem.set_item(
    "IsSoldeImpact",
    e.options[e.selectedIndex].getAttribute('data-impact')
  );
  oListItem.set_item(
    "Background",
    e.options[e.selectedIndex].getAttribute("data-color")
  );
  oListItem.set_item(
    "NombreJours",
    parseInt(document.getElementById("TxtNbreJour").value)
  );
  oListItem.set_item(
    "NombreJourAcquis",
    parseInt(document.getElementById("TxtNbreJour").value)
  );
  oListItem.set_item(
    "NombreJourAccorde",
    parseInt(document.getElementById("TxtNbreJour").value)
  );
  oListItem.set_item(
    "DomicileConge",
    document.getElementById("TxtCongeDomicile").value
  );
  oListItem.set_item(
    "CongeTelephone",
    document.getElementById("TxtCongeTelephone").value
  );
  oListItem.set_item(
    "CongeContact",
    document.getElementById("TxtCongeContact").value
  );
  oListItem.set_item(
    "TypeCongeID",
    document.getElementById("cmbTypeConge").value
  );
  oListItem.set_item(
    "TypeCongeLibelle",
    document.getElementById("TxtTypeCongeText").value
  );
  oListItem.set_item("DemandeurEmail", App.CurrentUser.Email);
  // oListItem.set_item(
  //   "Couleur",
  //   document.getElementById("TxtTypeCongeColeur").value
  // );
  oListItem.set_item("Historique", "#");

  oListItem.set_item(
    "Demandeur",
    SP.FieldUserValue.fromUser(App.CurrentUser.Login)
  );
  //oListItem.set_item("Interimaire", SP.FieldUserValue.fromUser(SPClientPeoplePicker.SPClientPeoplePickerDict.plePickerInterimaireDiv_TopSpan.GetAllUserKeys()));

  oListItem.set_item("ResponsableN1", App.CurrentUser.ManagerPersonne);
  oListItem.set_item("ResponsableN2", App.CurrentUser.ManagerPersonne2);

  oListItem.set_item("ResponsableN1Email", App.CurrentUser.Manager.Email);
  oListItem.set_item("ResponsableN2Email", App.CurrentUser.Manager2.Email);

  if (userKeys.length > 0) {
    oListItem.set_item(
      "Interimaire",
      SP.FieldUserValue.fromUser(
        SPClientPeoplePicker.SPClientPeoplePickerDict.plePickerInterimaireDiv_TopSpan.GetAllUserKeys()
      )
    );
    appHelper.Log("ok interimaire");
  }

  oListItem.update();
  clientContext.load(oListItem);
  clientContext.executeQueryAsync(function () {
    const appUrl = "/pages/conge/show.aspx?ID=" + oListItem.get_id();
    let WF = new WFManager(
      appHelper.AppCode.CONGE,
      appHelper.AppConstante.SiteUrl,
      appHelper.ListName.Validation,
      ACTIV_WORKFLOW
    );
    WF.createWFTask(clientContext, appUrl, appHelper.AppCode.CONGE, oListItem.get_id(), App.CurrentUser.Manager, App.CurrentUser.Manager2, ref, function () { })
    if (callBack) {
      callBack(oListItem);
    }
  }, appSpHelper.writeError);

};

appConge.Edit = function (demandeid, callBack) {
  let oList = clientContext
    .get_web()
    .get_lists()
    .getByTitle(appHelper.ListName.Conge);
  let oListItem = oList.getItemById(demandeid);

  let startDate = new Date(
    document.getElementById("TxtDateDepart").value
    //appHelper.ReturnISODate()
  );
  let endDate = startDate.addDays(
    parseInt(document.getElementById("TxtNbreJour").value)
  );

  let ref = document.getElementById("TxtRef").value;

  let pickerDict =
    SPClientPeoplePicker.SPClientPeoplePickerDict
      .plePickerInterimaireDiv_TopSpan;
  let userKeys = pickerDict.GetAllUserKeys();

  oListItem.set_item("Statut", appHelper.Status.ENATTENTE);
  oListItem.set_item("StatutLibelle", "VALIDATION DU SUPERIEUR HIERARCHIQUE");

  oListItem.set_item("DateDepart", startDate);
  oListItem.set_item("DateRetour", endDate);
  oListItem.set_item("DateReprise", endDate);
  oListItem.set_item("DateRetourPrevisionnelle", endDate);

  oListItem.set_item(
    "Title",
    document.getElementById("TxtTypeCongeText").value
  );

  // oListItem.set_item("Reference", document.getElementById("TxtRef").value);

  oListItem.set_item(
    "NombreJours",
    parseInt(document.getElementById("TxtNbreJour").value)
  );
  oListItem.set_item(
    "NombreJourAcquis",
    parseInt(document.getElementById("TxtNbreJour").value)
  );
  oListItem.set_item(
    "NombreJourAccorde",
    parseInt(document.getElementById("TxtNbreJour").value)
  );
  oListItem.set_item(
    "DomicileConge",
    document.getElementById("TxtCongeDomicile").value
  );
  oListItem.set_item(
    "CongeTelephone",
    document.getElementById("TxtCongeTelephone").value
  );
  oListItem.set_item(
    "CongeContact",
    document.getElementById("TxtCongeContact").value
  );
  oListItem.set_item(
    "TypeCongeID",
    document.getElementById("cmbTypeConge").value
  );
  oListItem.set_item(
    "TypeCongeLibelle",
    document.getElementById("TxtTypeCongeText").value
  );
  oListItem.set_item("DemandeurEmail", App.CurrentUser.Email);
  oListItem.set_item(
    "Couleur",
    document.getElementById("TxtTypeCongeColeur").value
  );
  oListItem.set_item("Historique", "#");

  oListItem.set_item(
    "Demandeur",
    SP.FieldUserValue.fromUser(App.CurrentUser.Login)
  );
  //oListItem.set_item("Interimaire", SP.FieldUserValue.fromUser(SPClientPeoplePicker.SPClientPeoplePickerDict.plePickerInterimaireDiv_TopSpan.GetAllUserKeys()));

  oListItem.set_item("ResponsableN1", App.CurrentUser.ManagerPersonne);
  oListItem.set_item("ResponsableN2", App.CurrentUser.ManagerPersonne2);

  oListItem.set_item("ResponsableN1Email", App.CurrentUser.Manager.Email);
  oListItem.set_item("ResponsableN2Email", App.CurrentUser.Manager2.Email);

  if (userKeys.length > 0) {
    oListItem.set_item(
      "Interimaire",
      SP.FieldUserValue.fromUser(
        SPClientPeoplePicker.SPClientPeoplePickerDict.plePickerInterimaireDiv_TopSpan.GetAllUserKeys()
      )
    );
  }

  oListItem.update();
  clientContext.load(oListItem);
  clientContext.executeQueryAsync(function () {
    const appUrl = "/pages/conge/show.aspx?ID=" + oListItem.get_id();
    let WF = new WFManager(
      appHelper.AppCode.CONGE,
      appHelper.AppConstante.SiteUrl,
      appHelper.ListName.Validation,
      ACTIV_WORKFLOW
    );
    WF.createWFTask(
      clientContext,
      appUrl,
      appHelper.AppCode.CONGE,
      oListItem.get_id(),
      App.CurrentUser.Manager,
      App.CurrentUser.Manager2,
      ref,
      function () { })
    if (callBack) {
      callBack(oListItem);
    }


  }, appSpHelper.writeError);
};

appConge.ShowDetails = function (demandeid, callBack) {
  let oList = appConge.clientContext
    .get_web()
    .get_lists()
    .getByTitle(appHelper.ListName.Conge);
  let It = oList.getItemById(demandeid);
  appHelper.Log("IN ShowDetails");

  appConge.clientContext.load(It);
  appConge.clientContext.executeQueryAsync(function () {
    if (It) {

      document.getElementById("TxtDateDepart").value = new Date(
        It.get_item("DateDepart")
      ).toISOString().split('T')[0];

      document.getElementById("TxtTypeCongeText").value =
        It.get_item("TypeCongeLibelle") != null
          ? It.get_item("TypeCongeLibelle")
          : "";
      document.getElementById("TxtNbreJour").value =
        It.get_item("NombreJours") != null ? It.get_item("NombreJours") : "";
      document.getElementById("TxtCongeDomicile").value =
        It.get_item("DomicileConge") != null
          ? It.get_item("DomicileConge")
          : "";
      document.getElementById("TxtCongeTelephone").value =
        It.get_item("CongeTelephone") != null
          ? It.get_item("CongeTelephone")
          : "";
      document.getElementById("TxtCongeContact").value =
        It.get_item("CongeContact") != null ? It.get_item("CongeContact") : "";

      document.getElementById("cmbTypeConge").value =
        It.get_item("TypeCongeID") != null ? It.get_item("TypeCongeID") : "";
      document.getElementById("TxtTypeCongeText").value =
        It.get_item("TypeCongeLibelle") != null
          ? It.get_item("TypeCongeLibelle")
          : "";
      document.getElementById("TxtTypeCongeColeur").value =
        It.get_item("Couleur") != null ? It.get_item("Couleur") : "";

      document.getElementById("TxtRef").value = It.get_item('Reference') != null ? It.get_item('Reference') : '';

      document.getElementById("TxtVerif").value = "Edit";
      document.getElementById("TxtID").value =
        It.get_item("ID") != null ? It.get_item("ID") : 0;

      appSpHelper.SetPeoplePickerField(
        "plePickerInterimaireDiv",
        It.get_item("Interimaire") != null
          ? It.get_item("Interimaire").get_lookupValue()
          : ""
      );


      if (callBack) {
        callBack();
      }
    } else {
      if (callBack) {
        callBack();
      }
    }
  }, appSpHelper.writeError);
};

// document.addEventListener("DOMContentLoaded", () => {
//   ExecuteOrDelayUntilScriptLoaded(function(){
SP.SOD.executeFunc("sp.js", "SP.ClientContext", appConge.InitializePage);
//   }, "SP.ClientContext");
// });

var appRegularisationSortieCaisse = appRegularisationSortieCaisse || {};
var clientContext;
appRegularisationSortieCaisse.clientContext;


appRegularisationSortieCaisse.InitializePage = function () {
  App.LoadFormNote (appHelper.AppCode.REGULARISATIONSORTIECAISSE ,'DivNoteFormulaire');
  appRegularisationSortieCaisse.clientContext = SP.ClientContext.get_current();
  clientContext = SP.ClientContext.get_current();
  appSpHelper.GetMyProperties(function () {

    document.getElementById("TxtNom").value = App.CurrentUser.DisplayName;
    document.getElementById("TxtMatricule").value = App.CurrentUser.Matricule;
    document.getElementById("TxtEmail").value = App.CurrentUser.Email;

    var elementsWithDataInfo = document.querySelectorAll('[data-info]');

    // Loop through the selected elements
    elementsWithDataInfo.forEach(function (element) {
      var info = element.getAttribute('data-info');


      if (info != "sortieCaisse") {
        // document.getElementById("cmbSortie").disabled=true;
        document.getElementById("cmbSortie").style.display = "none";
        document.getElementById("TxtSortie").style.display = "block";
        appRegularisationSortieCaisse.ShowSortie(appHelper.GetQueryStringFromAjaxQuery('DID'), info, function () { });
      }
      else {
        appRegularisationSortieCaisse.initCmbSortie(function () { });
        appRegularisationSortieCaisse.ShowDetails(appHelper.GetQueryStringFromAjaxQuery('DID'), function () { });
      }
    });

  });

  var monInput = document.getElementById("TxtMontant");
  var monInputsolde = document.getElementById("TxtSolde");
  var montChamp = document.getElementById("TxtMont");

  var monttotal = new AutoNumeric(montChamp, {
    digitGroupSeparator: " ",
    decimalPlaces: 0,
    unformatOnSubmit: true,
  });

  var autoNumeric = new AutoNumeric(monInput, {
    digitGroupSeparator: " ",
    decimalPlaces: 0,
    unformatOnSubmit: true,
  });

  var autoNumeric1 = new AutoNumeric(monInputsolde, {
    digitGroupSeparator: " ",
    decimalPlaces: 0,
    unformatOnSubmit: true,
  });

  const BtnSave = document.querySelector("#BtnSave");

  const mont = document.querySelector("#TxtMontant");
  mont.addEventListener("input", function () { appRegularisationSortieCaisse.calculerSolde() });

  // const cmbsortie = document.querySelector("#cmbSortie");
  // cmbsortie.addEventListener("change", function(){appRegularisationSortieCaisse.AfficherMontant()});

  BtnSave.addEventListener("click", function () {
    if (appRegularisationSortieCaisse.TestFields()) {
      let verif = document.getElementById("TxtVerif").value;
      if (verif == "Edit") {
        let valID = document.getElementById("TxtID").value;

        appRegularisationSortieCaisse.Edit(valID, function (a) {
          // location.reload();
          const appUrl = '/pages/regularisationSortieCaisse/show.aspx?ID=' + a.get_id();
          const url = "/tools" + appUrl;
          appHelper.navigation("DivMainPageContainer", url);
          var closeButton = document.querySelector('[aria-label="Close"]');
          closeButton.click();
        });
      }
      else {
        appRegularisationSortieCaisse.Add(function (a) {
          //location.reload();
          const appUrl = '/pages/regularisationSortieCaisse/show.aspx?ID=' + a.get_id();
          const url = "/tools" + appUrl;
          appHelper.navigation("DivMainPageContainer", url);
          var closeButton = document.querySelector('[aria-label="Close"]');
          closeButton.click();
        });
      }
    }
  });
};


appRegularisationSortieCaisse.TestFields = function () {

  let v = true;
  let str = '';

  // Récupérer les valeurs des champs
  var nom = document.getElementById("TxtNom").value;
  var matricule = document.getElementById("TxtMatricule").value;
  var email = document.getElementById("TxtEmail").value;
  let solde = document.getElementById("TxtSolde").value;
  let montant = document.getElementById("TxtMontant").value;
  let mont = document.getElementById("TxtMont").value;
  let titre = document.getElementById("TxtTitle").value;
  let objet = document.getElementById("TxtObservation").value;

  var Input = document.getElementById("TxtMontant");
  var InputMont = document.getElementById("TxtMont");
  var Inputsolde = document.getElementById("TxtSolde");

  var autoNumericObject = AutoNumeric.getAutoNumericElement(Input);
  var autoNumericObjectMont = AutoNumeric.getAutoNumericElement(InputMont);
  var autoNumericObjectsolde = AutoNumeric.getAutoNumericElement(Inputsolde);

  var montantN = autoNumericObject.getNumber();
  var montantSortie = autoNumericObjectMont.getNumber();
  var Solde = autoNumericObjectsolde.getNumber();

  // Vérifier si les champs obligatoires sont vides
  if (nom === "" || matricule === "" || email === "" || montant === "0" || mont === "0" || solde === "" || titre === "" || objet === "") {
    str += ("Veuillez remplir tous les champs obligatoires. <br>");
    v = false; // Empêche l'envoi du formulaire
  }

  // Valider le champ "Nombre de Jours" pour être supérieur ou égal à 1
  if (montantN < 1) {
    str += ("Le montant doit être supérieur ou égal à 1. <br>");
    v = false; // Empêche l'envoi du formulaire
  }

  if (solde == 0) {

    str += ("Le montant utilisé n'est pas correct. <br>");
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

appRegularisationSortieCaisse.calculerSolde = function () {

  var soldeChamp = document.getElementById("TxtSolde");

  var InputMontant = document.getElementById("TxtMontant");
  var InputMont = document.getElementById("TxtMont");

  var autoNumericObject = AutoNumeric.getAutoNumericElement(InputMontant);
  var autoNumericObjectMont = AutoNumeric.getAutoNumericElement(InputMont);

  var montant = autoNumericObject.getNumber();
  var mont = autoNumericObjectMont.getNumber();

  if (montant < mont) {
    var solde = mont - montant;
  }
  else {
    var solde = 0;
  }


  var formatterSolde = new AutoNumeric(soldeChamp, {
    digitGroupSeparator: " ",
    decimalPlaces: 0,
    unformatOnSubmit: true,
  });

  formatterSolde.set(solde);

}

appRegularisationSortieCaisse.initCmbSortie = function (callBack) {
  ListerSortie(function () {
    let cmb = document.getElementById("cmbSortie");
    let txtMontant = document.getElementById("TxtMont");
    var mont = new AutoNumeric(txtMontant, {
      digitGroupSeparator: " ",
      decimalPlaces: 0,
      unformatOnSubmit: true,
    });
    let txtText = document.getElementById("TxtSortieText");
    cmb.addEventListener("change", function () {
      let selectedOption = this.options[this.selectedIndex];
      let montant = selectedOption.getAttribute("data-target");
      mont.set(montant);
      //txtMontant.value = montant;
      txtText.value = selectedOption.text;
    });

    if (callBack) {
      callBack();
    }
  });

};


function ListerSortie(callBack) {
  let oList = clientContext.get_web().get_lists().getByTitle(appHelper.ListName.SortieCaisse);
  let q = `<View><Query><Where><And>
              <Eq><FieldRef ID="Demandeur"/><Value Type="Integer"><UserID/></Value></Eq>
              <Eq><FieldRef ID="Statut"/><Value Type="Text">VALIDEE</Value></Eq>
          </And></Where></Query></View>`;

  let camlQuery = new SP.CamlQuery();
  camlQuery.set_viewXml(q);
  let listItemSortie = oList.getItems(camlQuery);
  clientContext.load(listItemSortie);
  clientContext.executeQueryAsync(
    function () {
      var listItemEnumerator = listItemSortie.getEnumerator();
      document.getElementById('cmbSortie').innerHTML = "";

      while (listItemEnumerator.moveNext()) {

        let oListItemTp = listItemEnumerator.get_current();
        let opt = document.createElement("option");
        opt.setAttribute("value", oListItemTp.get_id());
        opt.setAttribute("data-target", oListItemTp.get_item('Montant'));
        opt.innerHTML = oListItemTp.get_item('Title');
        document.getElementById('cmbSortie').appendChild(opt);
        //document.getElementById('TxtMontantSortie').value = ;
      }


      if (callBack) {
        callBack();
      }
    },
    function (sender, args) { console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace()); });
}

appRegularisationSortieCaisse.Add = function (callBack) {
  let oList = appRegularisationSortieCaisse.clientContext
    .get_web()
    .get_lists()
    .getByTitle(appHelper.ListName.RegularisationSortieCaisse);
  let itemCreateInfo = new window.SP.ListItemCreationInformation();
  let oListItem = oList.addItem(itemCreateInfo);

  var Input = document.getElementById("TxtMontant");
  var InputMont = document.getElementById("TxtMont");
  var Inputsolde = document.getElementById("TxtSolde");

  var autoNumericObject = AutoNumeric.getAutoNumericElement(Input);
  var autoNumericObjectMont = AutoNumeric.getAutoNumericElement(InputMont);
  var autoNumericObjectsolde = AutoNumeric.getAutoNumericElement(Inputsolde);

  var montant = autoNumericObject.getNumber();
  var montantSortie = autoNumericObjectMont.getNumber();
  var Solde = autoNumericObjectsolde.getNumber();
  console.log(montant, Solde, montantSortie);

  let verifid = document.getElementById("TxtSortieID").value;
  let ref = appHelper.getReference("RSDC");

  if (verifid) {

    oListItem.set_item("SortieID", document.getElementById("TxtSortieID").value);
    oListItem.set_item("Sortie", document.getElementById("TxtSortie").value);
    oListItem.set_item("Statut", appHelper.Status.ENATTENTE);
    oListItem.set_item("StatutLibelle", "VALIDATION DU SUPERIEUR HIERARCHIQUE");
    oListItem.set_item("Montant", montant);
    oListItem.set_item("MontantSortie", montantSortie);
    oListItem.set_item("Solde", Solde);
    oListItem.set_item("Reference", ref);

    oListItem.set_item("Observation", document.getElementById("TxtObservation").value);
    oListItem.set_item("Title", document.getElementById("TxtTitle").value);

    oListItem.set_item("Demandeur", SP.FieldUserValue.fromUser(App.CurrentUser.Login));
    oListItem.set_item("DemandeurEmail", App.CurrentUser.Email);

    oListItem.set_item("ResponsableN1", App.CurrentUser.ManagerPersonne);
    oListItem.set_item("ResponsableN2", App.CurrentUser.ManagerPersonne2);

    oListItem.set_item("ResponsableN1Email", App.CurrentUser.Manager.Email);
    oListItem.set_item("ResponsableN2Email", App.CurrentUser.Manager2.Email);

    oListItem.update();
    clientContext.load(oListItem);
    clientContext.executeQueryAsync(function () {
      let FpUploadAttachement = document.getElementById('FileDoc');
      files = FpUploadAttachement.files;
      console.log(FpUploadAttachement);
      console.log(files);
      for (const file of files) {
        let reader = new FileReader();
        reader.onload = function (e) {
          console.log(file.name);
          console.log(e.target.result);
          appHelper.AttachFile(clientContext, oListItem.get_id(), e.target.result, file.name, appHelper.ListName.RegularisationSortieCaisse, function () {
            const appUrl = '/pages/regularisationSortieCaisse/show.aspx?ID=' + oListItem.get_id();
            let WF = new WFManager(appHelper.AppCode.REGULARISATIONSORTIECAISSE, appHelper.AppConstante.SiteUrl, appHelper.ListName.Validation, ACTIV_WORKFLOW);
            WF.createWFTask(clientContext, appUrl, appHelper.AppCode.REGULARISATIONSORTIECAISSE, oListItem.get_id(), App.CurrentUser.Manager, App.CurrentUser.Manager2, ref, function () { })

            appRegularisationSortieCaisse.UpDateStatusSortieCaisse(verifid, function () { });

            if (callBack) {
              callBack(oListItem);
            }
          })
        }
        reader.onerror = function (e) {
          console.log(e.target.error);
        }
        reader.readAsArrayBuffer(file);
      };

    }, appSpHelper.writeError);
  }
  else {
    oListItem.set_item("SortieID", parseInt(document.getElementById("cmbSortie").value));
    oListItem.set_item("Sortie", document.getElementById("TxtSortieText").value);
    oListItem.set_item("Statut", appHelper.Status.ENATTENTE);
    oListItem.set_item("StatutLibelle", "VALIDATION DU SUPERIEUR HIERARCHIQUE");
    oListItem.set_item("Montant", montant);
    oListItem.set_item("Solde", Solde);
    oListItem.set_item("Reference", ref);


    oListItem.set_item("Observation", document.getElementById("TxtObservation").value);
    oListItem.set_item("Title", document.getElementById("TxtTitle").value);

    oListItem.set_item("Demandeur", SP.FieldUserValue.fromUser(App.CurrentUser.Login));
    oListItem.set_item("DemandeurEmail", App.CurrentUser.Email);

    oListItem.set_item("ResponsableN1", App.CurrentUser.ManagerPersonne);
    oListItem.set_item("ResponsableN2", App.CurrentUser.ManagerPersonne2);

    oListItem.set_item("ResponsableN1Email", App.CurrentUser.Manager.Email);
    oListItem.set_item("ResponsableN2Email", App.CurrentUser.Manager2.Email);

    oListItem.update();
    clientContext.load(oListItem);
    clientContext.executeQueryAsync(function () {
      appHelper.upploadAttachmentFiles("FileDoc", oListItem.get_id(), appHelper.ListName.RegularisationSortieCaisse, 0, function () {
        const appUrl = '/pages/regularisationSortieCaisse/show.aspx?ID=' + oListItem.get_id();
        let WF = new WFManager(appHelper.AppCode.REGULARISATIONSORTIECAISSE, appHelper.AppConstante.SiteUrl, appHelper.ListName.Validation, ACTIV_WORKFLOW);
        WF.createWFTask(clientContext, appUrl, appHelper.AppCode.REGULARISATIONSORTIECAISSE, oListItem.get_id(), App.CurrentUser.Manager, App.CurrentUser.Manager2, function () { })

        let idcmb = document.getElementById("cmbSortie").value;
        console.log(idcmb);

        appRegularisationSortieCaisse.UpDateStatusSortieCaisse(idcmb, function () { });

        if (callBack) {
          callBack(oListItem);
        }


      }, appSpHelper.writeError);
    })
  }

};


appRegularisationSortieCaisse.Edit = function (demandeid, callBack) {

  let oList = clientContext.get_web().get_lists().getByTitle(appHelper.ListName.RegularisationSortieCaisse);
  let oListItem = oList.getItemById(demandeid);

  var Input = document.getElementById("TxtMontant");
  var Inputsolde = document.getElementById("TxtTxtSolde");

  var autoNumericObject = AutoNumeric.getAutoNumericElement(Input);
  var autoNumericObjectsolde = AutoNumeric.getAutoNumericElement(Inputsolde);

  var montant = autoNumericObject.getNumber();
  var Solde = autoNumericObjectsolde.getNumber();
  let ref = document.getElementById("TxtRef").value;
  console.log(montant, Solde);

  oListItem.set_item("Statut", appHelper.Status.ENATTENTE);
  oListItem.set_item("StatutLibelle", "VALIDATION DU SUPERIEUR HIERARCHIQUE");
  oListItem.set_item("Montant", montant);
  oListItem.set_item("Solde", Solde);

  oListItem.set_item("Observation", document.getElementById("TxtObservation").value);
  oListItem.set_item("Title", document.getElementById("TxtTitle").value);
  oListItem.set_item("Reference", document.getElementById("TxtRef").value);

  oListItem.set_item("Demandeur", SP.FieldUserValue.fromUser(App.CurrentUser.Login));
  oListItem.set_item("DemandeurEmail", App.CurrentUser.Email);


  oListItem.set_item("ResponsableN1", App.CurrentUser.ManagerPersonne);
  oListItem.set_item("ResponsableN2", App.CurrentUser.ManagerPersonne2);

  oListItem.set_item("ResponsableN1Email", App.CurrentUser.Manager.Email);
  oListItem.set_item("ResponsableN2Email", App.CurrentUser.Manager2.Email);


  oListItem.update();
  clientContext.load(oListItem);
  clientContext.executeQueryAsync(function () {

    const appUrl = '/pages/regularisationSortieCaisse/show.aspx?ID=' + oListItem.get_id();
    let WF = new WFManager(appHelper.AppCode.REGULARISATIONSORTIECAISSE, appHelper.AppConstante.SiteUrl, appHelper.ListName.Validation, ACTIV_WORKFLOW);
    WF.createWFTask(clientContext, appUrl, appHelper.AppCode.REGULARISATIONSORTIECAISSE, oListItem.get_id(), App.CurrentUser.Manager, App.CurrentUser.Manager2, ref, function () { })
    if (callBack) {
      callBack(oListItem);
    }
  }, appSpHelper.writeError);
};


appRegularisationSortieCaisse.ShowDetails = function (demandeid, callBack) {

  let oList = appRegularisationSortieCaisse.clientContext.get_web().get_lists().getByTitle(appHelper.ListName.RegularisationSortieCaisse);
  let It = oList.getItemById(demandeid);
  console.log(demandeid);
  console.log("IN ShowDetails");

  appRegularisationSortieCaisse.clientContext.load(It);
  appRegularisationSortieCaisse.clientContext.executeQueryAsync(function () {
    if (It) {

      document.getElementById("TxtTitle").value = It.get_item('Title') != null ? It.get_item('Title') : '';
      document.getElementById("TxtMontant").value = It.get_item('Montant') != null ? It.get_item('Montant') : 0;
      document.getElementById("TxtObservation").value = It.get_item('Observation') != null ? It.get_item('Observation') : '';
      document.getElementById("TxtSolde").value = It.get_item('Solde') != null ? It.get_item('Solde') : '';
      document.getElementById("TxtVerif").value = 'Edit';
      document.getElementById("TxtID").value = It.get_item('ID') != null ? It.get_item('ID') : 0;
      document.getElementById("TxtRef").value = It.get_item('Reference') != null ? It.get_item('Reference') : '';

      if (callBack) { callBack(); }

    } else { if (callBack) { callBack(); } }
  }, appSpHelper.writeError);
}

appRegularisationSortieCaisse.ShowSortie = function (demandeid, info, callBack) {

  let oList = appRegularisationSortieCaisse.clientContext.get_web().get_lists().getByTitle(appHelper.ListName.SortieCaisse);
  let It = oList.getItemById(demandeid);
  console.log(demandeid);
  console.log(info);
  console.log("IN ShowSortie");

  appRegularisationSortieCaisse.clientContext.load(It);
  appRegularisationSortieCaisse.clientContext.executeQueryAsync(function () {
    if (It) {

      var montChamp = document.getElementById("TxtMont");

      var mont = new AutoNumeric(montChamp, {
        digitGroupSeparator: " ",
        decimalPlaces: 0,
        unformatOnSubmit: true,
      });

      // Mettre à jour le champ Solde à reverser avec le résultat formaté
      mont.set(info);

      //document.getElementById("TxtMont").value = info;
      document.getElementById("TxtSortieID").value = demandeid;
      document.getElementById("TxtSortie").value = It.get_item('Title') != null ? It.get_item('Title') : '';

      if (callBack) { callBack(); }

    } else { if (callBack) { callBack(); } }
  }, appSpHelper.writeError);
}

appRegularisationSortieCaisse.UpDateStatusSortieCaisse = function (demandeid, callBack) {
  let oList1 = clientContext.get_web().get_lists().getByTitle(appHelper.ListName.SortieCaisse);
  let It1 = oList1.getItemById(demandeid);

  console.log("ID UPDATE : " + demandeid);

  if (It1) {
    console.log("test");
    It1.set_item("Statut", "ENATTENTEREGULARISATION");
    It1.set_item("StatutLibelle", "En attente de régularisation ");
  }
  It1.update();
  clientContext.load(It1);
  clientContext.executeQueryAsync(function () {
    if (callBack) {
      callBack();
    }
  }, appSpHelper.writeError);
}

// document.addEventListener("DOMContentLoaded", () => {
//   ExecuteOrDelayUntilScriptLoaded(function(){
SP.SOD.executeFunc('sp.js', 'SP.ClientContext', appRegularisationSortieCaisse.InitializePage);
//   }, "SP.ClientContext");
// });

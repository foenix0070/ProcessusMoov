var appAbsence = appAbsence || {};
var clientContext;
appAbsence.clientContext;

appAbsence.InitializePage = function () {
  appAbsence.clientContext = SP.ClientContext.get_current();
  clientContext =  SP.ClientContext.get_current();

  
  appSpHelper.GetMyProperties(function () {
    /*
    appSpHelper.LoadUserCongeParam(
      appHelper.ListName.Employe, "ETISALAT-AFRICA\pouattara", App.CurrentUser.Login, CurrentUser.Matricule, CurrentUser.Email, CurrentUser.Nom,
      function () {
        appSpHelper.GetEmploye(
          appHelper.ListName.Employe,
          document.getElementById("TxtSpManagerN1Login").value,
          function (item) {
            console.log(item);
            appSpHelper.GetEmployeeManagerLogin(
              "N2",
              item.get_item("EmpManager"),
              function () {

              // span= document.getElementById('spanSolde');
              // span.innerHTML =document.getElementById('TxtSpUserNbreJrsAcquis').value;






              //  appAbsence.initCmbTypeConge(function(){
                  appAbsence.List();
              //  });
              }
            );
          }
        );
      }
    );
    */
    
    appConge.initCmbTypeAbsence(function () {

      document.getElementById("TxtNom").value = App.CurrentUser.DisplayName;
      document.getElementById("TxtMatricule").value = App.CurrentUser.Matricule;
      document.getElementById("TxtEmail").value = App.CurrentUser.Email;

      setTimeout(function () {
        appSpHelper.InitializePeoplePicker("plePickerInterimaireDiv", false, "350px");

        appSpHelper.PeoplePickerOnChangeEvent("plePickerInterimaireDiv", function (key) {
          appConge.GetInterimData(key);
        });

      }, 2000);

    });
    
    /*
    document.getElementById("TxtNom").value = App.CurrentUser.DisplayName;
    document.getElementById("TxtMatricule").value = App.CurrentUser.Matricule;
    document.getElementById("TxtEmail").value = App.CurrentUser.Email;

    setTimeout(function () {
      appSpHelper.InitializePeoplePicker("plePickerInterimaireDiv", false, "350px");

      appSpHelper.PeoplePickerOnChangeEvent("plePickerInterimaireDiv", function (key) {
        // appConge.interimaire = key.toString().split('\\')[1];
        appConge.GetInterimData(key);
      });

    }, 2000);

    appConge.GetInterimData = function (login) {
      appSpHelper.GetEmploye(appHelper.ListName.Employe, login, function (it) {
        document.getElementById("TxtIntName").value = it.get_item('EmpPrenom') + ' ' + it.get_item('EmpNom');
        document.getElementById("TxtIntMatricule").value = it.get_item('EmpMatricule');
        document.getElementById("TxtIntEmail").value = it.get_item('EmpMail');
      });
    } 
    */ 

  });
  

  const BtnAdd = document.querySelector("#demande");
  const BtnSave = document.querySelector("#BtnSave");



  BtnAdd.addEventListener("click", function () {
    setTimeout(function () {
      appSpHelper.InitializePeoplePicker(
        "plePickerInterimaireDiv",
        false,
        "350px"
      );
    }, 2000);
  });

  BtnSave.addEventListener("click", function () {
    appAbsence.Add (function(){
      location.reload();
    });
  });

};

function getRating (str){
  document.getElementById('TxtNature').value = str;
}

appAbsence.initCmbTypeAbsence = function (callBack) {
  ListerMotif(function(){
    let cmb = document.getElementById("cmbTypeAbsence");
    let txtColor = document.getElementById("TxtTypeAbsenceColeur");
    let txtText = document.getElementById("TxtTypeAbsenceText");
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

          while (listItemEnumerator.moveNext()) {
              let oListItemTp = listItemEnumerator.get_current();
              let opt = document.createElement("option");
              opt.setAttribute("data-duree", oListItemTp.get_item('Duree'));
              opt.setAttribute("data-color", oListItemTp.get_item('Background'));
              opt.setAttribute("value", oListItemTp.get_id());
              opt.innerHTML = oListItemTp.get_item('Title');
              document.getElementById('cmbTypeAbsence').appendChild(opt);
          }


          if(callBack){
            callBack();
          }
      },
      function (sender, args) { console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace()); });
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
          startdate: new Date( oListItem.get_item("DateDepart")).toLocaleDateString(),
          reprise: new Date( oListItem.get_item("DateReprise")).toLocaleDateString(),
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

appAbsence.Add = function ( callBack) {
  let oList = appAbsence.clientContext
    .get_web()
    .get_lists()
    .getByTitle(appHelper.ListName.Absence);
  let itemCreateInfo = new window.SP.ListItemCreationInformation();
  let oListItem = oList.addItem(itemCreateInfo);

  let startDate = new Date(
    document.getElementById("TxtDateDepart").value
    //appHelper.ReturnISODate()
  );

  let repDate = new Date(
    document.getElementById("TxtDateReprise").value
    //appHelper.ReturnISODate()
  );


  let endDate = startDate.addDays(
    parseInt(document.getElementById("TxtNbreJour").value)
  );

  oListItem.set_item("Statut", appHelper.Status.ENATTENTE);
  oListItem.set_item("StatutLibelle", "Validation du supérieur hiérarchique");

  oListItem.set_item("DateDepart", startDate);
  oListItem.set_item("DateRetour", endDate);
  oListItem.set_item("DateReprise", repDate);

  oListItem.set_item("Title",document.getElementById("TxtTypeAbsenceText").value);

  oListItem.set_item("Nature",document.getElementById("TxtNature").value);

  oListItem.set_item("TypeAbsenceID", document.getElementById("cmbTypeAbsence").value);

  oListItem.set_item("Motif",document.getElementById("TxtMotif").value);

  oListItem.set_item("NombreJours",parseInt(document.getElementById("TxtNbreJour").value));

  oListItem.set_item("NombreJourAccorde",parseInt(document.getElementById("TxtNbreJour").value));

  oListItem.set_item("DemandeurEmail", App.CurrentUser.Email);

  oListItem.set_item("Demandeur",SP.FieldUserValue.fromUser(App.CurrentUser.Login));

  oListItem.set_item("Interimaire",SP.FieldUserValue.fromUser(SPClientPeoplePicker.SPClientPeoplePickerDict.plePickerInterimaireDiv_TopSpan.GetAllUserKeys()));

  oListItem.set_item("ResponsableN1", App.CurrentUser.ManagerPersonne);
  oListItem.set_item("ResponsableN2", App.CurrentUser.ManagerPersonne2);

  oListItem.set_item("ResponsableN1Email", App.CurrentUser.Manager.Email);
  oListItem.set_item("ResponsableN2Email", App.CurrentUser.Manager2.Email);

  oListItem.update();
  clientContext.load(oListItem);
  clientContext.executeQueryAsync(function () {

const appUrl = '/pages/absence/show.aspx?ID=' + oListItem.get_id();
      let WF = new WFManager(appHelper.AppCode.ABSENCE,  appHelper.AppConstante.SiteUrl, appHelper.ListName.Validation,  ACTIV_WORKFLOW  );
      WF.createWFTask(clientContext,appUrl, appHelper.AppCode.ABSENCE, oListItem.get_id(), App.CurrentUser.Manager.Login, App.CurrentUser.Manager2.Login, function(){}   )
      if(callBack){
        callBack(oListItem);
      }
  }, appSpHelper.writeError);
};


//document.addEventListener("DOMContentLoaded", () => {
  //ExecuteOrDelayUntilScriptLoaded(function(){
    SP.SOD.executeFunc('sp.js', 'SP.ClientContext', appAbsence.InitializePage);
  //}, "SP.ClientContext");
//});

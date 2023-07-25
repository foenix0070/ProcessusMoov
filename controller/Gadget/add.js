var appGadget = appGadget || {};
var clientContext;
appGadget.clientContext;

appGadget.InitializePage = function () {
  appGadget.clientContext = SP.ClientContext.get_current();
  clientContext =  SP.ClientContext.get_current();
  appSpHelper.GetMyProperties(function () {
    appSpHelper.LoadUserCongeParam(
      appHelper.ListName.Employe,
      document.getElementById("TxtCurrentUserLogin").value,
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






              //  appGadget.initCmbTypeConge(function(){
                  appGadget.List();
              //  });
              }
            );
          }
        );
      }
    );
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
    appGadget.Add (function(){
      location.reload();
    });
  });

};

function getRating (str){
  document.getElementById('TxtNature').value = str;
}

appGadget.initCmbTypeGadget = function (callBack) {
  ListerMotif(function(){
    let cmb = document.getElementById("cmbTypeConge");
    let txtColor = document.getElementById("TxtTypeCongeColeur");
    let txtText = document.getElementById("TxtTypeCongeText");
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


          if(callBack){
            callBack();
          }
      },
      function (sender, args) { console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace()); });
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

  oListItem.set_item("Statut", appHelper.Status.ENATTENTE);
  oListItem.set_item("StatutLibelle", "Validation du supérieur hiérarchique");

  oListItem.set_item("DateDepart", startDate);
  oListItem.set_item("DateRetour", endDate);
  oListItem.set_item("DateReprise", repDate);

  oListItem.set_item(
    "Title",
    document.getElementById("TxtArticle").value
  );

  oListItem.set_item(
    "Nature",
    document.getElementById("TxtArticle").value
  );

  oListItem.set_item(
    "Motif",
    document.getElementById("TxtMotif").value
  );

  oListItem.set_item(
    "NombreJours",
    parseInt(document.getElementById("TxtQuantite").value)
  );
  oListItem.set_item(
    "NombreJourAccorde",
    parseInt(document.getElementById("TxtQuantite").value)
  );
  oListItem.set_item(
    "DemandeurEmail",
    document.getElementById("TxtCurrentUserEmail").value
  );

 // oListItem.set_item("Historique", "#"); 
 

  oListItem.set_item(
    "Demandeur",
    SP.FieldUserValue.fromUser(document.getElementById("TxtCurrentUserLogin").value)
  );

  oListItem.set_item(
    "ResponsableN1",
    SP.FieldUserValue.fromUser(
      document.getElementById("TxtSpManagerN1Login").value
    )
  );
  oListItem.set_item(
    "ResponsableN2",
    SP.FieldUserValue.fromUser(
      document.getElementById("TxtSpManagerN2Login").value
    )
  );

  oListItem.set_item(
    "ResponsableN1Email",
    SP.FieldUserValue.fromUser(
      document.getElementById("TxtSpManagerN1Email").value
    )
  );
  oListItem.set_item(
    "ResponsableN2Email",
    SP.FieldUserValue.fromUser(
      document.getElementById("TxtSpManagerN2Email").value
    )
  );

  oListItem.update();
  clientContext.load(oListItem);
  clientContext.executeQueryAsync(function () {

const appUrl = '/tools/gadget/show.aspx?ID=' + oListItem.get_id();
      let WF = new WFManager(appHelper.AppCode.GADGET,  appHelper.AppConstante.SiteUrl, appHelper.ListName.Validation,  ACTIV_WORKFLOW  );
      WF.createWFTask(clientContext,appUrl, appHelper.AppCode.GADGET, oListItem.get_id(), document.getElementById("TxtSpManagerN1Login").value,document.getElementById("TxtSpManagerN2Login").value, function(){}   )
      if(callBack){
        callBack(oListItem);
      }
  }, appSpHelper.writeError);
};

SP.SOD.executeFunc('sp.js', 'SP.ClientContext', appGadget.InitializePage);
// document.addEventListener("DOMContentLoaded", () => {
//   ExecuteOrDelayUntilScriptLoaded(function(){
    
//   }, "SP.ClientContext");
// });

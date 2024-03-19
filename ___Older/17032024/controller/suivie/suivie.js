var appSuivieDemande = appSuivieDemande || {};
var clientContext;
appSuivieDemande.clientContext;

appSuivieDemande.InitializePage = function () {
  clientContext= SP.ClientContext.get_current();
  appSuivieDemande.clientContext = SP.ClientContext.get_current();

  document.getElementById("staticModalFormLabel").innerHTML =
    "PARAMETRE DE SUIVIE DE DEMANDES";
  appSuivieDemande.LoadPreference();

  const BtnSave = document.getElementById("BtnPreferenceSave");
  BtnSave.addEventListener("click", function () { appSuivieDemande.Save();});
};

appSuivieDemande.Save = function () {
  if (appSuivieDemande.TestFields()) {
    let oList = appSuivieDemande.clientContext
      .get_web()
      .get_lists()
      .getByTitle(appHelper.ListName.Preference);
    let oListItem = null;
    if (document.getElementById("txtPrefID").value) {
      oListItem = oList.getItemById(
        document.getElementById("txtPrefID").value.toString().trim()
      );
    } else {
      let itemCreateInfo = new window.SP.ListItemCreationInformation();
      oListItem = oList.addItem(itemCreateInfo);
    }

    oListItem.set_item("Title", document.getElementById("TxtTelephone").value);
    oListItem.set_item("Demandeur",  SP.FieldUserValue.fromUser(App.CurrentUser.Login));
    if (document.getElementById("ChkAllStepProcessus").checked == true) {
      oListItem.set_item("isAllStepProcessusAffected", true);
    } else {
      oListItem.set_item("isAllStepProcessusAffected", false);
    }

    if (document.getElementById("ChkTreatTask").checked == true) {
      oListItem.set_item("isTreatTask", true);
    } else {
      oListItem.set_item("isTreatTask", false);
    }

    if (document.getElementById("ChkAffectedTask").checked == true) {
      oListItem.set_item("isAffectedTask", true);
    } else {
      oListItem.set_item("isAffectedTask", false);
    }

    if (document.getElementById("RdPreferenceUse").checked == true) {
      oListItem.set_item("PreferenceRutime", "PERMANENT");
    } else {
      oListItem.set_item("PreferenceRutime", "TEMPORAIRE");
    }

    oListItem.update();
    clientContext.load(oListItem);
    clientContext.executeQueryAsync(function () {
      $(".modal-header .btn-close").click();
    });
  }
};

appSuivieDemande.TestFields = function () {
  let v = true;
  let str = "";
  var tel = document.getElementById("TxtTelephone").value;

  // Vérifier si les champs obligatoires sont vides
  if (tel === "") {
    str += "Veuillez remplir tous le champs téléphone. <br>";
    v = false; // Empêche l'envoi du formulaire
  }

  return v;
};

appSuivieDemande.LoadPreference = function () {
  let oList = appSuivieDemande.clientContext
    .get_web()
    .get_lists()
    .getByTitle(appHelper.ListName.Preference);

  let camlQuery = new SP.CamlQuery();
  var q = `<View>
              <Query>
                <Where>
                    <Eq><FieldRef ID="Demandeur"/><value Type="Integer"><UserID/></value></Eq>
                </Where>
              </Query>
              <RowLimit Paged='False'>1</RowLimit>
            </View>`;

  camlQuery.set_viewXml(q);

  let collListItem = oList.getItems(camlQuery);
  appSuivieDemande.clientContext.load(collListItem);
  appSuivieDemande.clientContext.executeQueryAsync(function (sender, args) {
    if (collListItem.get_count() > 0) {

      var listItemEnumerator = collListItem.getEnumerator();

      while (listItemEnumerator.moveNext()) {
        var oListItem = listItemEnumerator.get_current();

        let isAllStepProcessusAffected =
          oListItem.get_item("isAllStepProcessusAffected") != null
            ? oListItem.get_item("isAllStepProcessusAffected")
            : false;
        let isTreatTask =
          oListItem.get_item("isTreatTask") != null
            ? oListItem.get_item("isTreatTask")
            : false;
        let isAffectedTask =
          oListItem.get_item("isAffectedTask") != null
            ? oListItem.get_item("isAffectedTask")
            : false;
        let PreferenceRutime =
          oListItem.get_item("PreferenceRutime") != null
            ? oListItem.get_item("PreferenceRutime")
            : "PERMANENT";

        if (isAllStepProcessusAffected) {
          document.getElementById("ChkAllStepProcessus").checked = true;
        }
        if (isTreatTask) {
          document.getElementById("ChkTreatTask").checked = true;
        }
        if (isAffectedTask) {
          document.getElementById("ChkAffectedTask").checked = true;
        }

        if (PreferenceRutime == "PERMANENT") {
          document.getElementById("RdPreferenceUse").checked = true;
          document.getElementById("RdPreferenceNotUse").checked = false;
        } else {
          document.getElementById("RdPreferenceUse").checked = false;
          document.getElementById("RdPreferenceNotUse").checked = true;
        }

        document.getElementById("TxtTelephone").value =
          oListItem.get_item("Title") != null
            ? oListItem.get_item("Title")
            : "";
        document.getElementById("txtPrefID").value = oListItem.get_id();
      }
    } else {
      document.getElementById("TxtTelephone").value = App.CurrentUser.Phone;
    }

  }, appSpHelper.writeError);
};

SP.SOD.executeFunc(
  "sp.js",
  "SP.ClientContext",
  appSuivieDemande.InitializePage
);

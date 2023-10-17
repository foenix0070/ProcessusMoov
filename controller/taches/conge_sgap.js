var conge_sgap = conge_sgap || {};

conge_sgap.InitializePage = function () {
  conge_sgap.clientContext = SP.ClientContext.get_current();
  clientContext = SP.ClientContext.get_current();
  let tacheId = appHelper.GetQueryStringFromAjaxQuery("tacheid");
  if (tacheId) {
    conge_sgap.ShowForm(tacheId);
  }
};


conge_sgap.ShowForm = function (tacheId) {
  let oList = conge_sgap.clientContext
    .get_web()
    .get_lists()
    .getByTitle(appHelper.ListName.Validation);
  let oListItem = oList.getItemById(tacheId);
  conge_sgap.clientContext.load(oListItem);
  conge_sgap.clientContext.executeQueryAsync(function () {
    if (oListItem) {
      let view = {};
      view.did =
        oListItem.get_item("ParentID0") != null
          ? oListItem.get_item("ParentID0").toString()
          : "";
      view.tid =
        oListItem.get_item("ID") != null
          ? oListItem.get_item("ID").toString()
          : "";
      view.process =
        oListItem.get_item("Parent") != null
          ? oListItem.get_item("Parent").toString()
          : "";
      appHelper.renderTemplate(
        "tmpl_form_task_validation",
        "DivTaskValidation",
        view
      );
      conge_sgap.InitAction();
    }
  }, appSpHelper.writeError);
};

conge_sgap.InitAction = function () {
  const TxtProcess = document.getElementById("TxtProcess");
  const TxtDemandeID = document.getElementById("TxtDemandeID");
  const TxtTaskID = document.getElementById("TxtTaskID");
  const TxtCommentaire = document.getElementById("TxtCommentaire");


  const BtnOK = document.getElementById("BtnValidationOK");
  const BtnNOK = document.getElementById("BtnValidationNOK");
  const WF = new WFManager(
    TxtProcess.value,
    appHelper.AppConstante.SiteUrl,
    appHelper.ListName.Validation,
    ACTIV_WORKFLOW
  );

  BtnOK.addEventListener("click", function () {
    BtnOK.disabled = true;
    WF.goToNextTask(
      conge_sgap.clientContext,
      TxtTaskID.value,
      TxtProcess.value,
      TxtDemandeID.value,
      TxtCommentaire.value,
      function (nextTask) {
        ACTIV_NAMESPACE.UpDateItemStatus(nextTask,  TxtDemandeID.value, function () {
          location.reload();
        });
      }
    );
  });

  BtnNOK.addEventListener("click", function () {
    BtnNOK.disabled = true;
    WF.goToRefusedTask(
      conge_sgap.clientContext,
      TxtTaskID.value,
      TxtProcess.value,
      TxtDemandeID.value,
      TxtCommentaire.value,
      "REJETER",
      function (nextTask) {
        ACTIV_NAMESPACE.UpDateItemStatusRejet(true,  TxtDemandeID.value, function () {
          location.reload();
        });
      }
    );
  });



};

SP.SOD.executeFunc("sp.js", "SP.ClientContext", conge_sgap.InitializePage);

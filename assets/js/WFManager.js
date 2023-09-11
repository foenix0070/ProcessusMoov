"use strict";

class WFManager {
  constructor(_WFName, _SiteUrl, _TaskListName, _WFData) {
    this.TaskListName = _TaskListName;
    this.WFRunSite = _SiteUrl;
    this.WFApiTaskEndPoint = "";
    this.WFName = _WFName;
    this.WFData = _WFData;
    this.WFCircuitTemplate = [];
  }

  getWFSchemaFile() {
    let WF;
    if (this.WFData) {
      try {
        WF = JSON.parse(this.WFData);
        return WF;
      } catch (e) {

        appHelper.Log(e, appHelper.LogType.ERROR);

        try {
          WF = this.WFData;
        } catch (s) {
          appHelper.Log(s, appHelper.LogType.ERROR);

        }
      }

      try {
        if (WF) {
          WF = WF["processus"];
        }
        return WF;
      } catch (s) {
        appHelper.Log(s, appHelper.LogType.ERROR);
      }
    } else {
      return null;
    }
  }

  getWFSchema() {
    const WF = this.getWFSchemaFile();
    if (WF) {
      const _s = WF.getObjectByPropertyValue("item", this.WFName);
      return _s;
    } else {
      return null;
    }
  }

  getAssignFromTemplate(assTemplate, n1, n2) {
    let user = [];

    for (let index = 0; index < assTemplate.length; index++) {
      const element = assTemplate[index];
      const type = element["type"];
      const value = element["value"];
      switch (type) {
        case "USER":
          if (value == "#N1") {
            user.push(SP.FieldUserValue.fromUser(n1));
          }
          if (value == "#DIRECTEUR") {
            user.push(SP.FieldUserValue.fromUser(n2));
          }
          break;
        case "GROUP":
          let fuv = new SP.FieldUserValue();
          fuv.set_lookupId(ACTIV_GROUPS[value]);
          user.push(fuv);
          break;
      }
    }
    return user;
  }

  createWFTask(
    ctx,
    _appUrl,
    _parent,
    _parentid,
    managerN1,
    managerN2,
    _ref,
    callBack
  ) {
    const WF = this.getWFSchema();
    const cWF = WF[0]["step"];
    const appUrl = this.WFRunSite + "/tools" + _appUrl;

    let tasks = [];
    let i = 0;
    for (let index = 0; index < cWF.length; index++) {
      const element = cWF[index];
      tasks.push({
        status: i == 0 ? "En cours" : "Non commencé",
        code: element["id"],
        title: element["value"],
        parent: _parent,
        reference: _ref,
        detail:
          "Demande de " +
          document.getElementById("TxtCurrentUserDisplayName").value +
          " pour " +
          _parent.toString().toLowerCase(),
        parentid: _parentid,
        assign: this.getAssignFromTemplate(
          element["actors"],
          managerN1,
          managerN2
        ),
      });
      i = 1;
    }

    let oList = ctx.get_web().get_lists().getByTitle(this.TaskListName);
    let oListItemEnCours = null;
    tasks.forEach((e) => {
      let startDate = new Date();
      let endDate = startDate.addDays(2);
      let itemCreateInfo = new window.SP.ListItemCreationInformation();
      let oListItem = oList.addItem(itemCreateInfo);
      oListItem.set_item("Title", e.title);
      oListItem.set_item("StartDate", new Date());
      oListItem.set_item("DueDate", endDate);
      oListItem.set_item("Status", e.status);
      oListItem.set_item("AssignedTo", e.assign);
      oListItem.set_item("Parent", e.parent);
      oListItem.set_item("ParentID0", e.parentid);
      oListItem.set_item("TacheTemplateCode", e.code);
      oListItem.set_item("AppUrl", appUrl);
      oListItem.set_item("Body", e.detail);
      oListItem.set_item("Reference", e.reference);
      if (e.status == "En cours") {
        oListItemEnCours = oListItem;
      }

      oListItem.update();
      ctx.load(oListItem);
    });

    ctx.executeQueryAsync(function () {
      try {
        appSpHelper.SendNotificationTask(ctx, oListItemEnCours, function () {
          if (callBack) {
            callBack();
          }
        });
      } catch (e) {
        appHelper.Log(e, appHelper.LogType.ERROR);
        if (callBack) {
          callBack();
        }
      }

      //  alert('okkk');
    }, appSpHelper.writeError);
  }


  goToNextTask(ctx, _tacheid, _parent, _parentid, _commentaire, callBack) {
    const QryGetNextOne =
      "<View><Query><Where>" +
      "<And>" +
      "<And>" +
      '<Eq><FieldRef ID="Parent" /><Value Type="Text">' +
      _parent +
      "</Value></Eq>" +
      '<Eq><FieldRef ID="ParentID0" /><Value Type="Text">' +
      _parentid +
      "</Value></Eq>" +
      "</And>" +
      '<Eq><FieldRef ID="Status" /><Value Type="Choice">Non commencé</Value></Eq>' +
      "</And>" +
      '</Where><OrderBy><FieldRef Name="ID" Ascending="TRUE"/></OrderBy></Query></View>';
    let oList = ctx
      .get_web()
      .get_lists()
      .getByTitle(appHelper.ListName.Validation);
    let It = oList.getItemById(_tacheid);

    It.set_item("Status", "Terminé");
    It.set_item("PercentComplete", 1);
    It.set_item("ExecutionDate", new Date());
    It.set_item(
      "_Comment",
      "Approbation apportée par  " +
        document.getElementById("TxtCurrentUserDisplayName").value +
        " le " +
        appHelper.ToLocalDateString(new Date()) +
        " avec le commentaire < " +
        _commentaire +
        " >"
    );

    It.update();
    ctx.load(It);
    ctx.executeQueryAsync(function () {
      let camlQuery = new SP.CamlQuery();
      camlQuery.set_viewXml(QryGetNextOne);
      let collListItem = oList.getItems(camlQuery);
      ctx.load(collListItem);
      ctx.executeQueryAsync(function (sender, args) {
        let listItemEnumerator = collListItem.getEnumerator();
        let oListItem;
        while (listItemEnumerator.moveNext()) {
          oListItem = listItemEnumerator.get_current();
          let startDate = new Date();
          let endDate = startDate.addDays(2);

          oListItem.set_item("Status", "En cours");
          oListItem.set_item("StartDate", new Date());
          oListItem.set_item("DueDate", endDate);

          break;
        }
        if (oListItem) {
          oListItem.update();
          ctx.load(oListItem);
          ctx.executeQueryAsync(function () {
            try {
              appSpHelper.SendNotificationTask(ctx, oListItem, function () {

                appHelper.receiptTask(It, function(){
                  if (callBack) {
                    callBack(oListItem);
                  }
                })

              });
            } catch (e) {
              appHelper.Log(e, appHelper.LogType.ERROR);

              appHelper.receiptTask(It, function(){
                if (callBack) {
                  callBack(oListItem);
                }
              })

            }
          }, appSpHelper.writeError);
        } else {


          appHelper.receiptTask(It, function(){
            if (callBack) {
              callBack(false);
            }
          })



        }
      }, appSpHelper.writeError);
    }, appSpHelper.writeError);
  }

  goToRefusedTask(ctx, _tacheid, _parent, _parentid, _commentaire, callBack) {
    const QryGetNextOne =
      "<View><Query><Where>" +
      "<And>" +
      "<And>" +
      '<Eq><FieldRef ID="Parent" /><Value Type="Text">' +
      _parent +
      "</Value></Eq>" +
      '<Eq><FieldRef ID="ParentID0" /><Value Type="Text">' +
      _parentid +
      "</Value></Eq>" +
      "</And>" +
      '<Eq><FieldRef ID="Status" /><Value Type="Choice">Non commencé</Value></Eq>' +
      "</And>" +
      '</Where><OrderBy><FieldRef Name="ID" Ascending="TRUE"/></OrderBy></Query></View>';
    let oList = ctx
      .get_web()
      .get_lists()
      .getByTitle(appHelper.ListName.Validation);
    let It = oList.getItemById(_tacheid);
    It.set_item("Status", "Terminé");
    It.set_item("PercentComplete", 1);
    It.set_item(
      "_Comment",
      "Rejet apporté par : " +
        document.getElementById("TxtCurrentUserDisplayName").value +
        " le " +
        appHelper.ToLocalDateString(new Date()) +
        " avec le commentaire < " +
        _commentaire +
        " >"
    );

    It.update();
    ctx.load(It);
    ctx.executeQueryAsync(function () {
      let camlQuery = new SP.CamlQuery();
      camlQuery.set_viewXml(QryGetNextOne);
      let collListItem = oList.getItems(camlQuery);
      ctx.load(collListItem);
      ctx.executeQueryAsync(function (sender, args) {
        let listItemEnumerator = collListItem.getEnumerator();

        while (listItemEnumerator.moveNext()) {
          let oListItem = listItemEnumerator.get_current();
          oListItem.set_item("Status", "Terminé");
          oListItem.update();
          ctx.load(oListItem);
        }
        ctx.executeQueryAsync(function () {
          appHelper.receiptTask(It, function(){
            if (callBack) {
              callBack(true);
            }
          })
        }, appSpHelper.writeError);
      }, appSpHelper.writeError);
    }, appSpHelper.writeError);
  }


}

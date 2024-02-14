var appSpHelper = appSpHelper || {};

appSpHelper.writeError = function (sender, args) {
  appHelper.Log(
    "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
  );
};

appSpHelper.GetPeoplePickerVal = function (peoplePickerId) {
  var finalusers = new Array();
  var peoplePickerTopId = peoplePickerId + "_TopSpan";
  var peoplePicker =
    window.SPClientPeoplePicker.SPClientPeoplePickerDict[peoplePickerTopId];
  var users = peoplePicker.GetAllUserInfo();
  for (var i = 0; i < users.length; i++) {
    finalusers.push(window.SP.FieldUserValue.fromUser(users[i].Key));
  }
  return finalusers;
};

appSpHelper.GetPeoplePickerValLogin = function (peoplePickerId) {
  //var peoplePicker = SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerDiv_TopSpan;
  // Get information about all users.
  var finalusersLogin = "";

  var peoplePickerTopId = peoplePickerId + "_TopSpan";
  var peoplePicker =
    window.SPClientPeoplePicker.SPClientPeoplePickerDict[peoplePickerTopId];
  //var peoplePicker = peoplePickerID_TopSpan;
  var users = peoplePicker.GetAllUserInfo();
  // Get user keys.
  //var keys = peoplePicker.GetAllUserKeys();
  for (var i = 0; i < users.length; i++) {
    //var arryuser = users[i];
    if (i === 0) {
      finalusersLogin = users[i].Key;
    } else {
      finalusersLogin += "##ZL##" + users[i].Key;
    }
  }
  return finalusersLogin;
};

appSpHelper.GetTPeoplePicker = function (peoplePickerId) {
  var t = ["FUValue", "Email", "Login", "Name"];
  var usersFuValue = [];
  var usersEmail = [];
  var usersLogin = [];
  var usersName = [];
  var peoplePickerTopId = peoplePickerId + "_TopSpan";
  var peoplePicker =
    window.SPClientPeoplePicker.SPClientPeoplePickerDict[peoplePickerTopId];
  var users = peoplePicker.GetAllUserInfo();

  for (var i = 0; i < users.length; i++) {
    var arryuser = users[i];
    usersFuValue.push(window.SP.FieldUserValue.fromUser(arryuser.Key));
    usersLogin.push(arryuser.Key);
    usersEmail.push(arryuser.EntityData.Email);
    usersName.push(arryuser.DisplayText);
  }

  t["FUValue"] = usersFuValue;
  t["Email"] = usersEmail;
  t["Login"] = usersLogin;
  t["Name"] = usersName;

  return t;
};

appSpHelper.SetPeoplePickerField = function (peoplePickerId, userAccountName) {
  var peoplePicker = null;
  try {
    //SharePoint 2013
    //var travelPeoplePicker = null;
    var peoplePickerTopId = peoplePickerId + "_TopSpan";
    peoplePicker =
      window.SPClientPeoplePicker.SPClientPeoplePickerDict[peoplePickerTopId];
    if (peoplePicker != null) {
      var usrObj = {
        Key: userAccountName,
      };
      peoplePicker.AddUnresolvedUser(usrObj, true);
      //$("input[title='TravelRequestor']").focus().val(strUserName).attr("size", strUserName.length);
    }
  } catch (e) {
    appHelper.Log(e, appHelper.LogType.ERROR);

  }
};

appSpHelper.SetAndResolvePeoplePicker = function (
  peoplePickerId,
  userAccountName
) {
  //var _PeoplePicker = $("div[title='" + fieldName + "']");

  var peoplePickerTopId = peoplePickerId + "_TopSpan";

  var peoplePickerEditer = $(
    "input[id='" + peoplePickerTopId + "_HiddenInput']"
  );

  userAccountName.split(";#").forEach(function (part) {
    if (part) {
      peoplePickerEditer.val(part);

      var peoplePickerOject =
        window.SPClientPeoplePicker.SPClientPeoplePickerDict[peoplePickerTopId];

      peoplePickerOject.AddUnresolvedUserFromEditor(true);
    }
  });
};

appSpHelper.CheckPplpickerEntry = function (peoplePickerId) {
  var checker = false;
  var peoplePickerTopId = peoplePickerId + "_TopSpan";
  var peoplePicker =
    window.SPClientPeoplePicker.SPClientPeoplePickerDict[peoplePickerTopId];
  //var peoplePicker = PplpickerObject_TopSpan;
  var users = peoplePicker.GetAllUserInfo();
  if (users.length > 0) checker = true;

  return checker;
};

appSpHelper.InitializePeoplePicker = function (
  peoplePickerElementId,
  mutipleSelection,
  width
) {
  // Create a schema to store picker properties, and set the properties.
  if (!width) {
    width = "320px";
  }

  if (!mutipleSelection) {
    mutipleSelection = false;
  }

  var schema = {};
  schema["PrincipalAccountType"] = "User,DL,SecGroup,SPGroup";
  schema["SearchPrincipalSource"] = 15;
  schema["ResolvePrincipalSource"] = 15;
  schema["AllowMultipleValues"] = mutipleSelection;
  schema["MaximumEntitySuggestions"] = 50;
  schema["Width"] = width;

  // Render and initialize the picker.
  // Pass the ID of the DOM element that contains the picker, an array of initial
  // PickerEntity objects to set the picker value, and a schema that defines
  // picker properties.
  SPClientPeoplePicker_InitStandaloneControlWrapper(
    peoplePickerElementId,
    null,
    schema
  );
};

appSpHelper.PeoplePickerOnChangeEvent = function (
  peoplePickerElementId,
  callback
) {
  appHelper.Log("TEST 1");
  var ppId = peoplePickerElementId + "_TopSpan";
  var addOnChanged = function (ctx) {
    if (
      window.SPClientPeoplePicker &&
      window.SPClientPeoplePicker.SPClientPeoplePickerDict &&
      window.SPClientPeoplePicker.SPClientPeoplePickerDict[ppId]
    ) {
      appHelper.Log("TEST 2");
      var picker = window.SPClientPeoplePicker.SPClientPeoplePickerDict[ppId];
      appHelper.Log("Picker");
      appHelper.Log(picker);
      picker.oldChanged = picker.OnControlResolvedUserChanged;
      picker.OnControlResolvedUserChanged = function () {
        if (picker.TotalUserCount !== 0) {
          appHelper.Log("TEST 3");
          setTimeout(function () {
            var tUserInfo = picker.GetAllUserInfo();
            if (tUserInfo.length > 0) {
              appHelper.Log("TEST 4");
              var user = tUserInfo[tUserInfo.length - 1];
              appHelper.Log(user.Key);
              appHelper.Log(user);
              callback(user.Key);
            }
          }, 100);
        }
        picker.oldChanged();
      };
    } else {
      setTimeout(function () {
        addOnChanged(ctx);
        appHelper.Log("Picker is null");
      }, 100);
    }
  };

  addOnChanged();
};

appSpHelper.ClearPeopleFieldValue = function (peoplePickerElementId) {
  var listSpanUserSelected = $(
    "#" +
    peoplePickerElementId +
    "_TopSpan_ResolvedList > .sp-peoplepicker-userSpan"
  );

  for (var i = 0; i < listSpanUserSelected.length; i++) {
    window.SPClientPeoplePickerProcessedUser.DeleteProcessedUser(
      listSpanUserSelected[0]
    );
  }

  $("#" + peoplePickerElementId + "_TopSpan_InitialHelpText").show();
};

appSpHelper.GetProperties = function (prefixControle, userLogin, callBack) {
  let clientContext = new SP.ClientContext.get_current();
  let peopleManager = new SP.UserProfiles.PeopleManager(clientContext);
  let personProperties = peopleManager.getPropertiesFor(userLogin);
  clientContext.load(personProperties);
  clientContext.executeQueryAsync(function () {
    let selector = `Txt${prefixControle}DisplayName`;
    let input = document.createElement("input");
    input.setAttribute("type", "hidden");
    input.setAttribute("id", selector);
    input.setAttribute("value", "");
    document.body.appendChild(input);

    selector = `Txt${prefixControle}Login`;
    input = document.createElement("input");
    input.setAttribute("type", "hidden");
    input.setAttribute("id", selector);
    input.setAttribute("value", "");
    document.body.appendChild(input);

    selector = `Txt${prefixControle}Email`;
    input = document.createElement("input");
    input.setAttribute("type", "hidden");
    input.setAttribute("id", selector);
    input.setAttribute("value", "");
    document.body.appendChild(input);

    let html = `<input type="hidden" id="Txt${prefixControle}DisplayName" value="" />
        <input type="hidden" id="Txt${prefixControle}Login" value="" />
        <input type="hidden" id="Txt${prefixControle}Email" value="" />
        <input type="hidden" id="Txt${prefixControle}Manager" value="" />`;
    document.body.append(html);
    selector = `Txt${prefixControle}DisplayName`;
    document.getElementById(selector).innerHTML =
      personProperties.get_displayName();
    selector = `Txt${prefixControle}Login`;
    document.getElementById(selector).innerHTML =
      personProperties.get_userProfileProperties()["AccountName"];
    selector = `Txt${prefixControle}Email`;
    document.getElementById(selector).innerHTML =
      personProperties.get_userProfileProperties()["WorkEmail"];

    if (callBack) {
      callBack();
    }
  }, appSpHelper.writeError);
};

appSpHelper.GetMyProperties = function (callBack) {
  let clientContext = new SP.ClientContext.get_current();
  let oWeb = clientContext.get_web();
  currentUser = oWeb.get_currentUser();
  clientContext.load(currentUser);
  clientContext.executeQueryAsync(function () {
    let input = document.createElement("input");
    input.setAttribute("type", "hidden");
    input.setAttribute("id", "TxtCurrentUserDisplayName");
    input.setAttribute("value", "");
    document.body.appendChild(input);

    input = document.createElement("input");
    input.setAttribute("type", "hidden");
    input.setAttribute("id", "TxtCurrentUserLogin");
    input.setAttribute("value", "");
    document.body.appendChild(input);

    input = document.createElement("input");
    input.setAttribute("type", "hidden");
    input.setAttribute("id", "TxtCurrentUserEmail");
    input.setAttribute("value", "");
    document.body.appendChild(input);

    document.getElementById("TxtCurrentUserLogin").value =
      currentUser.get_loginName();
    document.getElementById("TxtCurrentUserDisplayName").value =
      currentUser.get_title();
    document.getElementById("TxtCurrentUserEmail").value =
      currentUser.get_email();

    if (callBack) {
      callBack();
    }
  }, appSpHelper.writeError);
};

appSpHelper.GetEmploye = function (listeName, login, callBack) {
  let targetList = clientContext.get_web().get_lists().getByTitle(listeName);
  let camlQuery = new SP.CamlQuery();

  appHelper.Log("IN GETEMPLOYE");
  appHelper.Log(listeName, login);

  if (login.indexOf("\\") > -1) {
    login = login.split("\\")[1];
    login = login.trim();
  }

  let q =
    '<View><Query><Where><Eq><FieldRef Name="Title" /><Value Type="Text">' +
    login +
    "</Value></Eq></Where></Query></View>";
  camlQuery.set_viewXml(q);
  let collListItemInfo = targetList.getItems(camlQuery);
  clientContext.load(collListItemInfo);
  clientContext.executeQueryAsync(function (s, a) {
    let listItemEnumerator = collListItemInfo.getEnumerator();
    let oListItem = null;
    appHelper.Log(listItemEnumerator);
    while (listItemEnumerator.moveNext()) {
      oListItem = listItemEnumerator.get_current();
    }
    if (callBack) {
      callBack(oListItem);
    }
  }, appSpHelper.writeError);
};

appSpHelper.LoadUserCongeParam = function (listeName, login, callBack) {
  let targetList = clientContext.get_web().get_lists().getByTitle(listeName);
  let camlQuery = new SP.CamlQuery();

  if (login.indexOf("|") > -1) {
    login = login.split("|")[1];
    login = login.trim();
  }

  let q =
    '<View><Query><Where><Eq><FieldRef Name="EmpLogin" /><Value Type="Text">' +
    login +
    "</Value></Eq></Where></Query></View>";
  camlQuery.set_viewXml(q);
  let collListItemInfo = targetList.getItems(camlQuery);
  clientContext.load(collListItemInfo);
  clientContext.executeQueryAsync(function (s, a) {
    var listItemEnumerator = collListItemInfo.getEnumerator();
    {
      let input = document.createElement("input");
      input.setAttribute("type", "hidden");
      input.setAttribute("id", "TxtSpUserNbreJrsAcquis");
      input.setAttribute("value", "");
      document.body.appendChild(input);

      input = document.createElement("input");
      input.setAttribute("type", "hidden");
      input.setAttribute("id", "TxtSpUserNbreJrsAcquisHLeave");
      input.setAttribute("value", "");
      document.body.appendChild(input);

      input = document.createElement("input");
      input.setAttribute("type", "hidden");
      input.setAttribute("id", "TxtSpUserMatricule");
      input.setAttribute("value", "");
      document.body.appendChild(input);

      input = document.createElement("input");
      input.setAttribute("type", "hidden");
      input.setAttribute("id", "TxtSpUserNbreJrsSNCertified");
      input.setAttribute("value", "");
      document.body.appendChild(input);

      input = document.createElement("input");
      input.setAttribute("type", "hidden");
      input.setAttribute("id", "TxtSpUserDateFinContrat");
      input.setAttribute("value", "");
      document.body.appendChild(input);

      input = document.createElement("input");
      input.setAttribute("type", "hidden");
      input.setAttribute("id", "TxtSpEmployeeID");
      input.setAttribute("value", "");
      document.body.appendChild(input);

      input = document.createElement("input");
      input.setAttribute("type", "hidden");
      input.setAttribute("id", "TxtSpEmployeeID");
      input.setAttribute("value", "");
      document.body.appendChild(input);

      input = document.createElement("input");
      input.setAttribute("type", "hidden");
      input.setAttribute("id", "TxtSpDepartementID");
      input.setAttribute("value", "");
      document.body.appendChild(input);

      input = document.createElement("input");
      input.setAttribute("type", "hidden");
      input.setAttribute("id", "TxtGender");
      input.setAttribute("value", "");
      document.body.appendChild(input);

      input = document.createElement("input");
      input.setAttribute("type", "hidden");
      input.setAttribute("id", "TxtSpEmpMail");
      input.setAttribute("value", "");
      document.body.appendChild(input);

      input = document.createElement("input");
      input.setAttribute("type", "hidden");
      input.setAttribute("id", "TxtSpManagerN1Login");
      input.setAttribute("value", "");
      document.body.appendChild(input);

      input = document.createElement("input");
      input.setAttribute("type", "hidden");
      input.setAttribute("id", "TxtSpManagerN1Email");
      input.setAttribute("value", "");
      document.body.appendChild(input);

      input = document.createElement("input");
      input.setAttribute("type", "hidden");
      input.setAttribute("id", "TxtSpManagerN2Login");
      input.setAttribute("value", "");
      document.body.appendChild(input);

      input = document.createElement("input");
      input.setAttribute("type", "hidden");
      input.setAttribute("id", "TxtSpManagerN2Email");
      input.setAttribute("value", "");
      document.body.appendChild(input);

      let nbrejrsAcquis = 0;
      let employeeId = 0;
      let matricule = 0;
      let depId = 0;
      let gender = 0;
      let mail = "";
      let oListItem = null;
      while (listItemEnumerator.moveNext()) {
        oListItem = listItemEnumerator.get_current();

        mail =
          oListItem.get_item("EmpMail") != null
            ? oListItem.get_item("EmpMail")
            : "";
        nbrejrsAcquis =
          oListItem.get_item("NombreJoursAcquis") != null
            ? oListItem.get_item("NombreJoursAcquis")
            : 0;
        gender = oListItem.get_item("Gender") ? 1 : 0;
        employeeId =
          oListItem.get_item("ID") != null ? oListItem.get_item("ID") : 0;
        depId =
          oListItem.get_item("DepartementID") != null
            ? oListItem.get_item("DepartementID")
            : 0;
        matricule =
          oListItem.get_item("EmpMatricule") != null
            ? oListItem.get_item("EmpMatricule")
            : "0000";

        break;
      }

      document.getElementById("TxtSpEmpMail").value = mail;
      document.getElementById("TxtSpUserMatricule").value = matricule;
      document.getElementById("TxtSpUserNbreJrsAcquis").value = nbrejrsAcquis;
      document.getElementById("TxtSpEmployeeID").value = employeeId;
      document.getElementById("TxtSpDepartementID").value = depId;
      document.getElementById("TxtGender").value = gender;

      appSpHelper.GetEmployeeManagerLogin(
        "N1",
        oListItem.get_item("EmpManager"),
        function () {
          if (callBack) {
            callBack();
          }
        }
      );
    }
  }, appSpHelper.writeError);
};

appSpHelper.GetEmployeeManagerLogin = function (niveau, manager, callBack) {
  if (manager != null) {
    var user = clientContext.get_web().ensureUser(manager.get_lookupValue());
    clientContext.load(user);
    clientContext.executeQueryAsync(function () {
      if (niveau == "N1") {
        document.getElementById("TxtSpManagerN1Login").value =
          user.get_loginName();
        document.getElementById("TxtSpManagerN1Email").value = user.get_email();
      }

      if (niveau == "N2") {
        document.getElementById("TxtSpManagerN2Login").value =
          user.get_loginName();
        document.getElementById("TxtSpManagerN2Email").value = user.get_email();
      }

      if (callBack) {
        callBack();
      }
    }, appSpHelper.writeError);
  }
};

appSpHelper.CheckAttachmentFolder = function (ctx, id, listName, callBack) {
  let oWeb = ctx.get_web();
  let oList = ctx.get_web().get_lists().getByTitle(listName);

  ctx.load(oWeb);
  ctx.load(oList);
  ctx.executeQueryAsync(function () {
    let oListItem = oList.getItemById(id);
    ctx.load(oListItem);
    ctx.executeQueryAsync(function () {
      if (!oListItem.get_fieldValues()["Attachments"]) {
        //Get attachment folder and attachment folderrurl
        let attachmentsFolder = oWeb.getFolderByServerRelativeUrl(
          "Lists/" + listName + "/Attachments"
        );
        let attachmentsFolderURL =
          oWeb.get_serverRelativeUrl() + "Lists/" + listName + "/Attachments";

        //Create Attachment Folder
        attachmentsFolder = attachmentsFolder.get_folders().add("_" + id);
        attachmentsFolder.moveTo(attachmentsFolderURL + "/" + id);

        //Load Client Context and execute the batch
        ctx.load(attachmentsFolder);
        ctx.executeQueryAsync(function () {
          if (callBack) {
            callBack();
          }
        }, appSpHelper.writeError);
      }
    }, appSpHelper.writeError);
  }, appSpHelper.writeError);
};

appSpHelper.SaveNotification = function (ctx, objNotification, callBack) {
  let oList = ctx
    .get_web()
    .get_lists()
    .getByTitle(appHelper.ListName.Notification);
  let itemCreateInfo = new window.SP.ListItemCreationInformation();
  let oListItem = oList.addItem(itemCreateInfo);

  oListItem.set_item("Title", "NOTIFICATION");
  oListItem.set_item("Statut", 0);
  oListItem.set_item("DestinataireEmail", objNotification.to);
  oListItem.set_item("DestinaireNumero", objNotification.numero);
  oListItem.set_item("MessageBody", objNotification.body);
  oListItem.set_item("MessageObjet", objNotification.objet);

  oListItem.update();
  clientContext.load(oListItem);
  clientContext.executeQueryAsync(function () {
    if (callBack) {
      callBack();
    }
  }, appSpHelper.writeError);
};

appSpHelper.getGroupMembersEmail = function (groupName) {
  var ctx = new SP.ClientContext.get_current();
  var web = ctx.get_web();
  var group = web.get_siteGroups().getByName(groupName);
  var users = group.get_users();
  ctx.load(users);
  return new Promise(function (resolve, reject) {
    ctx.executeQueryAsync(
      function () {
        var emailAddresses = [];
        var userEnumerator = users.getEnumerator();
        while (userEnumerator.moveNext()) {
          var user = userEnumerator.get_current();
          emailAddresses.push(user.get_email());
        }
        resolve(emailAddresses);
      },
      function (sender, args) {
        reject(args.get_message());
      }
    );
  });
};

appSpHelper.getGroupMembersLoginNames = function (groupName) {
  var ctx = new SP.ClientContext.get_current();
  var web = ctx.get_web();
  var group = web.get_siteGroups().getByName(groupName);
  var users = group.get_users();
  ctx.load(users);

  return new Promise(function (resolve, reject) {
    ctx.executeQueryAsync(
      function () {
        var loginNames = [];
        var userEnumerator = users.getEnumerator();
        while (userEnumerator.moveNext()) {
          var user = userEnumerator.get_current();
          loginNames.push(user.get_loginName().replace("i:0#.w|", ""));
        }
        resolve(loginNames);
      },
      function (sender, args) {
        reject(args.get_message());
      }
    );
  });
};

appSpHelper.getAssignedToEmail = function (taskId) {
  var listName = appHelper.ListName.Validation;
  var assignedToColumnName = "AssignedTo";

  var ctx = new SP.ClientContext.get_current();
  var web = ctx.get_web();
  var list = web.get_lists().getByTitle(listName);

  var listItem = list.getItemById(taskId);
  ctx.load(listItem, assignedToColumnName);

  return new Promise(function (resolve, reject) {
    ctx.executeQueryAsync(
      function () {
        var assignedToField = listItem.get_item(assignedToColumnName);
        if (assignedToField) {
          var userId = assignedToField[0].get_lookupId(); // Get the ID of the user from the "Assigned To" field
          var user = web.get_siteUsers().getById(userId); // Get the user object using the user ID
          ctx.load(user);
          ctx.executeQueryAsync(
            function () {
              var assignedToEmail = user.get_email(); // Get the email property from the user object
              resolve(assignedToEmail);
            },
            function (sender, args) {
              reject(args.get_message());
            }
          );
        } else {
          resolve(null); // Assigned To field is empty or not properly configured
        }
      },
      function (sender, args) {
        reject(args.get_message());
      }
    );
  });
};

appSpHelper.queryEmployeesByLoginNames = function (arrLoginNames) {
  var ctx = new SP.ClientContext.get_current();
  var web = ctx.get_web();
  var list = web.get_lists().getByTitle(appHelper.ListName.Employe);

  var camlQuery = new SP.CamlQuery();
  camlQuery.set_viewXml(
    `<View>
      <Query>
        <Where>
          <In>
            <FieldRef Name='EmpLogin' />
            <Values>
              ${arrLoginNames
      .map((name) => `<Value Type='Text'>${name}</Value>`)
      .join("")}
            </Values>
          </In>
        </Where>
      </Query>
    </View>`
  );

  var items = list.getItems(camlQuery);
  ctx.load(items);

  return new Promise(function (resolve, reject) {
    ctx.executeQueryAsync(
      function () {
        var filteredItems = [];
        var itemEnumerator = items.getEnumerator();
        while (itemEnumerator.moveNext()) {
          var listItem = itemEnumerator.get_current();
          filteredItems.push(listItem); // Replace 'YourLoginFieldName' with the actual field name containing login names
        }
        resolve(filteredItems);
      },
      function (sender, args) {
        reject(args.get_message());
      }
    );
  });
};



appSpHelper.GetMails = function (Demande, Tache, typemail, callBack) {
  console.log(typemail);
  // console.log(Demande, Tache, _tacheAction);
  // appHelper.Log('ENVOI DE MAIL');
  // alert('0002');
  // if (callBack) {
  //   callBack();
  // }

  var cContext = window.SP.ClientContext.get_current();
  var oList = cContext.get_web().get_lists().getByTitle(appHelper.ListName.Template);
  var camlQuery = new window.SP.CamlQuery();
  //alert(_spPageContextInfo.userId);
  var requete = '<View><Query><Where>';
  let req = "";
  let r = "";
  if (typemail.indexOf("#") != -1) {
    req = typemail.split("#");
    for (let i = 0; i <= req.length - 1; i++) {

      r += '<Eq><FieldRef Name=\'TypeMail\' /><Value Type=\'Text\'>' + req[i] + '</Value></Eq>';
      if (i >= 1) {
        r = '<Or>' + r + '</Or>';
      }

    }
  }
  else {
    r += '<Eq><FieldRef Name=\'TypeMail\' /><Value Type=\'Text\'>' + typemail + '</Value></Eq>';
  }

  requete += r + '</Where></Query></View>';
  console.log(requete);
  camlQuery.set_viewXml(requete);
  var paramItem = oList.getItems(camlQuery);
  cContext.load(paramItem);
  cContext.executeQueryAsync(onSuccess, onFailure);

  function onSuccess(sender, args) {
    var mails = [];

    if (paramItem.get_count() > 0) {
      var listItemEnumerator = paramItem.getEnumerator();
      while (listItemEnumerator.moveNext()) {
        var oListItem = listItemEnumerator.get_current();
        mails.push({
          "Sujet": (oListItem.get_item('Sujet') != null ? oListItem.get_item('Sujet') : ""),
          "Corps": (oListItem.get_item('Corps') != null ? oListItem.get_item('Corps') : ""),
          "MailTo": (oListItem.get_item('MailTo') != null ? oListItem.get_item('MailTo') : ""),
          //"MailCc": (oListItem.get_item('MailCc') != null ? oListItem.get_item('MailCc') : "")
        });
      }
    }

    mails.forEach(mail => {
      mail.Sujet = appSpHelper.ReturnMailParam(Demande, Tache, mail.Sujet);
      mail.Corps = appSpHelper.ReturnMailParam(Demande, Tache, mail.Corps);
      mail.MailTo = appSpHelper.ReturnMailRecipient(Demande, Tache, mail.MailTo);
      //mail.MailCc = appSpHelper.ReturnMailRecipient(Demande, Tache, mail.MailCc);
    });

    console.log(mails);

    if (callBack) callBack(mails);
  }
  function onFailure(sender, args) {
    callBack.call();
    //onComplete(false);
  }
}



appSpHelper.SendNotificationTask = function (ctx, taskItem, callBack) {
  let obj = {};
  obj.to = "";
  obj.numero = "";
  obj.body = "";
  obj.objet = "";

  let WriteObject = function (t) {
    const _titre = "MOOVINSIDE - TACHE DE VALIDATION ";
    switch (t["Parent"] != null ? t["Parent"].toString() : "") {
      case appHelper.AppCode.VEHICULE:
        return _titre;
        break;
      case appHelper.AppCode.MATERIEL:
        return _titre;
        break;
      case appHelper.AppCode.GADGET:
        return _titre;
        break;
      case appHelper.AppCode.CONGE:
        return _titre;
        break;
      case appHelper.AppCode.ABSENCE:
        return _titre;
        break;
      default:
        return _titre;
        break;
    }
  };


  //" +
  //(t["Parent"] != null ? t["Parent"].toString() : "").trim().toLowerCase() +
  //"
  let WriteBody = function (t) {
    let titre = "Bonjour, ";
    titre += "<br><br>";
    titre +=
      "Une demande vous a été soumise pour approbation";
    titre += "<br>";
    titre +=
      '<a href="' +
      appHelper.AppConstante.SiteJsUrl +
      "/index.aspx\"> Suivez ce lien pour accéder au centre d'application. </a>";
    titre += "<br><br>";
    titre += "Cordialement,";
    titre += "<br>";
    titre += "<b>Equipe Moov Inside</b>";
    titre += "<br><br>";
    return titre;
  };

  let GetAssignAdress = function (t, callBack) {
    let arrAdresse = [];
    appSpHelper
      .getAssignedToEmail(t.get_item("ID"))
      .then(function (assignedToEmail) {
        appHelper.Log(assignedToEmail, appHelper.LogType.WARN, 'getAssignedToEmail(t.get_item("ID"))');
        if (assignedToEmail) {
          arrAdresse.push(assignedToEmail);
          callBack(arrAdresse.concat());
        } else {
          callBack("");
        }
      })
      .catch(function (error) {
        appHelper.Log(error, appHelper.LogType.ERROR);
        let grp =
          t.get_item("AssignedTo") != null
            ? t.get_item("AssignedTo")[0].get_lookupValue()
            : "";
        appSpHelper
          .getGroupMembersLoginNames(grp)
          .then(function (arrUserLogin) {

            appHelper.Log(arrUserLogin, appHelper.LogType.WARN, ' appSpHelper.getGroupMembersLoginNames(grp)');
            appSpHelper
              .queryEmployeesByLoginNames(arrUserLogin)
              .then(function (empUsers) {

                appHelper.Log(empUsers, appHelper.LogType.ERROR, ".queryEmployeesByLoginNames(arrUserLogin)");

                empUsers.forEach(function (empUser, idx) {
                  let EmpMail =
                    empUser.get_item("EmpMail") != null
                      ? empUser.get_item("EmpMail").toString().trim()
                      : "";
                  if (EmpMail) {
                    arrAdresse.push(EmpMail);
                  }
                });

                appHelper.Log(arrAdresse);
                callBack(arrAdresse.concat());
              })
              .catch(function (error) {
                appHelper.Log(error, appHelper.LogType.ERROR);
              });
          })
          .catch(function (error) {
            appHelper.Log(error, appHelper.LogType.ERROR);
          });
      });
  };

  GetAssignAdress(taskItem, function (a) {
    obj.objet = WriteObject(taskItem);
    obj.body = WriteBody(taskItem);
    obj.to = a;
    obj.from = appHelper.AppConstante.MIMailSender;

    appHelper.Log(obj);

    appSpHelper.sendEmail(
      obj.from,
      obj.to,
      [],
      obj.body,
      obj.objet,
      function () {
        obj.to = obj.to.toString();
        appHelper.Log(obj);
        appSpHelper.SaveNotification(ctx, obj, callBack);
      }
    );
  });
};

appSpHelper.sendEmail = function (from, to, body, subject, callback) {
  // appSpHelper.sendEmail = function (from, to, cc, body, subject, callback) {
  //var siteurl = ;
  var urlTemplate = `${appHelper.AppConstante.SiteUrl}_api/SP.Utilities.Utility.SendEmail`;
  // var urlTemplate = window._spPageContextInfo.webServerRelativeUrl + "/_api/SP.Utilities.Utility.SendEmail";
  $.ajax({
    contentType: "application/json",
    url: urlTemplate,
    type: "POST",
    data: JSON.stringify({
      properties: {
        __metadata: {
          type: "SP.Utilities.EmailProperties",
        },
        From: from,
        To: {
          results: to.split(";")
        },

        // CC: {
        //   results: cc.split(";")
        // },

        Body: body,
        Subject: subject,
      },
    }),
    headers: {
      "Accept": "application/json;odata=verbose",
      "content-type": "application/json;odata=verbose",
      "X-RequestDigest": document.getElementById("__REQUESTDIGEST").value
    },
    success: function (data) {
      if (callback) {
        appHelper.Log(data, appHelper.LogType.INFO);
        callback.call();
      }
    },
    error: function (err) {
      appHelper.Log(err, appHelper.LogType.ERROR, "Erreur lors de l'envoi du mail: ");
    },
  });
};

appSpHelper.ReturnMailParam = function (demande, tache, mailContent) {
  // var MailTemplate = mailContent;
  if (mailContent) {
    let url = `<a href="${appHelper.AppConstante.LienSiteJsUrl}">Suivez ce lien pour accéder à la plateforme MOOVINSIDE.</a>`
    let urltache = `<a href="${appHelper.AppConstante.LienSiteJsUrl}">Cliquez ici pour accéder à la tâche.</a>`
    let urldemande = `<a href="${appHelper.AppConstante.LienSiteJsUrl}">Cliquez ici pour consulter l'historique des validations.</a>`
    let demandeurName = demande.get_item('Demandeur') != null ? demande.get_item('Demandeur').get_lookupValue() : "";

    let Comment = tache.get_item('_Comment') != null ? tache.get_item('_Comment') : "";
    const commentaire = Comment.substring(Comment.indexOf("<") + 1, Comment.indexOf(">"));
    const responsable = Comment.substring(Comment.indexOf("Compte système"), Comment.indexOf("le"));
    // const responsable = Comment.substring(17, 29);
    const date = Comment.substring(Comment.indexOf("le") + 3, Comment.indexOf("avec"));


    let statutlibelle = demande.get_item('StatutLibelle') != null ? demande.get_item('StatutLibelle') : "";
    console.log(statutlibelle);
    function fonctionValideur(texte) {
      if (texte.includes("VALIDATION DU ")) {
        return texte.split("VALIDATION DU ")[1];
      }
      else if (statutlibelle.includes("VALIDATION DE LA")) {
        return texte.split("VALIDATION DE LA ")[1];
      }

    }
    const valfonct = fonctionValideur(statutlibelle);
    console.log("Fonction : " + fonctionValideur(statutlibelle));

    // let demandeAssigne = tache.get_item('AssignedTo') != null ? tache.get_item('AssignedTo').get_lookupValue() : "";
    // let demandeurName = demandeurField.get_lookupValue();

    if (mailContent.indexOf("##AUTHOR##") >= 0) {
      mailContent = mailContent.replaceAll("##AUTHOR##", demandeurName);
    }

    if (mailContent.indexOf("##LIEN##") >= 0) {
      mailContent = mailContent.replace("##LIEN##", url);
    }

    // if (mailContent.indexOf("##LIEN##") >= 0) {
    //   mailContent = mailContent.replace("##LIEN##", url);
    // }

    // if (mailContent.includes("##PERSONTOSEND##")) {
    // if (mailContent.indexOf("##ASSIGNEA##") >= 0) {
    //   mailContent = mailContent.replaceAll("##ASSIGNEA##", demandeAssigne);
    // }


    //if (mailContent.includes("##TITLE##")) {
    if (mailContent.indexOf("##TITREDEMANDE##") >= 0) {
      mailContent = mailContent.replaceAll("##TITREDEMANDE##", (demande.get_item('Title') != null ? demande.get_item('Title') : ""));
    }


    //Autres parametres

    if (mailContent.indexOf("##LIBELLENATUREABSENCE##") >= 0) {
      mailContent = mailContent.replaceAll("##LIBELLENATUREABSENCE##", (demande.get_item('Title') != null ? demande.get_item('Title') : ""));
    }

    if (mailContent.indexOf("##FONCTION##") >= 0) {
      mailContent = mailContent.replaceAll("##FONCTION##", valfonct);
    }

    if (mailContent.indexOf("##NUMERODEMANDE##") >= 0) {
      mailContent = mailContent.replaceAll("##NUMERODEMANDE##", (demande.get_item('Reference') != null ? demande.get_item('Reference') : ""));
    }

    if (mailContent.indexOf("##MOTIF##") >= 0) {
      mailContent = mailContent.replaceAll("##MOTIF##", (demande.get_item('Motif') != null ? demande.get_item('Motif') : ""));
    }

    if (mailContent.indexOf("##DATEDEBUT##") >= 0) {
      mailContent = mailContent.replaceAll("##DATEDEBUT##", (demande.get_item('DateDepart') != null ? new Date(demande.get_item('DateDepart')).toLocaleDateString() : ''));
    }

    if (mailContent.indexOf("##DATEREPRISE##") >= 0) {
      mailContent = mailContent.replaceAll("##DATEREPRISE##", (demande.get_item('DateReprise') != null ? new Date(demande.get_item('DateReprise')).toLocaleDateString() : ''));
    }

    if (mailContent.indexOf("##NOMBREJOURSDEMANDE##") >= 0) {
      mailContent = mailContent.replaceAll("##NOMBREJOURSDEMANDE##", (demande.get_item('NombreJours') != null ? demande.get_item('NombreJours') : ""));
    }

    if (mailContent.indexOf("##ECHEANCE##") >= 0) {
      mailContent = mailContent.replaceAll("##ECHEANCE##", (tache.get_item('DueDate') != null ? new Date(tache.get_item('DueDate')) : ""));
    }

    if (mailContent.indexOf("##LIBELLENATURE##") >= 0) {
      mailContent = mailContent.replaceAll("##LIBELLENATURE##", (demande.get_item('TypeCongeLibelle') != null ? demande.get_item('TypeCongeLibelle') : ""));
    }

    if (mailContent.indexOf("##DESTINATION##") >= 0) {
      mailContent = mailContent.replaceAll("##DESTINATION##", (demande.get_item('Destination') != null ? demande.get_item('Destination') : ""));
    }

    if (mailContent.indexOf("##MONTANTTOTALFRAIS##") >= 0) {
      mailContent = mailContent.replaceAll("##MONTANTTOTALFRAIS##", (demande.get_item('CoutTotal') != null ? demande.get_item('CoutTotal') : ""));
    }

    if (mailContent.indexOf("##MONTANTTOTALFRAISREGUL##") >= 0) {
      mailContent = mailContent.replaceAll("##MONTANTTOTALFRAISREGUL##", (demande.get_item('CoutMission') != null ? demande.get_item('CoutMission') : ""));
    }

    if (mailContent.indexOf("##DATEDEBUTMISSION##") >= 0) {
      mailContent = mailContent.replaceAll("##DATEDEBUTMISSION##", (demande.get_item('DateDebut') != null ? new Date(demande.get_item('DateDebut')) : ""));
    }

    if (mailContent.indexOf("##DATEFINMISSION##") >= 0) {
      mailContent = mailContent.replaceAll("##DATEFINMISSION##", (demande.get_item('DateFin') != null ? new Date(demande.get_item('DateFin')) : ""));
    }

    if (mailContent.indexOf("##MONTANT##") >= 0) {
      mailContent = mailContent.replaceAll("##MONTANT##", (demande.get_item('Montant') != null ? demande.get_item('Montant') : ""));
    }

    if (mailContent.indexOf("##MONTANTDEMANDE##") >= 0) {
      mailContent = mailContent.replaceAll("##MONTANTDEMANDE##", (demande.get_item('MontantSortie') != null ? demande.get_item('MontantSortie') : ""));
    }

    if (mailContent.indexOf("##MONTANTUTILISE##") >= 0) {
      mailContent = mailContent.replaceAll("##MONTANTUTILISE##", (demande.get_item('Montant') != null ? demande.get_item('Montant') : ""));
    }

    if (mailContent.indexOf("##SOLDEAREVERSER##") >= 0) {
      mailContent = mailContent.replaceAll("##SOLDEAREVERSER##", (demande.get_item('Solde') != null ? demande.get_item('Solde') : ""));
    }

    if (mailContent.indexOf("##MONTANTFRAISUTILISE##") >= 0) {
      mailContent = mailContent.replaceAll("##MONTANTFRAISUTILISE##", (demande.get_item('Total') != null ? demande.get_item('Total') : ""));
    }

    if (mailContent.indexOf("##RESPONSABLE##") >= 0) {
      mailContent = mailContent.replaceAll("##RESPONSABLE##", responsable);
    }

    if (mailContent.indexOf("##COMMENTAIRE##") >= 0) {
      mailContent = mailContent.replaceAll("##COMMENTAIRE##", commentaire);
    }

    if (mailContent.indexOf("##DATEREJET##") >= 0) {
      mailContent = mailContent.replaceAll("##DATEREJET##", date);
    }



  }
  else {
    mailContent = "Aucun Mail template trouvé";
  }

  return mailContent;
}

appSpHelper.ReturnMailRecipient = function (demande, tache, mailRecipient) {


  switch (mailRecipient) {
    case appHelper.MailRecipient.ASSIGNEA:
      return (tache.get_item("AssigneAMail") ? tache.get_item("AssigneAMail") : '');

    case appHelper.MailRecipient.DEMANDEUR:
      return (demande.get_item("DemandeurEmail") ? demande.get_item("DemandeurEmail") : '');

    // case appHelper.MailRecipient.N1:
    //   return (demande.get_item("ResponsableN1Email") ? demande.get_item("ResponsableN1Email") : '');

    default:
      return '';

  }

}

// appSpHelper.ReturnMailRecipient = function (demande, tache, mailRecipient) {
//   var ctx = new SP.ClientContext.get_current();
//   var web = ctx.get_web();
//   var list = web.get_lists().getByTitle(appHelper.ListName.Validation);
//   var assignedToColumnName = "AssignedTo";


//   // let GetOneAssignTo = function (userid) {
//   //   arrUser[o] = web.get_siteUsers().getById(userId); // Get the user object using the user ID
//   //   ctx.load(arrUser[o]);
//   // }


//   let BrowseAssignTo = function () {
//     let arrUser = [];
//     var assignedToField = tache.get_item(assignedToColumnName);
//     if (assignedToField) {
//       console.log(assignedToField);
//       assignedToField.forEach(assignto => {
//         let userId = assignto.get_lookupId();
//         arrUser.push(userId);
//       });

//       // for (const assignto in assignedToField) {
//       //   let userId = assignto.get_lookupId();
//       //   arrUser.push(userId);
//       // }
//     }
//     return arrUser;
//   };


//   let DetectAssignTypeByTakeUserMail = function (AssignId) {
//     return new Promise(function (resolve, reject) {
//       ctx.executeQueryAsync(
//         function () {
//           var user = web.get_siteUsers().getById(AssignId); // Get the user object using the user ID
//           ctx.load(user);
//           ctx.executeQueryAsync(
//             function () {
//               assignedToEmail = user.get_email();
//               resolve(assignedToEmail);
//             },
//             function (sender, args) {
//               reject("");
//             }
//           );
//         },
//         function (sender, args) {
//           reject("");
//         }
//       );
//     })
//   }

//   let GetGroupEmailAdresses = function (assignId) {
//     return new Promise(function (resolve, reject) {
//       var ctx = new SP.ClientContext.get_current();
//       var web = ctx.get_web();
//       var group = web.get_siteGroups().getById(assignId);
//       var users = group.get_users();
//       ctx.load(users);
//       ctx.executeQueryAsync(
//         function () {
//           var emailAddresses = [];
//           var userEnumerator = users.getEnumerator();
//           while (userEnumerator.moveNext()) {
//             var user = userEnumerator.get_current();
//             emailAddresses.push(user.get_email());
//           }
//           resolve(emailAddresses);
//         },
//         function (sender, args) {
//           reject("");
//         }
//       );
//     });

//   }


//   let GetAllRecipientMails = function () {
//     let userIds = BrowseAssignTo();
//     let PromResult = [];
//     console.log(userIds);
//     userIds.forEach(id => {
//       var Assign = DetectAssignTypeByTakeUserMail(id);
//       var group = GetGroupEmailAdresses(id);
//       Assign.then((values) => {
//         if (values) PromResult.push(Assign);
//       });
//       group.then((values) => {
//         if (values) PromResult.push(group);
//       });

//     });
//     console.log("PromResult");
//     console.log(PromResult);
//     return PromResult;

//     // Promise.all(PromResult).then((values) => {
//     //   console.log("values");
//     //   console.log(values);
//     //   return values;
//     // });

//   }

//   switch (mailRecipient) {
//     case appHelper.MailRecipient.ASSIGNEA:
//       assignedToColumnName = "AssignedTo";
//       Promise.resolve(GetAllRecipientMails());
//       // return GetAllRecipientMails();

//     case appHelper.MailRecipient.DEMANDEUR:
//       Promise.resolve((demande.get_item("DemandeurEmail") ? demande.get_item("DemandeurEmail") : ''));
//       // return (demande.get_item("DemandeurEmail") ? demande.get_item("DemandeurEmail") : '');

//     case appHelper.MailRecipient.N1:
//       Promise.resolve((demande.get_item("ResponsableN1Email") ? demande.get_item("ResponsableN1Email") : ''));
//       // return (demande.get_item("ResponsableN1Email") ? demande.get_item("ResponsableN1Email") : '');

//     default:
//       return '';

//   }

// }


// appSpHelper.ReturnMailRecipient = function (demande, tache, mailContent) {
//   var ctx = new SP.ClientContext.get_current();
//   var web = ctx.get_web();
//   var list = web.get_lists().getByTitle(appHelper.ListName.Validation);
//   var assignedToColumnName = "AssignedTo";

//   // var listItem = list.getItemById(taskId);

//   let GetAssignAdress = function (t, callBack) {
//     let arrAdresse = [];

//     return new Promise(function (resolve, reject) {
//       ctx.executeQueryAsync(
//         function () {
//           var assignedToField = tache.get_item(assignedToColumnName);
//           if (assignedToField) {
//             var userId = assignedToField[0].get_lookupId(); // Get the ID of the user from the "Assigned To" field
//             var user = web.get_siteUsers().getById(userId); // Get the user object using the user ID
//             ctx.load(user);
//             ctx.executeQueryAsync(
//               function () {
//                 var assignedToEmail = user.get_email(); // Get the email property from the user object
//                 resolve(assignedToEmail);
//               },
//               function (sender, args) {
//                 reject(args.get_message());
//               }
//             );
//           } else {
//             resolve(null); // Assigned To field is empty or not properly configured
//           }
//         },
//         function (sender, args) {
//           reject(args.get_message());
//         }
//       );
//     });



//     appSpHelper
//       .getAssignedToEmail(t.get_item("ID"))
//       .then(function (assignedToEmail) {
//         appHelper.Log(assignedToEmail, appHelper.LogType.WARN, 'getAssignedToEmail(t.get_item("ID"))');
//         if (assignedToEmail) {
//           arrAdresse.push(assignedToEmail);
//           callBack(arrAdresse.concat());
//         } else {
//           callBack("");
//         }
//       })
//       .catch(function (error) {
//         appHelper.Log(error, appHelper.LogType.ERROR);
//         let grp =
//           t.get_item("AssignedTo") != null
//             ? t.get_item("AssignedTo")[0].get_lookupValue()
//             : "";
//         appSpHelper
//           .getGroupMembersLoginNames(grp)
//           .then(function (arrUserLogin) {

//             appHelper.Log(arrUserLogin, appHelper.LogType.WARN, ' appSpHelper.getGroupMembersLoginNames(grp)');
//             appSpHelper
//               .queryEmployeesByLoginNames(arrUserLogin)
//               .then(function (empUsers) {

//                 appHelper.Log(empUsers, appHelper.LogType.ERROR, ".queryEmployeesByLoginNames(arrUserLogin)");

//                 empUsers.forEach(function (empUser, idx) {
//                   let EmpMail =
//                     empUser.get_item("EmpMail") != null
//                       ? empUser.get_item("EmpMail").toString().trim()
//                       : "";
//                   if (EmpMail) {
//                     arrAdresse.push(EmpMail);
//                   }
//                 });

//                 appHelper.Log(arrAdresse);
//                 callBack(arrAdresse.concat());
//               })
//               .catch(function (error) {
//                 appHelper.Log(error, appHelper.LogType.ERROR);
//               });
//           })
//           .catch(function (error) {
//             appHelper.Log(error, appHelper.LogType.ERROR);
//           });
//       });
//   };
// }

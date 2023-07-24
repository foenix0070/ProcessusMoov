var appSpHelper = appSpHelper || {};

appSpHelper.writeError = function(sender, args){

  console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());

}

appSpHelper.GetPeoplePickerVal = function (peoplePickerId) {
  var finalusers = new Array();
  var peoplePickerTopId = peoplePickerId + "_TopSpan";
  var peoplePicker = window.SPClientPeoplePicker.SPClientPeoplePickerDict[peoplePickerTopId];
  var users = peoplePicker.GetAllUserInfo();
  for (var i = 0; i < users.length; i++) {
    finalusers.push(window.SP.FieldUserValue.fromUser(users[i].Key));
  }
  return finalusers;
}

appSpHelper.GetPeoplePickerValLogin = function (peoplePickerId) {
  //var peoplePicker = SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerDiv_TopSpan;
  // Get information about all users.
  var finalusersLogin = "";

  var peoplePickerTopId = peoplePickerId + "_TopSpan";
  var peoplePicker = window.SPClientPeoplePicker.SPClientPeoplePickerDict[peoplePickerTopId];
  //var peoplePicker = peoplePickerID_TopSpan;
  var users = peoplePicker.GetAllUserInfo();
  // Get user keys.
  //var keys = peoplePicker.GetAllUserKeys();
  for (var i = 0; i < users.length; i++) {
      //var arryuser = users[i];
      if (i === 0) {
          finalusersLogin = users[i].Key;
      }
      else {
          finalusersLogin += "##ZL##" + users[i].Key;
      }
  }
  return finalusersLogin;
}

appSpHelper.GetTPeoplePicker = function (peoplePickerId) {
  var t = ["FUValue", "Email", "Login", "Name"];
  var usersFuValue = [];
  var usersEmail = [];
  var usersLogin = [];
  var usersName = [];
  var peoplePickerTopId = peoplePickerId + "_TopSpan";
  var peoplePicker = window.SPClientPeoplePicker.SPClientPeoplePickerDict[peoplePickerTopId];
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
}

appSpHelper.SetPeoplePickerField = function (peoplePickerId,userAccountName) {
  var peoplePicker = null;
  try {
      //SharePoint 2013
      //var travelPeoplePicker = null;
      var peoplePickerTopId = peoplePickerId + "_TopSpan";
      peoplePicker = window.SPClientPeoplePicker.SPClientPeoplePickerDict[peoplePickerTopId];
      if (peoplePicker != null) {
          var usrObj = {
              'Key': userAccountName
          };
          peoplePicker.AddUnresolvedUser(usrObj, true);
          //$("input[title='TravelRequestor']").focus().val(strUserName).attr("size", strUserName.length);
      }
  }
  catch (e) {
      //alert(e);
  }
}

appSpHelper.SetAndResolvePeoplePicker = function (peoplePickerId, userAccountName) {

  //var _PeoplePicker = $("div[title='" + fieldName + "']");

  var peoplePickerTopId = peoplePickerId + "_TopSpan" ;

  var peoplePickerEditer = $("input[id='" + peoplePickerTopId + "_HiddenInput']");

  userAccountName.split(";#").forEach(function (part) {

      if (part) {

          peoplePickerEditer.val(part);

          var peoplePickerOject = window.SPClientPeoplePicker.SPClientPeoplePickerDict[peoplePickerTopId];

          peoplePickerOject.AddUnresolvedUserFromEditor(true);

      }

  });

}

appSpHelper.CheckPplpickerEntry  = function (peoplePickerId)
{
  var checker = false;
  var peoplePickerTopId = peoplePickerId + "_TopSpan";
  var peoplePicker = window.SPClientPeoplePicker.SPClientPeoplePickerDict[peoplePickerTopId];
  //var peoplePicker = PplpickerObject_TopSpan;
  var users = peoplePicker.GetAllUserInfo();
  if (users.length > 0)
      checker = true;

  return checker;
}

appSpHelper.InitializePeoplePicker = function(peoplePickerElementId,mutipleSelection,width) {

  // Create a schema to store picker properties, and set the properties.
  if(!width)
  { width = '320px' }

  if (!mutipleSelection)
  { mutipleSelection = false}

  var schema = {};
  schema['PrincipalAccountType'] = 'User,DL,SecGroup,SPGroup';
  schema['SearchPrincipalSource'] = 15;
  schema['ResolvePrincipalSource'] = 15;
  schema['AllowMultipleValues'] = mutipleSelection;
  schema['MaximumEntitySuggestions'] = 50;
  schema['Width'] = width;

  // Render and initialize the picker.
  // Pass the ID of the DOM element that contains the picker, an array of initial
  // PickerEntity objects to set the picker value, and a schema that defines
  // picker properties.
  SPClientPeoplePicker_InitStandaloneControlWrapper(peoplePickerElementId, null, schema);
}


appSpHelper. PeoplePickerOnChangeEvent = function(peoplePickerElementId, callback) {
  var ppId = peoplePickerElementId + "_TopSpan";
  var addOnChanged = function (ctx) {
      if (window.SPClientPeoplePicker && window.SPClientPeoplePicker.SPClientPeoplePickerDict && window.SPClientPeoplePicker.SPClientPeoplePickerDict[ppId]) {
          var picker = window.SPClientPeoplePicker.SPClientPeoplePickerDict[ppId];
          picker.oldChanged = picker.OnControlResolvedUserChanged;
          picker.OnControlResolvedUserChanged = function () {
              if (picker.TotalUserCount !== 0) {
                  setTimeout(function () {
                      var tUserInfo = picker.GetAllUserInfo();
                      if (tUserInfo.length > 0) {
                          var user = tUserInfo[tUserInfo.length - 1];
                          callback(user.Key);
                      }
                  }, 100);
              }
              picker.oldChanged();
          };
      }
      else {
          setTimeout(function () {
              addOnChanged(ctx);
          }, 100)
      }
  };

  addOnChanged();
}

appSpHelper.ClearPeopleFieldValue = function(peoplePickerElementId) {

  var listSpanUserSelected = $("#" + peoplePickerElementId + "_TopSpan_ResolvedList > .sp-peoplepicker-userSpan");

  for (var i = 0; i < listSpanUserSelected.length; i++) {
      window.SPClientPeoplePickerProcessedUser.DeleteProcessedUser(listSpanUserSelected[0]);
  }

  $("#" + peoplePickerElementId + "_TopSpan_InitialHelpText").show();

}

appSpHelper.GetProperties = function(prefixControle,  userLogin, callBack){

    let clientContext = new SP.ClientContext.get_current();
    let peopleManager = new SP.UserProfiles.PeopleManager(clientContext);
    let  personProperties = peopleManager.getPropertiesFor(userLogin);
    clientContext.load(personProperties);
    clientContext.executeQueryAsync(function() {

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
       selector = `Txt${prefixControle}DisplayName`
      document.getElementById(selector).innerHTML =(personProperties.get_displayName());
      selector = `Txt${prefixControle}Login`;
      document.getElementById(selector).innerHTML =(personProperties.get_userProfileProperties()['AccountName']);
      selector = `Txt${prefixControle}Email`;
      document.getElementById(selector).innerHTML =(personProperties.get_userProfileProperties()['WorkEmail']);

      if(callBack){
        callBack();
      }

    }, appSpHelper.writeError);

};

appSpHelper.GetMyProperties = function ( callBack) {

  let clientContext = new SP.ClientContext.get_current();
  let oWeb = clientContext.get_web();
  currentUser = oWeb.get_currentUser();
  clientContext.load(currentUser);
  clientContext.executeQueryAsync(
    function(){

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

      document.getElementById('TxtCurrentUserLogin').value = currentUser.get_loginName();
      document.getElementById('TxtCurrentUserDisplayName').value = currentUser.get_title();
      document.getElementById('TxtCurrentUserEmail').value = currentUser.get_email();


      if(callBack){
        callBack();
      }

    }
    , appSpHelper.writeError);

}


appSpHelper. GetEmploye = function(listeName, login , callBack){
  let  targetList = clientContext.get_web().get_lists().getByTitle(listeName);
  let camlQuery = new SP.CamlQuery();

  if(login.indexOf('\\') > -1){
    login = login.split('\\')[1];
    login = login.trim();
  }
console.log(login);
  let q = '<View><Query><Where><Eq><FieldRef Name="Title" /><Value Type="Text">' + login + '</Value></Eq></Where></Query></View>';
  camlQuery.set_viewXml(q);
  let collListItemInfo = targetList.getItems(camlQuery);
  clientContext.load(collListItemInfo);
  clientContext.executeQueryAsync(function (s, a) {
    let listItemEnumerator = collListItemInfo.getEnumerator();
    let oListItem = null;
    while (listItemEnumerator.moveNext()) {
       oListItem = listItemEnumerator.get_current();
    }
if(callBack){callBack(oListItem);}
  }, appSpHelper.writeError);
}

appSpHelper. LoadUserCongeParam = function ( listeName, login , callBack) {
  let  targetList = clientContext.get_web().get_lists().getByTitle(listeName);
  let camlQuery = new SP.CamlQuery();

  if(login.indexOf('|') > -1){
    login = login.split('|')[1];
    login = login.trim();
  }

  let q = '<View><Query><Where><Eq><FieldRef Name="EmpLogin" /><Value Type="Text">' + login + '</Value></Eq></Where></Query></View>';
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

               mail =  oListItem.get_item("EmpMail") != null ? oListItem.get_item("EmpMail") : '';
              nbrejrsAcquis = oListItem.get_item("NombreJoursAcquis") != null ? oListItem.get_item("NombreJoursAcquis") : 0;
              gender = oListItem.get_item("Gender") ? 1 : 0;
              employeeId = oListItem.get_item("ID") != null ? oListItem.get_item("ID") : 0;
              depId = oListItem.get_item("DepartementID") != null ? oListItem.get_item("DepartementID") : 0;
              matricule = oListItem.get_item("EmpMatricule") != null ? oListItem.get_item("EmpMatricule") : '0000';

              break;
          }


          document.getElementById('TxtSpEmpMail').value = (mail);
          document.getElementById('TxtSpUserMatricule').value = (matricule);
          document.getElementById('TxtSpUserNbreJrsAcquis').value = (nbrejrsAcquis);
          document.getElementById('TxtSpEmployeeID').value = (employeeId);
          document.getElementById('TxtSpDepartementID').value = (depId);
          document.getElementById('TxtGender').value = (gender);

          appSpHelper.GetEmployeeManagerLogin( 'N1', oListItem.get_item("EmpManager"), function(){
            if(callBack){
              callBack();
            }
          });



      }
  }, appSpHelper.writeError);
}

appSpHelper. GetEmployeeManagerLogin = function(niveau,  manager , callBack) {
  if (manager != null) {
      var user = clientContext.get_web().ensureUser(manager.get_lookupValue());
      clientContext.load(user);
      clientContext.executeQueryAsync(
      function () {

        if(niveau == 'N1'){
          document.getElementById('TxtSpManagerN1Login').value = (user.get_loginName());
          document.getElementById('TxtSpManagerN1Email').value = (user.get_email());
        }

        if(niveau == 'N2'){
          document.getElementById('TxtSpManagerN2Login').value = (user.get_loginName());
          document.getElementById('TxtSpManagerN2Email').value = (user.get_email());
        }

        if(callBack){
          callBack();
        }

      }, appSpHelper.writeError);
  }
}


appSpHelper.CheckAttachmentFolder = function(ctx, id, listName, callBack){

  let oWeb = ctx.get_web();
  let oList = ctx.get_web().get_lists().getByTitle(listName);

  ctx.load(oWeb);
  ctx.load(oList);
  ctx.executeQueryAsync(function(){
    let oListItem = oList.getItemById(id);
  ctx.load(oListItem);
  ctx.executeQueryAsync(function(){
    if (!oListItem.get_fieldValues()['Attachments'])
    {
        //Get attachment folder and attachment folderrurl
        let attachmentsFolder = oWeb.getFolderByServerRelativeUrl('Lists/' + listName + '/Attachments');
        let attachmentsFolderURL = oWeb.get_serverRelativeUrl() + 'Lists/' + listName + '/Attachments';

        //Create Attachment Folder
        attachmentsFolder = attachmentsFolder.get_folders().add('_' + id);
        attachmentsFolder.moveTo(attachmentsFolderURL + '/' + id);

        //Load Client Context and execute the batch
        ctx.load(attachmentsFolder);
        ctx.executeQueryAsync(function(){

          if(callBack){
            callBack();
          }

        }, appSpHelper.writeError);
    }

  }, appSpHelper.writeError);
}, appSpHelper.writeError);
}
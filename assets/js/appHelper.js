var appHelper = appHelper || {};

 appHelper.AppConstante = {
   RootSiteUrl: 'https://vminsideweb01/',
   SiteUrl: 'https://vminsideweb01/sites/proc/',
   SiteJsUrl: 'https://vminsideweb01/sites/proc/tools/',
   LienSiteJsUrl: 'https://vminsideweb01/sites/proc/tools//index.aspx',
   MIMailSender: "no-reply-MI@moov-africa.ci",
   IsDevEnvironment: true
 }


// appHelper.AppConstante = {
//   RootSiteUrl: 'https://vminsideweb01.etisalat-africa.net/',
//   SiteUrl: 'https://vminsideweb01.etisalat-africa.net/sites/proc/',
//   SiteJsUrl: 'https://vminsideweb01.etisalat-africa.net/sites/proc/tools/',
//   LienSiteJsUrl: 'https://vminsideweb01.etisalat-africa.net/sites/proc/tools//index.aspx',
//   MIMailSender: "moovinside@moov-africa.ci",
//   IsDevEnvironment: true
// }


appHelper.TacheAction = {
  NOUVEAU: 'NOUVEAU',
  VALIDATION: 'VALIDEE',
  MODIFICATION: 'DEMANDEMODIFICATION',
  REJET: 'REJETEE'
};

appHelper.MailRecipient = {
  ASSIGNEA: 'ASSIGNEA',
  DEMANDEUR: 'DEMANDEUR',
  N1: 'DEMANDEURN1'
};

appHelper.ListName = {
  AppListe: 'tools',
  Conge: 'ListeConge',
  Gadget: 'ListeGadget',
  Vehicule: 'ListeVehicule',
  Materiel: 'ListeMateriel',
  Absence: 'ListeAbsence',
  Employe: 'ListeEmploye',
  TypeConge: 'ListeTypeConge',
  TypeAbsence: 'ListeTypeAbsence',
  Validation: 'TachesValidation',
  Notification: 'ListeNotification',
  Mission: 'ListeMission',
  FraisMission: 'ListeFraisMission',
  RegularisationFraisMission: 'ListeRegularisationFraisMission',
  SortieCaisse: 'ListeSortieCaisse',
  RegularisationSortieCaisse: 'ListeRegularisationSortieCaisse',

  Template: 'ListeTemplateMail',
  Interim: 'ListeInterimaire',
  Reprise: 'ListeReprise',
  Preference: 'ListePreferenceSuivie',
  NoteInformation : 'ListeNoteFormInformation',

  MotifMission :'ListeMissionMotif',
  Mode: 'ListeModePaiement',
  Caisse: 'ListeCaissePaiement',
  Zone: 'ListeZoneGeographique',

  MissionIntervention: 'ListeMissionTypeIntervention',
  MissionDestination: 'ListeMissionDestination',
  MissionMotif: 'ListeMissionMotif',
  MissionSiteBTS: 'ListeMissionSiteBTS',
  MissionDetailsIntitule : 'ListeMissionDetailsIntitule',
};

appHelper.Status = {
  ENATTENTE: 'ENATTENTE',
  VALIDEE: 'VALIDEE',
  REJETEE: 'REJETEE',
  DEMANDEMODIFICATION: 'DEMANDEMODIFICATION',
  ENCOURS: 'ENCOURS',
  ENCONGE: 'ENCONGE',
  RETOURCONGE: 'RETOURCONGE',
  TERMINEE: 'TERMINEE',

  GetClass: function (statut) {
    switch (statut.toString()) {
      case appHelper.Status.VALIDEE: return 'succed'; break;
      case appHelper.Status.REJETEE: return 'closed'; break;
      case appHelper.Status.ENCOURS: return 'wait'; break;
      case appHelper.Status.ENCONGE: return 'wait'; break;
      case appHelper.Status.RETOURCONGE: return 'wait'; break;
      case appHelper.Status.TERMINEE: return 'gray'; break;
      case appHelper.Status.ENATTENTE: return 'gray'; break;
    }
  }
};

appHelper.AppCode = {
  VEHICULE: 'VEHICULE',
  MATERIEL: 'MATERIEL',
  GADGET: 'GADGET',
  CONGE: 'CONGE',
  ABSENCE: 'ABSENCE',
  MISSION: 'MISSION',
  SORTIECAISSESUP500K: 'SORTIECAISSESUP500K',
  MISSIONSUP500K : 'MISSIONSUP500K',
  FRAISMISSION: 'FRAISMISSION',
  REGULARISATIONFRAISMISSION: 'REGULARISATIONFRAISMISSION',
  SORTIECAISSE: 'SORTIECAISSE',
  REGULARISATIONSORTIECAISSE: 'REGULARISATIONSORTIECAISSE',
  REPRISE: 'REPRISE'
}

appHelper.LogType = {
  INFO: 'INFO',
  ERROR: 'ERROR',
  WARN: 'WARNING',
  LOG: 'LOG'
};


appHelper.Log = function (msg, type = appHelper.LogType.LOG, appName = 'MI') {
  if (appHelper.AppConstante.IsDevEnvironment) {
    switch (type) {
      case appHelper.LogType.INFO:
        console.info(appName, msg);
        break;
      case appHelper.LogType.ERROR:
        console.error(appName, msg);
        break;
      case appHelper.LogType.WARN:
        console.warn(appName, msg);
        break;
      default:
        console.log(appName, msg); // Par défaut, utilisez console.log pour les autres types de journalisation
        break;
    }
  }
}

appHelper.GetMainListNameFromAppCode = function (key) {

  switch (key) {
    case appHelper.AppCode.ABSENCE:
      return appHelper.ListName.Absence;
    case appHelper.AppCode.CONGE:
      return appHelper.ListName.Conge;
    case appHelper.AppCode.FRAISMISSION:
      return appHelper.ListName.Mission;
    case appHelper.AppCode.GADGET:
      return appHelper.ListName.Gadget;
    case appHelper.AppCode.MATERIEL:
      return appHelper.ListName.Materiel;
    case appHelper.AppCode.MISSION:
      return appHelper.ListName.Mission;
    case appHelper.AppCode.REGULARISATIONFRAISMISSION:
      return appHelper.ListName.RegularisationFraisMission;
    case appHelper.AppCode.REGULARISATIONSORTIECAISSE:
      return appHelper.ListName.RegularisationSortieCaisse;
    case appHelper.AppCode.SORTIECAISSE:
      return appHelper.ListName.SortieCaisse;
    case appHelper.AppCode.VEHICULE:
      return appHelper.ListName.Vehicule;
    case appHelper.AppCode.REPRISE:
      return appHelper.ListName.Reprise;

    default:
      return '';
  }
};

appHelper.receiptTask = function (it, callBack) {
  let msg = `<div style="padding: 20px;
  background-color: #2eb886;
  color: white;
  margin-bottom: 15px;">
  Votre action a été enregistrée dans le système !
 </div>`;
  bootbox.alert(msg, function () {
    if (callBack) {
      callBack();
    }
  });

}

appHelper.getDemandeOrigin = function (_parent, _parentid, callBack) {
  let ctx = new SP.ClientContext.get_current();
  let _list_name = appHelper.GetMainListNameFromAppCode(_parent);
  appHelper.Log(_list_name);

  if (_list_name) {
    let oList = ctx.get_web().get_lists().getByTitle(_list_name);
    let It = oList.getItemById(_parentid);
    It.update();
    ctx.load(It);
    appHelper.Log(_parentid, appHelper.LogType.INFO, 'getDemandeOrigin');
    ctx.executeQueryAsync(function () {
      appHelper.Log(It, appHelper.LogType.INFO, 'getDemandeOrigin');
      if (callBack) {
        callBack(It);
      }
    }, appSpHelper.writeError);
  } else {
    if (callBack) {
      callBack(null);
    }
  }
}

appHelper.parseBool = function (str) {
  return /^(true|1)$/i.test(str);
}

appHelper.getReference = function (code) {
  const date = new Date();
  const annee = date.getFullYear();
  const mois = (date.getMonth() + 1).toString().padStart(2, "0");
  const jour = date.getDate().toString().padStart(2, "0");
  const composantAleatoire = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  const referenceFacture = code + `-${annee}${mois}${jour}-${composantAleatoire}`;
  return referenceFacture;
};

appHelper.isArray = function (myArray) {
  return myArray.constructor.toString().indexOf("Array") > -1;
}

appHelper.GetQueryStringFromAjaxQuery = function (param) {
  var vars = {};
  param = param.trim().toLocaleLowerCase();
  sessionStorage.getItem("ajax_url").replace(location.hash, '').replace(
    /[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
    function (m, key, value) { // callback
      key = key.toLocaleLowerCase();
      vars[key] = value !== undefined ? value : '';
    }
  );
  if (param) {
    return vars[param] ? decodeURI(vars[param]) : null;
  }
  return vars;
}

appHelper.getQueryStringParameter = function (paramToRetrieve) {
  paramToRetrieve = paramToRetrieve.trim().toLocaleLowerCase();
  var params = document.URL.toLocaleLowerCase().split("?")[1].split("&");
  var strParams = "";
  for (var i = 0; i < params.length; i = i + 1) {
    var singleParam = params[i].split("=");
    if (singleParam[0] == paramToRetrieve) {
      return singleParam[1];
    }
  }
}

appHelper.startSkeleton = function (container) {

  let content = document.getElementById(container);
  content.innerHTML = `
  <div class="skeleton">
    <div class="skeleton-avatar"></div>
    <div class="skeleton-content">
      <div class="skeleton-line"></div>
      <div class="skeleton-line"></div>
      <div class="skeleton-line"></div>
    </div>
  </div>
`;
}

appHelper.LisetenOffCanvas = function (offCavasId, openCallBack, closeCallBack) {

  document.addEventListener('shown.bs.offcanvas', function (event) {
    var offcanvas = event.target;
    var offcanvasId = offcanvas.getAttribute('id');

    if (offcanvasId == offCavasId) {
      if (openCallBack) {
        openCallBack();
      }
    }

  });

  document.addEventListener('hidden.bs.offcanvas', function (event) {
    var offcanvas = event.target;
    var offcanvasId = offcanvas.getAttribute('id');
    if (offcanvasId == offCavasId) {
      if (closeCallBack) {
        closeCallBack();
      }
    }
  });

};

appHelper.navigation = function (container, url) {

  url = `${appHelper.AppConstante.SiteUrl}\\${url}`;
  sessionStorage.setItem("ajax_url", url);
  container = container ? container : "DivMainPageContainer";

  appHelper.startSkeleton(container);
  fetch(url)
    .then((response) => response.text())
    .then((data) => {
      let elm = document.getElementById(container);
      document.getElementById(container).innerHTML = data;

      Array.from(elm.querySelectorAll("script"))
        .forEach(oldScriptEl => {
          const newScriptEl = document.createElement("script");
          Array.from(oldScriptEl.attributes).forEach(attr => {
            newScriptEl.setAttribute(attr.name, attr.value)
          });
          const scriptText = document.createTextNode(oldScriptEl.innerHTML);
          newScriptEl.appendChild(scriptText);
          oldScriptEl.parentNode.replaceChild(newScriptEl, oldScriptEl);
        });

    })
    .catch((error) => {
      appHelper.Log(error, appHelper.LogType.ERROR, "Une erreur s'est produite lors de la navigation: ");

    });
};



appHelper.navigation2 = function (container, url) {

  url = url;
  sessionStorage.setItem("ajax_url", url);
  container = container ? container : "DivMainPageContainer";

  appHelper.startSkeleton(container);
  fetch(url)
    .then((response) => response.text())
    .then((data) => {
      let elm = document.getElementById(container);
      document.getElementById(container).innerHTML = data;

      Array.from(elm.querySelectorAll("script"))
        .forEach(oldScriptEl => {
          const newScriptEl = document.createElement("script");
          Array.from(oldScriptEl.attributes).forEach(attr => {
            newScriptEl.setAttribute(attr.name, attr.value)
          });
          const scriptText = document.createTextNode(oldScriptEl.innerHTML);
          newScriptEl.appendChild(scriptText);
          oldScriptEl.parentNode.replaceChild(newScriptEl, oldScriptEl);
        });

    })
    .catch((error) => {
      appHelper.Log(error, appHelper.LogType.ERROR, "Une erreur s'est produite lors de la navigation: ");

    });
};

appHelper.listenNavigationOffCanvas = function (lienNavigation, offCanvasid) {

  document.addEventListener("click", function (event) {
    App.Counter++;
    var target = event.target;
    if (target) {

      let container = false;
      let url = false;
      appHelper.Log(target.classList, lienNavigation, '_8_');
      if (target.classList.contains(lienNavigation)) {

        event.preventDefault(); // Empêcher le comportement par défaut du lien
        appHelper.LisetenOffCanvas(offCanvasid, function () {

          try {
            container = target.getAttribute("data-target");
          } catch (e) { appHelper.Log(e, appHelper.LogType.ERROR, "appHelper.listenNavigationOffCanvas"); }

          try {
            url = target.getAttribute("data-url");
            url = url;
          } catch (e) { appHelper.Log(e, appHelper.LogType.ERROR, "appHelper.listenNavigationOffCanvas"); }

          appHelper.Log(container, url);
          appHelper.navigation(container, url);

        }, null)

      }
    }
  });
};


appHelper.listenNavigationModal = function (lienNavigation) {
  document.addEventListener("click", function (event) {
    var target = event.target;
    if (target) {

      let container = false;
      let url = false;
      if (target.classList.contains(lienNavigation)) {
        event.preventDefault();
        try {
          container = target.getAttribute("data-target");
        } catch (e) { appHelper.Log(e, appHelper.LogType.ERROR, "appHelper.listenNavigationModal"); }

        try {
          url = target.getAttribute("data-url");

        } catch (e) { appHelper.Log(e, appHelper.LogType.ERROR, "appHelper.listenNavigationModal"); }

        appHelper.navigation2(container, url);
      }
    }
  });
};


appHelper.listenNavigationLink2 = function (lienNavigation) {
  document.addEventListener("click", function (event) {
    var target = event.target;
    if (target) {

      let container = false;
      let url = false;
      if (target.classList.contains(lienNavigation)) {
        event.preventDefault();
        try {
          container = target.getAttribute("data-target");
        } catch (e) { appHelper.Log(e, appHelper.LogType.ERROR, "appHelper.listenNavigationLink2"); }

        try {
          url = target.getAttribute("data-url");

        } catch (e) { appHelper.Log(e, appHelper.LogType.ERROR, "appHelper.listenNavigationLink2"); }

        appHelper.navigation2(container, url);
      }
    }
  });
};

appHelper.listenNavigationLink = function (lienNavigation) {
  document.addEventListener("click", function (event) {
    var target = event.target;
    if (target) {

      let container = false;
      let url = false;
      if (target.classList.contains(lienNavigation)) {
        event.preventDefault();
        try {
          container = target.getAttribute("data-target");
        } catch (e) { appHelper.Log(e, appHelper.LogType.ERROR, "appHelper.listenNavigationLink"); }

        try {
          url = target.getAttribute("data-url");
          if (url.valueOf.toString().indexOf(appHelper.AppConstante.SiteUrl) < 0) {
            url = url;
          }
        } catch (e) { appHelper.Log(e, appHelper.LogType.ERROR, "appHelper.listenNavigationLink"); }

        appHelper.navigation(container, url);
      }
    }
  });
};

appHelper.renderTemplate = function (tmplID, contenairID, viewData) {
  let tmp = document.getElementById(tmplID).innerText;
  let o = Mustache.render(tmp, viewData);
  document.getElementById(contenairID).innerHTML = o;
};

appHelper.ConvertOctetToKo = function (octet) {
  return (octet / 1024).toFixed(2) + " Ko";
}

appHelper.ISODateString = function (d) {
  function pad(n) {
    return n < 10 ? "0" + n : n;
  }
  return (
    d.getUTCFullYear() +
    "-" +
    pad(d.getUTCMonth() + 1) +
    "-" +
    pad(d.getUTCDate()) +
    "T" +
    pad(d.getUTCHours()) +
    ":" +
    pad(d.getUTCMinutes()) +
    ":" +
    pad(d.getUTCSeconds()) +
    "Z"
  );
};

appHelper.ReturnInternationnalDate = function (dateValue, lang, separateur) {
  retour = "02/02/2015";
  T = dateValue.split("/");
  if (T.length == 3) {
    switch (lang) {
      case "FR":
        retour = T[2] + separateur + T[1] + separateur + T[0];
        break;
      case "EN":
        retour = T[2] + separateur + T[0] + separateur + T[1];
        break;
    }
  }
  return retour;
};

appHelper.ToLocalDateString = function (isoDate) {
  //var date = Date(IsoDate)
  return (
    (new Date(isoDate).getDate() < 10
      ? "0" + new Date(isoDate).getDate()
      : new Date(isoDate).getDate()) +
    "/" +
    (new Date(isoDate).getMonth() < 9
      ? "0" + (new Date(isoDate).getMonth() + 1)
      : new Date(isoDate).getMonth() + 1) +
    "/" +
    new Date(isoDate).getFullYear()
  );
};

appHelper.ToLocalTimeString = function (isoDate) {
  //var date = Date(IsoDate)
  return (
    (new Date(isoDate).getHours() < 10
      ? "0" + new Date(isoDate).getHours()
      : new Date(isoDate).getHours()) +
    ":" +
    (new Date(isoDate).getMinutes() < 10
      ? "0" + new Date(isoDate).getMinutes()
      : new Date(isoDate).getMinutes())
  );
};

appHelper.ReturnISODate = function (frenchDate, heure) {
  if (heure == null || heure === "") {
    heure = "08:00";
  }

  if (frenchDate == null || frenchDate === "") {
    frenchDate = ToLocalDateString(new Date());
  }

  return (
    appHelper.ReturnInternationnalDate(frenchDate, "FR", "-") +
    "T" +
    heure +
    ":00.000Z"
  );
};

appHelper.workingDaysBetweenDates = function (d0, d1) {
  var holidays = ['2016-05-03', '2016-05-05'];
  var startDate = parseDate(d0);
  var endDate = parseDate(d1);
  // Validate input
  if (endDate < startDate) {
    return 0;
  }
  // Calculate days between dates
  var millisecondsPerDay = 86400 * 1000; // Day in milliseconds
  startDate.setHours(0, 0, 0, 1);  // Start just after midnight
  endDate.setHours(23, 59, 59, 999);  // End just before midnight
  var diff = endDate - startDate;  // Milliseconds between datetime objects
  var days = Math.ceil(diff / millisecondsPerDay);

  // Subtract two weekend days for every week in between
  var weeks = Math.floor(days / 7);
  days -= weeks * 2;

  // Handle special cases
  var startDay = startDate.getDay();
  var endDay = endDate.getDay();

  // Remove weekend not previously removed.
  if (startDay - endDay > 1) {
    days -= 2;
  }
  // Remove start day if span starts on Sunday but ends before Saturday
  if (startDay == 0 && endDay != 6) {
    days--;
  }
  // Remove end day if span ends on Saturday but starts after Sunday
  if (endDay == 6 && startDay != 0) {
    days--;
  }
  /* Here is the code */
  for (var i in holidays) {
    if ((holidays[i] >= d0) && (holidays[i] <= d1)) {
      days--;
    }
  }
  return days;
}

appHelper.generateUUID = function () {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
};

appHelper.nameSpaceExists = function (namespace) {
  var tokens = namespace.split('.');
  return tokens.reduce(function (prev, curr) {
    return (typeof prev == "undefined") ? prev : prev[curr];
  }, window);
};

appHelper.loadJSWithNameSpace = function (scriptName, namespace, scriptUrl) {
  let _NameSpace = appHelper.nameSpaceExists(namespace)
  if (_NameSpace) {
    _NameSpace.InitializePage();
  } else {
    var head = document.getElementsByTagName('head').item(0);
    var js = document.getElementById(scriptName);
    js = document.createElement('script');
    js.id = scriptName;
    js.src = appHelper.AppConstante.SiteJsUrl + scriptUrl + "?time=" + new Date().getTime();
    document.getElementsByTagName('head')[0].appendChild(js);
  }
};

appHelper.loadJS = function (scriptName, scriptUrl) {
  var head = document.getElementsByTagName('head').item(0);
  var js = document.getElementById(scriptName);

  if (js) {
    appHelper.unloadJS(scriptName);
  }
  js = document.createElement('script');
  js.id = scriptName;
  js.src = appHelper.AppConstante.SiteJsUrl + scriptUrl + "?time=" + new Date().getTime();
  document.getElementsByTagName('head')[0].appendChild(js);
};

appHelper.unloadJS = function (scriptName) {
  var head = document.getElementsByTagName('head').item(0);
  var js = document.getElementById(scriptName);
  js.parentNode.removeChild(js);
  //callback.call();
};

appHelper.unloadAllJS = function () {
  var jsArray = new Array();
  jsArray = document.getElementsByTagName('script');
  for (i = 0; i < jsArray.length; i++) {
    if (jsArray[i].id) {
      appHelper.unloadJS(jsArray[i].id)
    } else {
      jsArray[i].parentNode.removeChild(jsArray[i]);
    }
  }
};

appHelper.GetSelectedFiles = function (id, libraryName, callBack) {
  var TFiles = [];
  $(".fileUpload").each(function () {
    var that = this;
    if (that.files.length > 0) {
      TFiles.push(that.files[0]);
    }
  });
  spFileHelper.uploadDocuments(TFiles, true, libraryName, id, null, function () {
    if (callBack) {
      callBack();
    }
  });

}

appHelper.AttachFile = function (clientContext, demandeid, arrayBuffer, fileName, listName, callBack) {

  //Get Client Context and Web object.
  var oWeb = clientContext.get_web();
  appHelper.ensureAttachmentFolder(clientContext, listName, demandeid,
    function () {
      //Get list and Attachment folder where the attachment of a particular list item is stored.
      var oList = oWeb.get_lists().getByTitle(listName);
      var urlToAttach = 'Lists/' + listName + '/Attachments/' + demandeid + '/'
      var attachmentFolder = oWeb.getFolderByServerRelativeUrl(urlToAttach);
      console.log(urlToAttach);
      console.log(attachmentFolder);
      //Convert the file contents into base64 data
      var bytes = new Uint8Array(arrayBuffer);
      var i, length, out = '';
      for (i = 0, length = bytes.length; i < length; i += 1) {
        out += String.fromCharCode(bytes[i]);
      }
      console.log("Test");
      var base64 = btoa(out);
      base64 =
        //Create FileCreationInformation object using the read file data
        createInfo = new SP.FileCreationInformation();
      createInfo.set_content(base64);
      createInfo.set_url(fileName);
      console.log(fileName);
      console.log(attachmentFolder.get_files().length);
      //Add the file to the list item
      attachmentFiles = attachmentFolder.get_files().add(createInfo);
      //Load client context and execute the batch
      clientContext.load(attachmentFiles);
      clientContext.executeQueryAsync(function () {
        if (callBack) {
          callBack();
        }
      }, appSpHelper.writeError);
    },
    function () { })
};


appHelper.ensureAttachmentFolder = function (ctx, listTitle, itemId, success, error) {

  //var ctx = SP.ClientContext.get_current();

  var web = ctx.get_web();

  var list = web.get_lists().getByTitle(listTitle);

  ctx.load(list, 'RootFolder');

  var item = list.getItemById(itemId);

  ctx.load(item);

  ctx.executeQueryAsync(

    function () {

      var attachmentsFolder;

      if (!item.get_fieldValues()['Attachments']) { /* Attachments folder exists? */
        var attachmentRootFolderUrl = String.format('{0}/Attachments', list.get_rootFolder().get_serverRelativeUrl());

        var attachmentsRootFolder = ctx.get_web().getFolderByServerRelativeUrl(attachmentRootFolderUrl);

        //Note: Here is a tricky part.
        //Since SharePoint prevents the creation of folder with name that corresponds to item id, we are going to:
        //1)create a folder with name in the following format '_<itemid>'
        //2)rename a folder from '_<itemid>'' into '<itemid>'
        //This allow to bypass the limitation of creating attachment folders
        attachmentsFolder = attachmentsRootFolder.get_folders().add('_' + itemId);

        attachmentsFolder.moveTo(attachmentRootFolderUrl + '/' + itemId);

        ctx.load(attachmentsFolder);

      }
      else {

        var attachmentFolderUrl = String.format('{0}/Attachments/{1}', list.get_rootFolder().get_serverRelativeUrl(), itemId);

        attachmentsFolder = ctx.get_web().getFolderByServerRelativeUrl(attachmentFolderUrl);

        ctx.load(attachmentsFolder);

      }

      ctx.executeQueryAsync(

        function () {

          success(attachmentsFolder);

        },

        error);

    },

    error);

}

appHelper.upploadAttachmentFiles = function (inputFileId, itemId, listName, j, callback) {

  // Get test values from the file input and text input page controls.

  var tFiles = document.getElementById(inputFileId).files;

  //var fileInput = jQuery('#inputFileId');

  if (tFiles.length > 0) {

    var tFn = tFiles[j].name.split(".")

    var fExt = tFn.splice((tFn.length - 1), 1)

    var nouveaunon = tFn.join("").replace(/[^a-zA-Z0-9]+/g, "");

    //var fileName = escape(tFn.toString().replaceAll(",", "")) + "_" + new Date().getTime() + "." + fExt
    var fileName = nouveaunon + "_" + new Date().getTime() + "." + fExt
    // var fileName = (tFn.toString().replaceAll("'", "").replaceAll("#", "").replaceAll(",", "").replaceAll("*", "")) + "_" + new Date().getTime() + "." + fExt;

    // Get the local file as an array buffer.

    var getFile = getFileBuffer();

    getFile.done(function (arrayBuffer) {

      // Add the file to the SharePoint folder.

      var addFile = addAttachmentFiles(arrayBuffer, fileName);

      addFile.done(function (file, status, xhr) {

        j++;

        if (j < tFiles.length) {

          appsHelper.upploadAttachmentFiles(inputFileId, itemId, listName, j, callback);



        } else {

          if (callback) {

            callback.call();

          }

        }

      });

      addFile.fail(onError);

    });

    getFile.fail(onError);

  }

  else {

    if (callback) {

      callback.call();

    }

  }

  // Get the local file as an array buffer.

  function getFileBuffer() {

    var deferred = jQuery.Deferred();

    var reader = new FileReader();

    reader.onloadend = function (e) {

      deferred.resolve(e.target.result);

    }

    reader.onerror = function (e) {

      deferred.reject(e.target.error);

    }

    reader.readAsArrayBuffer(tFiles[j]);

    return deferred.promise();

  }



  // Add the file to the file collection in the Shared Documents folder.

  function addAttachmentFiles(arrayBuffer, fname) {

    // Send the request and return the response.

    // This call returns the SharePoint file.

    url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + listName + "')/items(" + itemId + ")/AttachmentFiles/ add(FileName='" + fname + "')";

    return jQuery.ajax({

      url: url,

      type: "POST",

      data: arrayBuffer,

      processData: false,

      headers: {

        "accept": "application/json;odata=verbose",

        "X-RequestDigest": jQuery("#__REQUESTDIGEST").val(),

        "content-length": arrayBuffer.byteLength

      }

    });

  }

  function onError(error) {

    alert(error.responseText);

  }
}


appHelper.TestIsOverFileMinSize = function(fileInputID){
  const uploadField = document.getElementById(fileInputID);
  if(uploadField.files.length > 0){
    if(uploadField.files[0].size > 2){
       return true;
    }
  }
   return false;
}

appHelper.ShowMinusFileSizeMessage = function(){
  const addfile = document.getElementById("addfile");
  let msg = document.createElement('span');
  msg.id= 'DivMsgMinusFileSize'
  msg.style.color = 'red';
  msg.innerText =" Le fichier ne doit pas être vide"
  if(document.getElementById("DivMsgMinusFileSize")){  }else{addfile.after(msg);}
}

// appsHelper.GetMailTemplate = function (to, subject, link, mailCode, item, callBack) {
//   if (to) {
//     var cContext = window.SP.ClientContext.get_current();
//     var oList = cContext.get_web().get_lists().getByTitle("ParamList");
//     var camlQuery = new window.SP.CamlQuery();
//     //alert(_spPageContextInfo.userId);
//     camlQuery.set_viewXml('<View>' +
//       '<Query>' +
//       '<Where>' +
//       '<Eq><FieldRef Name=\'Title\' /><Value Type=\'Text\'>' +
//       mailCode +
//       '</Value></Eq>' +
//       '</Where>' +
//       '</Query>' +
//       '</View>');
//     var paramItem = oList.getItems(camlQuery);
//     cContext.load(paramItem);
//     cContext.executeQueryAsync(onSuccess, onFailure);

//     function onSuccess(sender, args) {

//       var mailTemplate = mailCode;

//       if (paramItem.get_count() > 0) {
//         var listItemEnumerator = paramItem.getEnumerator();
//         while (listItemEnumerator.moveNext()) {
//           var oListItem = listItemEnumerator.get_current();
//           mailTemplate = (oListItem.get_item('ParamValue') != null ? oListItem.get_item('ParamValue') : "");
//           break;
//         }
//       }

//       var mailbody = appsHelper.ReturnMailBody(item, mailTemplate);

//       if (link) {
//         mailbody += "<br />" + link;
//       }

//       appsHelper.SaveForSendMail(to,
//         subject,
//         mailbody,
//         true,
//         callBack);
//     }
//     function onFailure(sender, args) {
//       callBack.call();
//       //onComplete(false);
//     }
//   }
//   else {
//     callBack.call();
//   }
// }

appHelper.addItemToParamList = function(ctx, Listname, titleValue, callBack){
  let oList = ctx
    .get_web()
    .get_lists()
    .getByTitle(Listname);
  let itemCreateInfo = new window.SP.ListItemCreationInformation();
  let oListItem = oList.addItem(itemCreateInfo);
  let title = titleValue.toString().trim().toUpperCase();
  oListItem.set_item("Title", title);
  oListItem.update();
  ctx.load(oListItem);
  ctx.executeQueryAsync(function () {
    callBack(oListItem);
  }, appSpHelper.writeError);
}
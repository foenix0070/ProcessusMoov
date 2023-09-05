var appHelper = appHelper || {};

appHelper.AppConstante = {
  SiteUrl : 'http://vminsideweb01/sites/proc/',
  SiteJsUrl : 'http://vminsideweb01/sites/proc/tools/',
  MIMailSender : "no-reply-MI@moov-africa.ci",
  IsDevEnvironment : true
}

appHelper.ListName = {
Conge : 'ListeConge',
Gadget : 'ListeGadget',
Vehicule : 'ListeVehicule',
Materiel : 'ListeMateriel',
Absence : 'ListeAbsence',
Employe : 'ListeEmploye',
TypeConge : 'ListeTypeConge',
TypeAbsence : 'ListeTypeAbsence',
Validation : 'TachesValidation',
Notification : 'ListeNotification',
Mission : 'ListeMission',
FraisMission : 'ListeFraisMission',
RegularisationFraisMission : 'ListeRegularisationFraisMission',
SortieCaisse : 'ListeSortieCaisse',
RegularisationSortieCaisse : 'ListeRegularisationSortieCaisse',
Zone : 'ListeZoneGeographique',
Caisse : 'ListeCaissePaiement',
AppListe : 'tools',
Mode : 'ListeModePaiement'
};

appHelper.Status = {
  ENATTENTE : 'ENATTENTE',
  VALIDEE : 'VALIDEE',
  REJETEE : 'REJETEE',
  DEMANDEMODIFICATION : 'DEMANDEMODIFICATION',
  ENCOURS : 'ENCOURS',
  ENCONGE : 'ENCONGE',
  RETOURCONGE : 'RETOURCONGE',
  TERMINEE : 'TERMINEE',

  GetClass : function ( statut){
      switch(statut.toString()){
        case appHelper.Status.VALIDEE : return 'succed'; break;
        case appHelper.Status.REJETEE : return 'closed'; break;
        case appHelper.Status.ENCOURS : return 'wait'; break;
        case appHelper.Status.ENCONGE : return 'wait'; break;
        case appHelper.Status.RETOURCONGE : return 'wait'; break;
        case appHelper.Status.TERMINEE : return 'gray'; break;
        case appHelper.Status.ENATTENTE : return 'gray'; break;
      }
  }
};

appHelper.AppCode = {
  VEHICULE : 'VEHICULE',
  MATERIEL : 'MATERIEL',
  GADGET : 'GADGET',
  CONGE : 'CONGE',
  ABSENCE : 'ABSENCE',
  MISSION : 'MISSION',
  //MISSION500000 : 'MISSION500000',
  FRAISMISSION : 'FRAISMISSION',
  REGULARISATIONFRAISMISSION : 'REGULARISATIONFRAISMISSION',
  SORTIECAISSE : 'SORTIECAISSE',
  REGULARISATIONSORTIECAISSE : 'REGULARISATIONSORTIECAISSE'
}

appHelper.LogType = {
INFO : 'INFO',
ERROR : 'ERROR',
WARN : 'WARNING',
LOG : 'LOG'
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

appHelper. parseBool = function(str) {
  return /^(true|1)$/i.test(str);
}


appHelper.isArray = function(myArray) {
  return myArray.constructor.toString().indexOf("Array") > -1;
}

appHelper.GetQueryStringFromAjaxQuery = function (param) {
  var vars = {};
  param = param.trim().toLocaleLowerCase();
  sessionStorage.getItem("ajax_url").replace(location.hash, '').replace(
  /[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
  function (m, key, value) { // callback
    key= key.toLocaleLowerCase();
      vars[key] = value !== undefined ? value : '';
  }
);
  if (param) {
      return vars[param] ? decodeURI(vars[param]) : null;
  }
  return vars;
}

appHelper.getQueryStringParameter =  function (paramToRetrieve) {
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

appHelper.startSkeleton = function(container){

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

appHelper.LisetenOffCanvas = function (offCavasId, openCallBack, closeCallBack){

  document.addEventListener('shown.bs.offcanvas', function (event) {
    var offcanvas = event.target;
    var offcanvasId = offcanvas.getAttribute('id');

    if(offcanvasId == offCavasId ){
      if(openCallBack){
        openCallBack();
      }
    }

  });

  document.addEventListener('hidden.bs.offcanvas', function (event) {
    var offcanvas = event.target;
    var offcanvasId = offcanvas.getAttribute('id');
    if(offcanvasId == offCavasId ){
      if(closeCallBack){
        closeCallBack();
      }
    }
  });

};

appHelper.navigation = function (container, url) {

  url = `${appHelper.AppConstante.SiteUrl}\\${url}`;
  sessionStorage.setItem("ajax_url", url);
  container = container ? container : "DivMainPageContainer";

  appHelper.startSkeleton (container);
  fetch(url)
    .then((response) => response.text())
    .then((data) => {
      let elm =  document.getElementById(container);
      document.getElementById(container).innerHTML = data;

      Array.from(elm.querySelectorAll("script"))
      .forEach( oldScriptEl => {
        const newScriptEl = document.createElement("script");
        Array.from(oldScriptEl.attributes).forEach( attr => {
          newScriptEl.setAttribute(attr.name, attr.value)
        });
        const scriptText = document.createTextNode(oldScriptEl.innerHTML);
        newScriptEl.appendChild(scriptText);
        oldScriptEl.parentNode.replaceChild(newScriptEl, oldScriptEl);
    });

    })
    .catch((error) => {
      appHelper.Log(  error,appHelper.LogType.ERROR, "Une erreur s'est produite lors de la navigation: ");

    });
};


appHelper.listenNavigationOffCanvas = function (lienNavigation, offCanvasid) {

  document.addEventListener("click", function (event) {
    App.Counter++;
    var target = event.target;
    if (target) {

      let container = false;
      let url = false;
      appHelper.Log( target.classList, lienNavigation, '_8_');
     if (target.classList.contains(lienNavigation)) {

      event.preventDefault(); // Empêcher le comportement par défaut du lien
      appHelper.LisetenOffCanvas(offCanvasid, function(){

        try {
          container = target.getAttribute("data-target");
        } catch (e) { appHelper.Log(  e,appHelper.LogType.ERROR, "appHelper.listenNavigationOffCanvas"); }

        try {
          url = target.getAttribute("data-url");
          url = url;
        } catch (e) { appHelper.Log(  e,appHelper.LogType.ERROR, "appHelper.listenNavigationOffCanvas"); }

        appHelper.Log(container, url );
        appHelper.navigation(container, url);

      }, null)

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
      } catch (e) { appHelper.Log(  e,appHelper.LogType.ERROR, "appHelper.listenNavigationLink2"); }

      try {
        url = target.getAttribute("data-url");

      } catch (e) { appHelper.Log(  e,appHelper.LogType.ERROR, "appHelper.listenNavigationLink2");}

      appHelper.navigation(container, url);
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
      } catch (e) { appHelper.Log(  e,appHelper.LogType.ERROR, "appHelper.listenNavigationLink");}

      try {
        url = target.getAttribute("data-url");
        if(url.valueOf.toString().indexOf(appHelper.AppConstante.SiteUrl) < 0){
         url =  url;
        }
      } catch (e) { appHelper.Log(  e,appHelper.LogType.ERROR, "appHelper.listenNavigationLink");}

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

appHelper.ConvertOctetToKo = function(octet) {
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

appHelper.loadJSWithNameSpace = function (scriptName, namespace,  scriptUrl) {
  let _NameSpace = appHelper.nameSpaceExists(namespace)
  if (_NameSpace) {
      _NameSpace.InitializePage();
  } else
  {
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



var appHelper = appHelper || {};

appHelper.AppConstante = {
  SiteUrl : 'http://Activ/'
}

appHelper.ListName = {
Conge : 'ListeConge',
Gadget : 'ListeGadget',
Vehicule : 'ListeVehicule',
Materiel : 'ListeMateriel',
Absence : 'ListeAbsence',
Employe : 'ListeEmploye',
TypeConge : 'ListeTypeConge',
Validation : 'TachesValidation',
Mission : 'ListeMission',
FraisMission : 'ListeFraisMission'

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
  FRAISMISSION : 'FRAISMISSION',
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

appHelper.renderTemplate = function (tmplID, contenairID, viewData) {
  let tmp = document.getElementById(tmplID).innerText;
  let o = Mustache.render(tmp, viewData);
  console.log(o);
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
      js.src = appFolder.appUrl + scriptUrl + "?time=" + new Date().getTime();
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
  js.src = appFolder.appUrl + scriptUrl + "?time=" + new Date().getTime();
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



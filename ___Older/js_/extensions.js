

/** Extension STRING */
String.prototype.replaceAll = function (find, replace) {
  const target = this;
  return target.replace(new RegExp(find, 'g'), replace);
};

String.prototype.reverse = function () {
  return this.split('').reverse().join('');
};

String.prototype.getInitialOfName = function () {
  var t = this.split(" ");
  t = t.clean(" ");
  t = t.getUnique();
  var l = t.length;
  var r = "";
  for (var i = 0; i < l; ++i) {
      r += t[i].charAt(0).toUpperCase();
  }
  return r;
};

String.prototype.validateEmail = function () {
  const email = this;
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

String.prototype.replaceAll = function (search, replacement) {
  var target = this;
  return target.replace(new RegExp(search, 'g'), replacement);
};

String.prototype.addthousandSepFr = function () {
  let nStr = this;
  nStr += '';
  x = nStr.split(',');
  x1 = x[0];
  x2 = x.length > 1 ? ',' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ' ' + '$2');
  }
  return x1 + x2;
};


/** Extension DATE */
Date.prototype.addDays = function (days) {
  var ms = new Date().getTime() + (86400000 * days);
  var added = new Date(ms);
  return added;
};

/** Extension NUMBER */
Number.prototype.addthousandSepFr = function () {
  let nStr = this;
  nStr += '';
  x = nStr.split(',');
  x1 = x[0];
  x2 = x.length > 1 ? ',' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ' ' + '$2');
  }
  return x1 + x2;
};

Number.prototype.padLeft = function (base, chr) {
  var len = (String(base || 10).length - String(this).length) + 1;
  return len > 0 ? new Array(len).join(chr || '0') + this : this;
};

/** Extension ARRAY */
Array.prototype.getUnique = function () {
  var u = {}, a = [];
  for (var i = 0, l = this.length; i < l; ++i) {
      if (u.hasOwnProperty(this[i])) {
          continue;
      }
      a.push(this[i]);
      u[this[i]] = 1;
  }
  return a;
};

Array.prototype.clean = function (cleanValue) {
  for (var i = 0; i < this.length; i++) {
      if (this[i] === cleanValue) {
          this.splice(i, 1);
          i--;
      }
  }
  return this;
};

Array.prototype.getRandomValue = function () {
  return this[Math.floor(Math.random() * this.length)];
};

Array.prototype.groupBy = function(){
  const data = this;
  const groups = data.reduce((groups, item) => {
      const value = item[field];
      if (!groups[value]) {
          groups[value] = [];
      }
      groups[value].push(item);
      return groups;
  }, {});

  const groupArrays = Object.keys(groups).map((value) => {
      return {
          value,
          items: groups[value]
      };
  });
  return groupArrays;
}

Array.prototype.getObjectByPropertyValue = function(propName, propValue){
  const t = this;
  return t.filter(obj=> obj[propName] == propValue);
}

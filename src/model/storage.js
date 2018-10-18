var storage={
  set(key,value){
    localStorage.setItem(key,JSON.stringify(value));
  },
  get(key){
    return JSON.parse(localStorage.getItem(key));
  },
  remove(key){
    localStorage.removeItem(key);
  },
  setS(key,value){
    sessionStorage.setItem(key,JSON.stringify(value));
  },
  getS(key){
    return JSON.parse(sessionStorage.getItem(key));
  },
  removeS(key){
    sessionStorage.removeItem(key);
  },


};

var cookie={
  setCookie (c_name, value, expiredays){
    var exdate = new Date();
    exdate.setTime(exdate.getTime()+expiredays);
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
  },
  getCookie(name){
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
      return (unescape( arr[2]));
    else
      return null;
  },
  delCookie(name){
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = cookie.getCookie(name);
    if (cval != null)
      document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }
};

var num9={
  add0(number){
    if(parseInt(number)<10){
      return '0'+parseInt(number)
    }else if(parseInt(number)>=10){
      return parseInt(number)
    }

  }
};



export default {
  cookie,
  storage,
  num9,
}


export const fnQueryParams = (params) => {
    let query   = '';
    for (var key in params) {
        if(params[key]) query += encodeURIComponent(key) + '=' + encodeURIComponent(params[key]) + '&';
    }
    query = query.slice(0, -1);
    return "?"+query;
}

export const  isEmpty = (obj) => {
    for(var key in obj) {
      if(obj.hasOwnProperty(key))
        return false;
    }
    return true;
}
  
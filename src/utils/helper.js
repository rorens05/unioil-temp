export const fnQueryParams = (params) => {
    let query   = '';
  for (var key in params) {
    if(params[key]){
      if(Array.isArray(params[key])){
        for (let index = 0; index < params[key].length; index++) {
          const value = params[key][index];
          query += encodeURIComponent(key) + '=' + encodeURIComponent(value) + '&';
        }
      }else{
        query += encodeURIComponent(key) + '=' + encodeURIComponent(params[key]) + '&';
      }
    }
  }
  if(query.length === 0) return '';

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

export const apiFormValidation = ({data, setErrors}) => {
  let errors = {};
  Object.keys(data).map( (key) => errors = { ...errors, [key] : data[key][0] });
  setErrors(errors);
}
  
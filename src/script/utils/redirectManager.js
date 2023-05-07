const buildQueryString = (settings) => {
    let queryString = "";
    for (const setting in settings) {
      if (queryString === "") {
        queryString += `?${setting}=${btoa(settings[setting])}`;
      } else {
        queryString += `&${setting}=${btoa(settings[setting])}`;
      }
    }
    return queryString;
  };
export const redirect = (location,settings) => {
    const queryString = buildQueryString(settings);
    return document.location.href=(location+".html"+queryString);
}
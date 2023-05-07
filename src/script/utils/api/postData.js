export function postData(url, data) {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    return data; // renvoie la réponse
  })
  .catch(error => {
    console.error(error);
    throw error; // lance une erreur
  });
}

export function patchData(url, data) {
    return fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('La requête a échoué')
      }
      response.json()
    })
    .then(data => {
      console.log(data);
      
      return data; // renvoie la réponse
    })
    .catch(error => {
      console.error(error);
      throw error; // lance une erreur
    });
  }
  
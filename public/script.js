
function deleteRequest(url) {
  fetch(url, {
    method: 'DELETE',
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      window.location.href = data.redirect;
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
function postRequest(url) {
  fetch(url, {
    method: 'POST',
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      window.location.href = data.redirect;
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
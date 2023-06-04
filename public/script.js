

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
function checkEmpty(input , errorMessage){
  if(input.value == ""){
    errorMessage.textContent = `${input.name} cannot be empty`
  }else{
    return true;
  }
}
function checkTyped(input , errorMessage){
  input.addEventListener('keyup',(e)=>{
    if(input.value != ""){
      errorMessage.textContent = ""
    }
  })
}



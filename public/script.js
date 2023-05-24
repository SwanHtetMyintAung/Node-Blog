

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
function CheckValidComment(errorMessage,form,input ){
  form.addEventListener('submit',(e)=>{
  e.preventDefault();
  
    if(input.value == ""){
      errorMessage.textContent = `${input.name} Cannot Be Empty`
      return ;
    }else{
      form.submit()
    }
  })
}
function CheckValidUpload(errorMessage1,errorMessage2,form,input1,input2 ){
  form.addEventListener('submit',(e)=>{
  e.preventDefault();
  
  if(input1.value.trim() == ""){
    errorMessage1.textContent = `${input1.name} Cannot Be Empty`
  }else if(input2.value.trim() == ""){
    errorMessage2.textContent = `${input2.name} Cannot Be Empty`
  }
  form.submit()
})}


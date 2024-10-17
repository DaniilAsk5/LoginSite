document.addEventListener('DOMContentLoaded', () =>{
  const form = document.getElementById('registerForm');

  form.addEventListener('submit', async (event) => {
    const formData = new FormData(form);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password')
    }

    try{
      const response = await fetch('http://localhost:5000/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      if(response.ok)
      {
        const jsonResp = await response.json();
        alert(jsonResp.message);
      }else{
        const errorResp = await response.json();
        alert('Error: ${errorResp.message}');
      }
    }catch(error){
      console.log('Error:', error);
      alert('Please try again');
    }
  })
})
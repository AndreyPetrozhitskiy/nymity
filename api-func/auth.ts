import axios from 'axios';

export const Login = async (login: string, password: string) =>{
  if(login && password){
   const auth =  await axios.post('http://localhost:1477/auth/login',{
      login:login,
      password:password
    })
    .then(function (response) {
      if(response.data){
        return response.data
      } else {
        return undefined
      }
    })
    .catch(function (error) {
      console.log(error);
    });
    return auth
  }
  };

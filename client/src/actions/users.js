import axios from "axios";

class AuthService {

    async login(username, password) {      
      try {  
        
        const { data, error } = await axios.post('/api/user/login', { username, password })
        const { data:token } = data       

        if(error){
          return {error: true, msg:"Something went wrong"}
        }
        localStorage.setItem("user", JSON.stringify(token.token));

        return {error: false, msg:"Login Succesfully"}
        
          
      } catch (error) {        
        return {error: true, msg:error.response.data.message}
      }       
    }


    async register(username, password) {

      try {
        const { data, error} = await axios.post('/api/user/sign-in', { username, password })

        if(error){
          return {error: true, msg:"Something went wrong"}
        }

        return {error: false, msg:"User created"}


      } catch (error) {
        return {error: true, msg:error.response.data.message}
      }      
    }

  
    async logout() {
      localStorage.removeItem("user");
    }  
    
  
    async getCurrentUser() {
      return JSON.parse(localStorage.getItem('user'));;
    }
  }
  
  export default new AuthService();
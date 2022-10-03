const { supabase } = require('./supabase')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function Login({username, password}){    
    let { data: users, error } = await supabase
    .from('users')
    .select("*")
    .eq('username', username)

    if(users.length === 0){            
        return {
            data:'Username not found',
            error:true
        }
    }

    const validPassword = await bcrypt.compare(password, users[0].password);

    if(!validPassword){            
        return {
            data:'Invalid password',
            error:true
        }
    }    

    const token = jwt.sign({
            name: users[0].username,
            id: users[0].password
        }, process.env.TOKEN_SECRET);        

    return {
        data:'Bienvenido',
        token:token,
        error:null
    }

}



async function ValidateUniqueUser(user){

    let { data: users, error } = await supabase
        .from('users')
        .select("*")
        .eq('username', user)

    //console.log(users)
    return (users.length > 0)

}

async function SignIn({username, password}){    

    if(await ValidateUniqueUser(username)){    
        
        return {
            data:'Este usuario ya existe',
            error:true
        }
    }

    
    // hash contraseña
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);

    
    const { data, error } = await supabase
    .from('users')
    .insert([
      { username: username, password: hashpassword },
    ])
    
    return {
        data:data,
        error:error
    }    

}  



module.exports = {
    Login,
    SignIn
  }
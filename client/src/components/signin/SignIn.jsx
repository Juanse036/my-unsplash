import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from '../../actions/users'
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const SignIn = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })    

    const getUser = async() =>{
        if(await AuthService.getCurrentUser()){
            navigate('/photos')
        }
    }   

    useEffect(() => {
        getUser()
    },[])


    async function formValidation() {        
        let boolValidate = true
        let texterror = ""

        if (formData.username === ""){
            boolValidate = false
            texterror = "Username cannot be empty"
        }
        if (formData.username.indexOf(' ') >=0){
            boolValidate = false
            texterror = "Username cannot have spaces"
        }

        if (formData.password === ""){
            boolValidate = false
            texterror = "Password cannot be empty"
        }

        return {boolValidate, texterror};

    }

    function handleChange(evt) {
        const value = evt.target.value;
        setFormData({
          ...formData,
          [evt.target.name]: value
        });
      }

    async function handleSubmit(event){
        event.preventDefault();        

        const {boolValidate, texterror} =await formValidation()     

        if(boolValidate){
            const {error, msg} = await AuthService.register(formData.username, formData.password)  
            if (error) {
                Notify.failure(msg);            
            }else{
                Notify.success('Account Created');
                navigate('/login')
            }
        }else{
            Notify.failure(texterror);
        }        
        
    }

    return (
        <section className="h-screen">            
            <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6" >                                              
                <form onSubmit={handleSubmit}>                       
                    <h1 className="text-2xl">Sign In</h1>
                    <div className="mb-6 mt-4">
                        <input
                        type="username"
                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        name="username"
                        placeholder="Username"                        
                        value={formData.username}
                        onChange={handleChange}   
                        />
                    </div>                    
                    <div className="mb-6">
                        <input
                        type="password"
                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}

                        />
                    </div>    
                    <div className="text-center lg:text-left">
                        <button
                        type="submit"
                        className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                        >
                        Sign In
                        </button>
                        <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                        Do have an account?
                            <a
                                href="/login"
                                className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                                > Login</a
                            >
                        </p>
                    </div>
                </form>                    
            </div>            
        </section>
    )

}

export default SignIn
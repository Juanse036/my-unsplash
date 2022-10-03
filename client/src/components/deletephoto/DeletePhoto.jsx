import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import AuthService from '../../actions/users'
import PhotoService from '../../actions/photos'

const DeletePhoto = ({setShowDelete, id}) => {    

    const navigate = useNavigate();
    const [entryPassword, setEntryPassword] = useState("")

    const handleChange = (evt) => {
        const value = evt.target.value;
        setEntryPassword(value);
    }

    async function formValidation() {        
        let boolValidate = true
        let texterror = ""

        if (entryPassword === ""){
            boolValidate = false
            texterror = "Password cannot be empty"
        }

        return {boolValidate, texterror};

    }

    const handleSubmit = async() => {
        event.preventDefault();

        const token = await AuthService.getCurrentUser()
        const {boolValidate, texterror} =await formValidation()   

        if(boolValidate){
            
            const {msg, error} = await PhotoService.deletePhoto(id, entryPassword, token)

            if(error){
                Notify.failure(msg);
            }else{
                Notify.success('Photo Deleted Successfully');
                navigate(0);
            }
        }else{
            Notify.failure(texterror);
        }
    }

    return (
        <section className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-zinc-900/[.7]">            
        <div className="relative w-[60%] my-6 mx-auto max-w-3xl" >
            <div className="order-0 rounded-lg shadow-lg relative flex flex-col p-7 bg-white outline-none focus:outline-none">
            <h1 className="text-2xl w-full">Add a new photo</h1>
            <form onSubmit={handleSubmit}>                  
                <div className="mb-6">
                    <label className="text-sm">Password</label>
                    <input
                    type="password"
                    className="form-control block w-full px-4 py-2 placeholder-[#BDBDBD] bg-white border border-solid border-black rounded-xl transition ease-in-out m-0 text-sm"
                    id="password"
                    placeholder="***********************"
                    value={entryPassword}
                    onChange={handleChange}
                    />
                </div>    
                <div className="text-center lg:text-left">
                    <button
                    type="button"
                    className="inline-block px-7 py-3  text-slate-600 text-sm leading-snug  rounded-xl"
                    onClick={() => setShowDelete(false)}
                    >
                    Cancel
                    </button>
                    <button
                    type="submit"
                    className="inline-block px-7 py-3 bg-[#EB5757] text-white text-sm leading-snug  rounded-xl "
                    >
                    Delete
                    </button>
                </div>
            </form>        
            </div>            
        </div>            
    </section>
    )
}

export default DeletePhoto
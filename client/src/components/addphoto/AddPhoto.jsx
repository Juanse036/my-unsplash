import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import AuthService from '../../actions/users'
import PhotoService from '../../actions/photos'



const AddPhoto = ({setShowAddPhoto}) => {   

    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        label: "",
        photoURL: ""
    })    

    async function formValidation() {        
        let boolValidate = true
        let texterror = ""

        if (formData.label === ""){
            boolValidate = false
            texterror = "Label cannot be empty"
        }
        if (!(/^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(formData.photoURL))){
            boolValidate = false
            texterror = "This link is not an image"
        }

        if (formData.photoURL === ""){
            boolValidate = false
            texterror = "Photo URL cannot be empty"
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

    const handleSubmit = async(event) => {
        event.preventDefault();

        const token = await AuthService.getCurrentUser()

        const {boolValidate, texterror} =await formValidation()   

        if(boolValidate){
            
            const {msg, error} = await PhotoService.uploadPhoto(formData.label, formData.photoURL, token)

            if(error){
                Notify.failure(msg);
            }else{
                Notify.success('Photo Uploaded Successfully');
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
                <div className="mb-6 mt-4">
                    <label className="text-sm">Label</label>
                    <input
                    type="text"
                    className="form-control block w-full px-4 py-2 placeholder-[#BDBDBD] bg-white border border-solid border-black rounded-xl transition ease-in-out m-0 text-sm"
                    name="label"
                    placeholder="Suspendisse elit massa"                    
                    value={formData.label}
                    onChange={handleChange}
                    />
                </div>                    
                <div className="mb-6">
                    <label className="text-sm">Photo URL</label>
                    <input
                    type="text"
                    className="form-control block w-full px-4 py-2 placeholder-[#BDBDBD] bg-white border border-solid border-black rounded-xl transition ease-in-out m-0 text-sm"
                    name="photoURL"
                    placeholder="https://images.unsplash.com/photo-1584395630827-860eee694d7b?ixlib=r..."
                    value={formData.photoURL}
                    onChange={handleChange}
                    />
                </div>    
                <div className="text-center lg:text-left">
                    <button
                    type="button"
                    className="inline-block px-7 py-3  text-slate-600 text-sm leading-snug  rounded-xl"
                    onClick={() => setShowAddPhoto(false)}
                    >
                    Cancel
                    </button>
                    <button
                    type="submit"
                    className="inline-block px-7 py-3 bg-[#3DB46D] text-white text-sm leading-snug  rounded-xl "
                    >
                    Submit
                    </button>
                </div>
            </form>        
            </div>            
        </div>            
    </section>
    )
}

export default AddPhoto
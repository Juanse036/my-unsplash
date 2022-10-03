import { useState } from "react";

import AddPhoto from "../addphoto/AddPhoto"
import Spinner from "../spinner/Spinner";
import Photo from "./Photo"


const Photos = ({isLoading, photosData, isSearchingError, errorMsg}) => {
    
    const [showAddPhoto, setShowAddPhoto] = useState(false)      

    if (isLoading){
        return <Spinner />
    }

    if(isSearchingError) {

        return(
        <div className="w-full h-96 flex flex-col justify-center items-center">
            <h1 className="text-4xl">{errorMsg}</h1>
        </div>
        )
    }

    return ( photosData && photosData.length > 0 ? 
            <>
            
            <div className='columns-1 sm:columns-2 md:columns-3 lg:columns-3 xl:columns-4 mt-[30px]'>
                {photosData.map((el ,idx) => {
                    return (
                        <Photo key={idx} img_url={el.img_url} label={el.label} id={el.id}/>
                    )
                })}
            </div>
            {showAddPhoto ? (<AddPhoto />) : <></>}
            </>
        : 
        <>        
        <div className="w-full h-96 flex flex-col justify-center items-center">
            <h1 className="text-4xl">You don't have images yet, upload a photo</h1>
            <button 
                className="bg-[#3DB46D] text-white w-[137px] h-[55px] rounded-xl mt-[50px]"
                onClick={() => setShowAddPhoto(true)}
            >Add Photo</button>
        </div>
        {showAddPhoto ? (<AddPhoto  setShowAddPhoto={setShowAddPhoto} />) : <></>}
        </>
        
    )
}

export default Photos
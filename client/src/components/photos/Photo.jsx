import {useState} from 'react';
import close from '../../img/icon-delete.svg'
import DeletePhoto from "../deletephoto/DeletePhoto"

const Photo = ({img_url, label, id}) => {

    const [isHovering, setIsHovering] = useState(false);
    const [showDelete, setShowDelete] = useState(false)

    const handleMouseOver = () => {        
        setIsHovering(true);
      };
    
      const handleMouseOut = () => {
        setIsHovering(false);
      };
    
       
    return (
        <>
        <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className="relative mb-[50px] mr-[25px] ml-[25px] w-full">        
            
            <div className=''>
            <img 
                src={img_url} 
                alt={label}
                className='rounded-2xl align-top w-full'
            />
            </div>         
            {isHovering && (
                <div className='absolute inset-x-0 bottom-0 w-full h-full bg-stone-900/[.6] rounded-2xl'>
                    <div className='flex flex-row justify-between bg-white mt-auto border border-indigo-300 rounded-t-2xl shadow-lg shadow-indigo-500/40 '>
                        <p className='ml-[10px] p-[3px] truncate'>{label}</p>     
                        <button className=' mr-[15px] m-[3px] px-[5px] bg-red-600 text-white rounded-md' onClick={() => setShowDelete(true)}>
                            Delete                       
                        </button>   
                    </div>
                </div>
            )}      
            
            {showDelete ? (<DeletePhoto setShowDelete={setShowDelete} id={id} />) : <></>}
        </div>
        
        </>
    )   
}

export default Photo
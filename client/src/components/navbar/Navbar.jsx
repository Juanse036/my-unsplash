import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import AddPhoto from "../addphoto/AddPhoto"
import logo from '../../img/my_unsplash_logo.svg'
import search from '../../img/icon-search.svg'
import Photos from "../photos/Photos";
import AuthService from '../../actions/users'
import PhotoService from '../../actions/photos'

const Navbar = () => {

    
    const navigate = useNavigate();

    const [showAddPhoto, setShowAddPhoto] = useState(false)
    const [initPhotosData, setInitPhotosData] = useState([])   
    const [photosData, setPhotosData] = useState([])
    const [searchInput, setSearchInput] = useState("")
    const [isLoading, setIsLoading] = useState(true)    
    const [isSearchingError, setIsSearchingError] = useState(false)
    const [errorMsg, setErrorMsg] = useState(false)    

    //-------------NAVBAR VARAIBLES
    const [isHamburguerNav, setHamburguerNav] = useState(false)
    const [isNavbarAnimated, setIsNavbarAnimated] = useState(false)

    function resizeListener() {                
        if( window.innerWidth < 870) {
            setHamburguerNav(true)
        }else{
            setHamburguerNav(false)
        }
      }

    window.addEventListener("resize", resizeListener);

    const getUser = async() =>{
        if(!(await AuthService.getCurrentUser())){
            navigate('/login')
        }
    } 

    const getPhotos = async() => {
        const { photos, error, msg} = await PhotoService.getPhotos(await AuthService.getCurrentUser())       
        
        setPhotosData(photos)
        setInitPhotosData(photos)
        setIsLoading(false)
    }

    useEffect(() => {
        getUser()        
        getPhotos()
        resizeListener()
    },[])  

    const handleSingOut = async() => {
        await AuthService.logout()
        Notify.success('Sign Out');
        navigate('/login')
    }

    const handleSearch = async(value = searchInput) => {        
        const {error, msg, photos} = await PhotoService.searchPhotoLabel(initPhotosData, value)        

        if(error){
            setErrorMsg(msg)
            setIsSearchingError(true)            
        }else {
        setIsSearchingError(false)
        setPhotosData(photos)
        }
    }

    const handleChange = (evt) => {
        const value = evt.target.value;
        setSearchInput(value);
        handleSearch(value)
    }
   

    return (
        <>
        {
            isHamburguerNav ? 
            <nav className={isNavbarAnimated ? "animate-navbarin": "animate-navbarout "} >
                <div className='flex justify-between mt-[52px] items-center'>
                    <div className='flex items-center'>
                        <img src={logo} alt='My Unsplash' className='w-[138px] h-[26px] '/>                    
                    </div>
                    <div>
                    <button onClick={e => setIsNavbarAnimated(!isNavbarAnimated)} className="relative group">
                        <div className="relative flex items-center justify-center rounded-full w-[50px] h-[50px]  bg-slate-700 ring-0 ring-gray-300 hover:ring-8 ring-opacity-30 duration-200 shadow-md">
                        <div className="flex flex-col justify-between w-[20px] h-[20px]  origin-center">
                            <div className="bg-white h-[2px] w-1/2 rounded origin-right delay-75 "></div>
                            <div className="bg-white h-[1px] rounded"></div>
                            <div className="bg-white h-[2px] w-1/2 rounded self-end origin-left delay-75 "></div>
                        </div>
                        </div>
                    </button>
                    </div>               
                </div>
                <div className="flex flex-col items-end mt-[15px] gap-y-3">
                    <div className={`w-[170px] h-[35px] rounded-xl border border-[#BDBDBD] flex items-center ${isNavbarAnimated ? "animate-displaymenu": "animate-hiddenmenu "}`}>
                        <button type="button" onClick={e => {handleSearch}}><img src={search} alt='icon search' className='w-[17px] h-[17px] ml-[19px]'/></button>
                        <input 
                            type="search" 
                            name="search" 
                            placeholder='Search by name'
                            className={`w-[115px] block ml-[20px] focus:outline-none text-xs `}
                            value={searchInput}
                            onChange={handleChange}
                        ></input>
                    </div>
                    <button 
                        type="button" 
                        onClick={() => setShowAddPhoto(true)}
                        className={`bg-[#3DB46D] text-white w-[120px] h-[30px] text-cs rounded-xl ${isNavbarAnimated ? "animate-displaymenu": "animate-hiddenmenu "}`}>Add a photo
                    </button>
                    <button 
                        type="button" 
                        onClick={handleSingOut}
                        className={`underline ml-[20px] text-red-500 text-md ${isNavbarAnimated ? "animate-displaymenu": "animate-hiddenmenu "}`}>Sign Out
                    </button>
                </div>
            </nav> 
            : 
            <div className='flex justify-between mt-[52px] items-center'>
                <div className='flex items-center'>
                    <img src={logo} alt='My Unsplash' className='w-[138px] h-[26px] '/>
                    <div className='w-[300px] h-[55px] rounded-xl border border-[#BDBDBD] flex items-center'>
                        <button type="button" onClick={e => {handleSearch}}><img src={search} alt='icon search' className='w-[17px] h-[17px] ml-[19px]'/></button>
                        <input 
                            type="search" 
                            name="search" 
                            placeholder='Search by name'
                            className='w-[240px] block ml-[20px] focus:outline-none'
                            value={searchInput}
                            onChange={handleChange}
                        ></input>
                    </div>
                </div>
                <div>
                    <button 
                        type="button" 
                        onClick={() => setShowAddPhoto(true)}
                        className='bg-[#3DB46D] text-white w-[137px] h-[55px] text-lg rounded-xl'>Add a photo
                    </button>
                    <button 
                        type="button" 
                        onClick={handleSingOut}
                        className='underline ml-[20px] text-red-500 text-lg'>Sign Out
                    </button>
                </div>
            </div>
            
        }
       
        <Photos isLoading={isLoading} photosData={photosData} isSearchingError={isSearchingError} errorMsg={errorMsg} />
        {showAddPhoto ? (<AddPhoto setShowAddPhoto={setShowAddPhoto} />) : <></>}
        </>
    )

}

export default Navbar
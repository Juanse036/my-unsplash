import axios from "axios";



class PhotoService {

    

    async getPhotos(token) {      
        try {                         
            console.log(window.location.href) 
            //const SERVER_URL = window.location.href.slice(0, window.location.href.lastIndexOf('/'))
            const { data, error } = await axios.get('/api/photo', {
                headers: {
                    'auth-token' : token
                }
            })                        
  
            if(error){
                return {error: true, msg:"Something went wrong"}
              }                  
  
            return {error: false, photos:data.photos}          
            
        } catch (error) {                    
            return {error: true, data:error.response.data.message}
        }       
    }

    async uploadPhoto(label, ImgUrl, token) {       

        try {
            const { data, error } = await axios.post('/api/photo/upload', { label, ImgUrl }, {
                headers : {
                    'auth-token': token
                }
            })

            if(error){
                return {error: true, msg:"Something went wrong"}
            }

            return {error:false, msg:'Image Uploaded'}            
            
        } catch (error) {
            return {error: true, data:error.response.data.message}
        }
    }

    async deletePhoto(id, entrypassword, token) {       

        try {
            const { data, error } = await axios.post('/api/photo/delete', { id, entrypassword }, {
                headers : {
                    'auth-token': token
                }
            })

            if(error){
                return {error: true, msg:"Something went wrong"}
            }

            return {error:false, msg:'Image Deleted'}            
            
        } catch (error) {            
            return {error: true, msg:error.response.data.message}
        }
    }

    async searchPhotoLabel(data, label){  

        const searchData = await data.filter((el) => {
            return el.label.toLowerCase().includes(label.toLowerCase())
        })        

        if (searchData.length > 0){
            return {error: false, photos:searchData}
        }

        return {error: true, msg:'Not Images found'}
    }
}

export default new PhotoService();
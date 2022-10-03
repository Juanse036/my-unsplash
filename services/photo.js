const { supabase } = require('./supabase')
const bcrypt = require('bcrypt');


async function getUsers(username){
  let { data: users, error } = await supabase
  .from('users')
  .select('*')
  .eq('username', username)

  return users[0]
}

async function getPhotos(user){

  const { name } = user    

  const {id} = (await getUsers(name))    

  let { data: photos, error } = await supabase
  .from('my-unsplash-photos')
  .select('id, label, img_url')
  .eq('user_id', id)

  return {photos, error};

}

async function uploadPhoto(file, user){ 

  const {label, ImgUrl} = file
  const { name } = user  
  
  const {id} = await getUsers(name)    
  
  const { data, error } = await supabase
    .from('my-unsplash-photos')
    .insert([
      { label: label, img_url: ImgUrl, user_id:id},
  ])  

  return {data, error};  
}


async function deletePhoto(file, user){  

  const {id, entrypassword} = file 
  const { name } = user  
  const { password } = await getUsers(name)

  const validPassword = await bcrypt.compare(entrypassword, password);

  if(!validPassword){            
    return {
        data:'Invalid password',
        error:true
    }
  } 
  
  const { data, error } = await supabase
    .from('my-unsplash-photos')
    .delete()
    .eq('id', id)

  return {data, error};  

} 



module.exports = {
    getPhotos,
    uploadPhoto,
    deletePhoto
  }
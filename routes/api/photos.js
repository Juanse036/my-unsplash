const express = require('express');
const router = express.Router();
const photo = require('../../services/photo')
const auth = require("../../middleware/auth")



/* GET CANDIDATOS. */
router.get('/', auth, async function(req, res, next) {
    try {                
        const {photos, error} = await photo.getPhotos(req.user)
        res.json({
            photos: photos,
            error: error
        })
    } catch (error) {
        res.send(error);        
    }
});

router.post('/upload', auth, async function(req, res, next){
    try {
        const {data, error} = await photo.uploadPhoto(req.body, req.user)     
        
        if(error){
            return res.status(401).send({
                message: data
            })
        }

        res.json({
            data: data,
            error: error
        })
    } catch (error) {
        res.send(error);   
    }
})

router.post('/delete', auth, async function(req, res, next){
    try {
        const {data, error} = await photo.deletePhoto(req.body, req.user)   
        
        if(error){
            return res.status(401).send({
                message: data
            })
        }
        
        res.json({
            data: data,
            error: error
        })
    } catch (error) {
        res.send(error);   
    }
})


module.exports = router;
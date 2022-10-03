const express = require('express');
const router = express.Router();
const user = require('../../services/user')

router.post('/sign-in', async function(req, res, next) {
    
    try {                
        const {data, error} = await user.SignIn(req.body)     
        
        if(error) {
            return res.status(401).send({
                message: data
            })
        }
        
        res.json({
            data: data,
            error:error
        })
    } catch (error) {
        res.send(error);        
    }
});


router.post('/login', async function(req, res, next) {
    
    try {             
        const {data, error, token} = await user.Login(req.body)   
        
        if(error){
            return res.status(401).send({
                message: data
            })
        }

        res.header('auth-token', token).json({
            error:null,
            data: {token}
        })

    } catch (error) {
        res.send(error);        
    }
});



module.exports = router;
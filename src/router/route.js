const express = require('express') ;

const router = express.Router() ;

const userController = require('../controllers/userController') ;


router.post('/create' , userController.createUser) ;

router.get('/get' , userController.getData) ;

router.put('/update/:userId' , userController.updateData)


// router.get('*/' , (req,res) =>{
//     return res.status(200).send('hello world')
// })




module.exports = router ;
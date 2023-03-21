const mongoose = require('mongoose');
const userModel = require('../model/userModel')

const  {isValidString , isValidEmail , isValideAge} = require('../validation/validator')

const ObjectId = mongoose.Types.ObjectId

//---------------------------------------------creating Data------------------------------------------------------

const createUser = async (req, res) =>{
   try{

    //---------------------------------destructuring-----------------------------------------------------------
    const {Name , Email , Age , Address} = req.body ;
   //--------------------------------------------------------------------------------------------------------

   //----------------------------------------if no data is present in body--------------------------------------
    if(Object.keys(req.body).length == 0){
        return res.status(400).send({status: false , message : `Please provide some data in the body`})
    }

    //--------------------------------------------------------------------------------------------------------

    //-----------------------------------------------Mendatory thing and validation checking--------------------------
    if(!Name){
        return res.status(400).send({status: false , message : `Name is mendatory , Please provide name`})
    }

    if(!isValidString(Name)){
        return res.status(400).send({status: false , message :`Please provide valid name`})
    }

    if(!Email){
        return res.status(400).send({status: false , message : `Email is mendatory , Please provide email`})
    }

    if(!isValidEmail(Email)){
        return res.status(400).send({status: false , message : `Please provide valid email`})
    }

    if(!Age){
        return res.status(400).send({status: false , message : `Age is mendatory , Please provide age`})
    }

    if(!isValideAge(Age)){
        return res.status(400).send({status: false , message : `Please provide valid age`})
    }

    if(!Address){
        return res.status(400).send({status: false , message : `Address is mendatory , Please provide Address`})
    }

    //-----------------------------------------------------------------------------------------------------------------

    //----------------------------------------email is unique or not--------------------------------------------

    const isChecked = await userModel.findOne({Email : Email})
    if(isChecked){
      if(isChecked.Email == Email){
        return res.status(400).send({status:false,message:`This ${Email} is not unique,Please provide unique emailId`})
      }
    } 

    //-----------------------------------------------------------------------------------------------------------------

    //-----------------------------------creation of user--------------------------------------------------------------
    const createData = await userModel.create(req.body)

    return res.status(201).send({status: true , data : createData})
    //----------------------------------------------------------------------------------------------------------------
    
}

catch(err){
    return res.status(500).send({status: false , message : err.message})
 
}

}

//---------------------------------------------------------------------------------------------------------------------


//-----------------------------------------Fetching User Data--------------------------------------------------

const getData= async (req, res) =>{
    try{

     let obj = {isDeleted : false}
    const {Name , Email , Age , Address} = req.query ;

    
    //---------------fetch data from query param using  Name , Email , Age , Address--------------------------------------
    if(Name){obj.Name=Name} 
    if(Email){obj.Email = Email} ;
    if(Age){obj.Age = Age } ;
    if(Address){obj.Address = Address} ;
  //------------------------------------------------------------------------------------------------------------------


  //-------------------------------------------if user is not present----------------------------------------------
    let get = await userModel.find(obj) ;
    if(!get){
        return res.status(404).send({status:true , message : 'Data not found'})
    }
    //------------------------------------------------------------------------------------------------------------

    return res.status(200).send({status:true , data : get})

    }
    catch(err){
        return res.status(500).send({status:true , message : err.message})
    }
}

//---------------------------------------------------------------------------------------------------------------


//-------------------------------------------Update user----------------------------------------------------------

const updateData = async function(req,res){
    try{
      let data = req.body ;
       let userId = req.params.userId ;
       let {Name , Email , Age , Address} = data
  
      if(Object.keys(data).length == 0){
        return res.status(400).send({status:false , message : 'Please provide some data to update'})
      }
  
  //---------------------------checking userId is valid or not------------------------------------------------
      if(!ObjectId.isValid(userId)){
          return res.status(400).send({status:false , message : 'Please provide valid userId'})
      }
  //----------------------------------------------------------------------------------------------------------

  if(Name){
   if(!isValidString(Name)){
    return res.status(400).send({status: false , message :`Please provide valid name`})
   }
  }
   if(Email){
    if(!isValidEmail(Email)){
    return res.status(400).send({status: false , message : `Please provide valid email`})
    }
   }
    
   if(Age){
    if(!isValideAge(Age)){
        return res.status(400).send({status: false , message : `Please provide valid age`})
    }
   }
  
  //-------------------------here we are checking whether that user is already deleted or not--------------------     
      let findUser = await userModel.findOne({_id : userId , isDeleted:true })
      if(findUser){
          return res.status(400).send({status:true , message : 'user has already been deleted'})
      }
  //------------------------------------------------------------------------------------------------------------
  
  //---------------------------Here we are finding one document and updating------------------------------------
      let update = await userModel.findOneAndUpdate(
         {_id : userId},
      { 
          $set : {
            Name : Name , 
            Email : Email, 
            Age : Age,
            Address : Address
          },
         
      },
      {new:true} 
      );
  //-----------------------------------------------------------------------------------------------------------------
  
      return res.status(200).send({status:true,message : 'Updated successfully', data :update})
   }
   catch(err){
      return res.status(500).send({status:false ,message : err.message})
   }
  }

  //------------------------------------------------------------------------------------------------------------

  
//--------------------------------------exporting-------------------------------------------------------------

module.exports = {createUser ,getData , updateData}

//-----------------------------------------------------------------------------------------------------------
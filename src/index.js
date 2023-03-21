const mongoose = require('mongoose') ;
let express = require('express')
let route = require('./router/route')


const app = express() ;



app.use(express.json()) ;


//-----------------------------connection of mongodb-------------------------------------------------------------

mongoose.connect('mongodb+srv://Ranamahato:9XBWNazgyvZ41FGS@rana.1qocv4g.mongodb.net/userData-Punjab' ,
   {useNewUrlParser : true}
)

//-------------------------------------------------------------------------------------------------------------


//-------------------------------------error handling if mongodb is not connected-----------------------------------
.then(() =>{
    console.log(`mongoose is connected`);
})

.catch((err) =>{
   console.log(err.message);
})

//--------------------------------------------------------------------------------------------------------------------


app.use('/' , route)


//-------------------------------Here we are connected port to run our server--------------------------------

app.listen((3000) , () =>{
    console.log(`express is connected in 3000`);
})

//-------------------------------------------------------------------------------------------------------
import mongoose, { Types } from "mongoose";

const Schema=mongoose.Schema

let Knjiga=new Schema({
    id:{
        type:String
    },
    naziv:{
        type:String
    },
    autor:{
        type:Array<String>
    },
    zanr:{
        type:Array<String>
    },
    izdavac:{
        type:String
    },
    godina:{
        type:Number
    },
    jezik:{
        type:String
    },
    slika:{
        type:String
    },
    ocena:{
        type:Number
    },
    stanje:{
        type:Number
    },
    produzena:{
        type:Boolean
    }

})

export default mongoose.model("KnjigaModel",Knjiga,"knjige")
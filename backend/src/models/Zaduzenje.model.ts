import mongoose from "mongoose";

const Schema=mongoose.Schema

let Zaduzenja=new Schema({
    id_zad:{
        type:String
    },
    id:{
        type:String
    },
    kor:{
        type:String
    },
    naziv:{
        type:String
    },
    autor:{
        type:Array<String>
    },
    slika:{
        type:String
    },
    datum:{
        type:String
    },
    rok:{
        type:String
    },
    status:{
        type:String
    },
    produzena:{
        type:Boolean
    },
    vracena:{
        type:String
    },
    zanr:{
        type:Array<String>
    }
})

export default mongoose.model("ZaduzenjaModel",Zaduzenja,"zaduzenja")
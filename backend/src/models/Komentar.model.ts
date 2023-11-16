import mongoose from "mongoose";

const Schema=mongoose.Schema

let Komentar=new Schema({
    idKnjige:{
        type:String
    },
    kor:{
        type:String
    },
    vreme:{
        type:String
    },
    tekst:{
        type:String
    },
    ocena:{
        type:Number
    },
    azuriran:{
        type:Boolean
    }
})

export default mongoose.model("KomentarModel",Komentar,'komentari')
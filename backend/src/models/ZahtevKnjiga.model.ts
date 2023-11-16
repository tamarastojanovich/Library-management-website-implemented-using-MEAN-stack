import mongoose, { Types } from "mongoose";

const Schema=mongoose.Schema

let ZahtevKnjiga=new Schema({
    kor:{
        type:String
    },
    naziv:{
        type:String
    },
    autor:{
        type:String
    },
    zanr:{
        type:String
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
    prihvacena:{
        type:Boolean
    }

})

export default mongoose.model("ZahtevKnjigaModel",ZahtevKnjiga,"zahtevi")
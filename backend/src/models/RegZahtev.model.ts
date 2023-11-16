import mongoose from "mongoose";

const Schema=mongoose.Schema

let RegZahtev=new Schema({
    kor_ime:{
        type:String
    },
    lozinka:{
        type:String
    },
    ime:{
        type:String
    },
    prezime:{
        type:String
    },
    adresa:{
        type:String
    },
    telefon:{
        type:String
    },
    mejl:{
        type:String
    },
    tip:{
        type:String
    },
    slika:{
        type:String
    },
    prihvacen:{
        type:Boolean
    }

})

export default mongoose.model("RegZahtevModel",RegZahtev,"RegZahtevi")


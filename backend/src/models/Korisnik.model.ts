import mongoose from "mongoose"
const Schema=mongoose.Schema

let Korisnik=new Schema(
    {
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
        vreme:{
            type:Number
        },
        blokiran:{
            type:Boolean
        },
        daniZad:{
            type:Number
        }

    }
)

export default mongoose.model("KorisnikModel",Korisnik,"korisnici")
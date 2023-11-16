import mongoose from "mongoose";

const Schema=mongoose.Schema

let Rezervacija=new Schema({
    id:{
        type:String
    },
    kor:{
        type:String
    },
    datum:{
        type:String
    },
    status:{
        type:String
    }
})

export default mongoose.model("RezervacijaModel",Rezervacija,"rezervacije")
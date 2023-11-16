import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import KorisnikRouter from './routers/korisnik.router';
import knjigaRouter from './routers/knjiga.router';
import zaduzenjaRouter from './routers/zaduzenja.router';
import mongodb from 'mongodb';
import sviZahteviRouter from './routers/sviZahtevi.router';
import rezervacijaRouter from './routers/rezervacija.router';
import komentarRouter from './routers/komentar.router';
const app = express();
app.use(cors());
app.use(express.json({'limit':'20mb'}))

mongoose.connect("mongodb://localhost:27017/biblioteka")
const connection=mongoose.connection;
connection.once("open",()=>{
    console.log("db connected");

})

const router=express.Router();

app.use("",router);
app.use("/korisnici",KorisnikRouter)
app.use("/knjige",knjigaRouter)
app.use("/zaduzenja",zaduzenjaRouter)
app.use("/zahtevi",sviZahteviRouter)
app.use("/rezervacije",rezervacijaRouter)
app.use("/komentari",komentarRouter)
app.listen(4000, () => console.log(`Express server running on port 4000`));
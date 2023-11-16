import express from 'express'
import { KnjigaController } from '../controllers/knjiga.controller'

const knjigaRouter=express.Router()

knjigaRouter.route("/dohvatiSveKnjige").get((req,res)=>new KnjigaController().dohvatiSveKnjige(req,res))
knjigaRouter.route("/dohvatiKnjigu").post((req,res)=>new KnjigaController().dohvatiKnjigu(req,res))
knjigaRouter.route("/dodajKnjigu").post((req,res)=>new KnjigaController().dodajKnjigu(req,res))
knjigaRouter.route("/brisi").post((req,res)=>new KnjigaController().brisi(req,res))
knjigaRouter.route("/azuriraj").post((req,res)=>new KnjigaController().azuriraj(req,res))
knjigaRouter.route("/oceni").post((req,res)=>new KnjigaController().oceni(req,res))

export default knjigaRouter
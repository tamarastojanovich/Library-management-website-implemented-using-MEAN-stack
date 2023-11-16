import express from 'express'
import { KnjigaController } from '../controllers/knjiga.controller'

const zaduzenjaRouter=express.Router()

zaduzenjaRouter.route("/ImaNaZaduzenju").post((req,res)=>new KnjigaController().imaNaZaduzenju(req,res))
zaduzenjaRouter.route("/dohvatiZaduzenja").post((req,res)=>new KnjigaController().dohvatiZaduzenja(req,res))
zaduzenjaRouter.route("/razduzi").post((req,res)=>new KnjigaController().razduzi(req,res))
zaduzenjaRouter.route("/zaduzi").post((req,res)=>new KnjigaController().zaduzi(req,res))
zaduzenjaRouter.route("/produzi").post((req,res)=>new KnjigaController().produzi(req,res))
zaduzenjaRouter.route("/knjigaNaZaduzenju").post((req,res)=>new KnjigaController().KnjigaNaZaduzenju(req,res));
zaduzenjaRouter.route("/dohvatiVraceno").post((req,res)=>new KnjigaController().dohvatiVracene(req,res))
zaduzenjaRouter.route("/dohvatiSvaZaduzenja").get((req,res)=>new KnjigaController().dohvatiSvaZaduzenja(req,res))
export default zaduzenjaRouter
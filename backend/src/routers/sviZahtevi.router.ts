import express from 'express'
import { ZahteviController } from '../controllers/sviZahtevi.controller'

const sviZahteviRouter=express.Router()

sviZahteviRouter.route("/postaviZahtev").post((req,res)=>new ZahteviController().postaviZahtevZaKnjigu(req,res))
sviZahteviRouter.route("/prihvatiZahtev").post((req,res)=>new ZahteviController().prihvatiZahtevZaKnjigu(req,res))
sviZahteviRouter.route("/dohvatiZahteveZaKnjigu").get((req,res)=>new ZahteviController().dohvatiZahteve(req,res))
sviZahteviRouter.route("/dohvatiPrihvaceneZaKnjigu").get((req,res)=>new ZahteviController().dohvatiPrihvacene(req,res))

sviZahteviRouter.route("/postaviRegZahtev").post((req,res)=>new ZahteviController().postaviRegZahtev(req,res))
sviZahteviRouter.route("/dohvatiRegZahteve").get((req,res)=>new ZahteviController().dohvRegZahteve(req,res))
sviZahteviRouter.route("/prihvatiRegZahtev").post((req,res)=>new ZahteviController().prihvatiRegZahtev(req,res))
sviZahteviRouter.route("/odbijZahtev").post((req,res)=>new ZahteviController().odbijRegZahtev(req,res))

export default sviZahteviRouter
import express from 'express'
import { KorisnikController } from '../controllers/korisnik.controller'

const KorisnikRouter=express.Router()

KorisnikRouter.route("/prijava").post((req,res)=>new KorisnikController().prijava(req,res));
KorisnikRouter.route("/registracija").post((req,res)=>new KorisnikController().registracija(req,res));
KorisnikRouter.route("/dohvatiSve").get((req,res)=>new KorisnikController().dohvatiKorisnike(req,res))
KorisnikRouter.route("/brisi").post((req,res)=>new KorisnikController().brisi(req,res))
KorisnikRouter.route("/azuriraj").post((req,res)=>new KorisnikController().azuriraj(req,res))
KorisnikRouter.route("/spusti").post((req,res)=>new KorisnikController().spusti(req,res))
KorisnikRouter.route("/podigni").post((req,res)=>new KorisnikController().podigni(req,res))
KorisnikRouter.route("/blokiraj").post((req,res)=>new KorisnikController().blokiraj(req,res))
KorisnikRouter.route("/odblokiraj").post((req,res)=>new KorisnikController().odblokiraj(req,res))
KorisnikRouter.route("/postaviDane").post((req,res)=>new KorisnikController().postaviDane(req,res))
KorisnikRouter.route("/postaviDaneZad").post((req,res)=>new KorisnikController().postaviDaneZad(req,res))
KorisnikRouter.route("/promeniLozinku").post((req,res)=>new KorisnikController().promeniLozinku(req,res))

export default KorisnikRouter;
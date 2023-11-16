import express from 'express'
import { KomentarController } from '../controllers/komentar.controller'

const komentarRouter=express.Router()

komentarRouter.route('/dodajKomentar').post((req,res)=>new KomentarController().dodajKomentar(req,res))
komentarRouter.route('/azurirajKomentar').post((req,res)=>new KomentarController().azurirajKomentar(req,res))
komentarRouter.route('/dohvKomentare').post((req,res)=>new KomentarController().dohvKomentare(req,res))

export default komentarRouter
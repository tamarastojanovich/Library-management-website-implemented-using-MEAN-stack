import express from 'express'
import { RezervacijaController } from '../controllers/rezervacija.controller'

const rezervacijaRouter=express.Router()

rezervacijaRouter.route('/rezervisi').post((req,res)=>new RezervacijaController().rezervisi(req,res))
rezervacijaRouter.route('/dohvatiRez').post((req,res)=>new RezervacijaController().dohvatiRez(req,res));
rezervacijaRouter.route('/prihvatiRez').post((req,res)=>new RezervacijaController().prihvatiRez(req,res))
rezervacijaRouter.route('/dohvatiRezKor').post((req,res)=>new RezervacijaController().dohvRezKor(req,res))
rezervacijaRouter.route('/izbrisiRez').post((req,res)=>new RezervacijaController().izbrisiRez(req,res))



export default rezervacijaRouter
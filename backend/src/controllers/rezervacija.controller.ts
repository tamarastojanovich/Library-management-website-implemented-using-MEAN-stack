import express from 'express'
import RezervacijaModel from '../models/Rezervacija.model';

export class RezervacijaController{

    dohvatiRez=(req:express.Request,res:express.Response)=>{
        console.log("usli");
        let id=req.body.id;
        console.log(id);
        console.log("juuuuu")
        RezervacijaModel.find({'id':id,'status':'rezervisana'},(err,r)=>{
            if(err) console.log(err);
            else res.json(r);
        })
    }
    rezervisi=(req:express.Request,res:express.Response)=>{
        console.log("USLI");
        let id=req.body.id;
        let kor=req.body.kor;
        let datum=req.body.datum;

        RezervacijaModel.create({'id':id,'kor':kor,'datum':datum,'status':'rezervisana'},(err)=>{
            if(err) console.log(err);
        })
    }

    prihvatiRez=(req:express.Request,res:express.Response)=>{
        let id=req.body.id;
        let kor=req.body.kor;
        RezervacijaModel.updateOne({'id':id,'kor':kor},{$set:{'status':'prihvacena'}},(err)=>{
            if(err) console.log(err);
        })
    }


    dohvRezKor=(req:express.Request,res:express.Response)=>{
        let kor=req.body.kor;
        RezervacijaModel.find({'kor':kor,'status':'prihvacena'},(err,r)=>{
            if(err) console.log(err);
            else res.json(r);
        })
    }

    izbrisiRez=(req:express.Request,res:express.Response)=>{
        let kor=req.body.kor;
        let id=req.body.id;
        RezervacijaModel.deleteOne({'kor':kor,'id':id,'status':'prihvacena'},(err)=>{
            if(err) console.log(err);
        })
    }
}
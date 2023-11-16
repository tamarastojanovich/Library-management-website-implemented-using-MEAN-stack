import express from 'express'
import KomentarModel from '../models/Komentar.model';

export class KomentarController{
    dodajKomentar=(req:express.Request,res:express.Response)=>{
        let tekst=req.body.tekst;
        let kor=req.body.kor;
        let id=req.body.idKnjige;
        let ocena=req.body.ocena;
        let date=new Date().toLocaleString()
        KomentarModel.create({'tekst':tekst,'kor':kor,'idKnjige':id,'ocena':ocena,'vreme':date,'azuriran':false},(err)=>{
            if(err) console.log(err);
        })
    }

    azurirajKomentar=(req:express.Request,res:express.Response)=>{
        let tekst=req.body.tekst;
        let kor=req.body.kor;
        let id=req.body.idKnjige;
        let ocena=req.body.ocena;
        KomentarModel.updateOne({'kor':kor,'idKnjige':id},{$set:{'tekst':tekst,'ocena':ocena,'azuriran':true}},(err)=>{
            if(err) console.log(err);
        })
    
    }

    dohvKomentare=(req:express.Request,res:express.Response)=>{
        let id=req.body.idKnjige;
        KomentarModel.find({'idKnjige':id},(err,k)=>{
            if(err) console.log(err);
            else res.json(k)
        })
    }
}
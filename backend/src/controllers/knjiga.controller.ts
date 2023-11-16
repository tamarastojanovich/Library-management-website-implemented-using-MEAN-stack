import express from "express"
import ZaduzenjeModel from "../models/Zaduzenje.model";
import KnjigaModel from "../models/Knjiga.model";
import KorisnikModel from "../models/Korisnik.model";
import {v4 as uuidv4} from 'uuid';

export class KnjigaController{
    dohvatiSveKnjige=(req:express.Request,res:express.Response)=>{
        console.log("trazimo knjige");
        KnjigaModel.find({},(err,knj)=>{
            if(err)console.log(err);
            else res.json(knj);
        })
    }

    dohvatiKnjigu=(req:express.Request,res:express.Response)=>{
        let id=req.body.id;
        KnjigaModel.findOne({'id':id},(err,k)=>{
            if(err) console.log(err);
            else res.json(k);
        })
    }

    dodajKnjigu=(req:express.Request,res:express.Response)=>{
        let id=uuidv4()
        console.log(id);
        let zanr=req.body.zanr;
        let naziv=req.body.naziv;
        let autor=req.body.autor;
        let slika=req.body.slika;
        let izdavac=req.body.izdavac;
        let godina=req.body.godina;
        let jezik=req.body.jezik;
        
        KnjigaModel.create({'naziv':naziv,'autor':autor,'zanr':zanr,'slika':slika,'izdavac':izdavac,'godina':godina,'jezik':jezik,'ocena':0,'stanje':1,'id':id},(err)=>{
             if(err) console.log(err);
          })

    }

    brisi=(req:express.Request,res:express.Response)=>{
        let id=req.body.id;
        KnjigaModel.deleteOne({'id':id},(err)=>{
            if(err) console.log(err);
        })
    }

    azuriraj=(req:express.Request,res:express.Response)=>{
        let id=req.body.id;
        let zanr=req.body.zanr;
        let naziv=req.body.naziv;
        let autor=req.body.autor;
        let slika=req.body.slika;
        let izdavac=req.body.izdavac;
        let godina=req.body.godina;
        let jezik=req.body.jezik;
        let stanje=req.body.stanje;
        console.log(stanje);
        KnjigaModel.updateOne({'id':id},{'naziv':naziv,'autor':autor,'zanr':zanr,'slika':slika,'izdavac':izdavac,'godina':godina,'jezik':jezik,'stanje':stanje},(err)=>{
            if(err) console.log(err);
        })
    }

    oceni=(req:express.Request,res:express.Response)=>{
        let id=req.body.id;
        let ocena=req.body.ocena;
        KnjigaModel.updateOne({'id':id},{'ocena':ocena},(err)=>{
            if(err) console.log(err);
        })
    }


    imaNaZaduzenju=(req:express.Request,res:express.Response)=>{
        let ime=req.body.kor;
        let id=req.body.id;
        ZaduzenjeModel.findOne({'kor':ime,'id':id,'status':"zaduzeno"},(err,z)=>{
            if(err) console.log(err);
            else res.json(z);
        })
    }
    KnjigaNaZaduzenju=(req:express.Request,res:express.Response)=>{
        let id=req.body.id;
        ZaduzenjeModel.findOne({'id':id,'status':"zaduzeno"},(err,z)=>{
            if(err) console.log(err);
            else res.json(z);
        })
    }
    dohvatiZaduzenja=(req:express.Request,res:express.Response)=>{
        let ime=req.body.kor;
        console.log("usli");
        console.log(ime);
        ZaduzenjeModel.find({'kor':ime,'status':"zaduzeno"},(err,z)=>{
            if(err) console.log(err);
            else res.json(z);
        })
    }
    dohvatiVracene=(req:express.Request,res:express.Response)=>{
        let ime=req.body.kor;
        console.log("usli");
        console.log(ime);
        ZaduzenjeModel.find({'kor':ime,'status':"vraceno"},(err,z)=>{
            if(err) console.log(err);
            else res.json(z);
        })
    }

    razduzi=(req:express.Request,res:express.Response)=>{
        console.log("razduzujemo")
      
        let id=req.body.id;
        let datum=new Date().toLocaleDateString();
        ZaduzenjeModel.updateOne({'id_zad':id},{$set:{status:"vraceno",'vracena':datum}},(err)=>{
            if(err) console.log(err);
            else{
                KnjigaModel.updateOne({'id':id},{$inc:{'stanje':1}},(err)=>{
                    if(err) console.log(err);
                })
            }
        })
    }
    zaduzi=(req:express.Request,res:express.Response)=>{
        console.log("PIKACHU")
        let ime=req.body.kor;
        let naziv=req.body.naziv;
        let id=req.body.id;
        let autor=req.body.autor;
        let slika=req.body.slika;
        let zanr=req.body.zanr;
        let id_zad=uuidv4()
        let datum=new Date().toLocaleDateString()
        let vratiti=new Date((new Date().getTime()+14*60*60*24*1000)).toLocaleDateString()
        ZaduzenjeModel.create({'id_zad':id_zad,'kor':ime,'id':id,'naziv':naziv,'autor':autor,'slika':slika,'datum':datum,'rok':vratiti,'status':'zaduzeno','produzeno':false,'zanr':zanr},(err)=>{
            if(err) console.log(err);
            else{
                KnjigaModel.updateOne({'id':id},{$inc:{'stanje':-1}},(err)=>{
                    if(err) console.log(err);
                })
            }
        })
    }

    produzi=(req:express.Request,res:express.Response)=>{
        let vrat=req.body.vratiti;
        
        let id=req.body.id;
        ZaduzenjeModel.updateOne({'id_zad':id},{$set:{'rok':vrat,'produzena':true}},(err)=>{
            if(err)console.log(err);
        })
    }

    dohvatiSvaZaduzenja=(req:express.Request,res:express.Response)=>{
        ZaduzenjeModel.find({},(err,z)=>{
            if(err) console.log(err);
            else res.json(z);
        })
    }
}

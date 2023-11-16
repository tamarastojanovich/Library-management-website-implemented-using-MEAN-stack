import express from 'express'
import RegZahtevModel from '../models/RegZahtev.model';
import KnjigaModel from '../models/Knjiga.model';
import ZahtevKnjigaModel from '../models/ZahtevKnjiga.model'
import KorisnikModel from '../models/Korisnik.model';
import {v4 as uuidv4} from 'uuid'

export class ZahteviController{
    postaviZahtevZaKnjigu=(req:express.Request,res:express.Response)=>{
        let zanr=req.body.zanr;
        let naziv=req.body.naziv;
        let autor=req.body.autor;
        let slika=req.body.slika;
        let izdavac=req.body.izdavac;
        let godina=req.body.godina;
        let jezik=req.body.jezik;
        ZahtevKnjigaModel.create({'naziv':naziv,'autor':autor,'zanr':zanr,'slika':slika,'izdavac':izdavac,'godina':godina,'jezik':jezik,'prihvacena':false},(err)=>{
            if(err) console.log(err);
        })
    }
    prihvatiZahtevZaKnjigu=(req:express.Request,res:express.Response)=>{
        let id=uuidv4()
        let zanr=req.body.zanr.split(",");
        let naziv=req.body.naziv;
        let autor=req.body.autor.split(",");
        let slika=req.body.slika;
        let izdavac=req.body.izdavac;
        let godina=req.body.godina;
        let jezik=req.body.jezik;
                    KnjigaModel.create({'naziv':naziv,'autor':autor,'zanr':zanr,'slika':slika,'izdavac':izdavac,'godina':godina,'jezik':jezik,'ocena':0,'stanje':1,'id':id},(err)=>{
                        if(err) console.log(err);
                    else{
                    ZahtevKnjigaModel.updateOne({'naziv':naziv},{$set:{'prihvacena':true}},(err)=>{
                        if(err) console.log(err);
                    })
                }})
                
                }
            
        

    dohvatiZahteve=(req:express.Request,res:express.Response)=>{
        ZahtevKnjigaModel.find({'prihvacena':false},(err,Z)=>{
            if(err) console.log(err);
            else res.json(Z);
        })}
        dohvatiPrihvacene=(req:express.Request,res:express.Response)=>{
            ZahtevKnjigaModel.find({'prihvacena':true},(err,Z)=>{
                if(err) console.log(err);
                else res.json(Z);
            })}

    postaviRegZahtev=(req:express.Request,res:express.Response)=>{
            console.log("REGG");
           let kor_ime=req.body.kor_ime;
            let lozinka=req.body.lozinka;
            let ime=req.body.ime;
            let prezime=req.body.prezime;
            let adresa=req.body.adresa;
            let telefon=req.body.telefon;
            let mejl=req.body.mejl;
            let tip="citalac";
            let slika=req.body.slika;
            KorisnikModel.findOne({'kor_ime':kor_ime},(err,u)=>{
                
                if(u)res.json({'message':"Korisnik sa datim korisnickim imenom vec postoji"});
                else{

                    KorisnikModel.findOne({'mejl':mejl},(err,u)=>{
                        if(u) res.json({'message':"Postoji vec korisnik sa datim mejlom."});
                        else{
                            console.log("USLIIIIIIIIII");
                            RegZahtevModel.findOne({'kor_ime':kor_ime},(err,u)=>{
                                if(u)res.json({'message':"Korisnik sa datim korisnickim imenom vec postoji"});
                                else{
                                   
                                    RegZahtevModel.findOne({'mejl':mejl},(err,u)=>{
                                        if(u) res.json({'message':"Postoji vec korisnik sa datim mejlom."});
                                        else{
                                           
                                            RegZahtevModel.create({'kor_ime':kor_ime,'lozinka':lozinka,'ime':ime,'prezime':prezime,'adresa':adresa,'telefon':telefon,'mejl':mejl,'tip':tip,'slika':slika,'prihvacen':false},(err,resp)=>{
                                                if(err) console.log(err);
                                                else res.json({'message':"ok"})
                                            })
                                        }
                                    })
                                }
                            })
                            
                        }
                    })
                }
            })

            
    }

    prihvatiRegZahtev=(req:express.Request,res:express.Response)=>{
        let kor=req.body.kor_ime;
            let lozinka=req.body.lozinka;
            let ime=req.body.ime;
            let prezime=req.body.prezime;
            let adresa=req.body.adresa;
            let telefon=req.body.telefon;
            let mejl=req.body.mejl;
            let tip="citalac";
            let vreme=req.body.vreme;
            let slika=req.body.slika;
            console.log(slika);
             KorisnikModel.create({'kor_ime':kor,'lozinka':lozinka,'ime':ime,'prezime':prezime,'adresa':adresa,'telefon':telefon,'mejl':mejl,'tip':tip,'slika':slika,'vreme':vreme,'blokiran':false},(err,resp)=>{
              if(err) console.log(err);
                else {res.json({'message':"ok"})
                RegZahtevModel.deleteOne({'kor_ime':kor},(err)=>{
                    if(err) console.log(err);
                })}
                 })
        
    }

    odbijRegZahtev=(req:express.Request,res:express.Response)=>{
        let kor=req.body.kor_ime;
        RegZahtevModel.deleteOne({'kor':kor},(err)=>{
            if(err) console.log(err);
        })
    }

    dohvRegZahteve=(req:express.Request,res:express.Response)=>{
        RegZahtevModel.find({},(err,k)=>{
            if(err) console.log(err);
            else res.json(k);
        })
    }
    
}
import express from "express"
import KorisnikModel from "../models/Korisnik.model";
export class KorisnikController{
    prijava=(req:express.Request,res:express.Response)=>{
        console.log("usli u prijavu");
        let ime=req.body.kor_ime;
        let loz=req.body.lozinka;


        KorisnikModel.findOne({'kor_ime':ime,'lozinka':loz},(err,Kor)=>{
            if(err) console.log(err);
            else res.json(Kor);
        }
        )
    }
    registracija=(req:express.Request,res:express.Response)=>{
           
            let kor_ime=req.body.kor_ime;
            let lozinka=req.body.lozinka;
            let ime=req.body.ime;
            let prezime=req.body.prezime;
            let adresa=req.body.adresa;
            let telefon=req.body.telefon;
            let mejl=req.body.mejl;
            let tip="citalac";
            let vreme=req.body.vreme;
            let slika=req.body.slika;
            let dani=req.body.dani;
            console.log(slika);
             KorisnikModel.create({'kor_ime':kor_ime,'lozinka':lozinka,'ime':ime,'prezime':prezime,'adresa':adresa,'telefon':telefon,'mejl':mejl,'tip':tip,'slika':slika,'vreme':vreme,'blokiran':false,'daniZad':14},(err,resp)=>{
              if(err) console.log(err);
                else res.json({'message':"ok"})
                 })
                    }

    promeniLozinku=(req:express.Request,res:express.Response)=>{
        let pass=req.body.lozinka;
        let kor=req.body.kor_ime;
        KorisnikModel.updateOne({'kor_ime':kor},{'lozinka':pass},(err)=>{
            if(err) console.log(err);
        })

    }
                    

            
          
    


    dohvatiKorisnike=(req:express.Request,res:express.Response)=>{
        KorisnikModel.find({'tip':{$ne:'admin'}},(err,k)=>{
            if(err)console.log(err);
            else res.json(k);
        })
    }

    brisi=(req:express.Request,res:express.Response)=>{
        let kor=req.body.kor_ime;
        KorisnikModel.deleteOne({'kor_ime':kor},(err)=>{
            if(err) console.log(err);
        })
    }

    azuriraj=(req:express.Request,res:express.Response)=>{
        console.log(req.body.staro);
        let staro=req.body.staro;
        let stari_mejl=req.body.stari_mejl;
        let kor_ime=req.body.kor_ime;
        let lozinka=req.body.lozinka;
        let ime=req.body.ime;
        let prezime=req.body.prezime;
        let adresa=req.body.adresa;
        let telefon=req.body.telefon;
        let mejl=req.body.mejl;
        let slika=req.body.slika;
        if(kor_ime!=staro){KorisnikModel.findOne({'kor_ime':kor_ime},(err,u)=>{
            if(u)res.json({'message':"Korisnik sa datim korisnickim imenom vec postoji"});
            else{
               if(mejl!=stari_mejl) {KorisnikModel.findOne({'mejl':mejl},(err,u)=>{
                    if(u) res.json({'message':"Postoji vec korisnik sa datim mejlom."});
                    else{
              KorisnikModel.updateOne({'kor_ime':staro},{'kor_ime':kor_ime,'lozinka':lozinka,'ime':ime,'prezime':prezime,'adresa':adresa,'telefon':telefon,'mejl':mejl,'slika':slika},(err)=>{
              if(err) console.log(err);
        })
    }})
}else{
    KorisnikModel.updateOne({'kor_ime':staro},{'kor_ime':kor_ime,'lozinka':lozinka,'ime':ime,'prezime':prezime,'adresa':adresa,'telefon':telefon,'mejl':mejl,'slika':slika},(err)=>{
        if(err) console.log(err);
  })
}
            }})
        }else{
            if(mejl!=stari_mejl) {KorisnikModel.findOne({'mejl':mejl},(err,u)=>{
                if(u) res.json({'message':"Postoji vec korisnik sa datim mejlom."});
                else{
          KorisnikModel.updateOne({'kor_ime':staro},{'kor_ime':kor_ime,'lozinka':lozinka,'ime':ime,'prezime':prezime,'adresa':adresa,'telefon':telefon,'mejl':mejl,'slika':slika},(err)=>{
          if(err) console.log(err);
    })
}})
}else{
KorisnikModel.updateOne({'kor_ime':staro},{'kor_ime':kor_ime,'lozinka':lozinka,'ime':ime,'prezime':prezime,'adresa':adresa,'telefon':telefon,'mejl':mejl,'slika':slika},(err)=>{
    if(err) console.log(err);
})
}
        }
        }

        spusti=(req:express.Request,res:express.Response)=>{
            let kor=req.body.kor_ime;
            console.log(kor);
            KorisnikModel.updateOne({'kor_ime':kor},{$set:{'tip':'citalac'}},(err)=>{
                if(err) console.log(err);
            })
        }
        podigni=(req:express.Request,res:express.Response)=>{
            let kor=req.body.kor_ime;
            KorisnikModel.updateOne({'kor_ime':kor},{$set:{'tip':'moderator'}},(err)=>{
                if(err) console.log(err);
            })
        }
        blokiraj=(req:express.Request,res:express.Response)=>{
            let kor=req.body.kor_ime;
            console.log(kor);
            KorisnikModel.updateOne({'kor_ime':kor},{$set:{'blokiran':true}},(err)=>{
                if(err) console.log(err);
            })
        }
        odblokiraj=(req:express.Request,res:express.Response)=>{
            let kor=req.body.kor_ime;
            KorisnikModel.updateOne({'kor_ime':kor},{$set:{'blokiran':false}},(err)=>{
                if(err) console.log(err);
            })
        }

    postaviDane=(req:express.Request,res:express.Response)=>{
        console.log(req.body.dani);
        let dani=req.body.dani;
        KorisnikModel.updateMany({},{$set:{'vreme':dani}},(err)=>{
            if(err) console.log(err); 
        })
    }
    postaviDaneZad=(req:express.Request,res:express.Response)=>{
        console.log(req.body.dani);
        console.log(req.body.kor);
        let kor=req.body.kor;
        let dani=req.body.dani;
        KorisnikModel.updateOne({'kor_ime':kor},{$set:{'daniZad':dani}},(err)=>{
            if(err) console.log(err); 
        })
    }
}
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AzurirajKomentarComponent } from '../azuriraj-komentar/azuriraj-komentar.component';
import { DodajKomentarComponent } from '../dodaj-komentar/dodaj-komentar.component';
import { KnjigeService } from '../knjige.service';
import { KomentariService } from '../komentari.service';
import { Knjiga } from '../modeli/knjiga';
import { Komentar } from '../modeli/komentar';
import { Korisnik } from '../modeli/korisnik';
import { Rezervacija } from '../modeli/rezervacija';
import { Zaduzenje } from '../modeli/zaduzenje';
import { RezervacijaService } from '../rezervacija.service';
import { ZaduzenjaService } from '../zaduzenja.service';

@Component({
  selector: 'app-knjiga',
  templateUrl: './knjiga.component.html',
  styleUrls: ['./knjiga.component.css']
})
export class KnjigaComponent implements OnInit {

  constructor(private rout:Router,private zad:ZaduzenjaService,private knj:KnjigeService,private rez:RezervacijaService,private kom:KomentariService,private dij:MatDialog) { }

  ngOnInit(): void {
    let k=JSON.parse(localStorage.getItem('knjiga'))
    this.korisnik=JSON.parse(localStorage.getItem('ulogovan'))
    this.knjiga=k;
    this.knj.dohvatiKnjigu(k.id).subscribe((k:Knjiga)=>{
      if(k){
    this.knjiga=k;
    this.naziv=k.naziv;
    for(let i=0;i<k.autor.length;i++){
      this.autori=this.autori+k.autor[i];
      if((i+1)!=k.autor.length)this.autori=this.autori+","
    }
    for(let i=0;i<k.zanr.length;i++){
      this.zanr=this.zanr+k.zanr[i];
      if((i+1)!=k.zanr.length)this.zanr=this.zanr+","
    }
    this.izdavac=k.izdavac;
    this.godina=k.godina;
    this.jezik=k.jezik;
    this.ocena=k.ocena;
    this.id=k.id;
    console.log(this.id)
    this.stanje=k.stanje;
    this.staro_stanje=this.stanje;
    this.slika=k.slika;
    this.zad.ImaNaZaduzenju(this.korisnik.kor_ime,this.knjiga.id).subscribe((z:Zaduzenje)=>{
      if(z) {
        this.vecUzeo=true;
        this.uzimao=true;}
      else {this.vecUzeo=false;
            this.zad.dohvatiZaduzenja(this.korisnik.kor_ime).subscribe((zad:Zaduzenje[])=>{
              if (zad.length==3) {this.neMoze=true;
                this.poruka="Ne moze da se zaduzi knjiga jer ste vec zaduzili 3"
              }
              else{
                console.log("usli");
                for(let i=0;i<zad.length;i++){
                  zad[i].ostalo=Math.ceil((new Date(zad[i].rok).getTime()-new Date().getTime())/86400000);
                  if(zad[i].ostalo<0){
                  this.neMoze=true;
                  this.poruka="Ne moze da se zaduzi knjiga jer niste vratili knjigu na vreme"}
                  else{this.neMoze=false;}
                }
              }
            })
      }
    })
      }
    })
    this.kom.dohvKomentare(k.id).subscribe((k:Komentar[])=>{
      console.log("ola")
      if(k.length==0) this.porukaKom="nema komentara";
      k.sort((k1,k2)=>{
        if(k1.vreme<k2.vreme) return 1;
        else  if (k1.vreme==k2.vreme) return 0;
        else return -1;
      })
      this.komentari=k;
      for(let i=0;i<k.length;i++){
        if(k[i].kor==this.korisnik.kor_ime) this.komentarisao=true;
      }
    })
    this.zad.dohvatiVraceno(this.korisnik.kor_ime).subscribe((z:Zaduzenje[])=>{
      for(let i=0;i<z.length;i++){
        console.log("poof")
        if(z[i].id==this.knjiga.id) {
          console.log("Uzeo")
          this.uzimao=true;
        }
      }
    })
  }

  komentari:Komentar[]
  ocena:number;
  porukaKom:string
  knjiga:Knjiga;
  korisnik:Korisnik;
  vecUzeo:boolean;
  uzimao:boolean=false;
  neMoze:boolean;
  poruka:String;
  id:string;
  naziv:string;
  autori:string="";
  zanr:string="";
  izdavac:string;
  godina:number;
  jezik:string;
  slika:string;
  komentarisao:boolean;
  izmena:boolean;
  stanje:number;
  staro_stanje:number;
  odjava(){
    localStorage.clear()
    this.rout.navigate([""]);
  }

  komentarisi(){
    this.dij.open(DodajKomentarComponent)
  }
  azuriraj(k){
    localStorage.setItem('komentar',JSON.stringify(k));
    this.dij.open(AzurirajKomentarComponent)
  }
  zaduzi(){
    let autor=this.autori.split(",");
    let zanr=this.zanr.split(",")
    this.zad.zaduzi(this.korisnik.kor_ime,this.knjiga.naziv,autor,this.knjiga.slika,this.knjiga.id,zanr).subscribe((err)=>{
      if(err) console.log(err);

    })
    window.location.reload();
  }

  rezervisi(){
    let date=new Date().toLocaleString()


    this.rez.rezervisi(this.knjiga.id,this.korisnik.kor_ime,date).subscribe((err)=>{
      if(err) console.log(err);
    });
    
  }
  menjaj(){
    this.izmena=true;
  }
  izmeni(){
    this.izmena=false;
    let autor=this.autori.split(",");
    let zanr=this.zanr.split(",")
    this.knj.azuriraj(this.id,this.naziv,autor,zanr,this.izdavac,this.godina,this.jezik,this.slika,this.stanje).subscribe((err)=>{
      if(err) console.log(err);
    })
        this.rez.dohvatiRez(this.id).subscribe((r:Rezervacija[])=>{
          if(r){

            console.log("USLI");
            if((this.staro_stanje<this.stanje)){
            r.sort((r1,r2)=>{
              if((new Date(r1.datum).getTime()-new Date(r2.datum).getTime())<0) return 1;
              else if ((new Date(r1.datum).getTime()-new Date(r2.datum).getTime())>0) return -1;
              else return 0;
            })
            for(let j=0;j<(this.stanje-this.staro_stanje);j++){
            for(let i=0;i<r.length;i++){
              this.zad.dohvatiZaduzenja(r[i].kor).subscribe((z:Zaduzenje[])=>{
                if(z.length<3 && !this.kasni(z)){
                  console.log(r[i].kor)
                  this.rez.prihvatiRez(r[i].kor,this.knjiga.id).subscribe((err)=>{
                    if(err) console.log(err);
                  })
                  this.zad.zaduzi(r[i].kor,this.naziv,this.autori,this.slika,this.id,this.zanr).subscribe((err)=>{
                        if(err) console.log(err);
                  });
                }
              })
            }
          }
        }
          }
          window.location.reload()
        })
      
     
  }

  onSelectFile(e){
    if(e.target.files){
      var  reader=new FileReader();
      reader.readAsDataURL(e.target.files[0])
      reader.onload=(event:any)=>{
        this.slika=event.target.result;
      }
    }

  }
  kasni(z:Zaduzenje[]){
    for(let i=0;i<z.length;i++){
      z[i].ostalo=Math.ceil((new Date(z[i].rok).getTime()-new Date().getTime())/86400000);
          if(z[i].ostalo<0) return true;
    }
    return false;
  }
}

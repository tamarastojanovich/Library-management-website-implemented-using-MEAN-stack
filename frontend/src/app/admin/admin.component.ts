import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DodajKorisnikaComponent } from '../dodaj-korisnika/dodaj-korisnika.component';
import { IzmeniKnjiguComponent } from '../izmeni-knjigu/izmeni-knjigu.component';
import { IzmeniKorisnikaComponent } from '../izmeni-korisnika/izmeni-korisnika.component';
import { KnjigeService } from '../knjige.service';
import { KorisnikService } from '../korisnik.service';
import { Knjiga } from '../modeli/knjiga';
import { Korisnik } from '../modeli/korisnik';
import { RegZahtev } from '../modeli/regZahtev';
import { Zaduzenje } from '../modeli/zaduzenje';
import { NovaKnjigaComponent } from '../nova-knjiga/nova-knjiga.component';
import { PostaviDaneComponent } from '../postavi-dane/postavi-dane.component';
import { PrijavaComponent } from '../prijava/prijava.component';
import { ZaduzenjaService } from '../zaduzenja.service';
import { ZahteviService } from '../zahtevi.service';
import {ChartDataset,ChartOptions,ChartType} from 'chart.js'
import { PostaviDaneZadComponent } from '../postavi-dane-zad/postavi-dane-zad.component';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private kserv:KorisnikService,private knj:KnjigeService,private dij:MatDialog,private zad:ZaduzenjaService,private zah:ZahteviService) { }

 
  ngOnInit() {
    this.korisnik=JSON.parse(localStorage.getItem('ulogovan'))
    if(this.korisnik) this.ulogovan=true;
    this.korisnici=[]
    this.knjige=[]
    this.kserv.dohvatiSve().subscribe((kor:Korisnik[])=>{
      if(kor)
      for(let i=0;i<kor.length;i++){
        this.zad.dohvatiZaduzenja(kor[i].kor_ime).subscribe((z:Zaduzenje[])=>{
          if(z.length!=0) kor[i].zaduzen=true;
          this.korisnici.push(kor[i]);
        })
      }
      this.knj.dohvatiKnjige().subscribe((k:Knjiga[])=>{
        if(k) {
          for(let i=0;i<k.length;i++){
            this.zad.knjigaNaZaduzenju(k[i].id).subscribe((knjiga:Knjiga)=>{
              if(knjiga) k[i].zaduzena=true;
              this.knjige.push(k[i]);
            })
          }
        }
      })
    })
    this.zah.dohvRegZahteve().subscribe((z:RegZahtev[])=>{
      if(z) this.zahtevi=z;
    })

  }
  zahtevi:RegZahtev[]
  ulogovan:boolean;
  korisnik:Korisnik
  pretra:string;
  korisnici:Korisnik[]
  knjige:Knjiga[]
  prikaziKor:boolean=true;
  prikaziKnj:boolean;
  prikaziReg:boolean;
  search(){}

  prijava(){
    this.dij.open(PrijavaComponent)
    

   }
 
   odjava(){
     localStorage.clear();
 
     window.location.reload();
     this.ulogovan=false;
   }
  azuriraj(k){
    localStorage.setItem('promena',JSON.stringify(k));
    if(this.prikaziKor){
      this.dij.open(IzmeniKorisnikaComponent)
    }
    else{
      this.dij.open(IzmeniKnjiguComponent)
    }
  }
  brisi(k){
    if(this.prikaziKor){
      this.kserv.brisi(k).subscribe((err)=>{
        if(err) console.log(err);
      })
    }
    else{
      this.knj.brisi(k).subscribe((err)=>{
        if(err) console.log(err);
      })
    }
    window.location.reload()
  }
  dodaj(){
    if(this.prikaziKor){
      this.dij.open(DodajKorisnikaComponent)
    }
    else{
      this.dij.open(NovaKnjigaComponent)
    }
  }
  podigni(k){
      console.log(k);
      this.kserv.podigni(k).subscribe((err)=>{
        if(err) console.log(err);
      })
      window.location.reload();
  }
  spusti(k){
    this.kserv.spusti(k).subscribe((err)=>{
      if(err)console.log(err);
    })
    window.location.reload();
  }
  blokiraj(k){
    console.log(k);
    this.kserv.blokiraj(k).subscribe((err)=>{
      if(err) console.log(err);
    })
    window.location.reload();
}
odblokiraj(k){
  this.kserv.odblokiraj(k).subscribe((err)=>{
    if(err)console.log(err);
  })
  window.location.reload();
}
  koris(){
    this.prikaziKor=true;
    this.prikaziKnj=false;
  }
  knjig(){
    this.prikaziKnj=true;
    this.prikaziKor=false;
  }
  brojDana(){
    this.dij.open(PostaviDaneComponent);
  }
  brojDanaZad(k){
    localStorage.setItem('promenaDana',JSON.stringify(k));
    this.dij.open(PostaviDaneZadComponent);
  }
  spisakReg(){
    this.prikaziKnj=false;
    this.prikaziKor=false;
    this.prikaziReg=true;
  }
  prihvati(z:RegZahtev){
    this.zah.prihvatiRegZahtev(z.kor_ime,z.lozinka,z.ime,z.prezime,z.adresa,z.telefon,z.mejl,z.slika).subscribe((err)=>{
      if(err) console.log(err);
    })
  }
  odbij(k){
    this.zah.odbijRegZahtev(k).subscribe((err)=>{
      if(err) console.log(err);
    })
  }
  
  
  

}

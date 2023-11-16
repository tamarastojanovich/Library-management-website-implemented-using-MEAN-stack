import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KnjigeService } from '../knjige.service';
import { Knjiga } from '../modeli/knjiga';
import { KnjigaZahtev } from '../modeli/knjigaZahtev';
import { Korisnik } from '../modeli/korisnik';
import { Rezervacija } from '../modeli/rezervacija';
import { Zaduzenje } from '../modeli/zaduzenje';
import { RezervacijaService } from '../rezervacija.service';
import { ZaduzenjaService } from '../zaduzenja.service';
import { ZahteviService } from '../zahtevi.service';

@Component({
  selector: 'app-citalac',
  templateUrl: './citalac.component.html',
  styleUrls: ['./citalac.component.css']
})
export class CitalacComponent implements OnInit {

  constructor(private route:Router,private knjServ:KnjigeService,private zadServ:ZaduzenjaService,private zah:ZahteviService,private rez:RezervacijaService) { }

  ngOnInit(): void {
    this.do=JSON.parse(localStorage.getItem('dogod'))
    this.od=JSON.parse(localStorage.getItem('odgod'))
    this.izdavac=JSON.parse(localStorage.getItem('izda'))
    this.zanr=JSON.parse(localStorage.getItem('zanr'));
    if(this.od==null) this.od=0;
    if(this.do==null) this.do=0;
    console.log(this.do)
    let nove=[]
    let promena=false;
    this.zanrovi=[]
    this.izdavaci=[]
    this.knjige=[]
    this.obavestenja=[]
    let kor=JSON.parse(localStorage.getItem('ulogovan'))
    this.korisnik=kor;
    console.log(this.korisnik.ime)
    this.pretra=JSON.parse(localStorage.getItem('knjige'))
    console.log(this.pretra)
    if(!this.pretra) this.pretra=" ";
    console.log(this.pretra);
    this.knjServ.dohvatiKnjige().subscribe((knjige:Knjiga[])=>{
      if(knjige){
        for(let i=0;i<knjige.length;i++){
          for(let j=0;j<knjige[i].zanr.length;j++){
          if(!this.zanrovi.includes(knjige[i].zanr[j])) this.zanrovi.push(knjige[i].zanr[j])
          if(!this.izdavaci.includes(knjige[i].izdavac)) this.izdavaci.push(knjige[i].izdavac)
        }
      }
        let k=Math.floor(Math.random()*(knjige.length));
        this.knjiga=knjige[k];
        for(let i=0;i<knjige.length;i++){
          for(let j=0;j<knjige[i].autor.length;j++)
          if(knjige[i].naziv.toLowerCase().includes(this.pretra.toLowerCase()) || knjige[i].autor[j].toLowerCase().includes(this.pretra.toLowerCase())){
           if((this.has(this.knjige,knjige[i]))<0)this.knjige.push(knjige[i]); 
          }
        }
        for(let i=0;i<this.knjige.length;i++){
          if(this.knjige[i].izdavac.includes(this.izdavac) && this.izdavac!=null) {
            console.log("izdavac")
            nove.push(this.knjige[i]);
            promena=true;
            console.log(i);
          }
        }
        if(promena==false) nove=this.knjige;
        console.log(nove.length)
        for(let i=0;i<nove.length;i++){
          if((nove[i].godina<=this.do && this.do!=0 && nove[i].godina>=this.od && this.od!=0) ||( nove[i].godina<=this.do && this.do!=0 && this.od==0) ||(nove[i].godina>=this.od && this.od!=0 && this.do==0)) {
            console.log("GODINA")
            let index=this.has(nove,nove[i])
           console.log(index);
           
          }else{
            if(( nove[i].godina>this.do && this.do!=0) ||(nove[i].godina<this.od && this.od!=0)){
              console.log("GODINA2")
            if((this.has(nove,nove[i]))>=0){
              console.log("GODINA2")
            let index=this.has(nove,nove[i])
            console.log(index);
            nove.splice(index,1);
            i--;
            promena=true;
            }
          }
          }
        }
        if(this.zanr!=null){
          if(this.zanr.length!=0){
        for(let i=0;i<nove.length;i++){
          let sadrzi=false;
          console.log(sadrzi);
           
          for(let j=0;j<this.zanr.length;j++){
            if(nove[i].zanr.includes(this.zanr[j])){
           
            sadrzi=true;
            break;
          }
          
          }
        
        if(sadrzi==false){
          let index=this.has(nove,nove[i])
          nove.splice(index,1);
          i--;
          promena=true;
        }
      }
      }
      }
      }
      if(promena) this.knjige=nove;
    
  })

    this.zah.dohvatiPrihvacene().subscribe((z:KnjigaZahtev[])=>{
      console.log('hello');
      for(let i=0;i<z.length;i++){
        console.log('hello');
        if(z[i].kor==this.korisnik.kor_ime) {
          console.log('hello');
          let ob="Knjiga " +z[i].naziv + " koju ste predlozili je prihvacena.";
          this.obavestenja.push(ob);
        }
      }
    })

    this.rez.dohvRezKor(this.korisnik.kor_ime).subscribe((r:Rezervacija[])=>{
      for(let i=0;i<r.length;i++){
        let ob="Knjiga koju ste rezervisali je sada prihvacena i dodata u zaduzene";
        this.obavestenja.push(ob);
        this.rez.izbrisiRez(this.korisnik.kor_ime,r[i].id).subscribe((err)=>{
          if(err)console.log(err);
        });
      }
    })



    this.zadServ.dohvatiZaduzenja(this.korisnik.kor_ime).subscribe((z:Zaduzenje[])=>{
      if(z.length!=0){
        for(let i=0;i<z.length;i++){
          z[i].ostalo=Math.ceil((new Date(z[i].rok).getTime()-new Date().getTime())/86400000);
          if(z[i].ostalo>=0 && z[i].ostalo<=2){
            let ob="Ostalo vam je jos "+z[i].ostalo+" dana da vratite knjigu pod naslovom "+z[i].naziv;
            this.obavestenja.push(ob); 
          }
        }
        for(let i=0;i<z.length;i++){
          z[i].ostalo=Math.ceil((new Date(z[i].rok).getTime()-new Date().getTime())/86400000);
          if(z[i].ostalo<0){

            let ob="Kasnite "+z[i].ostalo+" dana sa vracanjem knjige pod naslovom "+z[i].naziv;
            this.obavestenja.push(ob); 
          }
        }
        if(z.length==3) {
          let ob="Imate tri knjige na zaduzenju sto je i maksimum koliko knjiga mozete da uzmete";
          this.obavestenja.push(ob);
        }
      }
      if(this.korisnik.blokiran){
        let ob="BLOKIRANI STE OD STRANE ADMINA";
        this.obavestenja.push(ob);
      }
    })
  }

  korisnik:Korisnik
  knjiga:Knjiga;
  knjige:Knjiga[]
  pretra:string=" "
  obavestenja:string[]
  zanr:string[]=[]
  izdavac:string;
  od:number=0;
  do:number=0;
  zanrovi:string[]
  izdavaci:string[]
  searchFocus:boolean
  odjava(){
    localStorage.clear();
    this.route.navigate([""]);
  }

  focused(){
    this.searchFocus=true;
  }
  focusout(){
    this.searchFocus=false;
  }


  search(){
    localStorage.setItem('knjige',JSON.stringify(this.pretra));
    localStorage.setItem('odgod',JSON.stringify(this.od))
    localStorage.setItem('dogod',JSON.stringify(this.do))
    localStorage.setItem('izda',JSON.stringify(this.izdavac));
    localStorage.setItem('zanr',JSON.stringify(this.zanr))
    window.location.reload();
  }
  knjigaStr(k){
    localStorage.setItem("knjiga",JSON.stringify(k));
  }

  has(a:Array<Knjiga>,k:Knjiga):number{
    for(let i=0;i<a.length;i++){
      if(a[i].id==k.id) return i;
    }
    return -1;
  }
}

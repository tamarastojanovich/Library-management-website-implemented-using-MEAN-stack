import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KnjigeService } from '../knjige.service';
import { Knjiga } from '../modeli/knjiga';
import { Korisnik } from '../modeli/korisnik';
import { Rezervacija } from '../modeli/rezervacija';
import { Zaduzenje } from '../modeli/zaduzenje';
import { RezervacijaService } from '../rezervacija.service';
import { ZaduzenjaService } from '../zaduzenja.service';

@Component({
  selector: 'app-pregled-zaduzenih',
  templateUrl: './pregled-zaduzenih.component.html',
  styleUrls: ['./pregled-zaduzenih.component.css']
})
export class PregledZaduzenihComponent implements OnInit {

  constructor(private route:Router,private zad:ZaduzenjaService,private knj:KnjigeService,private rez:RezervacijaService) { }

  ngOnInit(): void {
    this.kor=JSON.parse(localStorage.getItem('ulogovan'))
    this.zaduz=[]
    this.zad.dohvatiZaduzenja(this.kor.kor_ime).subscribe((z:Zaduzenje[])=>{
      if(z.length!=0) {
        this.ima=true;
        for(let i=0;i<z.length;i++){
          z[i].ostalo=Math.ceil((new Date(z[i].rok).getTime()-new Date().getTime())/86400000);
          if(z[i].ostalo<0){
            this.kasni=true;
            z[i].ostalo=-z[i].ostalo;
          }
          this.zaduz.push(z[i]);
        }
    }
  else {this.ima=false;}
})
  }

  kor:Korisnik
  zaduz:Zaduzenje[]
  knjige:Knjiga[]
  ima:boolean;
  kasni:boolean;


  odjava(){
    localStorage.clear();
    this.route.navigate([""]);
  }

  pregled(i){
    this.knj.dohvatiKnjigu(i).subscribe((knj:Knjiga)=>{
      if(knj){
      localStorage.setItem('knjiga',JSON.stringify(knj))
      this.route.navigate(["knjiga"]);
  }})
    
  }

  razduzi(z:Zaduzenje){
    
    this.zad.razduzi(z.id_zad).subscribe((err)=>{
      if(err) console.log(err);
    })
        console.log("usli");
        this.rez.dohvatiRez(z.id).subscribe((r:Rezervacija[])=>{
          console.log("usli");
          if(r){
            r.sort((r1,r2)=>{
              if((new Date(r1.datum).getTime()-new Date(r2.datum).getTime())<0) return 1;
              else if ((new Date(r1.datum).getTime()-new Date(r2.datum).getTime())>0) return -1;
              else return 0;
            })
            let t:boolean=false;
            for(let i=0;i<r.length && !t;i++){
              console.log(r[i].kor);
              this.zad.dohvatiZaduzenja(r[i].kor).subscribe((zd:Zaduzenje[])=>{
                console.log(r[i].kor);
                if(zd.length<3 && !this.kasnii(zd)){
                  console.log(r[i].kor);
                  t=true;
                  this.rez.prihvatiRez(r[i].kor,z.id).subscribe((err)=>{
                    if(err) console.log(err);
                  })
                      this.zad.zaduzi(r[i].kor,z.naziv,z.autor,z.slika,z.id,z.zanr).subscribe((err)=>{
                        if(err) console.log(err);
                      });
                }
              })
              }
            }
           
            })
      
    
      
    window.location.reload()
  
  }

  produzi(z:Zaduzenje){
    let produzeno=new Date(new Date(z.rok).getTime()+this.kor.vreme*3600*24*1000).toLocaleDateString()
    this.zad.produzi(z.id_zad,produzeno).subscribe((err)=>{
      if(err) console.log(err);
    })
    window.location.reload();
  }

  kasnii(z:Zaduzenje[]){
    for(let i=0;i<z.length;i++){
      z[i].ostalo=Math.ceil((new Date(z[i].rok).getTime()-new Date().getTime())/86400000);
          if(z[i].ostalo<0) return true;
    }
    return false;
  }
}

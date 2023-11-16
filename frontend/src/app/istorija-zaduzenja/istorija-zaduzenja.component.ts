import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KnjigeService } from '../knjige.service';
import { Knjiga } from '../modeli/knjiga';
import { Korisnik } from '../modeli/korisnik';
import { Zaduzenje } from '../modeli/zaduzenje';
import { ZaduzenjaService } from '../zaduzenja.service';

@Component({
  selector: 'app-istorija-zaduzenja',
  templateUrl: './istorija-zaduzenja.component.html',
  styleUrls: ['./istorija-zaduzenja.component.css']
})
export class IstorijaZaduzenjaComponent implements OnInit {

  constructor(private router:Router,private z:ZaduzenjaService,private knj:KnjigeService) { }

  ngOnInit(): void {
    this.korisnik=JSON.parse(localStorage.getItem('ulogovan'))
    this.z.dohvatiVraceno(this.korisnik.kor_ime).subscribe((z:Zaduzenje[])=>{
      if(z)this.zaduzenja=z;
    })
  }

  korisnik:Korisnik
  zaduzenja:Zaduzenje[]
  param:String="vracanje"
  odjava(){
    localStorage.clear();
    this.router.navigate([""]);
  }

  pregled(k){
    this.knj.dohvatiKnjigu(k).subscribe((knj:Knjiga)=>{
      if(knj){
      localStorage.setItem('knjiga',JSON.stringify(knj))
      this.router.navigate(["knjiga"]);
  }})
}
sort(){
  console.log(this.param);
  switch(this.param){
    case("vracanje"):{
      this.zaduzenja.sort((z1,z2)=>{
        if(z1.vracena>z2.vracena) return -1;
        else if(z1.vracena<z2.vracena) return 1;
        else return 0;
      })
      break;
    }
    case("autor"):{
      this.zaduzenja.sort((z1,z2)=>{
        if(z1.autor>z2.autor) return 1;
        else if(z1.autor<z2.autor) return -1;
        else return 0;
      })
      break;
    }
    case("uzimanje"):{
      this.zaduzenja.sort((z1,z2)=>{
        if(z1.datum>z2.datum) return 1;
        else if(z1.datum<z2.datum) return -1;
        else return 0;
      })
      break;
    }
    case("naziv"):{
      this.zaduzenja.sort((z1,z2)=>{
        if(z1.naziv>z2.naziv) return 1;
        else if(z1.naziv<z2.naziv) return -1;
        else return 0;
      })
      break;
    }
  }
}
}

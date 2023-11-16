import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { KnjigeService } from '../knjige.service';
import { Knjiga } from '../modeli/knjiga';
import { Korisnik } from '../modeli/korisnik';
import { Zaduzenje } from '../modeli/zaduzenje';
import { PrijavaComponent } from '../prijava/prijava.component';
import { RegistracijaComponent } from '../registracija/registracija.component';
import { ZaduzenjaService } from '../zaduzenja.service';


@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css']
})
export class PocetnaComponent implements OnInit {

  constructor(private dialog:MatDialog,private router:Router,private knjServ:KnjigeService,private zad:ZaduzenjaService) { }

  ngOnInit(): void {
    let kor=JSON.parse(localStorage.getItem('ulogovan'));
    this.zanr=[]
    this.zanrovi=[]
    this.izdavaci=[]
    this.knjige_za_prikazati=[]
    this.top3=new Map<string,number>()
    if(kor){
      this.ulogovan=kor.ulogovan;
      this.korisnik=kor;
      console.log(this.korisnik.slika);
    }
    this.knjServ.dohvatiKnjige().subscribe((knjige:Knjiga[])=>{
      if(knjige){
        this.sve_knjige=knjige;
        for(let i=0;i<knjige.length;i++){
          this.top3.set(knjige[i].id,0);
        }
        console.log("usli");
       /* let ime=knjige[1].naziv;
        console.log(ime);
        this.prvaKnjiga=knjige[0].slika;
        console.log(knjige[0].naziv)
        this.drugaKnjiga=knjige[1].slika;
        this.trecaKnjiga=knjige[2].slika;
*/
        for(let i=0;i<knjige.length;i++){
          for(let j=0;j<knjige[i].zanr.length;j++)
          if(!this.zanrovi.includes(knjige[i].zanr[j])) this.zanrovi.push(knjige[i].zanr[j])
          if(!this.izdavaci.includes(knjige[i].izdavac)) this.izdavaci.push(knjige[i].izdavac)
        }
      }
    })
    this.zad.dohvatiSvaZaduzenja().subscribe((z:Zaduzenje[])=>{
      let top=["","",""]
      let topnum=[0,0,0]
      for(let i=0;i<z.length;i++){
        let num=this.top3.get(z[i].id);
        this.top3.set(z[i].id,(num+1));
      }
      for(let i=0;i<3;i++){
        for(let j=0;j<this.top3.size;j++){
          let num=this.top3.get(this.sve_knjige[j].id);
          if(num>topnum[i]){
            top[i]=this.sve_knjige[j].id;
            topnum[i]=num;
        }
      }
      this.top3.delete(top[i]);
    }
    for(let i=0;i<this.sve_knjige.length;i++){
      console.log("USLI");
      if(top[0]==this.sve_knjige[i].id) this.prvaKnjiga=this.sve_knjige[i].slika;
      if(top[1]==this.sve_knjige[i].id) this.drugaKnjiga=this.sve_knjige[i].slika;
      if(top[2]==this.sve_knjige[i].id) this.trecaKnjiga=this.sve_knjige[i].slika;
      
    }
    })
  }
  dropdownSettings={
    textField:null
  }
  top3:Map<string,number>
  od:number;
  do:number;
  izdavac:string="izdavac";
  zanr:string[]
  izdavaci:string[]
  zanrovi:string[]
  ulogovan:boolean;
  korisnik:Korisnik;
  prvaKnjiga:string;
  drugaKnjiga:String;
  trecaKnjiga:string;
  pretra:String="";
  sve_knjige:Knjiga[]
  knjige_za_prikazati:Knjiga[]
  searchFocus:boolean;
  focused(){
    this.searchFocus=true;
  }
  registracija(){
    this.dialog.open(RegistracijaComponent)
  }

  prijava(){
    localStorage.setItem("knjige",JSON.stringify(""));
   this.dialog.open(PrijavaComponent)
   //this.router.navigate(["/prijava"])
  }

  odjava(){
    localStorage.clear();

    window.location.reload();
    this.ulogovan=false;
  }

  focusout(){
    for(let i=0;i<this.zanr.length;i++) console.log(this.zanr[i])
    this.searchFocus=false;
  }

  onFocusOutEvent(event:any){
    this.searchFocus=false;
  }

  search(){
    /*this.knjige_za_prikazati=[]
    for(let i=0;i<this.sve_knjige.length;i++){
      if(this.sve_knjige[i].naziv.includes(this.pretraga)){
        this.knjige_za_prikazati.push(this.sve_knjige[i]);
      }
    }*/
    console.log(this.pretra);
    localStorage.setItem('knjige',JSON.stringify(this.pretra));
    this.router.navigate(['pretraga']);
  }
}

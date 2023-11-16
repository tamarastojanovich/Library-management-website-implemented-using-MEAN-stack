import { Component, defineInjectable, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { KnjigeService } from '../knjige.service';
import { KorisnikService } from '../korisnik.service';
import { Korisnik } from '../modeli/korisnik';
import { ZahteviService } from '../zahtevi.service';

@Component({
  selector: 'app-nova-knjiga',
  templateUrl: './nova-knjiga.component.html',
  styleUrls: ['./nova-knjiga.component.css']
})
export class NovaKnjigaComponent implements OnInit {

  constructor(private knj:KnjigeService,private zah:ZahteviService,private dij:MatDialog) { }

  ngOnInit(): void {
    this.kor=JSON.parse(localStorage.getItem('ulogovan'));
  }


  kor:Korisnik
  naziv:string;
  autori:string;
  zanr:string;
  izdavac:string;
  godina:number;
  jezik:string;
  slika:string;

  dodaj(){
    if(this.kor.tip=='moderator' || this.kor.tip=='admin'){
    console.log(this.zanr)
    let autor=this.autori.split(",");
    let zanr=this.zanr.split(",")
  this.knj.dodajKnjigu(this.naziv,autor,zanr,this.izdavac,this.godina,this.jezik,this.slika).subscribe((err)=>{
  if(err) console.log(err);
})
    }else{
      this.zah.postaviZahtev(this.naziv,this.autori,this.zanr,this.izdavac,this.godina,this.jezik,this.slika).subscribe((err)=>{
        if(err) console.log(err);
      })
    }
    this.dij.closeAll()
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

}

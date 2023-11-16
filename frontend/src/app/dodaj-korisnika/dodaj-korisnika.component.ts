import { Component, OnInit } from '@angular/core';
import { KorisnikService } from '../korisnik.service';

@Component({
  selector: 'app-dodaj-korisnika',
  templateUrl: './dodaj-korisnika.component.html',
  styleUrls: ['./dodaj-korisnika.component.css']
})
export class DodajKorisnikaComponent implements OnInit {

  constructor(private korServ:KorisnikService) { }

  ngOnInit(): void {

  }

  korisnicko_ime:string;
  lozinka:string;
  ime:string;
  prezime:string;
  adresa:string;
  telefon:string;
  email:string;
  slika:string;
  message:string;
  dodaj(){
    let urlSlike=this.slika;
    this.korServ.registracija(this.korisnicko_ime,this.lozinka,this.ime,this.prezime,this.adresa,this.telefon,this.email,urlSlike).subscribe((resp)=>{
      console.log(resp['message'])
      if(resp['message']!='ok'){
        this.message=resp['message'];
        
      }
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


}

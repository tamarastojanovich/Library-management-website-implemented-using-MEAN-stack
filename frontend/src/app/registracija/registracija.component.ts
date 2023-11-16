import { Component, OnInit } from '@angular/core';
import { KorisnikService } from '../korisnik.service';
import { ZahteviService } from '../zahtevi.service';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css']
})
export class RegistracijaComponent implements OnInit {

  constructor(private korServ:KorisnikService,private zah:ZahteviService) { }

  ngOnInit(): void {
  }

  korisnicko_ime:string;
  lozinka:string;
  potvrda_lozinke:string;
  ime:string;
  prezime:string;
  adresa:string;
  telefon:string;
  email:string;
  slika:string;
  message:string;
  registracija(){
    let urlSlike=this.slika;
    if((this.potvrda_lozinke==this.lozinka)&&this.validate()){
    this.zah.postaviRegZahtev(this.korisnicko_ime,this.lozinka,this.ime,this.prezime,this.adresa,this.telefon,this.email,urlSlike).subscribe((resp)=>{
      console.log(resp['message'])
      if(resp['message']!='ok'){
        this.message=resp['message'];
        
      }
    })
  }else{
    if(this.potvrda_lozinke!=this.lozinka)this.message="Lozinka i potvrda lozinke se ne poklapaju";
  }
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

  validate():boolean{
    let odg=false;
    if ((this.lozinka.length<=12)&&(this.lozinka.length>=8)&&this.lozinka.match(/[0-9]/)&&this.lozinka.match(/[A-Z]/)&&this.lozinka.match(/[!\@\?\#\$\%\^\&\*\(\)\_\+\=\-\<\>\,\.\(\)\|\/]/)&&this.lozinka.charAt(0).match(/[a-z]/)){
      odg=true;
    }
    if(odg==false)this.message="Lozinka mora da sadrzi barem jedno veliko slovo,barem jedan broj i barem jedan specijalni karakter. Takodje mora da pocinje malim slovom!"
    else this.message="Lozinka je okej";
    return odg;
  }
}

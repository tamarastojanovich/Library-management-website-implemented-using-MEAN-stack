import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { KorisnikService } from '../korisnik.service';

@Component({
  selector: 'app-izmeni-korisnika',
  templateUrl: './izmeni-korisnika.component.html',
  styleUrls: ['./izmeni-korisnika.component.css']
})
export class IzmeniKorisnikaComponent implements OnInit {
  constructor(private korServ:KorisnikService,private dij:MatDialog) { }

  ngOnInit(): void {
    let kor=JSON.parse(localStorage.getItem('promena'));
    this.staro=kor.kor_ime;
    this.korisnicko_ime=kor.kor_ime;
    this.lozinka=kor.lozinka;
    this.ime=kor.ime;
    this.prezime=kor.prezime;
    this.adresa=kor.adresa;
    this.telefon=kor.telefon;
    this.email=kor.mejl;
    this.stari_mejl=kor.mejl;

  }

  staro:string;
  stari_mejl:string;
  korisnicko_ime:string;
  lozinka:string;
  ime:string;
  prezime:string;
  adresa:string;
  telefon:string;
  email:string;
  slika:string;
  message:string;

  registracija(){
    let urlSlike=this.slika;
    this.korServ.azuriraj(this.staro,this.stari_mejl,this.korisnicko_ime,this.lozinka,this.ime,this.prezime,this.adresa,this.telefon,this.email,urlSlike).subscribe((resp)=>{
      console.log(resp['message'])
      if(resp['message']!='ok'){
        this.message=resp['message'];
        alert(this.message);
      }
      }
    )
      this.dij.closeAll();
    window.location.reload()
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

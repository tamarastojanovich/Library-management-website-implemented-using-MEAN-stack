import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Knjiga } from '../modeli/knjiga';
import { KnjigaZahtev } from '../modeli/knjigaZahtev';
import { Korisnik } from '../modeli/korisnik';
import { ZahteviService } from '../zahtevi.service';

@Component({
  selector: 'app-knjiga-zahtevi',
  templateUrl: './knjiga-zahtevi.component.html',
  styleUrls: ['./knjiga-zahtevi.component.css']
})
export class KnjigaZahteviComponent implements OnInit {

  constructor(private zahServ:ZahteviService,private router:Router) { }

  ngOnInit(): void {
    this.korisnik=JSON.parse(localStorage.getItem('ulogovan'))
    this.zahServ.dohvatiZahteve().subscribe((z:KnjigaZahtev[])=>{
      if(z) this.zahtevi=z;
    })
  }
  zahtevi:KnjigaZahtev[]
  korisnik:Korisnik

  dodaj(z:KnjigaZahtev){
    this.zahServ.prihvatiZahtev(z.naziv,z.autor,z.zanr,z.izdavac,z.godina,z.jezik,z.slika).subscribe((err)=>{
      if(err) console.log(err);
    })
    window.location.reload();
  }
  odjava(){
    localStorage.clear();
    this.router.navigate([""])
  }
}

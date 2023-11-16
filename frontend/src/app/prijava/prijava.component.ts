import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';
import { LozinkaComponent } from '../lozinka/lozinka.component';
import { Korisnik } from '../modeli/korisnik';
import { RegistracijaComponent } from '../registracija/registracija.component';

@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.css']
})
export class PrijavaComponent implements OnInit {

  constructor(private korServ:KorisnikService,private route:Router,private dialog:MatDialog) { }

  ngOnInit(): void {
   
  }

  korisnicko:String;
  lozinka:String;
  message:String;


  prijava(){
    this.korServ.prijava(this.korisnicko,this.lozinka).subscribe((Kor:Korisnik)=>{
      if(Kor){
        this.dialog.closeAll();
        Kor.ulogovan=true;
        localStorage.setItem('ulogovan',JSON.stringify(Kor));
        if(Kor.tip=="citalac" || Kor.tip=="moderator") this.route.navigate(["/citalac"]); 
        else window.location.reload()
      }else{
        this.message="Ne postoji dati korisnik"
      }
    })
   
  }

  registracija(){
    this.dialog.closeAll();
    this.dialog.open(RegistracijaComponent)

  }

  pocetna(){
    this.route.navigate([""]);
  }


  promena(){
    this.dialog.closeAll();
    this.dialog.open(LozinkaComponent)
  }

}

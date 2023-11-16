import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { KnjigeService } from '../knjige.service';
import { Knjiga } from '../modeli/knjiga';
import { PrijavaComponent } from '../prijava/prijava.component';
import { RegistracijaComponent } from '../registracija/registracija.component';

@Component({
  selector: 'app-pretraga-knjiga',
  templateUrl: './pretraga-knjiga.component.html',
  styleUrls: ['./pretraga-knjiga.component.css']
})
export class PretragaKnjigaComponent implements OnInit {

  constructor(private knjServ:KnjigeService,private dij:MatDialog) { }

  ngOnInit(): void {
    let pr=JSON.parse(localStorage.getItem('knjige'));
    this.pretraga=pr;
    this.knjige=[]
    this.knjServ.dohvatiKnjige().subscribe((k:Knjiga[])=>{
      if(k){
        for(let i=0;i<k.length;i++){
          for(let j=0;j<k[i].autor.length;j++){
          if(k[i].naziv.toLowerCase().includes(this.pretraga.toLowerCase()) || k[i].autor[j].toLowerCase().includes(this.pretraga.toLowerCase())){
            if(!this.knjige.includes(k[i]))this.knjige.push(k[i]);
          }
        }
        }
        
      }
    })
  }


  knjige:Knjiga[]
  pretraga:string

  prijava(){
    this.dij.open(PrijavaComponent)
  }
  registracija(){
    this.dij.open(RegistracijaComponent)
  }

  search(){
    localStorage.setItem('knjige',JSON.stringify(this.pretraga));
    window.location.reload();
  }
}

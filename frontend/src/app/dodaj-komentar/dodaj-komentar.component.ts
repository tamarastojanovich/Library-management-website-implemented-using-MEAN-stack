import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { KnjigeService } from '../knjige.service';
import { KomentariService } from '../komentari.service';

@Component({
  selector: 'app-dodaj-komentar',
  templateUrl: './dodaj-komentar.component.html',
  styleUrls: ['./dodaj-komentar.component.css']
})
export class DodajKomentarComponent implements OnInit {

  constructor(private kom:KomentariService,private knj:KnjigeService,private dij:MatDialog) { }

  ngOnInit(): void {
    let kor=JSON.parse(localStorage.getItem('ulogovan'));
    this.kor_ime=kor.kor_ime;
    let knj=JSON.parse(localStorage.getItem('knjiga'))
    this.id=knj.id;
    this.trenutna_ocena=knj.ocena;
  }
  trenutna_ocena:number;
  nova_ocena:number;
  kor_ime:string;
  id:number;
  tekst:string
  ocena:number;
  dodaj(){ 
    this.nova_ocena=(this.trenutna_ocena+this.ocena)/2.;
    this.kom.dodajKomentar(this.tekst,this.kor_ime,this.id,this.ocena).subscribe((err)=>{
      if(err) console.log(err);
    })
    this.knj.oceni(this.id,this.nova_ocena).subscribe((err)=>{
      if(err) console.log(err);
    })
    this.dij.closeAll()
    window.location.reload();
  }

}

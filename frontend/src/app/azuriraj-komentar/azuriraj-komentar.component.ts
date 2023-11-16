import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { KnjigeService } from '../knjige.service';
import { KomentariService } from '../komentari.service';

@Component({
  selector: 'app-azuriraj-komentar',
  templateUrl: './azuriraj-komentar.component.html',
  styleUrls: ['./azuriraj-komentar.component.css']
})
export class AzurirajKomentarComponent implements OnInit {

  constructor(private kom:KomentariService,private knj:KnjigeService,private dij:MatDialog) { }

  ngOnInit(): void {
    let kom=JSON.parse(localStorage.getItem('komentar'));
    let knj=JSON.parse(localStorage.getItem('knjiga'))
    let kor=JSON.parse(localStorage.getItem('ulogovan'))
    this.ocena=kom.ocena;
    this.tekst=kom.tekst;
    this.stara_ocena=kom.ocena;
    this.ocena_knjige=knj.ocena;
    this.id=knj.id;
    this.kor=kor.kor_ime;
  }
  kor:string;
  id:number;
  ocena_knjige:number;
  stara_ocena:number;
  ocena:number;
  tekst:number;
  azuriraj(){
    let nova=this.ocena_knjige*2-this.stara_ocena;
    nova=(nova+this.ocena)/2.;
    this.kom.azurirajKomentar(this.tekst,this.kor,this.id,this.ocena).subscribe((err)=>{
      if(err) console.log(err);
    })
    this.knj.oceni(this.id,nova).subscribe((err)=>{
      if(err) console.log(err);
    })
    this.dij.closeAll()
    window.location.reload();
  }
  
}

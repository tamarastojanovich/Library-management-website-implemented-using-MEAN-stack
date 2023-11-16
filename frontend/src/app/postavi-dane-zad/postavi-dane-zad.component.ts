import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { KorisnikService } from '../korisnik.service';

@Component({
  selector: 'app-postavi-dane-zad',
  templateUrl: './postavi-dane-zad.component.html',
  styleUrls: ['./postavi-dane-zad.component.css']
})
export class PostaviDaneZadComponent implements OnInit {

  constructor(private korServ:KorisnikService,private dij:MatDialog) { }

  ngOnInit(): void {
    let kor=JSON.parse(localStorage.getItem('promenaDana'))
    this.kor=kor;
  }

  dani:number;
  kor:String;
  promeni(){
    this.korServ.postaviDaneZad(this.dani,this.kor).subscribe((err)=>{
      if(err) console.log(err);
    })
    this.dij.closeAll()

  }
}

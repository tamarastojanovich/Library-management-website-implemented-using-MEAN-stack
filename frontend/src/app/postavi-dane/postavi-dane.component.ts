import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { KorisnikService } from '../korisnik.service';

@Component({
  selector: 'app-postavi-dane',
  templateUrl: './postavi-dane.component.html',
  styleUrls: ['./postavi-dane.component.css']
})
export class PostaviDaneComponent implements OnInit {

  constructor(private korServ:KorisnikService,private dij:MatDialog) { }

  ngOnInit(): void {
  }

  dani:number;
  promeni(){
    this.korServ.postaviDane(this.dani).subscribe((err)=>{
      if(err) console.log(err);
    })
    this.dij.closeAll()

  }

}

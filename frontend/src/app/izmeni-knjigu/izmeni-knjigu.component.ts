import { Component, OnInit } from '@angular/core';
import { KnjigeService } from '../knjige.service';

@Component({
  selector: 'app-izmeni-knjigu',
  templateUrl: './izmeni-knjigu.component.html',
  styleUrls: ['./izmeni-knjigu.component.css']
})
export class IzmeniKnjiguComponent implements OnInit {

  constructor(private knj:KnjigeService) { }


  ngOnInit(): void {
    let knj=JSON.parse(localStorage.getItem('promena'))
    this.naziv=knj.naziv;
    //this.autori=knj.autor;
    //this.zanr=knj.zanr;
    for(let i=0;i<knj.autor.length;i++){
      this.autori=this.autori+knj.autor[i];
      if((i+1)!=knj.autor.length)this.autori=this.autori+","
    }
    for(let i=0;i<knj.zanr.length;i++){
      this.zanr=this.zanr+knj.zanr[i];
      if((i+1)!=knj.zanr.length)this.zanr=this.zanr+","
    }
    this.izdavac=knj.izdavac;
    this.godina=knj.godina;
    this.jezik=knj.jezik;
    this.id=knj._id;
    this.stanje=knj.stanje;
  }

  id:string;
  naziv:string;
  autori:string="";
  zanr:string="";
  izdavac:string;
  godina:number;
  jezik:string;
  slika:string;
  stanje:number;

  azuriraj(){
    console.log(this.zanr)
    let autor=this.autori.split(",");
    let zanr=this.zanr.split(",")
  this.knj.azuriraj(this.id,this.naziv,autor,zanr,this.izdavac,this.godina,this.jezik,this.slika,this.stanje).subscribe((err)=>{
  if(err) console.log(err);
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

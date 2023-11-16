import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';

@Component({
  selector: 'app-lozinka',
  templateUrl: './lozinka.component.html',
  styleUrls: ['./lozinka.component.css']
})
export class LozinkaComponent implements OnInit {

  constructor(private route:Router,private dijalog:MatDialog,private korServ:KorisnikService) { }

  ngOnInit(): void {
    let kori=JSON.parse(localStorage.getItem('ulogovan'))
    this.kor=kori.kor_ime;
    this.loz=kori.lozinka;
  }

  loz:string;
  kor:string;
  staraLozinka:string;
  novaLozinka:string;
  novaLozinka2:string;
  message:string;

  promena(){
    if((this.novaLozinka!=this.staraLozinka)&&(this.novaLozinka==this.novaLozinka2)&&this.validate()&&(this.staraLozinka==this.loz)){
      this.korServ.promeniLozinku(this.kor,this.novaLozinka).subscribe((err)=>{
        if(err) console.log(err);
      })
      localStorage.clear();
      this.route.navigate([""])
      this.dijalog.closeAll()

    }else{
       if(this.novaLozinka!=this.novaLozinka2)this.message="Lozinka i potvrda lozinke Vam se razlikuju."
      if(this.novaLozinka==this.staraLozinka) this.message="Nova lozinka mora da bude drugacije od prethodne.";
      if(this.staraLozinka!=this.loz) this.message="Stara lozinka Vam nije dobra.";
    
    
    }
  
  
  }


  validate():boolean{
    let odg=false;
    if ((this.novaLozinka.length<=12)&&(this.novaLozinka.length>=8)&&this.novaLozinka.match(/[0-9]/)&&this.novaLozinka.match(/[A-Z]/)&&this.novaLozinka.match(/[!\@\?\#\$\%\^\&\*\(\)\_\+\=\-\<\>\,\.\(\)\|\/]/)&&this.novaLozinka.charAt(0).match(/[a-z]/)){
      odg=true;
    }
    if(odg==false)this.message="Lozinka mora da sadrzi barem jedno veliko slovo,barem jedan broj i barem jedan specijalni karakter. Takodje mora da pocinje malim slovom!"
    else this.message="Lozinka je okej";
    return odg;
  }
}

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';
import { LozinkaComponent } from '../lozinka/lozinka.component';
import { Korisnik } from '../modeli/korisnik';
import { NovaKnjigaComponent } from '../nova-knjiga/nova-knjiga.component';
import {ChartType,ChartDataset,ChartData} from 'chart.js'
import { ZaduzenjaService } from '../zaduzenja.service';
import { Zaduzenje } from '../modeli/zaduzenje';
import { KnjigeService } from '../knjige.service';
import { Knjiga } from '../modeli/knjiga';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  constructor(private route:Router,private dijalog:MatDialog,private korserv:KorisnikService,private zad:ZaduzenjaService,private knj:KnjigeService) { }


  ngOnInit(): void {
    let kor=JSON.parse(localStorage.getItem('ulogovan'))
    this.poZanrovima=new Map()
    this.korisnik=kor;
    this.staro=kor.kor_ime;
    this.korisnicko_ime=kor.kor_ime;
    this.lozinka=kor.lozinka;
    this.ime=kor.ime;
    this.prezime=kor.prezime;
    this.adresa=kor.adresa;
    this.telefon=kor.telefon;
    this.email=kor.mejl;
    this.stari_mejl=kor.mejl;
    this.slika=kor.slika;
    let zanrovi=[]
    this.knj.dohvatiKnjige().subscribe((k:Knjiga[])=>{
      if(k){
        for(let i=0;i<k.length;i++){
          for(let j=0;j<k[i].zanr.length;j++){
        if(!zanrovi.includes(k[i].zanr[j])) {
          console.log('usli')
          
          zanrovi.push(k[i].zanr[j]);}
        }
        console.log(zanrovi.length)
        for(let i=0;i<zanrovi.length;i++) {
          console.log(zanrovi[i])
          this.poZanrovima.set(zanrovi[i],0);
      }}
    }
  }
)
    console.log(zanrovi.length)
    let procitane=[]
    this.zad.dohvatiVraceno(this.korisnicko_ime).subscribe((Z:Zaduzenje[])=>{
      for(let i=0;i<Z.length;i++){
        if((this.has(procitane,Z[i].id))<0){
          procitane.push(Z[i].id)
        console.log("vraceno")
        
        console.log(new Date().getFullYear()-new Date(Z[i].vracena).getFullYear())
        if((new Date().getFullYear()-new Date(Z[i].vracena).getFullYear())==0)this.brojProcitanih=this.brojProcitanih+1;
        else{
        if(((new Date().getFullYear()-new Date(Z[i].vracena).getFullYear()))==1){
          if(((new Date().getMonth()-new Date(Z[i].vracena).getMonth()))<0) this.brojProcitanih=this.brojProcitanih+1;
          else{
            if((new Date().getMonth()-new Date(Z[i].vracena).getMonth())==0){
              if((new Date().getDay()-new Date(Z[i].vracena).getDay())<=0) this.brojProcitanih=this.brojProcitanih+1;
            }
          }
        }
      }
      }
      console.log(Z[i].zanr)
      for(let j=0;j<Z[i].zanr.length;j++){
      let num=this.poZanrovima.get(Z[i].zanr[j]);//treba updatovati ovo
      console.log(Z[i].zanr[j])
      console.log(num)
      this.poZanrovima.set(Z[i].zanr[j],(num+1));
      }
    }
      console.log(this.brojProcitanih)
      this.lineChartLabels=['Broj procitanih']
      this.lineChartData=[
        { data: [this.brojProcitanih], label: 'Broj procitanih' },
      ];
      this.lineData={
        labels:["Broj procitanih za godinu dana"],
        datasets:[{
          data:[this.brojProcitanih],
          backgroundColor:["orange"]
        }]
    
        }
        console.log(zanrovi.length)
    let Zanrbroj=[]
    for(let i=0;i<zanrovi.length;i++){
      Zanrbroj.push(this.poZanrovima.get(zanrovi[i]));
      console.log(Zanrbroj[i])
    }
    this.lineChartLabels2=['Broj procitanih po zanrovima']
      this.lineChartData2=[
        { data:Zanrbroj, label: 'Broj procitanih po zanrovima' },
      ];
      this.lineData2={
        labels:zanrovi,
        datasets:[{
          data:Zanrbroj,
          backgroundColor:["orange","red","green"],
          label:this.lineChartLabels2,
         
        }]
      }
    })

    

    
    
  }

  poZanrovima:Map<string,number>
  brojProcitanih:number=0;
  korisnik:Korisnik
  editSlika:boolean;
  editInf:boolean;
  novoKor:string;
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

  odjava(){
    localStorage.clear();
    this.route.navigate([""]);
  }
  edit(){
    this.editSlika=true;
  }

  gotovo(){
    this.korisnik.kor_ime=this.korisnicko_ime;
    this.korisnik.adresa=this.adresa;
    this.korisnik.ime=this.ime;
    this.korisnik.mejl=this.email;
    this.korisnik.prezime=this.prezime;
    this.korisnik.slika=this.slika;
    this.korisnik.telefon=this.telefon;
    localStorage.setItem('ulogovan',JSON.stringify(this.korisnik));
    this.korserv.azuriraj(this.staro,this.stari_mejl,this.korisnicko_ime,this.lozinka,this.ime,this.prezime,this.adresa,this.telefon,this.email,this.slika).subscribe((err)=>{
      if(err) console.log(err);
    })
    this.editSlika=false;
    this.editInf=false;
    window.location.reload();
  }

  editInfo(){
    this.editInf=true;
  }
  promena(){
    this.dijalog.open(LozinkaComponent);
  }

  dodaj(){
    this.dijalog.open(NovaKnjigaComponent)
  }

  pregled(){
    
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
//deo za grafik
  public lineChartLabels;
  public lineChartLabels2;
    
  public lineChartOptions = {
    responsive: true,
  };

  public lineChartOptions2={
    responsive:true,
  };
     
  public lineChartLegend = true;
  public lineChartType:ChartType= 'doughnut';
  public lineChartPlugins = [];

  public lineChartData: ChartDataset[];

  public lineData:ChartData<'bar'>;
  public lineChartLegend2 = true;
  public lineChartType2:ChartType= 'bar';
  public lineChartPlugins2 = [];

  public lineChartData2: ChartDataset[];

  public lineData2:ChartData<'bar'>;
  has(a:Array<string>,id:string):number{
    for(let i=0;i<a.length;i++){
      if(a[i]==id) return i;
    }
    return -1;
  }
  }



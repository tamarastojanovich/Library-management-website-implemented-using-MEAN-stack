import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KorisnikService {

  constructor(private http:HttpClient) { }


  url="http://localhost:4000";
  static  br_dana=14;

  

  prijava(ime,loz){
    const data={
      kor_ime:ime,
      lozinka:loz
    }

    return this.http.post(`${this.url}/korisnici/prijava`,data);
  }

  registracija(kor,loz,ime,prezime,adr,fon,mail,urlSlike){
    const data={
      kor_ime:kor,
      lozinka:loz,
      ime:ime,
      prezime:prezime,
      adresa:adr,
      telefon:fon,
      mejl:mail,
      tip:"citalac",
      slika:urlSlike,
      vreme:KorisnikService.br_dana
    }
    return this.http.post(`${this.url}/korisnici/registracija`,data);
  }

  dohvatiSve(){
    return this.http.get(`${this.url}/korisnici/dohvatiSve`);
  }
  brisi(k){
    const data={
      kor_ime:k
    }
    return this.http.post(`${this.url}/korisnici/brisi`,data);
  }
  azuriraj(staro,mejl,kor,loz,ime,prezime,adr,fon,mail,urlSlike){
    const data={
        staro:staro,
        stari_mejl:mejl,
        kor_ime:kor,
        lozinka:loz,
        ime:ime,
        prezime:prezime,
        adresa:adr,
        telefon:fon,
        mejl:mail,
        slika:urlSlike
    }
    return this.http.post(`${this.url}/korisnici/azuriraj`,data);
  }
  spusti(k){
    const data={
      kor_ime:k
    }
    return this.http.post(`${this.url}/korisnici/spusti`,data);
  }
  podigni(k){
    const data={
      kor_ime:k
    }
    return this.http.post(`${this.url}/korisnici/podigni`,data);
  }
  blokiraj(k){
    const data={
      kor_ime:k
    }
    return this.http.post(`${this.url}/korisnici/blokiraj`,data);
  }
  odblokiraj(k){
    const data={
      kor_ime:k
    }
    return this.http.post(`${this.url}/korisnici/odblokiraj`,data);
  }

  postaviDane(d){
    KorisnikService.br_dana=d;
    console.log(KorisnikService.br_dana)
    const data={
      dani:KorisnikService.br_dana
    }
    return this.http.post(`${this.url}/korisnici/postaviDane`,data);

  }
  postaviDaneZad(d,k){
    const data={
      dani:d,
      kor:k
    }
    return this.http.post(`${this.url}/korisnici/postaviDaneZad`,data);

  }

  promeniLozinku(k,p){
    const data={
      kor_ime:k,
      lozinka:p
    }
    return this.http.post(`${this.url}/korisnici/promeniLozinku`,data)
  }
}



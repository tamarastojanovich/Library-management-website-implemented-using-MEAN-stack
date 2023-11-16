import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ZahteviService {

  constructor(private http:HttpClient) { }


  url="http://localhost:4000"
  postaviZahtev(n,a,z,i,g,j,s){
    const data={
      naziv:n,
      autor:a,
      zanr:z,
      izdavac:i,
      godina:g,
      jezik:j,
      slika:s
    }

    return this.http.post(`${this.url}/zahtevi/postaviZahtev`,data)
  }

  prihvatiZahtev(n,a,z,i,g,j,s){
    const data={
      naziv:n,
      autor:a,
      zanr:z,
      izdavac:i,
      godina:g,
      jezik:j,
      slika:s
    }
    return this.http.post(`${this.url}/zahtevi/prihvatiZahtev`,data)

  }
  

  dohvatiZahteve(){
    return this.http.get(`${this.url}/zahtevi/dohvatiZahteveZaKnjigu`)
  }
  dohvatiPrihvacene(){
    return this.http.get(`${this.url}/zahtevi/dohvatiPrihvaceneZaKnjigu`)
  }

  postaviRegZahtev(kor,loz,ime,prezime,adr,fon,mail,urlSlike){
    const data={
      kor_ime:kor,
      lozinka:loz,
      ime:ime,
      prezime:prezime,
      adresa:adr,
      telefon:fon,
      mejl:mail,
      tip:"citalac",
      slika:urlSlike
    }
    return this.http.post(`${this.url}/zahtevi/postaviRegZahtev`,data)
  }
  dohvRegZahteve(){
    return this.http.get(`${this.url}/zahtevi/dohvatiRegZahteve`)
  }

  prihvatiRegZahtev(kor,loz,ime,prezime,adr,fon,mail,urlSlike){
    const data={
      kor_ime:kor,
      lozinka:loz,
      ime:ime,
      prezime:prezime,
      adresa:adr,
      telefon:fon,
      mejl:mail,
      tip:"citalac",
      slika:urlSlike
    }
    return this.http.post(`${this.url}/zahtevi/prihvatiRegZahtev`,data)
  }

  odbijRegZahtev(k){
    const data={
      kor_ime:k
    }
    return this.http.post(`${this.url}/zahtevi/odbijZahtev`,data)
  }
}

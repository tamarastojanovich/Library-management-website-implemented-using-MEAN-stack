import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KnjigeService {

  constructor(private http:HttpClient) { }


  url="http://localhost:4000"
  dohvatiKnjige(){
    return this.http.get(`${this.url}/knjige/dohvatiSveKnjige`);
  }
  dohvatiKnjigu(i){
    const data={
      id:i
    }
    return this.http.post(`${this.url}/knjige/dohvatiKnjigu`,data);

  }
  dodajKnjigu(n,a,z,i,g,j,s){
    const data={
      naziv:n,
      autor:a,
      zanr:z,
      izdavac:i,
      godina:g,
      jezik:j,
      slika:s
    }

    return this.http.post(`${this.url}/knjige/dodajKnjigu`,data)
  }
  brisi(i){
    const data={
      id:i
    }
    return this.http.post(`${this.url}/knjige/brisi`,data)
  }

  azuriraj(id,n,a,z,i,g,j,s,sta){
    console.log(id);
    const data={
      id:id,
      naziv:n,
      autor:a,
      zanr:z,
      izdavac:i,
      godina:g,
      jezik:j,
      slika:s,
      stanje:sta
    }
    return this.http.post(`${this.url}/knjige/azuriraj`,data)
  }

  oceni(i,o){
    const data={
      id:i,
      ocena:o
    }
    return this.http.post(`${this.url}/knjige/oceni`,data)
  }
}

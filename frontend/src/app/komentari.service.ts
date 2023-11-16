import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KomentariService {

  constructor(private http:HttpClient) { }


  url="http://localhost:4000"
  dodajKomentar(t,k,i,o){
    const data={
      tekst:t,
      kor:k,
      idKnjige:i,
      ocena:o
    }
    return this.http.post(`${this.url}/komentari/dodajKomentar`,data)

  }
  azurirajKomentar(t,k,i,o){
    const data={
      tekst:t,
      kor:k,
      idKnjige:i,
      ocena:o
    }
    return this.http.post(`${this.url}/komentari/azurirajKomentar`,data)

  }

  dohvKomentare(i){
    const data={
      idKnjige:i
    }
    return this.http.post(`${this.url}/komentari/dohvKomentare`,data)
  }
}

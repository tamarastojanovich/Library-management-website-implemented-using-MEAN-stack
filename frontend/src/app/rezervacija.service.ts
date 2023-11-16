import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RezervacijaService {

  constructor(private http:HttpClient) { }


  url="http://localhost:4000"
  rezervisi(i,k,d){
    const data={
      id:i,
      kor:k,
      datum:d
    }

    return this.http.post(`${this.url}/rezervacije/rezervisi`,data)
  }

  prihvatiRez(kor,i){
    const data={
      kor:kor,
      id:i
    }
    return this.http.post(`${this.url}/rezervacije/prihvatiRez`,data)
  }

  dohvatiRez(i){
    const data={
      id:i
    }
    return this.http.post(`${this.url}/rezervacije/dohvatiRez`,data)
  }

  dohvRezKor(k){
    const data={
      kor:k
    }
  
  return this.http.post(`${this.url}/rezervacije/dohvatiRezKor`,data)
  }

  izbrisiRez(k,i){
    const data={
      kor:k,
      id:i
    }
    return this.http.post(`${this.url}/rezervacije/izbrisiRez`,data)
  }
}

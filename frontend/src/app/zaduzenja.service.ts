import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ZaduzenjaService {

  constructor(private http:HttpClient) { }

  url="http://localhost:4000"
  ImaNaZaduzenju(k,i){
    const data={
      kor:k,
      id:i
    }
    return this.http.post(`${this.url}/zaduzenja/ImaNaZaduzenju`,data);
  }
  dohvatiZaduzenja(k){
    const data={
      kor:k
    }
    return this.http.post(`${this.url}/zaduzenja/dohvatiZaduzenja`,data);
  }

razduzi(i){
  const data={
    id:i
  }
  return this.http.post(`${this.url}/zaduzenja/razduzi`,data);
}

produzi(i,v){
  const data={
    id:i,
    vratiti:v
  }
  return this.http.post(`${this.url}/zaduzenja/produzi`,data)
}

zaduzi(k,n,a,s,i,z){
  const data={
        kor:k,
        naziv:n,
        autor:a,
        slika:s,
        id:i,
        zanr:z
  }
  return this.http.post(`${this.url}/zaduzenja/zaduzi`,data)
}

knjigaNaZaduzenju(i){
  const data={
    id:i
  }
  return this.http.post(`${this.url}/zaduzenja/knjigaNaZaduzenju`,data)
}

dohvatiVraceno(k){
  const data={
    kor:k
  }
  return this.http.post(`${this.url}/zaduzenja/dohvatiVraceno`,data);
}

dohvatiSvaZaduzenja(){
  return this.http.get(`${this.url}/zaduzenja/dohvatiSvaZaduzenja`);
}
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { CitalacComponent } from './citalac/citalac.component';
import { DodajKomentarComponent } from './dodaj-komentar/dodaj-komentar.component';
import { IstorijaZaduzenjaComponent } from './istorija-zaduzenja/istorija-zaduzenja.component';
import { KnjigaZahteviComponent } from './knjiga-zahtevi/knjiga-zahtevi.component';
import { KnjigaComponent } from './knjiga/knjiga.component';
import { LozinkaComponent } from './lozinka/lozinka.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { PregledZaduzenihComponent } from './pregled-zaduzenih/pregled-zaduzenih.component';
import { PretragaKnjigaComponent } from './pretraga-knjiga/pretraga-knjiga.component';
import { PrijavaComponent } from './prijava/prijava.component';
import { ProfilComponent } from './profil/profil.component';
import { RegistracijaComponent } from './registracija/registracija.component';


const routes: Routes = [
  {path:"",component:PocetnaComponent},
  {path:"registracija",component:RegistracijaComponent},
  {path:"prijava",component:PrijavaComponent},
  {path:"citalac",component:CitalacComponent},
  {path:"profil",component:ProfilComponent},
  {path:"pretraga",component:PretragaKnjigaComponent},
  {path:"lozinka",component:LozinkaComponent},
  {path:"knjiga",component:KnjigaComponent},
  {path:"pregledZaduzenih",component:PregledZaduzenihComponent},
  {path:"istorijaZaduzenja",component:IstorijaZaduzenjaComponent},
  {path:"admin",component:AdminComponent},
  {path:"knjigaZahtevi",component:KnjigaZahteviComponent},
  {path:"dodajKom",component:DodajKomentarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

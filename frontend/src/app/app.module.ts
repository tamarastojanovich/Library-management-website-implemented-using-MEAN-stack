import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrijavaComponent } from './prijava/prijava.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { FormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {HttpClientModule} from "@angular/common/http";
import { CitalacComponent } from './citalac/citalac.component';
import { ProfilComponent } from './profil/profil.component';
import { PretragaKnjigaComponent } from './pretraga-knjiga/pretraga-knjiga.component';
import { LozinkaComponent } from './lozinka/lozinka.component';
import { KnjigaComponent } from './knjiga/knjiga.component';
import { PregledZaduzenihComponent } from './pregled-zaduzenih/pregled-zaduzenih.component';
import { IstorijaZaduzenjaComponent } from './istorija-zaduzenja/istorija-zaduzenja.component';
import { NovaKnjigaComponent } from './nova-knjiga/nova-knjiga.component';
import { AdminComponent } from './admin/admin.component';
import { IzmeniKnjiguComponent } from './izmeni-knjigu/izmeni-knjigu.component';
import { IzmeniKorisnikaComponent } from './izmeni-korisnika/izmeni-korisnika.component';
import { DodajKorisnikaComponent } from './dodaj-korisnika/dodaj-korisnika.component';
import { PostaviDaneComponent } from './postavi-dane/postavi-dane.component';
import { KnjigaZahteviComponent } from './knjiga-zahtevi/knjiga-zahtevi.component'
import {NgxMatSelectSearchModule} from 'ngx-mat-select-search'
import { MatSelectModule } from '@angular/material/select';
import {NgChartsModule} from 'ng2-charts'
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DodajKomentarComponent } from './dodaj-komentar/dodaj-komentar.component';
import { AzurirajKomentarComponent } from './azuriraj-komentar/azuriraj-komentar.component';
import { PostaviDaneZadComponent } from './postavi-dane-zad/postavi-dane-zad.component';

@NgModule({
  declarations: [
    AppComponent,
    PrijavaComponent,
    RegistracijaComponent,
    PocetnaComponent,
    CitalacComponent,
    ProfilComponent,
    PretragaKnjigaComponent,
    LozinkaComponent,
    KnjigaComponent,
    PregledZaduzenihComponent,
    IstorijaZaduzenjaComponent,
    NovaKnjigaComponent,
    AdminComponent,
    IzmeniKnjiguComponent,
    IzmeniKorisnikaComponent,
    DodajKorisnikaComponent,
    PostaviDaneComponent,
    KnjigaZahteviComponent,
    DodajKomentarComponent,
    AzurirajKomentarComponent,
    PostaviDaneZadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxMatSelectSearchModule,
    MatSelectModule,
    NgChartsModule,
    MatButtonModule,
    MatIconModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

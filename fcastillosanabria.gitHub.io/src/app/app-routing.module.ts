import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { PublicationsComponent } from './views/publications/publications.component';
import { ContactMeComponent } from './views/contact-me/contact-me.component';

const routes: Routes = [

  // Default route
  { path: '', component: HomeComponent },

  { path: 'home', component: HomeComponent },

  { path: 'contact', component: ContactMeComponent },

  { path: 'publications', component: PublicationsComponent },

  // Ruta comodín: cualquier ruta NO definida redirige a inicio
  { path: '**', redirectTo: '', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

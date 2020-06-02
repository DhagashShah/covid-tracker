import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StateComponent } from './state/state.component';
import { WorldComponent } from './world/world.component';
import { ContactComponent } from './contact/contact.component';


const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'state',component:StateComponent},
  {path:'contact',component:ContactComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { AuthGuardService } from './services/auth-utils/auth-guard.service';
import { MainPageComponent } from './main-page/main-page.component';

const routes: Routes = [
  { path: 'auth', component: AuthPageComponent},
  { path: '', component: MainPageComponent, canActivate: [AuthGuardService]},
  { path: '**', redirectTo: '' }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

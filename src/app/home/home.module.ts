import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgxUploaderModule } from 'ngx-uploader';

import { HomeComponent } from './home.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { NeedAuthGuard } from '../need-auth.guard';
import { PlaceListComponent } from '../place-list/place-list.component';
import { PlaceItemComponent } from '../place-item/place-item.component';
import { AddAlbumComponent } from '../add-album/add-album.component';
import { FormsModule } from '../../../node_modules/@angular/forms';

const HomeRoutes: Routes = [
  { 
    path: 'home',
    component: HomeComponent,
    canActivate: [NeedAuthGuard],
    children: [
      {
        path:'list',
        component: PlaceListComponent
      },
      {
        path:'add',
        component: AddAlbumComponent
      }
    ]
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(HomeRoutes),
    NgxUploaderModule,
    FormsModule
  ],
  declarations: [
    HomeComponent,
    NavbarComponent,
    PlaceListComponent,
    PlaceItemComponent,
    AddAlbumComponent
  ],
  providers: [NeedAuthGuard]
})
export class HomeModule { }

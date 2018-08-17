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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '../../../node_modules/@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '../../../node_modules/@angular/material/core';
import { Step1Component } from '../add-album/step1/step1.component';


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
    FormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatNativeDateModule
  ],
  exports: [
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule
  ],
  declarations: [
    HomeComponent,
    NavbarComponent,
    PlaceListComponent,
    PlaceItemComponent,
    AddAlbumComponent,
    Step1Component
  ],
  providers: [NeedAuthGuard,
    {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'}
  ]
})
export class HomeModule { }

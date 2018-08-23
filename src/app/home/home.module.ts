import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FileSelectDirective } from 'ng2-file-upload';
import { CloudinaryModule, CloudinaryConfiguration } from '@cloudinary/angular-5.x';
import * as  Cloudinary from 'cloudinary-core';
import cloudinaryConfiguration from './config';

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
import { MembersComponent } from '../add-album/step1/members/members.component';
import { Step2Component } from '../add-album/step2/step2.component';
import { PhotoAlbumService } from './photo-album.service';
import { Step3Component } from '../add-album/step3/step3.component';

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
    FormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    CloudinaryModule.forRoot(Cloudinary, cloudinaryConfiguration)
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
    Step1Component,
    MembersComponent,
    FileSelectDirective,
    Step2Component,
    Step3Component
  ],
  providers: [
    NeedAuthGuard,
    {provide: MAT_DATE_LOCALE, useValue: MAT_DATE_LOCALE},
    PhotoAlbumService
  ]
})
export class HomeModule { }

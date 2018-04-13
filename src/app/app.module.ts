import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { CKEditorModule  } from 'ng2-ckeditor';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { HeaderComponent } from './header.component';
import { FormsModule} from '@angular/forms';
import { Service } from './app.service';
import { RouterModule, Routes } from '@angular/router';
import { CreateQuizComponent } from './createQuiz.component';
import { AttendQuizComponent } from './attendQuiz.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/attend-quiz', pathMatch: 'full'},
  { path: 'create-quiz', component: CreateQuizComponent },
  { path: 'attend-quiz', component: AttendQuizComponent  },
  //{ path: '**', component: PageNotFoundComponent }
];
@NgModule({
  imports: [ BrowserModule, FormsModule, HttpModule,
            RouterModule.forRoot(appRoutes, {enableTracing: true})],
  providers: [Service],
  declarations: [ AppComponent, HeaderComponent, CreateQuizComponent, AttendQuizComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }

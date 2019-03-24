import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { IndexComponent } from './index/index.component';
import { AboutComponent } from './about/about.component';
import { ContentComponent } from './content/content.component';
import { AppRouterModule} from './app-router/app-router.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio'; 
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OmikujiService} from './omikuji.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HeroesComponent } from './heroes/heroes.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContentComponent,
    IndexComponent,
    AboutComponent,
    HeroesComponent
  ],
  imports: [
    BrowserModule,
    AppRouterModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatRadioModule,
    MatTableModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [OmikujiService],
  bootstrap: [AppComponent]
})
export class AppModule { }

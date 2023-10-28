import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { HttpClientModule } from '@angular/common/http';

import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { SplitterModule } from 'primeng/splitter';
import { ButtonModule  } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TimelineModule } from 'primeng/timeline';
import { CardModule } from 'primeng/card';
import { InplaceModule } from 'primeng/inplace';
import { AnimateModule } from 'primeng/animate';
import { DividerModule } from 'primeng/divider';
import { PanelModule } from 'primeng/panel';


import { AppRoutingModule } from './app-routing.module';
import { AppRoot } from './app.root';
import { NavbarComponent } from './navbar/navbar.component';
import { MainComponent } from './main/main.component';
import { MessageService } from 'primeng/api';
import { WeeklyComponent } from './weekly/weekly.component';
import { MonthlyComponent } from './monthly/monthly.component';
import { LastFeatureComponent } from './last-feature/last-feature.component';
import { FAQComponent } from './faq/faq.component';
import { EntryTextComponent } from './entry-text/entry-text.component';

@NgModule({
  declarations: [
    AppRoot,
    NavbarComponent,
    MainComponent,
    WeeklyComponent,
    MonthlyComponent,
    LastFeatureComponent,
    FAQComponent,
    EntryTextComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MenubarModule,
    InputTextModule,
    BrowserAnimationsModule,
    FormsModule,
    SplitterModule,
    ButtonModule,
    ToastModule,
    ChartModule,
    TimelineModule,
    CardModule,
    PanelModule,
    AnimateModule,
    DividerModule,
    InplaceModule,
  ],
  providers: [MessageService],
  bootstrap: [AppRoot,MainComponent]
})
export class AppModule { }

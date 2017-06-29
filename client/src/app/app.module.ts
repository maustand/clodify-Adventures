import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { TreeviewComponent } from './treeview/treeview.component';
import { TreeModule } from 'angular-tree-component';

import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';

// Custom Provider for Http$Ajax
import { ApiService } from './utils/api/api.service';

@NgModule({
  declarations: [
    AppComponent,
    TreeviewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    TreeModule,
    ModalModule.forRoot(),
    BootstrapModalModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }

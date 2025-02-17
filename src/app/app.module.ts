import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommentCardComponent } from './components/elements/comment-card/comment-card.component';
import { CommentFormComponent } from './components/elements/comment-form/comment-form.component';
import { AddCommentComponent } from './components/elements/add-comment/add-comment.component';

@NgModule({
  declarations: [
    AppComponent,
    CommentCardComponent,
    CommentFormComponent,
    AddCommentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

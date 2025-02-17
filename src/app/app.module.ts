import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommentCardComponent } from './components/elements/comment-card/comment-card.component';
import { AddCommentComponent } from './components/elements/add-comment/add-comment.component';

@NgModule({
  declarations: [AppComponent, CommentCardComponent, AddCommentComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

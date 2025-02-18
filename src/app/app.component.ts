import { Component } from '@angular/core';
import { modal_pop, page_animation } from 'src/utils/animations';
import { CommentsModelService } from './services/comments-model.service';
import { comment } from 'src/utils/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [modal_pop, page_animation],
})
export class AppComponent {
  title = 'comments';
  show_modal: boolean = false;
  comments: comment[] = [];
  active_user: { name: string };

  constructor(private comments_model: CommentsModelService) {
    this.comments = this.comments_model.get_comments();

    this.active_user = {
      name: this.comments_model.get_user().username,
    };
  }
}

import { Component } from '@angular/core';
import { modal_pop, page_animation } from 'src/utils/animations';
import { CommentsModelService } from './services/comments-model.service';
import { comment, reply } from 'src/utils/interfaces';

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
  reply_action: boolean = false;

  constructor(private comments_model: CommentsModelService) {
    this.comments_model.$comments.subscribe((new_comments) => {
      this.comments = new_comments;
    });

    this.active_user = {
      name: this.comments_model.get_user().username,
    };
  }

  // this function is provided as callback for when angular detects changes.
  // index and comment are provided by Angular to the function when it’s being invoked.
  // comment is the value ngFor is using, not necessarily "comment".
  track_by_id(index: number, comment: comment | reply) {
    return comment.id;
  }
}

import { Injectable } from '@angular/core';
import { comments, current_user } from 'src/utils/data';
import { comment, user } from 'src/utils/interfaces';
import { cloneDeep } from 'lodash';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentsModelService {
  $comments = new BehaviorSubject<comment[]>(comments);
  private current_user: user = current_user;
  private img_path: string = 'assets/images/';

  upvote_comment(comment_id: string) {
    const current_list = cloneDeep(this.$comments.getValue());

    for (let i = 0; i < current_list.length; i++) {
      let current_comment = current_list[i];
      let found = false;

      if (current_comment.id === Number(comment_id)) {
        current_comment.score += 1;
        found = true;
      }

      if (found) break;

      for (let reply of current_comment.replies) {
        reply.score += reply.id === Number(comment_id) ? 1 : 0;
      }
    }

    this.$comments.next(current_list);
  }

  downvote_comment(comment_id: string) {
    const current_list = cloneDeep(this.$comments.getValue());

    for (let i = 0; i < current_list.length; i++) {
      let current_comment = current_list[i];
      let found = false;

      if (current_comment.id === Number(comment_id)) {
        current_comment.score -= 1;
        found = true;
      }

      if (found) break;

      for (let reply of current_comment.replies) {
        reply.score -= reply.id === Number(comment_id) ? 1 : 0;
      }
    }

    this.$comments.next(current_list);
  }

  update_content(comment_id: string, updated_content: string) {
    const current_list = cloneDeep(this.$comments.getValue());

    for (let i = 0; i < current_list.length; i++) {
      let current_comment = current_list[i];
      let found = false;

      if (current_comment.id === Number(comment_id)) {
        current_comment.content = updated_content;
        found = true;
      }

      if (found) break;

      for (let reply of current_comment.replies) {
        if (reply.id === Number(comment_id)) reply.content = updated_content;
      }
    }

    this.$comments.next(current_list);
  }

  get_user(): user {
    return cloneDeep(this.current_user);
  }

  get_img_path(): string {
    return this.img_path;
  }
}

import { Injectable } from '@angular/core';
import { comments, current_user } from 'src/utils/data';
import { comment, reply, user } from 'src/utils/interfaces';
import { cloneDeep } from 'lodash';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentsModelService {
  $comments = new BehaviorSubject<comment[]>(comments);
  cached_comments: comment[] = [];
  private current_user: user = current_user;
  private img_path: string = 'assets/images/';

  update_comments(updated_list: comment[]): void {
    this.$comments.next(updated_list);
  }

  find_position(comment_id: string): number[] {
    this.cached_comments = cloneDeep(this.$comments.getValue());
    const c_list: comment[] = this.cached_comments;
    const c_id: number = Number(comment_id);
    const position: number[] = [0, 0];

    for (let j = 0; j < c_list.length; j++) {
      let current_c = c_list[j];

      if (current_c.id === c_id) {
        position[0] = j;
        position[1] = -1;
        return position;
      }

      for (let k in current_c.replies) {
        const reply = current_c.replies[k];
        if (reply.id !== c_id) continue;
        position[0] = Number(j);
        position[1] = Number(k);
        return position;
      }
    }

    return position;
  }

  upvote_comment(comment_id: string) {
    const c_pos = this.find_position(comment_id);
    if (c_pos[1] < 0) this.cached_comments[c_pos[0]].score += 1;
    else this.cached_comments[c_pos[0]].replies[c_pos[1]].score += 1;
    this.$comments.next(this.cached_comments);
  }

  downvote_comment(comment_id: string) {
    const c_pos = this.find_position(comment_id);
    if (c_pos[1] < 0) this.cached_comments[c_pos[0]].score -= 1;
    else this.cached_comments[c_pos[0]].replies[c_pos[1]].score -= 1;
    this.$comments.next(this.cached_comments);
  }

  update_content(comment_id: string, updated_content: string): string | void {
    const c_pos = this.find_position(comment_id);

    if (c_pos[0] < 0) return 'comment not found';
    const comment = this.cached_comments[c_pos[0]];

    if (c_pos[1] < 0) comment.content = updated_content;
    else comment.replies[c_pos[1]].content = updated_content;

    this.$comments.next(this.cached_comments);
  }

  get_user(): user {
    return cloneDeep(this.current_user);
  }

  get_img_path(): string {
    return this.img_path;
  }
}

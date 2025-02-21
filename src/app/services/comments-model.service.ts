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

  constructor() {
    this.cached_comments = cloneDeep(this.$comments.getValue());
  }

  generate_id(): number {
    let count: number = 0;

    for (let comment of this.cached_comments) {
      count += 1;
      for (let reply of comment.replies) {
        count += 1;
      }
    }

    return count;
  }

  create_comment(content: string) {
    const new_comment: comment = {
      id: this.generate_id() + 1,
      content,
      created_at: '1s ago',
      replies: [],
      score: 0,
      user: this.current_user,
    };

    this.cached_comments.push(new_comment);
    this.$comments.next(this.cached_comments);
  }

  create_reply(comment_id: number, content: string) {
    const c_pos = this.find_position(comment_id.toString());
    if (c_pos[0] < 0) return;

    const comment = this.cached_comments[c_pos[0]];

    const new_reply: reply = {
      id: this.generate_id() + 1,
      content,
      created_at: '1s ago',
      replyingTo: comment.user.username,
      score: 0,
      user: this.current_user,
    };

    comment.replies.push(new_reply);
    this.$comments.next(this.cached_comments);
  }

  find_position(comment_id: string): number[] {
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

  remove_comment(comment_id: number): void | string {
    const c_pos = this.find_position(comment_id.toString());

    if (c_pos[0] < 0) return 'comment not found';
    const comment = this.cached_comments[c_pos[0]];

    if (c_pos[1] < 0) {
      this.cached_comments.splice(c_pos[0], 1);
    } else {
      comment.replies.splice(c_pos[1], 1);
    }

    this.$comments.next(this.cached_comments);
  }

  get_user(): user {
    return cloneDeep(this.current_user);
  }

  get_img_path(): string {
    return this.img_path;
  }
}

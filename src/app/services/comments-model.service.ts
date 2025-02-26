import { Injectable } from '@angular/core';
import { comments, current_user } from 'src/utils/data';
import { comment, reply, user } from 'src/utils/interfaces';
import { cloneDeep } from 'lodash';
import { BehaviorSubject, Subject } from 'rxjs';

// ! Potencial problem: this service is not a singleton. Each component is instanciating it, thus each instance his it's own "current version" of cached_comments.

@Injectable({
  providedIn: 'root',
})
export class CommentsModelService {
  static ID_counter: number = 5;
  $delete_confirmation = new Subject<boolean>();
  $comments = new BehaviorSubject<comment[]>(comments);
  cached_comments: comment[] = [];
  cached_id: number = -1;
  private current_user: user = current_user;
  private img_path: string = 'assets/images/';

  constructor() {
    this.cached_comments = cloneDeep(this.$comments.getValue());
  }

  create_comment(content: string) {
    const new_comment: comment = {
      id: CommentsModelService.ID_counter,
      content,
      created_at: '1s ago',
      replies: [],
      score: 0,
      user: this.current_user,
    };

    CommentsModelService.ID_counter += 1;
    this.cached_comments.push(new_comment);
    this.$comments.next(this.cached_comments);
  }

  create_reply(comment_id: number, content: string, reply_adress: string) {
    const c_pos = this.find_position(comment_id.toString());
    if (c_pos[0] < 0 || comment_id < 0) return;

    const comment = this.cached_comments[c_pos[0]];

    const new_reply: reply = {
      id: CommentsModelService.ID_counter,
      content,
      created_at: '1s ago',
      replyingTo: reply_adress,
      score: 0,
      user: this.current_user,
    };

    CommentsModelService.ID_counter += 1;
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

  show_removal_modal(comment_id: number) {
    this.$delete_confirmation.next(true);
    this.cached_id = comment_id;
  }

  hide_removal_modal() {
    this.$delete_confirmation.next(false);
  }

  remove_comment(): void | string {
    const comment_id: string = this.cached_id.toString();
    const c_pos = this.find_position(comment_id);

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

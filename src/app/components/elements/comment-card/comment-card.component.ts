import { Component, Input } from '@angular/core';
import { CommentsModelService } from 'src/app/services/comments-model.service';
import { item_fade, reply_move, resize } from 'src/utils/animations';

import {
  action_types,
  comment,
  comment_actions,
  reply,
} from 'src/utils/interfaces';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss'],
  animations: [reply_move, resize, item_fade],
})
export class CommentCardComponent {
  @Input() comment: comment | reply = {} as comment;
  @Input() active_user: boolean = false;

  img_path: string;
  view_element: HTMLElement = document.createElement('div');

  actions: comment_actions = {
    reply: false,
    edit: false,
    delete: false,
  };

  constructor(private comments_model: CommentsModelService) {
    this.img_path = this.comments_model.get_img_path();
  }

  upvote_comment(comment_id: number) {
    this.comments_model.upvote_comment(comment_id.toString());
  }

  downvote_comment(comment_id: number) {
    if (this.comment.score <= 0) return;
    this.comments_model.downvote_comment(comment_id.toString());
  }

  show_reply() {
    this.actions.reply = !this.actions.reply;
  }

  update_comment(comment_id: number) {
    this.actions.edit = false;
  }

  get reply_mention(): string {
    const reply = this.comment as reply;
    if (reply.replyingTo) return `@${reply.replyingTo}`;
    else return '';
  }
}

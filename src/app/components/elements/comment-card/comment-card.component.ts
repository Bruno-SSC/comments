import { Component, Input } from '@angular/core';
import { CommentsModelService } from 'src/app/services/comments-model.service';
import { item_fade, reply_move, resize } from 'src/utils/animations';
import { comment, reply } from 'src/utils/interfaces';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss'],
  animations: [reply_move, resize, item_fade],
})
export class CommentCardComponent {
  img_path: string;
  reply_action: boolean = false;
  @Input() comment: comment | reply = {} as comment;
  @Input() active_user: boolean = false;

  constructor(private comments_model: CommentsModelService) {
    this.img_path = this.comments_model.get_img_path();
  }

  upvote_comment(comment_id: string) {
    this.comments_model.upvote_comment(comment_id);
  }

  downvote_comment(comment_id: string) {
    if (this.comment.score <= 0) return;
    this.comments_model.downvote_comment(comment_id);
  }

  toggle_reply() {
    this.reply_action = !this.reply_action;

    const comment_element = document.getElementById(
      this.comment.id.toString()
    ) as HTMLElement;

    comment_element.style.marginBottom = '10px';
    return;
    // ! removing the margin after gives the same problem again.
    if (this.reply_action) {
    } else {
      comment_element.style.height = '0px';
      comment_element.style.marginBottom = '0px';
    }
  }

  get reply_mention(): string {
    const reply = this.comment as reply;
    if (reply.replyingTo) return `@${reply.replyingTo}`;
    else return '';
  }
}

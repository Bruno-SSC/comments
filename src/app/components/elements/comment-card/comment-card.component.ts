import { Component, Input } from '@angular/core';
import { CommentsModelService } from 'src/app/services/comments-model.service';
import { reply_move, resize } from 'src/utils/animations';
import { comment, reply } from 'src/utils/interfaces';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss'],
  animations: [reply_move, resize],
})
export class CommentCardComponent {
  active_user_comment: boolean = false;
  img_path: string;
  votes_count: number = 0;
  reply_action: boolean = false;
  @Input() comment: comment | reply = {} as comment;
  @Input() active_user: boolean = false;

  constructor(private comments_model: CommentsModelService) {
    this.img_path = this.comments_model.get_img_path();
  }

  // todo: this should acess the comments_model passing the comment id to be upvoted.
  upvote_comment() {
    this.comment.score += 1;
  }

  downvote_comment() {
    if (this.comment.score <= 0) return;
    this.comment.score -= 1;
  }

  get reply_mention(): string {
    const reply = this.comment as reply;
    if (reply.replyingTo) return `@${reply.replyingTo}`;
    else return '';
  }
}

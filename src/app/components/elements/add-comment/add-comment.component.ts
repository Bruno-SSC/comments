import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommentsModelService } from 'src/app/services/comments-model.service';
import { user } from 'src/utils/interfaces';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss'],
})
export class AddCommentComponent {
  @Input() comment_id: number = -1;
  @Input() reply_adress: string = '';
  @Input() reply_instance: boolean = false;
  @Output() finish_reply = new EventEmitter<void>();

  img_path: string;
  current_user: user;

  constructor(private comments_model: CommentsModelService) {
    this.img_path = this.comments_model.get_img_path();
    this.current_user = this.comments_model.get_user();
  }

  new_comment(content: string): void {
    if (this.reply_instance && this.comment_id) {
      this.finish_reply.emit();
      this.comments_model.create_reply(
        this.comment_id,
        content,
        this.reply_adress
      );
    } else {
      this.comments_model.create_comment(content);
    }
  }
}

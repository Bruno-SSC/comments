import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommentsModelService } from 'src/app/services/comments-model.service';
import { reply_input_data, user } from 'src/utils/interfaces';

@Component({
  selector: 'app-reply-card',
  templateUrl: './reply-card.component.html',
  styleUrls: ['./reply-card.component.scss'],
})
export class ReplyCardComponent {
  @Input() input_data: reply_input_data = {
    comment_id: -1,
    reply_adress: '',
  };

  @Output() finish_reply = new EventEmitter<void>();

  img_path: string;
  current_user: user;

  constructor(private comments_model: CommentsModelService) {
    this.img_path = this.comments_model.get_img_path();
    this.current_user = this.comments_model.get_user();
  }

  new_comment(content: string): void {
    this.finish_reply.emit();

    this.comments_model.create_reply(
      this.input_data.comment_id,
      content,
      this.input_data.reply_adress
    );
  }
}

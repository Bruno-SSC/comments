import { Component } from '@angular/core';
import { CommentsModelService } from 'src/app/services/comments-model.service';
import { user } from 'src/utils/interfaces';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss'],
})
export class AddCommentComponent {
  img_path: string;
  current_user: user;

  constructor(private comments_model: CommentsModelService) {
    this.img_path = this.comments_model.get_img_path();
    this.current_user = this.comments_model.get_user();
  }

  new_comment(content: string): void {
    this.comments_model.create_comment(content);
  }
}

import { Component, EventEmitter, Output } from '@angular/core';
import { CommentsModelService } from 'src/app/services/comments-model.service';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.scss'],
})
export class DeleteConfirmationComponent {
  @Output() confirm = new EventEmitter<boolean>();

  constructor(private comments_model: CommentsModelService) {}

  remove_comment() {
    this.hide_modal();
    this.comments_model.remove_comment();
  }

  hide_modal() {
    this.comments_model.hide_removal_modal();
  }
}

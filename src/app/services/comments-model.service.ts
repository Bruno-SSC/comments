import { Injectable } from '@angular/core';
import { comments, current_user } from 'src/utils/data';
import { comment, user } from 'src/utils/interfaces';
import { cloneDeep } from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class CommentsModelService {
  private comments: comment[] = comments;
  private current_user: user = current_user;
  private img_path: string = 'assets/images/';

  get_user(): user {
    return cloneDeep(this.current_user);
  }

  get_img_path(): string {
    return this.img_path;
  }

  get_comments(): comment[] {
    return cloneDeep(this.comments);
  }
}

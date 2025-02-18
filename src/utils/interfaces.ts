export interface user {
  image: {
    png: string;
    webp: string;
  };
  username: string;
}

interface base_comment {
  id: number;
  content: string;
  created_at: string;
  score: number;
  user: user;
}

export interface comment extends base_comment {
  replies: reply[];
}

export interface reply extends base_comment {
  replyingTo: string;
}

export interface focusable_object {
  tabindex: number;
  confirm: () => void;
  cancel: () => void;
  tag?: string;
}

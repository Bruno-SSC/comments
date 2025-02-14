export interface product_item {
  image: {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
  };
  name: string;
  category: string;
  price: number;
  quantity: number;
  selected?: boolean;
}

export interface focusable_object {
  tabindex: number;
  confirm: () => void;
  cancel: () => void;
  tag?: string;
}

export type update_types = 'increase' | 'decrease' | 'add';

export interface output_event {
  product_name: string;
  update_type: update_types;
}

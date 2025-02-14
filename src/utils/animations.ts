import {
  animate,
  group,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';

// ? Effects

const move_in = [
  style({ transform: 'translateY(100vh)' }),
  animate('600ms ease-in'),
  style({ transform: 'translateY(0vh)' }),
];

const move_out = [
  animate('600ms ease-in'),
  style({ transform: 'translateY(100vh)' }),
];

const fade_in = [
  style({ opacity: 0 }),
  animate('500ms ease'),
  style({ opacity: 1 }),
];

const fade_out = [animate('500ms ease'), style({ opacity: 0 })];

const ladder_effect = [
  style({ opacity: 0, transform: 'translateY(-100px)' }),
  stagger(30, [
    animate(
      '1000ms cubic-bezier(0.35, 0, 0.25, 1)',
      style({ opacity: 1, transform: 'none' })
    ),
  ]),
];

// ? Animations

export const page_animation = trigger('page_animation', [
  transition(':enter', [
    query(
      '.dessert_list__title,.dessert_container, .dessert_cart',
      ladder_effect
    ),
  ]),
]);

export const item_fade = trigger('item_fade', [
  transition(':enter', fade_in),
  transition(':leave', fade_out),
]);

export const modal_pop = trigger('modal_pop', [
  transition('void => show_mob', [
    group([query('.confirm_order', move_in), query('.black_layer', fade_in)]),
  ]),
  transition('show_mob => void', [
    group([query('.confirm_order', move_out), query('.black_layer', fade_out)]),
  ]),
  transition('void => show_desk', [
    query('.confirm_order, .black_layer', fade_in),
  ]),
  transition('show_desk => void', [
    query('.confirm_order, .black_layer', fade_out),
  ]),
]);

export const btn_fade = trigger('btn_fade', [
  transition(':enter', fade_in),
  transition(':leave', fade_out),
]);

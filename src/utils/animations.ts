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
  transition(':enter', [query('.comment_container', ladder_effect)]),
]);

export const item_fade = trigger('item_fade', [
  transition(':enter', fade_in),
  transition(':leave', fade_out),
]);

export const modal_pop = trigger('modal_pop', [
  transition('void => *', [
    query('.modal_container, .modal_background', fade_in),
  ]),
  transition('* => void', [
    query('.modal_container, .modal_background', fade_out),
  ]),
]);

export const btn_fade = trigger('btn_fade', [
  transition(':enter', fade_in),
  transition(':leave', fade_out),
]);

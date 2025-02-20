import {
  animate,
  animateChild,
  group,
  query,
  stagger,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

// ? Effects

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
  transition(':enter', [
    style({ opacity: 0 }),
    animate('500ms 500ms ease'),
    style({ opacity: 1 }),
  ]),
  transition(':leave', [animate('500ms ease'), style({ opacity: 0 })]),
]);

export const reply_move = trigger('reply_move', [
  transition(':enter', [
    query('.comment_container', [
      style({ transform: 'translateY(-150px)', opacity: 0 }),
      animate('300ms ease-in-out'),
      style({ transform: 'translateY(0)', opacity: 1 }),
    ]),
  ]),

  transition(':leave', [
    query('.comment_container', [
      animate('300ms ease-in-out'),
      style({ transform: 'translateY(-150px)', opacity: 0 }),
    ]),
  ]),
]);

export const resize = trigger('resize', [
  transition(':enter', [
    group([
      query('@reply_move', animateChild()),
      query(':self', [
        style({ height: 0 }),
        animate('300ms ease-in-out'),
        style({ height: '*' }),
      ]),
    ]),
  ]),

  transition(':leave', [
    group([
      query('@reply_move', animateChild()),
      query(':self', [animate('300ms ease-in-out'), style({ height: '0' })]),
    ]),
  ]),
]);

export const modal_pop = trigger('modal_pop', [
  transition('void => *', [
    query('.modal_container, .modal_background', [
      style({ opacity: 0 }),
      animate('500ms ease'),
      style({ opacity: 1 }),
    ]),
  ]),
  transition('* => void', [
    query('.modal_container, .modal_background', [
      animate('500ms ease'),
      style({ opacity: 0 }),
    ]),
  ]),
]);

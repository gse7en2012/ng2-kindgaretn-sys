import { trigger, state, style, transition, animate } from '@angular/animations';

export function routerTransition() {
  return trigger('routerTransition', [
    state('void', style({position:'absolute', width:'100%',height:'100%'}) ),
    state('*', style({position:'absolute', width:'100%',height:'100%'}) ),
    transition(':enter', [  // before 2.1: transition('void => *', [
      style({transform: 'translateX(100%)'}),
      animate('0.25s linear', style({transform: 'translateX(0%)'}))
    ]),
    transition(':leave', [  // before 2.1: transition('* => void', [
      style({transform: 'translateX(0%)'}),
      animate('0.25s linear', style({transform: 'translateX(100%)'}))
    ])
  ]);
}

// function slideToLeft() {
  
// }
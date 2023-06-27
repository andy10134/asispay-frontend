import { animate, query, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-screen',
  templateUrl: './auth-screen.component.html',
  styleUrls: ['./auth-screen.component.scss'],
  animations: [
    trigger('routeAnim',[
      transition('* => *', [
        query(':enter',[
          style({
            opacity: 0
          }),
          animate(200, style({
            opacity: 1
          }))
        ], {optional: true})
      ])
    ])
  ]
})

export class AuthScreenComponent {
  prepareRoute(outlet: RouterOutlet){
    return outlet && outlet.activatedRouteData
  }
}

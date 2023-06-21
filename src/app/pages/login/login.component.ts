import { animate, query, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
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
export class LoginComponent {
  prepareRoute(outlet: RouterOutlet){
    if(outlet.isActivated) return outlet.activatedRoute.snapshot.url;
    return null;
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent {
  constructor(private authService: AuthService,
              private router: Router){}

  logout(){
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate([this.authService.CONFIRM_PATH]);
      }
    });
  }
}

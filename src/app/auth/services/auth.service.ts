import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { tap, map, catchError } from "rxjs/operators";

import { config } from "../../core/config";
import { AuthStrategy, AUTH_STRATEGY } from "./auth.strategy";
import { LoginRequest } from "src/app/models/loginRequest";
import { User } from "src/app/models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public readonly LOGIN_PATH = '/login';
  public readonly CONFIRM_PATH = '/';
  public readonly INITIAL_PATH = '/dashboard';

  constructor(
    private router: Router,
    private http: HttpClient,
    @Inject(AUTH_STRATEGY) private auth: AuthStrategy<any>
  ) { }

  signup(user: User): Observable<void> {
    return this.http.post<any>(`${config['authUrl']}/register`, user);
  }

  confirm(email: string, code: string): Observable<void> {
    return this.http.post<any>(`${config['authUrl']}/confirm?`, {email, code});
  }

  login(loginRequest: LoginRequest): Observable<User> {
    return this.http.post<any>(`${config['authUrl']}/login`, loginRequest)
      .pipe(tap(data => this.auth.doLoginUser(data)));
  }

  logout() {
    return this.http.get<any>(`${config['authUrl']}/logout`)
      .pipe(tap(() => this.doLogoutUser()));
  }

  isLoggedIn$(): Observable<boolean> {
    console.log(this.auth.getCurrentUser());
    return this.auth.getCurrentUser().pipe(
      map(user => !!user),
      catchError(() => of(false))
    );
  }

  getCurrentUser$(): Observable<User | undefined> {
    return this.auth.getCurrentUser();
  }

  private doLogoutUser() {
    this.auth.doLogoutUser();
  }

}

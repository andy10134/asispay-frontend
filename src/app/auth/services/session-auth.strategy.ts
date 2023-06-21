import { Observable, of, tap } from "rxjs";
import { AuthStrategy } from "./auth.strategy";
import { User } from "src/app/models/user";
import { HttpClient } from "@angular/common/http";
import { config } from "src/app/core/config";

export class SessionAuthStrategy implements AuthStrategy<User> {

  private loggedUser: User;

  constructor(private http: HttpClient) {}

  doLoginUser(user: User): void {
    this.loggedUser = user;
  }

  doLogoutUser(): void {
    this.loggedUser = undefined!;
  }

  getCurrentUser(): Observable<User> {
    if (this.loggedUser) {
      return of(this.loggedUser);
    } else {
      return this.http.get<User>(`${config['authUrl']}/user`)
        .pipe(tap(user => this.loggedUser = user));
    }
  }
}

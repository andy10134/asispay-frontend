import { Observable, of } from "rxjs";
import { AuthStrategy } from "./auth.strategy";
import { User } from "src/app/models/user";
import { Token } from "src/app/models/token";

export class JwtAuthStrategy implements AuthStrategy<Token> {

  private readonly JWT_TOKEN = 'JWT_TOKEN';

  doLoginUser(token: Token): void {
    localStorage.setItem(this.JWT_TOKEN, token.token);
  }

  doLogoutUser(): void {
    localStorage.removeItem(this.JWT_TOKEN);
  }

  getCurrentUser(): Observable<User | undefined> {
    const token = this.getToken() === 'undefined' ? undefined : this.getToken();
    if (token) {
      const encodedPayload = token.split('.')[1];
      const payload = window.atob(encodedPayload);
      return of(JSON.parse(payload));
    } else {
      return of(undefined);
    }
  }

  getToken() {
    let token = localStorage.getItem(this.JWT_TOKEN);
    return localStorage.getItem(this.JWT_TOKEN);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SubscriptionService } from './subscription.service';
import { UserLogin } from '../models/userLogin';
import { map, shareReplay } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  baseURL = 'https://movieapp-angular.azurewebsites.net/api/Login';

  constructor(
    private readonly http: HttpClient,
    private readonly subscriptionService: SubscriptionService
  ) {}

  login(user: UserLogin) {
    return this.http.post<any>(this.baseURL, user).pipe(
      map((response) => {
        if (response?.token) {
          localStorage.setItem('authToken', response.token);
          this.setUserDetails();
        }
        return response;
      }),
      shareReplay()
    );
  }

  setUserDetails() {
    const authToken = localStorage.getItem('authToken');

    if (authToken != null) {
      const userDetails = new User();
      const decodeUserDetails = JSON.parse(
        window.atob(authToken.split('.')[1])
      );

      console.log('DecodeUser Details', decodeUserDetails);

      userDetails.userId = decodeUserDetails.userId;
      userDetails.username = decodeUserDetails.name;
      userDetails.userTypeName = decodeUserDetails.sub;
      userDetails.isLoggedIn = true;
      this.subscriptionService.userData$.next(userDetails);
    }
  }

  logout() {
    localStorage.clear();
    this.resetSubscription();
  }

  private resetSubscription() {
    this.subscriptionService.userData$.next(new User());
  }
}

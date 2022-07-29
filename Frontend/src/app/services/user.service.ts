import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = 'https://localhost:7028/api/user';

  constructor(private http: HttpClient) { }

  registerNewUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/CreateUser`, user);
  }

  //GET a specific person from the database using email
  getPerson(email: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/GetPersonByEmail/${email}`);
  }


}

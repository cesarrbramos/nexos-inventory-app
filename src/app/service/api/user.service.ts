import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { User } from "src/app/models/user.model";
import { Page } from "src/app/utils/page";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class UserService {

    constructor(private api: ApiService) { }

    getUsers(query: string, pageIndex: number, pageSize: number): Observable<Page<User>> {
        return this.api.get(`${ApiService.URL}/users?name=${query}&&page=${pageIndex}&size=${pageSize}`);
    }

}
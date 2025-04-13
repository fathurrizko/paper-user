import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { delay, Observable } from "rxjs";
import { UserShape } from "../model";
import { LS_DETAIL, LS_SELECTED_USER_ID, LS_USERS } from "../constant";

@Injectable({
    providedIn: 'root'
})

export class UserService {
    public users: UserShape[] = [];
    public detail!: UserShape;
    public selectedId: string = '';

    constructor(private httpClient: HttpClient) { 
        this.users = this.getLocalstorage(LS_USERS);
        this.detail = this.getLocalstorage(LS_DETAIL);
    }

    // helper
    saveLocalstorage(key: string, value: any, type: string | boolean = 'json') {
        if (type === 'json' || type === true) {
            value = JSON.stringify(value);
        }
        localStorage.setItem(key, value);
    }

    getLocalstorage(key: string) {
        let data = localStorage.getItem(key);
        if (data && /^\s*["{\[]/.test(data ?? '')) {
            return JSON.parse(data ?? '');
        } else if (data) {
            return data;
        } else {
            return null;
        }
    }

    clearLocalStorage() {
        localStorage.clear();
    }

    fetchUsers(): Observable<any> {
        const url = 'https://jsonplaceholder.typicode.com/users';
        return this.httpClient.get<any>(url, {});
    }

    fetchUserDetail(): Observable<any> {
        const id = this.getSelectedUserId();
        console.log('id: ', id)
        const url = `https://jsonplaceholder.typicode.com/users/${id}`;
        return this.httpClient.get<any>(url, {})
    }

    setUsers(users: UserShape[]) {
        this.saveLocalstorage(LS_USERS, users);
    }
    
    setUserDetail(user: UserShape) {
        this.saveLocalstorage(LS_DETAIL, user);
    }

    setSelectedUserId(id: number) {
        this.saveLocalstorage(LS_SELECTED_USER_ID, id)
    }

    getUsers() {
        return this.getLocalstorage(LS_USERS);
    }

    getSelectedUserId() {
        return this.getLocalstorage(LS_SELECTED_USER_ID)
    }

    getExistingDetail() {
        return this.getLocalstorage(LS_DETAIL);
    }

    clearSelectedUserId() {
        this.saveLocalstorage(LS_SELECTED_USER_ID, '')
    }

    checkExistingDetail() {
        const existing = this.getLocalstorage(LS_DETAIL);
        const id = this.getSelectedUserId();
        console.log('existing: ', existing);
        console.log('id: ', id);
        
        return existing?.id == id;
    }
}
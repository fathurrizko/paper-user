import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../services';
import { lastValueFrom, Observable, Subject, Subscription } from 'rxjs';
import { UserShape } from '../../model';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit, OnDestroy {
  downloadingUser: boolean = false;
  users: UserShape[] = [];
  searchText: string = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  async ngOnInit() {
    const searchParam = this.activatedRoute.snapshot.queryParamMap.get('search');
    this.users = this.userService.users;
    this.downloadingUser = true
    try {
      const result = await lastValueFrom(this.userService.fetchUsers());
      this.userService.setUsers(result);
      this.users = this.userService.getUsers();
    } catch (err) {
      alert(`Err:  ${err}`);
    } finally {
      this.downloadingUser = false
      if (searchParam && !!searchParam.length) {
        this.onSearchTextChange(searchParam, true);
      }
    }
  }

  ngOnDestroy(): void {

  }

  onViewPressed(u: UserShape) {
    this.userService.setSelectedUserId(u.id);
    // this.router.navigate(['/detail']);
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/detail'])
    );
    window.open(url, '_blank');
  }
  onSearchTextChange(event: any, isQueryParam = false) {
    this.searchText = isQueryParam
      ? event.toLowerCase()
      : event.target?.value?.toLowerCase();

    if (!!this.searchText) {
      const filteredUser = this.userService.users.filter((item: UserShape) => {
        const found = item.name?.toLowerCase().includes(this.searchText) 
        ||item.email?.toLowerCase().includes(this.searchText)
        ||item.website?.toLowerCase().includes(this.searchText)
        return found;
      })
      this.users = filteredUser;
    } else {
      this.users = this.userService.users;
    }
  }
}

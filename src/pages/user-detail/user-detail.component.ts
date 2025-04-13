import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services';
import { UserShape } from '../../model';
import { lastValueFrom, Observable } from 'rxjs';
import { LS_DETAIL } from '../../constant';

@Component({
  selector: 'app-user-detail',
  standalone: false,
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit {
  user!: UserShape;
  downloading: boolean = false;

  constructor(private userService: UserService) { }

  async ngOnInit() {
    const found = this.userService.checkExistingDetail();
    if (found) {
      this.user = this.userService.getExistingDetail();
    } else {
      try {
        this.downloading = true
        const result = await lastValueFrom(this.userService.fetchUserDetail());
        this.userService.setUserDetail(result);
        this.user = this.userService.getExistingDetail();
      } catch (err) {
        alert(`Err: ${err}`)
      } finally {
        this.downloading = false
      }
    }
  }
}

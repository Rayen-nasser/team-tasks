import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {TranslateService} from "@ngx-translate/core";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'angulartasks';
  lang: any
  constructor(private translate: TranslateService, private router: Router) {
    this.lang = localStorage.getItem('language')
    translate.use(this.lang)
  }

  ngOnInit(): void {
      // Check if token exists
    const token = localStorage.getItem('token');
    if (!token) {
      // Navigate to login route if token doesn't exist
      this.router.navigate(['/login']);
    }
  }
}

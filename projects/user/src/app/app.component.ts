import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(private router: Router) {}

  title = 'angulartasks';
  ngOnInit(): void {
    const token = localStorage.getItem('tokenId');
    if (!token) {
      this.router.navigate(['/login']);
    }
  }

}

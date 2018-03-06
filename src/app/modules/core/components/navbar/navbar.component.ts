import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'gz-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  ngOnInit(): void {
    console.log('initialized navbar component!');
  }
}

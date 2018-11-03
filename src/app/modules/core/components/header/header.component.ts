import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'gz-header',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class HeaderComponent implements OnInit {
  settingsActive = false;

  ngOnInit(): void {
  }

  openSettings() {
    this.settingsActive = !this.settingsActive;
  }
}

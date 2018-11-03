import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'gz-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  settingsActive = false;

  ngOnInit(): void {
  }

  openSettings() {
    this.settingsActive = !this.settingsActive;
  }
}

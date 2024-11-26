import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  public txtFollow: String = 'Follow';
  public txtUsername: String = 'Jorge Luis';
  public txtDescription: String = 'Hello! I\'m a computer science student at the University of Teziutlán, Puebla.\n' +
    '                    I\'m a software engineer and a web developer. I\'m passionate about technology and I\'m always looking\n' +
    '                    for new challenges.';
  follow() {
    this.txtFollow === 'Follow' ? this.txtFollow = 'Unfollow' : this.txtFollow = 'Follow';
  }

}

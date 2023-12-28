import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/framework/BaseComponent';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent extends BaseComponent {
  constructor() {
    super();
  }

  onClickXLogo() {
    window.open('https://twitter.com/CozyEnginner');
  }
  onClickInstagramLogo() {
    window.open('https://www.instagram.com/takeshi_cozy_life/');
  }
  onClickGithubLogo() {
    window.open('https://github.com/Cozy-Life/portfolio');
  }
  onClickYoutubeLogo() {
    window.open('https://www.youtube.com/channel/UCv1vmev0BYYAqVMz3IWJa5w');
  }
}

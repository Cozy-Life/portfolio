import { CtOption } from '../constants/CtOption';
import { CtSystem } from '../constants/CtSystem';
import { CtType } from '../constants/CtType';

export class BaseComponent {
  // htmlファイルから定数を呼び出せるように宣言
  ctoption: CtOption;
  cttype: CtType;
  ctsystem: CtSystem;

  constructor() {
    this.ctoption = new CtOption();
    this.cttype = new CtType();
    this.ctsystem = new CtSystem();
  }
}

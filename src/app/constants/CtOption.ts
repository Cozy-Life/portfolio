import { CtType } from './CtType';

type ValueAndTextObj = {
  value: string;
  text: string;
};

export class CtOption {
  /** メインタブ選択肢 */
  readonly mainTabOptions: Array<ValueAndTextObj> = [
    {
      value: CtType.home,
      text: 'ホーム',
    },
    {
      value: CtType.experience,
      text: '経験',
    },
    {
      value: CtType.skill,
      text: 'スキル',
    },
    {
      value: CtType.qualification,
      text: '資格',
    },
  ];

  /** 経験タブ選択肢 */
  readonly experienceTabOptions: Array<ValueAndTextObj> = [
    {
      value: CtType.programingLanguage,
      text: 'プログラミング',
    },
    {
      value: CtType.frameworkLibrary,
      text: 'FW・ライブラリ',
    },
    {
      value: CtType.tool,
      text: 'ツール',
    },
    {
      value: CtType.db,
      text: 'DB',
    },
  ];
}

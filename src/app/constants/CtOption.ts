import { CtType } from './CtType';

type OptionType = {
  value: string;
  text: string;
  graphId?: string;
};

export class CtOption {
  /** メインタブ選択肢 */
  readonly mainTabOptions: Array<OptionType> = [
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
  readonly experienceTabOptions: Array<OptionType> = [
    {
      value: CtType.programingLanguage,
      text: 'プログラミング',
      graphId: 'donut-chart-programing',
    },
    {
      value: CtType.frameworkLibrary,
      text: 'FW・ライブラリ',
      graphId: 'donut-chart-library-framework',
    },
    {
      value: CtType.tool,
      text: 'ツール',
      graphId: 'donut-chart-development-tool',
    },
    {
      value: CtType.db,
      text: 'DB',
      graphId: 'donut-chart-database',
    },
  ];
}

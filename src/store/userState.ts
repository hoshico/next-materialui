import { atom } from 'recoil';

export const userState = atom({
  // システム全体で参照するための一意なキーを用意
  // ファイル名と揃えると良い
  key: 'userState',
  default: { user: "Tom" }
});

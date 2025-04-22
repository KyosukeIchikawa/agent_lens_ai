/**
 * 論文カテゴリの定義
 * @typedef {Object} Category
 * @property {string} id - カテゴリID
 * @property {string} name - カテゴリ名
 * @property {string} description - カテゴリの説明
 * @property {string} colorClass - カテゴリの背景色クラス（Tailwind CSS）
 */

/**
 * @type {Category[]}
 */
export const categories = [
  {
    id: 'robotics',
    name: 'ロボティクス',
    description: 'ロボットの知能化や自律性に関する研究',
    colorClass: 'bg-primary-light',
  },
  {
    id: 'reinforcement-learning',
    name: '強化学習',
    description: 'エージェントが環境と相互作用することで最適な行動を学習する手法',
    colorClass: 'bg-secondary-light',
  },
  {
    id: 'symbolic-ai',
    name: 'シンボリックAI',
    description: '記号的表現と論理的推論に基づく人工知能手法',
    colorClass: 'bg-accent-light',
  },
];

/**
 * カテゴリIDからカテゴリオブジェクトを取得する
 * @param {string} id - カテゴリID
 * @returns {Category|undefined} カテゴリオブジェクト
 */
export function getCategoryById(id) {
  return categories.find(category => category.id === id);
}

/**
 * カテゴリ名からカテゴリオブジェクトを取得する
 * @param {string} name - カテゴリ名
 * @returns {Category|undefined} カテゴリオブジェクト
 */
export function getCategoryByName(name) {
  return categories.find(category => category.name === name);
}

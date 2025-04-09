/**
 * 論文データを集約したインデックスファイル
 * 
 * 新しい論文を追加する場合は、以下の手順に従ってください：
 * 1. _template.js をコピーして、papers/ フォルダに新しいファイルを作成
 * 2. ファイル名は論文のIDに基づいて命名（例: your-paper-id.js）
 * 3. 論文のデータを編集
 * 4. 下記のimportセクションに新しいインポート文を追加
 * 5. papers配列に新しい論文データを追加
 */

// 論文データのインポート
import curiosityDrivenImagination from './papers/curiosity-driven-imagination.js';

/**
 * @typedef {import('./types').Paper} Paper
 */

/**
 * 全論文データの配列
 * @type {Paper[]}
 */
const papers = [
  curiosityDrivenImagination,
  // 新しい論文を追加する場合は、ここにインポートした論文データを追加
];

/**
 * すべての論文データを取得する
 * @returns {Paper[]} 全論文データの配列
 */
export function getAllPapers() {
  return papers;
}

/**
 * 特定の論文データをIDで取得する
 * @param {string} id 論文ID
 * @returns {Paper|null} 見つかった論文データまたはnull
 */
export function getPaperById(id) {
  return papers.find(paper => paper.id === id) || null;
}

/**
 * 論文のセクションデータを取得する
 * @param {string} paperId 論文ID
 * @param {string} sectionId セクションID
 * @returns {import('./types').PaperSection|null} 見つかったセクションデータまたはnull
 */
export function getPaperSection(paperId, sectionId) {
  const paper = getPaperById(paperId);
  if (!paper) return null;
  
  return paper.sections.find(section => section.id === sectionId) || null;
}
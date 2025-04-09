/**
 * 論文データのテンプレート
 * 
 * 新しい論文を追加する際は、このファイルをコピーして使用してください。
 * ファイル名は論文のIDに基づいて命名してください（例: your-paper-id.js）
 */

/**
 * @typedef {import('../types').Paper} Paper
 */

/**
 * 論文データ
 * @type {Paper}
 */
const paper = {
  id: 'your-paper-id', // URLスラッグとして使用される一意のID
  title: 'Your Paper Title', // 論文の英語タイトル
  subtitle: '論文の日本語タイトルまたはサブタイトル', // 日本語タイトルまたはサブタイトル
  description: '論文の簡潔な説明をここに記述します。', // 概要説明
  publishedYear: 2023, // 出版年
  authors: ['Author Name 1', 'Author Name 2'], // 著者リスト
  categories: ['カテゴリ1', 'カテゴリ2'], // カテゴリタグ
  sections: [
    // 論文の各セクション情報（必要に応じて編集）
    {
      id: 'background',
      title: '背景',
      path: '/papers/your-paper-id/background'
    },
    {
      id: 'related-work',
      title: '関連研究',
      path: '/papers/your-paper-id/related-work'
    },
    {
      id: 'method',
      title: '提案手法',
      path: '/papers/your-paper-id/method'
    },
    {
      id: 'experiments',
      title: '実験',
      path: '/papers/your-paper-id/experiments'
    },
    {
      id: 'results',
      title: '結果',
      path: '/papers/your-paper-id/results'
    },
    {
      id: 'discussion',
      title: '考察',
      path: '/papers/your-paper-id/discussion'
    },
    {
      id: 'conclusion',
      title: '結論',
      path: '/papers/your-paper-id/conclusion'
    },
    {
      id: 'references',
      title: '参考文献',
      path: '/papers/your-paper-id/references'
    }
  ]
};

export default paper;
/**
 * 論文データの型定義
 * 
 * このファイルでは、論文データの構造と各プロパティの意味を定義しています。
 * 新しい論文を追加する際は、この型定義に従ってデータを作成してください。
 */

/**
 * 論文のセクション情報
 * @typedef {Object} PaperSection
 * @property {string} id - セクションのID（URLの一部として使用）
 * @property {string} title - セクションのタイトル
 * @property {string} path - セクションへの完全なパス
 */

/**
 * 著者と所属情報
 * @typedef {Object} AuthorWithAffiliation
 * @property {string} name - 著者名
 * @property {string[]} affiliations - 所属のID配列
 */

/**
 * 論文の図情報
 * @typedef {Object} PaperFigure
 * @property {string} id - 図表の一意識別子
 * @property {string|null} paperFigNumber - 論文中の図番号（例: "1", "2a", "A1"）
 * @property {string|null} localFigNumber - 解説ページでの図番号（または自動生成用のnull）
 * @property {boolean} isQuoted - 論文からの直接引用か、新たに作成したものか
 * @property {string} filename - 画像ファイル名
 * @property {string} caption - 図のキャプション
 * @property {string} altText - 画像の代替テキスト
 * @property {string} [description] - 図の詳細な説明（オプション）
 */

/**
 * 論文データの構造
 * @typedef {Object} Paper
 * @property {string} id - 論文の一意のID（URLスラッグとして使用）
 * @property {string} title - 論文の英語タイトル
 * @property {string} [jaTitle] - 論文の日本語タイトル（オプション）
 * @property {string} subtitle - 論文のサブタイトル（日本語）
 * @property {string} description - 論文の簡潔な説明
 * @property {number} publishedYear - 出版年
 * @property {string} [publishedDate] - 詳細な出版日（YYYY-MM-DD形式、オプション）
 * @property {string} [addedDate] - サイトへの追加日（YYYY-MM-DD形式、オプション）
 * @property {string[]} authors - 著者リスト
 * @property {AuthorWithAffiliation[]} [authorsWithAffiliations] - 所属情報付き著者リスト（オプション）
 * @property {Object.<string, string>} [affiliations] - 所属IDと所属名のマッピング（オプション）
 * @property {string} [url] - 論文のURL（オプション）
 * @property {string[]} categories - カテゴリタグ
 * @property {PaperSection[]} sections - 論文のセクション構造
 * @property {PaperFigure[]} [figures] - 論文の図情報（オプション）
 */

// エクスポートするものはありませんが、JSDoc型定義として機能します
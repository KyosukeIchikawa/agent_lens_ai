/**
 * 論文の図表に関するユーティリティ関数
 */

/**
 * 論文データとfigureIdから「図XX」形式の文字列を生成する
 * 
 * @param {Object} paper - 論文データオブジェクト
 * @param {string} figureId - 図表のID
 * @param {Object} [options] - オプション設定
 * @param {boolean} [options.includePaperFigNumber=false] - 論文中の図番号も含めるかどうか
 * @returns {string} - 図番号の文字列（例: 「図1」）、図が見つからない場合は空文字列
 */
export const getFigNum = (paper, figureId, options = {}) => {
  // デフォルト値の設定
  const { 
    includePaperFigNumber = false 
  } = options;

  // paperオブジェクトまたはfiguresプロパティが存在しない場合は空文字列を返す
  if (!paper || !paper.figures) return '';

  // 指定されたIDの図データを検索
  const figure = paper.figures.find(fig => fig.id === figureId);
  
  // 図データが見つからない場合は空文字列を返す
  if (!figure) return '';

  // 図番号テキストを構築
  let result = '';
  
  // localFigNumberが存在する場合
  if (figure.localFigNumber) {
    // 図の接頭辞は常に含める
    result = `図${figure.localFigNumber}`;
    
    // 論文中の図番号も含める設定の場合
    if (includePaperFigNumber && figure.paperFigNumber) {
      result += ` (原論文 図${figure.paperFigNumber})`;
    }
  } 
  // localFigNumberが存在せず、paperFigNumberが存在する場合
  else if (figure.paperFigNumber) {
    result = `図${figure.paperFigNumber}`;
  }

  return result;
};

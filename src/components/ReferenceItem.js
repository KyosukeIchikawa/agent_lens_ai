import React from 'react';

/**
 * URLからarXiv IDを抽出する関数
 * @param {string} url - 論文のURL
 * @returns {string|null} arXiv IDまたはnull
 */
function extractArxivId(url) {
  if (!url) return null;
  // arXivのURLからIDを抽出（例：https://arxiv.org/abs/1705.05363）
  const arxivRegex = /arxiv\.org\/abs\/([0-9.]+)(v[0-9]+)?/i;
  const match = url.match(arxivRegex);
  return match ? match[1] + (match[2] || '') : null;
}

/**
 * リンクタイプを判定する関数
 * @param {string} url - 論文のURL
 * @returns {string} リンクタイプの表示名
 */
function getLinkType(url) {
  if (!url) return '';

  if (url.includes('arxiv.org')) {
    const arxivId = extractArxivId(url);
    return arxivId || 'arXiv';
  } else if (url.includes('proceedings.mlr.press')) {
    return 'PMLR';
  } else if (url.includes('github.com')) {
    return 'GitHub';
  } else if (url.includes('openreview.net')) {
    return 'OpenReview';
  } else if (url.includes('acm.org')) {
    return 'ACM DL';
  } else if (url.includes('ieee.org') || url.includes('ieeexplore')) {
    return 'IEEE Xplore';
  } else if (url.includes('doi.org')) {
    return '';
  } else if (url.includes('semanticscholar.org')) {
    return 'Semantic Scholar';
  }

  // その他のURLの場合は空文字を返す（リンクをタイトルのみにするため）
  return '';
}

/**
 * 参考文献アイテムのコンポーネント
 *
 * @param {string} id - 参考文献のID
 * @param {string} title - 論文タイトル
 * @param {string} authors - 著者（文字列または配列）
 * @param {string} year - 発行年
 * @param {string} journal - ジャーナル名（オプション）
 * @param {string} conference - 会議名（オプション）
 * @param {string} institution - 研究機関名（オプション）
 * @param {string} volume - 巻数（オプション）
 * @param {string} number - 号数（オプション）
 * @param {string} pages - ページ範囲（オプション）
 * @param {string} url - 論文URL（オプション）
 * @param {string} doi - DOI（オプション）
 * @param {string} arxivId - arXiv ID（オプション）
 * @param {string} description - 参考文献の説明（オプション）
 */
export default function ReferenceItem({
  id,
  title,
  authors,
  year,
  journal,
  conference,
  institution,
  volume,
  number,
  pages,
  url,
  doi,
  arxivId,
  description,
  ...props
}) {
  // authors が文字列なら配列に変換、配列なら維持
  const authorList = Array.isArray(authors) ? authors : [authors];

  // venue は journal, conference, institution のいずれかを使用
  const venue = journal || conference || institution || '';

  // 優先順位に従ってリンク先URLを決定（url → doi → arxivId の順）
  const linkUrl =
    url || (doi ? `https://doi.org/${doi}` : arxivId ? `https://arxiv.org/abs/${arxivId}` : null);

  return (
    <div className="py-3 border-b border-primary/10 last:border-b-0">
      <div className="flex gap-3">
        <div className="text-sm font-medium w-8 text-primary shrink-0">[{id}]</div>
        <div>
          {linkUrl ? (
            <h3 className="font-medium text-primary">
              <a
                href={linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline cursor-pointer"
              >
                {title}
              </a>
            </h3>
          ) : (
            <h3 className="font-medium text-primary">{title}</h3>
          )}
          <p className="text-sm text-text mt-1">{authorList.join(', ')}</p>
          <p className="text-sm text-text">
            {venue && <span>{venue}</span>}
            {volume && <span>, {volume}</span>}
            {number && <span>({number})</span>}
            {pages && <span>, pp. {pages}</span>}
            {year && <span>, {year}</span>}
          </p>
          {description && <p className="mt-2 text-sm text-gray-600 italic">{description}</p>}
        </div>
      </div>
    </div>
  );
}

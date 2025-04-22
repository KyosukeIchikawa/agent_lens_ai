import React from 'react';
import Link from 'next/link';

/**
 * 論文のトップページ用ヘッダーコンポーネント
 *
 * @param {string} title - 論文タイトル
 * @param {string} jaTitle - 論文の日本語タイトル（オプション）
 * @param {Array|string} authors - 著者名（オプション）- 文字列または{name, affiliations}の配列
 * @param {Object} affiliations - 所属機関の辞書（オプション）
 * @param {Array} authorsWithAffiliations - 所属情報付き著者（オプション）- {name, affiliations}の配列
 * @param {string} paperUrl - 論文URL（オプション）
 */
export default function PaperHeader({
  title,
  jaTitle,
  authors,
  affiliations,
  authorsWithAffiliations,
  paperUrl,
}) {
  // 著者情報のフォーマット
  const formatAuthors = () => {
    if (authorsWithAffiliations && authorsWithAffiliations.length > 0) {
      return authorsWithAffiliations.map((author, index) => (
        <span key={`author-${index}`}>
          {author.name}
          {author.affiliations && author.affiliations.length > 0 && (
            <sup>
              {author.affiliations.map((affId, idx) => (
                <span key={`aff-${index}-${idx}`}>
                  {idx > 0 && ', '}
                  {affId}
                </span>
              ))}
            </sup>
          )}
          {index < authorsWithAffiliations.length - 1 && ', '}
        </span>
      ));
    }

    if (!authors) return null;

    // 著者が文字列の場合はそのまま使用
    if (typeof authors === 'string') {
      return authors;
    }

    // 著者が配列の場合は、名前と所属を適切にフォーマット
    if (Array.isArray(authors)) {
      return authors.map((author, index) => {
        // authorが文字列かオブジェクトかをチェック
        if (typeof author === 'string') {
          return (
            <span key={`author-${index}`}>
              {author}
              {index < authors.length - 1 && ', '}
            </span>
          );
        }

        return (
          <span key={`author-${index}`}>
            {author.name}
            {author.affiliations && author.affiliations.length > 0 && (
              <sup>
                {author.affiliations.map((affId, idx) => (
                  <span key={`aff-${index}-${idx}`}>
                    {idx > 0 && ', '}
                    {affId}
                  </span>
                ))}
              </sup>
            )}
            {index < authors.length - 1 && ', '}
          </span>
        );
      });
    }

    return null;
  };

  // 所属情報のフォーマット
  const renderAffiliations = () => {
    if (!affiliations) return null;

    return (
      <div className="text-sm mb-4 text-text italic max-w-2xl mx-auto">
        {Object.entries(affiliations).map(([id, affiliation]) => (
          <div key={`affiliation-${id}`} className="inline-block mx-2">
            <sup>{id}</sup> {affiliation}
          </div>
        ))}
      </div>
    );
  };

  return (
    <header className="mb-10 mt-4 text-center">
      <div className="max-w-4xl mx-auto px-4 py-8 border-b-2 border-primary/10">
        {/* 英語タイトル - リンク付きに変更 */}
        <h1 className="text-3xl md:text-5xl font-bold mb-4 text-primary leading-tight tracking-tight">
          {paperUrl ? (
            <Link
              href={paperUrl}
              className="hover:text-primary-dark transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {title}
            </Link>
          ) : (
            title
          )}
        </h1>

        {/* 日本語タイトル - 英語タイトルよりも小さいが、十分に目立つサイズ */}
        {jaTitle && (
          <h2 className="text-xl md:text-2xl mb-8 text-primary-dark font-medium">{jaTitle}</h2>
        )}

        {/* 著者情報 */}
        {(authorsWithAffiliations || authors) && (
          <p className="text-lg mb-2 text-text font-medium">{formatAuthors()}</p>
        )}

        {/* 所属情報 */}
        {renderAffiliations()}
      </div>
    </header>
  );
}

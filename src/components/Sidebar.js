'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useMemo } from 'react';

/**
 * サイドバーコンポーネント
 * 論文のメタデータとセクションナビゲーション（目次）を表示します
 *
 * @param {Object} props コンポーネントのプロパティ
 * @param {Object} props.paperData 論文データ
 * @returns {JSX.Element} サイドバーコンポーネント
 */
export default function Sidebar({ paperData }) {
  const pathname = usePathname();

  // 論文データとセクションを取得
  const paper = paperData;
  const sections = paper?.sections || [];

  // パスから現在のセクションIDを推測
  const currentSectionId = useMemo(() => {
    if (!sections || sections.length === 0) {
      return null;
    }

    // 完全なパスが一致するセクションを探す
    const matchingSection = sections.find(section => section.path === pathname);

    // 完全一致するセクションが見つかった場合、そのIDを返す
    if (matchingSection) {
      return matchingSection.id;
    }

    // 完全一致が見つからない場合、パスの最後の部分を取得して比較
    const lastPathSegment = pathname.split('/').filter(Boolean).pop();

    // lastPathSegmentを含むセクションを探す
    const sectionWithPathContainingSegment = sections.find(section =>
      section.path.endsWith(lastPathSegment),
    );

    // 該当するセクションが見つかった場合、そのIDを返す
    if (sectionWithPathContainingSegment) {
      return sectionWithPathContainingSegment.id;
    }

    // それでも見つからない場合はnullを返す
    return null;
  }, [pathname, sections]);

  /**
   * 論文情報パートを生成する
   */
  const renderPaperInfo = () => {
    if (!paper) {
      return <p className="text-sm text-text-light">論文情報が利用できません</p>;
    }

    return (
      <div className="mb-6">
        <p className="text-sm mb-2">
          <span className="font-semibold">タイトル:</span> {paper.title}
        </p>
        <p className="text-sm mb-2">
          <span className="font-semibold">著者:</span>
          {paper.authors && Array.isArray(paper.authors) ? paper.authors.join(', ') : '情報なし'}
        </p>
        <p className="text-sm mb-2">
          <span className="font-semibold">原論文:</span>
          <a
            href={paper.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline ml-1"
          >
            arXiv
          </a>
        </p>
        <p className="text-sm mb-4">
          <span className="font-semibold">出版年:</span> {paper.publishedYear}
        </p>
      </div>
    );
  };

  return (
    <aside className="w-full lg:w-64 bg-surface-accent border-l border-border p-4 h-full">
      <div className="sticky top-20">
        <h2 className="text-lg font-semibold mb-4">論文情報</h2>
        {renderPaperInfo()}

        {/* 論文情報と目次の間に視覚的な区切りを追加 */}
        {sections.length > 0 && (
          <div className="border-t border-divider my-6 pt-2">
            <h2 className="text-lg font-semibold mb-4">目次</h2>
            <nav className="space-y-1">
              {paper && (
                <Link
                  href={`/papers/${paper.id}`}
                  className={`block py-2 px-3 rounded text-sm transition-colors duration-150 flex items-center
                    ${
                      pathname === `/papers/${paper.id}`
                        ? 'bg-primary text-text-inverse font-medium shadow-sm'
                        : 'text-text hover:bg-surface-hover hover:text-primary border border-transparent hover:border-border-light'
                    }`}
                >
                  <span className="mr-2">📄</span> Abstract
                </Link>
              )}

              {sections.map(section => (
                <Link
                  key={section.id}
                  href={section.path || `/papers/${paper.id}/${section.id}`}
                  className={`block py-2 px-3 rounded text-sm transition-colors duration-150 flex items-center
                    ${
                      currentSectionId === section.id
                        ? 'bg-primary text-text-inverse font-medium shadow-sm'
                        : 'text-text hover:bg-surface-hover hover:text-primary border border-transparent hover:border-border-light'
                    }`}
                >
                  <span className="mr-2">📃</span>
                  {section.number ? `${section.number}. ${section.title}` : section.title}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </aside>
  );
}

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

/**
 * 個別論文ページの底部に表示するページナビゲーションコンポーネント
 * 前後ページへの移動リンクを提供します
 *
 * @param {Object} props コンポーネントのプロパティ
 * @param {Object} props.paperData 論文データ
 * @returns {JSX.Element} ページナビゲーションコンポーネント
 */
export default function PageNavigation({ paperData }) {
  const pathname = usePathname();

  // 論文データからセクション配列とpaperIdを取得
  const sections = paperData?.sections || [];
  const paperId = paperData?.id;

  // 論文トップページのパスを構築
  const paperHomePath = `/papers/${paperId}`;

  // 論文トップページ（Abstract）かどうかをチェック
  const isAbstractPage = pathname === paperHomePath || pathname === `${paperHomePath}/`;

  // パスから現在のセクションIDを推測
  const currentSectionId = useMemo(() => {
    // Abstract（トップページ）の場合はnullを返す
    if (isAbstractPage) {
      return null;
    }

    // 完全なパスが一致するセクションを探す
    const matchingSection = sections.find(section => section.path === pathname);

    // 完全一致するセクションが見つかった場合、そのIDを返す
    if (matchingSection) {
      return matchingSection.id;
    }

    // 完全一致が見つからない場合、パスの最後の部分を取得して、セクションのパスと比較
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
  }, [pathname, sections, isAbstractPage]);

  // 「次へ」と「前へ」のセクションを決定
  let prevSection = null;
  let nextSection = null;

  // Abstractページの場合は最初のセクションを「次へ」とする
  if (isAbstractPage) {
    if (sections.length > 0) {
      nextSection = sections[0];
    }
  } else if (currentSectionId) {
    // 現在のセクションのインデックスを取得
    const currentSectionIndex = sections.findIndex(section => section.id === currentSectionId);

    // セクションが見つかった場合
    if (currentSectionIndex !== -1) {
      // 前のセクションを取得
      if (currentSectionIndex > 0) {
        // 2番目以降のセクションの場合は前のセクションを「前へ」とする
        prevSection = sections[currentSectionIndex - 1];
      } else {
        // 最初のセクションの場合はAbstractページを「前へ」とする
        prevSection = {
          title: 'Abstract',
          path: paperHomePath,
        };
      }

      nextSection =
        currentSectionIndex < sections.length - 1 ? sections[currentSectionIndex + 1] : null;
    }
  }

  return (
    <div className="flex justify-between items-center my-10 pt-6 border-t border-gray-200">
      <div className="w-1/3">
        {/* 前へリンク - Abstractページでは表示しない */}
        {prevSection && (
          <Link
            href={prevSection.path}
            className="text-primary hover:text-primary-hover hover:underline flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="hidden sm:inline">{prevSection.title}</span>
            <span className="sm:hidden">前へ</span>
          </Link>
        )}
      </div>

      <div className="w-1/3 flex justify-center">
        {/* 論文トップへのリンク */}
        {
          <Link
            href={paperHomePath}
            className="text-primary hover:text-primary-hover hover:underline flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span className="hidden sm:inline">論文トップ</span>
            <span className="sm:hidden">トップ</span>
          </Link>
        }
      </div>

      <div className="w-1/3 flex justify-end">
        {/* 次へリンク */}
        {nextSection && (
          <Link
            href={nextSection.path}
            className="text-primary hover:text-primary-hover hover:underline flex items-center"
          >
            <span className="hidden sm:inline">{nextSection.title}</span>
            <span className="sm:hidden">次へ</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        )}
      </div>
    </div>
  );
}

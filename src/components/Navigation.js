'use client';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { getAllPapers } from '../data/papers';

/**
 * 論文記事内のページナビゲーションコンポーネント
 * 現在のページの前後のページへのリンクを自動的に生成します
 * トップページへの戻るリンクも提供します
 *
 * @param {Object} props コンポーネントのプロパティ
 * @param {string} [props.paperId] 論文ID（省略した場合はURLから自動取得）
 * @param {string} [props.currentSectionId] 現在のセクションID（省略した場合はURLから自動取得）
 * @param {Object} [props.customLabels] カスタムラベル（前へ/次へのテキストをカスタマイズする場合）
 * @param {Object} [props.prevSection] 前のセクション（直接指定する場合）
 * @param {Object} [props.nextSection] 次のセクション（直接指定する場合）
 * @returns {JSX.Element} ナビゲーションコンポーネント
 */
export default function Navigation({
  paperId,
  currentSectionId,
  customLabels = {},
  prevSection: propsPrevSection,
  nextSection: propsNextSection,
}) {
  // Next.jsのルーターを取得（条件付きではなく常に取得）
  const router = useRouter();
  
  // props から直接 prevSection と nextSection が提供されている場合はそれを使用
  if (propsPrevSection !== undefined || propsNextSection !== undefined) {
    const prevLabel = customLabels.prev || (propsPrevSection ? propsPrevSection.title : '前へ');
    const nextLabel = customLabels.next || (propsNextSection ? propsNextSection.title : '次へ');

    const prevPath = propsPrevSection ? `/papers/${paperId}/${propsPrevSection.id}` : null;
    const nextPath = propsNextSection ? `/papers/${paperId}/${propsNextSection.id}` : null;

    return renderNavigationUI(prevPath, nextPath, prevLabel, nextLabel);
  }

  // URLからpaperId/sectionIdを取得（プロパティが指定されていない場合）
  const effectivePaperId = paperId || router.query.paperId;
  const path = router.pathname;

  // セクションIDの取得（URLパスの最後の部分を使用）
  const effectiveSectionId =
    currentSectionId ||
    path
      .split('/')
      .filter(segment => segment)
      .pop();

  // 全論文データから該当する論文を取得
  const papers = getAllPapers();
  const paper = papers.find(p => p.id === effectivePaperId);

  // 論文データが見つからない場合、またはセクションが不明な場合は表示なし
  if (!paper || !effectiveSectionId) {
    return null;
  }

  // セクションの並び順を取得
  const sections = paper.sections || [];
  const currentSectionIndex = sections.findIndex(
    section => section && section.id === effectiveSectionId,
  );

  // 現在のセクションが見つからない場合は表示なし
  if (currentSectionIndex === -1) {
    return null;
  }

  // 前後のセクションを取得
  const prevSection = currentSectionIndex > 0 ? sections[currentSectionIndex - 1] : null;

  const nextSection =
    currentSectionIndex < sections.length - 1 ? sections[currentSectionIndex + 1] : null;

  // URLから特定の論文のセクションを表示しているかどうかを判断
  const isViewingSpecificPaper = path.includes('/papers/');

  // 前後のページへのリンクパスを生成
  const getPrevPath = () => {
    if (!prevSection) return null;
    return isViewingSpecificPaper
      ? `/papers/${effectivePaperId}/${prevSection.id}`
      : `/${prevSection.id}`;
  };

  const getNextPath = () => {
    if (!nextSection) return null;
    return isViewingSpecificPaper
      ? `/papers/${effectivePaperId}/${nextSection.id}`
      : `/${nextSection.id}`;
  };

  // 前後のラベルをカスタマイズできるようにする
  const prevLabel = customLabels.prev || (prevSection ? prevSection.title : '前へ');
  const nextLabel = customLabels.next || (nextSection ? nextSection.title : '次へ');

  const prevPath = getPrevPath();
  const nextPath = getNextPath();

  return renderNavigationUI(prevPath, nextPath, prevLabel, nextLabel);
}

// ナビゲーションUIを描画する関数
function renderNavigationUI(prevPath, nextPath, prevLabel, nextLabel) {
  return (
    <div className="flex justify-between items-center mt-10 pt-6 border-t border-primary/10">
      <div className="w-1/3 flex justify-start">
        {prevPath && (
          <Link
            href={prevPath}
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
            <span className="hidden sm:inline">{prevLabel}</span>
            <span className="sm:hidden">前へ</span>
          </Link>
        )}
      </div>

      <div className="w-1/3 flex justify-center">
        <Link
          href="/"
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
          <span className="hidden sm:inline">トップページ</span>
          <span className="sm:hidden">ホーム</span>
        </Link>
      </div>

      <div className="w-1/3 flex justify-end">
        {nextPath && (
          <Link
            href={nextPath}
            className="text-primary hover:text-primary-hover hover:underline flex items-center"
          >
            <span className="hidden sm:inline">{nextLabel}</span>
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

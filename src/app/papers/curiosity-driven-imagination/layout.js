'use client';

import Sidebar from '@/components/Sidebar';
import PageNavigation from '@/components/PageNavigation';
import paperData from '@/data/papers/papers/curiosity-driven-imagination';

/**
 * 「Curiosity-Driven Imagination」論文のレイアウトコンポーネント
 * この論文のページに共通して適用されるレイアウトを定義します
 * サイドバーは固定表示され、メインコンテンツをスクロールしてもサイドバーは固定されます
 * 
 * @param {Object} props コンポーネントのプロパティ
 * @param {React.ReactNode} props.children 子コンポーネント
 * @returns {JSX.Element} 論文ページのレイアウト
 */
export default function CuriosityDrivenImaginationLayout({ children }) {
  return (
    <div className="flex flex-col lg:flex-row container mx-auto px-4 py-6 relative min-h-screen">
      {/* メインコンテンツエリア */}
      <div className="w-full lg:flex-1 lg:mr-8 pb-10">
        {children}
        
        {/* ページナビゲーションを表示 - paperDataのみを渡す */}
        <PageNavigation paperData={paperData} />
      </div>
      
      {/* サイドバーの位置を固定するための親コンテナ */}
      <div className="lg:block relative">
        <Sidebar paperData={paperData} />
      </div>
    </div>
  );
}
'use client';

/**
 * 論文一覧ページなど、特定の論文に関連しないページのレイアウトコンポーネント
 *
 * @param {Object} props コンポーネントのプロパティ
 * @param {React.ReactNode} props.children 子コンポーネント
 * @returns {JSX.Element} 論文一覧ページのレイアウト
 */
export default function PapersLayout({ children }) {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="w-full">{children}</div>
    </div>
  );
}

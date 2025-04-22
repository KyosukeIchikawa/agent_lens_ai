'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

/**
 * ホームページの検索コンポーネント
 * 検索キーワードを受け取り、/papers?search=のURLにリダイレクトする
 */
export default function ClientSearch({ allPapers }) {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = e => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // 検索クエリをURLパラメータとして付加して論文一覧ページに遷移
      router.push(`/papers?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // キーワード候補を生成する関数（将来的に実装する場合）
  const generateSuggestions = query => {
    if (!query.trim() || !allPapers) return [];
    // 将来的に検索候補を表示する場合はここに実装
    // 例: タイトルや著者名からマッチするものを表示
    return [];
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <form onSubmit={handleSearch} className="relative">
        <div className="flex">
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="論文のキーワードで検索..."
            className="flex-grow px-4 py-3 rounded-l-lg text-text border-2 border-primary focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="検索キーワード"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-primary text-white font-semibold rounded-r-lg hover:bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-primary-dark"
          >
            検索
          </button>
        </div>
      </form>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';

/**
 * 論文検索フォームコンポーネント
 * @param {Object} props - コンポーネントのプロパティ
 * @param {Function} props.onSearch - 検索実行時に呼び出される関数
 * @param {string} props.initialQuery - 初期検索キーワード（オプション）
 */
export default function SearchForm({ onSearch, initialQuery = '' }) {
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  // 初期クエリが変更された場合に状態を更新
  useEffect(() => {
    if (initialQuery !== searchQuery) {
      setSearchQuery(initialQuery);
    }
  }, [initialQuery]);

  const handleSearch = e => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex max-w-lg mx-auto">
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
    </form>
  );
}

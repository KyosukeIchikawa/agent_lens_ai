'use client';

import { useState, useEffect, Suspense } from 'react';
import { getAllPapers } from '@/data/papers';
import PaperCard from '@/components/PaperCard';
import { categories } from '@/data/papers/categories';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

// 検索パラメータを使用する部分を分離したコンポーネント
function PapersContent() {
  const allPapers = getAllPapers();
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryParam = searchParams.get('category');
  const searchQuery = searchParams.get('search');
  
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredPapers, setFilteredPapers] = useState(allPapers);
  const [searchTerm, setSearchTerm] = useState('');
  
  // URL変更時にカテゴリとキーワードを更新
  useEffect(() => {
    setSelectedCategory(categoryParam);
    setSearchTerm(searchQuery || '');
    
    let papers = allPapers;
    
    // カテゴリでフィルタリング
    if (categoryParam) {
      papers = papers.filter(paper => paper.categories.includes(categoryParam));
    }
    
    // 検索キーワードでフィルタリング
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      papers = papers.filter(paper => 
        paper.title.toLowerCase().includes(query) || 
        paper.description.toLowerCase().includes(query) || 
        paper.authors.some(author => author.toLowerCase().includes(query)) ||
        paper.categories.some(category => category.toLowerCase().includes(query))
      );
    }
    
    setFilteredPapers(papers);
  }, [categoryParam, searchQuery, allPapers]);
  
  // カテゴリ切り替え処理
  const handleCategoryChange = (categoryName) => {
    // 現在の検索クエリを維持しながらカテゴリを変更
    const params = new URLSearchParams();
    if (categoryName) params.set('category', categoryName);
    if (searchQuery) params.set('search', searchQuery);
    
    router.push(`/papers${params.toString() ? `?${params.toString()}` : ''}`);
  };
  
  // 検索実行処理
  const handleSearch = (query) => {
    // 現在のカテゴリを維持しながら検索キーワードを変更
    const params = new URLSearchParams();
    if (categoryParam) params.set('category', categoryParam);
    if (query) params.set('search', query);
    
    router.push(`/papers${params.toString() ? `?${params.toString()}` : ''}`);
  };

  // 検索クリア処理
  const clearSearch = () => {
    const params = new URLSearchParams();
    if (categoryParam) params.set('category', categoryParam);
    
    router.push(`/papers${params.toString() ? `?${params.toString()}` : ''}`);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-10 text-center text-text">
        論文一覧
      </h1>
      
      {/* 検索フォーム */}
      <div className="mb-8">
        <div className="w-full max-w-lg mx-auto">
          <form onSubmit={(e) => { e.preventDefault(); handleSearch(searchTerm); }} className="relative">
            <div className="flex">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
        
        {searchQuery && (
          <div className="mt-3 text-center">
            <p className="text-text-light">
              「{searchQuery}」の検索結果: {filteredPapers.length}件
              <button 
                onClick={clearSearch} 
                className="ml-2 text-primary hover:underline"
                aria-label="検索をクリア"
              >
                クリア
              </button>
            </p>
          </div>
        )}
      </div>

      {/* カテゴリフィルター */}
      <div className="mb-8 bg-surface p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4 text-text">カテゴリでフィルタリング</h2>
        <div className="flex flex-wrap gap-3 justify-start">
          <button 
            onClick={() => handleCategoryChange(null)}
            className={`px-4 py-2 rounded-full transition-all duration-300 ${!selectedCategory 
              ? 'bg-primary text-white shadow-md' 
              : 'bg-primary-light text-primary hover:bg-primary hover:text-white'}`}
            aria-label="すべてのカテゴリを表示"
          >
            すべて
          </button>
          {categories.map(category => (
            <button 
              key={category.id}
              onClick={() => handleCategoryChange(category.name)}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                selectedCategory === category.name 
                  ? 'bg-primary text-white shadow-md' 
                  : 'bg-primary-light text-primary hover:bg-primary hover:text-white'
              }`}
              aria-label={`${category.name}の論文を表示`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* 論文一覧 */}
      {filteredPapers.length > 0 ? (
        <>
          <div className="flex justify-between items-center mb-6 border-b pb-3 border-primary-light">
            <h2 className="text-lg font-semibold text-text">
              {filteredPapers.length}件の論文
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-8">
            {filteredPapers.map(paper => (
              <PaperCard key={paper.id} paper={paper} />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-16 bg-surface rounded-lg shadow-inner">
          <p className="text-xl text-text-light mb-6">
            {searchQuery 
              ? `「${searchQuery}」に一致する論文は見つかりませんでした。` 
              : selectedCategory 
                ? `${selectedCategory}に関する論文は見つかりませんでした。` 
                : '論文データがありません。'}
          </p>
          {(selectedCategory || searchQuery) && (
            <Link 
              href="/papers" 
              className="inline-block px-6 py-3 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors shadow-md"
            >
              すべての論文を表示
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

// ローディング表示用のフォールバックコンポーネント
function PapersLoadingFallback() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-10 text-center text-text">論文一覧</h1>
      <div className="flex flex-col items-center justify-center py-16 bg-surface rounded-lg shadow-sm">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-6"></div>
        <p className="text-lg text-text">論文データを読み込み中...</p>
      </div>
    </div>
  );
}

// メインの論文一覧ページコンポーネント
export default function PapersPage() {
  return (
    <Suspense fallback={<PapersLoadingFallback />}>
      <PapersContent />
    </Suspense>
  );
}
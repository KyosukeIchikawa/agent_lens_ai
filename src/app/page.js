import PaperCard from '@/components/PaperCard';
import Link from 'next/link';
import SearchForm from '@/components/SearchForm';
import { getAllPapers } from '@/data/papers';
import { categories } from '@/data/papers/categories';

// クライアントコンポーネントを分離
import ClientSearch from '@/components/ClientSearch';

export default function HomePage() {
  // サーバーサイドでデータを取得
  const allPapers = getAllPapers();
  
  // 最新の論文（最大3件）を表示
  const featuredPapers = allPapers.slice(0, 3);

  // 日付をフォーマットする関数
  const formatDate = (dateString) => {
    if (!dateString) return null;
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-grow">
        {/* ヒーローセクション */}
        <section className="bg-gradient-to-r from-primary to-secondary py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-inverse mb-6">
              AgentLens: AI
            </h1>
            <p className="text-xl md:text-2xl text-text-inverse mb-8 max-w-3xl mx-auto">
              AIの論文を視覚的に分かりやすく解説するサイト
            </p>
            
            {/* 検索フォーム（クライアントコンポーネント） */}
            <div className="mt-12">
              <ClientSearch allPapers={allPapers} />
            </div>
          </div>
        </section>

        {/* 注目の論文セクション */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-text mb-8 text-center">注目の論文</h2>
            
            {featuredPapers.length > 0 ? (
              <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
                <div className="md:w-1/2 lg:w-2/5">
                  {/* 最新の論文を1つ大きく表示 */}
                  {featuredPapers[0] && (
                    <Link 
                      href={`/papers/${featuredPapers[0].id}`}
                      className="block bg-surface rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer"
                    >
                      <div className="p-6">
                        <h3 className="text-2xl font-bold text-text mb-4">{featuredPapers[0].title}</h3>
                        <p className="text-text-light mb-3">{featuredPapers[0].authors.join(', ')}</p>
                        {/* 日付情報を追加 */}
                        <div className="text-sm text-text-light mb-4">
                          <p>論文公開: {featuredPapers[0].publishedDate 
                            ? formatDate(featuredPapers[0].publishedDate) 
                            : featuredPapers[0].publishedYear}</p>
                          {featuredPapers[0].addedDate && 
                            <p>記事追加: {formatDate(featuredPapers[0].addedDate)}</p>}
                        </div>
                        <p className="text-text mb-6">{featuredPapers[0].description}</p>
                      </div>
                    </Link>
                  )}
                </div>
                
                <div className="md:w-1/2 lg:w-3/5 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* 他の注目論文 */}
                  {featuredPapers.slice(1).map((paper, index) => (
                    <PaperCard key={paper.id} paper={paper} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-text-light text-lg">論文データを読み込み中...</p>
              </div>
            )}
          </div>
        </section>

        {/* 論文カテゴリセクション */}
        <section className="py-16 px-4 bg-surface">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-text mb-12 text-center">論文カテゴリ</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* カテゴリカード - 定義されたカテゴリから動的に生成 */}
              {categories.map((category) => (
                <div key={category.id} className={`${category.colorClass} rounded-lg p-6 text-center hover:shadow-lg transition-shadow`}>
                  <h3 className="text-xl font-semibold text-primary mb-3">{category.name}</h3>
                  <p className="text-text mb-4">{category.description}</p>
                  <Link 
                    href={`/papers?category=${encodeURIComponent(category.name)}`} 
                    className="text-primary font-semibold hover:underline"
                  >
                    カテゴリを見る
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
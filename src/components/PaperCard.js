import Link from 'next/link';
import Image from 'next/image';

/**
 * 論文カードコンポーネント
 * ホームページや論文一覧ページで使用する論文プレビューを表示します
 * 
 * @param {Object} props
 * @param {Object} props.paper 論文データ
 * @returns {JSX.Element}
 */
export default function PaperCard({ paper }) {
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

  const publishedDate = paper.publishedDate ? formatDate(paper.publishedDate) : paper.publishedYear;
  const addedDate = paper.addedDate ? formatDate(paper.addedDate) : null;

  return (
    <div className="bg-surface rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link href={`/papers/${paper.id}`} className="block h-full">
        <div className="relative h-48 overflow-hidden">
          {paper.coverImage ? (
            <Image
              src={paper.coverImage}
              alt={paper.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="bg-primary-light h-full w-full flex items-center justify-center">
              <span className="text-primary font-semibold">No Cover Image</span>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2 text-text line-clamp-2">{paper.title}</h3>
          <p className="text-sm text-text-light mb-2">{paper.authors.join(', ')}</p>
          <div className="text-sm text-text-light mb-4">
            <p>論文公開: {publishedDate}</p>
            {addedDate && <p>記事追加: {addedDate}</p>}
          </div>
          <p className="text-sm text-text line-clamp-3">{paper.description}</p>
          <div className="mt-4 flex flex-wrap justify-between items-center">
            <div className="flex flex-wrap gap-2 mb-2">
              {paper.categories?.slice(0, 3).map((category, index) => (
                <Link 
                  key={index}
                  href={`/papers?category=${encodeURIComponent(category)}`}
                  className="inline-block bg-secondary-light text-secondary text-xs px-2 py-1 rounded-full hover:bg-secondary hover:text-white transition-colors"
                >
                  {category}
                </Link>
              ))}
            </div>
            <span className="text-primary text-sm font-semibold">詳細を見る</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
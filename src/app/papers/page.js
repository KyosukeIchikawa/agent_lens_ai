'use client';

import { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAllPapers } from '@/data/papers';
import PaperCard from '@/components/PaperCard';
import { categories } from '@/data/papers/categories';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

// アニメーションのバリアント
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12,
    },
  },
};

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
  const [isSearching, setIsSearching] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);

  // URL変更時にカテゴリとキーワードを更新
  useEffect(() => {
    setSelectedCategory(categoryParam);
    setSearchTerm(searchQuery || '');

    setIsFiltering(true);

    let papers = allPapers;

    // カテゴリでフィルタリング
    if (categoryParam) {
      papers = papers.filter(paper => paper.categories.includes(categoryParam));
    }

    // 検索キーワードでフィルタリング
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      papers = papers.filter(
        paper =>
          paper.title.toLowerCase().includes(query) ||
          paper.description.toLowerCase().includes(query) ||
          paper.authors.some(author => author.toLowerCase().includes(query)) ||
          paper.categories.some(category => category.toLowerCase().includes(query)),
      );
    }

    // アニメーション効果のためのタイマー
    setTimeout(() => {
      setFilteredPapers(papers);
      setIsFiltering(false);
    }, 300);
  }, [categoryParam, searchQuery, allPapers]);

  // カテゴリ切り替え処理
  const handleCategoryChange = categoryName => {
    // アニメーションのためのフラグ
    setIsFiltering(true);

    // 現在の検索クエリを維持しながらカテゴリを変更
    const params = new URLSearchParams();
    if (categoryName) params.set('category', categoryName);
    if (searchQuery) params.set('search', searchQuery);

    router.push(`/papers${params.toString() ? `?${params.toString()}` : ''}`);
  };

  // 検索実行処理
  const handleSearch = query => {
    // アニメーションのためのフラグ
    setIsSearching(true);

    // 現在のカテゴリを維持しながら検索キーワードを変更
    const params = new URLSearchParams();
    if (categoryParam) params.set('category', categoryParam);
    if (query) params.set('search', query);

    setTimeout(() => {
      setIsSearching(false);
      router.push(`/papers${params.toString() ? `?${params.toString()}` : ''}`);
    }, 300);
  };

  // 検索クリア処理
  const clearSearch = () => {
    setIsSearching(true);

    const params = new URLSearchParams();
    if (categoryParam) params.set('category', categoryParam);

    setTimeout(() => {
      setIsSearching(false);
      router.push(`/papers${params.toString() ? `?${params.toString()}` : ''}`);
    }, 300);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-6 text-text bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary inline-block"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          論文一覧
        </motion.h1>
        <motion.p
          className="text-lg text-text-light max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          AIに関する最新の研究論文とその解説をご覧いただけます。カテゴリやキーワードで絞り込むこともできます。
        </motion.p>
      </motion.div>

      {/* 検索フォーム */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="w-full max-w-lg mx-auto">
          <motion.form
            onSubmit={e => {
              e.preventDefault();
              handleSearch(searchTerm);
            }}
            className="relative"
            whileHover={{ scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <div className="flex shadow-lg rounded-lg overflow-hidden">
              <motion.input
                whileFocus={{ scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="論文のキーワードで検索..."
                className="flex-grow px-6 py-4 text-text border-2 border-primary focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                aria-label="検索キーワード"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="px-6 py-4 bg-primary text-white font-semibold hover:bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-primary-dark flex items-center gap-2"
                disabled={isSearching}
              >
                {isSearching ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    />
                    <span>検索中...</span>
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    <span>検索</span>
                  </>
                )}
              </motion.button>
            </div>
          </motion.form>
        </div>

        <AnimatePresence>
          {searchQuery && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-3 text-center"
            >
              <p className="text-text-light">
                「{searchQuery}」の検索結果: {filteredPapers.length}件
                <motion.button
                  onClick={clearSearch}
                  className="ml-2 text-primary hover:underline flex items-center gap-1 mx-auto justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="検索をクリア"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  クリア
                </motion.button>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* カテゴリフィルター */}
      <motion.div className="mb-12" initial="hidden" animate="visible" variants={fadeIn}>
        <motion.div
          className="bg-surface rounded-xl shadow-lg p-8 relative overflow-hidden"
          whileHover={{
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          }}
          transition={{ duration: 0.2 }}
        >
          {/* 装飾要素 */}
          <motion.div
            className="absolute -top-20 -right-20 w-40 h-40 bg-primary/5 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 180, 270, 360],
            }}
            transition={{ duration: 20, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-24 -left-24 w-48 h-48 bg-secondary/5 rounded-full"
            animate={{ scale: [1.2, 1, 1.2] }}
            transition={{ duration: 15, repeat: Infinity, repeatType: 'reverse' }}
          />

          <div className="relative z-10">
            <h2 className="text-xl font-semibold mb-6 text-text flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              カテゴリでフィルタリング
            </h2>
            <motion.div
              className="flex flex-wrap gap-3 justify-start"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.button
                variants={itemVariants}
                onClick={() => handleCategoryChange(null)}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  !selectedCategory
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-primary-light text-primary hover:bg-primary hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="すべてのカテゴリを表示"
              >
                すべて
              </motion.button>
              {categories.map(category => (
                <motion.button
                  variants={itemVariants}
                  key={category.id}
                  onClick={() => handleCategoryChange(category.name)}
                  className={`px-4 py-2 rounded-full transition-all duration-300 ${
                    selectedCategory === category.name
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-primary-light text-primary hover:bg-primary hover:text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`${category.name}の論文を表示`}
                >
                  {category.name}
                </motion.button>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* 論文一覧 */}
      <AnimatePresence mode="wait">
        {isFiltering ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center items-center py-20"
          >
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
            />
            <p className="ml-4 text-lg text-text-light">フィルタリング中...</p>
          </motion.div>
        ) : filteredPapers.length > 0 ? (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="flex justify-between items-center mb-8 border-b pb-4 border-primary/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl font-semibold text-text flex items-center">
                <motion.span
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.5 }}
                  className="mr-2 text-primary"
                >
                  {filteredPapers.length}
                </motion.span>
                件の論文
              </h2>
              <div className="text-text-light text-sm">
                {selectedCategory && <span className="mr-2">カテゴリ: {selectedCategory}</span>}
              </div>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-8"
            >
              {filteredPapers.map(paper => (
                <motion.div
                  key={paper.id}
                  variants={itemVariants}
                  whileHover={{
                    y: -5,
                    boxShadow:
                      '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <PaperCard paper={paper} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-20 bg-surface rounded-xl shadow-lg overflow-hidden relative"
          >
            {/* 装飾要素 */}
            <motion.div
              className="absolute top-10 right-10 w-32 h-32 bg-primary/5 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-5 left-5 w-24 h-24 bg-secondary/5 rounded-full"
              animate={{ scale: [1.2, 1, 1.2] }}
              transition={{ duration: 10, repeat: Infinity }}
            />

            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <svg
                  className="mx-auto w-24 h-24 text-text-light mb-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </motion.div>

              <motion.p
                className="text-xl text-text-light mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {searchQuery
                  ? `「${searchQuery}」に一致する論文は見つかりませんでした。`
                  : selectedCategory
                    ? `${selectedCategory}に関する論文は見つかりませんでした。`
                    : '論文データがありません。'}
              </motion.p>

              {(selectedCategory || searchQuery) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <Link
                    href="/papers"
                    className="inline-block px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-lg transition-all font-medium"
                  >
                    すべての論文を表示
                  </Link>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ローディング表示用のフォールバックコンポーネント
function PapersLoadingFallback() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="flex flex-col items-center justify-center">
        <motion.div
          animate={{
            rotate: 360,
            borderRadius: ['50% 50%', '30% 70%', '70% 30%', '50% 50%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="w-24 h-24 border-4 border-primary border-t-transparent mb-8"
        ></motion.div>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-3xl font-bold mb-4 text-text"
        >
          論文データを読み込み中...
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-text-light"
        >
          少々お待ちください
        </motion.p>
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

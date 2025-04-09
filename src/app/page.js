'use client';

import PaperCard from '@/components/PaperCard';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import SearchForm from '@/components/SearchForm';
import { getAllPapers } from '@/data/papers';
import { categories } from '@/data/papers/categories';
import Image from 'next/image';

// クライアントコンポーネントを分離
import ClientSearch from '@/components/ClientSearch';

// アニメーション設定
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const pulseAnimation = {
  scale: [1, 1.03, 1],
  transition: { 
    duration: 2, 
    repeat: Infinity,
    repeatType: "reverse" 
  }
};

export default function HomePage() {
  // サーバーサイドでデータを取得
  const allPapers = getAllPapers();
  const [isLoaded, setIsLoaded] = useState(false);
  
  // 最新の論文（最大3件）を表示
  const featuredPapers = allPapers.slice(0, 3);

  // コンポーネントがマウントされた後にアニメーションを有効化
  useEffect(() => {
    setIsLoaded(true);
  }, []);

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
    <div className="min-h-screen flex flex-col bg-background overflow-hidden">
      <main className="flex-grow">
        {/* ヒーローセクション - アニメーション付き */}
        <section className="relative bg-gradient-to-r from-primary to-secondary py-24 overflow-hidden">
          {/* 背景アニメーション要素 */}
          <motion.div 
            className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"
            animate={{ 
              x: [50, -50],
              y: [-30, 30],
              scale: [1, 1.2, 1],
            }}
            transition={{ 
              duration: 15,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          <motion.div 
            className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl"
            animate={{ 
              x: [-40, 40],
              y: [20, -20],
              scale: [1.1, 0.9, 1.1],
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-inverse mb-6"
            >
              AgentLens: AI
            </motion.h1>
            
            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="text-xl md:text-2xl text-text-inverse mb-8 max-w-3xl mx-auto"
            >
              AIの論文を視覚的に分かりやすく解説するサイト
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-12 max-w-2xl mx-auto"
            >
              <ClientSearch allPapers={allPapers} />
            </motion.div>
          </div>
        </section>

        {/* 注目の論文セクション - アニメーション付き */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-3xl font-bold text-text mb-12 text-center"
            >
              注目の論文
            </motion.h2>
            
            {featuredPapers.length > 0 ? (
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
                className="flex flex-col md:flex-row gap-8 justify-center items-stretch"
              >
                <motion.div 
                  variants={fadeInUp}
                  className="md:w-1/2 lg:w-2/5"
                >
                  {/* 最新の論文を1つ大きく表示 */}
                  {featuredPapers[0] && (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Link 
                        href={`/papers/${featuredPapers[0].id}`}
                        className="block h-full bg-surface rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer border border-primary/10"
                      >
                        <div className="p-8 h-full flex flex-col">
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
                          <p className="text-text mb-6 flex-grow">{featuredPapers[0].description}</p>
                          <motion.div
                            whileHover={pulseAnimation}
                            className="inline-flex items-center text-primary font-semibold"
                          >
                            詳しく見る 
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </motion.div>
                        </div>
                      </Link>
                    </motion.div>
                  )}
                </motion.div>
                
                <motion.div 
                  variants={fadeInUp}
                  className="md:w-1/2 lg:w-3/5 grid grid-cols-1 sm:grid-cols-2 gap-6"
                >
                  {/* 他の注目論文 */}
                  {featuredPapers.slice(1).map((paper, index) => (
                    <motion.div
                      key={paper.id}
                      whileHover={{ scale: 1.03 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <PaperCard paper={paper} />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            ) : (
              <div className="text-center py-12">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"
                />
                <p className="text-text-light text-lg">論文データを読み込み中...</p>
              </div>
            )}
          </div>
        </section>

        {/* 論文カテゴリセクション - アニメーション付き */}
        <section className="py-20 px-4 bg-surface relative overflow-hidden">
          {/* 装飾要素 */}
          <motion.div 
            className="absolute -top-20 -right-20 w-64 h-64 bg-primary/5 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div 
            className="absolute -bottom-32 -left-32 w-80 h-80 bg-secondary/5 rounded-full"
            animate={{ scale: [1.2, 1, 1.2] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          
          <div className="container mx-auto relative z-10">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-3xl font-bold text-text mb-12 text-center"
            >
              論文カテゴリ
            </motion.h2>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {/* カテゴリカード - アニメーション付き */}
              {categories.map((category, index) => (
                <motion.div
                  key={category.id}
                  variants={fadeInUp}
                  whileHover={{ 
                    y: -5,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  }}
                  className={`${category.colorClass} rounded-lg p-8 text-center shadow-md transition-all`}
                >
                  <div className="mb-4 flex justify-center">
                    <motion.div
                      whileHover={pulseAnimation}
                      className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center"
                    >
                      {/* カテゴリのアイコンを表示（例示） */}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </motion.div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-primary mb-3">{category.name}</h3>
                  <p className="text-text mb-6">{category.description}</p>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                  >
                    <Link 
                      href={`/papers?category=${encodeURIComponent(category.name)}`} 
                      className="inline-flex items-center text-primary font-semibold hover:underline"
                    >
                      カテゴリを見る
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
        
        {/* CTA セクション */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 md:p-12 text-center text-white shadow-xl"
            >
              <h2 className="text-3xl font-bold mb-6">AIの最新論文をチェック</h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                視覚的に分かりやすく解説されたAI論文のコレクションをご覧ください。
                最新の研究と技術革新について学びましょう。
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Link 
                  href="/papers" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary rounded-lg font-bold shadow-md hover:bg-opacity-95 transition-colors"
                >
                  すべての論文を見る
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
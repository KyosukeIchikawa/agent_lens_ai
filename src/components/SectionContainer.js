import React from 'react';

/**
 * 論文のセクション内を視覚的に分離するためのコンテナコンポーネント
 * 
 * @param {React.ReactNode} children - セクションの内容
 * @param {string} title - セクションのタイトル
 * @param {string} id - セクションのID（アンカーリンク用）
 * @param {string} className - 追加のCSSクラス（オプション）
 */
export default function SectionContainer({
  children,
  title,
  id,
  className = "",
}) {
  return (
    <div id={id} className={`my-12 ${className}`}>
      <h2 className="text-2xl font-bold mb-6 pb-3 border-b-2 border-primary/30 text-primary">
        {title}
      </h2>
      <div className="prose max-w-none">
        {children}
      </div>
    </div>
  );
}
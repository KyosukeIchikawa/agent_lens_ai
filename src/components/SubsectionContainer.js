import React from 'react';

/**
 * 論文の各セクション内でサブセクションを視覚的に分離するためのコンテナコンポーネント
 * 
 * @param {React.ReactNode} children - サブセクションの内容
 * @param {string} title - サブセクションのタイトル
 * @param {string} id - サブセクションのID（アンカーリンク用）
 * @param {string} className - 追加のCSSクラス（オプション）
 */
export default function SubsectionContainer({
  children,
  title,
  id,
  className = "",
}) {
  return (
    <div id={id} className={`my-8 ${className}`}>
      <h3 className="text-xl font-semibold mb-4 pb-2 border-b border-primary/20 text-primary">
        {title}
      </h3>
      <div className="prose max-w-none">
        {children}
      </div>
    </div>
  );
}
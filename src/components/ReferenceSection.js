import React from 'react';

/**
 * 参考文献セクションコンポーネント - 参考文献のリストを表示する
 * 
 * @param {ReactNode} children - ReferenceItemコンポーネントのリスト
 * @param {string} title - セクションのタイトル
 * @param {string} id - セクションのID（アンカーリンク用）
 * @param {string} className - 追加のCSSクラス（オプション）
 */
export default function ReferenceSection({ children, title, id, className = "" }) {
  return (
    <div id={id} className={`reference-section my-8 ${className}`}>
      {title && (
        <h2 className="text-xl font-semibold mb-4 text-primary">{title}</h2>
      )}
      <div className="space-y-6">
        {children}
      </div>
    </div>
  );
}
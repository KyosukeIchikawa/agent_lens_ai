import React from 'react';

/**
 * 論文セクションのヘッダーコンポーネント
 * 
 * @param {string} title - セクションタイトル
 * @param {string} subtitle - セクションサブタイトル（オプション）
 * @param {string} sectionNumber - セクション番号（オプション）
 */
export default function SectionHeader({ title, subtitle, sectionNumber }) {
  return (
    <header className="mb-6">
      <h1 className="text-3xl font-bold mb-2 text-primary">
        {sectionNumber && `${sectionNumber}. `}{title}
      </h1>
      {subtitle && (
        <p className="text-lg text-primary">
          {subtitle}
        </p>
      )}
    </header>
  );
}
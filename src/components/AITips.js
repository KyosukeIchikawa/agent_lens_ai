import React from 'react';

/**
 * AITipsコンポーネント - 論文の内容に対する補足説明や例え話を提供
 *
 * 論文の正規の内容と区別するため、独自のスタイルを持っています。
 * 例え話や初学者向けの説明、追加コンテキストなどを提供するために使用します。
 *
 * @param {ReactNode} children - AI Tipsの内容
 * @param {string} title - 追加のカスタムタイトル（「AI Tips」の右側に表示）
 * @param {string} icon - 使用するアイコン（デフォルトはライトバルブ）
 */
export default function AITips({ children, title, icon = 'lightbulb' }) {
  // アイコンの選択（現在はライトバルブのみ対応）
  const renderIcon = () => {
    if (icon === 'lightbulb') {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      );
    }
    return null;
  };

  return (
    <div className="my-6 rounded-lg border-2 border-ai-tips-border bg-ai-tips overflow-hidden">
      {/* ヘッダー部分 */}
      <div className="bg-ai-tips-border/50 py-2 px-4 flex items-center gap-2 border-b border-ai-tips-border">
        <div className="text-primary-dark">{renderIcon()}</div>
        <div className="flex items-center gap-2">
          <h4 className="font-medium text-primary-dark text-lg">AI Tips</h4>
          {title && (
            <>
              <span className="text-primary-dark/85">-</span>
              <h4 className="font-medium text-primary-dark/85 text-lg">{title}</h4>
            </>
          )}
        </div>
      </div>

      {/* コンテンツ部分 */}
      <div className="p-4">
        <div className="prose max-w-none">{children}</div>
      </div>
    </div>
  );
}

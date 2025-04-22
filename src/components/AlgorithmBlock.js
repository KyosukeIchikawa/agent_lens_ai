import React from 'react';

/**
 * アルゴリズムや疑似コードを表示するためのコンポーネント
 *
 * @param {string} title - アルゴリズムのタイトル
 * @param {string[]} steps - アルゴリズムのステップ（配列）
 * @param {string[]} lines - アルゴリズムの行（配列）- stepsの代替として使用可能
 * @param {string} number - アルゴリズム番号（オプション）
 * @param {string} caption - アルゴリズムの説明（オプション）
 * @param {boolean} showLineNumbers - 行番号を表示するかどうか（オプション）
 * @param {string} className - 追加のCSSクラス（オプション）
 */
export default function AlgorithmBlock({
  title,
  steps,
  lines,
  number,
  caption,
  showLineNumbers = true,
  className = '',
}) {
  // stepsプロパティが提供された場合はそれを使用し、そうでなければlinesプロパティを使用
  const algorithmLines = steps || lines || [];

  if (algorithmLines.length === 0) {
    console.error('AlgorithmBlock requires steps or lines array with content');
    return <div className="text-red-500">Algorithm content is missing</div>;
  }

  return (
    <div className={`my-6 ${className}`}>
      <div className="bg-white rounded-lg shadow overflow-hidden border border-primary/20">
        <div className="bg-primary-light text-primary font-medium px-4 py-2 border-b border-primary/20">
          {number && <span>Algorithm {number}: </span>}
          {title}
        </div>
        <div className="p-4 bg-algorithm font-mono text-sm overflow-x-auto">
          <table className="w-full">
            <tbody>
              {algorithmLines.map((line, index) => (
                <tr key={index} className="leading-relaxed">
                  {showLineNumbers && (
                    <td className="pr-4 text-right text-text-lighter select-none w-12">
                      {index + 1}
                    </td>
                  )}
                  <td className="whitespace-pre">{line}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {caption && <div className="text-sm text-primary mt-2 text-center">{caption}</div>}
    </div>
  );
}

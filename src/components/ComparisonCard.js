import React from 'react';
import { MathJax } from 'better-react-mathjax';

/**
 * 実験結果や手法の比較を表示するためのカードコンポーネント
 * 
 * 異なる手法やモデルの結果を視覚的に比較するために使用します。
 * 数値や視覚的な指標を使って比較情報を提供します。
 * 
 * @param {Object} props
 * @param {string} props.title - 比較カードのタイトル
 * @param {Array} props.items - 比較する項目の配列
 * @param {string} props.metricName - 比較する指標の名前（オプション）
 * @param {string} props.metricUnit - 指標の単位（オプション）
 * @param {boolean} props.higherIsBetter - 高い値が良いかどうか（デフォルトはtrue）
 * @param {string} props.description - 比較結果の説明（オプション）
 * @param {Object} props.legendConfig - 凡例の設定（オプション）
 */
export default function ComparisonCard({
  title,
  items = [],
  metricName = '',
  metricUnit = '',
  higherIsBetter = true,
  description = '',
  legendConfig = null,
}) {
  // 最大値を計算して相対的なスケールを作成
  const maxValue = Math.max(...items.map(item => Number(item.value) || 0));
  
  // 色情報
  const getBarColor = (isHighlighted, index) => {
    if (isHighlighted) {
      return 'bg-accent';
    }
    // 複数のアイテムには色のバリエーションを与える
    const colors = ['bg-primary', 'bg-secondary', 'bg-primary-light', 'bg-secondary-light'];
    return colors[index % colors.length];
  };
  
  // 数値が文字列やTeX数式の場合にも対応
  const renderValue = (value) => {
    if (typeof value === 'string' && value.includes('\\')) {
      // TeX式の場合はMathJaxで表示
      return <MathJax>{`\\(${value}\\)`}</MathJax>;
    }
    return value;
  };

  return (
    <div className="my-6 bg-surface rounded-lg border border-border shadow-sm overflow-hidden">
      {/* ヘッダー部分 */}
      <div className="border-b border-border bg-surface-accent p-4">
        <h3 className="text-lg font-medium text-text">{title}</h3>
        {metricName && (
          <p className="mt-1 text-sm text-text-light">
            比較指標: {metricName} {metricUnit && `(${metricUnit})`}
          </p>
        )}
      </div>
      
      {/* 比較アイテム一覧 */}
      <div className="p-4">
        <ul className="space-y-3">
          {items.map((item, index) => {
            // パーセンテージスケールを計算
            const percentage = maxValue > 0 
              ? (Number(item.value) || 0) / maxValue * 100
              : 0;
            
            return (
              <li key={index} className="relative">
                <div className="flex items-center justify-between mb-1">
                  <div className="font-medium flex items-center">
                    {item.name}
                    {item.isHighlighted && (
                      <span className="ml-2 text-xs px-2 py-0.5 bg-accent-light text-accent rounded-full">
                        {higherIsBetter ? '最良' : '最適'}
                      </span>
                    )}
                  </div>
                  <div className="text-right flex items-center">
                    {renderValue(item.value)}
                    {metricUnit && <span className="ml-1 text-text-light">{metricUnit}</span>}
                  </div>
                </div>
                
                {/* プログレスバー */}
                <div className="w-full bg-progress-bg rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${getBarColor(item.isHighlighted, index)}`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                
                {/* 追加説明 */}
                {item.description && (
                  <p className="mt-1 text-xs text-text-light">{item.description}</p>
                )}
              </li>
            );
          })}
        </ul>
        
        {/* 全体の説明 */}
        {description && (
          <p className="mt-4 text-sm text-text-light">{description}</p>
        )}
        
        {/* 凡例 */}
        {legendConfig && (
          <div className="mt-4 pt-3 border-t border-border-light">
            <p className="text-sm font-medium text-text mb-2">凡例:</p>
            <div className="flex flex-wrap gap-4">
              {legendConfig.items.map((legend, idx) => (
                <div key={idx} className="flex items-center">
                  <span 
                    className={`inline-block w-3 h-3 mr-2 rounded-full ${legend.color || getBarColor(false, idx)}`}
                  ></span>
                  <span className="text-xs text-text-light">{legend.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
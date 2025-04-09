'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// KaTeXをクライアントサイドでのみ使用するための対応
const MathEquationClientSide = ({ equation, displayMode = false, className = "" }) => {
  const [rendered, setRendered] = useState(false);
  const containerRef = React.useRef(null);

  useEffect(() => {
    // クライアントサイドでのみ実行
    const renderMath = async () => {
      const katex = (await import('katex')).default;
      await import('katex/dist/katex.min.css');
      
      if (containerRef.current) {
        try {
          katex.render(equation, containerRef.current, {
            displayMode: displayMode,
            throwOnError: false,
            output: 'html'
          });
          setRendered(true);
        } catch (error) {
          console.error('KaTeX rendering error:', error);
          containerRef.current.textContent = equation;
        }
      }
    };

    renderMath();
  }, [equation, displayMode]);

  // インライン表示かブロック表示かに基づいて適切なHTML要素を返す
  const Container = displayMode ? 'div' : 'span';
  
  return (
    <Container 
      ref={containerRef}
      className={className} 
      // バックアップとして未レンダリングの場合テキストを表示
      {...(!rendered && { 'data-tex': equation })}
    />
  );
};

/**
 * 数式を表示するためのコンポーネント
 * KaTeXライブラリを使用して数式をレンダリング
 * 
 * @param {string} latex - 表示する数式（LaTeX形式）
 * @param {boolean} displayMode - ブロック表示するかどうか (デフォルトはfalse=インライン表示)
 * @param {string} caption - 数式の説明（オプション）
 * @param {string} eqNumber - 数式番号（オプション）
 * @param {string} className - 追加のCSSクラス（オプション）
 */
export default function MathEquation({
  latex,
  displayMode = false,
  caption,
  eqNumber,
  className = "",
}) {
  if (!displayMode) {
    return (
      <span className={`math-inline ${className}`}>
        <MathEquationClientSide equation={latex} displayMode={false} />
      </span>
    );
  }
  
  return (
    <div className={`my-4 ${className}`}>
      <div className={`flex justify-between items-center py-2 ${!eqNumber ? 'justify-center' : ''}`}>
        <div className={`${eqNumber ? 'flex-grow' : ''} text-center`}>
          <div className="math-display py-2 px-4 inline-block">
            <MathEquationClientSide equation={latex} displayMode={true} />
          </div>
        </div>
        {eqNumber && (
          <div className="text-text-light ml-4">({eqNumber})</div>
        )}
      </div>
      {caption && (
        <div className="text-sm text-text-light mt-1 text-center">
          {caption}
        </div>
      )}
    </div>
  );
}
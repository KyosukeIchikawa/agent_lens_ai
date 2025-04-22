import React from 'react';
import Image from 'next/image';
import { getFigNum } from '@/utils/figureUtils';

/**
 * 論文の図表を表示するコンポーネント
 * 論文データから指定したIDの図表を取得して表示する、または直接パラメータで指定された図表を表示する
 *
 * @param {Object} props - コンポーネントのプロパティ
 * @param {Object} [props.paper] - 論文データオブジェクト（IDベースの表示用）
 * @param {string} [props.figureId] - 表示する図表のID（IDベースの表示用）
 * @param {ReactNode} [props.children] - 図表のコンテンツ（Image代わりに独自コンテンツを表示する場合）
 * @param {string} [props.src] - 図表の画像パス（直接パス指定の場合）
 * @param {string} [props.alt] - 画像の代替テキスト
 * @param {number} [props.width] - 画像の幅
 * @param {number} [props.height] - 画像の高さ
 * @param {string} [props.caption] - 図表のキャプション
 * @param {string} [props.paperFigNumber] - 論文中の図番号（例: "1", "2a"）
 * @param {string} [props.localFigNumber] - 個別論文ページでの図番号（例: "1"）
 * @param {boolean} [props.isQuoted=false] - 論文から引用した図かどうか
 * @param {string} [props.className] - 追加のCSSクラス
 * @param {string} [props.captionClassName] - キャプションのCSSクラス
 * @param {string} [props.containerClassName] - 図表コンテナのCSSクラス
 * @returns {JSX.Element|null} - 図表コンポーネントまたはnull（図表が見つからない場合）
 */
export default function PaperFigure({
  paper,
  figureId,
  children,
  src,
  alt,
  width,
  height,
  caption,
  paperFigNumber,
  localFigNumber,
  isQuoted = false,
  className = '',
  captionClassName = 'text-primary',
  containerClassName = 'bg-white p-4 rounded-lg mb-2 shadow-inner',
}) {
  /**
   * 図表データに基づいて適切なパスを返す
   *
   * @param {Object} figure - 図表データオブジェクト
   * @param {string} paperId - 論文ID
   * @returns {string} - 図表のパス
   */
  const getFigurePath = (figure, paperId) => {
    if (!figure) return '';

    const folder = figure.isQuoted ? 'quoted' : 'created';
    // プロダクション環境でのベースパスを考慮
    const basePath = process.env.NODE_ENV === 'production' ? '/agent_lens_ai' : '';
    return `${basePath}/images/papers/${paperId}/${folder}/${figure.filename}`;
  };

  // 論文データと図表IDが指定されている場合、論文データから図表情報を取得
  let figureProps = {};

  if (paper && figureId) {
    const figure = paper.figures?.find(fig => fig.id === figureId);

    // 図表が見つからない場合
    if (!figure) {
      console.warn(`図表ID "${figureId}" が論文 "${paper.id}" に見つかりません`);
      return null;
    }

    // 図表データから必要な情報を取得
    const figurePath = getFigurePath(figure, paper.id);

    figureProps = {
      src: figurePath,
      alt: figure.altText || figure.caption,
      caption: figure.caption,
      paperFigNumber: figure.paperFigNumber,
      localFigNumber: figure.localFigNumber,
      isQuoted: figure.isQuoted,
    };
  } else {
    // 直接プロパティとして渡された値を使用
    figureProps = {
      src,
      alt,
      caption,
      paperFigNumber,
      localFigNumber,
      isQuoted,
    };
  }

  // 引用元の表示用スタイル
  const quotedStyle = figureProps.isQuoted ? 'border-l-4 border-accent-light pl-2' : '';

  // 論文と図表情報からfigNumberを生成するためのデータを準備
  const figData = {
    figures: paper?.figures || [
      {
        id: figureId || 'temp',
        localFigNumber: figureProps.localFigNumber,
        paperFigNumber: figureProps.paperFigNumber,
      },
    ],
  };

  // 引用の場合の表示テキスト
  const quotedText = figureProps.isQuoted ? '（原論文より引用）' : '';

  return (
    <figure className={`text-center mx-auto ${className}`}>
      <div
        className={`${containerClassName} ${figureProps.isQuoted ? 'bg-primary-light' : 'bg-white'}`}
      >
        {children ? (
          children
        ) : figureProps.src ? (
          <div className="flex justify-center">
            <Image
              src={figureProps.src}
              alt={figureProps.alt || figureProps.caption || '図表'}
              width={width || 800}
              height={height || 500}
              className="max-w-full h-auto"
            />
          </div>
        ) : null}
      </div>

      {/* 図表番号は常に表示 */}
      <figcaption className={`text-sm mt-2 ${captionClassName} ${quotedStyle}`}>
        <span className="font-semibold">
          {paper && figureId
            ? getFigNum(paper, figureId, { includePaperFigNumber: true })
            : figureProps.localFigNumber || figureProps.paperFigNumber
              ? getFigNum(figData, 'temp', { includePaperFigNumber: true })
              : ''}
        </span>
        {figureProps.caption && (
          <>
            : {figureProps.caption} {quotedText}
          </>
        )}
      </figcaption>
    </figure>
  );
}

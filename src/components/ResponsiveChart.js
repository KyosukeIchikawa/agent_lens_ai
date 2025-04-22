import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

/**
 * レスポンシブなチャートを表示するコンポーネント
 *
 * @param {Object} props
 * @param {React.ReactElement} props.chart - Chart.jsのコンポーネント (Bar, Line, Pieなど)
 * @param {string} props.caption - チャートの説明キャプション
 * @param {string} props.captionColor - キャプションの色クラス名
 * @param {string} props.bgGradient - 背景グラデーションクラス (デフォルト: "from-white to-primary-light")
 */
const ResponsiveChart = ({
  chart,
  caption,
  captionColor = 'text-primary',
  bgGradient = 'from-white to-primary-light',
}) => {
  // サーバーサイドレンダリング中にwindowオブジェクトを参照しないようにする
  const [isMobile, setIsMobile] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [error, setError] = useState(false);

  // マウント時とリサイズ時に画面サイズを検出（クライアントサイドのみ）
  useEffect(() => {
    // コンポーネントがマウントされたことを記録
    setHasMounted(true);

    try {
      // 画面サイズの検出
      const checkIfMobile = () => {
        if (typeof window !== 'undefined') {
          setIsMobile(window.innerWidth < 768); // 768px以下ならモバイル判定
        }
      };

      // 初回チェック
      checkIfMobile();

      // リサイズイベントのリスナーを追加
      if (typeof window !== 'undefined') {
        window.addEventListener('resize', checkIfMobile);

        // クリーンアップ関数
        return () => {
          window.removeEventListener('resize', checkIfMobile);
        };
      }
    } catch (e) {
      console.error('ResponsiveChart error:', e);
      setError(true);
    }
  }, []);

  // chartが有効かどうかをチェック (エラー防止)
  const isValidChart = chart && typeof chart !== 'boolean';

  return (
    <div className="flex justify-center">
      <div className="bg-white p-3 sm:p-4 rounded-lg shadow-inner w-full">
        <div
          className={`w-full bg-gradient-to-b ${bgGradient} rounded overflow-hidden`}
          style={{ height: isMobile ? '280px' : '320px' }}
        >
          {/* エラーが発生した場合 */}
          {error && (
            <div className="h-full w-full flex items-center justify-center">
              <p className="text-accent">グラフの読み込みに失敗しました</p>
            </div>
          )}

          {/* マウント済みかつチャートが有効、かつエラーなしの場合のみレンダリング */}
          {hasMounted && isValidChart && !error && <div className="h-full w-full">{chart}</div>}

          {/* チャートが無効または未マウントの場合のフォールバック表示 */}
          {(!isValidChart || !hasMounted) && !error && (
            <div className="h-full w-full flex items-center justify-center">
              <p className="text-primary">
                {!hasMounted ? 'グラフを読み込み中...' : 'グラフを読み込めませんでした'}
              </p>
            </div>
          )}
        </div>
        {caption && (
          <p className={`text-xs sm:text-sm ${captionColor} mt-2 text-center`}>{caption}</p>
        )}
      </div>
    </div>
  );
};

// サーバーサイドレンダリング時に実行されないようにクライアントサイドのみでコンポーネントをロード
export default ResponsiveChart;

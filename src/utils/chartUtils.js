/**
 * グラフチャート関連のユーティリティ関数と設定
 * 
 * このモジュールは、Chart.jsを使用したグラフ表示に必要な共通設定や
 * ユーティリティ関数を提供します。
 */

// デフォルトカラー（サーバーサイドレンダリング用）
export const defaultColors = {
  primary: { main: 'rgba(52, 152, 219, 0.7)', border: 'rgba(52, 152, 219, 1)', light: 'rgba(52, 152, 219, 0.2)' },
  secondary: { main: 'rgba(46, 204, 113, 0.7)', border: 'rgba(46, 204, 113, 1)', light: 'rgba(46, 204, 113, 0.2)' },
  accent: { main: 'rgba(231, 76, 60, 0.7)', border: 'rgba(231, 76, 60, 1)', light: 'rgba(231, 76, 60, 0.2)' },
};

/**
 * DOM操作でTailwindのカスタムカラーを取得する関数
 * 
 * @param {string} colorName - 取得するカラー名（'primary', 'secondary', 'accent'など）
 * @param {number} opacity - 透明度（0.0～1.0）
 * @returns {string} - RGBA形式のカラー文字列
 */
export const getColorWithOpacity = (colorName, opacity = 1) => {
  try {
    // サーバーサイドレンダリング時はwindowが存在しないため、早期リターン
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return getDefaultColor(colorName, opacity);
    }

    // すでに作成済みの要素を再利用するか確認
    let el = document.getElementById(`color-helper-${colorName}`);
    
    // 要素が存在しない場合は新しく作成
    if (!el) {
      el = document.createElement('div');
      el.id = `color-helper-${colorName}`;
      el.classList.add(`text-${colorName}`);
      el.style.visibility = 'hidden';
      el.style.position = 'absolute';
      el.style.pointerEvents = 'none';
      document.body.appendChild(el);
    }
    
    // スタイルを計算
    const color = window.getComputedStyle(el).color;
    
    // RGB値を抽出してRGBA形式に変換
    const rgbMatch = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (rgbMatch) {
      return `rgba(${rgbMatch[1]}, ${rgbMatch[2]}, ${rgbMatch[3]}, ${opacity})`;
    }
    
    return color;
  } catch (e) {
    console.warn('Error getting color:', e);
    return getDefaultColor(colorName, opacity);
  }
};

/**
 * カラー名と透明度からデフォルトカラーを返す
 * 
 * @param {string} colorName - 取得するカラー名（'primary', 'secondary', 'accent'など）
 * @param {number} opacity - 透明度（0.0～1.0）
 * @returns {string} - RGBA形式のカラー文字列
 */
export const getDefaultColor = (colorName, opacity = 1) => {
  if (colorName === 'primary') {
    return opacity === 1 ? 'rgba(52, 152, 219, 1)' : 
          opacity === 0.2 ? 'rgba(52, 152, 219, 0.2)' : 'rgba(52, 152, 219, 0.7)';
  } else if (colorName === 'secondary') {
    return opacity === 1 ? 'rgba(46, 204, 113, 1)' : 
          opacity === 0.2 ? 'rgba(46, 204, 113, 0.2)' : 'rgba(46, 204, 113, 0.7)';
  } else {
    return opacity === 1 ? 'rgba(231, 76, 60, 1)' : 
          opacity === 0.2 ? 'rgba(231, 76, 60, 0.2)' : 'rgba(231, 76, 60, 0.7)';
  }
};

/**
 * TailwindカラーをChart.jsで使用するためのオブジェクトを生成する
 * 
 * @returns {Object} Chart.jsで使用するカラーオブジェクト
 */
export const getChartColors = () => {
  try {
    // SSRの場合はデフォルトカラーを返す
    if (typeof window === 'undefined') {
      return defaultColors;
    }

    return {
      primary: {
        main: getColorWithOpacity('primary', 0.7),
        border: getColorWithOpacity('primary', 1),
        light: getColorWithOpacity('primary', 0.2),
      },
      secondary: {
        main: getColorWithOpacity('secondary', 0.7),
        border: getColorWithOpacity('secondary', 1),
        light: getColorWithOpacity('secondary', 0.2),
      },
      accent: {
        main: getColorWithOpacity('accent', 0.7),
        border: getColorWithOpacity('accent', 1),
        light: getColorWithOpacity('accent', 0.2),
      },
    };
  } catch (e) {
    console.warn('Error in getChartColors:', e);
    return defaultColors;
  }
};

/**
 * 棒グラフの共通オプション設定を生成する
 * 
 * @param {Object} colors - カラー設定オブジェクト
 * @param {string} title - グラフのタイトル
 * @param {string} yAxisTitle - Y軸のタイトル
 * @param {number} yAxisMax - Y軸の最大値（指定しない場合はnull）
 * @returns {Object} Chart.jsのオプション設定
 */
export const getBarChartOptions = (colors, title, yAxisTitle, yAxisMax = null) => {
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    animation: {
      duration: 1000,
      easing: 'easeOutQuad'
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: title,
        color: colors.primary.border,
        font: {
          weight: 'bold'
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: yAxisTitle,
          color: colors.primary.border,
        },
        ticks: {
          color: colors.primary.main,
        }
      },
      x: {
        ticks: {
          color: colors.primary.main,
        }
      }
    }
  };

  // Y軸の最大値が指定されている場合、設定を追加
  if (yAxisMax !== null) {
    options.scales.y.max = yAxisMax;
  }

  return options;
};

/**
 * 折れ線グラフの共通オプション設定を生成する
 * 
 * @param {Object} colors - カラー設定オブジェクト
 * @param {string} title - グラフのタイトル
 * @param {string} yAxisTitle - Y軸のタイトル
 * @param {string} xAxisTitle - X軸のタイトル
 * @returns {Object} Chart.jsのオプション設定
 */
export const getLineChartOptions = (colors, title, yAxisTitle, xAxisTitle) => {
  return {
    responsive: true,
    maintainAspectRatio: true,
    animation: {
      duration: 1200,
      easing: 'easeOutQuad'
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: title,
        color: colors.primary.border,
        font: {
          weight: 'bold'
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: yAxisTitle,
          color: colors.primary.border,
        },
        ticks: {
          color: colors.primary.main,
        }
      },
      x: {
        title: {
          display: true,
          text: xAxisTitle,
          color: colors.primary.border,
        },
        ticks: {
          color: colors.primary.main,
        }
      }
    }
  };
};
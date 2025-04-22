/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // 基本カラー
        primary: '#3498db', // 青系 - ロボティクス・AIを表現
        secondary: '#2ecc71', // 緑系 - 好奇心・探索を表現
        accent: '#e74c3c', // 赤系 - 重要概念の強調

        // 背景と文字
        background: '#f5f5f5', // 明るいグレー - 読みやすさを確保
        text: '#333333', // 濃いグレー - コントラスト確保

        // 基本カラーのバリエーション
        'primary-light': '#e8f4fd',
        'primary-dark': '#2980b9',
        'primary-hover': '#5faee3',
        'primary-active': '#217dbb',

        'secondary-light': '#e8f8f1',
        'secondary-dark': '#27ae60',
        'secondary-hover': '#58d68d',
        'secondary-active': '#229954',

        'accent-light': '#fceae8',
        'accent-dark': '#c0392b',
        'accent-hover': '#ec7063',
        'accent-active': '#b83227',

        // 特別な用途のカラー
        'ai-tips': '#f0e6ff', // AI Tipsの背景色（薄い紫）
        'ai-tips-border': '#d8bfff', // AI Tipsのボーダー色

        // UI要素用の抽象カラー
        surface: '#ffffff', // カード、ダイアログなどの表面
        'surface-hover': '#f8f8f8',
        'surface-accent': '#f9f9f9', // アクセント表面（ヘッダーなど）
        border: '#e0e0e0', // 境界線
        'border-light': '#f0f0f0', // 薄い境界線
        divider: '#eeeeee', // 区切り線

        // 状態を表す色
        info: '#3498db', // 情報（primaryと同じ）
        success: '#2ecc71', // 成功（secondaryと同じ）
        warning: '#f39c12', // 警告
        error: '#e74c3c', // エラー（accentと同じ）
        disabled: '#bdc3c7', // 無効状態

        // テキストバリエーション
        'text-light': '#666666', // 薄いテキスト（補足など）
        'text-lighter': '#999999', // より薄いテキスト
        'text-inverse': '#ffffff', // 暗い背景上のテキスト

        // プログレスバー専用
        'progress-bg': '#f0f0f0', // プログレスバーの背景

        // 特殊用途
        'code-background': '#f8f8f8', // コードブロック背景
        highlight: '#fff9c4', // ハイライト
        quote: '#f0f7fb', // 引用ブロック
        algorithm: '#f5f5f5', // アルゴリズムブロック背景
        math: '#fafafa', // 数式背景
        chart: {
          axis: '#cccccc', // グラフの軸
          grid: '#eeeeee', // グラフのグリッド線
          series1: '#3498db', // データ系列1（primaryと同じ）
          series2: '#2ecc71', // データ系列2（secondaryと同じ）
          series3: '#e74c3c', // データ系列3（accentと同じ）
          series4: '#f39c12', // データ系列4
          series5: '#9b59b6', // データ系列5
        },
      },
      fontFamily: {
        sans: ['Roboto', 'Noto Sans JP', 'sans-serif'],
        mono: ['Source Code Pro', 'monospace'],
      },
    },
  },
  plugins: [],
};

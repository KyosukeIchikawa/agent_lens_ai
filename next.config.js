/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  distDir: 'out',
  images: {
    unoptimized: true,
    domains: ['kyosukeichikawa.github.io'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kyosukeichikawa.github.io',
        pathname: '/agent_lens_ai/**',
      },
    ],
  },
  basePath: process.env.NODE_ENV === 'production' ? '/agent_lens_ai' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/agent_lens_ai/' : '',
  trailingSlash: true,
  // ルーターエラーを無視するために静的エクスポート設定を追加
  experimental: {
    // ビルド中のNextRouterエラーを無視する
    missingSuspenseWithCSRBailout: true,
  },
};

module.exports = nextConfig;

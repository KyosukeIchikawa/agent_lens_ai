import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ScrollToTop from './ScrollToTop';

export default function Layout({ children, title = 'Curiosity-Driven Imagination' }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  // マウント後にのみレンダリングするための処理
  useEffect(() => {
    setMounted(true);
  }, []);

  // ページ遷移時にメニューを閉じる
  useEffect(() => {
    setIsMenuOpen(false);
  }, [router.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // ナビゲーションリンク
  const navLinks = [
    { href: '/', label: 'トップ' },
    { href: '/background/', label: '背景' },
    { href: '/related-work/', label: '関連研究' },
    { href: '/method/', label: '提案手法' },
    { href: '/experiments/', label: '実験' },
    { href: '/results/', label: '結果と分析' },
    { href: '/discussion/', label: '議論と今後の展望' },
    { href: '/conclusion/', label: '結論' },
    { href: '/references/', label: '参考文献' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Head>
        <title>{title} | 論文解説</title>
        <meta name="description" content="Curiosity-Driven Imagination: Discovering Plan Operators and Learning Associated Policies for Open-World Adaptation" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Noto+Sans+JP:wght@400;500;700&family=Source+Code+Pro&display=swap"
          rel="stylesheet"
        />
      </Head>

      <header className="sticky top-0 z-20 bg-surface shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-primary">
            Curiosity-Driven Imagination
          </Link>
          <div className="flex items-center space-x-4">
            {/* ハンバーガーメニュー - 目次も含む */}
            <button
              className="block md:hidden text-text"
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
          
          {/* デスクトップ用ナビゲーション */}
          <nav className="hidden md:block">
            <ul className="flex flex-row space-x-8">
              {navLinks.slice(0, 5).map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className={`text-text hover:text-primary ${
                      router.pathname === link.href ? 'font-semibold text-primary' : ''
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        
        {/* モバイル用メインナビゲーション（目次を含む） */}
        <div
          className={`${
            isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
          } md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-surface shadow-lg`}
        >
          <nav className="container mx-auto px-4 py-2">
            <h3 className="text-lg font-semibold my-2 text-text">目次</h3>
            <ul className="flex flex-col space-y-3 pb-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className={`block py-2 text-text hover:text-primary ${
                      router.pathname === link.href ? 'font-semibold text-primary' : ''
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row">
          <aside className="hidden lg:block w-64 shrink-0 mr-8">
            <div className="sticky top-24 p-4 bg-surface rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4 text-text">目次</h3>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href} 
                      className={`text-text hover:text-primary ${
                        router.pathname === link.href ? 'font-semibold text-primary' : ''
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
          
          <div className="flex-grow bg-surface rounded-lg shadow p-6">
            {children}
          </div>
          
          <aside className="hidden xl:block w-64 shrink-0 ml-8">
            <div className="sticky top-24 p-4 bg-surface rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4 text-text">論文情報</h3>
              <div className="space-y-2 text-sm text-text">
                <p>
                  <strong>タイトル:</strong> Curiosity-Driven Imagination: Discovering Plan Operators and Learning Associated Policies for Open-World Adaptation
                </p>
                <p>
                  <strong>著者:</strong> Pierrick Lorang, Hong Lu, Matthias Scheutz
                </p>
                <p>
                  <strong>会議:</strong> ICRA 2025
                </p>
                <p>
                  <a
                    href="https://arxiv.org/abs/2503.04931v1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    原論文を読む (arXiv)
                  </a>
                </p>
              </div>
            </div>
          </aside>
        </div>
      </main>
      
      <ScrollToTop />
      
      <footer className="bg-text text-text-inverse py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p>&copy; 2025 Curiosity-Driven Imagination論文解説</p>
              <p className="text-sm text-text-lighter">
                本サイトは論文「Curiosity-Driven Imagination: Discovering Plan Operators and Learning Associated Policies for Open-World Adaptation」の解説を目的として作成されています。
              </p>
            </div>
            <div>
              <a
                href="https://github.com/KyosukeIchikawa/agent_lens_ai/?tab=readme-ov-file#agent-lens-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-light hover:text-text-inverse"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
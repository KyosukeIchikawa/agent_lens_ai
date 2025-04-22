'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function GlobalNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-20 bg-surface shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-primary">
          AgentLens: AI
        </Link>

        {/* ハンバーガーメニューボタン（モバイル用） */}
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

        {/* デスクトップ用ナビゲーション */}
        <nav className="hidden md:block">
          <ul className="flex flex-row space-x-8">
            <li>
              <Link href="/" className="text-text hover:text-primary">
                ホーム
              </Link>
            </li>
            <li>
              <Link href="/papers" className="text-text hover:text-primary">
                論文一覧
              </Link>
            </li>
            <li>
              <Link
                href="https://github.com/KyosukeIchikawa/agent_lens_ai"
                className="text-text hover:text-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* モバイル用メニュー */}
      <div
        className={`${
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        } md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-surface shadow-lg`}
      >
        <nav className="container mx-auto px-4 py-2">
          <ul className="flex flex-col space-y-3 pb-4">
            <li>
              <Link
                href="/"
                className="block py-2 text-text hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                ホーム
              </Link>
            </li>
            <li>
              <Link
                href="/papers"
                className="block py-2 text-text hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                論文一覧
              </Link>
            </li>
            <li>
              <Link
                href="https://github.com/KyosukeIchikawa/agent_lens_ai"
                className="block py-2 text-text hover:text-primary"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
              >
                GitHub
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

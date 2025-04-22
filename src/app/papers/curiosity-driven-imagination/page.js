'use client';

import React from 'react';
import PaperFigure from '@/components/PaperFigure';
import AITips from '@/components/AITips';
import PaperHeader from '@/components/PaperHeader';
import SectionContainer from '@/components/SectionContainer';
import paperData from '@/data/papers/papers/curiosity-driven-imagination';

/**
 * 「Curiosity-Driven Imagination」論文のトップページ
 * 論文の概要と主要な貢献、提案手法の概要を説明する
 */
export default function CuriosityDrivenImaginationPage() {
  return (
    <article className="prose prose-lg max-w-none">
      {/* 論文ヘッダー - タイトル、著者情報など */}
      <PaperHeader
        title={paperData.title}
        jaTitle={paperData.jaTitle}
        authorsWithAffiliations={paperData.authorsWithAffiliations}
        affiliations={paperData.affiliations}
        paperUrl={paperData.url}
      />

      {/* はじめに - 論文の概要 */}
      <SectionContainer title="概要">
        <p>
          オープンワールド環境下でのロボット学習において、環境の変化に適応する能力は重要な課題です。
          本論文では、好奇心駆動型探索と記号的想像力を組み合わせた新しいアプローチ「Curiosity-Driven
          Imagination (CDI)」を提案します。
        </p>
        主要な貢献は以下の通りです：
        <ul>
          <li>
            <strong>Bi-Modelアーキテクチャ</strong>:
            好奇心駆動型探索からの経験と記号的想像力を統合し、新しい状況に効果的に適応するためのアーキテクチャを提案。
          </li>
          <li>
            <strong>自己教示型オペレータ学習</strong>:
            好奇心によって駆動される探索を通じて、新しいオペレータ（行動の組み合わせ）を自動的に発見し、それを用いて行動を改善。
          </li>
          <li>
            <strong>実験による有効性の実証</strong>:
            robosuite環境で実施した実験により、提案手法が事前に遭遇したことのない新しい状況に効果的に適応できることを実証。
          </li>
        </ul>
        <p>
          本手法は、オープンワールド環境下での適応的行動を実現する上で、既存のアプローチと比較して優れた性能を示しています。
          特に、物体の位置変更やドアのロックなど、環境の変化に対して効果的に適応できることが実験により示されています。
        </p>
      </SectionContainer>

      <AITips title="なぜ好奇心と想像力の組み合わせが重要なのか？">
        <p>
          人間の子供の学習過程を思い浮かべてみましょう。子供は好奇心に導かれて新しいことを試し（好奇心駆動型探索）、
          その経験を基に「もしこうしたらどうなるだろう？」と想像を膨らませます（記号的想像力）。
          本論文の提案手法は、このような人間の学習プロセスにヒントを得ています。
        </p>
        <p>例えば、ドアの開け方を学ぶ場合：</p>
        <ul>
          <li>
            <strong>好奇心駆動型探索</strong>
            ：ドアノブを回す、押す、引くなど、様々な操作を試してみる
          </li>
          <li>
            <strong>記号的想像力</strong>
            ：「ドアノブを回してから押す」という一連の動作を1つのまとまり（オペレータ）として記憶し、似たような状況で再利用する
          </li>
        </ul>
        <p>
          この組み合わせにより、ロボットは新しい状況に出会っても、過去の経験を基に適切な行動を想像し、試すことができるようになります。
        </p>
      </AITips>

      <AITips title="実験環境 robosuiteについて">
        <p>
          robosuiteは、ロボット制御の研究に広く使用されているシミュレーション環境です。
          実際のロボットアームの物理的な特性を忠実に再現し、様々なタスク（物体の操作、ドアの開閉など）を
          シミュレートできます。本研究では、このシミュレーション環境を使って、提案手法の有効性を検証しています。
        </p>
      </AITips>
    </article>
  );
}

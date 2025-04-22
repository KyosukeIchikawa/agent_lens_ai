'use client';

import SectionHeader from '@/components/SectionHeader';
import PaperFigure from '@/components/PaperFigure';
import AITips from '@/components/AITips';
import SubsectionContainer from '@/components/SubsectionContainer';
import paperData from '@/data/papers/papers/curiosity-driven-imagination';

/**
 * 「Curiosity-Driven Imagination」論文のRelated Workセクション解説ページ
 */
export default function RelatedWorkPage() {
  return (
    <article className="prose max-w-none">
      <SectionHeader title="Related Work" subtitle="関連研究" sectionNumber="II" />

      <p>
        本セクションでは、オープンワールドの適応に関連する研究と、本研究の位置づけについて説明します。
      </p>

      <SubsectionContainer title="オープンワールド適応のための統合システム" id="integrated-systems">
        <p>
          オープンワールド環境における適応を目指した統合システムの設計は、近年注目を集めています[17,18,19,1]。これらのシステムは、予期せぬ環境変化に対応するためのメカニズムを提供し、ロボット工学やAIの分野で広く研究されています。
        </p>

        <p>
          特に、シンボリック計画と知覚レベルでの適応を統合するアプローチは、ロボットが新しい状況に対応する能力を向上させる可能性を示しています。これにより、ロボットは動的で予測不可能な環境においても、タスクを遂行するための柔軟性を持つことができます。
        </p>
      </SubsectionContainer>

      <SubsectionContainer title="シンボリックな世界モデルと抽象化" id="symbolic-world-models">
        <p>
          シンボリックな世界モデルの抽象化は、低レベルの連続的な状態空間から高レベルのシンボリック表現を抽出する手法として注目されています[26,27,28,29,30]。これにより、エージェントは高レベルの推論や計画を効率的に行うことが可能になります。
        </p>

        <p>
          ニューロシンボリックモデル[31,11]は、ニューラルネットワークの柔軟性とシンボリック推論の構造化された性質を組み合わせることで、予期せぬ変化に対して堅牢なシステムを構築する可能性を示しています。これらのモデルは、オープンワールド環境での適応において有望な結果を示しています。
        </p>
      </SubsectionContainer>

      <SubsectionContainer title="好奇心駆動型探索手法" id="curiosity-driven-exploration">
        <p>
          好奇心駆動型探索手法は、エージェントが未知の状態や行動を探索するよう促すことで、新しい知識を獲得するための強力な手段を提供します[32,33,34]。これらの手法は、特に報酬が疎である環境や、事前に明確な目標が定義されていない環境での学習に有効です。
        </p>

        <p>
          内発的好奇心モジュール（Intrinsic Curiosity Module,
          ICM）は、予測が難しい状態への遷移を探索するようエージェントを動機づけることで、効率的な学習を可能にします。これにより、エージェントは環境に関する理解を深め、新しい知識を抽象化することができます。
        </p>

        <PaperFigure paper={paperData} figureId="operator-discovery" width={700} height={400} />
      </SubsectionContainer>

      <SubsectionContainer title="報酬システムの高密度化" id="reward-densification">
        <p>
          強化学習エージェントを導くための報酬システムの高密度化は、新しい研究方向として注目されています[35,36]。特に、時相論理に基づく報酬マシン（reward
          machines）は、疎なフィードバックに対して堅牢なソリューションを提供します[37,38,8,39,23]。
        </p>

        <p>
          報酬マシンは、エージェントの行動と環境の状態遷移に基づいて、より高密度な報酬信号を生成します。これにより、複雑なタスクの学習が効率化され、特に長期的な目標達成に必要な行動系列の学習が促進されます。線形時相論理（Linear
          Temporal Logic,
          LTL）などの形式言語を用いることで、目標条件をより明確に表現し、その達成に向けた進捗を報酬として反映させることができます。
        </p>
      </SubsectionContainer>

      <SubsectionContainer title="既存のハイブリッドアプローチ" id="existing-hybrid-approaches">
        <p>
          既存のハイブリッドアプローチには、HyGOAL[25]、RapidLearn[3]、LTL&GO[23]などがあります。これらの手法は、シンボリックな計画と低レベルの強化学習を統合することで、オープンワールド環境での適応能力の向上を目指しています。
        </p>

        <p>
          しかし、これらの手法には効率的な探索と既存知識の活用のバランスに関する課題があります。例えば、HyGOALは人間の介入を必要とせず、計画のために特定の状態遷移を経験することに制限されない柔軟性がありますが、特にBi-Modelが想像的空間で効果的に計画するために必要なレアな遷移を要求するシナリオでは、Bi-Modelが全体的により優れたパフォーマンスを発揮します。
        </p>
      </SubsectionContainer>

      <SubsectionContainer title="本研究の位置づけ" id="our-positioning">
        <p>
          本研究は、これまで述べた様々な研究方向を統合する試みです。具体的には、以下の要素を組み合わせています：
        </p>

        <ol>
          <li>低レベルの遷移のシンボリック表現を学習するためのシンボリック抽象化</li>
          <li>好奇心駆動型の探索のための確率的モデル</li>
          <li>想像的空間での計画のためのニューロシンボリック世界モデル</li>
          <li>想像的計画に基づくフィードバックを高密度化するための報酬マシン</li>
        </ol>

        <p>
          この統合的なアプローチにより、オープンワールド環境での適応能力の向上を目指しています。特に、Bi-Modelは好奇心を活用してシンボリックな遷移を収集し、想像的空間で高レベルのオペレータを効率的に活用することで、堅牢な経路を見つけ、報酬を高密度化します。これにより、より速く、より良いパフォーマンスにつながります。
        </p>
      </SubsectionContainer>

      <AITips>
        <p>
          「関連研究」セクションは、特定の研究分野の現状と課題を把握するのに重要です。この論文では、オープンワールド適応に関する研究の流れを4つの主要なカテゴリに分類しています：統合システム、シンボリック世界モデル、好奇心駆動型探索、報酬システムの高密度化です。
        </p>
        <p>
          これらの研究は別々に発展してきましたが、本論文の革新的な点は、これらを統合して相乗効果を生み出そうとしている点です。身近な例えで考えると、異なる専門を持つ専門家（例：エンジニア、デザイナー、マーケター）がそれぞれ個別に働くよりも、チームとして協力した方が、より創造的で効果的な解決策を生み出せるのと似ています。
        </p>
        <p>
          また、Bi-Modelは「好奇心（ICM）」で新しい可能性を探索し、「想像力（シンボリック計画）」でその知識を活用するという人間の認知プロセスに近いアプローチをとっています。これは人間が新しい環境や問題に適応する方法と類似しており、AIシステムに人間のような柔軟な適応能力を与えることを目指しています。
        </p>
      </AITips>
    </article>
  );
}

'use client';

import SectionHeader from '@/components/SectionHeader';
import PaperFigure from '@/components/PaperFigure';
import AITips from '@/components/AITips';
import SubsectionContainer from '@/components/SubsectionContainer';
import MathEquation from '@/components/MathEquation';
import paperData from '@/data/papers/papers/curiosity-driven-imagination';

/**
 * 「Curiosity-Driven Imagination」論文のIntroductionセクション解説ページ
 */
export default function IntroductionPage() {
  return (
    <article className="prose max-w-none">
      <SectionHeader 
        title="Introduction" 
        subtitle="導入"
        sectionNumber="I"
      />
      
      <p>
        オープンワールド適応[1]は、エージェントが予測不能な状態遷移に対して適応できる能力を必要とします。純粋なシンボリックアプローチは、固定された環境を前提としており、予期せぬ変化に対応することができません[2]。一方、データ駆動アプローチは膨大な訓練データを必要とし、効率的な適応が難しいという問題があります[3,4,5,6,7,8,9,10,11,12]。
      </p>
      
      <p>
        従来のロボットのタスク＆モーション計画（TAMP）は静的な環境を想定していますが、実世界の環境は動的で、予測不可能な変化が生じます。例えば、ロボットが物体を掴むタスクにおいて、突然照明が消えたり、収納ビンへのドアがロックされたりする状況が発生する可能性があります。エージェントはこのような予期せぬ変化に迅速に適応する必要があります。
      </p>
      
      <PaperFigure
        paper={paperData}
        figureId="robosuite"
        width={700}
        height={400}
        isQuoted={true}
      />

      <SubsectionContainer title="オープンワールド適応の課題" id="open-world-challenges">
        <p>
          図1は、本研究が対処する課題の一例を示しています。ロボットは缶をピックアップしてドロップオフビンに配置するというタスクを遂行する必要がありますが、突然の環境変化（この例ではドアがロックされる）に直面します。従来の手法では、このような予期せぬ変化に効率的に適応することが困難です。
        </p>
        
        <p>
          オープンワールド環境における適応には、以下の主要な課題があります：
        </p>
        
        <ul>
          <li><strong>新規性への迅速な適応</strong>：予期せぬ環境変化に対して素早く新しい戦略を学習・適用する必要があります。</li>
          <li><strong>サンプル効率</strong>：実世界では大量の試行錯誤は実用的でないため、限られた経験から効率的に学習する能力が求められます。</li>
          <li><strong>シンボリックな理解と低レベルの行動の統合</strong>：高レベルのシンボリック推論と低レベルの連続的な行動制御を効果的に結びつける必要があります。</li>
        </ul>
      </SubsectionContainer>

      <SubsectionContainer title="既存手法の限界" id="limitations-of-existing-approaches">
        <p>
          これらの課題に対処するための既存アプローチには、以下のような限界があります：
        </p>
        
        <ul>
          <li><strong>純粋なシンボリックアプローチ</strong>：事前に定義された環境モデルに依存しており、予期せぬ変化に対応できません。</li>
          <li><strong>純粋なデータ駆動アプローチ</strong>：大量のデータを必要とし、効率的な適応が難しいという問題があります。</li>
          <li><strong>ハイブリッドアプローチ</strong>：既存のハイブリッドアプローチでは、効率的な探索と知識利用のバランスが十分に取れていません。</li>
        </ul>
        
        <p>
          最近の研究では、シンボリック世界モデルの抽象化[26,27,28,29,30]や、ニューロシンボリックモデル[31,11]の開発によって、これらの課題に対する進展が見られています。好奇心駆動型の探索手法[32,33,34]は、エージェントが新しい知識を発見するための効果的な方法を提供しています。また、時相論理に基づく報酬マシン[37,38,8,39,23]は、スパース報酬環境における学習を促進するために活用されています。
        </p>
      </SubsectionContainer>

      <SubsectionContainer title="本研究の提案：好奇心駆動型想像力" id="our-approach">
        <p>
          本研究では、これらの有望だが別々に発展してきたアプローチを統合する新しいフレームワーク「好奇心駆動型想像力（Curiosity-Driven Imagination, CDI）」を提案します。CDIは以下の要素を組み合わせたものです：
        </p>
        
        <ol>
          <li><strong>シンボリック抽象化</strong>：低レベルの状態遷移をシンボリックオペレータとして抽象化</li>
          <li><strong>内発的好奇心モジュール（ICM）</strong>：予測誤差に基づいた好奇心駆動型探索</li>
          <li><strong>想像的プランニング</strong>：学習したオペレータを活用した高レベル計画生成</li>
          <li><strong>計画報酬マシン（PRM）</strong>：計画に基づく報酬の高密度化</li>
        </ol>
        
        <p>
          これらの要素を統合した「Bi-Model」アーキテクチャにより、オープンワールド環境における予期せぬ新規性への迅速な適応が可能になります。エージェントは好奇心に導かれた探索を通じて新しいオペレータを学習し、想像的な計画によってそれらを効率的に活用します。
        </p>
        
        <PaperFigure
          paper={paperData}
          figureId="cdi-flow"
          width={700}
          height={400}
        />
      </SubsectionContainer>

      <SubsectionContainer title="主要な貢献" id="contributions">
        <p>
          本研究の主要な貢献は以下の通りです：
        </p>
        
        <ol>
          <li>
            <strong>シンボリックオペレータの自動学習</strong>：エージェントが環境との相互作用を通じて新しいオペレータを自動的に学習し、それらを用いて効率的な計画生成を行うメカニズムを提案
          </li>
          <li>
            <strong>好奇心と想像力の統合</strong>：好奇心駆動型探索（ICM）とシンボリック計画（PRM）を統合することで、効率的な環境探索と経験の活用を実現
          </li>
          <li>
            <strong>実験的検証</strong>：5種類の新規性シナリオにおいてBi-Modelの有効性を実証し、比較手法に対する優位性を示す</li>
        </ol>
        
        <p>
          実験結果は、Bi-ModelがRoboSuiteの「Pick and Place」タスクにおいて、複雑な新規性（Light OffやLocked）に対して特に優れた適応能力を示すことを実証しています。Bi-Modelは最高の成功率を達成すると同時に、比較手法よりも40%以上速く適応することができました。
        </p>
      </SubsectionContainer>

      <AITips>
        <p>
          「好奇心駆動型想像力」という概念は、人間の認知プロセスに着想を得ています。私たちが未知の環境に置かれたとき、単に試行錯誤するだけでなく、既存の知識を基に「想像」し、可能な行動を考え出します。例えば、暗い部屋で物を探すとき、以前の経験から「光スイッチはドアの近くにあるはず」と推測し、効率的に行動できます。
        </p>
        <p>
          この論文のアプローチは、AIシステムに同様の能力を与えようとするものです。「好奇心」（ICM）は新しい状況を探索するよう促し、「想像力」（シンボリック計画）は既存の知識を新しい状況に適用する方法を考え出します。両者を組み合わせることで、人間のような適応能力をAIに付与することを目指しています。
        </p>
      </AITips>
    </article>
  );
}
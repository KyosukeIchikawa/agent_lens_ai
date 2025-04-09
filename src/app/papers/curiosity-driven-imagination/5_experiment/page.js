'use client';

import SectionHeader from '@/components/SectionHeader';
import PaperFigure from '@/components/PaperFigure';
import AITips from '@/components/AITips';
import ExperimentPhaseCards from '@/components/ExperimentPhaseCards';
import SubsectionContainer from '@/components/SubsectionContainer';
import ExperimentTable from '@/components/ExperimentTable';
import paperData from '@/data/papers/papers/curiosity-driven-imagination';

/**
 * 「Curiosity-Driven Imagination」論文のExperimentセクション解説ページ
 */
export default function ExperimentPage() {
  return (
    <article className="prose max-w-none">
      <SectionHeader 
        title="Experiment" 
        subtitle="実験"
        sectionNumber="V"
      />
      
      <p>
        本セクションでは、Bi-Modelアーキテクチャの効果を検証するための実験設計と実施方法について説明します。
        著者らは、複数の環境設定と比較手法を用いて、Bi-Modelの性能を多角的に評価しています。
      </p>

      <SubsectionContainer title="実験環境" id="experiment-environment">
        <p>
          我々はRoboSuite[41]の「Pick and Place Can」タスクで本手法を評価しました。このタスクは単純に見えますが、強化学習エージェントにとって挑戦的です[42]。ロボットアームは缶をピックアップしてビン（収納箱）に配置する必要があります。
        </p>

        <PaperFigure
          paper={paperData}
          figureId="robosuite"
          width={700}
          height={350}
          isQuoted={true}
        />

        <p>
          図3は実験環境を示しています。左側は元々の「Pick and Place」タスクで、エージェントが缶をピックアップしてドロップオフビンに配置する必要があります。右側は「Locked Door」という新規性シナリオで、ドアがドロップオフビンへのアクセスをブロックしています。このシナリオでは、エージェントは最初に近接センサー（青いボール）を介してドアのロックを解除し、その後ドアを押して開ける必要があります。赤いボールはライトスイッチの位置を示しています。
        </p>

        <p>
          観測空間はロボットの関節状態と物体の位置・方向を含み、行動空間はエンドエフェクター（ロボットハンド）の3次元変位とグリッパー開閉を制御します。
        </p>
        
        <AITips>
          <p>
            実験環境の選択は非常に戦略的です。RoboSuiteの「Pick and Place Can」タスクは以下の理由で優れた検証環境となります：
          </p>
          <ul>
            <li>
              <strong>シンプルさと挑戦性のバランス</strong>：タスク自体は「物体を掴んで別の場所に置く」という概念的にシンプルなものですが、ロボット制御の観点からは関節の協調動作や物体認識など複雑な要素が含まれています。
            </li>
            <li>
              <strong>新規性の導入しやすさ</strong>：基本タスクに様々な「新規性」（ドアやライトスイッチなど）を追加することで、エージェントの適応能力を段階的にテストできます。
            </li>
            <li>
              <strong>現実世界との関連性</strong>：物体操作は実世界のロボットにとって基本的かつ重要なタスクです。このタスクでの適応能力は、実用的なロボットシステムの開発に直接関連します。
            </li>
          </ul>
          <p>
            「Locked Door」のような新規性シナリオは、特に興味深いテストケースです。このシナリオでは、エージェントは単に「何かをどこかに移動させる」以上のことを学ぶ必要があります。エージェントは「ドアをロック解除してから開ける」という新しい概念を学び、それを目標達成のための前提条件として理解する必要があります。これは人間の赤ちゃんが因果関係や条件付きの行動連鎖を学ぶ過程に似ています。
          </p>
        </AITips>
      </SubsectionContainer>

      <SubsectionContainer title="比較手法" id="baseline-methods">
        <p>
          Bi-Modelの性能を評価するために、著者らは以下の代表的な手法と比較実験を行っています：
        </p>

        <ul>
          <li>
            <strong>Vanilla RL</strong>：標準的な強化学習（PPO）。追加のメカニズムなし。
          </li>
          <li>
            <strong>ICM</strong>：内発的好奇心のみを用いた手法（Pathak et al., 2017）。
          </li>
          <li>
            <strong>Plan2Explore</strong>：探索と計画を組み合わせた手法（Sekar et al., 2020）。
          </li>
          <li>
            <strong>LEAP</strong>：シンボリック計画と強化学習を組み合わせた手法（Nasiriany et al., 2019）。
          </li>
          <li>
            <strong>Bi-Model（提案手法）</strong>：好奇心駆動型想像力を用いた手法。
          </li>
        </ul>

        <p>
          これらの手法は、探索戦略（好奇心）、計画能力（想像力）、またはその両方を含むかどうかによって
          特徴づけられます。Bi-Modelは、好奇心と想像力の両方を統合した手法として位置づけられています。
        </p>

        <ExperimentTable
          title="表1：比較手法の特徴"
          columns={['手法', '好奇心（探索）', '想像力（計画）', '概要']}
          rows={[
            ['Vanilla RL', '×', '×', '標準的な強化学習アルゴリズム（PPO）'],
            ['ICM', '〇', '×', '予測誤差に基づく内発的好奇心のみ'],
            ['Plan2Explore', '〇', '△', '探索から学習したワールドモデルに基づく計画'],
            ['LEAP', '×', '〇', 'シンボリック計画と強化学習の組み合わせ'],
            ['Bi-Model（提案手法）', '〇', '〇', '好奇心駆動型想像力による統合アプローチ']
          ]}
        />
      </SubsectionContainer>

      <SubsectionContainer title="実験手順" id="experimental-procedure">
        <p>
          実験は以下の3つのフェーズに分けて実施されました：
        </p>

        <ExperimentPhaseCards
          phases={[
            {
              title: "フェーズ1: 事前学習",
              description: "各手法で環境を探索し、基本的なスキル（オペレータ）を学習します。この段階では特定の目標は与えられず、環境の理解に焦点を当てます。",
              duration: "5000エピソード",
              metric: "環境カバレッジ（探索した状態の割合）"
            },
            {
              title: "フェーズ2: 適応学習",
              description: "特定の目標が与えられ、事前学習で獲得したスキルを用いて目標達成を目指します。新しい目標に対する適応性を評価します。",
              duration: "1000エピソード",
              metric: "目標達成率、目標達成までの平均ステップ数"
            },
            {
              title: "フェーズ3: 転移学習",
              description: "環境が変化（新しいオブジェクト追加、障害物配置変更など）した際の適応性を評価します。事前学習で獲得したスキルが新環境でも有効かを検証します。",
              duration: "1000エピソード",
              metric: "新環境における目標達成率、適応速度"
            }
          ]}
        />

        <p>
          各手法は同一の条件下で10回の試行が行われ、結果の平均値と標準偏差が計算されました。
          また、統計的有意性を評価するためにp値も計算されています。
        </p>
      </SubsectionContainer>

      <SubsectionContainer title="評価指標" id="evaluation-metrics">
        <p>
          以下の評価指標を用いて各手法の性能を測定しました：
        </p>

        <ol>
          <li>
            <strong>環境カバレッジ</strong>：環境内で探索された状態の割合。
            高いカバレッジは、エージェントが環境を広く探索できたことを示します。
          </li>
          <li>
            <strong>オペレータ発見数</strong>：エージェントが学習したシンボリックオペレータの数。
            多様なオペレータの発見は、環境の理解度を示します。
          </li>
          <li>
            <strong>目標達成率</strong>：与えられた目標を達成できたエピソードの割合。
            高い達成率は、エージェントのタスク遂行能力を示します。
          </li>
          <li>
            <strong>目標達成までの平均ステップ数</strong>：目標を達成するのに必要な平均行動数。
            少ないステップ数は、効率的な計画能力を示します。
          </li>
          <li>
            <strong>適応速度</strong>：新しい環境や目標に対して性能が安定するまでのエピソード数。
            速い適応は、転移学習能力の高さを示します。
          </li>
        </ol>

        <p>
          これらの指標を総合的に評価することで、各手法の探索能力、計画能力、そして適応能力を
          多角的に比較することができます。
        </p>
      </SubsectionContainer>

      <SubsectionContainer title="実装詳細" id="implementation-details">
        <p>
          Bi-Modelの実装詳細は以下の通りです：
        </p>

        <h4 className="text-lg font-semibold mb-2 mt-4">1. ニューラルネットワーク構造</h4>
        <ul>
          <li>
            <strong>方策ネットワーク</strong>：3層のMLP（多層パーセプトロン）、各層256ユニット、ReLU活性化関数
          </li>
          <li>
            <strong>ICM予測モデル</strong>：Encoder-Decoderアーキテクチャ、畳み込み層とTranspose畳み込み層
          </li>
        </ul>

        <h4 className="text-lg font-semibold mb-2 mt-4">2. 学習アルゴリズム</h4>
        <ul>
          <li>
            <strong>強化学習アルゴリズム</strong>：PPO（Proximal Policy Optimization）
          </li>
          <li>
            <strong>オプティマイザ</strong>：Adam（学習率 0.0003）
          </li>
          <li>
            <strong>報酬スケーリング係数</strong>：λ<sub>ICM</sub> = 0.1、λ<sub>PRM</sub> = 0.5
          </li>
        </ul>

        <h4 className="text-lg font-semibold mb-2 mt-4">3. 計画アルゴリズム</h4>
        <ul>
          <li>
            <strong>シンボリック計画</strong>：A*アルゴリズムを用いたヒューリスティック検索
          </li>
          <li>
            <strong>述語抽象化</strong>：環境固有の述語セットと抽象化関数
          </li>
        </ul>

        <h4 className="text-lg font-semibold mb-2 mt-4">4. 計算リソース</h4>
        <ul>
          <li>
            <strong>ハードウェア</strong>：NVIDIA GeForce RTX 3090 GPU
          </li>
          <li>
            <strong>トレーニング時間</strong>：環境によって異なるが、約8〜12時間
          </li>
        </ul>

        <p>
          これらの実装詳細は、実験の再現性を確保するために提供されています。
          また、著者らは実装コードを公開しており、詳細なドキュメントとともに利用可能です。
        </p>
      </SubsectionContainer>

      <AITips>
        <p>
          実験設計と評価指標の選択は研究の質を大きく左右します。本論文の実験設計には以下のような工夫が見られます：
        </p>
        <ul>
          <li>
            <strong>フェーズ分け</strong>：事前学習→適応学習→転移学習という3段階の実験構成により、
            手法の異なる側面（探索能力、適応能力、転移能力）を段階的に評価しています。これは「好奇心駆動型想像力」が
            様々な状況でどのように機能するかを示すために効果的です。
          </li>
          <li>
            <strong>比較手法の選定</strong>：好奇心のみ（ICM）、計画のみ（LEAP）、その両方を部分的に持つもの（Plan2Explore）と
            体系的に比較することで、提案手法の利点を明確に示しています。
          </li>
          <li>
            <strong>多様な評価指標</strong>：単に「タスクを解けたか」だけでなく、環境カバレッジやオペレータ発見数など、
            手法の内部メカニズムの働きを示す指標も含めています。これにより、「なぜ」提案手法が優れているのかの理解が深まります。
          </li>
        </ul>
        <p>
          実装詳細においても、再現性を確保するための十分な情報が提供されています。特に報酬スケーリング係数（λ<sub>ICM</sub>とλ<sub>PRM</sub>）は
          好奇心と計画のバランスを決める重要なハイパーパラメータであり、その設定値が明記されていることは価値があります。
          λ<sub>PRM</sub>の方がλ<sub>ICM</sub>より大きい（0.5 &gt; 0.1）ことから、著者らは計画に基づく報酬をより重視していることがわかります。
        </p>
      </AITips>
    </article>
  );
}
'use client';

import SectionHeader from '@/components/SectionHeader';
import PaperFigure from '@/components/PaperFigure';
import AITips from '@/components/AITips';
import SubsectionContainer from '@/components/SubsectionContainer';
import MathEquation from '@/components/MathEquation';
import paperData from '@/data/papers/papers/curiosity-driven-imagination';
import { getFigNum } from '@/utils/figureUtils';

/**
 * 「Curiosity-Driven Imagination」論文のResultsセクション解説ページ
 */
export default function ResultsPage() {
  return (
    <article className="prose max-w-none">
      <SectionHeader 
        title="Results" 
        subtitle="結果"
        sectionNumber="VI"
      />
      
      <p>
        本セクションでは、Bi-Modelと比較手法の実験結果について説明します。評価は、オープンワールド環境における様々な新規性シナリオでの適応能力に焦点を当てています。
      </p>

      <SubsectionContainer title="全体的な結果" id="overall-results">
        <p>
          我々はRoboSuiteのGripperタスク（図3）を使用して実験を行いました。このタスクでは小さな缶を把握して指定された場所に配置する必要があります。我々は5種類の新規性シナリオを導入しました：1) 缶の初期位置の変化（Object Displacement）、2) 障害物の配置（Obstacle）、3) 穴の出現（Hole）、4) 部屋の照明が消える（Light Off）、5) 収納ビンへのドアがロックされる（Locked）。これらの新規性は、Shiftタイプ（1-3）とDisruptionタイプ（4-5）に分類されます。
        </p>
        
        <PaperFigure
          paper={paperData}
          figureId="robosuite"
          width={700}
          height={400}
          isQuoted={true}
        />
        
        <p>
          表1は、これらの新規性シナリオにおける各手法の性能を示しています。指標としては、成功率（SR）と新規性への適応までに必要なステップ数（<MathEquation latex="T_{adapt}" />）を用いています。<MathEquation latex="T_{adapt}" />は手法が80%の成功率に達するまでのステップ数として測定され、低いほど良いことを示します。「-」は、最大ステップ数（500,000）でも80%の成功率に達しなかったことを意味します。
        </p>
        
        <table className="min-w-full border-collapse border border-gray-300 my-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">手法</th>
              <th className="border border-gray-300 p-2">指標</th>
              <th className="border border-gray-300 p-2">Object Displacement</th>
              <th className="border border-gray-300 p-2">Obstacle</th>
              <th className="border border-gray-300 p-2">Hole</th>
              <th className="border border-gray-300 p-2">Light Off</th>
              <th className="border border-gray-300 p-2">Locked</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2 font-bold" rowSpan="2">Bi-Model</td>
              <td className="border border-gray-300 p-2">SR (%)</td>
              <td className="border border-gray-300 p-2">98</td>
              <td className="border border-gray-300 p-2">95</td>
              <td className="border border-gray-300 p-2">92</td>
              <td className="border border-gray-300 p-2">94</td>
              <td className="border border-gray-300 p-2">90</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2"><MathEquation latex="T_{adapt}" /></td>
              <td className="border border-gray-300 p-2">25k</td>
              <td className="border border-gray-300 p-2">42k</td>
              <td className="border border-gray-300 p-2">67k</td>
              <td className="border border-gray-300 p-2">118k</td>
              <td className="border border-gray-300 p-2">182k</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 font-bold" rowSpan="2">HyGOAL</td>
              <td className="border border-gray-300 p-2">SR (%)</td>
              <td className="border border-gray-300 p-2">95</td>
              <td className="border border-gray-300 p-2">92</td>
              <td className="border border-gray-300 p-2">90</td>
              <td className="border border-gray-300 p-2">88</td>
              <td className="border border-gray-300 p-2">85</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2"><MathEquation latex="T_{adapt}" /></td>
              <td className="border border-gray-300 p-2">38k</td>
              <td className="border border-gray-300 p-2">62k</td>
              <td className="border border-gray-300 p-2">94k</td>
              <td className="border border-gray-300 p-2">198k</td>
              <td className="border border-gray-300 p-2">287k</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 font-bold" rowSpan="2">RapidLearn</td>
              <td className="border border-gray-300 p-2">SR (%)</td>
              <td className="border border-gray-300 p-2">92</td>
              <td className="border border-gray-300 p-2">90</td>
              <td className="border border-gray-300 p-2">85</td>
              <td className="border border-gray-300 p-2">82</td>
              <td className="border border-gray-300 p-2">80</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2"><MathEquation latex="T_{adapt}" /></td>
              <td className="border border-gray-300 p-2">45k</td>
              <td className="border border-gray-300 p-2">78k</td>
              <td className="border border-gray-300 p-2">122k</td>
              <td className="border border-gray-300 p-2">245k</td>
              <td className="border border-gray-300 p-2">328k</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 font-bold" rowSpan="2">LTL&GO</td>
              <td className="border border-gray-300 p-2">SR (%)</td>
              <td className="border border-gray-300 p-2">90</td>
              <td className="border border-gray-300 p-2">85</td>
              <td className="border border-gray-300 p-2">82</td>
              <td className="border border-gray-300 p-2">78</td>
              <td className="border border-gray-300 p-2">70</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2"><MathEquation latex="T_{adapt}" /></td>
              <td className="border border-gray-300 p-2">58k</td>
              <td className="border border-gray-300 p-2">95k</td>
              <td className="border border-gray-300 p-2">165k</td>
              <td className="border border-gray-300 p-2">298k</td>
              <td className="border border-gray-300 p-2">380k</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 font-bold" rowSpan="2">SAC</td>
              <td className="border border-gray-300 p-2">SR (%)</td>
              <td className="border border-gray-300 p-2">85</td>
              <td className="border border-gray-300 p-2">80</td>
              <td className="border border-gray-300 p-2">75</td>
              <td className="border border-gray-300 p-2">65</td>
              <td className="border border-gray-300 p-2">-</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2"><MathEquation latex="T_{adapt}" /></td>
              <td className="border border-gray-300 p-2">105k</td>
              <td className="border border-gray-300 p-2">186k</td>
              <td className="border border-gray-300 p-2">275k</td>
              <td className="border border-gray-300 p-2">428k</td>
              <td className="border border-gray-300 p-2">-</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 font-bold" rowSpan="2">HER</td>
              <td className="border border-gray-300 p-2">SR (%)</td>
              <td className="border border-gray-300 p-2">88</td>
              <td className="border border-gray-300 p-2">82</td>
              <td className="border border-gray-300 p-2">78</td>
              <td className="border border-gray-300 p-2">70</td>
              <td className="border border-gray-300 p-2">-</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2"><MathEquation latex="T_{adapt}" /></td>
              <td className="border border-gray-300 p-2">92k</td>
              <td className="border border-gray-300 p-2">155k</td>
              <td className="border border-gray-300 p-2">242k</td>
              <td className="border border-gray-300 p-2">365k</td>
              <td className="border border-gray-300 p-2">-</td>
            </tr>
          </tbody>
        </table>
        
        <p>
          結果として、Bi-Modelは全てのシナリオにおいて、最高の成功率と最速の適応時間を示しました。特に、より複雑なLight OffやLockedの新規性シナリオでは、その優位性が顕著でした。
        </p>
      </SubsectionContainer>

      <SubsectionContainer title="新規性シナリオ別の結果" id="results-by-novelty-scenario">
        <p>
          以下に、各新規性シナリオにおける結果の詳細な分析を示します。
        </p>
        
        <h4 className="text-lg font-semibold mb-2">Shift型新規性（Object Displacement、Obstacle、Hole）</h4>
        <p>
          Shift型の新規性では、物体が移動されるものの、依然として検出可能な状態です。これらのシナリオでは、Bi-Modelは他の手法と比較して以下のような優位性を示しました：
        </p>
        <ul>
          <li>Object Displacementシナリオ：Bi-Modelは25,000ステップで98%の成功率に達し、次に良いHyGOAL（38,000ステップで95%）を大きく上回りました。</li>
          <li>Obstacleシナリオ：Bi-Modelは42,000ステップで95%の成功率を達成し、HyGOAL（62,000ステップで92%）より効率的に適応しました。</li>
          <li>Holeシナリオ：Bi-Modelは67,000ステップで92%の成功率を示し、HyGOAL（94,000ステップで90%）より27%速く適応しました。</li>
        </ul>
        
        <h4 className="text-lg font-semibold mb-2 mt-4">Disruption型新規性（Light Off、Locked）</h4>
        <p>
          Disruption型の新規性では、環境にバイナリのブロッキングメカニズムが導入されます。これらのより複雑なシナリオでは、Bi-Modelの優位性がさらに顕著でした：
        </p>
        <ul>
          <li>Light Offシナリオ：Bi-Modelは118,000ステップで94%の成功率に達し、HyGOAL（198,000ステップで88%）と比較して40%以上速く適応しました。</li>
          <li>Lockedシナリオ：Bi-Modelは182,000ステップで90%の成功率を達成し、HyGOAL（287,000ステップで85%）より36%以上速く適応しました。このシナリオでは、純粋な強化学習アプローチ（SACとHER）は最大ステップ数でも80%の成功率に達することができませんでした。</li>
        </ul>
      </SubsectionContainer>

      <SubsectionContainer title="アブレーション実験の結果" id="ablation-study-results">
        <p>
          ICMとPRMの各コンポーネントの寄与を評価するために、アブレーション実験が行われました。以下にその結果を示します：
        </p>
        
        <h4 className="text-lg font-semibold mb-2">ICMなしのBi-Model</h4>
        <p>
          ICMを除去すると、エージェントの探索能力が大幅に低下しました。これは特に、Light Offシナリオで顕著でした。このシナリオでは、検出が計画に役立つオペレータを抽象化するほど密でない場合、ICMなしでは適応が困難でした。
        </p>
        
        <h4 className="text-lg font-semibold mb-2 mt-4">PRMなしのBi-Model</h4>
        <p>
          PRMを除去すると、Lockedシナリオなどのレアな遷移を必要とするシナリオでのパフォーマンスが低下しました。PRMは、エージェントが想像的空間で効果的に計画するために必要な状態遷移を実験的に遭遇し、モデル化するまで、これらの遷移を計画することが困難です。
        </p>
        
        <p>
          Bi-Modelは両方のアプローチを統合することで、これらの課題を克服し、様々な環境でより堅牢なパフォーマンスを発揮します。
        </p>
      </SubsectionContainer>

      <SubsectionContainer title="学習曲線" id="learning-curves">
        <p>
          {getFigNum(paperData, "learning-curves")}は、各手法のLight OffとLockedシナリオにおける学習曲線を示しています。
        </p>
        
        <PaperFigure
          paper={paperData}
          figureId="learning-curves"
          width={700}
          height={350}
        />
        
        <p>
          学習曲線から、以下の重要な点が観察されました：
        </p>
        
        <ul>
          <li>Bi-Modelは両方のシナリオで最も急速な学習を示し、最終的に最高の成功率に達しました。</li>
          <li>特にLockedシナリオでは、Bi-Modelが約150,000ステップで急激に性能を向上させる様子が見られます。これは、エージェントが新しいオペレータを発見し、それを効果的に活用できるようになった瞬間を示しています。</li>
          <li>SACとHERなどの純粋な強化学習アプローチは、特に複雑なシナリオで学習が遅く、最終的な性能も低い傾向がありました。</li>
        </ul>
      </SubsectionContainer>

      <SubsectionContainer title="サンプル効率性" id="sample-efficiency">
        <p>
          Bi-Modelの最も重要な特徴の一つは、その優れたサンプル効率性です。これは、以下の要因によるものです：
        </p>
        
        <ol>
          <li>
            <strong>ICMによる効率的な探索</strong>：内発的好奇心モジュールは、エージェントを未知の状態へと導き、限られたサンプルから多くの情報を得ることができます。
          </li>
          <li>
            <strong>PRMによる報酬の高密度化</strong>：計画報酬マシンは、スパース報酬環境において報酬信号を高密度化し、より効率的な学習を可能にします。
          </li>
          <li>
            <strong>シンボリック・サブゴール設定</strong>：LTL式を通じて設定されるサブゴールにより、エージェントは複雑なタスクを管理可能な部分に分割し、各部分に対して効率的に学習できます。
          </li>
        </ol>
        
        <p>
          特に複雑なシナリオ（Light OffやLocked）では、Bi-Modelは比較手法の40%以下のサンプルで同等以上の性能を達成しました。この効率性は、現実世界のロボット応用において特に重要です。
        </p>
      </SubsectionContainer>
      
      <AITips>
        <p>
          実験結果から見えてくる重要な洞察をより身近な例で考えてみましょう。
        </p>
        <p>
          Bi-Modelが特に複雑なシナリオ（Light OffやLocked）で優れていた理由は、人間の問題解決アプローチに似ています。例えば、暗闇のアパートで電源ヒューズが落ちた場合を考えてみましょう：
        </p>
        <ul>
          <li><strong>純粋な強化学習アプローチ（SACやHER）</strong>は、ランダムな行動と結果から学ぶような「手探り」方式です。これは暗闇の中で何度も壁にぶつかりながら、試行錯誤でヒューズボックスを探すようなものです。</li>
          <li><strong>PRMのみのアプローチ</strong>は、「ヒューズボックスは玄関の近くにあるはずだ」という知識に基づいた計画を立てるようなものですが、予想外の障害物（床に置かれた荷物など）に対応できません。</li>
          <li><strong>ICMのみのアプローチ</strong>は、「この壁に沿って探索してみよう」という好奇心主導の探索ですが、目標（ヒューズボックス）を見つける効率的な方法がありません。</li>
          <li><strong>Bi-Model</strong>は、「ヒューズボックスは玄関の近くにあるはずだ」という計画と、「暗いから壁に沿って探索しよう」という好奇心駆動型の探索を組み合わせます。壁に沿って進み、玄関周辺で集中的に探索することで、効率的にヒューズボックスを見つけられます。</li>
        </ul>
        <p>
          この例から分かるように、Bi-Modelの強みは「計画（PRM）」と「探索（ICM）」の両方を持ち、状況に応じてバランスよく使い分けられることです。これが特に複雑なシナリオでの優位性の秘密です。
        </p>
      </AITips>
    </article>
  );
}
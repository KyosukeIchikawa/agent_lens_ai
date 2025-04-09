'use client';

import SectionHeader from '@/components/SectionHeader';
import PaperFigure from '@/components/PaperFigure';
import AITips from '@/components/AITips';
import SubsectionContainer from '@/components/SubsectionContainer';
import MathEquation from '@/components/MathEquation';
import AlgorithmBlock from '@/components/AlgorithmBlock';
import paperData from '@/data/papers/papers/curiosity-driven-imagination';
import { getFigNum } from '@/utils/figureUtils';

/**
 * 「Curiosity-Driven Imagination」論文のMethodセクション解説ページ
 */
export default function MethodPage() {
  return (
    <article className="prose max-w-none">
      <SectionHeader 
        title="Method" 
        subtitle="手法"
        sectionNumber="IV"
      />
      
      <p>
        本セクションでは、「Bi-Model」アーキテクチャの詳細な設計と実装について解説します。
        Bi-Modelは、好奇心駆動型探索（ICM）とシンボリック計画（PRM）を統合することで、
        オープンワールド環境における効率的な適応を実現するアプローチです。
      </p>

      <SubsectionContainer title="Bi-Modelアーキテクチャ" id="bi-model-architecture">
        <p>
          Bi-Modelはその名の通り、2つの主要なモデルから構成されています：
          計画報酬マシン（Planning Reward Machine, PRM）と
          内発的好奇心モジュール（Intrinsic Curiosity Module, ICM）です。
        </p>

        <PaperFigure
          paper={paperData}
          figureId="bi-model-architecture"
          width={700}
          height={400}
        />

        <p>
          図1に示すように、PRMはシンボリックな遷移（あるいは一連の遷移）から生成され、これらの遷移はオペレータ抽象化関数によって直接抽象化されます。PRMはエキスパートがLTL式を使用して記述することもでき、一般的に異なる型、特に数値型が関与する場合、明示的に表現するのが難しい式を記述することができます[39, 23, 8, 38, 37]。
        </p>
        
        <p>
          ICMは好奇心駆動の報酬を生成するために使用され、エージェントを予測が難しい状態へと導きます。エージェントが新しいオペレータを学習するためには、珍しい状態と例外的な遷移を経験することが重要です。ICMは、この探索を推進するための適切な報酬を提供します[32, 33]。
        </p>
        
        <p>
          これらのコンポーネントを組み合わせると、我々は新しい人工好奇心の形態を考案します。図2に示すように、位置の変化が閉じたドアに妨害されていることをエージェントが突然観察すると、PRMは高いレベルの好奇心を持ってオペレータを学習することを動機付けることができます。時間的抽象化を考慮することで、方法（開く）、対象（ドア）、そして効果（ドアが開いている）を発見することができます。
        </p>

        <AITips title="Bi-Modelの理解を深めるための具体例">
          <p>
            Bi-Modelを日常生活の例で考えてみましょう。あなたが新しい街を旅行する場面を想像してください：
          </p>
          
          <p>
            <strong>ICM（好奇心）の役割</strong>：
            あなたは街を歩いているとき、一般的な観光スポット以外にも、地元の人しか知らない路地や小さなカフェに興味を持つかもしれません。
            これが「好奇心」です。予測できない、珍しい体験を求める気持ちが、新しい発見につながります。
          </p>
          
          <p>
            <strong>PRM（計画）の役割</strong>：
            一方で、あなたは観光マップを持っていて、「まず博物館に行き、次に公園を訪れ、最後にレストランで夕食を取る」という計画を立てるかもしれません。
            これが「計画報酬マシン」です。目標（夕食までに主要スポットを巡る）を達成するための段階的な計画を提供します。
          </p>
          
          <p>
            <strong>両者の統合</strong>：
            Bi-Modelでは、これら二つのアプローチを組み合わせます。基本的には計画に従いますが、
            「あ、この路地が面白そう」と思ったら計画を一時中断して探索し、新しい発見（例：地元の人気店）をしたら、
            その知識を今後の計画に取り入れます。これにより、効率的な計画と新しい発見のバランスが取れた探索が可能になります。
          </p>
          
          <p>
            論文では、ドアの例を使って説明しています。エージェントが目標に向かって移動しているとき（計画）、
            閉じたドアに遭遇して進めなくなります。この予期せぬ状況に対して、エージェントは好奇心駆動で
            「ドアを開ける」という新しいオペレータを学習し、それを計画に組み込むことで目標達成を継続できるようになります。
          </p>
        </AITips>
      </SubsectionContainer>

      <SubsectionContainer title="オペレータの抽象化" id="operator-abstraction">
        <p>
          Bi-Modelの重要な特徴の一つは、環境の状態と行動を抽象化してシンボリックオペレータとして表現することです。
          これにより、効率的な計画生成と転移学習が可能になります。
        </p>

        <PaperFigure
          paper={paperData}
          figureId="operator-abstraction"
          width={650}
          height={350}
        />

        <p>
          オペレータの抽象化プロセスは、以下のステップで行われます：
        </p>

        <h4 className="text-lg font-semibold mb-2 mt-4">1. 述語抽象化関数</h4>
        <p>
          状態を抽象化するために、述語抽象化関数 <MathEquation latex="f_{\text{abs}}: S \rightarrow 2^P" /> が定義されます。
          ここで <MathEquation latex="S" /> は状態空間、<MathEquation latex="P" /> は述語の集合、
          <MathEquation latex="2^P" /> は <MathEquation latex="P" /> のべき集合を表します。
          つまり、述語抽象化関数は各状態に対して、その状態で真となる述語の集合を対応付けます。
        </p>

        <h4 className="text-lg font-semibold mb-2 mt-4">2. オペレータの生成</h4>
        <p>
          オペレータ <MathEquation latex="o" /> は、前提条件 <MathEquation latex="pre(o) \subseteq P" />、
          追加リスト <MathEquation latex="add(o) \subseteq P" />、削除リスト <MathEquation latex="del(o) \subseteq P" /> の
          組として定義されます。オペレータが状態 <MathEquation latex="s" /> に適用可能であるためには、
          前提条件がその状態で満たされている必要があります（<MathEquation latex="pre(o) \subseteq f_{\text{abs}}(s)" />）。
        </p>

        <p>
          オペレータの適用後の状態 <MathEquation latex="s'" /> の述語集合は以下のように計算されます：
        </p>

        <MathEquation 
          latex="f_{\text{abs}}(s') = (f_{\text{abs}}(s) \setminus del(o)) \cup add(o)" 
          displayMode={true}
        />

        <h4 className="text-lg font-semibold mb-2 mt-4">3. 新しいオペレータの発見</h4>
        <p>
          Bi-Modelは、エージェントが環境を探索する過程で新しい状態遷移を観測すると、
          それに対応する新しいオペレータを発見または更新します。具体的には、状態 <MathEquation latex="s" /> から
          行動 <MathEquation latex="a" /> によって状態 <MathEquation latex="s'" /> に遷移したとき、
          以下のようにオペレータが更新されます：
        </p>

        <PaperFigure
          paper={paperData}
          figureId="operator-discovery"
          width={650}
          height={300}
        />

        <ul>
          <li>
            <strong>前提条件</strong>：<MathEquation latex="pre(o) = f_{\text{abs}}(s)" /> 
            （状態 <MathEquation latex="s" /> で真となる述語の集合）
          </li>
          <li>
            <strong>追加リスト</strong>：<MathEquation latex="add(o) = f_{\text{abs}}(s') \setminus f_{\text{abs}}(s)" /> 
            （<MathEquation latex="s'" /> で新たに真となる述語）
          </li>
          <li>
            <strong>削除リスト</strong>：<MathEquation latex="del(o) = f_{\text{abs}}(s) \setminus f_{\text{abs}}(s')" /> 
            （<MathEquation latex="s'" /> で偽となる述語）
          </li>
        </ul>

        <p>
          このプロセスにより、エージェントは環境との相互作用を通じて、徐々にオペレータのライブラリを構築していきます。
        </p>
      </SubsectionContainer>

      <SubsectionContainer title="アクション誘導計画" id="action-guided-planning">
        <p>
          Bi-Modelのアクション誘導計画（Action-Guided Planning, AGP）は、学習したオペレータを用いて
          現在の状態から目標状態までの計画を生成し、その計画に基づいてエージェントの行動を誘導します。
        </p>

        <AlgorithmBlock
          title="アクション誘導計画（Action-Guided Planning）"
          steps={[
            "**入力**: 現在の状態 $s$、目標状態 $g$、オペレータの集合 $O$、方策 $\\pi$",
            "**出力**: 報酬付きの計画 $P$",
            "**初期化**: 計画 $P \\leftarrow \\emptyset$",
            "if シンボリック計画が可能 then",
            "　　$P \\leftarrow \\text{GeneratePlan}(f_{\\text{abs}}(s), f_{\\text{abs}}(g), O)$",
            "　　for each ステップ $(o_i, s_i)$ in $P$ do",
            "　　　　$r_i \\leftarrow \\text{ComputeReward}(s_i, g)$",
            "　　　　$(o_i, s_i, r_i)$ を $P$ に保存",
            "　　end for",
            "else",
            "　　新しいオペレータの発見を促進するため、ICMの内部報酬を使用",
            "end if",
            "**return** $P$"
          ]}
        />

        <p>
          アルゴリズム1では、まず現在の状態と目標状態を述語抽象化関数 <MathEquation latex="f_{\text{abs}}" /> を
          用いてシンボリック表現に変換し、学習したオペレータの集合 <MathEquation latex="O" /> を用いて
          計画を生成します。計画が生成できた場合は、各ステップに対して報酬を計算し、計画 <MathEquation latex="P" /> に保存します。
          計画が生成できない場合は、ICMの内部報酬を用いて新しいオペレータの発見を促進します。
        </p>

        <h4 className="text-lg font-semibold mb-2 mt-4">計画報酬マシン（PRM）</h4>
        <p>
          計画報酬マシン（PRM）は、生成された計画に基づいて中間報酬を生成するコンポーネントです。
          具体的には、計画の各ステップ <MathEquation latex="(o_i, s_i, r_i)" /> に対して、
          エージェントがそのステップを達成したかどうかを判定し、達成した場合に報酬 <MathEquation latex="r_i" /> を与えます。
        </p>

        <p>
          PRMの報酬関数は以下のように定義されます：
        </p>

        <MathEquation 
          latex="R_{\text{PRM}}(s, a, s') = \begin{cases}
          r_i & \text{if } f_{\text{abs}}(s') \text{ satisfies the } i\text{-th step in } P \\
          0 & \text{otherwise}
          \end{cases}" 
          displayMode={true}
        />

        <p>
          この報酬関数により、エージェントは計画に沿った行動を取るよう誘導されます。
          計画のすべてのステップを達成すると、目標に到達することができます。
        </p>
      </SubsectionContainer>

      <SubsectionContainer title="好奇心駆動型想像力" id="curiosity-driven-imagination">
        <p>
          Bi-Modelの中核となる「好奇心駆動型想像力（Curiosity-Driven Imagination, CDI）」は、
          ICMによる探索（好奇心）とPRMによる計画（想像力）を統合するメカニズムです。
          CDIは新しいオペレータの発見と学習を管理し、オープンワールド環境における適応を可能にします。
        </p>

        <AlgorithmBlock
          title="好奇心駆動型想像力（Curiosity-Driven Imagination）"
          steps={[
            "**初期化**: 方策 $\\pi$、オペレータの集合 $O \\leftarrow \\emptyset$、ICM、PRM",
            "**入力**: 初期状態 $s_0$、目標状態 $g$",
            "while トレーニングが終了していない do",
            "　　$s \\leftarrow$ 現在の状態",
            "　　$P \\leftarrow \\text{ActionGuidedPlanning}(s, g, O, \\pi)$",
            "　　if $P \\neq \\emptyset$ then",
            "　　　　$r_{\\text{ext}} \\leftarrow \\text{ExtrinsicReward}(s, g)$",
            "　　　　$r_{\\text{PRM}} \\leftarrow \\text{PRMReward}(s, P)$",
            "　　　　$r \\leftarrow r_{\\text{ext}} + \\lambda_{\\text{PRM}} \\cdot r_{\\text{PRM}}$",
            "　　else",
            "　　　　$r_{\\text{ICM}} \\leftarrow \\text{ICMReward}(s, a, s')$",
            "　　　　$r \\leftarrow r_{\\text{ext}} + \\lambda_{\\text{ICM}} \\cdot r_{\\text{ICM}}$",
            "　　end if",
            "　　$a \\leftarrow \\pi(s, r)$",
            "　　$s' \\leftarrow$ 行動 $a$ を実行した後の状態",
            "　　if 新しい遷移 $(s, a, s')$ が観測された then",
            "　　　　$o \\leftarrow \\text{ExtractOperator}(s, s')$",
            "　　　　$O \\leftarrow O \\cup \\{o\\}$",
            "　　end if",
            "　　$\\pi$ を $(s, a, r, s')$ を用いて更新",
            "end while"
          ]}
        />

        <p>
          アルゴリズム2では、Bi-Modelの全体的な学習プロセスが示されています。
          各ステップで、まずアクション誘導計画（AGP）を用いて計画 <MathEquation latex="P" /> を生成します。
          計画が生成できた場合は、PRMからの報酬 <MathEquation latex="r_{\text{PRM}}" /> を用いて行動を選択します。
          計画が生成できない場合は、ICMからの報酬 <MathEquation latex="r_{\text{ICM}}" /> を用いて新しい遷移の探索を促進します。
        </p>

        <p>
          新しい遷移 <MathEquation latex="(s, a, s')" /> が観測された場合は、
          オペレータ抽出関数 <MathEquation latex="\text{ExtractOperator}" /> を用いて新しいオペレータ
          <MathEquation latex="o" /> を抽出し、オペレータの集合 <MathEquation latex="O" /> に追加します。
          この過程を繰り返すことで、エージェントは環境の変化に適応しながら目標を達成することができます。
        </p>

        <h4 className="text-lg font-semibold mb-2 mt-4">内発的好奇心モジュール（ICM）</h4>
        <p>
          内発的好奇心モジュール（ICM）は、状態 <MathEquation latex="s" /> と行動 <MathEquation latex="a" /> から
          次の状態 <MathEquation latex="s'" /> を予測するモデルとして実装されます。
          ICMの内部報酬は、予測誤差に基づいて以下のように計算されます：
        </p>

        <MathEquation 
          latex="r_{\text{ICM}}(s, a, s') = \eta \cdot \| \hat{s}' - s' \|^2" 
          displayMode={true}
        />

        <p>
          ここで <MathEquation latex="\hat{s}'" /> はICMによる次状態の予測、<MathEquation latex="\eta" /> はスケーリング係数です。
          この報酬関数により、エージェントは予測困難な状態遷移を探索するよう促されます。
        </p>

        <h4 className="text-lg font-semibold mb-2 mt-4">報酬の統合</h4>
        <p>
          Bi-Modelでは、外部報酬 <MathEquation latex="r_{\text{ext}}" />、ICMからの内部報酬 <MathEquation latex="r_{\text{ICM}}" />、
          PRMからの計画報酬 <MathEquation latex="r_{\text{PRM}}" /> を適切に統合することで、
          効率的な探索と目標指向の行動のバランスを取ります。
          最終的な報酬関数は以下のように定義されます：
        </p>

        <MathEquation 
          latex="r = r_{\text{ext}} + \begin{cases} \lambda_{\text{PRM}} \cdot r_{\text{PRM}} & \text{if a plan } P \text{ exists} \\ \lambda_{\text{ICM}} \cdot r_{\text{ICM}} & \text{otherwise} \end{cases}" 
          displayMode={true}
        />

        <p>
          ここで <MathEquation latex="\lambda_{\text{PRM}}" /> と <MathEquation latex="\lambda_{\text{ICM}}" /> は、
          それぞれPRMとICMの報酬の重要度を調整するハイパーパラメータです。
          計画が存在する場合はPRMからの報酬を優先し、計画が存在しない場合はICMからの報酬を用いることで、
          バランスのとれた探索と活用が実現されます。
        </p>
      </SubsectionContainer>
      
      <AITips>
        <p>
          Bi-Modelの本質をより深く理解するために、日常的な例で考えてみましょう。
        </p>
        <p>
          <strong>内発的好奇心モジュール（ICM）</strong>を、未知の街を探索する旅行者に例えることができます。
          旅行者は観光ガイドブックに載っていない路地や地元の人しか知らない場所に興味を持ち（好奇心）、
          そういった予想外の場所を探索することで、街の本当の魅力を発見します。
          ICMの内部報酬は「ガイドブックに載っていない驚き」の度合いに相当します。
        </p>
        <p>
          一方、<strong>計画報酬マシン（PRM）</strong>は、目的地までの効率的なルートを計画し、
          チェックポイントごとに自分を褒める計画的な旅行者のようなものです。
          「駅からまず△△美術館に行き、次に〇〇公園に立ち寄り、最後に□□レストランで食事をする」
          というように、中間目標を設定して着実に進むことができます。
          PRMの報酬は「計画通りに中間地点に到達した満足感」に相当します。
        </p>
        <p>
          <strong>好奇心駆動型想像力（CDI）</strong>は、この2つの旅行スタイルを組み合わせた賢い旅行者です。
          基本的には計画に従いますが、計画が立てられない状況（例：予定していたレストランが休業中）では、
          好奇心に従って新しい場所を探索します。その過程で新しい発見（例：地元で人気のカフェ）をすると、
          それを新たな知識として取り入れ、今後の計画に活用します。
        </p>
      </AITips>
    </article>
  );
}
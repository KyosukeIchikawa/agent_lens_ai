'use client';

import SectionHeader from '@/components/SectionHeader';
import AITips from '@/components/AITips';
import SubsectionContainer from '@/components/SubsectionContainer';
import MathEquation from '@/components/MathEquation';

/**
 * 「Curiosity-Driven Imagination」論文のPreliminariesセクション解説ページ
 */
export default function PreliminariesPage() {
  return (
    <article className="prose max-w-none">
      <SectionHeader 
        title="Preliminaries" 
        subtitle="前提知識"
        sectionNumber="III"
      />
      
      <p>
        本セクションでは、提案手法の基盤となる主要な概念と定義について説明します。シンボリック計画、強化学習、内発的好奇心モジュール（ICM）などの基本的な概念を理解することは、以降のセクションで提案されるBi-Modelの理解に不可欠です。
      </p>

      <SubsectionContainer title="シンボリック計画（Symbolic Planning）" id="symbolic-planning">
        <p>
          シンボリック計画は、一般的にPDDL（Planning Domain Description Language）[40]のような形式言語で記述されます。
          ドメイン記述 <MathEquation latex="\sigma = \langle \mathcal{E}, \mathcal{F}, \mathcal{S}, \mathcal{O} \rangle"  /> は以下の要素から構成されます：
        </p>
        
        <ul>
          <li>
            <MathEquation latex="\mathcal{E} = [\varepsilon_1, \ldots, \varepsilon_{|\mathcal{E}|}]"  /> は環境内のエンティティの集合
          </li>
          <li>
            <MathEquation latex="\mathcal{F} = [f_1(\odot), \ldots, f_{|\mathcal{F}|}(\odot)]"  />（ここで <MathEquation latex="\odot \subset \mathcal{E}"  />）は述語の集合（ブール型または数値型）
          </li>
          <li>
            <MathEquation latex="\mathcal{S} = [s_1, \ldots, s_{|\mathcal{S}|}]"  /> は環境内の状態の集合
          </li>
          <li>
            <MathEquation latex="\mathcal{O} = [o_1, \ldots, o_{|\mathcal{O}|}]"  /> は既知のアクションオペレータの集合
          </li>
        </ul>
        
        <p>
          各オペレータ <MathEquation latex="o_i"  /> は前提条件 <MathEquation latex="\psi_i"  /> と効果 <MathEquation latex="\omega_i"  /> を持ち、それらは述語であるため <MathEquation latex="\psi_i, \omega_i \in \mathcal{F}"  /> となります。
          前提条件 <MathEquation latex="\psi_i"  /> は <MathEquation latex="o_i"  /> を実行する前に成立している必要があり、効果 <MathEquation latex="\omega_i"  /> は実行後に成立します。
          計画は、STRIPS形式のタスク <MathEquation latex="T = (\mathcal{E}, \mathcal{F}, \mathcal{O}, s_0, s_g)"  /> として記述されます。
          計画を立てる際には、初期状態 <MathEquation latex="s_0" /> から始めて、目標 <MathEquation latex="s_g" /> を満たす状態に到達するためのオペレータのシーケンス <MathEquation latex="\mathcal{P} = [o_1, \ldots, o_{|\mathcal{P}|}]" /> を見つけます。
        </p>

        <AITips title="シンボリック計画を理解するための具体例">
          <p>
            シンボリック計画は抽象的に感じるかもしれませんが、実際には私たちが日常的に行う「計画」と同じ概念です。例えば、料理の手順を考えてみましょう：
          </p>

          <p>
            <strong>ドメイン記述</strong>をケーキ作りに当てはめると：
          </p>
          <ul>
            <li><strong>エンティティ集合</strong>: 卵、小麦粉、砂糖、牛乳、ボウル、オーブン、ケーキ型</li>
            <li><strong>述語集合</strong>: 
              <ul>
                <li>入っている(ケーキ生地, ボウル) - ブール型述語</li>
                <li>混ぜられている(卵, 小麦粉) - ブール型述語</li>
                <li>温度(オーブン) = 180℃ - 数値型述語</li>
              </ul>
            </li>
            <li><strong>状態集合</strong>: 「材料が準備された状態」「生地が混ざった状態」「ケーキが焼かれた状態」など</li>
            <li><strong>オペレータ集合</strong>: 「混ぜる」「入れる」「予熱する」「焼く」など</li>
          </ul>

          <p>
            例えば「焼く」オペレータは：
          </p>
          <ul>
            <li><strong>前提条件</strong>: 入っている(ケーキ生地, ケーキ型) ∧ 入っている(ケーキ型, オーブン) ∧ 温度(オーブン) = 180℃</li>
            <li><strong>効果</strong>: 焼かれている(ケーキ)</li>
          </ul>

          <p>
            この例では、初期状態「材料が準備された状態」から、目標状態「ケーキが焼かれた状態」に到達するために、「混ぜる→入れる(ケーキ生地, ケーキ型)→入れる(ケーキ型, オーブン)→予熱する→焼く」というオペレータのシーケンスを計画することになります。
          </p>
        </AITips>
      </SubsectionContainer>

      <SubsectionContainer title="オペレータの抽象化（Operator Abstraction）" id="operator-abstraction">
        <p>
          オペレータを学習する際に、シンボリックな状態遷移を分析することによってオペレータが抽象化されます。
          状態遷移は状態のペア <MathEquation latex="(s_t, s_{t+1})" /> として表され、<MathEquation latex="s_t" /> はアクション前の環境の状態、<MathEquation latex="s_{t+1}" /> はアクション後の状態です。
          <MathEquation latex="s_t" /> を <MathEquation latex="s_{t+1}" /> に変換するオペレータの前提条件と効果を抽出することを考えます。
          複数の異なる状態で共通して必要となる述語 <MathEquation latex="f_i(\odot)" /> が前提条件 <MathEquation latex="\psi" /> です。
          <MathEquation latex="s_t" /> と <MathEquation latex="s_{t+1}" /> の間で変化する述語 <MathEquation latex="f_i(\odot)" /> が効果 <MathEquation latex="\omega" /> です。
          それらによって、リフテッドオペレータ（抽象化されたオペレータ） <MathEquation latex="\mathcal{O}_{\rm lifted} = \langle \psi, \omega \rangle" /> が定義されます。
        </p>
        
        <AITips title="オペレータ抽象化を理解するための具体例">
          <p>
            オペレータの抽象化とは、具体的な行動からパターンを見つけ出して一般化するプロセスです。これは私たちが日常でも無意識に行っていることです。具体例で理解しましょう：
          </p>
          
          <p>
            <strong>例：ドアを開ける行動の抽象化</strong>
          </p>
          
          <p>
            あなたが様々なドアを開ける経験をしているとします：
          </p>
          
          <ul>
            <li>経験1: 自宅の木製ドアを右手で開ける</li>
            <li>経験2: オフィスのガラスドアを左手で開ける</li>
            <li>経験3: 車のドアを右手で開ける</li>
          </ul>
          
          <p>
            これらの経験から「ドアを開ける」というオペレータを抽象化するプロセスを見てみましょう：
          </p>
          
          <p>
            各経験の前後の状態変化を観察します：
          </p>
          
          <ol>
            <li>共通の<strong>効果</strong>：「閉まっている(ドア) → 開いている(ドア)」</li>
            <li>
              <strong>前提条件</strong>の抽出：
              <ul>
                <li>「近くにいる(人, ドア)」は全ての経験で変化しないので前提条件</li>
                <li>「触れられる(ドア)」も全ての経験で変化しないので前提条件</li>
                <li>「木製である(ドア)」は経験によって異なるので前提条件ではない</li>
                <li>「右手を使う(人)」は経験によって異なるので前提条件ではない</li>
              </ul>
            </li>
          </ol>
          
          <p>
            結果的に抽象化された「開ける」オペレータ：
          </p>
          
          <ul>
            <li><strong>前提条件</strong>: 近くにいる(人, ドア) ∧ 触れられる(ドア) ∧ 閉まっている(ドア)</li>
            <li><strong>効果</strong>: ¬閉まっている(ドア) ∧ 開いている(ドア)</li>
          </ul>
          
          <p>
            この抽象化により、ドアの材質や使用する手に関係なく、一般的な「開ける」オペレータが得られます。これを使えば、過去に経験していないドア（例：回転ドア）に対しても、「開ける」という行動を計画できるようになります。
          </p>
        </AITips>
      </SubsectionContainer>

      <SubsectionContainer title="強化学習（Reinforcement Learning）とICM" id="reinforcement-learning-and-icm">
        <p>
          強化学習（RL）はエージェントが環境と相互作用するフレームワークであり、マルコフ決定過程（MDP）<MathEquation latex="M = \langle \tilde{\mathcal{S}}, \mathcal{A}, R, \tau, \gamma \rangle" /> としてモデル化されます。
        </p>
        
        <p>
          ここで、各要素は以下を表します：
        </p>
        
        <ul>
          <li><MathEquation latex="\tilde{\mathcal{S}}" /> はサブシンボリック状態空間（連続的な状態空間）</li>
          <li><MathEquation latex="\mathcal{A}" /> は行動空間</li>
          <li><MathEquation latex="\tau({\tilde{s}}_{t+1}|{\tilde{s}}_t, a_t)" /> は遷移確率</li>
          <li><MathEquation latex="R(\tilde{s}, a)" /> は報酬関数</li>
          <li><MathEquation latex="\gamma \in (0, 1]" /> は割引率</li>
        </ul>
        
        <p>
          内発的好奇心モジュール（Intrinsic Curiosity Module, ICM）[15]は、エージェントの探索を促進するための内部報酬メカニズムです。ICMは予測が難しい状態への探索を動機づけることで、エージェントが未知の環境を効率的に探索できるようにします。
        </p>
        
        <p>
          ICMは主に2つのコンポーネントで構成されています：
        </p>
        
        <ol>
          <li>順モデル：状態 <MathEquation latex="\tilde{s}_t" /> と行動 <MathEquation latex="a_t" /> から次状態 <MathEquation latex="\tilde{s}_{t+1}" /> を予測</li>
          <li>逆モデル：状態 <MathEquation latex="\tilde{s}_t" /> と次状態 <MathEquation latex="\tilde{s}_{t+1}" /> から行動 <MathEquation latex="a_t" /> を予測</li>
        </ol>
        
        <p>
          ICMの内部報酬は順モデルの予測誤差に基づいて次のように定義されます：
        </p>
        
        <p>
          <MathEquation latex="\mathcal{R}_{intrinsic} = \|{\hat{s}}_{t+1} - {\tilde{s}}_{t+1}\|_2" />
        </p>
        
        <p>
          ここで、<MathEquation latex="\hat{s}_{t+1}" /> は順モデルによって予測された次の状態、<MathEquation latex="\tilde{s}_{t+1}" /> は実際の次の状態です。この報酬は予測が難しい状態への探索を促進します。エージェントは、このような内部報酬と環境から得られる外部報酬を組み合わせて学習を進めます。
        </p>

        <AITips title="強化学習とICMを理解するための具体例">
          <p>
            強化学習とICMの概念を、子供の遊び場での学習で例えてみましょう：
          </p>
          
          <p>
            <strong>強化学習の基本</strong>
          </p>
          
          <ul>
            <li><strong>状態空間</strong>：遊び場の様々な場所（滑り台の上、砂場など）</li>
            <li><strong>行動空間</strong>：走る、登る、滑る、跳ぶなど</li>
            <li><strong>報酬関数</strong>：楽しい経験（+1）、退屈な経験（0）、怪我（-1）</li>
            <li><strong>遷移確率</strong>：ある行動をとると次のどの状態になる可能性が高いか（例：滑り台を滑るとほぼ100%の確率で砂場に到達）</li>
            <li><strong>割引率</strong>：将来の楽しさをどれだけ重視するか（子供は目先の楽しさを重視する傾向がある＝割引率が小さい）</li>
          </ul>
          
          <p>
            <strong>内発的好奇心モジュール（ICM）の働き</strong>
          </p>
          
          <p>
            子供が遊び場の中央に立っているとします（状態s<sub>t</sub>）。次に何をするでしょうか？
          </p>
          
          <ol>
            <li>
              <strong>順モデル</strong>：「もし私が滑り台を滑ったら（行動a<sub>t</sub>）、砂場に到達するだろう（予測状態ŝ<sub>t+1</sub>）」
            </li>
            <li>
              <strong>実際の結果</strong>：滑り台を滑ると、実際に砂場に到達（実際の状態s<sub>t+1</sub>）
            </li>
            <li>
              <strong>予測誤差</strong>：予測と結果が一致（誤差が小さい）→内部報酬が小さい
            </li>
          </ol>
          
          <p>
            対照的に、初めて見るシーソーを試すと：
          </p>
          
          <ol>
            <li>
              <strong>順モデル</strong>：「シーソーに乗ったら何が起こるかわからない」（不正確な予測）
            </li>
            <li>
              <strong>実際の結果</strong>：上下に動く体験
            </li>
            <li>
              <strong>予測誤差</strong>：予測と結果が大きく異なる→内部報酬が大きい→好奇心が満たされる
            </li>
          </ol>
          
          <p>
            このようにICMは、「予測できないこと」に対して内部報酬を生み出し、子供（エージェント）に新しい遊具を試すモチベーションを与えます。これにより、遊び場全体（環境）を効率的に探索できるようになります。
          </p>
        </AITips>
      </SubsectionContainer>

      <SubsectionContainer title="統合計画タスク（Integrated Planning Task）" id="integrated-planning-task">
        <p>
          統合計画タスク（IPT）は、シンボリック計画と低レベルの実行を結びつける概念です：<MathEquation latex="\mathcal{T} = \langle T, M, d, e \rangle"  />。
        </p>
        
        <p>
          IPTの各要素は以下のように定義されます：
        </p>
        
        <ul>
          <li><MathEquation latex="T = (\sigma, s_0, s_g)"  /> はシンボリック計画タスク</li>
          <li><MathEquation latex="M = \langle \tilde{\mathcal{S}}, \mathcal{A}, R, \tau, \gamma \rangle"  /> はマルコフ決定過程（MDP）</li>
          <li><MathEquation latex="d: \tilde{\mathcal{S}} \rightarrow \mathcal{S}"  /> は検出関数（連続的な状態からシンボリックな状態へのマッピング）</li>
          <li><MathEquation latex="e: \mathcal{O} \rightarrow X_M"  /> は実行関数（オペレータから実行者への変換）</li>
        </ul>
        
        <p>
          <MathEquation latex="X_M"  /> は実行者の集合であり、各実行者 <MathEquation latex="x = \langle I, \pi, \beta \rangle \in X_M" /> は次の要素から構成されています：
        </p>
        
        <ul>
          <li><MathEquation latex="I" /> は開始指示子（どのような状態でオペレータの実行を開始するかを決定）</li>
          <li><MathEquation latex="\pi: \tilde{\mathcal{S}} \rightarrow \mathcal{A}" /> は強化学習の方策（低レベルの行動を選択）</li>
          <li><MathEquation latex="\beta: \tilde{\mathcal{S}} \rightarrow \{0, 1\}" /> は終了指示子（オペレータの実行をいつ終了するかを決定）</li>
        </ul>
        
        <p>
          IPTの解決策は、オペレータを実行者にマッピングし、目標状態 <MathEquation latex="s_g"  /> に到達するための計画 <MathEquation latex="\mathcal{P} = [o_1, \ldots, o_{|\mathcal{P}|}]"  /> を生成することです。この解決策を実行すると、最終的に目標を満たすシンボリック状態 <MathEquation latex="\tilde{s}" /> となり、<MathEquation latex="d(\tilde{s}) \subseteq s_g" /> が成立します。
        </p>
        
        <p>
          オープンワールド環境における新規な課題に対応するために、「Stretch-IPT」<MathEquation latex="\tilde{\mathcal{T}} = \langle T, M', d, e' \rangle"  /> という拡張概念が導入されています。この拡張では、MDPが <MathEquation latex="M' = \langle \tilde{\mathcal{S}}', \mathcal{A}, R, \tau', \gamma \rangle"  /> に更新され、新しい状態空間や遷移関数に対応します。また、実行関数 <MathEquation latex="e'"  /> も更新され、既存のオペレータを新しいMDPに適応させます。これにより、環境の変化や未知の状況に柔軟に対応することが可能になります。
        </p>

        <AITips title="統合計画タスクを日常生活で理解する">
          <p>
            統合計画タスク（IPT）は、高レベルの計画と低レベルの行動を結びつけるフレームワークです。これを日常生活での「料理を作る」例で考えてみましょう：
          </p>
          
          <p>
            <strong>シナリオ：パスタディナーの準備</strong>
          </p>
          
          <p>
            <strong>1. シンボリック計画タスク (T)</strong>:
          </p>
          <ul>
            <li>
              <strong>ドメイン (σ)</strong>: 食材、調理器具、調理行為
            </li>
            <li>
              <strong>初期状態 (s<sub>0</sub>)</strong>: 「冷蔵庫に食材がある」「鍋がある」など
            </li>
            <li>
              <strong>目標状態 (s<sub>g</sub>)</strong>: 「パスタが調理されている」「食卓に料理がある」
            </li>
            <li>
              <strong>計画 (P)</strong>: 「水を沸かす」→「パスタを茹でる」→「ソースを作る」→「盛り付ける」
            </li>
          </ul>
          
          <p>
            <strong>2. MDP (M)</strong>: 実際の物理的な環境と行動
          </p>
          <ul>
            <li>
              <strong>状態空間 (S̃)</strong>: 鍋の中の水の温度、パスタの硬さ、盛り付けの状態などの連続的な情報
            </li>
            <li>
              <strong>行動 (A)</strong>: 手を動かす、火加減を調節する、フォークで確認するなどの詳細な身体動作
            </li>
          </ul>
          
          <p>
            <strong>3. 検出関数 (d)</strong>: 水が沸騰しているかどうか、パスタが茹であがったかどうかを認識する能力
          </p>
          
          <p>
            <strong>4. 実行関数 (e)</strong>: 「水を沸かす」という抽象的なオペレータを、「鍋に水を入れる」→「火をつける」→「沸騰するまで待つ」という具体的な動作シーケンスに変換する機能
          </p>
          
          <p>
            <strong>5. 実行者 (x = ⟨I, π, β⟩)</strong>:
          </p>
          <ul>
            <li>
              <strong>開始指示子 (I)</strong>: 「パスタを茹でる」は「水が沸騰している」状態で開始
            </li>
            <li>
              <strong>方策 (π)</strong>: パスタを茹でる際の最適な行動選択（火加減の調整、茹で時間の管理など）
            </li>
            <li>
              <strong>終了指示子 (β)</strong>: パスタが「アルデンテ」になったら茹で作業を終了
            </li>
          </ul>
          
          <p>
            <strong>Stretch-IPT</strong>は、想定外の状況（例：普段使っていたパスタが切れていて新しい種類のパスタを使用する必要がある）に対応するための拡張です。この場合、茹で時間や火加減などを調整する必要がありますが、基本的な「パスタを茹でる」というオペレータの概念は同じです。
          </p>
        </AITips>
      </SubsectionContainer>
      
      <AITips>
        <p>
          「Preliminaries」セクションは、論文の主要部分を理解するための基盤を提供します。ここで紹介されている概念は、次のように日常生活の例で考えると分かりやすいでしょう：
        </p>
        <p>
          <strong>シンボリック計画</strong>は、旅行計画のようなものです。目的地（目標）と現在地（初期状態）があり、利用可能な交通手段（オペレータ）を使って目的地に到達する方法を考えます。各交通手段には条件（前提条件：例えば「バスに乗るにはバス停にいる必要がある」）と結果（効果：例えば「バスに乗ると目的地に到着する」）があります。
        </p>
        <p>
          <strong>オペレータの抽象化</strong>は、経験から一般的なルールを学ぶプロセスです。例えば、何度か料理をした後、「オーブンで調理するには予熱が必要」というルールを抽出するようなものです。
        </p>
        <p>
          <strong>強化学習とICM</strong>は、子供が新しい環境を探索するようなものです。好奇心（ICM）は、予測できない結果をもたらす行動（例：初めて見るおもちゃで遊ぶ）に子供を導きます。そして、その経験から学習します。
        </p>
        <p>
          <strong>統合計画タスク</strong>は、ナビゲーションアプリのようなものです。高レベルの計画（「A地点からB地点へ行く」）と低レベルの実行（「右に曲がる」「まっすぐ進む」など）を結びつけます。
        </p>
      </AITips>
    </article>
  );
}
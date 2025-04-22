'use client';

import SectionHeader from '@/components/SectionHeader';
import ReferenceSection from '@/components/ReferenceSection';
import ReferenceItem from '@/components/ReferenceItem';

/**
 * 「Curiosity-Driven Imagination」論文の参考文献ページ
 */
export default function ReferencesPage() {
  return (
    <article className="prose max-w-none">
      <SectionHeader title="References" subtitle="参考文献" />

      <p>
        本ページでは、論文で引用されている参考文献を研究分野ごとに分類して整理しています。
        各参考文献には、本論文内での引用箇所や重要性に基づいて補足説明を付記しています。
      </p>

      <ReferenceSection title="シンボリック計画とAI" id="symbolic-planning">
        <ReferenceItem
          id="1"
          authors="Fikes, R. E., & Nilsson, N. J."
          year="1971"
          title="STRIPS: A new approach to the application of theorem proving to problem solving"
          journal="Artificial Intelligence"
          volume="2(3-4)"
          pages="189-208"
          doi="10.1016/0004-3702(71)90010-5"
          description="古典的な計画アルゴリズムであるSTRIPSを提案した論文。本論文のシンボリック計画の基礎となる概念を提供しています。"
        />

        <ReferenceItem
          id="15"
          authors="Konidaris, G., Kaelbling, L. P., & Lozano-Perez, T."
          year="2018"
          title="From skills to symbols: Learning symbolic representations for abstract high-level planning"
          journal="Journal of Artificial Intelligence Research"
          volume="61"
          pages="215-289"
          doi="10.1613/jair.5575"
          description="低レベルのスキルから高レベルのシンボリック表現を学習する手法を提案。Bi-Modelのシンボリック抽象化に関連しています。"
        />

        <ReferenceItem
          id="25"
          authors="Lu, H., & Scheutz, M."
          year="2022"
          title="Hybrid Goal-driven and Planning with LTL specifications"
          conference="International Conference on Autonomous Agents and Multi-Agent Systems"
          pages="848-856"
          url="https://dl.acm.org/doi/10.5555/3535850.3535941"
          description="HyGOALを提案した論文。本研究のベースラインとして使用されており、実験設定とベースライン結果を提供しています。"
        />

        <ReferenceItem
          id="40"
          authors="McDermott, D., Ghallab, M., Howe, A., Knoblock, C., Ram, A., Veloso, M., Weld, D., & Wilkins, D."
          year="1998"
          title="PDDL - The Planning Domain Definition Language"
          institution="Yale Center for Computational Vision and Control"
          url="https://homepages.inf.ed.ac.uk/mfourman/tools/propplan/papers/pddl.pdf"
          description="計画問題の標準的な記述言語PDDLを定義した技術報告書。本研究ではオペレータの定義に類似の表記法が使用されています。"
        />
      </ReferenceSection>

      <ReferenceSection title="内発的好奇心とモチベーション" id="intrinsic-curiosity">
        <ReferenceItem
          id="12"
          authors="Pathak, D., Agrawal, P., Efros, A. A., & Darrell, T."
          year="2017"
          title="Curiosity-driven exploration by self-supervised prediction"
          conference="International Conference on Machine Learning"
          pages="2778-2787"
          url="https://proceedings.mlr.press/v70/pathak17a.html"
          description="内発的好奇心モジュール（ICM）を提案した論文。本研究のICMはこの手法をベースにしています。"
        />

        <ReferenceItem
          id="18"
          authors="Bellemare, M. G., Srinivasan, S., Ostrovski, G., Schaul, T., Saxton, D., & Munos, R."
          year="2016"
          title="Unifying count-based exploration and intrinsic motivation"
          conference="Advances in Neural Information Processing Systems"
          volume="29"
          url="https://proceedings.neurips.cc/paper/2016/hash/afda332245e2af431abd9939fe7749a3-Abstract.html"
          description="カウントベースの探索と内発的モチベーションを統合する手法を提案。探索戦略の文脈で関連しています。"
        />

        <ReferenceItem
          id="20"
          authors="Burda, Y., Edwards, H., Storkey, A., & Klimov, O."
          year="2019"
          title="Exploration by random network distillation"
          conference="International Conference on Learning Representations"
          url="https://openreview.net/forum?id=H1lJJnR5Ym"
          description="ランダムネットワーク蒸留による探索手法を提案。内発的好奇心の実装に関連しています。"
        />
      </ReferenceSection>

      <ReferenceSection title="ロボット学習と適応" id="robot-learning">
        <ReferenceItem
          id="3"
          authors="Boedecker, J., Springenberg, J. T., Wülfing, J., & Riedmiller, M."
          year="2014"
          title="Approximate real-time optimal control based on sparse Gaussian process models"
          conference="IEEE Symposium on Adaptive Dynamic Programming and Reinforcement Learning"
          pages="1-8"
          doi="10.1109/ADPRL.2014.7010608"
          description="スパースガウス過程モデルに基づく近似的なリアルタイム最適制御を提案。RapidLearnの基礎となる研究です。"
        />

        <ReferenceItem
          id="23"
          authors="Vasilopoulos, V., Vega-Brown, W., Arslan, O., Roy, N., & Koditschek, D. E."
          year="2018"
          title="Sensor-based reactive symbolic planning in partially known environments"
          conference="IEEE International Conference on Robotics and Automation"
          pages="5683-5690"
          doi="10.1109/ICRA.2018.8461167"
          description="部分的に既知の環境でのセンサーベースのリアクティブシンボリック計画を提案。LTL&GOの基礎となる研究です。"
        />

        <ReferenceItem
          id="41"
          authors="Zhu, Y., Wong, J., Mandlekar, A., & Martín-Martín, R."
          year="2020"
          title="RoboSuite: A modular simulation framework and benchmark for robot learning"
          arxivId="2009.12293"
          description="本研究の実験環境であるRoboSuiteを提案した論文。「Pick and Place Can」タスクを含むロボット学習のためのモジュラーシミュレーションフレームワークとベンチマークを提供しています。"
        />

        <ReferenceItem
          id="42"
          authors="Mahmood, A. R., Korenkevych, D., Vasan, G., Ma, W., & Bergstra, J."
          year="2018"
          title="Benchmarking reinforcement learning algorithms on real-world robots"
          conference="Conference on Robot Learning"
          pages="561-591"
          url="https://proceedings.mlr.press/v87/mahmood18a.html"
          description="実世界のロボットでの強化学習アルゴリズムのベンチマークに関する論文。「Pick and Place Can」タスクが強化学習エージェントにとって課題となることを示しています。"
        />
      </ReferenceSection>

      <ReferenceSection title="強化学習" id="reinforcement-learning">
        <ReferenceItem
          id="30"
          authors="Haarnoja, T., Zhou, A., Abbeel, P., & Levine, S."
          year="2018"
          title="Soft Actor-Critic: Off-policy maximum entropy deep reinforcement learning with a stochastic actor"
          conference="International Conference on Machine Learning"
          pages="1861-1870"
          url="https://proceedings.mlr.press/v80/haarnoja18b.html"
          description="本研究のベースラインとして使用されたSoft Actor-Critic（SAC）アルゴリズムを提案した論文。"
        />

        <ReferenceItem
          id="31"
          authors="Andrychowicz, M., Wolski, F., Ray, A., Schneider, J., Fong, R., Welinder, P., McGrew, B., Tobin, J., Abbeel, P., & Zaremba, W."
          year="2017"
          title="Hindsight Experience Replay"
          conference="Advances in Neural Information Processing Systems"
          volume="30"
          url="https://proceedings.neurips.cc/paper/2017/hash/453fadbd8a1a3af50a9df4df899537b5-Abstract.html"
          description="本研究のベースラインとして使用されたHindsight Experience Replay（HER）を提案した論文。スパース報酬環境での学習を効率化する手法です。"
        />

        <ReferenceItem
          id="35"
          authors="Silver, D., Hubert, T., Schrittwieser, J., Antonoglou, I., Lai, M., Guez, A., Lanctot, M., Sifre, L., Kumaran, D., Graepel, T., Lillicrap, T., Simonyan, K., & Hassabis, D."
          year="2018"
          title="A general reinforcement learning algorithm that masters chess, shogi, and Go through self-play"
          journal="Science"
          volume="362(6419)"
          pages="1140-1144"
          doi="10.1126/science.aar6404"
          description="AlphaZeroを提案した論文。計画と学習の統合に関連しています。"
        />

        <ReferenceItem
          id="38"
          authors="Araki, B., Vodrahalli, K., Leech, T., Vasile, C. I., Donahue, M., & Roy, D."
          year="2017"
          title="Environment-independent task specifications via GLTL"
          arxivId="1704.04341"
          url="https://api.semanticscholar.org/CorpusID:16352285"
          description="環境に依存しないタスク仕様のためのGLTL（Grounded Linear Temporal Logic）を提案した論文。シンボリック抽象化に関連します。"
        />

        <ReferenceItem
          id="39"
          authors="Hasanbeig, H., Jeppu, N. Y., Abate, A., Melham, T., & Kroening, D."
          year="2024"
          title="Symbolic task inference in deep reinforcement learning"
          description="深層強化学習におけるシンボリックタスク推論に関する研究。オペレータ抽象化とタスク表現に関連しています。"
        />
      </ReferenceSection>

      <ReferenceSection title="オープンワールド適応" id="open-world-adaptation">
        <ReferenceItem
          id="5"
          authors="Langley, P., Meadows, B., Sridharan, M., & Choi, D."
          year="2017"
          title="Explainable agency for intelligent autonomous systems"
          conference="AAAI Conference on Artificial Intelligence"
          pages="4762-4763"
          url="https://www.aaai.org/ocs/index.php/IAAI/IAAI17/paper/view/14476"
          description="インテリジェントな自律システムのための説明可能なエージェンシーに関する論文。オープンワールド適応の文脈で関連しています。"
        />

        <ReferenceItem
          id="8"
          authors="Albrecht, S. V., & Stone, P."
          year="2018"
          title="Autonomous agents modelling other agents: A comprehensive survey and open problems"
          journal="Artificial Intelligence"
          volume="258"
          pages="66-95"
          doi="10.1016/j.artint.2018.01.002"
          description="他のエージェントをモデル化する自律エージェントに関する包括的な調査と未解決問題を提示した論文。マルチエージェント環境での適応に関連しています。"
        />
      </ReferenceSection>
    </article>
  );
}

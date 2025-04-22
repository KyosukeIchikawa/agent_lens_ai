/**
 * Curiosity-Driven Imagination 論文データ
 */

/**
 * @typedef {import('../types').Paper} Paper
 */

/**
 * 論文データ
 * @type {Paper}
 */
const paper = {
  id: 'curiosity-driven-imagination',
  title:
    'Curiosity-Driven Imagination: Discovering Plan Operators and Learning Associated Policies for Open-World Adaptation',
  jaTitle:
    '好奇心駆動型想像力：オープンワールド適応のための計画オペレータの発見と関連ポリシーの学習',
  subtitle: '好奇心駆動型想像力による未知のオープンワールド環境への適応',
  description: 'ロボットが未知の環境に素早く適応するための革新的アプローチ',
  publishedYear: 2025, // arXivのタイムスタンプから
  publishedDate: '2025-03-06', // 論文が投稿された日付
  addedDate: '2025-04-03', // 記事として追加された日付
  authors: ['Pierrick Lorang', 'Hong Lu', 'Matthias Scheutz'],
  authorsWithAffiliations: [
    {
      name: 'Pierrick Lorang',
      affiliations: ['1', '2'],
    },
    {
      name: 'Hong Lu',
      affiliations: ['1'],
    },
    {
      name: 'Matthias Scheutz',
      affiliations: ['1'],
    },
  ],
  affiliations: {
    1: 'Tufts University, 419 Boston Ave, Medford, 02155, MA, USA',
    2: 'AIT Austrian Institute of Technology GmbH, Center for Vision, Automation & Control, Vienna, Austria',
  },
  url: 'https://arxiv.org/abs/2503.04931v1',
  categories: ['ロボティクス', '強化学習', 'シンボリックAI'],
  sections: [
    {
      id: 'introduction',
      title: 'Introduction',
      path: '/papers/curiosity-driven-imagination/1_introduction',
    },
    {
      id: 'related-work',
      title: 'Related Work',
      path: '/papers/curiosity-driven-imagination/2_related-work',
    },
    {
      id: 'preliminaries',
      title: 'Preliminaries',
      path: '/papers/curiosity-driven-imagination/3_preliminaries',
    },
    {
      id: 'method',
      title: 'Method',
      path: '/papers/curiosity-driven-imagination/4_method',
    },
    {
      id: 'experiment',
      title: 'Experiment',
      path: '/papers/curiosity-driven-imagination/5_experiment',
    },
    {
      id: 'results',
      title: 'Results',
      path: '/papers/curiosity-driven-imagination/6_results',
    },
    {
      id: 'discussion',
      title: 'Discussion',
      path: '/papers/curiosity-driven-imagination/7_discussion',
    },
    {
      id: 'conclusion',
      title: 'Conclusion',
      path: '/papers/curiosity-driven-imagination/8_conclusion',
    },
    {
      id: 'references',
      title: 'References',
      path: '/papers/curiosity-driven-imagination/references',
    },
  ],

  /**
   * 論文の図データ
   * 論文全体で一貫性のある図管理のための集中管理データ
   *
   * 各図オブジェクトの構造:
   * @property {string} id - 図の一意識別子
   * @property {string} paperFigNumber - 論文中の図番号（例: "1", "2a", "A1"）
   * @property {string} localFigNumber - 解説ページでの図番号（または自動生成用のnull）
   * @property {boolean} isQuoted - 論文からの直接引用か、新たに作成したものか
   * @property {string} filename - 画像ファイル名
   * @property {string} caption - 図のキャプション
   * @property {string} altText - 画像の代替テキスト
   * @property {string} [description] - 図の詳細な説明（オプション）
   */
  figures: [
    // 論文から引用した図（quoted）
    {
      id: 'illustration-intro',
      paperFigNumber: '1',
      localFigNumber: '1',
      isQuoted: true,
      filename: 'fig1_Illustration_intro.png',
      caption:
        '好奇心駆動型想像力：エージェントは環境の二層モデル—連続モデル（ニューラルネットワーク）とシンボリックモデル（計画ドメイン）—を学習する。連続モデルは内発的好奇心を駆動し、エージェントをシンボリック抽象化のための未知の状態へと導き、シンボリックモデルは仮想的な計画に基づいて報酬マシンを構築する。',
      altText: 'Curiosity-Driven Imaginationのイラスト図',
      description:
        '論文の導入部分で使用されているイラスト。好奇心駆動型想像力の概念を視覚的に表現しています。連続的な要素（ICM）とシンボリックな要素（PRM）の二層モデルが示されています。',
    },
    {
      id: 'framework',
      paperFigNumber: '2',
      localFigNumber: '2',
      isQuoted: true,
      filename: 'fig2_Framework.png',
      caption:
        'オペレータ発見：エージェントはシンボリックな状態遷移から仮想的な抽象オペレータを識別し、それらを計画立案とLTL式の生成に活用して報酬信号を強化する。報酬フィードバックは2つの要素から構成される：LTL式を満たす状態遷移時に活性化する報酬マシンと、エージェントに探索と新しい遷移の学習を促す内発的好奇心報酬。',
      altText: 'オペレータ発見プロセスの図',
      description:
        'エージェントがシンボリックな状態遷移から仮想的な抽象オペレータを識別し、それらを計画立案とLTL式の生成に活用して報酬信号を強化するプロセスを示しています。報酬フィードバックは、LTL式を満たす状態遷移時に活性化する報酬マシンと、エージェントに探索と新しい遷移の学習を促す内発的好奇心報酬の2つの要素から構成されています。',
    },
    {
      id: 'robosuite',
      paperFigNumber: '3',
      localFigNumber: '3',
      isQuoted: true,
      filename: 'fig3_robosuite.png',
      caption:
        '左：オリジナルのPick&Placeタスク、エージェントは缶をドロップオフビンに置く必要がある。右：Locked Doorノベルティ、ドアがドロップオフビンへのアクセスをブロックしている。エージェントは最初に近接センサー（青いボール）を通じてドアのロックを解除してから、それを押して開ける必要がある。赤いボールはライトスイッチの位置を示す。',
      altText: '実験環境のスクリーンショット',
      description:
        '左：オリジナルのPick&Placeタスク（エージェントが缶をドロップオフビンに置く必要がある）。右：Locked Door novelty（ドアがドロップオフビンへのアクセスをブロックしており、エージェントは最初に近接センサー（青いボール）を通じてドアのロックを解除してから、それを押して開ける必要がある。赤いボールはライトスイッチの位置を示す）。',
    },
    {
      id: 'experiment-results',
      paperFigNumber: '4',
      localFigNumber: '4',
      isQuoted: true,
      filename: 'fig4_x1.png',
      caption:
        '実験結果。SRの隣の上向き矢印は高いほど良いことを、Tadaptの隣の下向き矢印は低いほど良いことを示す。左：主要な結果とベースラインとの比較。右：ICM/PRMありなしのアブレーション実験結果。詳細は本文を参照。',
      altText: '実験結果を示すグラフ',
      description:
        '実験結果を示すグラフ。SRの隣の上向き矢印は高いほど良いことを、Tadaptの隣の下向き矢印は低いほど良いことを示す。左側は主要な結果とベースラインとの比較、右側はICM/PRMありなしのアブレーション実験結果を示している。',
    },

    // 解説のために新たに作成した図（created）
    {
      id: 'action-guided-planning',
      paperFigNumber: null,
      localFigNumber: '5',
      isQuoted: false,
      filename: 'algorithm1_action_guided_planning.svg',
      caption: 'アクション誘導計画（Action-Guided Planning）アルゴリズム',
      altText: 'アクション誘導計画アルゴリズムを示す図',
      description:
        'アクション誘導計画アルゴリズムは、学習したオペレータを用いて現在の状態から目標状態までの計画を生成し、その計画に基づいてエージェントの行動を誘導します。',
    },
    {
      id: 'curiosity-driven-imagination-algorithm',
      paperFigNumber: null,
      localFigNumber: '6',
      isQuoted: false,
      filename: 'algorithm2_curiosity_driven_imagination.svg',
      caption: '好奇心駆動型想像力（Curiosity-Driven Imagination）アルゴリズム',
      altText: '好奇心駆動型想像力アルゴリズムを示す図',
      description:
        '好奇心駆動型想像力アルゴリズムは、ICMによる探索（好奇心）とPRMによる計画（想像力）を統合し、新しいオペレータの発見と学習を管理します。',
    },
    {
      id: 'bi-model-architecture',
      paperFigNumber: null,
      localFigNumber: '7',
      isQuoted: false,
      filename: 'bi_model_architecture.svg',
      caption:
        'Bi-Modelのアーキテクチャ図。内発的好奇心モジュール（ICM）と計画報酬マシン（PRM）が協調して動作し、エージェントの適応的な行動を実現します。',
      altText: 'Bi-Modelアーキテクチャ',
      description:
        'Bi-Modelのアーキテクチャは、内発的好奇心モジュール（ICM）と計画報酬マシン（PRM）の2つの主要なコンポーネントから構成されており、これらが協調して動作することでオープンワールド環境での適応的な行動を実現します。',
    },
    {
      id: 'cdi-flow',
      paperFigNumber: null,
      localFigNumber: '8',
      isQuoted: false,
      filename: 'cdi_flow.svg',
      caption:
        'Curiosity-Driven Imagination - エージェントは環境の二層モデル（連続的な神経ネットワークとシンボリックな計画ドメイン）を学習する。連続的な要素は内発的好奇心を駆動し、エージェントをシンボリック抽象化のための未知の状態へと導き、シンボリックな要素は仮想的な計画に基づいて報酬マシンを構築する。',
      altText: 'Curiosity-Driven Imaginationの概念図',
      description:
        '好奇心駆動型想像力の概要図。Bi-Modelが好奇心（ICM）と想像力（PRM）をどのように統合し、オープンワールド環境での効率的な適応を実現するかを示しています。',
    },
    {
      id: 'experiment-environment',
      paperFigNumber: null,
      localFigNumber: '9',
      isQuoted: false,
      filename: 'experiment_environment.svg',
      caption:
        '実験に使用された3つの環境。(a) 3D環境、(b) 2Dナビゲーション環境、(c) ロボットマニピュレーション環境。',
      altText: '実験環境',
      description:
        'Bi-Modelの評価に使用された3つの実験環境を示しています。複雑なオブジェクト間相互作用、学習したオペレータの一般化能力、連続状態空間における離散的シンボル抽象化の有効性をそれぞれ評価するための環境です。',
    },
    {
      id: 'operator-discovery',
      paperFigNumber: null,
      localFigNumber: '10',
      isQuoted: false,
      filename: 'figure2_operator_discovery.svg',
      caption:
        'オペレータ発見 - エージェントはシンボリックな状態遷移から仮想的な抽象オペレータを識別し、それらを計画立案とLTL式の生成に活用して報酬信号を強化する。報酬フィードバックは2つの要素から構成される: LTL式を満たす状態遷移時に活性化する報酬マシンと、エージェントに探索と新しい遷移の学習を促す内発的好奇心報酬。',
      altText: 'オペレータ発見のプロセス',
      description:
        'オペレータ発見プロセスの図解。エージェントが環境との相互作用を通じてシンボリックな状態遷移から抽象オペレータを学習し、それらを計画と報酬生成に活用する様子を示しています。',
    },
    {
      id: 'operator-abstraction',
      paperFigNumber: null,
      localFigNumber: '11',
      isQuoted: false,
      filename: 'operator_abstraction.svg',
      caption:
        'オペレータ抽象化プロセス - 複数の状態遷移データから前提条件と効果を抽出し、統一されたオペレータを形成するプロセス。このプロセスにより、エージェントは経験から一般化された行動ルールを学習できる。',
      altText: 'オペレータ抽象化プロセス',
      description:
        '状態遷移データから前提条件と効果を抽出し、統一されたオペレータを形成するプロセスを図解しています。このプロセスにより、エージェントは経験から一般化された行動ルールを学習できます。',
    },
    {
      id: 'results-comparison',
      paperFigNumber: null,
      localFigNumber: '12',
      isQuoted: false,
      filename: 'results_comparison.svg',
      caption:
        '実験結果。SRの隣の上向き矢印は高いほど良いことを、Tadaptの隣の下向き矢印は低いほど良いことを示します。左：主要な結果とベースラインとの比較。右：ICM/PRMありなしのアブレーション実験結果。',
      altText: '実験結果の比較',
      description:
        'Bi-Modelと比較手法の実験結果を示すグラフ。左側は主要な結果とベースラインとの比較、右側はICM/PRMありなしのアブレーション実験結果を示しています。',
    },
    {
      id: 'learning-curves',
      paperFigNumber: null,
      localFigNumber: '13',
      isQuoted: false,
      filename: 'learning_curves.svg',
      caption:
        'Light Off（左）とLocked（右）シナリオにおける各手法の学習曲線。Bi-Modelは他の手法よりも急速に学習し、より高い成功率に達しています。',
      altText: '学習曲線',
      description:
        'Light OffとLockedシナリオにおける各手法の学習曲線を示しています。Bi-Modelが他の手法よりも急速に学習し、より高い成功率に達する様子が見て取れます。',
    },
  ],
};

export default paper;

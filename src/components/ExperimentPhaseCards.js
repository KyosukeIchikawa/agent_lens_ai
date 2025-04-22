import React from 'react';

/**
 * 実験フェーズをカード形式で表示するコンポーネント
 * 実験の各フェーズとその詳細を視覚的に表現する
 *
 * @param {Array} phases - 表示する実験フェーズの配列
 * @param {string} title - セクションのタイトル (任意)
 * @param {string} description - セクションの説明 (任意)
 */
const ExperimentPhaseCards = ({
  phases = [],
  title = '実験フェーズ',
  description = '実験は以下のフェーズに分けて実施されました',
}) => {
  if (!phases || phases.length === 0) {
    return null;
  }

  return (
    <div className="my-6">
      {title && <h4 className="text-lg font-medium mb-3 text-primary">{title}</h4>}
      {description && <p className="text-text mb-4">{description}</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {phases.map((phase, index) => (
          <div
            key={index}
            className="bg-white shadow-sm rounded-lg border border-primary/10 overflow-hidden transition-all hover:shadow-md hover:border-primary/30"
          >
            <div className="bg-gradient-to-r from-primary-light to-secondary-light p-3">
              <h5 className="font-semibold text-primary">{phase.title}</h5>
              {phase.subtitle && <p className="text-xs text-secondary mt-1">{phase.subtitle}</p>}
            </div>
            <div className="p-4">
              {phase.changes && (
                <>
                  <p className="text-sm font-medium text-secondary mb-1">変更点:</p>
                  <p className="text-sm mb-3">{phase.changes}</p>
                </>
              )}
              {phase.challenges && (
                <>
                  <p className="text-sm font-medium text-accent mb-1">課題:</p>
                  <p className="text-sm">{phase.challenges}</p>
                </>
              )}
              {phase.results && (
                <>
                  <p className="text-sm font-medium text-primary mb-1 mt-3">結果:</p>
                  <p className="text-sm">{phase.results}</p>
                </>
              )}
            </div>
            {phase.completion && (
              <div className="px-4 pb-3">
                <div className="w-full bg-divider rounded-full h-2.5">
                  <div
                    className="bg-primary h-2.5 rounded-full"
                    style={{ width: `${phase.completion}%` }}
                  ></div>
                </div>
                <p className="text-xs text-right mt-1 text-secondary">
                  完了率: {phase.completion}%
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperimentPhaseCards;

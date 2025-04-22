import React from 'react';

/**
 * 実験テーブルを表示するコンポーネント
 *
 * @param {string} title - テーブルのタイトル
 * @param {string[]} columns - カラム名の配列
 * @param {string[][]} rows - 行データの二次元配列
 * @param {boolean} highlight - 強調表示するかどうか (オプション)
 */
export default function ExperimentTable({ title, columns, rows, highlight = false }) {
  if (!columns || !Array.isArray(columns) || !rows || !Array.isArray(rows)) {
    console.error('ExperimentTable requires valid columns and rows arrays');
    return <div className="text-red-500">Table data is missing or invalid</div>;
  }

  return (
    <div className="my-6 overflow-x-auto">
      {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-primary-light">
            {columns.map((column, index) => (
              <th key={index} className="px-4 py-2 border border-primary/20 text-left text-primary">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-4 py-2 border border-primary/20">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

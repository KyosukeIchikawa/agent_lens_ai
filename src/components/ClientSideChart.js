import React, { useEffect, useState } from 'react';
import { Bar, Scatter, Line } from 'react-chartjs-2';

/**
 * クライアントサイドでのみレンダリングされるBar Chart
 * サーバーサイドレンダリング問題を回避するために使用
 */
export const ClientSideBarChart = ({ data, options }) => {
  // モバイル状態の検出
  const [chartOptions, setChartOptions] = useState(options);
  const [isMobile, setIsMobile] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  // クライアントサイドでのみ実行される処理
  useEffect(() => {
    setHasMounted(true);
    
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setIsMobile(isMobile);
      
      setChartOptions({
        ...options,
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 1000,
          easing: 'easeOutQuad'
        },
        plugins: {
          ...options.plugins,
          legend: {
            ...options.plugins?.legend,
            position: isMobile ? 'bottom' : 'top',
            align: 'center',
            labels: {
              boxWidth: isMobile ? 8 : 12,
              padding: isMobile ? 8 : 10,
              font: {
                size: isMobile ? 9 : 12
              }
            }
          },
          title: {
            ...options.plugins?.title,
            font: {
              ...(options.plugins?.title?.font || {}),
              size: isMobile ? 11 : 14
            }
          }
        },
        scales: {
          ...options.scales,
          y: {
            ...options.scales?.y,
            beginAtZero: true, // ゼロから始めることを明示
            ticks: {
              ...(options.scales?.y?.ticks || {}),
              font: {
                size: isMobile ? 8 : 10
              }
            },
            title: {
              ...(options.scales?.y?.title || {}),
              display: true,
              font: {
                size: isMobile ? 9 : 11
              }
            }
          },
          x: {
            ...options.scales?.x,
            ticks: {
              ...(options.scales?.x?.ticks || {}),
              font: {
                size: isMobile ? 8 : 10
              },
              maxRotation: isMobile ? 45 : 0,
              minRotation: isMobile ? 45 : 0
            },
            title: {
              ...(options.scales?.x?.title || {}),
              display: true,
              font: {
                size: isMobile ? 9 : 11
              }
            }
          }
        }
      });
    };

    // 初回レンダリング時に実行
    handleResize();

    // リサイズイベントのリスナーを追加
    window.addEventListener('resize', handleResize);

    // クリーンアップ関数
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [options]);

  if (!hasMounted) {
    return <div className="h-full w-full flex items-center justify-center">
      <p className="text-primary">グラフを読み込み中...</p>
    </div>;
  }

  return (
    <div className="h-full w-full">
      <Bar 
        data={data} 
        options={{
          ...chartOptions,
          // アニメーションの明示的な設定
          animation: {
            ...chartOptions.animation,
            // 下から上へのアニメーション設定
            origin: {
              y: 1
            }
          }
        }} 
        style={{ 
          maxHeight: '100%', 
          width: '100%'
        }} 
      />
    </div>
  );
};

/**
 * クライアントサイドでのみレンダリングされるScatter Chart
 * サーバーサイドレンダリング問題を回避するために使用
 */
export const ClientSideScatterChart = ({ data, options }) => {
  // モバイル状態の検出
  const [chartOptions, setChartOptions] = useState(options);
  const [isMobile, setIsMobile] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  // クライアントサイドでのみ実行される処理
  useEffect(() => {
    setHasMounted(true);
    
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setIsMobile(isMobile);
      
      setChartOptions({
        ...options,
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          ...options.plugins,
          legend: {
            ...options.plugins?.legend,
            position: isMobile ? 'bottom' : 'top',
            align: 'center',
            labels: {
              boxWidth: isMobile ? 8 : 12,
              padding: isMobile ? 8 : 10,
              font: {
                size: isMobile ? 9 : 12
              }
            }
          },
          title: {
            ...options.plugins?.title,
            font: {
              ...(options.plugins?.title?.font || {}),
              size: isMobile ? 11 : 14
            }
          }
        },
        scales: {
          ...options.scales,
          y: {
            ...options.scales?.y,
            ticks: {
              ...(options.scales?.y?.ticks || {}),
              font: {
                size: isMobile ? 8 : 10
              }
            },
            title: {
              ...(options.scales?.y?.title || {}),
              display: true,
              font: {
                size: isMobile ? 9 : 11
              }
            }
          },
          x: {
            ...options.scales?.x,
            ticks: {
              ...(options.scales?.x?.ticks || {}),
              font: {
                size: isMobile ? 8 : 10
              }
            },
            title: {
              ...(options.scales?.x?.title || {}),
              display: true,
              font: {
                size: isMobile ? 9 : 11
              }
            }
          }
        }
      });
    };

    // 初回レンダリング時に実行
    handleResize();

    // リサイズイベントのリスナーを追加
    window.addEventListener('resize', handleResize);

    // クリーンアップ関数
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [options]);

  if (!hasMounted) {
    return <div className="h-full w-full flex items-center justify-center">
      <p className="text-primary">グラフを読み込み中...</p>
    </div>;
  }

  return (
    <div className="h-full w-full">
      <Scatter 
        data={data} 
        options={chartOptions} 
        style={{ 
          maxHeight: '100%', 
          width: '100%'
        }} 
      />
    </div>
  );
};

/**
 * クライアントサイドでのみレンダリングされるLine Chart
 * サーバーサイドレンダリング問題を回避するために使用
 */
export const ClientSideLineChart = ({ data, options }) => {
  // モバイル状態の検出
  const [chartOptions, setChartOptions] = useState(options);
  const [isMobile, setIsMobile] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  // クライアントサイドでのみ実行される処理
  useEffect(() => {
    setHasMounted(true);
    
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setIsMobile(isMobile);
      
      setChartOptions({
        ...options,
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          ...options?.plugins,
          legend: {
            ...(options?.plugins?.legend || {}),
            position: isMobile ? 'bottom' : 'top',
            align: 'center',
            labels: {
              boxWidth: isMobile ? 8 : 12,
              padding: isMobile ? 8 : 10,
              font: {
                size: isMobile ? 9 : 12
              }
            }
          },
          title: {
            ...(options?.plugins?.title || {}),
            font: {
              ...(options?.plugins?.title?.font || {}),
              size: isMobile ? 11 : 14
            }
          }
        },
        scales: {
          ...(options?.scales || {}),
          y: {
            ...(options?.scales?.y || {}),
            ticks: {
              ...(options?.scales?.y?.ticks || {}),
              font: {
                size: isMobile ? 8 : 10
              }
            },
            title: {
              ...(options?.scales?.y?.title || {}),
              display: true,
              font: {
                size: isMobile ? 9 : 11
              }
            }
          },
          x: {
            ...(options?.scales?.x || {}),
            ticks: {
              ...(options?.scales?.x?.ticks || {}),
              font: {
                size: isMobile ? 8 : 10
              }
            },
            title: {
              ...(options?.scales?.x?.title || {}),
              display: true,
              font: {
                size: isMobile ? 9 : 11
              }
            }
          }
        }
      });
    };

    // 初回レンダリング時に実行
    handleResize();

    // リサイズイベントのリスナーを追加
    window.addEventListener('resize', handleResize);

    // クリーンアップ関数
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [options]);

  if (!hasMounted) {
    return <div className="h-full w-full flex items-center justify-center">
      <p className="text-primary">グラフを読み込み中...</p>
    </div>;
  }

  return (
    <div className="h-full w-full">
      <Line 
        data={data} 
        options={chartOptions} 
        style={{ 
          maxHeight: '100%', 
          width: '100%'
        }} 
      />
    </div>
  );
};
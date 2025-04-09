const { spawn } = require('child_process');
const { exec } = require('child_process');

// Next.jsの起動コマンドを実行し、その出力からポート番号を検出する
const nextProcess = spawn('npx', ['next', 'dev'], { shell: true });

console.log('Next.jsサーバーを起動中...');

let portDetected = false;
let timer = null;

// 標準出力からポート番号を検出
nextProcess.stdout.on('data', (data) => {
  const output = data.toString();
  console.log(output);
  
  // 新しいNext.jsの出力パターンに合わせてポート番号を検出
  // パターン1: "- Local:        http://localhost:3010"
  const localPortMatch = output.match(/- Local:\s+http:\/\/localhost:(\d+)/);
  if (localPortMatch && !portDetected) {
    const port = localPortMatch[1];
    openBrowserAtPort(port);
  }
  
  // パターン2: "⚠ Port 3000 is in use, trying 3001 instead."
  const tryingPortMatch = output.match(/trying (\d+) instead/);
  if (tryingPortMatch && !portDetected) {
    // このメッセージだけでは不十分なので、すぐにブラウザは開かない
    console.log(`Next.jsはポート${tryingPortMatch[1]}を試しています...`);
  }
  
  // パターン3: "ready - started server on" (古いバージョンのNext.jsの場合)
  const startedServerMatch = output.match(/started server on .+?:(\d+)/i);
  if (startedServerMatch && !portDetected) {
    const port = startedServerMatch[1];
    openBrowserAtPort(port);
  }
});

// 指定したポートでブラウザを開く関数
function openBrowserAtPort(port) {
  if (portDetected) return; // 既にブラウザを開いていたら何もしない
  
  portDetected = true;
  console.log(`Next.jsはポート${port}で実行中です。ブラウザを開きます...`);
  
  // open-cliを使って正しいポートでブラウザを開く
  exec(`npx open-cli http://localhost:${port}`, (error) => {
    if (error) {
      console.error('ブラウザを開く際にエラーが発生しました:', error);
    }
  });
  
  // タイマーがセットされていれば解除
  if (timer) {
    clearTimeout(timer);
  }
}

// エラー出力を表示
nextProcess.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

// プロセス終了時の処理
nextProcess.on('close', (code) => {
  console.log(`Next.jsサーバーが終了しました。終了コード: ${code}`);
});

// 一定時間後にポートが検出されなければデフォルトポートを試す
timer = setTimeout(() => {
  if (!portDetected) {
    console.log('ポート情報が検出できませんでした。デフォルトポート(3000)でブラウザを開きます...');
    exec('npx open-cli http://localhost:3000', (error) => {
      if (error) {
        console.error('ブラウザを開く際にエラーが発生しました:', error);
      }
    });
  }
}, 10000); // 10秒待機（より長く待機するように変更）

// プロセス終了時に子プロセスも終了させる
process.on('SIGINT', () => {
  nextProcess.kill();
  process.exit();
});
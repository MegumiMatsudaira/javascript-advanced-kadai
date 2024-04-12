// 変数の初期化
let untyped = '';
let typed = '';
let score = 0;

// 必要なHTMLの取得
const untypedfield = document.getElementById('untyped');
const typedfield = document.getElementById('typed');
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');
const count = document.getElementById('count');
const countUp = document.getElementById('countup');


// 複数のテキストを格納する配列
const textList = [
  'Hello World','This is my App','How are you?',
  'Today is sunny','I love JavaScript!','Good morning',
  'I am Japanese','Let it be','Samurai',
  'Typing Game','Information Technology',
  'I want to be a programmer','What day is today?',
  'I want to build a web app','Nice to meet you',
  'Chrome Firefox Edge Safari','machine learning',
  'Brendan Eich','John Resig','React Vue Angular',
  'Netscape Communications','undefined null NaN',
  'Thank you very much','Google Apple Facebook Amazon',
  'ECMAScript','console.log','for while if switch',
  'var let const','Windows Mac Linux iOS Android',
  'programming'
];

// ランダムなテキストを表示する機能
const createText = () => {

  // 正タイプした文字列を初期化（クリア）
  typed = '';
  typedfield.textContent = typed;

  let random = Math.floor(Math.random() * textList.length);
  untyped = textList[random];
  untypedfield.textContent = untyped;
};
// createText();

// キー入力の判定ができる機能
const keyPress = e => {
  // console.log(e.key);

  // untypedの先頭を取得
  untypedFirst = untyped.substring(0, 1);
  // 入力キーuntypedの先頭が一致するか確認
  if(e.key !== untypedFirst){
    wrap.classList.add('mistyped');
    setTimeout(() => {
      wrap.classList.remove('mistyped');
    }, 100)
    return;
  } 
  // 正タイプの場合
  score++ //スコアのインクリメント
  countUp.textContent = score;
  wrap.classList.remove('mistyped');
  typed += untyped.substring(0 , 1);
  untyped = untyped.substring(1);
  typedfield.textContent = typed;
  untypedfield.textContent = untyped;

  // テキストがなくなったら新しいテキストを表示
  if(untyped === ''){
    createText();
  }

};

// タイピングスキルのランクを判定する機能
const rankCheck = score => {
  // return `${score}文字おてました！`
  // テキストを格納する変数を作る
  let text = '';
  // スコアに応じで異なるメッセージを変数textに格納する
  if(score < 100){
    text = `あなたのタンクはCです。\nBランクまであと${100 - score}文字です。`;
  } else if(score < 200){
    text = `あなたのタンクはBです。\nAランクまであと${200 - score}文字です。`;
  } else if(score < 300){
    text = `あなたのタンクはAです。\nSランクまであと${300 - score}文字です。`;
  } else if(score < 300){
    text = `あなたのタンクはSです。\nおめでとうございます。`;
  }
  return `${score}文字打てました。\n${text}\n【OK】リトライ / 【キャンセル】終了`;
  
};

// ゲームを終了する機能
const gameOver = id => {
  clearInterval(id);
  // console.log('ゲーム終了！')
  const result = confirm(rankCheck(score));

  // OKボタンがクリックされたらリロードする
  if(result == true){
    window.location.reload();
  }
};

// カウントダウンタイマーの機能
const timer = () => {
  // カウントダウンの数字取得
  let time = count.textContent;

  // const 定数 = setInterval(() => {
  //   処理;
  // }, 処理間隔);
  
  const id = setInterval(() => {
    // countdown
    time--;
    count.textContent = time;
    if(time <= 0){
      // clearInterval(id);
      gameOver(id);
    }
  } , 1000);

};

// キーボードのイベント処理
// document.addEventListener('keypress' , keyPress);

// タイマースタート時の処理
start.addEventListener('click' , () => {

  // timer start
  timer();

  // ランダムなテキスト表示
  createText();
  // start button hidden
  start.style.display = 'none';
  
  // keyboard event
  document.addEventListener('keypress' , keyPress);

});
untypedfield.textContent = 'スタートボタンで開始';




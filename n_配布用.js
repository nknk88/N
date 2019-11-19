/*Only CSS amazing preloader (fix 27.10.2014)*/

/*Inspired by Handel Eugene --> (dribbble GIF link) */

/*by Troshkin Pavel troshkin.pavel@yandex.ru*/

/***

This is a pure-CSS3 clock. It uses CSS animations and shapes, without any images or JavaScript.

***/

// Created for an Articles on:
// https://www.html5andbeyond.com/bubbling-text-effect-no-canvas-required/

jQuery(document).ready(function($){
 
    // Define a blank array for the effect positions. This will be populated based on width of the title.
    var bArray = [];
    // Define a size array, this will be used to vary bubble sizes
    var sArray = [4,6,8,10];
 
    // Push the header width values to bArray
    for (var i = 0; i < $('.bubbles').width(); i++) {
        bArray.push(i);
    }
     
    // Function to select random array element
    // Used within the setInterval a few times
    function randomValue(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }
 
    // setInterval function used to create new bubble every 350 milliseconds
    setInterval(function(){
         
        // Get a random size, defined as variable so it can be used for both width and height
        var size = randomValue(sArray);
        // New bubble appeneded to div with it's size and left position being set inline
        // Left value is set through getting a random value from bArray
        $('.bubbles').append('<div class="individual-bubble" style="left: ' + randomValue(bArray) + 'px; width: ' + size + 'px; height:' + size + 'px;"></div>');
         
        // Animate each bubble to the top (bottom 100%) and reduce opacity as it moves
        // Callback function used to remove finsihed animations from the page
        $('.individual-bubble').animate({
            'bottom': '100%',
            'opacity' : '-=0.7'
        }, 3000, function(){
            $(this).remove()
        }
        );
 
 
    }, 350);
 
});
// グローバル  div要素を格納
tiles = [];

window.onload = function() {
    
    var arr = ['', '1', '2', '3', '4', '5', '6', '7', '8'];
    // シャッフル
    shuffle(arr);

    var panel = document.getElementById('panel');
    
    // div要素作成
    for (i = 0; i < 9; i++){
        var div = document.createElement('div');
        div.className = 'tile';
        div.index = i;
        div.textContent = arr[i];
        div.onclick = click;
        panel.appendChild(div);
        tiles.push(div);
    }
} 

// シャッフル用関数
function shuffle(arr) {
    var n = arr.length;
    var temp, i;

    while (n) {
        i = Math.floor(Math.random() * n--);
        temp = arr[n];
        arr[n] = arr[i];
        arr[i] = temp;
    }
    return arr;
}

// タイルのtextContentを入れ替える
function swapContent(i, k){
    
    var temp = tiles[i].textContent;
    tiles[i].textContent = tiles[k].textContent;
    tiles[k].textContent = temp;
    
}

// クリック時の処理
function click(e) {
    
    var i = e.target.index;

    if (i <= 5 && tiles[i + 3].textContent == '' ){
        // 下と入れ替え
        swapContent(i, i + 3);
    }else if ( i >= 3 && tiles[i - 3].textContent == ''){
        // 上と入れ替え
        swapContent(i, i - 3);
    }else if (i % 3 !== 2 && tiles[i + 1].textContent == ''){
        // 右と入れ替え
        swapContent(i, i + 1);
    }else if (i % 3 !== 0 && tiles[i - 1].textContent == ''){
        // 左と入れ替え
        swapContent(i, i - 1);
    }
}

// 描画用フラグ  true: 描画中   false: 描画中でない
var flgDraw = false;

// 座標
var gX = 0;
var gY = 0;

// 描画色
var gColor = 'white';

window.onload = function() {
    
    // イベント登録
    // マウス
    var canvas = document.getElementById('canvas');
   
    canvas.addEventListener('mousedown', startDraw, false);
    canvas.addEventListener('mousemove', Draw, false);
    canvas.addEventListener('mouseup', endDraw, false);
    
    // セレクトボックス
    var s = document.getElementById('color');
    s.addEventListener('change', changeColor, false);
    
} 
// セレクトボックス変更時に色を変更する
function changeColor(){

    gColor = document.getElementById('color').value;
    console.log(gColor);
    
}
// 描画開始
function startDraw(e){
    
    flgDraw = true;
    gX = e.offsetX;
    gY = e.offsetY;
    
}

// 描画
function Draw(e){
    
    if (flgDraw == true){
        
        // '2dコンテキスト'を取得
        var canvas = document.getElementById('canvas');
        var con = canvas.getContext('2d');

        var x = e.offsetX;
        var y = e.offsetY;

        // 線のスタイルを設定
        con.lineWidth = 3;
        // 色設定
        con.strokeStyle = gColor;

        // 描画開始
        con.beginPath();
        con.moveTo(gX, gY);
        con.lineTo(x, y);
        con.closePath();
        con.stroke();

        // 次の描画開始点
        gX = x;
        gY = y;
        
    }
}

// 描画終了
function endDraw(){
    
    flgDraw = false;
    
}
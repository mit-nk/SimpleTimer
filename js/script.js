window.addEventListener('load', function(){
/*-----------------------------------------------
Timer - v1.1 - mit-nk
v1.1 分、秒のインプットタグをクリックすると、自動で選択できるように修正。
------------------------------------------------*/
//変数

    var remain; //残り合計時間
    var TimerId; //setInterval
    var setMinute; //セットした分
    var setSecond; //セットした秒
    var running = false; //プログラム状態チェック用。
    var startButton = document.getElementById('start');
    var stopButton = document.getElementById('stop');
    var minute = document.getElementsByTagName('input')[0];
    var second = document.getElementsByTagName('input')[1];

//--------------------------------------------------
//Timer関数

    function setButton(start, stop) { //ボタンの半透明切り替え
        startButton.className = start ? 'push active' : 'push inactive' ;
        stopButton.className = stop ? 'push active' : 'push inactive' ;
    }

    setButton(true, false);//初期ボタン設定

    function timerWrite() { //画面描写
        minute.value = Math.floor(remain / 60);
        second.value = remain % 60;
    }

    function stopTimer() { //停止処理
        if (!running) return; //runningがfalse(停止中)ならreturn;を返す。
        running = false;
        setButton(true, false);
        clearInterval(timeId);
    }

    function callTimer() {//タイマー開始処理
        if (running) return;//runningがtrueであればreturn;
        running = true;
        setButton(false,true);
        if (minute.value === '' && second.value === '' || parseInt(minute.value) <= 0 && parseInt(second.value) <= 0) { // FormCheck -&0 対策
            alert('Please input a value');
            minute.value = "0";
            second.value = "0";
            stopTimer();
            return; // -またはemptyはreturn
        } else if(minute.value === '' || second.value === '' || parseInt(minute.value) < 0 || parseInt(second.value) < 0){
            minute.value = "0";
            second.value = "0";
        }
        setMinute = minute.value;
        setSecond = second.value;

        remain = parseInt(minute.value) * 60 + parseInt(second.value); //ここはクリックした時一度しか処理しない。
        timeId = setInterval(function() {
            remain--;
                timerWrite(); //画面書き出し。
            if (remain <= 0){ //終了処理
                alert('TIME UP');
                minute.value = setMinute;
                second.value = setSecond;
                stopTimer(); //Intervalを空に。
            }
        }, 1000);
    }
//-----------------------------------------------------------
//イベントリスナー

    startButton.addEventListener('click', callTimer, false);
    stopButton.addEventListener('click', stopTimer, false);
    minute.addEventListener('click', function(){
        this.select();
    });
    second.addEventListener('click', function(){
        this.select();
    });
});
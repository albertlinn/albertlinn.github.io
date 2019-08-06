document.getElementById('swapImage').onclick = function(){
    swapImage();
    playPause();
};
document.getElementById("repeatImage").onclick = function() {
	repeat();
}
document.getElementById("nextImage").onclick = function() {
	forward();
}

document.getElementById("backImage").onclick = function() {
	backward();
}

document.getElementById("shuffleImage").onclick = function() {
	shuffle();
}

document.getElementById("volumnmute").onclick = function() {
	volumnmute();
}

var imagetracker = "play_circle_outline";
//swapIconImage
var swapImage = function(){
    var image = document.getElementById('swapImage');
    if(imagetracker == 'play_circle_outline'){
        imagetracker = "pause_circle_filled";
        image.innerHTML = "pause_circle_filled";
    }else{
        imagetracker = "play_circle_outline";
        image.innerHTML = "play_circle_outline";
    }
};

//playing flag
var musicTracker = 'noMusic';
//playing audios
var audios = [];
$(".song").each(function(){
var load = new  Audio($(this).attr("url"));
    load.load();
    load.addEventListener('ended',function(){
    forward();
    });
    audios.push(load);
});
//active track
var activeTrack = 0;

var playPause = function() {
    if (musicTracker == 'noMusic') {
        audios[activeTrack].play();
        totalTime();
        currentTime();
        musicTracker = 'playMusic';
    } else {
        audios[activeTrack].pause();
        musicTracker = 'noMusic';
    }
    showPlaying();
};

//loop song
var repeat = function() {
    var repeat = document.getElementById('repeatImage');
    if (audios[activeTrack].loop == false) {
        /*audios[activeTrack].pause();
        audios[activeTrack].currentTime = 0;
        audios[activeTrack].play();*/
        audios[activeTrack].loop = true;
        repeat.style.color="#AAAAAA	";
    } else {
        audios[activeTrack].loop = false;
        repeat.style.color="#FFFFFF";
    }
};
/*
//get randon number
function getRandom(min,max){
    return Math.floor(Math.random()*(max-min+1))+min;
};

var shuffleTrak = 0;
var preactiveTrack = 6;
function getRandom(min,max){
    return Math.floor(Math.random()*(max-min+1))+min;
};
//shuffle
var shuffle = function() {
    var shuffle = document.getElementById('shuffleImage');
    if( shuffleTrak != 1 ){
        preactiveTrack = activeTrack;
        activeTrack=getRandom(0,4);
        if(activeTrack!=preactiveTrack){
            activeTrack=activeTrack-1;
            console.log(activeTrack);
            shuffleTrak = 1;
            console.log(shuffleTrak);
        }else{
            activeTrack = 3;
            shuffleTrak = 1;
        }
    }else{
        shuffleTrak=0;
        activeTrack=preactiveTrack;
        console.log(activeTrack);
    }
};
*/


//go to the next song
var forward = function(){
    function increment(){
        if (activeTrack < audios.length - 1){
            activeTrack++;
            audios[activeTrack-1].currentTime = 0;
        }
        else activeTrack = 0;
    }
    if (musicTracker == 'playMusic') {
        audios[activeTrack].pause();
        //audios[activeTrack].currentTime = 0;
        increment();
        totalTime();
        audios[activeTrack].play();
    } else {
        audios[activeTrack].currentTime = 0;
        totalTime();
        increment();
    }
    showPlaying();
};

//go to the previous song
var backward = function(){
    function decrement(){
        if (activeTrack > 0){
            activeTrack--;
            audios[activeTrack+1].currentTime = 0;
        }   
        else activeTrack = audios.length -1;
    }
    if (musicTracker == 'playMusic') {
        audios[activeTrack].pause();
        //audios[activeTrack].currentTime = 0;
        decrement();
        totalTime();
        audios[activeTrack].play();
    } else {
        audios[activeTrack].currentTime = 0;
        totalTime();
        decrement();
    }
    showPlaying();
};

//bar current time and control playing dot
var currentTime = function(){
    setInterval(change, 1000);
    function change() {
        var durationTime = audios[activeTrack].duration;
        var btn = document.getElementById("playing-btn");
        var currentTime = document.getElementById('current-time');
        var EntierTime = Math.floor(audios[activeTrack].currentTime);
        var minuteTime = Math.floor(EntierTime/60);
        //player dot
        btn.style.left= EntierTime/durationTime*100 +"%";
        if((EntierTime%60)<10){
            currentTime.innerHTML= "0" + minuteTime +":"+ "0" + EntierTime%60;
        }else{
            currentTime.innerHTML= "0" + minuteTime +":" + EntierTime%60;
        }
    }
};

//get totaltime
var totalTime = function(){
    var totalTime = document.getElementById('totalTime');
    total = audios[activeTrack].duration;
    EntierSecond = Math.floor(total)%60;
    EntierMinite = Math.floor(total/60);
    if((EntierMinite<10)&&(EntierSecond<10))
    {
        totalTime.innerHTML = "0" + EntierMinite + ":" + "0"+EntierSecond;
    }else if((EntierMinite<10)&&(EntierSecond>10)){
        totalTime.innerHTML = "0" + EntierMinite + ":" + EntierSecond;
    }else{
        totalTime.innerHTML = EntierMinite + ":" + EntierSecond;
    }
};

//control volume
var volumeTraker = 1;
var volumnmute =function(){
    var volume = document.getElementById('volumnmute');
    if(audios[activeTrack].volume != 0){
        volume.innerHTML = "volume_off";
        audios[activeTrack].volume = 0;
        volumeTraker = 0;
    }
    else{
        volume.innerHTML = "volume_up";
        audios[activeTrack].volume = 1;
        volumeTraker = 1;
    }
}

setInterval(change, 1000);
function change() {
    var range = document.getElementById("range").value;
    var volume = document.getElementById('volumnmute');
    //console.log(range);
    if( (volumeTraker == 0)||(range==0)){
        volume.innerHTML = "volume_off";
        audios[activeTrack].volume=0;
    }else{
        volume.innerHTML = "volume_up";
        audios[activeTrack].volume=range/100;
    }
}


//show the playing song
var showPlaying = function()
{
    var src = audios[activeTrack].src;
    var index = activeTrack + 1;
    $(".song").removeClass("playing");
    $(".playlist li:nth-child(" + index +")").addClass("playing");
    //$("div>ul>li[url='" + src + "']").addClass("playing");
    console.log( $("div[url='" + src + "']"));
};
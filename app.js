const playBtn = document.getElementById("play"),
          prevBtn =   document.getElementById("prev"),
          nextBtn      =       document.getElementById("next"),
          stopBtn      =       document.getElementById("stop");

const audioScreen = document.getElementById("audioScreen");


const progressContainer = document.getElementById("progressContainer"),
          progress                = document.getElementById("progress");

const volumeProgress    = document.getElementById("volumeProgress");

const displayTime       =  document.getElementById("displayTime");



let audios = ['sample_1','sample_2','sample_3'];
let currentIdx = 0;

const loadAudio = (audio)=> {
        audioScreen.src = `./soursces/${audio}.mp3`;
}

loadAudio(audios[currentIdx]);


const playAudio = () => {
        playBtn.querySelector("fas").classList.remove("fa-play");
        playBtn.querySelector("fas").classList.add("fa-pause");
        audioScreen.play();
}


const pauseAudio = () => {
        playBtn.querySelector("fas").classList.remove("fa-pause");
        playBtn.querySelector("fas").classList.add("fa-play");
        audioScreen.pause();
}


const playAndPauseAudio = () => {
        if(audioScreen.paused){
                audioScreen.play();
        }else{
                audioScreen.pause();
        }
}


const prevAudio = () => {
        currentIdx--;
        if(currentIdx < 0){
                currentIdx = audios.length -1;
        }
        loadAudio(audios[currentIdx]);
        playAudio();
}


const nextAudio = () => {
        currentIdx++;
        if(currentIdx > audios.length -1){
                currentIdx = 0;
        }

        loadAudio(audios[currentIdx]);
        playAudio();
}

const stopAudio = () => {
        audioScreen.currentTime = 0;
        progress.value = audioScreen.currentTime;
        pauseAudio();
}



const updateProgress = (e) => {
        const {currentTime} = e.target;
        const {duration} = e.target;

        if(audioScreen.currentTime === 0){
                audioScreen.style.width = `0%`;
        }else {
                const progressPerccents = (currentTime/duration)*100;
                audioScreen.style.width = `${progressPerccents}%`;
        }
        const mins = Math.floor(audioScreen.currentTime / 60);
        const secs  = Math.floor(audioScreen.currentTime % 60);

        const minsValue = mins.toString().padStart(2,'0');
        const secsValue  = secs.toString().padStart(2,'0');
        displayTime.innerText = `${minsValue}:${secsValue}`;
}

const setAudioProgress = (e) => {
        const clickWidth = this.clientWidth;
        const clickX = e.offsetX;
        const {duration} = audioScreen.duration;
        audioScreen.currentTime = (clickX/clickWidth) * duration;
}



const volumeControlAudio = () => {
        // console.log(volumeProgress.value);

        audioScreen.volume = volumeProgress.value/100; // 1

        /**
         * volume keyword came from audio & video api
         * 1 is default = 100%
         * 0.5 half volume = 50%
         * 0 is mute = 0%
         */

}

audioScreen.addEventListener("timeupdate", updateProgress);
audioScreen.addEventListener("click", playAudio);
audioScreen.addEventListener("click", pauseAudio);

playBtn.addEventListener("click",playAndPauseAudio);
prevBtn.addEventListener("click", prevAudio);
nextBtn.addEventListener("click",nextAudio);
stopBtn.addEventListener("click",stopAudio);

progressContainer.addEventListener("click",setAudioProgress);
volumeProgress.addEventListener("click", volumeControlAudio);











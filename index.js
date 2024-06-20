const pause = document.querySelector('.pause');
let input = document.querySelector('.length');
let resetValue = document.querySelector('.reset');

function start(){

    let timerInterval, brick;
    pause.innerHTML == '▷' ? pause.innerHTML = '| |' : pause.innerHTML = '▷';



    let startTime = String(input.value).split(':')
    let timeLimitInMinutes = +startTime[0];
    let timeLimitInSeconds = timeLimitInMinutes * 60 + +startTime[1];

    if (pause.innerHTML == '| |'){
        for (let i = 0; i < timeLimitInSeconds; i++){
            brick = document.createElement('img');
            brick.setAttribute('src', 'brick.png');
            brick.setAttribute('id', 'brick' + i);
            brick.style.width = '40px';
            brick.className = 'brick'
            brick.style.height = '40px';
            document.body.append(brick)
        }
    }
    
    function startTimer() {
        timeLimitInSeconds--;
        let minutes = Math.floor(timeLimitInSeconds / 60);
        let seconds = timeLimitInSeconds % 60;

        if (timeLimitInSeconds < 0) {
            input.value = '00:00';
            clearInterval(timerInterval);
            return;
        }

        minutes < 10 ? minutes = '0' + minutes : 0;
        seconds < 10 ? seconds = '0' + seconds : 0;
        input.value = minutes + ':' + seconds;

        let div_list = document.querySelectorAll('.brick'); // returns NodeList
        let div_array = [...div_list]; // converts NodeList to Array
        div_array[timeLimitInSeconds].remove();

        if (pause.innerHTML == '▷') {
            for (let i = 0; i < div_list.length; i++){
                div_list[i].remove();
            }
            clearInterval(timerInterval);
        }
    }

    pause.innerHTML == '| |' ? timerInterval = setInterval(startTimer, 1000) : timerInterval = 0;

}

function ten(){
    input.value = '15:00';
}

function fifteen(){
    input.value = '30:00';
}

function thirty(){
    input.value = '60:00';
}
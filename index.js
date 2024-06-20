const pause = document.querySelector('.pause');
let input = document.querySelector('.length');
let startMin = document.querySelectorAll('.startMin');
let container = document.querySelector('.container');

function start(){

    let regex = /^[a-zA-Z]+$/;
    if (input.value == '') return 0;
    if (regex.test(String(input.value))) {
        let error = document.createElement('span');
        error.className = 'error';
        error.innerHTML = 'Введите время в формате mm:ss'
        container.append(error);
        setTimeout(function(){error.remove()}, 3000)
        return 0;
    }
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

for (let i = 0; i < startMin.length; i++){
    startMin[i].addEventListener('click', function(){
        input.value = startMin[i].innerHTML + ':' + '00';
    })
}
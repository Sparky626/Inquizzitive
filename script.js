let genre;
let genreid;
let mode;
let score;
function muteunmute(){
    var audio = document.getElementById("player");
    if(audio.paused)
    {
        audio.play();
    }
    else{
        audio.pause();
    }
}
function sgamestart(clicked_id, clicked_genre){
    genreid = clicked_id;
    genre = clicked_genre;
    mode = 'survival';
    grid = document.getElementById('grid');
    img = document.getElementById('splashimg');
    quiz = document.getElementById('quiz');
    loadimg = document.getElementById('loadimg');
    loadimg.classList.add("fadeIn");
    loadimg.style.display = "block";
    setTimeout(function()
    {
        grid.style.display = "none";
        img.style.display = "none";
        quiz.classList.add("fadeIn");
        apigrabber();
            
    }, 100)
    
}
function igamestart(clicked_id, clicked_genre){
    genreid = clicked_id;
    genre = clicked_genre;
    mode = 'infinity';
    grid = document.getElementById('grid');
    img = document.getElementById('splashimg');
    quiz = document.getElementById('quiz');
    exit = document.getElementById('exit');
    loadimg = document.getElementById('loadimg');
    loadimg.classList.add("fadeIn");
    loadimg.style.display = "block";
    setTimeout(function()
    {
        grid.style.display = "none";
        img.style.display = "none";
        quiz.classList.add("fadeIn");
        exit.style.display = "block";
        apigrabber();
            
    }, 100)
    
}
function apigrabber(){
    (async () => {
        const tokendata = await fetchAPIData('https://opentdb.com/api_token.php?command=request')
        const token = tokendata.token;
        questionsetup(token);
    })()
}
async function fetchAPIData(link){
    try {
        let response = await fetch(link);
        let data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching token data:', error);
    }
}
function decodeHtml(encoded) {
    var text = document.createElement("textarea");
    text.innerHTML = encoded;
    return text.value;
}
function questionshuffle(answers){
    return answers.map((a) => ({ sort: Math.random(), value: a }))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value); 
}
function questionsetup(token){
    document.getElementById('quizheader').textContent = genre;
    (async () => {
        //console.log(token);
        //console.log("Request");
        const quizdata = await fetchAPIData('https://opentdb.com/api.php?amount=1&token=' + token + "&category=" + genreid)
        const questions = quizdata.results;
        const q = questions[0].question;
        document.getElementById('question').textContent = decodeHtml(q);
        const correct = questions[0].correct_answer;
        let answers = questions[0].incorrect_answers;
        const ansbtns = document.getElementById('answer-buttons');
        const scorebox = document.getElementById('score');
        score = scorebox.textContent;
        const nextbutton = document.getElementById('nxt');
        const quiz = document.getElementById('quiz');
        loadimg.style.display = "none";
        quiz.style.display = "block";
        answers.push(correct);
        answers = questionshuffle(answers);
        answers.forEach(answer =>{
            const button = document.createElement("button");
            button.innerHTML = decodeHtml(answer);
            button.classList.add("ansbtn");
            button.id = decodeHtml(answer);
            ansbtns.appendChild(button);
            button.addEventListener("click", (e) => {
                const clicked = e.target;
                if (clicked.textContent == decodeHtml(correct)){
                    clicked.style.background = "green";
                    clicked.style.color = "black";
                    score++;
                    scorebox.textContent = score;
                }
                else{
                    clicked.style.background = "red";
                    clicked.style.color = "black";
                }
                Array.from(ansbtns.children).forEach(button=>{
                    if(button.textContent == decodeHtml(correct)){
                        button.style.background = "green";
                        button.style.color = "black";
                    }
                    button.disabled = true;
                })
                nextbutton.textContent = "Next Question";
                nextbutton.style.display = "block";
                nextbutton.addEventListener("click", (e) => {
                    if (mode == 'survival' && clicked.style.background == "red"){
                        endGame(score);
                    }
                    else{
                        nextbutton.style.display = "none";
                        nextbutton.replaceWith(nextbutton.cloneNode(false));
                        resetstate(token);
                    }
                    
                })
            });
        });
    })()    
}
function resetstate(token){
    (async () => {
        const ansbtns = document.getElementById('answer-buttons');
        while(ansbtns.firstChild){
            ansbtns.removeChild(ansbtns.firstChild);
        }
        quiz = document.getElementById('quiz');
        loadimg = document.getElementById('loadimg');
        loadimg.style.display = "block";
        quiz.style.display = "none";
        setTimeout(function()
        {
            questionsetup(token);       
        }, 3000)
    })()
}
function endGame(){
    quiz = document.getElementById('quiz');
    quiz.style.display = "none";
    endimg = document.getElementById('loadimg');
    endimg.style.display = "block";
    gameend = document.getElementById('gameend');
    gameend.classList.add('fadeIn');
    gameend.style.display= "block";
    fscore = document.getElementById('fscore');
    fscore.innerHTML = "Final Score: " + score;
}
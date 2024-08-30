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
function gamestart(clicked_id, clicked_genre){
    genreid = clicked_id;
    genre = clicked_genre;
    grid = document.getElementById('grid');
    img = document.getElementById('splashimg');
    quiz = document.getElementById('quiz')
    grid.classList.add('fadeOut');
    img.classList.add('fadeOut');
    setTimeout(function()
    {
        
        grid.style.display = "none";
        img.style.display = "none";
        quiz.style.display = "block";
        quiz.classList.add('fadeIn');
        survivalgameloop(genreid, genre);
            
    }, 100)
    
}
function apicheck(){
    fetch('https://opentdb.com/api_token.php?command=request')
    .then(response => {
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        document.getElementById('apidisplay').textContent = "Token: " + data.token;
    })
    .catch(error => {
        console.error('Error:', error);
    });
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
function questionsetup(genreid,genre){

}
function survivalgameloop(genreid,genre){
    document.getElementById('quizheader').textContent = genre;

    (async () => {
        let active = true;
        const tokendata = await fetchAPIData('https://opentdb.com/api_token.php?command=request')
        const token = tokendata.token;
        const quizdata = await fetchAPIData('https://opentdb.com/api.php?amount=1&token=' + token + "&category=" + genreid)
        const questions = quizdata.results;
        const q = questions[0].question;
        document.getElementById('question').textContent = decodeHtml(q);
        const correct = questions[0].correct_answer;
        const answers = questions[0].incorrect_answers;
        const ansbtns = document.getElementById('answer-buttons');
        const scorebox = document.getElementById('score');
        var score = scorebox.textContent;
        answers.push(correct);
        answers.forEach(answer =>{
            const button = document.createElement("button");
            button.innerHTML = decodeHtml(answer);
            button.classList.add("ansbtn");
            button.id = decodeHtml(answer);
            ansbtns.appendChild(button);
            button.addEventListener("click", (e) => {
                const clicked = e.target;
                const nxt = document.getElementById('nxt');
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
                nxt.style.display = "block";
                nxt.addEventListener("click", (e) => {
                    nxt.style.display = "none";
            });
        });
    })()    
}
function infinitygameloop(genreid){
    document.getElementById('quizheader').textContent = genreid;
    (async () => {
        const tokendata = await fetchAPIData('https://opentdb.com/api_token.php?command=request')
        const token = tokendata.token;
        const quizdata = await fetchAPIData('https://opentdb.com/api.php?amount=10&token=' + token)
        const questions = quizdata.results;
        const q = questions[0].question;
        document.getElementById('question').textContent = decodeHtml(q);
        const correct = questions[0].correct_answer;
        const answers = questions[0].incorrect_answers;
        answers.push(correct);
        const shuffleanswers = questionshuffle(answers);
        var currid = ""
        console.log(question);
        console.log(shuffleanswers);
        console.log(correct);
        console.log(shuffleanswers.length);
        if (shuffleanswers.length < 3){
            const ans1 = document.getElementById('ans1');
            const ans2 = document.getElementById('ans2');
            const ans3 = document.getElementById('ans3');
            const ans4 = document.getElementById('ans4');
            ans1.style.display = "block";
            ans2.style.display = "block";
            ans3.style.display = "none";
            ans4.style.display = "none";

        }
        else{
            const ans1 = document.getElementById('ans1');
            const ans2 = document.getElementById('ans2');
            const ans3 = document.getElementById('ans3');
            const ans4 = document.getElementById('ans4');
            ans1.style.display = "block";
            ans2.style.display = "block";
            ans3.style.display = "block";
            ans4.style.display = "block";
        }
        for (let x in shuffleanswers){
            console.log(x);
            var num = parseInt(x);
            currid = "ans" + (num+1);
            document.getElementById(currid).textContent = decodeHtml(shuffleanswers[x]);
        }
        
    })()       
}
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
function gamestart(clicked_id){
    genre = clicked_id;
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
        survivalgameloop(genre);
    }, 100);
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
function questionshuffle(answers){
    return answers.map((a) => ({ sort: Math.random(), value: a }))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value); 
}
function survivalgameloop(genreid){
    document.getElementById('quizheader').textContent = genreid;
    (async () => {
        const tokendata = await fetchAPIData('https://opentdb.com/api_token.php?command=request')
        const token = tokendata.token;
        const quizdata = await fetchAPIData('https://opentdb.com/api.php?amount=10&token=' + token)
        const questions = quizdata.results;
        const q = questions[0].question;
        document.getElementById('question').textContent = unescape(q);
        const correct = questions[0].correct_answer;
        const answers = questions[0].incorrect_answers;
        answers.push(correct);
        const shuffleanswers = questionshuffle(answers);
        var currid = ""
        for (let x in shuffleanswers){
            console.log(x);
            var num = parseInt(x);
            currid = "ans" + (num+1);
            document.getElementById(currid).textContent = shuffleanswers[x];
        }
        
        
    })()    
}

function infinitygameloop(genreid){

}
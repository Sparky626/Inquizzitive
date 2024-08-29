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
    }, 1500);
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
function survivalgameloop(genreid){
    let tokendata;
    let quizdata;
    document.getElementById('quizheader').textContent = genreid;
    /*fetch('https://opentdb.com/api_token.php?command=request')
    .then(response => {
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        token = data.token;
        console.log(token);
        return data;
    })
    .catch(error => {
        console.error('Error:', error);
    });
    console.log(token);
    fetch('https://opentdb.com/api.php?amount=10&token=' + token)
    .then(response => {
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const keys = data.keys;
        const question = data.results.question;
        const ianswers = data.results.incorrectanswers; 
        const canswer = data.results.correctanswers;
        document.getElementById('question').textContent = question;
    })
    .catch(error => {
        console.error('Error:', error);
    });*/
    (async () => {
        const getData = async () => {
          const response = await fetch('https://opentdb.com/api_token.php?command=request');
          const data = await response.json();
          token = data.token;
          return data;
        };
      
        await getData();
        console.log(token);
      })();

}
function infinitygameloop(genreid){

}
var buttons = document.querySelectorAll(".movie_favorite > button");

buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
        var article = button.closest('article');

        var name = article.querySelector('.name').innerText;
        var genre = article.querySelector('.genre').innerText;
        var director = article.querySelector('.director').innerText;
        var runningTime = article.querySelector('.runningtime').innerText;

        console.log('영화 제목: ' + name);
        console.log('장르: ' + genre);
        console.log('감독: ' + director);
        console.log('상영 시간: ' + runningTime);
    });
});


    
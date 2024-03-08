var buttons = document.querySelectorAll(".movie_favorite > button");


let movies_info = [];
let cnt = 0;
buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
        var article = button.closest('article');

        var name = article.querySelector('.name').innerText;
        var genre = article.querySelector('.genre').innerText;
        var director = article.querySelector('.director').innerText;
        var runningTime = article.querySelector('.runningtime').innerText;

        let movie_info = {
            "title": name,
            "genre": genre,
            "director": director,
            "runningTime": runningTime
        };

        movies_info[movies_info.length] = movie_info;

        let favorite_list = document.getElementById("wish_list");

        localStorage.setItem("movies", JSON.stringify(movies_info));
        if (cnt >= 1) {
            favorite_list.innerText = favorite_list.innerText + movie_info.title + " | " + movie_info.genre + " | " + movie_info.director + " | " + movie_info.runningTime + "\n";
        } else {
            favorite_list.innerText = movie_info.title + " | " + movie_info.genre + " | " + movie_info.director + " | " + movie_info.runningTime + "\n";
        }
        cnt++;


        // console.log('영화 제목: ' + name);
        // console.log('장르: ' + genre);
        // console.log('감독: ' + director);
        // console.log('상영 시간: ' + runningTime);
    });
});



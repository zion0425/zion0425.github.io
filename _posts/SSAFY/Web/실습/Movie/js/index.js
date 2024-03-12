const req = new XMLHttpRequest();


req.open('GET', './data/movie.json', true);
req.send();

let rootTag = document.getElementById("left-content");

req.onload = () => {
    if (req.status == 200) {
        let json = JSON.parse(req.responseText);
        var cnt = 0;
        let text = "";
        json.movies.forEach((m) => {
            if (cnt++ % 4 == 0) {
                text += `<div class = "row mt-4">`;
            }
            text += `
            <div class="card col-md-6 col-lg-3 col-sm-12">
            <img src="${m.img}" class="card-img-top" alt="..." />
            <div class="card-body">
              <div class="row">
                  <p class="card-text">
                      <div class="movie_info row">
                          <div class="movie_content col-md-9">
                            <h5 class="name">${m.title}</h5>
                            <hr />
                            <div class="genre">${m.genre}</div>
                            <div class="director">${m.director}</div>
                            <div class="runningtime">${m.runningTime}분</div>
                          </div>
                          <div class="movie_favorite col-md-3">
                          <button
                              class="btn btn-light border border-black movie_favorite" style ="width:42px; height:42px;"
                              onclick = 
                            >
                            <svg 
                            width="16"
                            height="16"
                            fill="red"
                            class="bi bi-suit-heart-fill"
                            viewBox="0 0 16 16"
                          >
                            <path
                              d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1"
                            />
                          </svg>
                          </button>
    
                      </div>
                   </div>
                  </p>
              </div>
            </div>
          </div>
          `
            if (cnt % 4 == 0) {
                text += `</div>`;
            }
        });

        rootTag.innerHTML = text;

        var buttons = document.querySelectorAll(".movie_favorite > button");
        let movies_info = [];
        let cnt2 = 0;
        buttons.forEach((button) => {
            button.addEventListener("click", (e) => {
                var article = button.closest('.movie_info');

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

                tr = document.createElement("tr");
                td = document.createElement("td");

                td.innerText = movie_info.title + " | " + movie_info.genre + " | " + movie_info.director + " | " + movie_info.runningTime + "\n";
                tr.appendChild(td);
                favorite_list.appendChild(tr);

                localStorage.setItem("movies", JSON.stringify(movies_info));
                cnt2++;
            });
        });
    }
}

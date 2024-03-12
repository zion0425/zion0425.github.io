let logoutTag = document.querySelector("#logout");
let mypageTag = document.querySelector("#mypage");
let adminTag = document.querySelector("#admin");
let loginTag = document.querySelector("#login");
let signupTag = document.querySelector("#signup");

let a = document.querySelector(".profile_image_list > img:nth-child(2)");
let b = document.querySelector(".profile_image_list > img:nth-child(1)");

let req = new XMLHttpRequest()
let jsonReq = new XMLHttpRequest();

window.onload = () => {
    req.open("GET", "./data/programming.xml", true);
    req.send();
    jsonReq.open("GET", "./data/essay.json", true);
    jsonReq.send();
}

jsonReq.onload = () => {
    if (jsonReq.status == 200) {
        let json = JSON.parse(jsonReq.responseText);
        let programmingRootTag = document.getElementById("right-content");

        let essayInnerHtml = programmingRootTag.innerHTML;
        essayInnerHtml += `<div class="row fs-5 fw-bold">[ 에세이 ]</div><div class="row mt-3">`;

        json.forEach((m) => {
            essayInnerHtml += `
            <div class="card col-md-3">
            <img
              src="img/book/${m.isbn}.png"
              class="card-img-top"
              alt="..."
            />
            <div class="card-body">
              <h5 class="card-title">${m.title}</h5>
              <p class="card-text">
                (${m.price}원)
              </p>
            </div>
          </div>`
        });

        programmingRootTag.innerHTML = essayInnerHtml;
    }

}

req.onload = () => {
    if (req.status == 200) {
        let res = req.responseXML;

        let bookList = res.getElementsByTagName("book");

        let isbn = res.getElementsByTagName("isbn");
        let bookTitle = res.getElementsByTagName("title");
        let bookPrice = res.getElementsByTagName("price");

        let programmingRootTag = document.getElementById("right-content");
        let programmingInnerTexts = `<div div class="row fs-5 fw-bold" > [프로그래밍 언어]</div > <div class="row mt-3"> `;

        for (var i = 0; i < bookList.length; i++) {
            programmingInnerTexts += `
            <div class="card col-md-3">
              <img
                src="img/book/${isbn[i].innerHTML}.png"
                class="card-img-top"
                alt="..."
              />
              <div class="card-body">
                <h5 class="card-title">${bookTitle[i].innerHTML}</h5>
                <p class="card-text">${bookPrice[i].innerHTML}</p>
              </div >
            </div > `
        }
        programmingRootTag.innerHTML = programmingInnerTexts + `</div>`;
    }
}



if (window.localStorage.key("poll")) {
    let title = document.querySelector(".vote > .content");
    let cont = document.getElementById("vote_class");
    let voteDate = document.querySelector(".vote_date");

    let poll = JSON.parse(window.localStorage.getItem("poll"));
    cont.innerText = "";
    voteDate.innerHTML = "";
    for (var i = 0; i < poll.answers.length; i++) {
        if (poll.answers[i] != undefined && poll.answers[i] != "") {
            let list = document.createElement("li");
            list.setAttribute("class", "vote_item");

            let inp = document.createElement("input");
            inp.setAttribute("type", "radio");
            inp.setAttribute("name", "vote");
            inp.setAttribute("id", poll.answers[i]);
            inp.setAttribute("value", poll.answers[i]);

            let listText = document.createTextNode(poll.answers[i]);

            list.appendChild(inp);
            list.appendChild(listText)
            cont.appendChild(list);
        }
    }

    title.innerText = poll.question;
    if (poll.start_date == undefined || poll.start_date == null) poll.start_date = "";
    if (poll.end_date == undefined || poll.end_date == null) poll.end_date = "";

    voteDate.innerHTML = "투표기간 : " + poll.start_date + " ~ " + poll.end_date;
}

if (hasCookie("userId", "ssafy")) {
    changeLoginTags(true);
} else {
    changeLoginTags(false);
}

loginTag.addEventListener("click", function () {
    let userId = prompt("아이디 입력");
    let userPass = prompt("패스워드 입력");
    if (userId == "ssafy" && userPass == 1234) {
        alert("로그인 성공!!!");
        setCookie("userId", userId, 1);
        changeLoginTags(true);
    } else {
        alert("로그인 실패");
    }
});

// 쿠키 생성
function setCookie(key, value, expireMinute) {
    let todayDate = new Date();
    todayDate.setMinutes(todayDate.getMinutes() + expireMinute);
    document.cookie = key + "=" + value + "; path=/; expires=" + todayDate + ";";
}

// 쿠키 삭제
function deleteCookie(key) {
    document.cookie = key + "=" + "; path=/; expires=" + new Date(0) + ";";
}

// 쿠키 존재 여부 확인
function hasCookie(key, value) {
    let cookies = document.cookie.split("; ");

    for (let cookie of cookies) {
        let [cookieKey, cookieValue] = cookie.split('=');

        if (cookieKey === key && cookieValue === value) {
            return true;
        }
    }
    return false;
}

// 로그아웃 
logoutTag.addEventListener("click", function () {
    deleteCookie("userId");
    changeLoginTags(false);
})

// 로그인 여부에 따른 쿠키 체크
function changeLoginTags(isLogin) {
    let beforeLogin = document.querySelector(".before-login");
    let afterLogin = document.querySelector(".after-login");
    if (isLogin) {

        beforeLogin.className = "navbar-nav ms-auto me-2 before-login d-none ";
        afterLogin.className = "navbar-nav ms-auto me-2 after-login";

        b.className = "d-none";
        a.className = "d-flex"
    } else {

        beforeLogin.className = "navbar-nav ms-auto me-2 before-login ";
        afterLogin.className = "navbar-nav ms-auto me-2 d-none after-login";


        a.className = "d-none";
        b.className = "d-flex"
    }
}

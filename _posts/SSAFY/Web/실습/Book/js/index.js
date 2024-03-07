let logoutTag = document.querySelector("#logout");
let mypageTag = document.querySelector("#mypage");
let adminTag = document.querySelector("#admin");
let loginTag = document.querySelector("#login");
let signupTag = document.querySelector("#signup");

let showShopTag = document.querySelector(".show_shop_list")
let hideShopTag = document.querySelector(".hide_shop_list")


let regionLists = document.getElementsByClassName("shop_list");
let shopLists = document.querySelectorAll("article > li");

let a = document.querySelector("#section_left > div.profile_image_list > img:nth-child(2)");
let b = document.querySelector("#section_left > div.profile_image_list > img:nth-child(1)");

for (let i = 0; i < shopLists.length; i++) {

    shopLists[i].addEventListener("click", () => {
        if (regionLists[i].style.display == "none") {
            regionLists[i].style.display = "block";
        } else {
            regionLists[i].style.display = "none";
        }
    })
}
if (hasCookie("userId", "ssafy")) {
    changeLoginTags(true);
} else {
    changeLoginTags(false);
}

showShopTag.addEventListener("click", showAllShopList);

hideShopTag.addEventListener("click", hideAllShopList);

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
    if (isLogin) {
        loginTag.style.display = "none";
        signupTag.style.display = "none";
        logoutTag.style.display = "";
        mypageTag.style.display = "";
        adminTag.style.display = "";

        b.style.display = "none";
        a.style.display = "inline";
    } else {
        logoutTag.style.display = "none";
        mypageTag.style.display = "none";
        adminTag.style.display = "none";
        loginTag.style.display = "";
        signupTag.style.display = "";
        a.style.display = "none"
        b.style.display = "inline";
    }
}

// 전국 매장 리스트 펼치기
function showAllShopList() {
    for (let ul of regionLists) {
        ul.style.display = "block";
    }
    showShopTag.style.display = "none";
    hideShopTag.style.display = "flex";
}

// 전국 매장 리스트 감추기
function hideAllShopList() {
    for (let ul of regionLists) {
        ul.style.display = "none";
    }
    showShopTag.style.display = "flex";
    hideShopTag.style.display = "none";
}

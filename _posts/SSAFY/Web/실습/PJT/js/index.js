let http = new XMLHttpRequest();

function includeHTML() {
    // Component 검색
    let components = document.getElementsByTagName("*");

    for (var comp of components) { // 찾은 컴포넌트 loop
        let file = comp.getAttribute("include-data"); // 해당 파일명 검색
        if (file) {
            http.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        comp.innerHTML = this.responseText;
                    }
                    if (this.status == 404) {
                        comp.innerHTML = "pageNotFound.";
                    }
                    comp.removeAttribute("include-data");
                    includeHTML();
                }
            }
            http.open("GET", file, true);
            http.send();
            return;
        }
    }
}

window.addEventListener("DOMContentLoaded", () => {
    includeHTML();
});
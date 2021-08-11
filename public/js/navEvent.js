// Navigation 상태 체크 변수
let isMenuOpen = null;   

// Navigation 이벤트
const menuOpenEvent = () => {
    if (!isMenuOpen) {
        const target = document.getElementById("nav_menu_open");
        target.style.height = "16rem";
        target.style.paddingTop = "2rem"
        target.style.paddingBottom = "2rem"
        const target2 = document.getElementsByClassName("nav_menu_open_item");
        [...target2].forEach((elem) => {
            elem.style.display = "inline-block";
        })
        isMenuOpen = true;
    } else {
        const target = document.getElementById("nav_menu_open");
        target.style.height = "0";
        target.style.paddingTop = "0"
        target.style.paddingBottom = "0"
        const target2 = document.getElementsByClassName("nav_menu_open_item");
        [...target2].forEach((elem) => {
            elem.style.display = "none";
        })
        isMenuOpen = false;
    }
}

// 스크롤 이벤트 - 스크롤 시 Navigation 닫힘
document.addEventListener("scroll", () => {
    if (isMenuOpen) {
        menuOpenEvent();
        var currentScrollValue = document.documentElement.scrollTop;
        console.log('currentScrollValue is ' + currentScrollValue);
    }
})
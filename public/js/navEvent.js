// Navigation 열림 이벤트
const menuOpenEvent = () => {
    const target = document.getElementById("nav_menu_open");
    if (window.innerWidth <= 409) {
        target.style.width = "50%";
        target.style.left = "50%";
    } else if (window.innerWidth <= 767) {
        target.style.width = "40%";
        target.style.left = "60%";
    } else if (window.innerWidth <= 1024) {
        target.style.width = "30%";
        target.style.left = "70%";
    }
    const cover = document.getElementById("nav_menu_cover");
    cover.style.display = "block";
}

// Navigastion 닫힘 이벤트
const menuCloseEvent = () => {
    const target = document.getElementById("nav_menu_open");
    target.style.left = "110%";
    const cover = document.getElementById("nav_menu_cover");
    cover.style.display = "none";
}
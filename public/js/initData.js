// Footer 데이터 삽입 함수
const link = document.getElementsByClassName("footer_index_value");
[...link].forEach((item, index) => {
    item.innerHTML = footer_data[index];
});

// nav, nav_open, footer 링크 삽입 함수
const link1 = document.getElementsByClassName("nav_menu");
[...link1].forEach((item, index) => {
    item.href = path[index];
});
const link2 = document.getElementsByClassName("nav_menu_open_item");
[...link2].forEach((item, index) => {
    item.href = path[index];
});
const link3 = document.getElementsByClassName("footer_index_subvalue");
[...link3].forEach((item, index) => {
    item.href = path[index];
});

// footer 링크 이미지 삽입 함수
const img_link = document.getElementsByClassName("footer_link");
[...img_link].forEach((item, index) => {
    item.href = footer_img[index];
})

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
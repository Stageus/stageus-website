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

// 스크롤 이벤트 최적화를 위한 Closure
const scrollTick = (scrollEvent) => {
    let scrollTimeout = false

    return trigger = () => {
        if (scrollTimeout) return
        scrollTimeout = true

        return requestAnimationFrame(() => {
            scrollTimeout = false
            return scrollEvent()
        })
    }
}

// 스크롤 이벤트 함수
const scrollEvent = () => {

    // 현재 스크롤 위치
    const scrollY = this.scrollY

    // 화면 사이즈를 고려한 현재 스크롤의 % 위치
    const rasio = (scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100

    // 전체 스크롤에 대한 화면의 % 길이
    const length = (window.innerHeight / document.documentElement.scrollHeight) * rasio

    // 전체 스크롤에 대한 현재 스크롤의 % 위치
    const nowHeight = (scrollY / document.documentElement.scrollHeight) * 100 + length

    // 스크롤 위치에 따른 Graph 설정
    const scrollPoint = document.getElementById("progress_point")
    scrollPoint.style.width = nowHeight.toString() + "%"

    // 스크롤 투명도 설정
    const navScroll = document.getElementById("nav_scroll")
    if (scrollY >= 100) {
        navScroll.style.opacity = 1.0
    } else if (scrollY < 100) {
        navScroll.style.opacity = 0.0
    }
}

// 스크롤 이벤트 등록
window.addEventListener('scroll', scrollTick(scrollEvent), { passive : true })




// 각 포인트들, 스크롤 위치에 맞게 동적으로 위치 변동되도록
// 포인트에 도착하면 회색에서 파란색으로 색 변경
// 전체적으로 media-query 적용하기

// 각 포인트 및에 조그맣기 이름 출력하기
// 현재 출력 중인 이름에 포인트 디자인 주기

// top 버튼 하나 만들기
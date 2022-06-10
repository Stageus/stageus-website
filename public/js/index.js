// Login 창 열림 이벤트
const loginOpenEvent = (trigger) => {

    const target = document.getElementById("login_box")

    if (trigger.id == "login_box_close") {
        target.style.right = "2.4rem"
        trigger.id = "login_box_open"
        setTimeout(() => {
            document.getElementById("login_id").focus()
        }, 300)
    } else if (trigger.id == "login_box_open") {
        target.style.right = "-36rem"
        trigger.id = "login_box_close"
    }
}

// login 이벤트
const loginEvent = async () => {

    const idValue = document.getElementById("login_id").value;
    const pwValue = document.getElementById("login_pw").value;

    const response = await fetch("/auth", {
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify ({   
            "idValue": idValue,
            "pwValue": pwValue,
        })
    })
    const result = await response.json()

    if (result.success) {
        location.href = "/management"
    }
    else if (!result.success) {
        alert(result.message);
    }
}

// login 이벤트 ( 엔터 입력 )
const loginKeyPressEvent = () => {
    if (window.event.keyCode == 13) {
        loginEvent()
    }
}

// Lecture Mouse Enter Event
const lectureMouseOverEvent = (index) => {
    let list = document.getElementsByClassName("lecture_count");
    list[index].innerHTML = "상세 커리큘럼";
}

// Lecture Moude Leave Event
const lectureMouseLeaveEvent = (index) => {
    let list = document.getElementsByClassName("lecture_count");
    setLectureNumber(list[index], index);
}

// 수강 인원 삽입 함수
const setLectureNumber = (item, index) => {
    if (lecture.information[index].number == -1) {
        item.innerHTML = "휴강";
    } else if (lecture.information[index].number == -2) {
        item.innerHTML = "개강 예정";
    } else if (lecture.information[index].number == 5) {
        item.innerHTML = "모집 마감";
    } else {
        item.innerHTML = "잔여 " + (5 - (lecture.information[index].number))
    }
}

// 페이지 로드시 실행
window.onload = () => {

    // lecutre 기수 삽입
    const lectureGeneration = document.getElementById("lecture_generation");
    lectureGeneration.innerHTML = lecture.generation + "기 개강 과정"

    // Lecture 명 삽입
    const lectureName = document.getElementsByClassName("lecture_title");
    [...lectureName].forEach((item, index) => {
        item.innerHTML = lecture.information[index].name;
    })

    // Lecture 기간 삽입
    const lectureDuration = document.getElementsByClassName("lecture_info");
    [...lectureDuration].forEach((item, index) => {
        item.innerHTML = lecture.information[index].duration;
    })

    // Lecture 수강 인원 삽입
    const lectureNumber = document.getElementsByClassName("lecture_count");
    [...lectureNumber].forEach((item, index) => {
        setLectureNumber(item, index);
    })

    // 스크롤 이벤트 등록
    // window.addEventListener('scroll', scrollTick(scrollEvent), { passive : true })

    // 초기에 한 번 실행
    // scrollEvent()
}





// // TODO

// // 스크롤 이벤트 최적화를 위한 Closure
// const scrollTick = (scrollEvent) => {
//     let scrollTimeout = false

//     return trigger = () => {
//         if (scrollTimeout) return
//         scrollTimeout = true

//         return requestAnimationFrame(() => {
//             scrollTimeout = false
//             return scrollEvent()
//         })
//     }
// }

// // 스크롤 이벤트 함수
// const scrollEvent = () => {

//     // 현재 스크롤 위치
//     const scrollY = this.scrollY

//     // 화면 사이즈를 고려한 현재 스크롤의 % 위치
//     const rasio = (scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100

//     // 전체 스크롤에 대한 화면의 % 길이
//     const length = (window.innerHeight / document.documentElement.scrollHeight) * rasio

//     // 전체 스크롤에 대한 현재 스크롤의 % 위치
//     const nowHeight = (scrollY / document.documentElement.scrollHeight) * 100 + length

//     // 스크롤 위치에 따른 Graph 설정
//     const scrollPoint = document.getElementById("progress_point")
//     scrollPoint.style.width = nowHeight.toString() + "%"

//     // 스크롤 투명도 설정
//     const navScroll = document.getElementById("nav_scroll")
//     if (scrollY >= 100) {
//         navScroll.style.opacity = 1.0
//     } else if (scrollY < 100) {
//         navScroll.style.opacity = 0.0
//     }

//     // const navHeight = document.getElementsByTagName("nav")
//     // console.log(navHeight[0].clientHeight)

//     // const headerHeight = document.getElementsByTagName("header")
//     // console.log(headerHeight[0].clientHeight)

//     // const introHeight = document.getElementById("intro")
//     // console.log(introHeight.clientHeight)

//     const progressBarWidth = document.getElementById("progress_bar").offsetWidth
//     const scrollTotalHeight = document.documentElement.scrollHeight + window.innerHeight

//     const toTopBtn = document.getElementById("toTop")

//     const introductionLocation = document.getElementById("introduction").offsetTop
//     const toIntroductionBtn = document.getElementById("toIntroduction")
//     toIntroductionBtn.style.marginLeft = (introductionLocation / scrollTotalHeight * progressBarWidth).toString() + "px"

//     const lectureLocation = document.getElementById("lecture").offsetTop
//     const lectureHeight = lectureLocation - introductionLocation
//     const toLectureBtn = document.getElementById("toLecture")
//     toLectureBtn.style.marginLeft = (lectureHeight / scrollTotalHeight * progressBarWidth).toString() + "px"

//     const distinctionLocation = document.getElementById("distinction").offsetTop
//     const distinctionHeight = distinctionLocation - lectureLocation
//     const toDistinctionBtn = document.getElementById("toDistinction")
//     toDistinctionBtn.style.marginLeft = (distinctionHeight / scrollTotalHeight * progressBarWidth).toString() + "px"

//     const benefitLocation = document.getElementById("benefit").offsetTop
//     const benefitHeight = benefitLocation - distinctionLocation
//     const benefitBtn = document.getElementById("toBenefit")
//     benefitBtn.style.marginLeft = (benefitHeight / scrollTotalHeight * progressBarWidth).toString() + "px"

//     const mentorLocation = document.getElementById("mentor").offsetTop
//     const mentorHeight = mentorLocation - benefitLocation
//     const mentorBtn = document.getElementById("toMentor")
//     mentorBtn.style.marginLeft = (mentorHeight / scrollTotalHeight * progressBarWidth).toString() + "px"

//     const officeLocation = document.getElementById("office").offsetTop
//     const officeHeight = officeLocation - mentorLocation
//     const officeBtn = document.getElementById("toOffice")
//     officeBtn.style.marginLeft = (officeHeight / scrollTotalHeight * progressBarWidth).toString() + "px"

//     // const toBottomBtn = document.getElementById("toBottom")
//     // toBottomBtn.style.marginLeft = (document.documentElement.scrollHeight / scrollTotalHeight * progressBarWidth).toString() + "px"
// }

// 각 포인트들, 스크롤 위치에 맞게 동적으로 위치 변동되도록
// 포인트에 도착하면 회색에서 파란색으로 색 변경
// 전체적으로 media-query 적용하기

// 각 포인트 및에 조그맣기 이름 출력하기
// 현재 출력 중인 이름에 포인트 디자인 주기

// top 버튼 하나 만들기
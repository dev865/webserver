window.onload = function(){
    // gnb 애니메이션
    const menuOpen = document.querySelector('.gnb .menuOpen');
    const menuBox = document.querySelector('.gnb .menuBox');
    
    menuOpen.addEventListener('click', () => {
        // toggle 메서드의 매개변수를 확인하고 붙이고 뗀다.
        menuBox.classList.toggle('on');
    });

    
    gsap.registerPlugin(ScrollTrigger);    // gsap 라이브러리에 스크롤트리거 등록

    // 01. visual gsap
    gsap.timeline({
        scrollTrigger: {
            trigger: '.visual',
            start: '100% 100%',
            end: '100% 0%',
            scrub: 1
            // scrub: 스크롤트리거 이벤트가 스크롤 양만큼 움직인다. scrub 제거시 스크롤을 이동하다 멈춰도 애니메이션은 끝까지 동작.
            // 애니메이션 속도 지정 가능 (1~3)
            // markers: true
        }
    })
    .to('.logoWrap #j', {x:-150, y:250, rotate:20, ease:'none', duration:5}, 0)
    .to('.logoWrap #y', {x:-30, y:150, rotate:-10, ease:'none', duration:5}, 0)
    .to('.logoWrap #o', {x:0, y:400, rotate:-10, ease:'none', duration:5}, 0)
    .to('.logoWrap #u', {x:50, y:300, rotate:10, ease:'none', duration:5}, 0)
    .to('.logoWrap #n', {x:100, y:100, rotate:-10, ease:'none', duration:5}, 0)
    .to('.logoWrap #g', {x:50, y:300, rotate:80, ease:'none', duration:5}, 0);

    // 02. .mainTextBox .title i 공통
    gsap.utils.toArray('.mainTextBox .title i').forEach((selector) => {
        gsap.timeline({
            scrollTrigger: {
                trigger: selector,
                start: '100% 100%',
                end: '100% 100%',
                scrub: 1
                // markers: true
            }
        })
        .fromTo(selector, {overflow: 'hidden', y:150}, {y:0, ease:'none', duration:5}, 0);
    })

    // 03. .subText p animation 공통
    gsap.utils.toArray('.subText p').forEach(selector => {
        gsap.timeline({
            scrollTrigger: {
                trigger: selector,
                start: '100% 100%',
                end: '100% 100%',
                scrub: 1
            }
        })
        .fromTo(selector, {opacity:0, y:100}, {opacity:1, y:0, ease:'none', duration:5}, 0);
    })

    // 04. .content1 .textAni 텍스트 체인지 yoyo

    let textAniList = document.querySelectorAll('.content1 .textAni li');
    let textAnimation = gsap.timeline({repeat: -1});

    for(let i=0; i < textAniList.length; i++) {
        textAnimation.to(textAniList[i], 0.8, {opacity:1, repeat:1, delay:0, x:0, yoyo:true, ease:"power4.out"});
    }
    textAnimation.play();

    // 05. .content4 .listBox 스크롤트리거 애니메이션
    gsap.utils.toArray('.content4 .listBox .box').forEach((selector) => {
        gsap.timeline({
            scrollTrigger: {
                trigger: selector,
                start: '0% 20%',
                end: '0% 0%',
                scrub: 1
            }
        })
        .to(selector, {transform: 'rotateX(-10deg) scale(0.9)', transformOrigin:'top', filter:'brightness(0.3'}, 0)
    });

    // 06. .content3 .listBox 카드 애니메이션
    gsap.utils.toArray('.content3 .listBox li').forEach((selector) => {
        ScrollTrigger.create({
            trigger: selector,
            start: '30% 50%',
            onEnter: () => {
                gsap.set(selector, {
                    rotationX: '-65deg',
                    z: '-500px',
                    opacity: 1
                }),
                gsap.to(selector, {
                    rotationX:0,
                    opacity: 1,
                    rotationX: 0,
                    z:0
                })
            }
        });
    });

    // 07. .content5 .listBox li 호버 애니메이션
    let listBox = document.querySelectorAll('.content5 .listBox li');
    let imgBox = document.querySelector('.content5 .imgBox');
    let img = document.querySelector('.content5 .imgBox img');

    for(let i=0; i < listBox.length; i++) {
        listBox[i].addEventListener('mouseover', () => {
            img.src = `./images/img${i}.jpg`;
            gsap.set(imgBox, {scale: 0, opacity: 0, duration: 0.3}),
            gsap.to(imgBox, {scale: 1, opacity: 1, duration: 0.3})
        });
        listBox[i].addEventListener('mousemove', (e) => {
            let imgBoxX = e.pageX + 20;     // e.pageX, e.pageY는 마우스 커서 위치값
            let imgBoxY = e.pageY + 20;
            imgBox.style.left = imgBoxX + 'px';
            imgBox.style.top = imgBoxY + 'px';
        });
        listBox[i].addEventListener('mouseout', () => {
            gsap.to(imgBox, {scale:0, opacity:0, duration: 0.3});
        });
    }

    // pageX, pageY를 이용하여 생기는 스크롤 없애기 작업
    // .wrap.on 토글
    gsap.timeline({
        scrollTrigger: {
            trigger: '.content5',
            start: '0% 100%',
            end: '100% 0%',
            toggleClass: {targets: '.wrap', className: 'on'}
        }
    });

    // 08. footer 영역
    gsap.timeline({
        scrollTrigger: {
            trigger: 'footer',
            start: '0% 100%',
            end: '100% 0%',
            scrub: 1
        }
        
    })
    .to('.logoWrap', {top:'20%', ease:'none', duration:5}, 0);

    // 09. loading
    let loading = document.querySelector('.loading');
    let rotate = document.querySelectorAll('.rotate');
    let opacity = document.querySelectorAll('.opacity');

    setTimeout(() => loading.classList.add("scene1"), 0);
    setTimeout(() => loading.classList.add("scene2"), 1500);
    setTimeout(() => loading.classList.remove("scene1", "scene2"), 2500);
    setTimeout(() => rotate.forEach(rotate => {rotate.classList.add('on')}), 2500);
    setTimeout(() => opacity.forEach(rotate => {rotate.classList.add('on')}), 2500);
    
    // loading중 스크롤 금지
    setTimeout(() => {document.body.classList.remove('no-scroll');}, 3500);
    
}



const home = document.querySelector("body.home");
const collection = document.querySelector("body.collection");
const shop = document.querySelector("body.shop");
const about = document.querySelector("body.about");
const archive = document.querySelector("body.archive");
const shopDetail = document.querySelector("body.shop-detail");
const stocklist = document.querySelector("body.stocklist");

// 모든 이미지가 로드되었는지 확인하는 함수
function imagesLoaded(callback) {
    let images = document.querySelectorAll('img');
    let totalImages = images.length;
    let imagesLoadedCount = 0;

    images.forEach((img) => {
        if (img.complete) {
            incrementCounter();
        } else {
            img.addEventListener('load', incrementCounter);
            img.addEventListener('error', incrementCounter);
        }
    });

    function incrementCounter() {
        imagesLoadedCount++;
        if (imagesLoadedCount === totalImages) {
            callback();
        }
    }
}

if (home) {
   
    

// 기존 gsap 슬라이더
let globalSpeed = determineSpeed();

function determineSpeed() {
    return (window.innerWidth <= 599) ? 80 : 200;
}

window.addEventListener('resize', () => {
    globalSpeed = determineSpeed();
});

gsap.utils.toArray('.slide-motion').forEach((line, i) => {
    const speed = globalSpeed; // 사용 globalSpeed

    const links = line.querySelectorAll("a"),
        tl = verticalLoop(links, i % 2 ? speed : -speed);

    // 화면 크기가 599보다 크면 hover 이벤트를 추가합니다.
    if (window.innerWidth > 599) {
        links.forEach(link => {
            link.addEventListener("mouseenter", () => gsap.to(tl, {timeScale: 0, overwrite: true}));
            link.addEventListener("mouseleave", () => gsap.to(tl, {timeScale: 1, overwrite: true}));
        });
    }
});

function verticalLoop(elements, speed) {
    elements = gsap.utils.toArray(elements);
    let firstBounds = elements[0].getBoundingClientRect(),
        lastBounds = elements[elements.length - 1].getBoundingClientRect(),
        top = firstBounds.top - firstBounds.height - Math.abs(elements[1].getBoundingClientRect().top - firstBounds.bottom),
        bottom = lastBounds.top,
        distance = bottom - top,
        duration = Math.abs(distance / speed),
        tl = gsap.timeline({repeat: -1}),
        plus = speed < 0 ? "-=" : "+=",
        minus = speed < 0 ? "+=" : "-=";

    elements.forEach(el => {
        let bounds = el.getBoundingClientRect(),
            ratio = Math.abs((bottom - bounds.top) / distance);
        if (speed < 0) {
            ratio = 1 - ratio;
        }
        tl.to(el, {
            y: plus + distance * ratio,
            duration: duration * ratio,
            ease: "none"
        }, 0);
        tl.fromTo(el, {
            y: minus + distance
        }, {
            y: plus + (1 - ratio) * distance,
            ease: "none",
            duration: (1 - ratio) * duration,
            immediateRender: false
        }, duration * ratio);
    });
    return tl;
}

let slides = document.querySelectorAll('.slide');

slides.forEach((slide) => {
    // 화면 크기가 599보다 크면 hover 이벤트를 추가합니다.
    if (window.innerWidth > 599) {
        slide.addEventListener('mouseenter', () => {
            slides.forEach((otherSlide) => {
                if (otherSlide !== slide) {
                    gsap.to(otherSlide.querySelector('span'), {filter: 'grayscale(1)', ease: 'Power1.easeOut'});
                }
            });
        });

        slide.addEventListener('mouseleave', () => {
            gsap.to(document.querySelectorAll('.slide span'), {filter: 'grayscale(0)', ease: 'Power1.easeOut'});
        });
    }
});


// 로딩
window.addEventListener('load', function () {
  let loading = document.querySelector('.loading');

  setTimeout(() => {
      gsap.to(loading, {
          opacity: 0,
          duration: 1, // transition duration
          ease: 'power3.out',
          onComplete: () => {
              loading.style.display = 'none';
          }
      });
  }, 500); // delay in milliseconds
});

window.addEventListener('resize', function() {
  location.reload();
});

}


if(collection) {

    function disablePointerEvents() {
        document.body.style.pointerEvents = "none";
    }
    
    function enablePointerEvents() {
        document.body.style.pointerEvents = "auto";
    }
// 라이트박스
var items = gsap.utils.toArray(".light-item"),
    lightafters = gsap.utils.toArray(".light-after"),
      details = document.querySelector('.light-box'),
      detailImage = document.querySelector('.light-box img'),
      lightClose = document.querySelector('.light-box .h-close'),
      lightTitle = document.querySelector('.light-box .light-box-title'),
      lightNow = document.querySelector('.light-box .now'),
      lightCount = document.querySelector('.light-box .count')
      whiteBack = document.querySelector('.white-back')
      mHeader =  document.querySelector('header')
    //   detailTitle = document.querySelector('.detail .title'),

var activeItem; // keeps track of which item is open (details)

gsap.set(lightafters, {
    opacity: 0
});
gsap.set(whiteBack, {
    opacity: 0
});

var originalItem;  // 상단 변수 선언 부분에 추가

function showDetails(item) {
    
    disablePointerEvents();
  if (activeItem) { // someone could click on an element behind the open details panel in which case we should just close it.
    return hideDetails();
  }
  let onLoad = () => {

    // position the details on top of the item (scaled down)
    Flip.fit(details, item, {scale: true, fitChild: detailImage});

    // record the state
    const state = Flip.getState(details);

    // set the final state
    gsap.set(details, {clearProps: true}); // wipe out all inline stuff so it's in the native state (not scaled)
    gsap.set(details, {xPercent: -50, top: "50%", yPercent: -50, visibility: "visible", overflow: "hidden"});
    gsap.set(lightafters, {clearProps: true});
    gsap.set(lightafters, {autoAlpha: 0})
    gsap.set(whiteBack, {clearProps: true});
    gsap.set(whiteBack, {autoAlpha: 0});
    
    Flip.from(state, {
        duration: 0.8,
        ease:Power3.easeOut,
        delay: 0.2,
        scale: true,
        zIndex: 10,
      onComplete: () => {
        enablePointerEvents();
        gsap.set(details, {overflow: "auto"})
    } // to permit scrolling if necessary
    })
    
    .to(whiteBack, {autoAlpha: 1, duration: 0.4, ease:Power3.easeOut}, "<-1")
    .to(lightafters, {autoAlpha: 1, duration: 0.4, ease:Power3.easeOut}, "<+0.8")

    gsap.to(item, {opacity: 0, duration: 0.4, ease: Power3.easeOut});

      // Flip.from() returns a timeline, so add a tween to reveal the detail content. That way, if the flip gets interrupted and forced to completion & killed, this does too.
    detailImage.removeEventListener("load", onLoad);
    lightClose.addEventListener('click', hideDetails);

     // Lock the scroll by setting overflow to hidden
     document.documentElement.style.overflow = "hidden";

    var colList = activeItem.parentNode.parentNode;

    var colListTitle = colList.querySelector('.col-list-title');
    lightTitle.textContent = colListTitle.textContent;

    var colListCount = colList.querySelector('.col-list-count');
    console.log()
    lightCount.textContent = colListCount.textContent;
  };

  var slideNum = item.dataset.num;
  // Change image and text
  detailImage.addEventListener("load", onLoad);
  detailImage.src = item.querySelector('img').src;
  details.dataset.num = slideNum;
  
  slideNum = slideNum.split('-', 3)

  lightNow.textContent = slideNum[2]


  // stagger-fade the items out from the one that was selected in a staggered way (and kill the tween of the selected item)
  const tlShow = gsap.timeline();
  tlShow.to(items, {}).kill(item);
  activeItem = item;

  // 클릭된 아이템을 originalItem으로 저장
  originalItem = item;
  gsap.to(originalItem, {opacity: 0, duration: 0.4, ease: Power3.easeOut});

}
// gsap.to(mHeader, {
//     zIndex: 3
// }, "<")

function hideDetails() {
    // originalItem의 투명도를 원래대로 복원
    if (originalItem) {
        gsap.to(originalItem, {opacity: 1, duration: 0.4, ease: Power3.easeOut}, "<+0.8");
    }
    
    // Unlock the scroll by setting overflow back to its default value
    document.documentElement.style.overflow = "";
    disablePointerEvents();
    window.removeEventListener('click', hideDetails);


    activeItem =  document.querySelector(`[data-num=${details.dataset.num}]`);
    
    gsap.set(details, {overflow: "hidden"});
    // gsap.set(whiteBack, { opacity:1, display: "flex"});
    // gsap.set(".light-after", { opacity:1, display: "flex"});

  // record the current state of details
  const state = Flip.getState(details);

  // scale details down so that its detailImage fits exactly on top of activeItem
  Flip.fit(details, activeItem, {scale: true, fitChild: detailImage});

  // animate the other elements, like all fade all items back up to full opacity, slide the detailContent away, and tween the background color to white.
  const tlHide = gsap.timeline();
  tlHide.set(details, {overflow: "hidden"})
  
  
  .to(lightafters, {autoAlpha: 0, duration: 0.4, ease:Power3.easeOut}, "<")
  .to(whiteBack, {autoAlpha:0, duration: 0.4, ease:Power3.easeOut}, "<+0.7")
    
    // 일단 숨김
    // .to(".light-after", {
    //     opacity: 0,
    //     display: "none",
    //     duration: 0.4,
    // ease:Power3.easeOut
    // },"<")
    // .to(whiteBack, {
    //     opacity:0,
    //     display: "none",
    //     duration: 0.4,
    //     ease:Power3.easeOut,
    //   }, "+=0.1")

    // gsap.to(mHeader, {
    //     zIndex: 20
    // }, "<")
    
  // animate from the original state to the current one.
  Flip.from(state, {
    scale: true,
    duration: 0.8,
    ease:Power3.easeOut,
    delay: 0.2, // 0.2 seconds because we want the details to slide up first, then flip.
    onInterrupt: () => tlHide.kill(),
    onComplete: () => {
        enablePointerEvents();
    }
  })
    .set(details, {visibility: "hidden"});

   if (activeItem) {
        gsap.to(activeItem, {opacity: 1, duration: 0.4, ease: Power3.easeOut}, "<+=0.8");
    }
  activeItem = null;
  
}

// Add click listeners
gsap.utils.toArray('.light-item').forEach(item => item.addEventListener('click', () => {
    showDetails(item)
}));
function move(direction) {
    let targetNum = details.dataset.num;
    let matchingItem = items.find(item => item.dataset.num === targetNum);

    let adjacentItem = direction === "next" ? matchingItem.nextElementSibling : matchingItem.previousElementSibling;
    let imageSrc;

    if (adjacentItem) {
        details.dataset.num = adjacentItem.dataset.num;
        imageSrc = adjacentItem.querySelector('img').src;
    } else {
        let slideNum = targetNum.split('-', 2);
        let newItemNum = direction === "next" ? 1 : matchingItem.parentNode.children.length;
        details.dataset.num = `data-${slideNum[1]}-${newItemNum}`; 

        let newItem = items.find(item => item.dataset.num === details.dataset.num);
        imageSrc = newItem.querySelector('img').src;
    }
    

    let photoNum = details.dataset.num.split('-', 3);
    lightNow.textContent = photoNum[2];
    detailImage.src = imageSrc;
    
}


const clickRight = document.querySelector('.arrow.right');
const clickLeft = document.querySelector('.arrow.left');

let isLoading = false;

clickRight.addEventListener('click', function() {
    if (isLoading) return; // 이미 로딩 중이면 이벤트 핸들러 종료

    isLoading = true; // 로딩 시작
    move("next");

    // 이미지가 로드될 때까지 기다린다.
    detailImage.onload = function() {
        isLoading = false; // 로딩 완료
    };
});
clickLeft.addEventListener('click', function() {
    if (isLoading) return; // 이미 로딩 중이면 이벤트 핸들러 종료

    isLoading = true; // 로딩 시작
    move("prev");

    // 이미지가 로드될 때까지 기다린다.
    detailImage.onload = function() {
        isLoading = false; // 로딩 완료
    };
});
document.addEventListener('keydown', function(event) {
    if (event.key === "ArrowRight") {
        move("next");
    }
});
document.addEventListener('keydown', function(event) {
    if (event.key === "ArrowLeft") {
        move("prev");
    }
});


// 컬렉션 드롭다운
let dropdownTriggers = document.querySelectorAll('.col-list');

dropdownTriggers.forEach((trigger, index) => {
    let isPlaying = (index === 0);  // 처음 항목만 active 상태로 설정

    let dropdownContent = trigger.querySelector('.col-grid');
    let images = dropdownContent.querySelectorAll('.light-item'); 

    let titleWrap = trigger.querySelector('.col-title-wrap');
    
    const dtl = gsap.timeline({ 
        paused: true, 
        reversed: !isPlaying, 
        defaults: { ease: "power3.out" } 
    })
    .to(dropdownContent, {
        display: 'flex'
    })
    .to(dropdownContent, {
        opacity: 1,
        height: 'auto',
        duration: 0.8,
        ease:Power1.easeOut

    }, "<")
    .to(images, {
        opacity: 1,
        stagger: 0.06
    }, "<=0.3");

    // 클릭 이벤트 리스너 추가
    titleWrap.addEventListener('click', function() {
        if (!isPlaying) {
            dtl.play();
            trigger.classList.add('active'); // active 클래스 추가
        } else {
            dtl.reverse();
            trigger.classList.remove('active'); // active 클래스 제거
        }
        isPlaying = !isPlaying;
    });

    // 1번 grid만 처음에 열려있도록 설정
    imagesLoaded(() => {
        if (index === 0) {
            trigger.classList.add('active');
            dtl.play(); // 첫번째 항목에 대해 타임라인 재생
        }
    });


});

}



if(shop) {
// 상품 목록 드롭다운
let shopdropTriggers = document.querySelectorAll('.dropdown');

shopdropTriggers.forEach((trigger, index) => {
    let dropdownContent = trigger.querySelector('.dropdown-inner');
    
    // 처음에 첫 번째 dropdown의 내용만 보이게 설정
    if (index !== 0) { 
        dropdownContent.style.display = 'none'; 
    }

    // 마우스가 요소 위에 있을 때
    trigger.addEventListener('mouseenter', function() {
        dropdownContent.style.display = 'flex';
    });

    // 마우스가 요소를 벗어날 때
    trigger.addEventListener('mouseleave', function() {
        dropdownContent.style.display = 'none';
    });
});


// .shop-cate 클래스 내부의 h1 요소 선택
let h1Element = document.querySelector('.shop-cate h1.count');

// shop-grid > a 선택자를 사용하여 링크의 개수 계산
let linksCount = document.querySelectorAll('.shop-grid > a').length;

// 계산된 개수를 h1 요소의 텍스트 내용으로 설정
h1Element.textContent = linksCount;


}


//모든 애니메이션  
const allIns = gsap.utils.toArray('.all-in');
allIns.forEach(allIn => {
gsap.to(allIn, 1,{
    opacity: 1,
    visibility: "visible",
    scrollTrigger: {
        markers: false,
        trigger: allIn,
        start: "top bottom",
        end: "bottom top",
        ease:Power3.easeOut,
    }
});
});

// 헤더 애니메이션 pc
// const headerTrigger = document.querySelector('.header-trigger');
// const headerContents = document.querySelector('.header-contents');
// const headerWrap = document.querySelector('.header-wrap');

// // 초기 상태 설정
// gsap.set(headerContents, { autoAlpha: 0, display: 'none' });

// const headerTl = gsap.timeline({ paused: true })
// .to(headerContents, { autoAlpha: 1, display: 'grid', duration: 0.4, ease: "power3.out" });

// headerTrigger.addEventListener('mouseenter', () => {
//   headerTl.play();
// });

// headerWrap.addEventListener('mouseleave', () => {
//   headerTl.reverse();
// });
const infoMotion = document.querySelector(".info-motion.mobile");
const detailsLabel = document.querySelector(".label-s.mobile");

if (infoMotion) {
    console.log(infoMotion);

    // 초기 상태 설정
    gsap.set(infoMotion, { autoAlpha: 0, height: 0 });

    detailsLabel.addEventListener("click", function() {
        if (gsap.getProperty(infoMotion, "autoAlpha") == 0) {
            gsap.to(infoMotion, { autoAlpha: 1, height: "auto", duration: 0.8, ease: Power3.easeOut });
            detailsLabel.textContent = "Close";
        } else {
            gsap.to(infoMotion, { autoAlpha: 0, height: 0, duration: 0.8, ease: Power3.easeOut });
            detailsLabel.textContent = "Details";
        }
    });
}



if (archive && window.innerWidth > 599) {
    // 모든 .archive-list 요소를 선택합니다.
    let archiveLists = document.querySelectorAll(".archive-list");

    // 페이지가 로드되었을 때 첫 번째 이미지의 기본 스타일을 설정합니다.
    document.addEventListener("DOMContentLoaded", function() {
        let firstImg = archiveLists[0].querySelector("img");
        firstImg.style.opacity = "1";
        firstImg.style.visibility = "visible";
    });

    // 각 .archive-list 요소에 대해 이벤트 핸들러를 추가합니다.
    archiveLists.forEach((list) => {
        list.addEventListener("mouseover", function() {
            // 마우스가 .archive-list 요소 위로 이동했을 때 GSAP 애니메이션을 사용합니다.
            let img = list.querySelector("img");
            gsap.to(img, { duration: 0.3, opacity: 1, visibility: "visible" });
        });

        list.addEventListener("mouseout", function() {
            // 마우스가 .archive-list 요소 밖으로 이동했을 때 GSAP 애니메이션을 사용합니다.
            let img = list.querySelector("img");
            gsap.to(img, { ease: "power3.out", duration: 0.3, opacity: 0, onComplete: function() { img.style.visibility = "hidden"; } });
        });
    });
}


// if (archive) {
// // GSAP 타임라인을 생성합니다.
// const tl = gsap.timeline({ paused: true });
// tl.to(".light-box", { autoAlpha: 1, duration: 0.6, ease:Power3.easeOut });

// // 각 .archive-list 요소에 클릭 이벤트 리스너를 추가합니다.
// document.querySelectorAll(".archive-list").forEach(item => {
//     item.addEventListener("click", function() {
//         // 타임라인 애니메이션을 재생합니다.
//         tl.restart();
//     });
// });
// document.querySelector(".h-close").addEventListener("click", function() {
//     // 타임라인 애니메이션을 역순으로 재생합니다.
//     tl.reverse();
// });
// }
 

 

 if(stocklist || about) {
//  stocklist 탭 기능 구현
document.addEventListener("DOMContentLoaded", function() {
    let tabs = document.querySelectorAll('.link-wrap a');
 
    tabs.forEach(function(tab) {
       tab.addEventListener('click', function(e) {
          e.preventDefault();
 
          // 모든 탭 컨텐츠 숨기기
          let contents = document.querySelectorAll('.tab-cont');
          contents.forEach(function(content) {
             content.style.display = 'none';
          });
 
          // 모든 탭의 active 클래스 제거
          tabs.forEach(function(innerTab) {
             innerTab.classList.remove('active');
          });
 
          // 선택한 탭 활성화 및 active 클래스 추가
          let target = this.getAttribute('data-tab');
          let targetNum = this.getAttribute('data-num');
          document.querySelector('.tab-cont[data-tab="' + target + '"]').style.display = 'block';
          this.classList.add('active');

          if(stocklist) {
            
  
            let h1Element = document.querySelector('.info-wrap.all-in h1.i-cate');
            let h1ElementNum = document.querySelector('.info-wrap.all-in h1.i-num');
            // h1 태그의 텍스트를 'label-s' 클래스를 가진 요소의 텍스트로 변경
            h1Element.textContent = target;
            h1ElementNum.textContent = targetNum;

          }
   
       });
       
    });
 
    // 초기 화면 설정
    document.querySelector('.tab-cont').style.display = 'flex'; // 첫 번째 탭 컨텐츠 표시
    tabs[0].classList.add('active'); // 첫 번째 탭에 active 클래스 추가
 });
 
 }


//  모바일 메뉴 모션
 // 모바일 메뉴 애니메이션
 const menuTrigger = document.querySelector(".m-header-link");
const menuWrap = document.querySelector(".m-header-menu");
const headerElem = document.querySelector("header");  // Access the <header> element

menuTrigger.addEventListener('click', function(e) {
    menuTrigger.classList.toggle("on");

    if (menuTrigger.classList.contains('on')) {
        gsap.to(menuWrap, 0.4, {
            display: "flex",
            opacity: 1,
            ease: Power3.easeOut
        });
        gsap.to('.m-on', 1.2, {
            opacity: 1,
            ease: Power3.easeOut
        });

        // Set the text to 'close' when menu is opened
        menuTrigger.textContent = "close";

        // Lock the scroll by setting overflow to hidden
        document.documentElement.style.overflow = "hidden";

        // Raise the z-index of the <header>
        headerElem.style.zIndex = "100";

    } else {
        gsap.to(menuWrap, 0.4, {
            display: "none",
            opacity: 0,   
            ease: Power3.easeOut      
        });
        gsap.to('.m-on', 1.2, {
            opacity: 0,
            ease: Power3.easeOut
        });

        // Set the text back to 'menu' when menu is closed
        menuTrigger.textContent = "menu";

        // Unlock the scroll by setting overflow back to its default value
        document.documentElement.style.overflow = "";

        // Reset the z-index of the <header>
        headerElem.style.zIndex = "";
    }
});



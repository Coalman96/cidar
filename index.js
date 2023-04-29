//header scroll slide
const header = document.querySelector("header");
const subBg = document.querySelector(".pcSubBg");

const headerSubs = document.querySelectorAll(".subMenuWrap");
window.addEventListener("wheel", (e) => {
  const delta = Math.sign(e.deltaY);
  if (delta > 0) {
    header.style.display = "none";
  }
  if (delta < 0) {
    header.style.display = "";
  }
});

header.addEventListener("mouseover", () => {
  subBg.style.height = "350px";
  for (const subs of headerSubs) {
    subs.style.height = "350px";
  }
});
header.addEventListener("mouseleave", () => {
  subBg.style.height = "";
  for (const subs of headerSubs) {
    subs.style.height = "";
  }
});
//header subMenu slide
const openMenu = document.querySelector("#open");
const closeMenu = document.querySelector("#close");
const subMenu = document.querySelector(".menuContainer");
const mainMenus = document.querySelectorAll(".mainMenu>a");
const subMenus = document.querySelectorAll(".subMenuContainer");
openMenu.addEventListener("click", () => {
  subMenu.style.transform = "translateX(0)";
});
closeMenu.addEventListener("click", () => {
  subMenu.style.transform = "";
});
let activeSubMenu = null;

for (const mainMenu of mainMenus) {
  mainMenu.addEventListener("click", () => {
    const subMenu = mainMenu.nextElementSibling.querySelector(".subMenuWrap");
    const subMenuContainer = subMenu.parentNode;
    const subMenuH = subMenu.offsetHeight;

    // 다른 서브메뉴 닫기
    if (activeSubMenu && activeSubMenu !== subMenuContainer) {
      activeSubMenu.style.height = "";
    }

    // 서브메뉴 열고 닫기
    if (subMenuContainer.style.height) {
      subMenuContainer.style.height = "";
      activeSubMenu = null;
    } else {
      subMenuContainer.style.height = `${subMenuH}px`;
      activeSubMenu = subMenuContainer;
    }
  });
}

//Isotope적용
let grid;
const frame = ".productItem";
const box = ".productItem li";
const speed = ".35s";
function init() {
  grid = new Isotope(frame, {
    itemSelector: box,
    columnWidth: box,
    transitionDuration: speed,
    filter: ".soda",
  });
}
window.addEventListener("load", function () {
  init();
  document.querySelector(".itemTab li a.on").click();
});

const items = document.querySelectorAll(".itemTab li a");
const descs = document.querySelectorAll(".itemDesc li");
const categorys = document.querySelectorAll(".mainCategory li a");
const arts = document.querySelectorAll("#sect2>article");
for (const category of categorys) {
  category.addEventListener("click", (e) => {
    e.preventDefault();
    const getHref = category.getAttribute("href");
    const setHref = document.querySelector(getHref);
    for (const art of arts) {
      art.classList.remove("on");
    }
    for (const c of categorys) {
      c.classList.remove("on");
    }
    e.target.classList.add("on");
    setHref.classList.add("on");
  });
}
items.forEach((item, i) => {
  item.addEventListener("click", function (e) {
    e.preventDefault();
    let href = this.getAttribute("href");
    grid.arrange({ filter: href });

    items.forEach((item) => {
      item.classList.remove("on");
    });
    descs.forEach((desc, j) => {
      desc.classList.remove("on");
      if (i === j) {
        desc.classList.add("on");
      }
    });
    this.classList.add("on");
  });
});

//brands class toggle
const brandTabs = document.querySelectorAll(".brandTab li a");
const brands = document.querySelectorAll(".brands>div");
for (const brandTab of brandTabs) {
  brandTab.addEventListener("click", (e) => {
    e.preventDefault();
    const getHref = brandTab.getAttribute("href");
    const setHref = document.querySelector(getHref);
    for (const b of brandTabs) {
      b.classList.remove("on");
    }
    e.target.classList.add("on");
    for (const brand of brands) {
      brand.classList.remove("on");
    }
    setHref.classList.add("on");
  });
}
//트래벌싱의 중요성
const list = document.querySelector("#list");
const artBox = document.querySelector("#artBox");
const boxes = artBox.children;
const hgroups = document.querySelectorAll("#desc hgroup");
const ps = document.querySelectorAll("#desc p");
const btns = document.querySelectorAll("#desc #btnContainer");
const figures = document.querySelectorAll("#artBox figure");
document.addEventListener('DOMContentLoaded', function () {
  init();
  list.querySelector('a').click();
});
list.addEventListener("click", function (e) {
  e.preventDefault();
  //ul#list를 클릭했을 때 나오는 에러를 없애기 위해(ul은 href속성을 가지고있지않다.)
  if (e.target.closest("a")) {
    const targetLi = e.target.closest("a").getAttribute("href");
    // 가져온 값은 DOM 요소가 아니고 값이기때문에 DOM요소로 만들어줘야한다.
    const targetEl = document.querySelector(targetLi);
    const descBox = targetEl.querySelector("#desc");
    //클릭한 것의 주소값을 가져왔으니 해당요소를 보이고 나머지를 숨긴다.
    //클릭한 것의 주소값과 다르면 숨긴다.
    //for of문을 사용하여 boxes를 box에 할당하여 사용한다.
    //for of는 배열 내 객체들을 한번씩 돌면서 조건에 맞는지 체크를 한다.
    for (const a of hgroups) {
      a.classList.remove('active')
    }
    for (const b of ps) {
      b.classList.remove('active')
    }
    for (const c of btns) {
      c.classList.remove('active')
    }
    for (const d of figures) {
      d.classList.remove('active')
    }

    for (const box of boxes) {
      if (box !== targetEl) {
        box.style.visibility = "hidden";
      }
      if (box === targetEl) {
        const hgroup = box.querySelector("hgroup");
        const p = box.querySelector("p");
        const btn = box.querySelector("#btnContainer");
        const figure = box.querySelector("figure");
        hgroup.classList.add('active')
        p.classList.add('active')
        btn.classList.add('active')
        figure.classList.add('active')
      }
    }
    targetEl.style.visibility = "visible";
  }
});

//circle 이동
const circle = document.querySelector("#circle");
const item = document.querySelectorAll("#list>li");
// const branItems = document.querySelectorAll('.articleWrap article')
const startPos = item[0];
let currentPos = 0;
// 랜덤한 위치를 설정함.
//Math.floor는 정수를 반환
//Math.random은 0~1의 숫자를 반환하기때문에 정수로변환하고 선택자의 길이만큼곱해주면 됨
const randomPos = item[Math.floor(Math.random() * item.length)];
//해당 아이템의 x좌표를 가져온다.
function circleMove() {
  item.forEach((item) => {
    item.addEventListener("click", () => {
      //item영역의 좌표값 가져오기
      const itemRect = item.getBoundingClientRect();
      // circle 너비의 1/2값
      const circleW = circle.offsetWidth / 2;
      //가져온 좌표값에서 item과 circle의 절반너비값을 빼준다.
      const itemX = itemRect.left + item.offsetWidth / 2 - circleW;
      circle.style.left = `${itemX}px`;
      currentPos = itemX
    });
    window.onload = () => {
      setPosition(circle, startPos);
      // 원의 시작점을 처음으로 설정한다.
       circle.style.left = `${
         startPos.offsetLeft +
         startPos.offsetWidth / 2 -
         circle.offsetWidth / 2
       }px`;
        // circle의 위치를 랜덤하게 바꿔줌
        // circle.style.left = `${randomPos.offsetLeft+randomPos.offsetWidth/2-circle.offsetWidth/2}px`;
    };
  });
}
circleMove();

function setPosition(move, items) {
  move.style.left = `${items.offsetLeft + items.offsetWidth / 2 - move.offsetWidth / 2}px`;
}

window.addEventListener("resize", () => {
  circleMove();
  setPosition(circle, { offsetLeft: currentPos });
});
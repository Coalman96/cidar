//header scroll slide
const header = document.querySelector('header')
window.addEventListener('wheel', (e) =>{
    const delta = Math.sign(e.deltaY)
    if(delta>0){
        header.style.display = 'none'
    }
    if(delta<0){
        header.style.display = ''
    }
})
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

window.addEventListener("load", function () {
  init();
  document.querySelector(".itemTab li a.on").click();
});

function init() {
  grid = new Isotope(frame, {
    itemSalctor: box,
    columnWidth: box,
    transitionDuration: speed,
    filter: ".soda",
  });
}

const items = document.querySelectorAll(".itemTab li a");
const descs = document.querySelectorAll('.itemDesc li')
const categorys = document.querySelectorAll('.mainCategory li a')
const arts = document.querySelectorAll('#sect2>article')
for(const category of categorys){
    category.addEventListener('click', (e)=>{
        e.preventDefault()
        const getHref = category.getAttribute('href')
        const setHref = document.querySelector(getHref)
        for(const art of arts){
            art.classList.remove('on')
        }
        for(const c of categorys){
            c.classList.remove('on')
        }
        e.target.classList.add('on')
        setHref.classList.add('on')
    })
}
items.forEach((item,i) => {
  item.addEventListener("click", function (e) {
    e.preventDefault();
    let href = this.getAttribute("href");
    grid.arrange({ filter: href });

    items.forEach((item) => {
      item.classList.remove("on");
    });
    descs.forEach((desc, j)=>{
        desc.classList.remove('on')
        if(i === j){
            desc.classList.add('on')
        }
    })
    this.classList.add("on");
  });
});


//brands class toggle
const brandTabs = document.querySelectorAll('.brandTab li a')
const brands = document.querySelectorAll('.brands>div')
for(const brandTab of brandTabs){
    brandTab.addEventListener('click', (e)=>{
        e.preventDefault()
        const getHref = brandTab.getAttribute('href')
        const setHref = document.querySelector(getHref)
        for(const b of brandTabs){
            b.classList.remove('on')
        }
        e.target.classList.add('on')
        for(const brand of brands){
            brand.classList.remove('on')
        }
        setHref.classList.add('on')

    })
}
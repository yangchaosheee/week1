//实现轮播
new Swiper(".swiper-container",{
    autoplay : {
        delay: 1000
    },
    loop:true,
    pagination:{
        el : ".swiper-pagination"
    }
})
//实现 BScroll
new BScroll(".main")

let imgarr = ["./images/1.jpg","./images/2.jpg","./images/6.jpg","./images/8.jpg"]
//摸你数据
let data = Mock.mock({
    "result|10" : [{
        "src|1" : imgarr,
        "title" : "@ctitle(15)"
    }]
})

//后台返回数据渲染页面
axios.get("/getData").then(res=>{
    console.log(res.data)
    let content = document.querySelector(".main-content");
    content.innerHTML = res.data.map( e => {
        return `<div class="main-content-show">
                <img src=${e.src} alt="">
                <p>${e.title}</p>
            </div>`
    }).join("")

})
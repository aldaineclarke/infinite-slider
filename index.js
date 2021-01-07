"use strict;";
let indicators = document.querySelectorAll(".indicator");
const slider = document.querySelector(".carousel__inner");
let slides = document.querySelectorAll(".carousel__inner__slide");
const right_arrow = document.querySelector(".arrow--right");
const left_arrow = document.querySelector(".arrow--left");
let index = 1;
let first_clone = slider.firstElementChild.cloneNode(true);
let last_clone = slider.lastElementChild.cloneNode(true);
let slide_pos = -25;

first_clone.id = "first-clone";
last_clone.id = "last-clone";
slider.append(first_clone);
slider.prepend(last_clone);
slides = document.querySelectorAll(".carousel__inner__slide")
slides[index].classList.add("active");
indicators[index-1].classList.add("active");

right_arrow.addEventListener("click",()=>{
    slideRight()
    
});
left_arrow.addEventListener("click",()=>{
    slideLeft();
});

function slideRight(){
    index++;
    slider.style.transition = "700ms";
    slide_pos += -50;
    slide()
 
}
function slideLeft(){
    index-=1;
    slider.style.transition = "700ms";
    refreshActive(slides);
    slide_pos += 50;
    slide();
}
function slide(){
    if (index > slides.length) return
    refreshActive(slides);
    refreshActive(indicators);
    slides[index].classList.add("active");
    if (index <= 6 && index > 0)indicators[index-1].classList.add("active")
    if (index < 0)indicators[index].classList.add("active")
    slider.style.transform = `translate(${slide_pos}vw)`;
    console.log(index)
}
function refreshActive(list){
    list.forEach(item=>{
        item.classList.remove("active");
    })
}
slider.addEventListener("transitionend", ()=>{
    console.log("end");
    indicators = document.querySelectorAll(".indicator");
    slides = document.querySelectorAll(".carousel__inner__slide");
    if(slides[index].id === first_clone.id){
        slider.style.transition = "none";
        index = 1;
        slide_pos = -25;
        slides[index].firstElementChild.style.transition = "none";
        slides[index].classList.add("active");
        indicators[index-1].classList.add("active")
        slider.style.transform = `translate(${slide_pos}vw)`;
    }
    if(slides[index].id === last_clone.id){
        slider.style.transition = "none";
        index = slides.length-2;
        slide_pos =( index * -50) +25;
        console.log(index)
        console.log(slide_pos)
        slides[index].firstElementChild.style.transition = "none";
        slides[index].classList.add("active");
        indicators[index-1].classList.add("active")

        slider.style.transform = `translate(${slide_pos}vw)`;
    }
    
})










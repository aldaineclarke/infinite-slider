"use strict;";
let indicators = document.querySelectorAll(".indicator");
const slider = document.querySelector(".carousel__inner");
let slides = document.querySelectorAll(".carousel__inner__slide");
const right_arrow = document.querySelector(".arrow--right");
const left_arrow = document.querySelector(".arrow--left");
let index = 1;
let first_clone = slider.firstElementChild.cloneNode(true);
let last_clone = slider.lastElementChild.cloneNode(true);
/*I used slide_pos variable her to simulate the position of a slide. -25 because that was how much the slider was already translated in the document. */
let slide_pos = -25;

/* created clones of the first and last element then append the first clone element to the end and the last clone element to the beginning. This is because we want to create a circular effect, this would be better than creating elements on the fly.*/
first_clone.id = "first-clone";
last_clone.id = "last-clone";
slider.append(first_clone);
slider.prepend(last_clone);
/* Even though I already got the slides..I queried the DOM again so as to ensure that even the ones that I appended were included into the slides nodelist*/
slides = document.querySelectorAll(".carousel__inner__slide");
/* I then Identified the 2nd element of index one and give it the class of active. This is because the slider will prepend a node to the beginning which will push the first element to the second place. Indicators I used index-1 because unlike the slides, I want it to start 0-indexed.*/
slides[index].classList.add("active");
indicators[index-1].classList.add("active");


right_arrow.addEventListener("click",()=>{
    slideRight()
    
});
left_arrow.addEventListener("click",()=>{
    slideLeft();
});
// gave each slide direction an increment and decrement
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
/*This function will add the active class to whichever index of the slide it is at. It will then translate the slider based on the accumulated slide_pos in the function that calls it. It has a condition to check if the index is greater than the length of the slides or if the index is less than 0, since sliding too fast too quickly may crash the program. */
function slide(){
    if (index > slides.length && index < 0) return
    refreshActive(slides);
    refreshActive(indicators);
    slides[index].classList.add("active");
    if (index <= 6 && index > 0)indicators[index-1].classList.add("active")
    slider.style.transform = `translate(${slide_pos}vw)`;
}
// resets the active class of whatever nodelist passed to it.
function refreshActive(list){
    list.forEach(item=>{
        item.classList.remove("active");
    })
}
// checks to see if the transition ends on the slider.
slider.addEventListener("transitionend", ()=>{

    // checks if the current element at the index of the slide is the same as the firstclone;
    /*
        The slider transition is set to none then it changes the slide_pos to the beginning which is at position -25 and also set the index to 1. This is because the transition on would cause the slider to visibly slide over to translate -25 which would reduce the desired effect.
     */
    if(slides[index].id === first_clone.id){
        slider.style.transition = "none";
        index = 1;
        slide_pos = -25;
        // this will prevent the element from being transitioned twice 
        slides[index].firstElementChild.style.transition = "none";
        slides[index].classList.add("active");
        indicators[index-1].classList.add("active")
        slider.style.transform = `translate(${slide_pos}vw)`;
    }
    if(slides[index].id === last_clone.id){
        slider.style.transition = "none";
        index = slides.length-2;
        slide_pos =( index * -50) +25;
        slides[index].firstElementChild.style.transition = "none";
        slides[index].classList.add("active");
        indicators[index-1].classList.add("active")
        slider.style.transform = `translate(${slide_pos}vw)`;
    }
    
})










// "currentpaper" is the "paper" to be worked on.
// paper counting is based on 0 index system.
//              This gives room to account for the front and back covers as
//              paper count 0 and numberOfPapers +1 respectively
// "goNext()" function is trying to work on the next paper in order.
//              Hence, "currentPaper" is the next paper to flip
// "goPrev()" function is trying to work on the very last paper (worked on by goNext() function)
//              Hence currentPaper here is the next paper to be "unflipped"
// currentPaper value of -1 means the book is yet to be opened. As such, no function has worked on it.

let currentPaper = -1;
let noOfPapers = 4;
let maxPapers = noOfPapers + 1;
//
let index = noOfPapers + 1;
let width = 60;
let aspectRatio = '12/16';

$ = (select, val) => {
    if (select== 'id'){
        return document.getElementById(val);
    }

    if (select == 'class'){
        return document.getElementsByClassName(val)
    }
}

const prevBtn = $('id', 'prev');
const nextBtn = $('id', 'next');
const book = $('id', 'book');

const allPapers = $('class', 'papers');
book.style.width = `${width}vh`;
// book.style.height = `${width * 15/8}vh`;
// book.style.height = `${height}vh`;
book.style.aspectRatio = aspectRatio;

// Function Definitions
function pagesMaker(No){
    let elem_ =``;
    let elem;
    for (let i = 1; i < maxPapers; i++){
        elem_+= `
        <!-- paper ${i} -->
            <div class="papers " id="paper${i}">
                <div class="pages back" id="p${i}b">
                    <div class="back-content">
                        <img src="./images/pg${2*i}.jpg" alt="">
                    </div>
                    
                </div>
        
                <div class="pages front" id="p${i}f">
                    <div class="front-content">
                        <img src="./images/pg${(2*i)-1}.jpg" alt="">                        
                    </div>
                </div>
            </div>
            `
    }

    elem = `
        <!-- page cf -->
            <div class="papers " id="papercf">
                <div class="pages back" id="fci">
                    <div class="back-content">
                        <img src="./images/fcover2.jpg" alt="">
                    </div>
                    
                </div>
        
                <div class="pages front" id="fco">
                    <div class="front-content">
                        <img src="./images/fcover1.jpg" alt="">                      
                    </div>
                </div>
            </div>

            ${elem_}

        <!-- page cb -->
            <div class="papers " id="papercb">
                <div class="pages back" id="bci">
                    <div class="back-content">
                        <img src="./images/bcover2.jpg" alt="">
                    </div>
                    
                </div>
        
                <div class="pages front" id="bco">
                    <div class="front-content">
                        <img src="./images/bcover1.jpg" alt="">                        
                    </div>
                </div>
            </div>
            `;

        return elem;
}

$('id', 'book').innerHTML = pagesMaker(noOfPapers);

function openBook(paperPosition){
    switch(paperPosition){
        case 0:
            book.style.transform = `translateX(${0.5 * width}vh)`;
            prevBtn.style.transform = `translateX(${-1 * 0.5 * width}vh)`;
            nextBtn.style.transform = `translateX(${0.5 * width}vh)`;
            break;
        case noOfPapers:
            // book.style.transform = "translateX(24vh)";
            book.style.transform = `translateX(${0.5 * width}vh)`;
            // prevBtn.style.transform = "translateX(-24vh)";
            prevBtn.style.transform = `translateX(${-1 * 0.5 * width}vh)`;
            // nextBtn.style.transform = "translateX(24vh)";
            nextBtn.style.transform = `translateX(${0.5 * width}vh)`;
            break;
    }

}

function closeBook(paperPosition){
    switch(paperPosition){
        case -1:
            book.style.transform = "translateX(0%)";
            prevBtn.style.transform = "translateX(0vh)";
            nextBtn.style.transform = "translateX(0vh)";
            console.log(`in closed() and -1 `);
            break
        case maxPapers:
            // book.style.transform = "translateX(48vh)";
            book.style.transform = `translateX(${width}vh)`;
            prevBtn.style.transform = "translateX(0vh)";
            nextBtn.style.transform = "translateX(2vh)";
            console.log(`in closed() and maxPaper`);
            break
        
    }
}    

function goNext(){
    console.log(` -- goNext currentPaper is ${currentPaper +1}`);
    if (currentPaper < maxPapers){

        currentPaper++;
        index--;
        console.log(currentPaper);
        // Add the 'flipped' class to flipped paper
        allPapers[currentPaper].classList.add("flipped");
        allPapers[currentPaper].style.zIndex = currentPaper;
        // increament 'currentPages'
        
        // Open book with openBook() if needed

        if (currentPaper == 0){
            openBook(currentPaper);
        }

        if (currentPaper == maxPapers){
            closeBook(currentPaper);
        }

        // openBook(currentPaper);
    }
}

function goPrev(){
    console.log(` -- goPrev currentPaper is ${currentPaper -1}`);
    if (currentPaper > -1){
        index++;
        console.log(`Current paper is: ${currentPaper}`);
        allPapers[currentPaper].classList.remove("flipped");
        allPapers[currentPaper].style.zIndex = index ;
        console.log(`Added zIndex is; ${allPapers[currentPaper].style.zIndex}`);
        // Close book with closeBook() if needed
        currentPaper--;
        console.log(`goprev Returned currentPaper of ${currentPaper}`);
        
        if (currentPaper == -1){
            closeBook(currentPaper);
        }
        console.log(`goPrev currentPaper here is ${currentPaper}, number of paper is ${noOfPapers}`);
        if (currentPaper == noOfPapers){
            openBook(currentPaper);
        }

    }
}

function addIndex(){
    const docs = document.getElementsByClassName("papers");
    let maxIndex = docs.length;
    for (let i = 0; i < docs.length; i++) {
    docs[i].style.zIndex = maxIndex -1;
    maxIndex--;
}
}


// Add Event Listeners

nextBtn.addEventListener("click", goNext);
prevBtn.addEventListener("click", goPrev);

// Call the addIndex Function
addIndex();
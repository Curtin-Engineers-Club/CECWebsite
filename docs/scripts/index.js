// index.js - All scripts for index.html (and one for history.html)

window.onscroll = function () {
    scrollRotate();
};

function scrollRotate(){ 
    let image = document.getElementById('CECGearLanding');
    if (image) {
        image.style.transform = "rotate(" + window.pageYOffset/3 + "deg)";
    }
}

// Popup Function
function popupFunc(){
    var x = document.getElementById("meetingPopup");
    var y = document.getElementById("meetingPopupButton");
    if(x.style.display === "none"){
        x.style.display = "block";
    }
    else{
        x.style.display = "none";
    }
}

// History Page Tab Switcher
function changeHistoryTab(){
    const hash = location.hash
    var ch = document.getElementById("Club History");
    var pe = document.getElementById("Past Executives");
    var lm = document.getElementById("Life Members");

    var chHeading = document.getElementById("clubHistoryHeading");
    var peHeading = document.getElementById("pastExecsHeading");
    var lmHeading = document.getElementById("lifeMembersHeading");

    if(hash === "#clubHistory"){
        ch.style.display = "block";
        pe.style.display = "none";
        lm.style.display = "none";

        chHeading.classList.add("headingBorder");

        peHeading.classList.remove("headingBorder");
        lmHeading.classList.remove("headingBorder");
    }
    if(hash === "#pastExecs"){
        ch.style.display = "none";
        pe.style.display = "block";
        lm.style.display = "none";

        peHeading.classList.add("headingBorder");

        chHeading.classList.remove("headingBorder");
        lmHeading.classList.remove("headingBorder");
    }
    if(hash === "#lifeMembers"){
        ch.style.display = "none";
        pe.style.display = "none";
        lm.style.display = "block";

        lmHeading.classList.add("headingBorder");

        peHeading.classList.remove("headingBorder");
        chHeading.classList.remove("headingBorder");
    }
}

function hamLinks(){
    var linkList = document.getElementById("hamburgerList");
    if (linkList.style.display === "flex"){
        linkList.style.display = "none";
        document.getElementById('hamburgerBackdrop').classList.remove('show');
    }
    else {
        linkList.style.display = "flex";
        document.getElementById('hamburgerBackdrop').classList.add('show');
    }
}

function getLabel(){
    fetch('data/labelMessages.json')
    .then(res => res.json())
    .then(labels => {
        const length = Object.keys(labels).length;
        const index = Math.floor(Math.random() * length);
        // console.log(index)
        // console.log(labels[index])
        const container = document.getElementById("siteLabel");
        container.innerHTML = `<div class="wipLabel">${labels[index]}</div>`
    })
}
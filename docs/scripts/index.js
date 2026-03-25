// index.js - All scripts for index.html (and one for history.html)


// check to see when the user is scrolling, and call scrollRotate()
window.onscroll = function () {
    scrollRotate();
};

// Function to rotate the CEC Gear on the landing Page
function scrollRotate(){ 
    let image = document.getElementById('CECGearLanding');
    if (image) {
        image.style.transform = "rotate(" + window.pageYOffset/3 + "deg)";
    }
}

// Function to open and close the Meeting Pop-up 
function popupFunc(){
    let x = document.getElementById("meetingPopup");
    // let y = document.getElementById("meetingPopupButton");

    if(x.style.display === "none"){ //Switch from closed to open
        x.style.display = "block";
    }
    else{ // Close the pop-up
        x.style.display = "none";
    }
}

// History Page Tab Switcher
function changeHistoryTab(){
    const hash = location.hash
    // All tab body elements
    let ch = document.getElementById("Club History");
    let pe = document.getElementById("Past Executives");
    let lm = document.getElementById("Life Members");

    // All tab heading elements
    let chHeading = document.getElementById("clubHistoryHeading");
    let peHeading = document.getElementById("pastExecsHeading");
    let lmHeading = document.getElementById("lifeMembersHeading");

    // Switch to Club History
    if(hash === "#clubHistory"){
        ch.style.display = "block";
        pe.style.display = "none";
        lm.style.display = "none";

        chHeading.classList.add("headingBorder");

        peHeading.classList.remove("headingBorder");
        lmHeading.classList.remove("headingBorder");
    }

    // Switch to Past Executive Committees
    if(hash === "#pastExecs"){
        ch.style.display = "none";
        pe.style.display = "block";
        lm.style.display = "none";

        peHeading.classList.add("headingBorder");

        chHeading.classList.remove("headingBorder");
        lmHeading.classList.remove("headingBorder");
    }

    // Switch to Life Members list
    if(hash === "#lifeMembers"){
        ch.style.display = "none";
        pe.style.display = "none";
        lm.style.display = "block";

        lmHeading.classList.add("headingBorder");

        peHeading.classList.remove("headingBorder");
        chHeading.classList.remove("headingBorder");
    }
}

// Function to open and close the hamburger menu on mobile 
function hamLinks(){
    let linkList = document.getElementById("hamburgerList");
    if (linkList.style.display === "flex"){ // Check if menu is open, then close it 
        linkList.style.display = "none";
        document.getElementById('hamburgerBackdrop').classList.remove('show');
    }
    else { // Open the menu 
        linkList.style.display = "flex";
        document.getElementById('hamburgerBackdrop').classList.add('show');
    }
}

// function to pull a random message for the top label
function getLabel(){
    fetch('data/labelMessages.json')
    .then(res => res.json())
    .then(labels => {
        const length = Object.keys(labels).length; // Get the number of messages, x
        const index = Math.floor(Math.random() * length); // Select a random number between 0 and x
        const container = document.getElementById("siteLabel"); 
        container.innerHTML = `<div class="wipLabel">${labels[index]}</div>`; // Set HTML to selected message
    })
}

// Function to fetch execHistory.json and filter based on need
function fetchExecs(category){
    const year = new Date().getFullYear();
    return fetch('data/execHistory.json')
    .then(res => res.json())
    .then(execs => {
        if(category === "current"){ // Get current committee
            return execs.filter(exec => exec.year === year);
        }
        else if(category === "past"){ // Get all Committees other than current
            return execs.filter(exec => exec.year !== year);
        }
    })
}
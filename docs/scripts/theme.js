// File to update elements for Light and Dark Modes

// Function to set the theme in HTML and local storage
function setTheme(){
    const saved = localStorage.getItem("theme");
    const html = document.documentElement;
    if (saved === "darkTheme"){ // From dark to light
        html.classList.remove('lightTheme');
        html.classList.add('darkTheme');
        localStorage.setItem("theme", "darkTheme");
        }
    else { // From light to dark 
        html.classList.remove('darkTheme');
        html.classList.add('lightTheme');
        localStorage.setItem("theme", "lightTheme");
    }
}

// Function to change monochrome icons between light and dark 
function updateThemeIcons(){
    const saved = localStorage.getItem("theme");
    const toglIcon = document.getElementById("themeToggleIcon");
    const gearIcon = document.getElementById("CECLogo");
    const hamIcon = document.getElementById("hamburgerIcon");

    if(!toglIcon || !gearIcon) return; // Check element IDs are valid
    if(saved === "darkTheme"){ // Dark to Light
        toglIcon.src = "assets/icons/DARKMODE-IconWhite.svg";
        gearIcon.src = "assets/icons/CECGearWhite.svg";
        hamIcon.src = "assets/icons/hamburgerIconWhite.svg";
    }
    else { // Light to Dark
        toglIcon.src = "assets/icons/DARKMODE-IconBlack.svg";
        gearIcon.src = "assets/icons/CECGearBlack.svg";
        hamIcon.src = "assets/icons/hamburgerIconBlack.svg";
    }
}

// Function to complete above two functions for when user wants to change theme
function changeTheme(){
    const html = document.documentElement;
    const toglIcon = document.getElementById("themeToggleIcon");
    const gearIcon = document.getElementById("CECLogo");
    const hamIcon = document.getElementById("hamburgerIcon");

    if (html.classList.contains("lightTheme")){
        html.classList.remove('lightTheme');
        html.classList.add('darkTheme');
        localStorage.setItem("theme", "darkTheme");
        toglIcon.src = "assets/icons/DARKMODE-IconWhite.svg";
        gearIcon.src = "assets/icons/CECGearWhite.svg";
        hamIcon.src = "assets/icons/hamburgerIconWhite.svg";
        }
    else {
        html.classList.remove('darkTheme');
        html.classList.add('lightTheme');
        localStorage.setItem("theme", "lightTheme");
        toglIcon.src = "assets/icons/DARKMODE-IconBlack.svg";
        gearIcon.src = "assets/icons/CECGearBlack.svg";
        hamIcon.src = "assets/icons/hamburgerIconBlack.svg";
    }
}
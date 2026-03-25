const PER_PAGE = 10;

// Function to update page numbers based on current page hash
function updatePagination() {
    // Get hash value and remove "#"
    const hash = location.hash.slice(1);

    // Get elements for Previous and Next buttons
    let prev = document.getElementById("prevPage");
    let next = document.getElementById("nextPage");

    fetchEvents("past")
    .then(events => {
        // Get list of events and divide my amount on a page
        let pages = Math.ceil(events.length / 10);
        let currentPage = parseInt(hash) || 1;

        if (hash === 1){ // Page 1 (no Prev button)
            prev.style.visibility = "hidden";
            next.style.visibility = "visible";
            next.href = "#2"; // could change this to currentPage + 1 but there will always be a page 2
        }
        if (hash ===  pages){ // Final Page (no Next button)
            next.style.visibility = "hidden";
            prev.style.visibility = "visible";
            prev.href = "#" + (currentPage - 1);
        }
        if (hash > 1 && hash < pages){ // Page n+1 - n-1 (both Prev and Next)
            prev.style.visibility = "visible";
            next.style.visibility = "visible";

            next.href = "#" + (currentPage + 1);
            prev.href = "#" + (currentPage - 1);
        }
    });
}

// Function to update get current "page Number" and set it to active, reverting all others to inactive
function updateIndexes() {
    const hash = location.hash.slice(1);
    const pageNum = parseInt(hash) || 1;

    fetchEvents("past")
    .then(events => {
        const pages = Math.ceil(events.length / 10);

        for (let i = 1; i <= pages; i++){
            document.getElementById("pageNumber" + i).classList.remove("active");
        }
        let currentPage = document.getElementById("pageNumber" + pageNum);
        currentPage.classList.add("active");
    });
}

// Function to ensure upcoming events are only displayed on page 1
function updateUpcomingEvents(containerID) {
    const hash = location.hash

    let upContainer = document.getElementById(containerID);
    let upHeading = document.getElementById("upcomingEventsHeader");

    if(hash === "#1"){ // If on page 1, display upcoming events container and header
        upContainer.style.display = "flex";
        upHeading.style.display = "flex";
    }
    else { // otherwise do not display
        upContainer.style.display = "none";
        upHeading.style.display = "none";
    }
}

// Function to get past events and generate HTML code
function updatePastEvents(containerID, imageClass) {
    const hash = location.hash.slice(1);
    const pageNum = parseInt(hash) || 1;

    // Get indexes for which events are to be displayed
    let firstIndex = (pageNum - 1) * PER_PAGE;
    let lastIndex = firstIndex + PER_PAGE;

    const container = document.getElementById(containerID);
    let html = ``;
    fetchEvents("past").then(events => {
        events.slice(firstIndex,lastIndex).forEach(event => { // Get only events that are within the set indexes
            html += `
            <div class="eventCard"> 
                <img class="${imageClass}" src="${event.image}" alt="${event.title}">
                <div class="eventInfo">
                    <div class="eventDetails">
                        <p class="txParagraph1 txWhite">${event.title}</p>
                        <p class="txParagraph2 txWhite">${event.day}<br>${event.time}</p>
                    </div>
                    <p class="txParagraph3 txWhite" style="max-width: none;">${event.description}</p>
                    <a href="${event.link}" class="yellowButton" style="padding: 6px 8px;" target="_blank" rel="noopener noreferrer">Find Out More!</a>
                </div>
            </div>
            `;
        });
        container.innerHTML = html;
    }).catch(err => {
        console.error('Failed to load past events:', err);
        container.innerHTML = '';
    });
}

// Function to auto scroll to the top of the page
function resetScroll() {
    window.scrollTo(0, 0);
}

// Function to read in eventDetails.json
function fetchEvents(category) {
    const date = new Date().getDate().toString().padStart(2, "0");
    const month = (new Date().getMonth() + 1).toString().padStart(2, "0");
    const year = new Date().getFullYear();
    const currentDate = year + "-" + month + "-" + date;

    return fetch('data/eventDetails.json')
    .then(res => res.json())
    .then(events => {
        if(category === "past"){
            return events.filter(event => event.date < currentDate); // Return only past events 
        }
        else if (category === "upcoming"){
            return events.filter(event => event.date >= currentDate).reverse(); // Return only upcoming events
        }
        return events;
    });
}
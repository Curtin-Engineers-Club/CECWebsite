const PER_PAGE = 10;


function updatePagination() {
    const hash = location.hash.slice(1);

    var prev = document.getElementById("prevPage");
    var next = document.getElementById("nextPage");

    fetch('data/pastEvents.json')
    .then(res => res.json())
    .then(events => {
        pages = Math.ceil(events.length / 10);
        let currentPage = parseInt(hash) || 1;

        if (hash == 1){
            prev.style.visibility = "hidden";
            next.style.visibility = "visible";
            next.href = "#2"; // could change this to currentPage + 1 but there will always be a page 2
        }
        if (hash ==  pages){
            next.style.visibility = "hidden";
            prev.style.visibility = "visible";
            prev.href = "#" + (currentPage - 1);
        }
        if (hash > 1 && hash < pages){
            prev.style.visibility = "visible";
            next.style.visibility = "visible";

            next.href = "#" + (currentPage + 1);
            prev.href = "#" + (currentPage - 1);
        }
    });
}

function updateIndexes() {
    const hash = location.hash.slice(1);
    const pageNum = parseInt(hash) || 1;

    fetch('data/pastEvents.json')
    .then(res => res.json())
    .then(events => {
        const pages = Math.ceil(events.length / 10);

        for (let i = 1; i <= pages; i++){
            document.getElementById("pageNumber" + i).classList.remove("active");
        }
        var currentPage = document.getElementById("pageNumber" + pageNum);
        currentPage.classList.add("active");
    });
}

function updateUpcomingEvents(containerID) {
    const hash = location.hash

    var upContainter = document.getElementById(containerID);
    var upHeading = document.getElementById("upcomingEventsHeader");

    if(hash == "#1"){
        upContainter.style.display = "flex";
        upHeading.style.display = "flex";
    }
    else {
        upContainter.style.display = "none";
        upHeading.style.display = "none";
    }
}

function updatePastEvents(containerID, imageClass) {
    const hash = location.hash.slice(1);
    const pageNum = parseInt(hash) || 1;

    firstIndex = (pageNum - 1) * PER_PAGE;
    lastIndex = firstIndex + PER_PAGE;

    fetch('data/pastEvents.json')
    .then(res => res.json())
    .then(events => {
        const container = document.getElementById(containerID, imageClass);
        let html = ``;
        events.slice(firstIndex,lastIndex).forEach(event => {
            html += `
            <div class="eventCard"> `;
            switch(imageClass){
                case "eventImgMobile":
                    html += `<img class="eventImgMobile" src="${event.image}" alt="${event.title}">`;
                    break;
                case "eventImg":
                    html += `<img class="eventImg" src="${event.image}" alt="${event.title}">`;
                    break;
            }
            html += `
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
        })
        container.innerHTML = html;
    })
}

function resetScroll() {
    window.scrollTo(0, 0);
}

function fetchEvents(category) {
    const date = new Date().getDate().toString().padStart(2, "0");
    const month = (new Date().getMonth() + 1).toString().padStart(2, "0");
    const year = new Date().getFullYear();
    const currentDate = year + "-" + month + "-" + date;
    console.log(currentDate);

    fetch('data/eventDetails.json')
    .then(res => res.json())
    .then(events => {
        events.forEach(event => {
            if(currentDate > event.date){
                console.log("past")
            }
            else if (currentDate < event.date){
                console.log("upcoming")
            }
        })
    })
}
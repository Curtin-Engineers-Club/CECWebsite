// script file for sponsor.html

let _sponsorCache = null;

// Function to read in currentSponsor.json
function fetchSponsors(filePath){
    if(_sponsorCache) return Promise.resolve(_sponsorCache);
    return fetch(filePath || '.data/currentSponsors.json')
        .then(res => {
            if(!res.ok) throw new Error('failed to fetch sponsorData.json: ' + res.status);
            return res.json();
        })
        .then(data => {_sponsorCache = data; return data;})
        .catch(err => {console.error(err); throw err;})
}

function sponsorCarousel(container){
    const innerContainer = document.getElementById(container);
    let html = ``;
    let checkedSponsors = [];

    Promise.all([
        fetch('data/pastSponsors.json').then(res => res.json()),
        fetch('data/currentSponsors.json').then(res => res.json())
    ]).then(([pastSponsors, currentSponsors]) => {
        // Add past sponsors
        pastSponsors.forEach(sponsorObj => {
            html += `
                <img class="sponsorLogo" alt="${sponsorObj.name}" src="${sponsorObj.logo}">
            `;
            checkedSponsors.push(sponsorObj.name);
        });

        // Add current sponsors if not already added
        currentSponsors.forEach(sponsorObj => {
            if (!checkedSponsors.includes(sponsorObj.name)) {
                html += `
                    <img class="sponsorLogo" alt="${sponsorObj.name}" src="${sponsorObj.logo}">
                `;
                checkedSponsors.push(sponsorObj.name);
            }
        });

        innerContainer.innerHTML = html + html;
    }).catch(err => {
        console.error('Failed to load sponsors:', err);
        innerContainer.innerHTML = '';
    });
}

// Function to get correct Class based on sponsor level
function sponsorLevel(level){
    switch((level||'').toLowerCase()){
        case 'platinum': return 'sponsorHighlightPlat';
        case 'gold': return 'sponsorHighlightGold';
        case 'silver': return 'sponsorHighlightSilv';
        case 'other': return 'sponsorHighlightOthe';
        default: return '';
    }
}

// Function to load sponsor data into HTML
function getSponsors(level, groupID, filePath){
    fetchSponsors(filePath).then(sponsor => {
        const container = document.getElementById(groupID);
        
        // Ensure sponsor data array is not empty
        if(!Array.isArray(sponsor) || sponsor.length === 0){
            container.innerHTML = `<!-- no ${level} sponsors -->`;
            return;
        }

        const parent = container.parentElement;
        const heading = parent ? parent.querySelector('.txSubtitle') : null;

        
        let filtered;
        let cssClass;
        if (filePath && filePath.includes('pastSponsors.json')) {
            filtered = sponsor;
            cssClass = 'sponsorHighlightOthe';
        } else {
            filtered = Array.isArray(sponsor) ? sponsor.filter(s => (s.level || '').toLowerCase() === (level || '').toLowerCase()) : [];
            cssClass = sponsorLevel(level);
        }
        
        if(!filtered.length){
            if (heading) heading.remove();
            container.innerHTML = `<!-- no ${level} sponsors -->`
            return;
        }

        container.innerHTML = filtered.map(s => {
            const name = s.name ? String(s.name).replace(/"/g, '&quot;') : '';
            const logo = s.logo ? String(s.logo).replace(/"/g, '&quot;') : '';
            const color = Math.random() < 0.5 ? '#5271ff' : '#FFEB31';
            return `<img alt="${name}" src="${logo}" class="${cssClass}" style="border-color: ${color}">`;
        }).join('\n');
    })
}

// Function to read in and filter opportunity data
function fetchOpportunities(containerID){
    // Get current date
    const date = new Date().getDate().toString().padStart(2, "0");
    const month = (new Date().getMonth() + 1).toString().padStart(2, "0");
    const year = new Date().getFullYear();
    const currentDate = year + "-" + month + "-" + date;
    const container = document.getElementById(containerID);

    return fetch('data/opportunityData.json')
    .then(res => res.json())
    .then(opportunities => {
        if(!Array.isArray(opportunities) || opportunities.length === 0){ // If opportunity data empty, show supplementary message
            container.innerHTML += `<p class="txSubtitle txMobile">No work opportunities at the moment!</p>`;
            console.log("No work opportunities");
        }
        // Attempt at showing "No Opportunities" message when JSON file is filled without of date opportunities
        // else{
        //     opportunities.filter(opportunity => opportunity.deadline >= currentDate);
        //     if(!Array.isArray(opportunities) || opportunities.length === 0){
        //         container.innerHTML += `<p class="txSubtitle txMobile">No work opportunities at the moment!</p>`;
        //         console.log("test3");
        //     }
        // }

        // Filter out opportunities past deadline and return active roles
        return opportunities.filter(opportunity => opportunity.deadline >= currentDate);
    });
}

// Function to generate HTML for opportunity data
function updateOpportunities(containerID, imageClass){
    fetchOpportunities(containerID)
    .then(opportunities => {
        const container = document.getElementById(containerID);
        opportunities.forEach(opportunity => {

            // Check there are opportunities to display
            if(!Array.isArray(opportunities) || opportunities.length === 0){
                const container = document.getElementById(containerID);
                container.innerHTML += `<p class="txSubtitle txMobile">No work opportunities at the moment!</p>`;
                console.log("test2");
            }

            // HTML code for individual opportunity entry
            container.innerHTML += `
                <div class="eventCard">
                    <img class=${imageClass} src="${opportunity.image}" alt="${opportunity.title}">
                    <div class="eventInfo">
                        <div class="eventDetails">
                            <p class="txParagraph1 txWhite">${opportunity.title} - ${opportunity.company}</p>
                            <p class="txParagraph2 txWhite">Applications Close<br>${opportunity.deadline}</p>
                        </div>
                        <p class="txParagraph3 txWhite" style="max-width: none;">${opportunity.description}</p>
                        <a href="${opportunity.link}" class="yellowButton" style="padding: 6px 8px;" target="_blank" rel="noopener noreferrer">Find Out More!</a>
                    </div>
                </div>
            `;
        })
    })
}
// script file for sponsor.html

let _sponsorCache = null;

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


function sponsorLevel(level){
    switch((level||'').toLowerCase()){
        case 'platinum': return 'sponsorHighlightPlat';
        case 'gold': return 'sponsorHighlightGold';
        case 'silver': return 'sponsorHighlightSilv';
        case 'other': return 'sponsorHighlightOthe';
        default: return '';
    }
}

function getSponsors(level, groupID, filePath){
    fetchSponsors(filePath).then(sponsor => {
        const container = document.getElementById(groupID);
        
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

        const html = filtered.map(s => {
            const name = s.name ? String(s.name).replace(/"/g, '&quot;') : '';
            const logo = s.logo ? String(s.logo).replace(/"/g, '&quot;') : '';
            const color = Math.random() < 0.5 ? '#5271ff' : '#FFEB31';
            return `<img alt="${name}" src="${logo}" class="${cssClass}" style="border-color: ${color}">`;
        }).join('\n');
        container.innerHTML = html;
    })
}

function fetchOppurtunities(containerID){
    const date = new Date().getDate().toString().padStart(2, "0");
    const month = (new Date().getMonth() + 1).toString().padStart(2, "0");
    const year = new Date().getFullYear();
    const currentDate = year + "-" + month + "-" + date;
    const container = document.getElementById(containerID);

    return fetch('data/oppurtunityData.json')
    .then(res => res.json())
    .then(oppurtunities => {
        if(!Array.isArray(oppurtunities) || oppurtunities.length === 0){ 
            container.innerHTML += `<p class="txSubtitle txMobile">No work oppurtunities at the moment!</p>`;
            console.log("test");
        }
        // else{
        //     oppurtunities.filter(oppurtunity => oppurtunity.deadline >= currentDate);
        //     if(!Array.isArray(oppurtunities) || oppurtunities.length === 0){ 
        //         container.innerHTML += `<p class="txSubtitle txMobile">No work oppurtunities at the moment!</p>`;
        //         console.log("test3");
        //     }
        // }
        return oppurtunities.filter(oppurtunity => oppurtunity.deadline >= currentDate).reverse();
    });
}

function updateOppurtunities(containerID, imageClass){
    fetchOppurtunities(containerID)
    .then(oppurtunities => {
        const container = document.getElementById(containerID);
        oppurtunities.forEach(oppurtunity => {

            if(!Array.isArray(oppurtunities) || oppurtunities.length === 0){ 
                const container = document.getElementById(containerID);
                container.innerHTML += `<p class="txSubtitle txMobile">No work oppurtunities at the moment!</p>`;
                console.log("test2");
            }

            container.innerHTML += `
                <div class="eventCard">
                    <img class=${imageClass} src="${oppurtunity.image}" alt="${oppurtunity.title}">
                    <div class="eventInfo">
                        <div class="eventDetails">
                            <p class="txParagraph1 txWhite">${oppurtunity.title} - ${oppurtunity.company}</p>
                            <p class="txParagraph2 txWhite">Applications Close<br>${oppurtunity.deadline}</p>
                        </div>
                        <p class="txParagraph3 txWhite" style="max-width: none;">${oppurtunity.description}</p>
                        <a href="${oppurtunity.link}" class="yellowButton" style="padding: 6px 8px;" target="_blank" rel="noopener noreferrer">Find Out More!</a>
                    </div>
                </div>
            `;
        })
    })
}
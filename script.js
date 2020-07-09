
const table = document.querySelector("tbody");
const courses = Object.keys(data.courses);

const statusMap = {
    0: "Partially at Distance",
    1: "Fully at Disance",
    2: "Technology Enhanced",
    3: "Directed Study",
    4: "Lecture",
    5: "Thesis Based",
    6: "Studio",
    7: "Lecture",
    8: "Unknown",
    9: "Directed Study",
    10: "Directed Study",
    11: "Internship/Practicum",
    12: "Unknown",
    13: "Unknown",
    14: ""
}

// console.log(data); 


for(let i = 0; i < courses.length; i++) {
    const sections = data.courses[courses[i]][1];
    const sectionKeys = Object.keys(sections);
    for(let j = 0; j < sectionKeys.length; j++) {
        const row = document.createElement("tr");
        const id = document.createElement("td");
        const name = document.createElement("td");
        const section = document.createElement("td");
        const status = document.createElement("td");    
        id.innerText = courses[i];
        name.innerText = data.courses[courses[i]][0];
        section.innerText = sectionKeys[j];
        status.innerText = statusMap[sections[sectionKeys[j]][3]];

        if(status.innerText == "undefined") {
            console.log(`${id.innerText}: ${name.innerText}: ${sections[sectionKeys[j]][3]}`)
        }

        row.appendChild(id)
        row.appendChild(name);
        row.appendChild(section);
        row.appendChild(status);
        table.appendChild(row);
    }
}
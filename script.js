
const table = document.querySelector("tbody");
const courses = Object.keys(data.courses);

const statusMap = {
    0:"Partially at a Distance",
    1:"UNKNOWN",
    2:"UNKNOWN",
    3:"Research/Thesis/Directed Learning (not specified if online)",
    4:"Fully at a Distance",
    5:"Research/Thesis/Directed Learning (not specified if online)",
    6:"UNKNOWN",
    7:"UNKNOWN",
    8:"UNKNOWN",
    9:"Research/Thesis/Directed Learning (not specified if online)",
    10:"Research/Thesis/Directed Learning (not specified if online)",
    11:"UNKNOWN",
    12:"UNKNOWN",
    13:"Technology Enhanced",
    14:"UNKNOWN",
    15:"UNKNOWN",
    16:"UNKNOWN",
    17:"UNKNOWN",
    18:"10 Instructional Method",
    19:"91 Instructional Method",
    20:"Research/Thesis/Directed Learning(not specified if online)",
    21:"55 Instructional Method",
    22:"UNKNOWN",
    23:"Research/Thesis/Directed Learning(not specified if online)",
    24:"81 Instructional Method",
    25:"Research/Thesis/Directed Learning(not specified if online)"
}

// List of unique textual statuses
const uniqStatus = data.scheduleTypes.filter((v,i,s) => s.indexOf(v) === i).sort()

window.onload = () => {
  const sel = document.getElementById("selectStatus")
  uniqStatus.forEach(stat => {
    var opt = document.createElement("option")
    opt.text = stat
    opt.selected = true
    sel.options.add(opt,1)
  })
  const courseFilter = document.getElementById("courseFilter")
  const updateFilters = () => {
    setTimeout(() => {
      const shownStatuses = [].slice.call(sel.selectedOptions).map(o => o.text)
      const filterText = courseFilter.value.toLowerCase()
      table.childNodes.forEach(row => {
        const courseIdMatches = row.childNodes[0].innerHTML.toLowerCase().includes(filterText)
        const courseNameMatches = row.childNodes[1].innerHTML.toLowerCase().includes(filterText)
        const statusMatches = shownStatuses.includes(row.childNodes[3].innerHTML)
        row.hidden = !((courseIdMatches || courseNameMatches) && statusMatches)
      })
    },10)
  }
  sel.addEventListener("input",updateFilters)
  courseFilter.addEventListener("input",updateFilters)
  updateFilters()
}

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
        status.innerText = data.scheduleTypes[sections[sectionKeys[j]][3]];

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

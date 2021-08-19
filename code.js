"use strict"

// functions
let check = (item, _class) => item.classList.contains(_class);
let add = (item, _class) => item.classList.add(_class);
let remove = (item, _class) => item.classList.remove(_class);
let buildMainJobList = (arr) => {
    document.querySelector(".jobs").innerHTML =
        ` ${arr.map(item =>
            `<li class="job card ${item.featured ? "highlight-card" : ""}">
                <img class="job-card__company-img" src="${item.logo}" alt="" />
                <div class="job-card__job-info">
                    <h3 class="job-info__company-name">
                     ${item.company}
                    <span style=display:${item.new ? `inline-block` : `none`} class="highlight new ">NEW</span> <span style=display:${item.featured ? `inline-block` : `none`} class="highlight  featured">FEATURED</span>
                    </h3>
                    <h2 class="job-info__job-title">${item.position}</h2>
                    <p class="job-info__details"> ${item.postedAt} . ${item.contract} . ${item.location}</p>
                </div>
            <hr/>
            <ul class="job-card__categoreis">
                <li class="category">${item.role}</li>
                <li class="category">${item.level}</li>
                ${item.languages.map(ele => `<li class="category">${ele}</li>`).join("")}
                ${item.tools.map(ele => `<li class="category">${ele}</li>`).join("")}
            </ul>
            </li>`).join("")}`
}

let buildSearchItemsNamesList = (arr) => {
    if (arr.length === 0) {
        document.querySelector(".search").innerHTML = ``;
    }
    else {
        document.querySelector(".search").innerHTML = `${arr.map(item => {
            return `<li class="search-item category">
                    <p>${item}</p>
                    <i class="fas fa-times"></i>
                </li>`
        }).join("")}`
    }

}

let clearSearch = () => {
    add(searchBox, "hidden");
    searchItemsFouned = [];
    searchItemsNames = [];
    myData = JSON.parse(data);
    buildSearchItemsNamesList(searchItemsNames);
    buildMainJobList(myData);
}

//dom elemnts
let searchBox = document.getElementById("search-box-js");
let searchClear = document.getElementById("search-btn-js");
//variables
let myData = JSON.parse(data);
let searchItemsFouned = [];
let searchItemsNames = [];
//main

buildMainJobList(myData);

//event listners

window.addEventListener("click", (e) => {
    if (check(e.target, "category")) {
        remove(searchBox, "hidden");
        if (!searchItemsNames.includes(e.target.textContent)) {
            myData.forEach(element => {
                // for role and level categories
                if (Object.values(element).includes(e.target.textContent)) {
                    searchItemsFouned.push(element);
                }
                element.languages.forEach((item) => {
                    if (item.includes(e.target.textContent)) {
                        searchItemsFouned.push(element);
                    }
                })
                element.tools.forEach((item) => {

                    if (item.includes(e.target.textContent)) {
                        searchItemsFouned.push(element);
                    }
                })
            });
            searchItemsNames.push(e.target.textContent);
            buildSearchItemsNamesList(searchItemsNames);
            buildMainJobList(searchItemsFouned);
            myData = [...searchItemsFouned];
            searchItemsFouned = [];
            console.log(myData)
        }
    }
    else if (check(e.target, "fa-times")) {
        let deletedItem = e.target.previousElementSibling.textContent;
        searchItemsNames.splice(searchItemsNames.indexOf(deletedItem), 1);
        buildSearchItemsNamesList(searchItemsNames);
        if (searchItemsNames.length === 0) {
            clearSearch()
        }
    }
})

searchClear.addEventListener("click", () => {
    clearSearch()
})







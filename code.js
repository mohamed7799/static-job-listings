"use strict"

// functions
let check = (item, _class) => item.classList.contains(_class);
let add = (item, _class) => item.classList.add(_class);
let remove = (item, _class) => item.classList.remove(_class);
let toggle = (item, _class) => check(item, _class) ? remove(item, _class) : add(item, _class);
let buildJobList = (arr) => {
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

let buildSearchList = (arr) => {

    document.querySelector(".search").innerHTML = `${arr.map(item => {
        return `<li class="search-item category">
                    <p>${item}</p>
                    <i class="fas fa-times"></i>
                </li>`
    }).join("")}`
}

//dom elemnts
let searchBox = document.getElementById("search-box-js");
let searchClear = document.getElementById("search-btn-js");
let categoreis = document.querySelector(".jobs");

//variables
let myData = JSON.parse(data);
let searchItems = [];

//main

buildJobList(myData);

//event listners

categoreis.addEventListener("click", (e) => {
    if (check(e.target, "category")) {
        remove(searchBox, "hidden");
        if (!searchItems.includes(e.target.textContent)) {
            searchItems.push(e.target.textContent);
            buildSearchList(searchItems);
        }
    }
})

searchClear.addEventListener("click", () => {
    add(searchBox, "hidden");
    searchItems = [];
    buildJobList(myData);
})



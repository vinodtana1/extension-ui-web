let searchbar, searchIcon;

let list_item_template, list_item_node;
const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const serverUrl = "http://13.233.1.1:4000/home";
window.onload = function () {
  searchbar = document.querySelector(".search-bar");
  // searchIcon = document.querySelector(".search-icon");
  // list_item_template = document.querySelector(".list-item-template");
  // list_item_node = document.importNode(list_item_template.content, true);
  addCurrentTime();
  getrecentProdcasts();
  getAllEvents();
  // addTopSites();

  // searchIcon.addEventListener("click", () => {
  //   newTab.search();
  // });
  searchbar.addEventListener("keyup", (e) => {
    if (e.which == 13) {
      newTab.search();
    }
  });
};

let newTab = {
  search: function () {
    let query = searchbar.value;
    if (query.trim() != "") {
      window.location.href = `https://search.yahoo.com/search?p=${query}`;
    }
  },
};
function getAllEvents() {
  const Http = new XMLHttpRequest();
  const url = serverUrl + "/event/all";
  Http.open("GET", url);
  Http.send();

  Http.onreadystatechange = (e) => {
    console.log(Http.responseText);
    if (Http.responseText) {
      const resp = JSON.parse(Http.responseText);
      console.log("resp", resp);
      const finalData = resp?.data;
      console.log("finalData", finalData);
      delete finalData?.event_time;
      delete finalData?.__v;
      delete finalData?._id;

      appendallEvents(finalData);
    }
  };
}
function appendallEvents(finalData) {
  // for (val of finalData) {
  //   console.log("finalData", val);
  // }
  var recentContent = "";
  for (var key in finalData) {
    const keyName =
      key === "Apple" || key === "Google"
        ? `${key} Podcasts`
        : key === "PocketCasts"
        ? "Pocket Casts"
        : key === "PodcastGuru"
        ? "Podcast Guru"
        : key;
    console.log("finalData", key);
    if (key !== "DailyQuote") {
      var logoLink = `./images/icons/${key}.svg`;
      recentContent += ` <div class="exten-lisen-items-row">
    <div class="exten-lisen-items-row-left">
        <div class="exten-lisen-row-l">
            <img src="${logoLink}" />
        </div>
        <div class="exten-lisen-row-c">
            <p class="exten-lisen-row-c1">${keyName}</p>
        </div>
    </div>
    <div class="exten-lisen-row-r">

  <a
      href="${finalData[key]}"
      target="_blank"
    >
      <img src="./images/external-link-fill.png" />
    </a>
        </div>
</div>`;
    }
  }

  document.getElementById("exten-lisen-items-all1").innerHTML = recentContent;
  document.getElementById("daily-quote-text-data").innerHTML =
    finalData?.DailyQuote;

  // console.log("recentContentrecentContent", recentContent);
}
function getrecentProdcasts() {
  const Http = new XMLHttpRequest();
  const url = serverUrl + "/prodcast/all";
  Http.open("GET", url);
  Http.send();

  Http.onreadystatechange = (e) => {
    // console.log(Http.responseText);
    if (Http.responseText) {
      const resp = JSON.parse(Http.responseText);
      // console.log("resp", resp);
      const finalData = resp?.data;
      // console.log("finalData", finalData);
      delete finalData?.event_time;
      delete finalData?.__v;
      delete finalData?._id;

      appendRecentProdcasts(finalData);
      // finalData.forEach((val) => console.log(val));

      // for (val of finalData) {
      //   console.log("finalData", val);
      // }
    }
  };
}
function appendRecentProdcasts(finalData) {
  var recentContent = "";

  recentContent = `
  <div class="exten-lisen-items-row">
    <div class="exten-lisen-items-row-left">
      <div class="exten-lisen-row-l">
        <img src="./images/Frame 11.png" />
      </div>
      <div class="exten-lisen-row-c">
        <p class="exten-lisen-row-c1">${finalData?.Podcasts1Title}</p>
        <p class="exten-lisen-row-c2">
          <span>December 1</span> <span>31 min</span>
        </p>
      </div>
    </div>
    <div class="exten-lisen-row-r">
      <a
        href="${finalData?.Podcasts1Link}"
        target="_blank"
      >
        <img src="./images/external-link-fill.png" />
      </a>
    </div>
  </div><div class="exten-lisen-items-row">
  <div class="exten-lisen-items-row-left">
    <div class="exten-lisen-row-l">
      <img src="./images/Frame 11.png" />
    </div>
    <div class="exten-lisen-row-c">
      <p class="exten-lisen-row-c1">${finalData?.Podcasts2Title}</p>
      <p class="exten-lisen-row-c2">
        <span>December 1</span> <span>31 min</span>
      </p>
    </div>
  </div>
  <div class="exten-lisen-row-r">
    <a
      href="${finalData?.Podcasts2Link}"
      target="_blank"
    >
      <img src="./images/external-link-fill.png" />
    </a>
  </div>
</div><div class="exten-lisen-items-row">
<div class="exten-lisen-items-row-left">
  <div class="exten-lisen-row-l">
    <img src="./images/Frame 11.png" />
  </div>
  <div class="exten-lisen-row-c">
    <p class="exten-lisen-row-c1">${finalData?.Podcasts3Title}</p>
    <p class="exten-lisen-row-c2">
      <span>December 1</span> <span>31 min</span>
    </p>
  </div>
</div>
<div class="exten-lisen-row-r">
  <a
    href="${finalData?.Podcasts3Link}"
    target="_blank"
  >
    <img src="./images/external-link-fill.png" />
  </a>
</div>
</div>`;

  // for (var key in finalData) {
  //   console.log("finalData", key);
  //   // recentContent;
  // }
  // console.log("recentContentrecentContent", recentContent);
  document.getElementById("exten-lisen-items-all").innerHTML = recentContent;
}
function addTopSites() {
  console.log("chrome", chrome);
  chrome.topSites.get((topSites) => {
    topSites = topSites.slice(0, 8);
    topSites.forEach((site) => {
      let node = list_item_node.cloneNode(true);
      node.querySelector(".label").textContent =
        site.title != "" ? site.title : site.url;
      node.querySelector(".list-item").title = site.title;
      node.querySelector(".list-item").href = site.url;
      let logo = node.querySelector(".site-icon");
      logo.innerText = site.title[0];
      //   document.querySelector(".top-sites").appendChild(node);
    });
  });
}
function addCurrentTime() {
  console.log("vinos");
  addCurrentTime1();
  setInterval(() => {
    addCurrentTime1();
  }, 1000);
}

function addCurrentTime1() {
  var date = new Date();
  var current_date =
    "" +
    date.getDate() +
    " " +
    month[date.getMonth()] +
    " " +
    date.getFullYear();

  document.getElementById("currentDate").innerHTML = current_date;
  document.getElementById("exten-date-sec-date").innerHTML = current_date;

  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  document.getElementById("exten-date-sec-time").innerHTML = strTime;
}

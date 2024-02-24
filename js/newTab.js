let searchbar, searchIcon;

let list_item_template, list_item_node;
let user_id = "65bfea4f7a6d16fd90688ccc";
let slideIndex = 1;
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
const eventsData = {
  Apple: "https://podcasts.apple.com/us/podcast/the-secret-place/id1712959761?ign-itscg=30200&ign-itsct=lt_p",
  Snapchat: "https://www.snapchat.com/add/carewellington?invite_id=DmYgI4Ye&locale=en_US&share_id=wAkT2tXpR8mXHFcB7HE6Mw&sid=5ab73d7912fd49c187a237f3d2ba71b8",
  Google: "https://podcasts.google.com/feed/aHR0cHM6Ly9hbmNob3IuZm0vcy9lYjhiNzQyOC9wb2RjYXN0L3Jzcw",
  Instgram: "https://www.instagram.com/carewellington",
  PodcastGuru: "https://app.podcastguru.io/podcast/1712959761",
  RSS: "https://anchor.fm/s/eb8b7428/podcast/rss",
  Spotify: "https://open.spotify.com/show/51FVdMSSV7Zl3GJ6PAswnC?si=O1qq_dyaT52s7A3Cv84ygA&utm_medium=share&utm_source=linktree&nd=1&dlsi=09388a93681b437c",
  Youtube: "https://www.youtube.com/@carew_ellington",
  Bullhorn: "https://www.bullhorn.fm/page-not-found/not-imported",
  Castbox: "https://castbox.fm/channel/5645306?utm_campaign=ex_share_ch&utm_medium=exlink&country=gb",
  Castro: "https://castro.fm/podcast/da9d33e4-9585-4f3c-9a50-14b60d44cb65",
  Overcast: "https://overcast.fm/login",
  PocketCasts: "https://pca.st/urywb96y",
  Podbean: "https://www.podbean.com/podcast-detail/gf4zq-2d5ac5/The-Secret-Place-Podcast",
  TikTok: "https://tiktok.com/@carew_ellington",
  yourwebsite: "https://carewellington.com/"
};
const prodcastsData = {
  _id: "65bfec937a6d16fd90688ce4",
  userId: "65bfea4f7a6d16fd90688ccc",
  items: [
    {
      podcastTitle: "Displays your GitHub notifications unread count 1",
      podcastLink:
        "https://podcasts.apple.com/us/podcast/the-secret-place/id1712959761?ign-itscg=30200&ign-itsct=lt_p",
      image: "",
    },
    {
      podcastTitle: "cations unread count",
      podcastLink:
        "https://podcasts.apple.com/us/podcast/the-secret-place/id1712959761?ign-itscg=30200&ign-itsct=lt_p",
      image: "",
    },
    {
      podcastTitle: "Displays your GitHub notifications unread count",
      podcastLink:
        "https://podcasts.apple.com/us/podcast/the-secret-place/id1712959761?ign-itscg=30200&ign-itsct=lt_p",
      image: "",
    },
  ],
};
const dailyQData = {
  _id: "65bfeb737a6d16fd90688cd2",
  userId: "65bfea4f7a6d16fd90688ccc",
  items: [
    {
      date: "02-04-2024",
      text:
        "Displays your GitHub notifications unread countDisplays your GitHub notifications unread countDisplays your GitHub notifications unread countDisplays your GitHub notifications unread countDisplays your GitHub notifications unread countDisplays your GitHub notifications unread countDisplays your GitHub notifications unread countDisplays your GitHub notifications unread countDisplays your GitHub notifications unread count",
    },
    {
      date: "02-27-2024",
      text:
        "Displays your GitHub notifications unread countDisplays your GitHub notifications unread countDisplays your GitHub notifications unread countDisplays your GitHub notifications unread countDisplays your GitHub notifications unread countDisplays your GitHub notifications unread countDisplays your GitHub notifications unread countDisplays your GitHub notifications unread count",
    },
    {
      date: "02-11-2024",
      text:
        "ub notifications unread countDisplays your GitHub notifications unread countDisplays your GitHub notifications unread countDisplays your GitHub notifications unread countDisplays your GitHub notifications unread count",
    },
  ],
};
const serverUrl = "https://api.socialstarhub.com/home";
// const serverUrl = "http://13.233.1.1:4000/home";
// const serverUrl = "http://localhost:4000/home";
const reqObj = JSON.stringify({ userId: user_id });
console.log("reqObj", reqObj);
window.onload = function () {
  searchbar = document.querySelector(".search-bar");
  // searchIcon = document.querySelector(".search-icon");
  // list_item_template = document.querySelector(".list-item-template");
  // list_item_node = document.importNode(list_item_template.content, true);
  addCurrentTime();

  appendallEvents(eventsData);
  appendRecentProdcasts(prodcastsData);
  appendDailyQuates(dailyQData);

  getrecentProdcasts();
  getAllEvents();
  getAllDailyQuates();
  // addTopSites();

  // searchIcon.addEventListener("click", () => {
  //   newTab.search();
  // });
  searchbar.addEventListener("keyup", (e) => {
    if (e.which == 13) {
      newTab.search();
    }
  });

  // showSlides(slideIndex);
};

let newTab = {
  search: function () {
    let query = searchbar.value;
    if (query.trim() != "") {
      window.location.href = `https://ext.iadispatcher.com/handler/?a=sf.typedin.inf1&q=${query}`;
    }
  },
};

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  console.log("n,", n);
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var slides1 = document.getElementsByClassName("currentHeaderDates");
  // var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < slides1.length; i++) {
    slides1[i].style.display = "none";
  }
  // for (i = 0; i < dots.length; i++) {
  //   dots[i].className = dots[i].className.replace(" active", "");
  // }
  slides[slideIndex - 1].style.display = "block";
  slides1[slideIndex - 1].style.display = "block";
  // dots[slideIndex - 1].className += " active";
}

function getAllEvents() {
  const http = new XMLHttpRequest();
  const url = serverUrl + "/event/getEventsById";
  http.open("POST", url, true);

  http.setRequestHeader("Content-type", "application/json; charset=utf-8");
  // http.setRequestHeader("Content-length", reqObj.length);
  // http.setRequestHeader("Connection", "close");

  http.onreadystatechange = (e) => {
    if (http.responseText) {
      const resp = JSON.parse(http.responseText);
      const finalData = resp?.data;
      delete finalData?.event_time;
      delete finalData?.__v;
      delete finalData?._id;

      appendallEvents(finalData);
    }
  };
  http.send(reqObj);
}
function appendallEvents(finalData) {
  // for (val of finalData) {
  //   console.log("finalData", val);
  // }
  var recentContent = "";
  var inputLInks = "";
  for (var key in finalData) {
    var logoLink = `./images/icons/${key}.svg`;
    const keyName =
      key === "Apple" || key === "Google"
        ? `${key} Podcasts`
        : key === "PocketCasts"
          ? "Pocket Casts"
          : key === "PodcastGuru"
            ? "Podcast Guru"
            : key;
    if (key !== "yourwebsite" && key !== "userId")
      if (
        key === "Instgram" ||
        key === "Youtube" ||
        key === "TikTok" ||
        key === "Snapchat"
      ) {
        inputLInks += `<a href="${finalData[key]}" target="_blank"> <img
        src="${logoLink}" /></a>`;
      } else {
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

  document.getElementById("exten-icons-sec-links").innerHTML = inputLInks;
  document.getElementById("exten-lisen-items-all1").innerHTML = recentContent;
}
function getrecentProdcasts() {
  const url = serverUrl + "/prodcast/getProdcastById";

  const http = new XMLHttpRequest();
  http.open("POST", url, true);
  http.setRequestHeader("Content-type", "application/json; charset=utf-8");
  // http.setRequestHeader("Content-length", reqObj.length);
  // http.setRequestHeader("Connection", "close");

  http.onreadystatechange = (e) => {
    // console.log(Http.responseText);
    if (http.responseText) {
      const resp = JSON.parse(http.responseText);
      const finalData = resp?.data;
      appendRecentProdcasts(finalData);
    }
  };
  http.send(reqObj);
}
function appendRecentProdcasts(finalData) {
  const allItems = finalData?.items;
  var recentContent = "";
  const sImage = "./images/Frame 11.png";
  for (let i = 0; i < allItems.length; i++) {
    const cItem = allItems[i];
    var newLink = cItem?.image || sImage;
    recentContent += `<div class="exten-lisen-items-row">
    <div class="exten-lisen-items-row-left">
      <div class="exten-lisen-row-l">
        <img src="${newLink}" />
      </div>
      <div class="exten-lisen-row-c">
        <p class="exten-lisen-row-c1">${cItem?.podcastTitle}</p>
        <p class="exten-lisen-row-c2">
          <span>December 1</span> <span>31 min</span>
        </p>
      </div>
    </div>
    <div class="exten-lisen-row-r">
      <a
        href="${cItem?.podcastLink}"
        target="_blank"
      >
        <img src="./images/external-link-fill.png" />
      </a>
    </div>
  </div>`;
  }
  document.getElementById("exten-lisen-items-all").innerHTML = recentContent;
}

function getAllDailyQuates() {
  const http = new XMLHttpRequest();
  const url = serverUrl + "/dailyQuote/getDailyQuoteById";
  http.open("POST", url, true);

  http.setRequestHeader("Content-type", "application/json; charset=utf-8");
  // http.setRequestHeader("Content-length", reqObj.length);
  // http.setRequestHeader("Connection", "close");

  http.onreadystatechange = (e) => {
    if (http.responseText) {
      const resp = JSON.parse(http.responseText);
      const finalData = resp?.data;
      delete finalData?.event_time;
      delete finalData?.__v;
      delete finalData?._id;

      appendDailyQuates(finalData);
    }
  };
  http.send(reqObj);
}
function appendDailyQuates(finalData) {
  console.log("appendDailyQuates", finalData);
  const allItems = finalData?.items;
  var recentContent = "";
  var currentDates = "";
  for (let i = 0; i < allItems.length; i++) {
    const cItem = allItems[i];
    recentContent += `<div class="mySlides">
        <p>${cItem?.text}</p>
    </div>`;

    currentDates += `<span class="currentHeaderDates">
    ${cItem?.date}
</span>`;
  }
  document.getElementById(
    "exten-daily-quate-text-middle-text"
  ).innerHTML = recentContent;
  document.getElementById("currentDate").innerHTML = currentDates;
  showSlides(slideIndex);
}
function addTopSites() {
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

  // document.getElementById("currentDate").innerHTML = current_date;
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

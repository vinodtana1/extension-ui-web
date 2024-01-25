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
const serverUrl = "https://api.socialstarhub.com/home";
window.onload = function () {
  searchbar = document.querySelector(".search-bar");
  // searchIcon = document.querySelector(".search-icon");
  // list_item_template = document.querySelector(".list-item-template");
  // list_item_node = document.importNode(list_item_template.content, true);
  addCurrentTime();
  getrecentProdcasts();
  getAllEvents();

  const element = document.getElementById("exten-daily-quate1");
  element.addEventListener("click", sendNotification);

  (function (f, b) {
    if (!b.__SV) {
      var e, g, i, h;
      window.mixpanel = b;
      b._i = [];
      b.init = function (e, f, c) {
        function g(a, d) {
          var b = d.split(".");
          2 == b.length && ((a = a[b[0]]), (d = b[1]));
          a[d] = function () {
            a.push([d].concat(Array.prototype.slice.call(arguments, 0)));
          };
        }
        var a = b;
        "undefined" !== typeof c ? (a = b[c] = []) : (c = "mixpanel");
        a.people = a.people || [];
        a.toString = function (a) {
          var d = "mixpanel";
          "mixpanel" !== c && (d += "." + c);
          a || (d += " (stub)");
          return d;
        };
        a.people.toString = function () {
          return a.toString(1) + ".people (stub)";
        };
        i = "disable time_event track track_pageview track_links track_forms track_with_groups add_group set_group remove_group register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking start_batch_senders people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.remove".split(
          " "
        );
        for (h = 0; h < i.length; h++) g(a, i[h]);
        var j = "set set_once union unset remove delete".split(" ");
        a.get_group = function () {
          function b(c) {
            d[c] = function () {
              call2_args = arguments;
              call2 = [c].concat(Array.prototype.slice.call(call2_args, 0));
              a.push([e, call2]);
            };
          }
          for (
            var d = {},
              e = ["get_group"].concat(
                Array.prototype.slice.call(arguments, 0)
              ),
              c = 0;
            c < j.length;
            c++
          )
            b(j[c]);
          return d;
        };
        b._i.push([e, f, c]);
      };
      b.__SV = 1.2;
      e = f.createElement("script");
      e.type = "text/javascript";
      e.async = !0;
      e.src =
        "undefined" !== typeof MIXPANEL_CUSTOM_LIB_URL
          ? MIXPANEL_CUSTOM_LIB_URL
          : "file:" === f.location.protocol &&
            "//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\/\//)
          ? "https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js"
          : "//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";
      g = f.getElementsByTagName("script")[0];
      g.parentNode.insertBefore(e, g);
    }
  })(document, window.mixpanel || []);

  // Enabling the debug mode flag is useful during implementation,
  // but it's recommended you remove it for production
  mixpanel.init("28a25758967497d84a1dfd9fd3abc6be", { debug: true });
  mixpanel.track("Page_on_loaded");

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

function sendNotification() {
  console.log("sendNotification");
  chrome.notifications.create(
    "name-for-notification",
    {
      type: "basic",
      iconUrl: "image.jpeg",
      title: "This is a notification",
      message: "hello there!",
    },
    function () {}
  );

  chrome.notifications.create("vinod-noti-cation", {
    title: "Just wanted to notify you 4444",
    message: "How great it is!",
    iconUrl: "/robot-face_1f916.png",
    type: "basic",
  });

  // chrome.runtime.sendMessage('', {
  //   type: 'notification',
  //   options: {
  //     title: 'Just wanted to notify you',
  //     message: 'How great it is!',
  //     iconUrl: '/icon.png',
  //     type: 'basic'
  //   }
  // });
  chrome.runtime.sendMessage("vinod-noti-cation", {
    type: "notification",
    options: {
      title: "Just wanted to notify you 3333 ",
      message: "How great it is!",
      iconUrl: "/icon.png",
      type: "basic",
    },
  });
}

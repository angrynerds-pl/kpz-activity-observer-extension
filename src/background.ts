import { environment } from "@env/environment";

class Site {
  url: string;
  startTime: Date;
  endTime?: Date;
  recordID?: string;
  tabId?: number;
  windowId?: number;

  constructor(url, startTime, tabId, windowId) {
    this.url = url;
    this.startTime = startTime;
    this.tabId = tabId;
    this.windowId = windowId;
  }
}

let currentSite: Site;
let user;

function updateUser() {
  if (!user) {
    // if there was no user previously the site monitoring is invalid
    currentSite = null;
  }
  return JSON.parse(localStorage.getItem("currentUser"));
}

function postSite(site: Site): Promise<any> {
  return new Promise((resolve, reject) => {
    console.log("POST", site);
    user = updateUser();
    if (!user) {
      return reject(new Error("User not logged in"));
    }
    fetch(`${environment.apiUrl}/sites`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-auth-token": user.accessToken
      },
      body: JSON.stringify(site)
    })
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          response
            .json()
            .then(json => {
              site.recordID = json.recordID;
              return resolve({
                recordID: json.recordID
              });
            })
            .catch(error => {
              return reject(error);
            });
        } else {
          console.error(response);
          return reject();
        }
      })
      .catch(error => {
        return reject(error);
      });
  });
}

function patchSite(site: Site): Promise<any> {
  return new Promise((resolve, reject) => {
    console.log("PATCH", site);
    user = updateUser();
    if (!user) {
      return reject(new Error("User not logged in"));
    }
    fetch(`${environment.apiUrl}/sites`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        "x-auth-token": user.accessToken
      },
      body: JSON.stringify(site)
    })
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          return resolve();
        } else {
          console.error(response);
          return reject();
        }
      })
      .catch(error => {
        return reject(error);
      });
  });
}

function sendSite(site: Site) {
  return new Promise((resolve, reject) => {
    if (site.url.trim() === "") {
      return reject(new Error("Site has empty URL"));
    }
    if (site.recordID) {
      if (!site.endTime) {
        site.endTime = new Date();
      }
      patchSite(site).then(
        () => {
          return resolve();
        },
        error => reject(error)
      );
    } else {
      postSite(site).then(
        response => {
          site.recordID = response.recordID;
          console.log("AFTER POST", currentSite);
          return resolve(site);
        },
        error => reject(error)
      );
    }
  });
}

function handleTabChange(tab: chrome.tabs.Tab) {
  console.log("handleTabChange", tab, currentSite);
  if (tab.url.trim() === "") {
    return;
  }
  if (tab.active) {
    if (currentSite !== undefined && currentSite !== null) {
      if (tab.url !== currentSite.url) {
        currentSite.endTime = new Date();
        sendSite(currentSite)
          .then(() => {
            currentSite = new Site(tab.url, new Date(), tab.id, tab.windowId);
            return sendSite(currentSite);
          })
          .catch(console.error);
      }
    } else {
      currentSite = new Site(tab.url, new Date(), tab.id, tab.windowId);
      sendSite(currentSite).then(null, console.error);
    }
  }
}

function handleClose() {
  console.log("REMOVED", currentSite);
  sendSite(currentSite).then(
    () => {
      currentSite = null;
      localStorage.removeItem("lastSite");
    },
    error => {
      console.error(error);
      currentSite = null;
    }
  );
}

function init() {
  user = updateUser();
  const lastSite = JSON.parse(localStorage.getItem("lastSite"));
  if (lastSite) {
    sendSite(lastSite)
      .then(() => {
        console.log("SENT LAST SITE");
        localStorage.removeItem("lastSite");
      })
      .catch(console.error);
  }

  chrome.tabs.query(
    {
      active: true
    },
    tabs => {
      if (tabs[0] && tabs[0].url.trim() !== "") {
        currentSite = new Site(
          tabs[0].url,
          new Date(),
          tabs[0].id,
          tabs[0].windowId
        );
        sendSite(currentSite);
      }

      chrome.tabs.onCreated.addListener(tab => {
        console.log("CREATED", tab, currentSite);
        handleTabChange(tab);
      });
      chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
        if (changeInfo.status === "complete") {
          console.log("UPDATED", tab, currentSite);
          handleTabChange(tab);
        }
      });
      chrome.tabs.onActivated.addListener(activeInfo => {
        chrome.tabs.get(activeInfo.tabId, tab => {
          console.log("ACTIVATED", tab, currentSite);
          handleTabChange(tab);
        });
      });
      chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
        if (currentSite !== null && currentSite !== undefined) {
          currentSite.endTime = new Date();
          localStorage.setItem("lastSite", JSON.stringify(currentSite));
          if (currentSite.tabId === tabId) {
            handleClose();
          }
        }
      });

      chrome.windows.onRemoved.addListener(windowId => {
        if (currentSite !== null && currentSite !== undefined) {
          currentSite.endTime = new Date();
          localStorage.setItem("lastSite", JSON.stringify(currentSite));
          if (currentSite.windowId === windowId) {
            handleClose();
          }
        }
      });
    }
  );
}

chrome.runtime.onStartup.addListener(() => {
  console.log("onStartup");
  init();
});
chrome.runtime.onInstalled.addListener(() => {
  console.log("onInstalled");
  init();
});

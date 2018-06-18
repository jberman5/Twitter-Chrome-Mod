var jsChecktimer = setInterval(checkForJS_Finish, 200);
var userID;
var item, abusive_list; // jSON returned from server. Making it public for highlighting abusive words on lazy loading
var stranger_list = [];

function get_score(username, callback) {
  var url = "https://pumpkin-shortcake-65417.herokuapp.com/tpi?user=" + username + "&numberTwit=200";
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (request.readyState == 4 && request.status == 200) {
      callback(request.responseText); // Another callback here
    }
  };
  request.open('GET', url);
  request.send();
}

window.onscroll = function(ev) {
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    // you're at the bottom of the page
    if (item.yes_no)
      highlightAbusivePosts(abusive_list);
  }
};

function checkabusive(data) {
  item = JSON.parse(data);
  console.log(item);
  if (item.yes_no == true) {
    abusive_list = item.word_list.map(function(d) {
      return d.word
    })
    changeBio(abusive_list);
<<<<<<< HEAD
=======
    // changeTweet();
    changeAvi();
    // changeToReport();
>>>>>>> 1d181f365f6a1e5546bdbed72664ca2ab0061541
    highlightAbusivePosts(abusive_list);
   }
}

function get_score_notif(userIDNode) {
  var url = "https://pumpkin-shortcake-65417.herokuapp.com/tpi?user=" + userIDNode.innerText + "&numberTwit=200";
  console.log(url);
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (request.readyState == 4 && request.status == 200) {
      let stranger_item = JSON.parse(request.responseText);
      console.log(stranger_item.yes_no);
      if (stranger_item.yes_no == true) {
        changeNameHeader(userIDNode);
      }
    }
  };
  request.open('GET', url);
  request.send();
  // if
  //     highlightAbusivePosts(abusive_list);
  //  }
  //  else {
  //    console.log("this is a nice person");
  //  }
}

function findUserId(document) {
  let userID = document.querySelector(".u-linkComplex-target");
  return userID.innerText;
}

function checkNotifUserId(document) {
  let container = document.querySelector(".stream");
  let items = container.querySelectorAll(".account-group");
  items.forEach(function(element) {
    let userIDNode = element.querySelector(".account-group .username > b");
    if (!stranger_list.includes(userIDNode.innerText)) {
      stranger_list.push(userIDNode.innerText);
      console.log(userIDNode.innerText);
      get_score_notif(userIDNode);
    }
  });
}

function highlightAbusivePosts(abusive_list) {

  var alltweets = document.querySelectorAll(".tweet-text");
    for(i=0;i<alltweets.length;i++)
    {
      var tweet = alltweets[i].innerText.toLowerCase();
      for(j=0;j<abusive_list.length;j++){
        var reg = new RegExp("\\b" + abusive_list[j] + "\\b", 'i')
        if(reg.test(tweet))
        {
<<<<<<< HEAD
          tweet =  tweet.replace(abusive_list[j], "<span><strong><u>" + abusive_list[j] +"</u></strong></span>");
          alltweets[i].innerHTML = tweet;
          alltweets[i].style.backgroundColor = "rgba(252, 66, 123,0.1)";
=======
          tweet =  tweet.replace(abusive_list[j],"<span style=color:#002DFF;>"+abusive_list[j] +"</span>");
          alltweets[i].innerHTML = tweet;
          alltweets[i].style.backgroundColor = "#FCB0AC";
>>>>>>> 1d181f365f6a1e5546bdbed72664ca2ab0061541
        }
      }
    }
  }

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    let userId = findUserId(document);
    console.log(userId)
    if (userId) {}
    return true;
  });



function checkForJS_Finish() {
  if (document.querySelector(".ProfileHeaderCard-bio")
  ) {
    if (document.querySelector(".u-linkComplex-target").innerText != userID){
      //send get request
      userID = findUserId(document);
      get_score(userID, checkabusive);
      // changeBio();
      // changeTweet();
      // changeToReport();
    }
  if (document.querySelector(".NotificationsHeadingContent")) {
      checkNotifUserId(document);
  }
}

function changeBio(abusive_list){
  userID = document.querySelector(".ProfileHeaderCard-nameLink").innerText;

  var originalDiv = document.getElementsByClassName("ProfileHeaderCard-screenname");
  var parents = document.getElementsByClassName("AppContent-main content-main u-cf");
  parents[0].setAttribute("style", "margin-top:50px;");

  if (! document.getElementById("bio-box")) {

    // Parent Element
    var biobox = document.createElement("DIV");
    originalDiv[0].insertAdjacentElement("afterend", biobox);
    biobox.id = "bio-box";

      // Title
      var biobox_title = document.createElement("DIV");
      biobox.appendChild(biobox_title);
<<<<<<< HEAD
      biobox_title.className = "panel panel-default";

      // Title Body
      var biobox_title_body = document.createElement("DIV");
      biobox_title.appendChild(biobox_title_body);
      biobox_title_body.className = "panel-body";
      //biobox_title_body.innerText = "Tweety Holmes";
=======
      biobox_title.id = "bio-box-title";
      biobox_title.innerText = "Tweety Holmes";
>>>>>>> 1d181f365f6a1e5546bdbed72664ca2ab0061541

      // Title Image
      var logo = document.createElement("IMG");
      logo.src = `chrome-extension://${chrome.runtime.id}/icon.png`;
<<<<<<< HEAD
=======
    //  logo.setAttribute("src", "chrome-extension://" + ${chrome.runtime.id} + "/icon.png");
>>>>>>> 1d181f365f6a1e5546bdbed72664ca2ab0061541
      logo.setAttribute("id", "bio-box-img");
      biobox_title_body.append(logo);

      // Box
      var charbox = document.createElement("DIV");
      biobox_title_body.appendChild(charbox);
      charbox.id = "char-box";

        // Prompt Abusive_toggle
        var biobox_char = document.createElement("P");
        charbox.appendChild(biobox_char);
        biobox_char.id = "bio-box-text";
        biobox_char.innerText = "This user is";

        // Abusive Toggle
        var biobox_char_toggle = document.createElement("P");
        biobox_char.appendChild(biobox_char_toggle);
        biobox_char_toggle.id = "bio-box-highlight";
        biobox_char_toggle.innerText = "Abusive";

        // Prompt Abusive_words
        var biobox_word = document.createElement("P");
        charbox.appendChild(biobox_word);
        biobox_word.id = "bio-box-text";
<<<<<<< HEAD
        biobox_word.innerText = "Few abusive words used";

        // Abusive_words
        var list_group = document.createElement("UL");
        list_group.className = "list-group";
        charbox.append(list_group);

        if(abusive_list.length >= 7) {
          for(i=0; i<7; i++) {
            var biobox_word_items = document.createElement("LI");
            list_group.appendChild(biobox_word_items);
            biobox_word_items.className = "list-group-item d-flex justify-content-between align-items-center";
            biobox_word_items.innerText = abusive_list[i];
            var biobox_word_num = document.createElement("SPAN");
            biobox_word_items.appendChild(biobox_word_num);
            biobox_word_num.className ="badge badge-primary badge-pill";
            biobox_word_num.innerText = "13";
          }
        }
        else {
          for(i=0; i<abusive_list.length; i++) {
            var biobox_word_items = document.createElement("LI");
            list_group.appendChild(biobox_word_items);
            biobox_word_items.className = "list-group-item d-flex justify-content-between align-items-center";
            biobox_word_items.innerText = abusive_list[i];
            var biobox_word_num = document.createElement("SPAN");
            biobox_word_items.appendChild(biobox_word_num);
            biobox_word_num.className ="badge badge-primary badge-pill";
            biobox_word_num.innerText = "13";
          }
        }

=======
        biobox_word.innerText = "Few Abusive Words Used";

        // Abusive_words
        var biobox_word_items = document.createElement("P");
        biobox_word.appendChild(biobox_word_items);
        biobox_word_items.id = "bio-box-highlight";
        var abusiveWordsToDisplay = "";
        if(abusive_list.length>=7){
          for(i=0;i<7;i++)
            abusiveWordsToDisplay = abusiveWordsToDisplay + abusive_list[i] + " ";
        }
        else{
          for(i=0;i<abusive_list.length;i++)
            abusiveWordsToDisplay = abusiveWordsToDisplay + abusive_list[i] + " ";
        }
        biobox_word_items.innerText = abusiveWordsToDisplay;
>>>>>>> 1d181f365f6a1e5546bdbed72664ca2ab0061541

    var bio1 = document.getElementsByClassName("ProfileHeaderCard-bio");
    var bio2 = document.getElementsByClassName("ProfileHeaderCard-location");
    var bio3 = document.getElementsByClassName("ProfileHeaderCard-url");
    var bio4 = document.getElementsByClassName("ProfileHeaderCard-joinDate");
    var bio5 = document.getElementsByClassName("ProfileHeaderCard-birthdate");
    var bio6 = document.getElementsByClassName("ProfileMessagingActions");

    bio1[0].setAttribute("class", "u-hidden");
    bio2[0].setAttribute("class", "u-hidden");
    bio3[0].setAttribute("class", "u-hidden");
    bio4[0].setAttribute("class", "u-hidden");
    bio5[0].setAttribute("class", "u-hidden");
    bio6[0].setAttribute("style", "margin-top:0px;");
  }
}

function changeAvi() {
  let container = document.getElementsByClassName("ProfileAvatar-container")[0];      //Get parent of Profile Avatar
  let avi = document.getElementsByClassName("ProfileAvatar-image");                   //Get current avatar if you want to modify it at all
  var clone = document.createElement("img");                                          // Create image that will be the overlay
  clone.classList.add("ProfileAvatar-image");
  clone.src = `chrome-extension://${chrome.runtime.id}/bad-mouth.png`;                  //If you are using a local image remember to update the permissions in the manifest
<<<<<<< HEAD
  clone.style.opacity = "0.9";
  container.appendChild(clone);
}
=======
  container.appendChild(clone);
}
// Note: Currently, these run everyewhere, in timeline and on profile page
function changeTweet(){
  let Btn = document.getElementsByClassName("NewTweetButton");
  Btn[0].setAttribute("style", "background-color:#eb3b5a;");

  let actionBtns = document.getElementsByClassName("ProfileMessagingActions-buttonWrapper");
  if(actionBtns.length > 1){
    for (let btn of actionBtns){
      btn.classList.add("u-sizeFull");
    }
  }
  let tweetBtn = document.getElementsByClassName("NewTweetButton-text");
  tweetBtn[0].innerHTML = "Moralize this user";
  tweetBtn[0].addEventListener('click', moralize);
  var privateMessageButton = document.getElementsByClassName("DMButton u-sizeFull u-textTruncate js-tooltip EdgeButton EdgeButton--primary");
  console.log(privateMessageButton);
  if(privateMessageButton.length != 0)
 {
    let msgBtn = document.getElementsByClassName("DMButton-text");
    if (msgBtn.length){
      msgBtn[0].innerHTML = "Whisper to this user";
    };
    privateMessageButton[0].style.backgroundColor = "#eb3b5a";
  }
}

function changeNameHeader(userIDNode) {
  userIDNode.innerText += " <- This user is potentially abusive"
}

function moralize() {
  let t = setTimeout(function() {
    if (document.querySelector(".tweet-box > div")){
      document.querySelector(".tweet-box > div").innerHTML = item.tweet_content;
      clearTimeout(t);
    }

  }, 1000);
};
>>>>>>> 1d181f365f6a1e5546bdbed72664ca2ab0061541

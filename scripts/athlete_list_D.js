var currentUser;
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    currentUser = db.collection("users").doc(user.uid); //global
    console.log(currentUser);

    // the following functions are always called when someone is logged in
    populateCardsDynamically();
  } else {
    // No user is signed in.
    console.log("No user is signed in");
    window.location.href = "login.html";
  }
});

function populateCardsDynamically() {
  let hikeCardTemplate = document.getElementById("hikeCardTemplate");
  let hikeCardGroup = document.getElementById("hikeCardGroup");

  db.collection("athletes")
    .limit(4)
    .orderBy("dis")
    .startAt("B") //NEW LINE;  what do you want to sort by?
    .endAt("C")
    .get()
    .then((allAthletes) => {
      allAthletes.forEach((doc) => {
        var athleteName = doc.data().GivenName; //gets the firstname field
        var athleteName2 = doc.data().FamilyName; //gets the lastname field
        var AthleteGender = doc.data().Gender; //gets the gender field
        var AthleteSport = doc.data().dis; //gets the sport field
        var AthleteCountry = doc.data().noc; // gets the country field
        var AthleteCode = doc.data().code; // gets the unique code field
        let testHikeCard = hikeCardTemplate.content.cloneNode(true);
        testHikeCard.querySelector(".card-title").innerHTML =
          athleteName + " " + athleteName2;
        //testHikeCard.querySelector(".card-length").innerHTML = AthleteSport;

        //NEW LINE: update to display length, duration, last updated
        testHikeCard.querySelector(".card-length").innerHTML =
          "Country: " +
          doc.data().noc +
          "<br>" +
          "Sport: " +
          doc.data().dis +
          "<br>" +
          "Gender: " +
          doc.data().Gender;

        testHikeCard.querySelector("a").onclick = () =>
          setHikeData(AthleteCode);
        testHikeCard.querySelector("img").src = `./images/${AthleteCode}.jpg`;
        //next 2 lines are new for demo#11
        //this line sets the id attribute for the <i> tag in the format of "save-hikdID"
        //so later we know which hike to bookmark based on which hike was clicked
        testHikeCard.querySelector("i").id = "save-" + AthleteCode;
        // this line will call a function to save the hikes to the user's document
        testHikeCard.querySelector("i").onclick = () =>
          saveBookmark(AthleteCode);

        testHikeCard.querySelector(".read-more").href =
          "eachHike.html?athleteName=" + athleteName + "&id=" + AthleteCode;

        //append child is for when everything is ready to stick into the DOM
        hikeCardGroup.appendChild(testHikeCard);
      });
    });
}

//populateCardsDynamically();

//-----------------------------------------------------------------------------
// This function is called whenever the user clicks on the "bookmark" icon.
// It adds the hike to the "bookmarks" array
// Then it will change the bookmark icon from the hollow to the solid version.
//-----------------------------------------------------------------------------
// function saveBookmark(AthleteCode) {
//   currentUser
//     .set(
//       {
//         bookmarks: firebase.firestore.FieldValue.arrayUnion(AthleteCode),
//       },
//       {
//         merge: true,
//       }
//     )
//     .then(function () {
//       console.log("bookmark has been saved for: " + currentUser);
//       var iconID = "save-" + AthleteCode;
//       //console.log(iconID);
//       document.getElementById(iconID).innerText = "bookmark";
//     });
// }
function saveBookmark(AthleteCode) {
  if (
    document.querySelector(".material-icons").innerHTML == "bookmark_border"
  ) {
    currentUser
      .set(
        {
          bookmarks: firebase.firestore.FieldValue.arrayUnion(AthleteCode),
        },
        {
          merge: true,
        }
      )
      .then(function () {
        document.querySelector(".material-icons").innerHTML = "bookmark";
        console.log("bookmark has been saved for: " + currentUser);
        db.collection("users").doc(AthleteCode).update({
          saved: true,
        });
      });
  } else {
    currentUser
      .set(
        {
          bookmarks: firebase.firestore.FieldValue.arrayRemove(AthleteCode),
        },
        {
          merge: true,
        }
      )
      .then(function () {
        document.querySelector(".material-icons").innerHTML = "bookmark_border";
        console.log("bookmark has been removed for: " + currentUser);
        db.collection("users").doc(AthleteCode).update({
          saved: false,
        });
      });
  }
}
function setHikeData(id) {
  localStorage.setItem("AthleteCode", id);
}

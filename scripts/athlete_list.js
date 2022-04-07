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
    // .orderBy("length_time") //NEW LINE;  what do you want to sort by?
    // .limit(2) //NEW LINE:  how many do you want to get?
    .get()
    .then((allAthletes) => {
      allAthletes.forEach((doc) => {
        var athleteName = doc.data().GivenName; //gets the name field
        var athleteName2 = doc.data().FamilyName; //gets the name field
        var AthleteGender = doc.data().Gender; //gets the gender field
        var AthleteSport = doc.data().dis; //gets the sport field
        let testHikeCard = hikeCardTemplate.content.cloneNode(true);
        testHikeCard.querySelector(".card-title").innerHTML =
          athleteName + " " + athleteName2;
        //testHikeCard.querySelector(".card-length").innerHTML = AthleteSport;

        //NEW LINE: update to display length, duration, last updated
        testHikeCard.querySelector(".card-length").innerHTML =
          "Gender: " + doc.data().Gender + "<br>" + "Sport: " + doc.data().dis;

        testHikeCard.querySelector("a").onclick = () =>
          setHikeData(AthleteGender);
        testHikeCard.querySelector("img").src = `./images/${AthleteGender}.jpg`;
        //next 2 lines are new for demo#11
        //this line sets the id attribute for the <i> tag in the format of "save-hikdID"
        //so later we know which hike to bookmark based on which hike was clicked
        testHikeCard.querySelector("i").id = "save-" + AthleteGender;
        // this line will call a function to save the hikes to the user's document
        testHikeCard.querySelector("i").onclick = () =>
          saveBookmark(AthleteGender);

        testHikeCard.querySelector(".read-more").href =
          "eachHike.html?athleteName=" + athleteName + "&id=" + AthleteGender;

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
function saveBookmark(AthleteGender) {
  currentUser
    .set(
      {
        bookmarks: firebase.firestore.FieldValue.arrayUnion(AthleteGender),
      },
      {
        merge: true,
      }
    )
    .then(function () {
      console.log("bookmark has been saved for: " + currentUser);
      var iconID = "save-" + AthleteGender;
      //console.log(iconID);
      document.getElementById(iconID).innerText = "bookmark";
    });
}

function setHikeData(id) {
  localStorage.setItem("AthleteGender", id);
}

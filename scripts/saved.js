firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    getBookmarks(user);
  } else {
    console.log("No user is signed in");
  }
});
function getBookmarks(user) {
  db.collection("users")
    .doc(user.uid)
    .get()
    .then((userDoc) => {
      var bookmarks = userDoc.data().bookmarks;
      console.log(bookmarks);

      let CardTemplate = document.getElementById("CardTemplate");
      bookmarks.forEach((code) => {
        console.log(code);
        db.collection("athletes")
          .where("code", "==", code)
          .get()
          .then((snap) => {
            size = snap.size;
            queryData = snap.docs;

            if (size == 1) {
              var doc = queryData[0].data();
              var athleteName = doc.GivenName; //gets the firstname field
              var athleteName2 = doc.FamilyName; //gets the lastname field
              var AthleteGender = doc.Gender; //gets the gender field
              var AthleteSport = doc.dis; //gets the sport field
              var AthleteCountry = doc.noc; // gets the country field
              var AthleteCode = doc.code; // gets the unique code field
              let newCard = CardTemplate.content.cloneNode(true);
              newCard.querySelector(".card-title").innerHTML =
                athleteName + " " + athleteName2;
              newCard.querySelector(".card-length").innerHTML =
                "Country: " +
                AthleteCountry +
                "<br>" +
                "Sport: " +
                AthleteSport +
                "<br>" +
                "Gender: " +
                AthleteGender;
              newCard.querySelector("a").onclick = () =>
                setHikeData(AthleteCode);
              newCard.querySelector("img").src = `./images/${AthleteCode}.png`;
              hikeCardGroup.appendChild(newCard);
            } else {
              console.log("Query has more than one data");
            }
          });
      });
    });
}
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

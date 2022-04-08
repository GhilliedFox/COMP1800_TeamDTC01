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
              var athleteName = doc.data().GivenName; //gets the firstname field
              var athleteName2 = doc.data().FamilyName; //gets the lastname field
              var AthleteGender = doc.data().Gender; //gets the gender field
              var AthleteSport = doc.data().dis; //gets the sport field
              var AthleteCountry = doc.data().noc; // gets the country field
              var AthleteCode = doc.data().code; // gets the unique code field
              let newCard = CardTemplate.content.cloneNode(true);
              newCard.querySelector(".card-title").innerHTML =
                athleteName + " " + athleteName2;
              newCard.querySelector(".card-length").innerHTML =
                "Country: " +
                doc.data().noc +
                "<br>" +
                "Sport: " +
                doc.data().dis +
                "<br>" +
                "Gender: " +
                doc.data().Gender;
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

let AthleteCode = localStorage.getItem("AthleteCode");

db.collection("athletes")
  .where("id", "==", AthleteCode)
  .get()
  .then((queryAthlete) => {
    //see how many results you have got from the query
    size = queryAthlete.size;
    // get the documents of query
    athletes = queryAthlete.docs;

    // We want to have one document per hike, so if the the result of
    //the query is more than one, we can check it right now and clean the DB if needed.
    if (size == 1) {
      var thisform = athletes[0].data();
      name = thisform.name;
      document.getElementById("contact").innerHTML = name;
    } else {
      console.log("Query has more than one data");
    }
  })
  .catch((error) => {
    console.log("Error getting documents: ", error);
  });

function writeReview() {
  console.log("in");
  let Title = document.getElementById("title").value;
  let Description = document.getElementById("description").value;

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var currentUser = db.collection("users").doc(user.uid);
      var userID = user.uid;
      //get the document for current user.
      currentUser.get().then((userDoc) => {
        var userEmail = userDoc.data().email;
        db.collection("complaints")
          .add({
            code: AthleteCode,
            userID: userID,
            title: Title,
            description: Description,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          })
          .then(() => {
            window.location.href = "#"; //new line added
          });
      });
    } else {
      // No user is signed in.
    }
  });
}

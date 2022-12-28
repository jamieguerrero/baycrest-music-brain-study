const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

exports.exportData = functions.https.onRequest((request, response) => {
  let stuff = [];
  const db = admin.firestore();
  db.collection("trials")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          console.log("doc", doc);
          const newelement = {
            id: doc.id,
          };
          stuff = stuff.concat(newelement);
        });
        response.send(stuff);
        return "";
      })
      .catch((reason) => {
        response.send(reason);
      });
});

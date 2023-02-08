const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
const {Parser} = require("json2csv");

exports.exportData = functions.https.onRequest((request, response) => {
  const fields = [
    "user_id",
    "trial_id",
    "song_name",
    "condition",
    "response_time",
    "correctness",
    "total_elapsed_time",
  ];
  const opts = {fields};

  let data = [];
  const db = admin.firestore();

  const collection = request.query.uid ?
    db.collection("trials").where("uid", "==", request.query.uid) :
    db.collection("trials");

  collection
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          const docData = doc.data();
          const newElement = {
            user_id: docData.uid,
            trial_id: doc.id,
            song_name: docData.song_id,
            condition: docData.response,
            response_time: docData.response_time,
            correctness: docData.correct,
            total_elapsed_time: docData.total_elapsed_time,
          };
          data = data.concat(newElement);
        });

        try {
          const parser = new Parser(opts);
          const csv = parser.parse(data);

          response.setHeader(
              "Content-disposition",
              "attachment; filename=report.csv"
          );
          response.set("Content-Type", "text/csv");
          response.status(200).send(csv);
        } catch (err) {
          console.error(err);
        }

        return "";
      })
      .catch((reason) => {
        response.send(reason);
      });
});

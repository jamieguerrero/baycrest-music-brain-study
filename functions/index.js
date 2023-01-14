const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
const {Parser} = require("json2csv");

exports.exportData = functions.https.onRequest((request, response) => {
  const fields = ["id"];
  const opts = {fields};

  let data = [];
  const db = admin.firestore();
  db.collection("users")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          const newElement = {
            id: doc.id,
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

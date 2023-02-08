const seed = require("firestore-seed");

module.exports = [
  seed.collection("users", [
    seed.doc("admin", {
      username: "admin01",
      email: "jamie.n.guerrero@gmail.com",
      study_complete: true,
    }),
    seed.doc("pilot01", {
      username: "pilot01",
      email: "mangoflavoured@hotmail.com",
      study_complete: true,
    }),
  ]),
  seed.collection("songs", [
    seed.doc("song01", {
      uid: "pilot01",
      fileName: "TEST_TRIAL_01.wav",
      signedURL:
        "https://firebasestorage.googleapis.com/v0/b/baycrest-music-brain-study.appspot.com/o/TEST_TRIAL_01.wav?alt=media&token=add19931-15d1-4747-9a6c-056ce63984ef",
    }),
    seed.doc("song02", {
      uid: "pilot01",
      fileName: "TEST_TRIAL_02.wav",
      signedURL:
        "https://firebasestorage.googleapis.com/v0/b/baycrest-music-brain-study.appspot.com/o/TEST_TRIAL_02.wav?alt=media&token=4be708b9-a809-43a3-b9ff-bc5e5210ab46",
    }),
    seed.doc("song03", {
      uid: "pilot01",
      fileName: "TEST_TRIAL_03.wav",
      signedURL:
        "https://firebasestorage.googleapis.com/v0/b/baycrest-music-brain-study.appspot.com/o/TEST_TRIAL_03.wav?alt=media&token=4a6bf0dd-5351-4f98-ba70-92b99fa3c305",
    }),
    seed.doc("song04", {
      uid: "pilot01",
      fileName: "TEST_TRIAL_04.wav",
      signedURL:
        "https://firebasestorage.googleapis.com/v0/b/baycrest-music-brain-study.appspot.com/o/TEST_TRIAL_04.wav?alt=media&token=99c11eb0-b269-4dde-a2a6-86fbd770d2ca",
    }),
  ]),
  seed.collection("trials", [
    seed.doc("trial01", {
      uid: "pilot01",
      song_id: "song01",
      round: 0,
      response_time: 4000,
      total_elapsed_time: 4000,
      response: "familiar",
      correct: true,
    }),
    seed.doc("trial02", {
      uid: "pilot01",
      song_id: "song02",
      round: 0,
      response_time: 4000,
      total_elapsed_time: 6000,
      response: "salient",
      correct: true,
    }),
    seed.doc("trial03", {
      uid: "pilot01",
      song_id: "song03",
      round: 0,
      response_time: 4000,
      total_elapsed_time: 8000,
      response: "unfamiliar",
      correct: true,
    }),
    seed.doc("trial04", {
      uid: "pilot01",
      song_id: "song04",
      round: 0,
      response_time: 4000,
      total_elapsed_time: 10000,
      response: "familiar",
      correct: true,
    }),
  ]),
];

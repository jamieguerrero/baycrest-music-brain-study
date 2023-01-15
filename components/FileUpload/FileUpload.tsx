import React from "react";
import { storage, firestore } from "../../lib/firebase";
import { getDownloadURL } from "firebase/storage";

function uploadClipAsPromise(audioFile: File) {
  let uploader = { value: 0 };
  return new Promise(function (resolve, reject) {
    var storageRef = storage.ref(`${audioFile.name}`);

    var task = storageRef.put(audioFile);

    task.on(
      "state_changed",
      function progress(snapshot: any) {
        var percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        uploader.value = percentage;
      },
      function error(err) {},
      function complete() {
        getDownloadURL(task.snapshot.ref).then((url) => {
          console.log(url);
          firestore
            .collection("songs")
            .add({ fileName: audioFile.name, signedURL: url });
        });
      }
    );
  });
}

export function FileUpload() {
  function handleChange(event: any) {
    const files = (event.target as HTMLInputElement).files;
    for (var i = 0; i < files!.length; i++) {
      var audioFile = files![i];
      uploadClipAsPromise(audioFile);
    }
  }

  return (
    <input type="file" onChange={handleChange} accept="/image/*" multiple />
  );
}

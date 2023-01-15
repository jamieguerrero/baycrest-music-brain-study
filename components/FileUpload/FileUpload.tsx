import React, { useContext } from "react";
import { storage, firestore } from "../../lib/firebase";
import { getDownloadURL } from "firebase/storage";
import { UserContext } from "../../lib/context";

function uploadClipAsPromise(audioFile: File, uid: string) {
  let uploader = { value: 0 };
  return new Promise(function () {
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
          const song = { fileName: audioFile.name, signedURL: url, uid };

          firestore.collection("songs").add(song);
        });
      }
    );
  });
}

export function FileUpload() {
  const { user } = useContext(UserContext);
  function handleChange(event: any) {
    const files = (event.target as HTMLInputElement).files;
    for (var i = 0; i < files!.length; i++) {
      var audioFile = files![i];
      uploadClipAsPromise(audioFile, user!.uid);
    }
  }

  return (
    <input type="file" onChange={handleChange} accept="/image/*" multiple />
  );
}

import { useState } from "react";
import storage from "./firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export function Upload() {
  // State to store uploaded file
  const [file, setFile] = useState("");

  // progress
  const [percent, setPercent] = useState(0);

  // Handle file upload event and update state
  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  const handleUpload = () => {
    if (!file) {
      alert("Please upload an image first!");
    }

    const storageRef = ref(storage, `/files/${file.name}`);

    // progress can be paused and resumed. It also exposes progress updates.
    // Receives the storage reference and the file to upload.
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        // update progress
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
        });
      }
    );
  };

  return (
    <div>
      <input type="file" onChange={handleChange} accept="/image/*" />
      {process.env.API_KEY}
      <button onClick={handleUpload}>Upload to Firebase</button>
      <p>{percent} &quot; done</p>
    </div>
  );
}

// https://stackoverflow.com/questions/41673499/how-to-upload-multiple-files-to-firebase
// //Listen for file selection
// fileButton.addEventListener('change', function(e){
//   //Get files
//   for (var i = 0; i < e.target.files.length; i++) {
//       var imageFile = e.target.files[i];

//       uploadImageAsPromise(imageFile);
//   }
// });

// //Handle waiting to upload each file using promise
// function uploadImageAsPromise (imageFile) {
//   return new Promise(function (resolve, reject) {
//       var storageRef = firebase.storage().ref(fullDirectory+"/"+imageFile.name);

//       //Upload file
//       var task = storageRef.put(imageFile);

//       //Update progress bar
//       task.on('state_changed',
//           function progress(snapshot){
//               var percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
//               uploader.value = percentage;
//           },
//           function error(err){

//           },
//           function complete(){
//               var downloadURL = task.snapshot.downloadURL;
//           }
//       );
//   });
// }

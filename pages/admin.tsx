import React, { useEffect, useState } from "react";
import FileSaver from "file-saver";
import { firestore } from "../lib/firebase";
import { FileUpload } from "../components/FileUpload";
import { Header } from "../components/Header";
import { NewUserForm } from "../components/NewUserForm";
import { ResetPasswordForm } from "../components/ResetPasswordForm";

import { auth } from "../lib/firebase";

interface User {
  username: string;
  study_complete: string;
  email: string;
}

function Admin() {
  const [users, setUsers] = useState<User[]>([]);
  const user = auth.currentUser;

  const deleteUser = () => {
    if (user !== null) {
      user
        .delete()
        .then(() => {
          // User deleted.
        })
        .catch((error) => {
          // An error ocurred
          // ...
        });
    }
  };
  async function exportData() {
    return await fetch("/exportData")
      .then((response) => {
        return response.blob();
      })
      .then((data) => {
        FileSaver.saveAs(new Blob([data]), `report-${Date.now()}.csv`);
      });
  }

  useEffect(() => {
    const getUsers = async () => {
      return await firestore.collection("users").get();
    };

    getUsers().then((snapshot) => {
      snapshot.forEach((doc) => {
        const user = doc.data();
        const newUser = {
          username: user.username,
          study_complete: user.study_complete,
          email: user.email,
        };
        setUsers((users) => [...users, newUser]);
        console.log(user);
      });
    });
  }, [setUsers]);

  return (
    <div>
      <Header />
      <h1>Admin page</h1>
      <NewUserForm />

      {users.map((user) => (
        <>
          {user.username}
          {user.study_complete}
          {user.email}
        </>
      ))}

      <ResetPasswordForm />
      <button className="button" onClick={deleteUser}>
        Delete User
      </button>
      <FileUpload />

      <button className="button" onClick={exportData}>
        Export Data
      </button>
    </div>
  );
}

export default Admin;

import React from "react";
import FileSaver from "file-saver";
import { FileUpload } from "../components/FileUpload";

function Admin() {
  // TODO: User Management
  // - create new user
  // - change password for user
  // - delete user
  // - upload file for user

  // TODO: Export Data
  // - export data file
  // - export data for single user
  // - export for all users

  async function getCloudFunctionShit() {
    const response = await fetch("/exportData")
      .then((response) => {
        return response.blob();
      })
      .then((data) => {
        FileSaver.saveAs(new Blob([data]), `report-${Date.now()}.csv`);
      });
  }

  const handleClick = async () => {
    const response = await getCloudFunctionShit();
  };

  return (
    <div>
      <h1>Admin page</h1>
      <button onClick={handleClick}>IM TRIGGERING</button>
      <FileUpload />
    </div>
  );
}

export default Admin;

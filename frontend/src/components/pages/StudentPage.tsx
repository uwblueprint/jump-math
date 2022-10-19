import React from "react";
import AdminUserTable from "../common/AdminUserTable";
import MainPageButton from "../common/MainPageButton";

const StudentPage = (): React.ReactElement => {
  const adminUserArray = [
    {
      firstName: "Albert",
      lastName: "Kuhl",
      email: "albertkuhl@jumpmath.ca",
    },
    {
      firstName: "Albert",
      lastName: "Kuhl",
      email: "albertkuhl@jumpmath.ca",
    },
    {
      firstName: "Albert",
      lastName: "Kuhl",
      email: "albertkuhl@jumpmath.ca",
    },
    {
      firstName: "Albert",
      lastName: "Kuhl",
      email:
        "The quick brown fox jumps over the lazy dog is an English-language pangram—a sentence that contains all of the letters of the English alphabet. Owing to its existence, Chakra was created.",
    },
  ];

  return (
    // <div style={{ textAlign: "center", width: "25%", margin: "0px auto" }}>
    //   <h1>Student Page</h1>
    //   <MainPageButton />
    // </div>
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <AdminUserTable adminUserArray={adminUserArray} />
    </div>
  );
};

export default StudentPage;

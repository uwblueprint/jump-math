import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { JUMP_MATH_LOGO } from "../../assets/images";
import colors from "../../themes/colors";
import theme from "../../themes";

function StudentAssesment() {
  return (
    <ChakraProvider theme={theme}>
      <div
        className="Question-Summary"
        style={{
          padding: "32px",
          gap: "40px",
          backgroundColor: "rgba(232, 237, 241, 0.3)",
          borderRadius: "10px",
          position: "absolute",
          width: "480px",
          height: "376px",
          left: "300px",
          top: "240px",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: "61px",
            fontSize: "13px",
            top: "320px",
            color: "black",
          }}
        >
          Short Answer
        </div>

        <div
          style={{
            position: "absolute",
            right: "334px",
            fontSize: "13px",
            top: "320px",
            color: "black",
          }}
        >
          Multiple Choice
        </div>

        <div
          style={{
            position: "absolute",
            right: "205px",
            fontSize: "13px",
            top: "320px",
            color: "black",
          }}
        >
          Multi-Select
        </div>

        <div
          style={{
            position: "absolute",
            right: "306px",
            fontSize: "14px",
            top: "75px",
            color: "black",
          }}
        >
          Number of Questions
        </div>

        <div
          style={{
            position: "absolute",
            right: "296px",
            fontSize: "14px",
            top: "100px",
            color: "black",
          }}
        >
          Total Number Of Points
        </div>

        <div
          style={{
            position: "absolute",
            right: "338px",
            fontSize: "14px",
            top: "140px",
            color: "black",
          }}
        >
          Question Types:
        </div>

        <div
          style={{
            position: "absolute",
            right: "50px",
            fontSize: "14px",
            top: "75px",
            color: "black",
          }}
        >
          12
        </div>

        <div
          style={{
            position: "absolute",
            right: "48px",
            fontSize: "14px",
            top: "100px",
            color: "black",
          }}
        >
          50 +1 (Bonus)
        </div>

        <div
          style={{
            marginBottom: "20px",
            fontSize: "18px",
            fontWeight: 700,
            color: "#154472",
          }}
        >
          Assesment Question Summary
        </div>

        <div
          className="Multiple-Choice"
          style={{
            position: "relative",
            width: "115px",
            height: "115px",
            borderRadius: "10px",
            padding: "10px",
            backgroundColor: "#E8EDF1",
            top: "110px",
            left: "10px",
          }}
        >
          <div
            className="Multiple-Choice"
            style={{
              position: "relative",
              width: "7px",
              height: "7px",
              borderRadius: "10px",
              backgroundColor: "#DBDFE2",
              top: "23px",
              left: "18px",
            }}
          >
            <div
              className="Multiple-Choice"
              style={{
                position: "relative",
                width: "50px",
                height: "5px",
                backgroundColor: "#C4C4C4",
                top: "1px",
                left: "13px",
              }}
            >
              {" "}
            </div>
          </div>
          <div
            className="Multiple-Choice"
            style={{
              position: "relative",
              width: "7px",
              height: "7px",
              borderRadius: "10px",
              backgroundColor: "#666666",
              top: "30px",
              left: "18px",
            }}
          >
            <div
              className="Multiple-Choice"
              style={{
                position: "relative",
                width: "25px",
                height: "5px",
                backgroundColor: "#C4C4C4",
                top: "1px",
                left: "13px",
              }}
            >
              {" "}
            </div>
          </div>
          <div
            className="Multiple-Choice"
            style={{
              position: "relative",
              width: "7px",
              height: "7px",
              borderRadius: "10px",
              backgroundColor: "#DBDFE2",
              top: "37px",
              left: "18px",
            }}
          >
            <div
              className="Multiple-Choice"
              style={{
                position: "relative",
                width: "40px",
                height: "5px",
                backgroundColor: "#C4C4C4",
                top: "1px",
                left: "13px",
              }}
            >
              {" "}
            </div>
          </div>
          <div
            className="Multiple-Choice"
            style={{
              position: "relative",
              width: "7px",
              height: "7px",
              borderRadius: "10px",
              backgroundColor: "#DBDFE2",
              top: "44px",
              left: "18px",
            }}
          >
            <div
              className="Multiple-Choice"
              style={{
                position: "relative",
                width: "15px",
                height: "5px",
                backgroundColor: "#C4C4C4",
                top: "1px",
                left: "13px",
              }}
            >
              {" "}
            </div>
          </div>
        </div>

        <div
          className="Multi-Select"
          style={{
            position: "relative",
            width: "115px",
            height: "115px",
            borderRadius: "10px",
            padding: "10px",
            backgroundColor: "#E8EDF1",
            top: "-5px",
            left: "150px",
          }}
        >
          <div
            className="Multi-Select"
            style={{
              position: "relative",
              width: "7px",
              height: "7px",
              backgroundColor: "#DBDFE2",
              top: "23px",
              left: "18px",
            }}
          >
            <div
              className="Multi-Select"
              style={{
                position: "relative",
                width: "50px",
                height: "5px",
                backgroundColor: "#C4C4C4",
                top: "1px",
                left: "13px",
              }}
            >
              {" "}
            </div>
          </div>
          <div
            className="Multi-Select"
            style={{
              position: "relative",
              width: "7px",
              height: "7px",
              backgroundColor: "#666666",
              top: "30px",
              left: "18px",
            }}
          >
            <div
              className="Multi-Select"
              style={{
                position: "relative",
                width: "25px",
                height: "5px",
                backgroundColor: "#C4C4C4",
                top: "1px",
                left: "13px",
              }}
            >
              {" "}
            </div>
          </div>
          <div
            className="Multi-Select"
            style={{
              position: "relative",
              width: "7px",
              height: "7px",
              backgroundColor: "#DBDFE2",
              top: "37px",
              left: "18px",
            }}
          >
            <div
              className="Multi-Select"
              style={{
                position: "relative",
                width: "40px",
                height: "5px",
                backgroundColor: "#C4C4C4",
                top: "1px",
                left: "13px",
              }}
            >
              {" "}
            </div>
          </div>
          <div
            className="Multi-Select"
            style={{
              position: "relative",
              width: "7px",
              height: "7px",
              backgroundColor: "#666666",
              top: "44px",
              left: "18px",
            }}
          >
            <div
              className="Multi-Select"
              style={{
                position: "relative",
                width: "15px",
                height: "5px",
                backgroundColor: "#C4C4C4",
                top: "1px",
                left: "13px",
              }}
            >
              {" "}
            </div>
          </div>
        </div>
        <div
          className="Short-Answer"
          style={{
            position: "relative",
            width: "115px",
            height: "115px",
            borderRadius: "10px",
            padding: "10px",
            backgroundColor: "#E8EDF1",
            top: "-120px",
            left: "290px",
          }}
        >
          {" "}
        </div>
        <div
          className="Short-Answer"
          style={{
            position: "relative",
            width: "70px",
            height: "14px",
            backgroundColor: "#636363",
            top: "-180px",
            left: "313px",
          }}
        >
          {" "}
        </div>
        <div
          className="Rules"
          style={{
            backgroundColor: "rgba(232, 237, 241, 0.3)",
            padding: "32px",
            gap: "40px",
            borderRadius: "10px",
            position: "absolute",
            width: "480px",
            height: "376px",
            left: "545px",
            top: "0px",
          }}
        >
          <header
            style={{
              marginBottom: "20px",
              fontSize: "18px",
              fontWeight: 700,
              color: "#154472",
            }}
          >
            {" "}
            Rules
          </header>
          <p style={{ marginBottom: "16px", fontSize: "14px" }}>
            The test WILL be monitored so please close any windows before
            starting the test
          </p>
          <p style={{ marginBottom: "16px", fontSize: "14px" }}>
            You will have 1 hour to complete this test. No aids are permitted.{" "}
          </p>
          <p style={{ marginBottom: "16px", fontSize: "14px" }}>
            If you need clarification or assistance, please raise your hand
            quietly and I will come to you.{" "}
          </p>
          <p style={{ marginBottom: "16px", fontSize: "14px" }}> Good luck! </p>
          <p style={{ fontSize: "14px" }}> -Mr. Roberts</p>
        </div>

        <div>
          <img
            src={JUMP_MATH_LOGO.src}
            alt="Jump Math Logo"
            style={{
              width: "200px",
              height: "auto",
              marginTop: "-600px",
              marginLeft: "-275px",
            }}
          />
          <p
            style={{
              fontSize: "30px",
              fontWeight: 700,
              color: "#154472",
              marginLeft: "-30px",
              marginTop: "-70px",
            }}
          >
            Unit 0 Review Test
          </p>
          <p
            style={{ fontSize: "16px", color: "#154472", marginLeft: "-30px" }}
          >
            Start Time: September 15, 2022 at 2:00pm
          </p>
          <button
            type="button"
            style={{
              backgroundColor: "#154472",
              color: "#fff",
              borderRadius: "10px",
              outline: "none",
              width: "225px",
              height: "40px",
              marginTop: "600px",
              marginLeft: "765px",
              fontWeight: "bold",
            }}
          >
            Start Test
          </button>
        </div>
      </div>
    </ChakraProvider>
  );
}

export default StudentAssesment;

import { useState } from "react";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [posts, setPosts] = useState([]);
  // const [timee, setTimee] = useState("");
  // const [date, setDate] = useState("");

  const handleInputChange = (e) => {
    const inputText = e.target.value;
    //const words = inputText.trim().split(/\s+/);
    setInputValue(inputText);
  };

  // function getFormattedDateTime() {
  //   const date = new Date();

  //   // Get time (01:43 PM)
  //   let hours = date.getHours();
  //   const minutes = date.getMinutes().toString().padStart(2, "0");
  //   const ampm = hours >= 12 ? "PM" : "AM";
  //   hours = hours % 12 || 12;
  //   const time = `${hours.toString().padStart(2, "0")}:${minutes} ${ampm}`;

  //   // Get date (22-03-2026)
  //   const day = date.getDate().toString().padStart(2, "0");
  //   const month = (date.getMonth() + 1).toString().padStart(2, "0");
  //   const year = date.getFullYear();
  //   const dateStr = `${day}-${month}-${year}`;

  //   return { dateStr, time }; // Return as object
  // }

  // const { dateStr, time } = getFormattedDateTime();

  function postContent() {
    const date = new Date();
    // Get time
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    const time = `${hours.toString().padStart(2, "0")}:${minutes} ${ampm}`;
    // Get date
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const dateStr = `${day}-${month}-${year}`;

    setPosts((prev) => [
      ...prev,
      {
        sentence: inputValue,
        time: time,
        date: dateStr,
      },
    ]);
    setInputValue(""); // Clear the input after posting
    // setTimee(time);
    // setDate(dateStr);
  }

  // Usage
  // console.log(getFormattedDateTime()); // "01:43 PM 22-03-2026"

  return (
    <>
      <div className="main-container">
        <div className="heading">
          <h1>WordPad</h1>
        </div>
        <div className="input-field">
          <input
            type="textarea"
            className="field-input"
            placeholder="What's on your mind ?"
            value={inputValue}
            onChange={handleInputChange}
          />
        </div>
        <div className="postButton">
          <button className="post-button" onClick={() => postContent()}>
            Post
          </button>
        </div>

        <div className="posts">
          {[...posts].reverse().map((post, index) => (
            <div className="a-post" key={index}>
              <p>{post.sentence}</p>
              <p style={{ fontSize: "12px", color: "gray" }}>
                {post.date} {post.time}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;

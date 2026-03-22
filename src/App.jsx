import { useState, useEffect } from "react";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [posts, setPosts] = useState([]);

  // Load posts from localStorage when component mounts
  useEffect(() => {
    const storedPosts = localStorage.getItem("posts");
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
    }
  }, []);

  // Save posts to localStorage whenever posts change
  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  const handleInputChange = (e) => {
    const inputText = e.target.value;
    setInputValue(inputText);
  };

  function postContent() {
    if (inputValue.trim()) {
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
    }
  }

  return (
    <>
      <div className="main-container">
        <div className="heading">
          <h1>ScratchPad 🗒</h1>
        </div>
        <div className="input-field">
          <textarea
            className="field-input"
            placeholder="What's on your mind ?"
            value={inputValue}
            onChange={handleInputChange}
            rows={4}
          />
        </div>
        <div className="postButton">
          <button className="post-button" onClick={postContent}>
            Post
          </button>
        </div>

        <div className="posts">
          {[...posts].reverse().map((post, index) => (
            <div className="a-post" key={index}>
              <p>{posts.length - index}</p>
              <p>{post.sentence}</p>
              <p style={{ fontSize: "12px", color: "gray" }}>
                {post.date} {post.time}
              </p>
            </div>
          ))}
          {posts.length === 0 && (
            <p style={{ textAlign: "center", color: "gray" }}>
              No posts yet. Write something!
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default App;

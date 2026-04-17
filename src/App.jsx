import { useState, useEffect } from "react";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [backColor, setBackColor] = useState("whitesmoke");
  const [accentColor, setAccentColor] = useState("false");

  function changeColor(id) {
    const updateColor = posts.map((post) =>
      post.id === id
        ? {
            ...post,
            color: post.color === "white" ? "#2D0B3A" : "white",
            textcolor: post.textcolor === "gray" ? "white" : "gray",
          }
        : post,
    );

    setPosts(updateColor);
  }

  function changeColor2() {
    setBackColor(backColor === "whitesmoke" ? "#1a1a1a" : "whitesmoke");
    setAccentColor((prev) => !prev);
  }

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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
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
          color: "white",
          textcolor: "gray",
          id: Date.now(),
        },
      ]);
      setInputValue(""); // Clear the input after posting
    }
  }

  // Filter posts based on search term
  const filteredPosts =
    searchTerm.trim() === ""
      ? posts
      : posts.filter((post) =>
          post.sentence.toLowerCase().includes(searchTerm.toLowerCase()),
        );

  return (
    <>
      <div
        className="main-container"
        style={{ backgroundColor: backColor }}
        onClick={() => changeColor2()}
      >
        <div
          className="heading"
          style={{ color: accentColor ? "#000033" : "white" }}
        >
          <h1>ScrathPad</h1>
        </div>
        <div className="input-field">
          <textarea
            className={`field-input ${accentColor ? "light" : "dark"}`}
            onClick={(e) => e.stopPropagation()}
            placeholder="What's on your mind ?"
            value={inputValue}
            onChange={handleInputChange}
            rows={4}
            style={{
              border: accentColor ? "3px solid #000033" : "3px solid white",
              backgroundColor: accentColor ? "white" : "#1a1a1a",
              color: accentColor ? "gray" : "white",
            }}
          />
        </div>

        {/* Search Bar */}
        <div className="search-container" style={{ marginTop: "10px" }}>
          <input
            className={`search ${accentColor ? "light" : "dark"}`}
            onClick={(e) => e.stopPropagation()}
            placeholder="Search posts..."
            value={searchTerm}
            onChange={handleSearchChange}
            rows={1}
            style={{
              border: accentColor ? "3px solid #000033" : "3px solid white",
              backgroundColor: accentColor ? "white" : "#1a1a1a",
              color: accentColor ? "gray" : "white",
            }}
          />
          {searchTerm && (
            <button
              className="clear-search"
              style={{ color: accentColor ? "#000033" : "white" }}
              onClick={clearSearch}
              onMouseEnter={(e) => (e.target.style.color = "#666")}
              onMouseLeave={(e) => (e.target.style.color = "#999")}
            >
              <i class="fa-solid fa-xmark"></i>
            </button>
          )}
        </div>

        <div className="postButton">
          <button
            className="post-button"
            onClick={(e) => {
              e.stopPropagation();
              postContent();
            }}
            style={{
              border: accentColor ? "1px solid #000033" : "1px solid white",
              backgroundColor: accentColor ? "white" : "#1a1a1a",
              color: accentColor ? "gray" : "white",
            }}
          >
            Post
          </button>
        </div>

        <div className="posts">
          {filteredPosts.length === 0 && searchTerm && (
            <p style={{ textAlign: "center", color: "gray" }}>
              No posts matching "{searchTerm}"
            </p>
          )}
          {filteredPosts.length === 0 && !searchTerm && (
            <p
              className="warning"
              style={{ textAlign: "center", color: "gray" }}
            >
              No posts yet. Write something!
            </p>
          )}
          {[...filteredPosts].reverse().map((post, index) => (
            <div
              className="a-post"
              style={{ backgroundColor: post.color, color: post.textcolor }}
              key={post.id}
              onClick={(e) => {
                e.stopPropagation();
                changeColor(post.id);
              }}
            >
              <p>{posts.findIndex((p) => p.id === post.id) + 1}</p>
              <p style={{ whiteSpace: "pre-wrap" }}>{post.sentence}</p>
              <p style={{ fontSize: "12px", color: post.textcolor }}>
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

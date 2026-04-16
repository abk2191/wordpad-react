import { useState, useEffect } from "react";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  function changeColor(id) {
    const updateColor = posts.map((post) =>
      post.id === id
        ? {
            ...post,
            color: post.color === "white" ? "rgb(64, 244, 121)" : "white",
            textcolor: post.textcolor === "gray" ? "white" : "gray",
          }
        : post,
    );

    setPosts(updateColor);
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
      <div className="main-container">
        <div className="heading">
          <h1>ScrathPad</h1>
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

        {/* Search Bar */}
        <div className="search-container" style={{ marginTop: "10px" }}>
          <input
            className="search"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={handleSearchChange}
            rows={1}
          />
          {searchTerm && (
            <button
              className="clear-search"
              onClick={clearSearch}
              onMouseEnter={(e) => (e.target.style.color = "#666")}
              onMouseLeave={(e) => (e.target.style.color = "#999")}
            >
              <i class="fa-solid fa-xmark"></i>
            </button>
          )}
        </div>

        <div className="postButton">
          <button className="post-button" onClick={postContent}>
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
              onClick={() => changeColor(post.id)}
            >
              <p>{posts.length - posts.findIndex((p) => p.id === post.id)}</p>
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

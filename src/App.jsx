import { useState, useEffect } from "react";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [backColor, setBackColor] = useState("whitesmoke");
  const [accentColor, setAccentColor] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingText, setEditingText] = useState("");
  const [editingPostId, setEditingPostId] = useState(null);

  function editText(id) {
    const updateEditButton = posts.map((post) =>
      post.id === id
        ? {
            ...post,
            showEditButton: !post.showEditButton,
          }
        : post,
    );

    setPosts(updateEditButton);
  }

  function startEditing(id, currentText) {
    setEditingPostId(id);
    setEditingText(currentText);
    setIsEditing(true);

    // Change button to checkmark mode
    const updateEditButton = posts.map((post) =>
      post.id === id
        ? {
            ...post,
            showEditButton: false,
          }
        : post,
    );
    setPosts(updateEditButton);
  }

  function saveEdit(id) {
    if (editingText.trim()) {
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

      // Update the post with new text and updated time/date
      const updatedPosts = posts.map((post) =>
        post.id === id
          ? {
              ...post,
              sentence: editingText,
              time: time,
              date: dateStr,
              showEditButton: true,
            }
          : post,
      );
      setPosts(updatedPosts);
    }

    // Reset editing state
    setIsEditing(false);
    setEditingPostId(null);
    setEditingText("");
  }

  function cancelEdit() {
    // Reset to pencil mode without saving
    const updateEditButton = posts.map((post) =>
      post.id === editingPostId
        ? {
            ...post,
            showEditButton: true,
          }
        : post,
    );
    setPosts(updateEditButton);
    setIsEditing(false);
    setEditingPostId(null);
    setEditingText("");
  }

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
    setBackColor(backColor === "whitesmoke" ? "black" : "whitesmoke");
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
          showEditButton: true,
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
        style={{
          backgroundColor: backColor,
          transition: "background-color 0.8s ease",
        }}
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
              onClick={(e) => {
                e.stopPropagation();
                clearSearch();
              }}
              onMouseEnter={(e) => (e.target.style.color = "#666")}
              onMouseLeave={(e) => (e.target.style.color = "#999")}
            >
              <i className="fa-solid fa-xmark"></i>
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

              {/* Editable or display text based on editing state */}
              {isEditing && editingPostId === post.id ? (
                <textarea
                  className="edit-textarea"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    width: "100%",
                    padding: "8px",
                    fontSize: "16px",
                    backgroundColor:
                      post.color === "white" ? "#f0f0f0" : "#3a1a4a",
                    color: post.textcolor,
                    border: `2px solid ${accentColor ? "#000033" : "white"}`,
                    borderRadius: "4px",
                    fontFamily: "inherit",
                    resize: "vertical",
                  }}
                  rows={3}
                  autoFocus
                />
              ) : (
                <p style={{ whiteSpace: "pre-wrap" }}>{post.sentence}</p>
              )}

              <div className="footer">
                <p style={{ fontSize: "12px", color: post.textcolor }}>
                  {post.date} {post.time}
                </p>
                <div>
                  {isEditing && editingPostId === post.id ? (
                    <>
                      <button
                        className="save-edit-btn"
                        onClick={(e) => {
                          saveEdit(post.id);
                          e.stopPropagation();
                        }}
                        style={{
                          marginRight: "5px",
                          background: "none",
                          color: post.textcolor,
                          border: "none",
                          borderRadius: "4px",
                          padding: "4px 8px",
                          cursor: "pointer",
                        }}
                      >
                        <i class="fa-solid fa-check"></i>
                      </button>
                      <button
                        className="cancel-edit-btn"
                        onClick={(e) => {
                          cancelEdit();
                          e.stopPropagation();
                        }}
                        style={{
                          marginRight: "5px",
                          background: "none",
                          color: post.textcolor,
                          border: "none",
                          borderRadius: "4px",
                          padding: "4px 8px",
                          cursor: "pointer",
                        }}
                      >
                        <i class="fa-solid fa-xmark"></i>
                      </button>
                    </>
                  ) : (
                    <button
                      className="edit-txt-btn"
                      onClick={(e) => {
                        startEditing(post.id, post.sentence);
                        e.stopPropagation();
                      }}
                      style={{ color: post.textcolor }}
                    >
                      <i className="fa-solid fa-pencil"></i>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;

import { useState } from "react";
import Button from "./buttons";

type UserCardProps = {
  name: string;
};

export default function UserCard({ name }: UserCardProps) {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [likes, setLikes] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [comments, setComments] = useState<string[]>([]);
  const [username, setUsername] = useState<string>("");

  function toggleTheme() {
    setIsDark((prev) => !prev);
  }

  function handleLike() {
    setLikes((prev) => prev + 1);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (comment.trim() === "") {
      return;
    }

    setComments((prev) => [...prev, comment]);
    setComment("");
  }

  return (
    <div
      style={{
        padding: "20px",
        margin: "20px",
        border: "1px solid gray",
        borderRadius: "10px",
        backgroundColor: isDark ? "#222" : "white",
        color: isDark ? "white" : "black",
    
      }}
    >
      <h2>{name}'s Card</h2>


      <Button
        type="button"
        text={isDark ? "☀️ " : "🌙 "}
        variant="secondary"
        onClick={toggleTheme}
      />

      <h3>Username</h3>

      <input
        type="text"
        placeholder="Enter username..."
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <p>Username: {username}</p>

    

      <h3>Likes</h3>

      <Button
        type="button"
        text={`👍  ${likes}`}
        variant="primary"
        onClick={handleLike}
      />

    


      <h3> Comment</h3>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <Button
          type="submit"
          text="Add Comment"
          variant="primary"
        />
      </form>

      <h3>Comments</h3>

      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        comments.map((item, index) => (
          <p key={index}>
            {index + 1}. {item}
          </p>
        ))
      )}
    </div>
  );
}
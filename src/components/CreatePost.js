import "./CreatePost.css";
import BtnBase from "./Buttons/BtnBase";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {createPost} from "../redux/actions/createPostSlice";
import {useSelector} from "react-redux";
import {fetchPosts} from "../redux/actions/postsSlice";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const username = useSelector(state => {
    return state.user.username
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && content) {
      dispatch(createPost({ username: username, title, content }))
        .then(() => {
          setTitle('');
          setContent('');
          dispatch(fetchPosts());
        })
        .catch((err) => {
          setError(err.message);
        });
    }
  };

  return (
    <div className={"CreatePostContainer"}>
      <h1 className={"CreatePostTitle"}>What’s on your mind?</h1>
      <label className={"CreatePostLabel"}>
        <span>Title</span>
        <input
          type="text"
          name="text"
          required
          placeholder={"Hello World"}
          className={"CreatePostInput-TextArea"}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label className={"CreatePostLabel"}>
        <span>Content</span>
        <textarea
          type="text"
          name="text"
          required
          placeholder={"Content Here..."}
          className={"CreatePostInput-TextArea"}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </label>
      {error && <p>{error}</p>}
      <div className={"CreatePostBtnControl"}>
        <BtnBase
          className={(!title || !content) ? "BtnDisabled" : "BtnBlue"}
          children={"Create"}
          onClick={handleSubmit}
          disabled={!title || !content}
        />
      </div>
    </div>
  );
};

export default CreatePost;

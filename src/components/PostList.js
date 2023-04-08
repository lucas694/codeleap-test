import "./PostList.css";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from "../redux/actions/postsSlice"
import PostCard from "./PostCard";
import {AiOutlineReload} from "react-icons/ai";


export const PostList = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const postStatus = useSelector((state) => state.posts.status);
  const [pollingInterval, setPollingInterval] = useState(60000); // Atualiza a cada 1 Minuto.

  useEffect(() => {
    dispatch(fetchPosts());

    const intervalId = setInterval(() => {
      dispatch(fetchPosts());
    }, pollingInterval);
    return () => clearInterval(intervalId); // Limpa o temporizador quando o componente é desmontado
  }, [pollingInterval, dispatch]);

  return (
    <div>
      {postStatus === 'loading' && <div>Loading posts...</div>}
      {postStatus === 'succeeded' && (
        <div>
          <div className={"PostListBtnControl"}>
            <span className={"UpdateSpan"}>Update</span>
            <button onClick={() => {setPollingInterval(120000); dispatch(fetchPosts())}}>
              <AiOutlineReload className={"BtnReloud"}/>
            </button>
          </div>
          {posts && posts.length > 0 ? (
            <ul>
              {posts.map((post) => (
                <li key={post.id}>
                  <PostCard postTitle={post.title}
                            username={post.username}
                            hour={post.created_datetime}
                            postContent={post.content} postId={post.id}/>
                </li>
              ))}
            </ul>
          ) : (
            <div>No posts to show.</div>
          )}
        </div>
      )}
    </div>
  );
};
export default PostList;

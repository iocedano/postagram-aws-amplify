import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { withAuthenticator} from '@aws-amplify/ui-react';
import { css } from '@emotion/css';
import { API, Storage } from 'aws-amplify';
import { listPosts } from './graphql/queries';

import Posts from './components/Posts';
import Post from './components/Post';
import Header from './components/Header';
import CreatePost from './components/CreatePost';
import Button from './components/Button';

function App({  signOut }) {
  /* create a couple of pieces of initial state */
  const [showOverlay, updateOverlayVisibility] = useState(false);
  const [posts, updatePosts] = useState([]);

  /* fetch posts when component loads */
  useEffect(() => {
      fetchPosts();
  }, []);
  
  async function fetchPosts() {
    /* query the API, ask for 100 items */
    let postData = await API.graphql({ query: listPosts, variables: { limit: 100 }});
    let postsArray = postData.data.listPosts.items;
    /* map over the image keys in the posts array, get signed image URLs for each image */
    postsArray = await Promise.all(postsArray.map(async post => {
      const imageKey = await Storage.get(post.image);
      post.image = imageKey;
      return post;
    }));
    /* update the posts array in the local state */
    setPostState(postsArray);
  }
  async function setPostState(postsArray) {
    updatePosts(postsArray);
  }
  return (
    <>
      <BrowserRouter>
          <div className={contentStyle}>
            <Header />
            <hr className={dividerStyle} />
            <Button title="New Post" onClick={() => updateOverlayVisibility(true)} />
            <Routes>
              <Route exact path="/" element={   <Posts posts={posts} />} />
              <Route path="/post/:id" element={<Post />} />
            </Routes>
          </div>
          <button onClick={signOut}>Sign Out</button>
        </BrowserRouter>
        { showOverlay && (
          <CreatePost
            updateOverlayVisibility={updateOverlayVisibility}
            updatePosts={setPostState}
            posts={posts}
          />
        )}
    </>
  );
}

const dividerStyle = css`
  margin-top: 15px;
`

const contentStyle = css`
  min-height: calc(100vh - 45px);
  padding: 0px 40px;
`

export default withAuthenticator(App);

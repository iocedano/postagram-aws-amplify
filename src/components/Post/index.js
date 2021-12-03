import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { API, Storage } from 'aws-amplify';
import { getPost } from '../../graphql/queries';
import { titleStyle, imageStyle, locationStyle } from './styles';

export default function Post() {
  const [loading, updateLoading] = useState(true);
  const [post, updatePost] = useState(null);
  const { id } = useParams()

  useEffect(() => {
    fetchPost()
  }, [])

  async function fetchPost() {
    try {
      const postData = await API.graphql({
        query: getPost, variables: { id }
      });
      const currentPost = postData.data.getPost
      const image = await Storage.get(currentPost.image);

      currentPost.image = image;
      updatePost(currentPost);
      updateLoading(false);
    } catch (err) {
      console.log('error: ', err)
    }
  }
  if (loading) return <h3>Loading...</h3>
  console.log('post: ', post)
  return (
    <>
      <h1 className={titleStyle}>{post.name}</h1>
      <h3 className={locationStyle}>{post.location}</h3>
      <p>{post.description}</p>
      <img alt="post" src={post.image} className={imageStyle} />
    </>
  )
}
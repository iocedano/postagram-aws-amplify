// import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import API from '@aws-amplify/api';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { listPosts } from './graphql/queries';
import { Storage } from 'aws-amplify';
import { v4 as uuid } from 'uuid'


function App({ signOut, user }) {
  const [posts, setPosts] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchPosts();
    fetchImages();
  }, []);

  async function fetchPosts() {
    try {
      const postData = await API.graphql({ query: listPosts });
      setPosts(postData.data.listPosts.items);
    } catch (error) {
      console.log(error);
    }
  };

  async function fetchImages() {
    let s3images = await Storage.list('');
    s3images = await Promise.all(s3images.map(async image => {
      const signedImage = await Storage.get(image.key);
      return signedImage;
    }));
    setImages(s3images);
  };

  function onChange(e) {
    if(!e.target.files[0]) return;
    const file = e.target.files[0];

    Storage.put(uuid(), file).then(() => fetchImages());
  }

  console.log(user.attribute);

  return (
    <div className="App">
     <button onClick={signOut}>Sign Out</button>
     <h1>KLK {user.username} </h1>

      {Boolean(posts.length) && posts.map((post) => (
        <div key={post.id}>
          <h3>{post.name}</h3>
          <p>{post.location}</p>
        </div>
      ))}
      <section>
        <h2>Photo Album</h2>
        <span>Add new image</span>
        <input
          type="file"
          accept='image/png'
          onChange={onChange}
        />
        <div style={{display: 'flex', flexDirection: 'column'}}>
        { images.map(image => <img src={image} style={{width: 400, marginBottom: 10}} />) }
        </div>
      </section>
     
    </div>
  );
}

export default withAuthenticator(App);

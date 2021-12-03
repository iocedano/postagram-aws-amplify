import { Link } from 'react-router-dom';
import { containerClass, linkClass, titleClass, imgClass } from './styles';

const Posts = ({
    posts = []
}) => (
    <>
        <h1>Posts</h1>
        {Array.isArray(posts)  && posts.map((post) => (
           <Link to={`/post/${post.id}`} className={linkClass} key={post.id}>
                <div key={post.id} className={containerClass}>
                    <h1 className={titleClass}>{post.name}</h1>
                    <img alt="post" className={imgClass} src={post.image} />
                </div>
            </Link> 
        ))}
    </>
);

export default Posts;
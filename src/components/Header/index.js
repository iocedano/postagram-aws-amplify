import { Link } from "react-router-dom";
import { containerClass, headerClass, linkClass } from './styles';

const Header = () => (
    <div className={containerClass}>
        <h1 className={headerClass}>Postagram</h1>
        <Link to="/" className={linkClass}>All Posts</Link>
        <Link to="/myposts" className={linkClass}>My Posts</Link>
    </div>
);

export default Header;
import { Link } from "react-router-dom"
import './NotFound.css' ;

const NotFound = () => {
  return (
    <div className="not-found">
      <h2>Sorry!</h2>
      <p>The page you've requested, cannot be found</p>
      <Link to="/">Back to the homepage</Link>
    </div>
  );
}
 
export default NotFound;
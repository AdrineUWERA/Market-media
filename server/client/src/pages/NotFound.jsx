import { FaExclamationTriangle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return ( <div className="d-flex flex-column justify-content-center align-items-center mt-5">
        <FaExclamationTriangle className="text-danger" size='6em'/>
        <h1 className="mt-4">404</h1>
        <p className="lead">Sorry, this page does not exist</p>
        <Link to='/' className="btn btn-primary mt-4">Go back</Link>
    </div> );
}
 
export default NotFound;
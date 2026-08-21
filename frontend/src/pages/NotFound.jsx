import { Link } from 'react-router-dom';

const NotFound = () => (
    <section className="notfound-page">
        <h1>Page not found</h1>
        <p>The page you are looking for does not exist. Return to the homepage to continue.</p>
        <Link to="/" className="secondary-button">
            Back to Home
        </Link>
    </section>
);

export default NotFound;

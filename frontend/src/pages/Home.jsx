import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
    const { user } = useAuth();

    return (
        <section className="hero-section">
            <div className="hero-copy">
                <span className="eyebrow">Secure resale, trusted transfers</span>
                <h1>Buy, sell, and transfer tickets with confidence.</h1>
                <p>
                    Re-Tix connects ticket owners, buyers, and verifiers in a secure resale workflow. Browse verified tickets, upload
                    listings, and track transfers every step of the way.
                </p>
                <div className="hero-actions">
                    {user ? (
                        <Link className="primary-button" to="/dashboard">
                            Go to Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link className="primary-button" to="/register">
                                Get Started
                            </Link>
                            <Link className="secondary-button" to="/browse">
                                Browse Tickets
                            </Link>
                        </>
                    )}
                </div>
            </div>
            <div className="hero-image">
                <div className="hero-card">
                    <p>Live transfer queue, verified receipts, and fraud prevention built for modern resale.</p>
                </div>
            </div>
        </section>
    );
};

export default Home;

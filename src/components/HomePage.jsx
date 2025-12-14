import './HomePage.css';
import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';

function HomePage({ setCurrentPage }) {
  const { user, logoutUser } = useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchedFor, setSearchedFor] = useState('');

  const bookTypes = [
    'Business',
    'Technology',
    'Lifestyle',
  ];

  const filtered = searchTerm
    ? bookTypes.filter((b) => b.toLowerCase().includes(searchTerm.toLowerCase()))
    : [];

  return (
    <div className="home-page">
      <header className="site-header">
        <div className="header-left">
          <img
            src="/bookmatrix-logo.png"
            alt="BookMatrix logo"
            className="site-logo"
            onClick={() => setCurrentPage('home')}
            style={{ cursor: 'pointer' }}
          />
        </div>

        <nav className="header-nav">
          <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('home'); }}>Home</a>
          <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('contact'); }}>Contact</a>
          <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('about'); }}>About</a>
        </nav>

        <div className="header-right">
          <button
            className="btn logout-btn"
            onClick={() => { logoutUser(); setCurrentPage('welcome'); }}
          >
            Logout
          </button>
        </div>
      </header>
      <div className="home-search">
        <form
          className="search-form"
          onSubmit={(e) => {
            e.preventDefault();
            setSearchedFor(searchTerm.trim());
          }}
        >
          <input
            className="search-input"
            placeholder="Search book types, e.g. 'Business'"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-button">Search</button>
        </form>

        {filtered.length > 0 && (
          <div className="search-results">
            {filtered.map((item) => (
              <div
                key={item}
                className="search-item"
                onClick={() => {
                  setSearchTerm(item);
                  setSearchedFor(item);
                }}
              >
                {item}
              </div>
            ))}
          </div>
        )}

        {searchedFor && (
          <div className="search-selected">Showing results for: {searchedFor}</div>
        )}

      </div>

    </div>
  );
}

export default HomePage;

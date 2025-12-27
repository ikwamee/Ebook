import './HomePage.css';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';

const featuredTopics = ['Design', 'Fiction', 'Science', 'History', 'Philosophy'];
const categories = ['All', 'Fiction', 'Science', 'History', 'Philosophy'];

const BookDetailModal = ({ book, onClose }) => {
  if (!book) return null;
  
  const getDownloadUrl = () => {
    if (book.formats) {
      return book.formats['application/epub+zip'] ||
             book.formats['text/plain'] ||
             book.formats['text/html'] ||
             Object.values(book.formats)[0];
    }
    return null;
  };

  const downloadUrl = getDownloadUrl();
  const htmlUrl = book.formats?.['text/html'];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="modal-body">
          <div className="modal-left">
            <div className="modal-cover">
              {book.coverImage ? (
                <img src={book.coverImage} alt={book.title} />
              ) : (
                <div className="cover-placeholder">📖</div>
              )}
            </div>
          </div>
          <div className="modal-right">
            <h2>{book.title}</h2>
            <p className="modal-author">by {book.author || 'Unknown'}</p>
            {book.language && (
              <p className="modal-meta">Language: {book.language.toUpperCase()}</p>
            )}
            <div className="modal-actions">
              {htmlUrl && (
                <a href={htmlUrl} target="_blank" rel="noopener noreferrer" className="btn cta">
                  📖 Read Online
                </a>
              )}
              {downloadUrl && (
                <a href={downloadUrl} target="_blank" rel="noopener noreferrer" className="btn cta">
                  ⬇ Download
                </a>
              )}
              {!htmlUrl && !downloadUrl && (
                <p className="no-download">This book's download format is not currently available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function HomePage({ setCurrentPage }) {
  const { logoutUser } = useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [slide, setSlide] = useState(0);
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [libraryBooks, setLibraryBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null);

  // Fetch featured books
  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await fetch('https://gutendex.com/books?sort=popular');
        const data = await response.json();
        const books = data.results.slice(0, 3).map((book) => ({
          id: book.id,
          title: book.title,
          author: book.authors?.[0]?.name || 'Unknown',
          category: 'Featured',
          blurb: `${book.title} is a timeless classic. Dive into this literary masterpiece.`,
          cover: book.formats?.['image/jpeg'] ? '📚' : '📖',
          tag: 'Popular',
          tone: ['purple', 'blue', 'teal'][Math.floor(Math.random() * 3)],
          formats: book.formats,
          coverImage: book.formats?.['image/jpeg']
        }));
        setFeaturedBooks(books);
      } catch (error) {
        console.error('Error fetching featured books:', error);
      }
    };
    fetchFeatured();
  }, []);

  // Fetch library books based on category or search
  useEffect(() => {
    const fetchLibraryBooks = async () => {
      setLoading(true);
      try {
        const query = searchTerm.trim() || (activeCategory !== 'All' ? activeCategory : 'fiction');
        const response = await fetch(`https://gutendex.com/books?search=${encodeURIComponent(query)}&sort=popular`);
        const data = await response.json();
        const books = (data.results || []).slice(0, 12).map((book) => ({
          id: book.id,
          title: book.title,
          author: book.authors?.[0]?.name || 'Unknown',
          category: activeCategory,
          downloads: `${Math.floor(Math.random() * 50)}k`,
          rating: (3.5 + Math.random() * 1.5).toFixed(1),
          cover: '📖',
          formats: book.formats,
          language: book.languages?.[0] || 'en',
          coverImage: book.formats?.['image/jpeg']
        }));
        setLibraryBooks(books);
      } catch (error) {
        console.error('Error fetching library books:', error);
        setLibraryBooks([]);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchLibraryBooks();
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, activeCategory]);

  useEffect(() => {
    if (featuredBooks.length === 0) return;
    const timer = setInterval(() => {
      setSlide((prev) => (prev + 1) % featuredBooks.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [featuredBooks.length]);

  const activeBook = featuredBooks[slide] || featuredBooks[0];

  return (
    <div className="home-page">
      <header className="site-header">
        <div className="header-left" onClick={() => setCurrentPage('home')}>
          <img src="/bookmatrix-logo.png" alt="BookMatrix logo" className="site-logo" />
          <span className="brand">BookMatrix</span>
        </div>

        <nav className="header-nav">
          <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('home'); }}>Home</a>
          <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('contact'); }}>Contact</a>
          <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('about'); }}>About</a>
        </nav>

        <div className="header-actions">
          <div className="header-search">
            <span className="search-icon">🔍</span>
            <input
              placeholder="Search the library"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn logout-btn" onClick={() => { logoutUser(); setCurrentPage('welcome'); }}>
            Logout
          </button>
        </div>
      </header>

      <main className="home-content">
        <section className="hero">
          <div className="hero-left">
            <p className="eyebrow">Premium Online Library</p>
            <h1>Discover the next book you cannot put down.</h1>
            <p className="hero-sub">A minimalist, high-contrast library experience with curated picks, crafted for focus and flow.</p>
            <div className="hero-actions">
              <button className="btn cta">Explore Library</button>
              <button className="btn ghost" onClick={() => setCurrentPage('about')}>View Membership</button>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">2.4k</span>
                <span className="stat-label">Premium Titles</span>
              </div>
              <div className="stat">
                <span className="stat-number">940</span>
                <span className="stat-label">New This Month</span>
              </div>
              <div className="stat">
                <span className="stat-number">4.9★</span>
                <span className="stat-label">Member Rated</span>
              </div>
            </div>
          </div>

          <div className="hero-right">
            {activeBook && (
              <div className={`feature-card ${activeBook.tone}`}>
                <div className="feature-top">
                  <span className="feature-tag">{activeBook.tag}</span>
                  <span className="feature-cover">{activeBook.cover}</span>
                </div>
                <div className="feature-body">
                  <p className="feature-category">{activeBook.category}</p>
                  <h3>{activeBook.title}</h3>
                  <p className="feature-author">by {activeBook.author}</p>
                  <p className="feature-blurb">{activeBook.blurb}</p>
                </div>
                <div className="feature-controls">
                  <button onClick={() => setSlide((prev) => (prev - 1 + featuredBooks.length) % featuredBooks.length)}>Prev</button>
                  <span className="feature-index">{slide + 1}/{featuredBooks.length}</span>
                  <button onClick={() => setSlide((prev) => (prev + 1) % featuredBooks.length)}>Next</button>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="library-section">
          <div className="section-header">
            <div>
              <p className="eyebrow">Browse the stack</p>
              <h2>Featured bookshelf</h2>
            </div>
            <div className="categories">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`pill ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="books-grid">
            {loading ? (
              <div className="loading">Loading books...</div>
            ) : libraryBooks.length > 0 ? (
              libraryBooks.map((book) => (
                <div key={book.id} className="book-card" onClick={() => setSelectedBook(book)}>
                  <div className="book-top">
                    <span className="book-cover">
                      {book.coverImage ? (
                        <img src={book.coverImage} alt={book.title} />
                      ) : (
                        '📖'
                      )}
                    </span>
                    <span className="book-category">{book.category}</span>
                  </div>
                  <h3 className="book-title">{book.title}</h3>
                  <p className="book-author">{book.author}</p>
                  <div className="book-meta">
                    <span>⬇ {book.downloads}</span>
                    <span>⭐ {book.rating}</span>
                  </div>
                  <button className="btn card-cta">Read now</button>
                </div>
              ))
            ) : (
              <div className="no-results">No books found. Try another search.</div>
            )}
          </div>
        </section>
      </main>

      <BookDetailModal book={selectedBook} onClose={() => setSelectedBook(null)} />
    </div>
  );
}

export default HomePage;

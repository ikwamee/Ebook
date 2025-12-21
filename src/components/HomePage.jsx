import './HomePage.css';
import { useContext, useEffect, useMemo, useState } from 'react';
import { UserContext } from '../context/UserContext';

const featuredBooks = [
  {
    id: 1,
    title: 'Designing the Future Library',
    author: 'Noah Brennan',
    category: 'Design',
    blurb: 'A premium look at next-gen digital library experiences with timeless typography and bold color.',
    cover: '🌓',
    tag: 'Editors’ Pick',
    tone: 'purple'
  },
  {
    id: 2,
    title: 'The Product Thinking Playbook',
    author: 'Elena Strauss',
    category: 'Business',
    blurb: 'Strategy, storytelling, and systems thinking for modern product teams and founders.',
    cover: '📈',
    tag: 'Top Rated',
    tone: 'blue'
  },
  {
    id: 3,
    title: 'Calm Interfaces',
    author: 'Hiro Tanaka',
    category: 'Technology',
    blurb: 'Minimalist UI patterns that reduce noise and boost focus for premium digital products.',
    cover: '🌌',
    tag: 'New',
    tone: 'teal'
  }
];

const libraryBooks = [
  { id: 11, title: 'Midnight Architectures', author: 'Ava Rhodes', category: 'Design', downloads: '28.4k', rating: 4.9, cover: '🌙' },
  { id: 12, title: 'Systems for Builders', author: 'Jon Park', category: 'Technology', downloads: '22.1k', rating: 4.8, cover: '⚙️' },
  { id: 13, title: 'Velocity', author: 'Nina Patel', category: 'Business', downloads: '19.7k', rating: 4.7, cover: '🚀' },
  { id: 14, title: 'Soft Focus', author: 'Kemi Adebayo', category: 'Lifestyle', downloads: '17.3k', rating: 4.6, cover: '🎧' },
  { id: 15, title: 'Interface Poetry', author: 'Leo Martins', category: 'Design', downloads: '15.9k', rating: 4.8, cover: '🪄' },
  { id: 16, title: 'Signal to Noise', author: 'Priya Raman', category: 'Technology', downloads: '14.1k', rating: 4.7, cover: '📡' },
  { id: 17, title: 'Golden Hour', author: 'Arthur Miles', category: 'Lifestyle', downloads: '13.6k', rating: 4.5, cover: '🌅' },
  { id: 18, title: 'Crafted Narratives', author: 'Maya Ortiz', category: 'Business', downloads: '12.8k', rating: 4.6, cover: '📖' }
];

const categories = ['All', 'Design', 'Technology', 'Business', 'Lifestyle'];

function HomePage({ setCurrentPage }) {
  const { logoutUser } = useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlide((prev) => (prev + 1) % featuredBooks.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const filteredBooks = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return libraryBooks.filter((book) => {
      const matchCategory = activeCategory === 'All' || book.category === activeCategory;
      const matchTerm = term
        ? book.title.toLowerCase().includes(term) ||
          book.author.toLowerCase().includes(term) ||
          book.category.toLowerCase().includes(term)
        : true;
      return matchCategory && matchTerm;
    });
  }, [activeCategory, searchTerm]);

  const activeBook = featuredBooks[slide];

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
            {filteredBooks.map((book) => (
              <div key={book.id} className="book-card">
                <div className="book-top">
                  <span className="book-cover">{book.cover}</span>
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
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default HomePage;

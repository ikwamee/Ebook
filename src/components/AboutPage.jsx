import './AboutPage.css';

function AboutPage({ setCurrentPage }) {
  return (
    <div className="about-page">
      <header className="about-header">
        <h1>About BookMatrix</h1>
      </header>

      <main className="about-content">
        <p>
          BookMatrix is a lightweight demo app built to showcase a simple
          multi-page React UI. Use the navigation to move between pages.
        </p>

        <p>
          This About page was added so the "About" link opens a dedicated
          page instead of a modal.
        </p>

        <div className="about-actions">
          <button className="btn" onClick={() => setCurrentPage('home')}>
            Back to Home
          </button>
        </div>
      </main>
    </div>
  );
}

export default AboutPage;

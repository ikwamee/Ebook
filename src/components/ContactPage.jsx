import './ContactPage.css';

function ContactPage({ setCurrentPage }) {
  return (
    <div className="contact-page">
      
        <div className="contact-actions">
          <button className="btn" onClick={() => setCurrentPage('home')}>
            Back to Home
          </button>
        </div>
    </div>
  );
}

export default ContactPage;

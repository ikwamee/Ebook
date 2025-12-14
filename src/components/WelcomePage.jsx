import './WelcomePage.css';
import Buttons from './Buttons';

function WelcomePage({ setCurrentPage }) {
  return (
    <div className="welcome-page">
      <div className="welcome-inner">
        <div className="welcome-left">
          <img src="/bookmatrix-logo.png" alt="BookMatrix logo" />
        </div>
        <div className="welcome-right">
          <h1>Welcome to BookMatrix</h1>
          <Buttons onGetStarted={() => setCurrentPage('login')} />
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
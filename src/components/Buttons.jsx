function Buttons({ onGetStarted }) {
    
  return (
    <div className="btn-wrapper">
      <button 
        className="btn"
        onClick={onGetStarted}
      >
        Get Started
      </button>
    </div>
  );
}

export default Buttons;
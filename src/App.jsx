import { useState } from 'react';
import WelcomePage from "./components/WelcomePage";
import LoginPage from "./components/LoginPage";
import SignInpage from "./components/SignInPage";
import HomePage from "./components/HomePage";
import AboutPage from "./components/AboutPage";
import ContactPage from "./components/ContactPage";
import { UserProvider } from './context/UserContext';
import './App.css';


function App() {
  const [currentPage, setCurrentPage] = useState('welcome'); 
  
  return (
    <UserProvider>
      <div className="App">
        {currentPage === 'login' ? (
          <LoginPage setCurrentPage={setCurrentPage} />
        ) : currentPage === 'signin' ? (
          <SignInpage setCurrentPage={setCurrentPage} />
        ) : currentPage === 'home' ? (
          <HomePage setCurrentPage={setCurrentPage} />
        ) : currentPage === 'about' ? (
          <AboutPage setCurrentPage={setCurrentPage} />
        ) : currentPage === 'contact' ? (
          <ContactPage setCurrentPage={setCurrentPage} />
        ) : (
          <WelcomePage setCurrentPage={setCurrentPage} />
        )}
      </div>
    </UserProvider>
  );
}

export default App

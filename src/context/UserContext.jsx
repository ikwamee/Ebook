import { createContext, useState } from 'react';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]); 

  const loginUser = (username, password) => {
    
    const foundUser = users.find(u => u.username === username && u.password === password);
    if (foundUser) {
      setUser(foundUser);
      return { success: true, message: 'Login successful!' };
    }
    return { success: false, message: 'Invalid username or password' };
  };

  const signUpUser = (username, email, password) => {

    if (users.find(u => u.username === username)) {
      return { success: false, message: 'Username already exists' };
    }
    if (users.find(u => u.email === email)) {
      return { success: false, message: 'Email already registered' };
    }

    const newUser = { username, email, password, createdAt: new Date().toISOString() };
    setUsers([...users, newUser]);
    setUser(newUser);
    return { success: true, message: 'Account created successfully!' };
  };

  const logoutUser = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, loginUser, signUpUser, logoutUser, users }}>
      {children}
    </UserContext.Provider>
  );
}

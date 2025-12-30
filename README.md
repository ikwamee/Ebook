# BookMatrix

BookMatrix is a modern web application for discovering, browsing, and reading classic literature from the Gutenberg Project. Built with React and Vite, it provides an intuitive interface for accessing thousands of free ebooks.

## 🚀 Features

- **User Authentication**: Sign up and login functionality with context-based user management
- **Welcome Experience**: Clean landing page introducing users to the platform
- **Book Discovery**: Browse featured books and popular titles from Project Gutenberg
- **Advanced Search**: Search and filter books by category, title, or author
- **Book Details**: View detailed information including author, language, and available formats
- **Multiple Reading Options**: Read books online (HTML format) or download in various formats (EPUB, plain text)
- **Category Filtering**: Filter books by genres including Fiction, Science, History, and Philosophy
- **Responsive Design**: Mobile-friendly interface with dynamic color schemes
- **Navigation System**: Seamless navigation between Welcome, Home, About, and Contact pages

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.2.0
- **Build Tool**: Vite (Rolldown variant 7.2.5) with HMR
- **Routing**: State-based page navigation
- **State Management**: React Context API for user authentication
- **API Integration**: Gutendex API for Project Gutenberg books
- **Styling**: CSS with modular component styles
- **Color Extraction**: node-vibrant for dynamic theming
- **Code Quality**: ESLint with React-specific rules

## 📦 Project Structure

```
ebook/
├── src/
│   ├── components/          # React components
│   │   ├── WelcomePage.jsx  # Landing page
│   │   ├── LoginPage.jsx    # User login
│   │   ├── SignInPage.jsx   # User registration
│   │   ├── HomePage.jsx     # Main book browsing interface
│   │   ├── AboutPage.jsx    # About information
│   │   ├── ContactPage.jsx  # Contact form
│   │   └── Buttons.jsx      # Reusable button components
│   ├── context/
│   │   └── UserContext.jsx  # User authentication context
│   ├── App.jsx              # Main application component
│   └── main.jsx             # Application entry point
├── public/                  # Static assets
├── scripts/                 # Utility scripts
└── package.json            # Dependencies and scripts
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ebook
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to the local development URL (typically `http://localhost:5173`)

## 📜 Available Scripts

- `npm run dev` - Start development server with hot module replacement
- `npm run build` - Build production-ready application
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

## 🔑 Key Components

### Authentication System
- **UserContext**: Manages user state and authentication logic
- **Login/SignIn Pages**: Handle user authentication and registration
- Client-side user management with validation

### Book Management
- **HomePage**: Main interface for browsing books with search and filtering
- **BookDetailModal**: Displays detailed book information with reading/download options
- Integration with Gutendex API for real-time book data

### Navigation Flow
```
WelcomePage → LoginPage/SignInPage → HomePage ⇄ AboutPage/ContactPage
```

## 🌐 API Integration

The application uses the [Gutendex API](https://gutendex.com/) to fetch book data from Project Gutenberg, including:
- Book metadata (title, author, language)
- Cover images
- Multiple format options (EPUB, HTML, plain text)
- Popular and trending titles

## 🎨 Styling

- Modular CSS approach with component-specific stylesheets
- Dynamic color theming using node-vibrant
- Responsive design for various screen sizes
- Custom modal and overlay components

## 🔧 Configuration

- **Vite Config**: Custom Vite configuration with React plugin
- **ESLint**: Configured for React development with hooks support
- **Module System**: ES modules enabled for modern JavaScript features

## 📝 License

This project is private and not currently licensed for public distribution.

## 🤝 Contributing

This is a project for ALX. Please follow the project guidelines for contributions.

---

Built with ❤️ using React and Vite

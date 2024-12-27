# Mirai - Fashion Color Forecast Platform

## Overview
Mirai is a modern web application built with SvelteKit that provides fashion color forecasting based on generational pattern analysis. The platform analyzes historical fashion color data (1998-2005) and predicts future color trends by applying generation-specific time offsets. It features a sleek, responsive design with glass-morphism UI elements and an intuitive user interface.

## Features
- 🎨 Fashion Color Forecasting
  - Historical data analysis from 1998-2005
  - Generation-based trend prediction (20-27 year patterns)
  - Color palettes with hex codes and suggested pieces
  - Support for Spring/Summer and Fall/Winter seasons
- 💼 Business-Scaled Pricing
  - Tailored pricing based on company size
  - Options from freelancers to enterprise
- 🔐 User Authentication System
  - Secure access to forecasts
  - User profile management
  - Session persistence
- 📱 Responsive Design
  - Mobile-first approach
  - Adaptive dual-navigation system
  - Glass-morphism UI elements
- 🌊 Interactive Elements
  - Particle trail effects
  - Smooth transitions
  - Dynamic color visualization

## Tech Stack
- **Frontend Framework**: SvelteKit 2.0 with Vite
- **Database & Auth**: PocketBase 0.21.5
  - Historical color data (1998-2005)
  - User authentication & management
- **State Management**: Svelte Stores
  - Form data persistence
  - Authentication state
  - Forecast data handling
- **Styling**: Custom CSS with Variables
  - Glass-morphism effects
  - Responsive layouts
  - Dynamic theming
- **Development Tools**: 
  - ESLint & Prettier for code quality
  - JSDoc for type checking and documentation

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm
- PocketBase server (for authentication and data storage)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/mirai.git
cd mirai
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env` file in the root directory with the following variables:
```env
POCKETBASE_URL=your_pocketbase_url
```

4. Start the development server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run check` - Run SvelteKit sync and type checking
- `npm run check:watch` - Run type checking in watch mode
- `npm run lint` - Run Prettier and ESLint checks
- `npm run format` - Format code with Prettier

## Project Structure
```
mirai/
├── src/
│   ├── lib/
│   │   ├── components/      # Reusable Svelte components
│   │   ├── config/         # Configuration files
│   │   ├── helpers/        # Utility functions
│   │   ├── services/       # External service integrations
│   │   └── stores/         # Svelte stores for state management
│   ├── routes/             # SvelteKit routes and pages
│   └── app.html           # Main HTML template
├── static/
│   └── styles/
│       └── global.css     # Global styles and CSS variables
└── docker/                # Docker configuration files
```

## Components

### Navigation System
The application features a dual-navigation system that adapts to different screen sizes:
- Desktop: Displays left (main navigation) and right (user authentication) menus
- Mobile: Collapses into a single hamburger menu containing all navigation items

### Authentication
User authentication is handled through PocketBase, providing:
- User registration
- Login/Logout functionality
- Session management
- Protected routes

### Forecast System
The core forecasting functionality includes:
- Generation-based color prediction
  - Gen Z (20-year pattern)
  - Millennial (22-year pattern)
  - Gen X (25-year pattern)
  - Baby Boomer (27-year pattern)
- Historical data analysis from 1998-2005
- Season-specific forecasts (Spring/Summer, Fall/Winter)
- Color palette visualization with:
  - Color previews
  - HEX codes
  - Suggested clothing pieces

## Styling
The application uses a comprehensive CSS variable system for consistent theming:
- Glass-morphism effects
- Responsive design breakpoints
- Dynamic color schemes
- Flexible layout system

### CSS Variables
Key design tokens are managed through CSS variables:
```css
:root {
  --nav-width: 250px;
  --content-max-width: 1200px;
  --glass-bg: rgba(255, 255, 255, 0.1);
  --glass-border: rgba(255, 255, 255, 0.3);
  /* ... other variables */
}
```

## Development

### Code Quality
The project uses several tools to maintain code quality:
- **ESLint**: JavaScript/Svelte linting
- **Prettier**: Code formatting
- **svelte-check**: Type checking and verification

### Building for Production
```bash
npm run build
```

The build process will create an optimized production build in the `build` directory.

To preview the production build locally:
```bash
npm run preview
```

## Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style Guidelines
- Run `npm run format` before committing to ensure consistent code formatting
- Ensure all linting checks pass with `npm run lint`
- Use JSDoc comments for type checking and documentation
- Follow the existing component structure and naming conventions

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact
Your Name - [@yourusername](https://twitter.com/yourusername)
Project Link: [https://github.com/yourusername/mirai](https://github.com/yourusername/mirai)

## Acknowledgments
- SvelteKit Documentation
- PocketBase
- Svelte Community

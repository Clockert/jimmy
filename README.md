# Jimmy's Mountain Services

A responsive, user-centered website for a professional mountain guide service based in Tromsø, Northern Norway. This project showcases custom mountain experiences and guided tours while emphasizing safety, sustainability, and authentic Arctic adventures.

## 🏔️ About the Project

This website serves as the digital presence for Jimmy's Mountain Services, offering personalized mountain experiences in the breathtaking landscapes around Tromsø. The site focuses on user experience, accessibility, and sustainable web development practices.

### Key Features

- **Responsive Design**: Fully responsive across desktop, tablet, and mobile devices
- **User-Centered Design**: Intuitive navigation and accessible interface following WCAG 2.1 guidelines
- **Modern CSS Architecture**: Modular CSS with custom properties and BEM methodology
- **Interactive Components**: Client-side form validation and mobile menu functionality
- **Template System**: Reusable HTML components for maintainable code
- **Performance Optimized**: Efficient loading and sustainable coding practices

## 🛠️ Technologies Used

- **HTML5**: Semantic markup with accessibility in mind
- **CSS3**: Modern CSS with Flexbox, Grid, and custom properties
- **JavaScript (ES6+)**: Client-side interactivity and form validation
- **Web Fonts**: Schibsted Grotesk font family
- **Font Awesome**: Icon library for UI elements

## 📁 Project Structure

```
├── assets/
│   ├── logo/           # Brand logos in various formats
│   ├── photos/         # High-quality WebP images
│   └── svg/            # SVG graphics and illustrations
├── styles/
│   ├── base.css        # CSS reset, variables, and base styles
│   ├── main.css        # Main stylesheet importing all modules
│   ├── pages/          # Page-specific styles
│   │   ├── index.css
│   │   ├── about.css
│   │   ├── services.css
│   │   ├── contact.css
│   │   └── articles.css
│   └── templates/      # Component-specific styles
│       ├── nav.css
│       ├── footer.css
│       ├── services-section.css
│       └── articles-promo.css
├── templates/          # Reusable HTML components
│   ├── nav.html
│   ├── footer.html
│   ├── services-section.html
│   └── articles-promo-section.html
├── script/
│   ├── templates.js    # Template loading system
│   ├── menuToggle.js   # Mobile navigation functionality
│   └── formValidation.js # Form validation with real-time feedback
├── index.html          # Homepage
├── about.html          # About page
├── services.html       # Services page
├── contact.html        # Contact page
├── articles.html       # Articles page
└── .gitattributes      # Git configuration
```

## 🎨 Design System

### Color Palette

- **Primary**: `#022150` (Dark Blue)
- **Secondary**: `#02388A` (Mid Blue)
- **Accent**: `#FE9042` (Orange)
- **Background**: `#EDF4FF` (Light Blue)
- **Text**: `#000000` (Black)
- **Surface**: `#FFFFFF` (White)

### Typography

- **Font Family**: Schibsted Grotesk (weights: 100-900)
- **Responsive Typography**: Fluid scaling across devices
- **Semantic Hierarchy**: Clear heading structure (H1-H3)

### Spacing System

- **Base Unit**: 4px
- **Scale**: 4px, 8px, 12px, 16px, 20px, 24px, 32px, 48px, 64px, 80px
- **Content Padding**: Responsive (75px desktop → 20px mobile)

## 🚀 Getting Started

### Prerequisites

- Modern web browser with JavaScript enabled
- Local web server (recommended for development)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/clockert/jimmy.git
   cd jimmy
   ```

2. **Serve the project locally**

   ```bash
   # Using Python 3
   python -m http.server 8000

   # Using Node.js (if you have live-server installed)
   npx live-server

   # Using PHP
   php -S localhost:8000
   ```

3. **Open in browser**
   Navigate to `http://localhost:8000`

### Development Setup

The project uses a modular template system that loads components dynamically. Ensure JavaScript is enabled for full functionality.

## 📱 Features & Components

### Navigation System

- **Sticky Navigation**: Remains accessible while scrolling
- **Mobile Menu**: Collapsible hamburger menu with focus trap
- **Accessibility**: ARIA labels and keyboard navigation support

### Contact Forms

- **Real-time Validation**: Client-side validation with immediate feedback
- **Multiple Locations**: Main contact page and footer forms
- **Accessibility**: Proper labeling and error messaging

### Template System

- **Dynamic Loading**: Components loaded via JavaScript
- **Reusable Components**: Navigation, footer, and content sections
- **Error Handling**: Graceful fallbacks for failed template loads

### Responsive Design

- **Mobile-First**: Progressive enhancement approach
- **Breakpoints**: 640px, 768px, 1024px, 1280px
- **Touch-Friendly**: Appropriate touch targets and interactions

## 🎯 Pages Overview

### Homepage (`index.html`)

- Hero section with call-to-action
- Services overview
- Tours information section
- Articles preview

### About Page (`about.html`)

- Guide biography and qualifications
- Local knowledge and environmental commitment
- Professional credentials and experience

### Services Page (`services.html`)

- Detailed service offerings
- Approach and methodology
- Specialized experiences and possibilities

### Contact Page (`contact.html`)

- Comprehensive contact form
- Contact information
- Guide profile section

### Articles Page (`articles.html`)

- Blog layout with featured article
- Article grid with preview cards
- Content management ready structure

## ♿ Accessibility Features

- **Semantic HTML**: Proper use of `<nav>`, `<main>`, `<section>`, and `<article>` elements
- **ARIA Labels**: Navigation and form elements include appropriate ARIA attributes
- **Keyboard Navigation**: Supports Tab navigation and Escape key for mobile menu
- **Focus Management**: Focus trap implementation for mobile menu accessibility
- **Form Accessibility**: Form fields include `aria-label` and `autocomplete` attributes
- **Screen Reader Friendly**: Semantic structure and ARIA attributes for assistive technology

## 🌱 Sustainability & Performance

- **Optimized Images**: WebP format for reduced file sizes
- **Efficient CSS**: Minimal and modular stylesheets
- **Clean JavaScript**: Vanilla JS with no unnecessary dependencies
- **Semantic HTML**: Efficient markup structure
- **Font Loading**: Optimized web font delivery

## 📝 Future Enhancements

- **CMS Integration**: Content management system for articles
- **Blog Functionality**: Full article pages with dynamic content

## 📋 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

This project was developed as part of the "Web Development Essentials" course assignment. For educational purposes and course requirements.

### Development Guidelines

- Follow BEM CSS methodology
- Maintain accessibility standards
- Use semantic HTML
- Keep JavaScript vanilla (no frameworks)
- Optimize for performance

## 📄 License

This project is created for educational purposes as part of a web development course assignment.

## 👨‍🏔️ About Jimmy's Mountain Services

Based in Tromsø, Northern Norway, Jimmy's Mountain Services offers personalized mountain experiences ranging from ski touring and winter mountaineering to northern lights expeditions and corporate team building. Every adventure is customized to match your skill level, preferences, and goals.

---

_Built with ❤️ for the mountains of Tromsø_

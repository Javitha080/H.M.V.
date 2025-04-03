# Homagama Maha Vidyalaya Website Project

A modern, interactive website for Homagama Maha Vidyalaya featuring advanced animations, responsive design, and modern UI/UX elements.

## Table of Contents

- [Project Overview](#project-overview)
- [Design Elements](#design-elements)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Pages & Components](#pages--components)
- [Advanced Features](#advanced-features)
- [Implementation Guide](#implementation-guide)
- [Development Timeline](#development-timeline)
- [Resources](#resources)

## Project Overview

This project aims to create a modern, stylish, and interactive landing page for Homagama Maha Vidyalaya, showcasing the school's facilities, achievements, and information. The website will feature modern design elements, advanced animations, and responsive layouts optimized for all devices.

### School Information

Homagama Maha Vidyalaya is a prominent educational institution located on Athurugiriya Road in Homagama, Colombo district, under the Western Province of Sri Lanka. The school offers classes from Grades 1 to 11 with a student population of 2,376 (1,221 male and 1,155 female students).

## Design Elements

### Modern Stylish Elements

- **Glassmorphism**: Frosted glass effect for cards, navigation bars, and UI components
- **Cinematic Lighting**: Dynamic shadows, gradient overlays, and light leak effects
- **Japanese Box Style**: Clean geometric shapes, minimalist containers, and grid-based layouts

### Color Scheme

- Primary: `#E3242B` (red)
- Secondary: `#000080` (navy blue)
- Accent: `#FFBF00` (Warm yellow)
- Dark Mode: `#1F2937` (Deep blue-gray background), `#F9FAFB` (Light text)
- Light Mode: `#F9FAFB` (Soft white background), `#111827` (Dark text)

### Typography

- Headings: Montserrat (modern, clean)
- Body: Inter (highly readable)
- Feature Text: Poppins (for emphasis and UI elements)

## Technologies


### Core Technologies

- HTML5
- CSS3 with Tailwind CSS
- JavaScript (ES6+)

### Advanced Libraries

- **Tailwind CSS 4**: For responsive design and utility-first styling
- **GSAP (GreenSock Animation Platform)**: For advanced animations and scroll effects
- **Three.js**: For 3D elements and interactive backgrounds
- **A-Frame**: For virtual reality components and experiences
- **Alpine.js**: For reactive and declarative JavaScript
- **Swiper.js**: For modern carousels and sliders
- **Mapbox GL JS**: For interactive maps
- **Typed.js**: For typing animations
- **Anime.js**: For additional animation capabilities
- **Intersection Observer API**: For scroll-triggered animations
- **FullCalendar.js**:
- **Headless UI**  
  Provides unstyled, accessible components (e.g., dropdowns, modals) that integrate with Tailwind CSS. Focuses on behavior rather than visuals .  
  🔗 [headlessui.com](https://headlessui.com)  

- **Radix UI**  
  Offers low-level primitives for building accessible components. Follows WAI-ARIA standards and supports CSS customization .  
  🔗 [radix-ui.com](https://radix-ui.com)  
  
- **Foundation**  
  A flexible, enterprise-grade framework for responsive websites and apps.  
  🔗 [get.foundation](https://get.foundation)
- **Bulma**  
  A modern CSS framework based on Flexbox with minimal JavaScript dependency.  
  🔗 [bulma.io](https://bulma.io)
- **Handlebars.js**  
  Simplifies HTML templating with logic-less Mustache syntax.  
  🔗 [handlebarsjs.com](https://handlebarsjs.com)
- **EJS (Embedded JavaScript)**  
  Generate HTML markup with embedded JavaScript logic.  
  🔗 [ejs.co](https://ejs.co)
- **Pug (formerly Jade)**  
  Write clean, indentation-based HTML templates with shorthand syntax.  
  🔗 [pugjs.org](https://pugjs.org)
- **jQuery**  
  Simplifies DOM manipulation, event handling, and AJAX (still widely used).  
  🔗 [jquery.com](https://jquery.com)
- **Alpine.js**  
  A lightweight JavaScript framework for adding interactivity directly in HTML markup.  
  🔗 [alpinejs.dev](https://alpinejs.dev)
- **React**  
  A JavaScript library for building component-based UIs (uses JSX for HTML-like syntax).  
  🔗 [react.dev](https://react.dev)
- **HTML5 Boilerplate**  
  A professional front-end template for fast, robust, and adaptable websites.  
  🔗 [html5boilerplate.com](https://html5boilerplate.com)
- **Modernizr**  
  Detects HTML5 and CSS3 features in browsers for graceful degradation.  
  🔗 [modernizr.com](https://modernizr.com)
- **Eleventy (11ty)**  
  A simpler static site generator for HTML, Markdown, and JavaScript.  
  🔗 [11ty.dev](https://www.11ty.dev)
- **Hugo**  
  Blazing-fast SSG for building static websites from Markdown and templates.  
  🔗 [gohugo.io](https://gohugo.io)
- **a11y.css**  
  Highlights potential accessibility issues in your HTML.  
  🔗 [github.com/ffoodd/a11y.css](https://github.com/ffoodd/a11y.css)
- **W3C Validator**  
  Official tool to check HTML markup validity.  
  🔗 [validator.w3.org](https://validator.w3.org)
- **Font Awesome**  
  Scalable vector icons that integrate seamlessly with HTML.  
  🔗 [fontawesome.com](https://fontawesome.com)
- **Material Icons**  
  Google’s icon library for Material Design.  
  🔗 [fonts.google.com/icons](https://fonts.google.com/icons)
- **Materialize CSS** (Material Design components)  
- **Skeleton** (lightweight CSS boilerplate)  
- **Lit** (fast, lightweight web components library)  


## Pages & Components

### Header
- Modern, sticky header with glassmorphism effect
- Responsive and advanced navigation with animated hamburger menu
- Smooth scroll to sections
- Dynamic color change on scroll
- school logo middle in header
- School logo animation

### Home Page
- Hero section with 3D school building using Three.js
- Typing animation for school motto and taglines
- Key statistics with animated counters
- Featured programs and facilities
- Testimonials slider
- Latest news section (bottom)
- Parallax scrolling effects

### About Page
- Interactive timeline of school history
- Mission and vision statements with animated reveal
- Staff profiles with hover effects
- Achievement statistics with GSAP animations
- Virtual tour integration (A-Frame)

### Gallery
- Modern image grid with filter options (academics, sports, cultural)
- 3D carousel for featured images
- Lightbox functionality with zoom capabilities
- Video gallery section
- use Japanese box effect

### News Section
- Card-based layout for news articles
- Category filtering system
- Search functionality
- Featured news carousel
- Social media sharing integration
- use glassmopisom effect

### Contact Page
- Interactive map showing school location (Mapbox GL)
- Modern contact form with animations
- Social media integration
- Address and contact information with icons
- FAQ accordion

### Footer
- Modern footer with geometric Japanese-inspired design
- Newsletter signup form
- Quick links to important pages
- Social media icons with hover animations
- Back to top button with smooth scroll

## Advanced Features

### Animations & Interactions
- Page transition effects
- Scroll-triggered animations using GSAP ScrollTrigger
- Micro-interactions for buttons, links, and form elements
- advanced Parallax scrolling effects
- Custom cursor effects for interactive elements
### Loading Animation
- Day/night cycle loader animation
- Progress indicator
- School logo animation
- Smooth transition to content



### PWA Implementation
- install me pop-up box
- Offline access capabilities
- App installation functionality
- Push notifications for news and events
- Cached resources for faster loading
- errors handling

### Dark/Light Mode
- Toggle between dark and light themes
- System preference detection
- Saved user preference in localStorage
- Smooth transition between themes
- interactive icons and font in use cases 
- errors handling
### Responsive Design
- Mobile-first approach
- Tablet optimizations
- Desktop enhancements
- Touch-friendly interactions for mobile devices


### Project Setup


```bash
# Create project directory and navigate into it
mkdir homagama-school && cd homagama-school

# Initialize npm project
npm init -y

# Install dependencies
npm install tailwindcss postcss autoprefixer gsap three alpine.js swiper typed.js mapbox-gl

# Initialize Tailwind CSS
npx tailwindcss init -p
```

2. Configure Tailwind CSS in `tailwind.config.js`:

```javascript
module.exports = {
  content: [
    './pages/**/*.{html,js}',
    './src/components/**/*.{html,js}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#10B981',
        accent: '#F59E0B',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      backdropFilter: {
        'none': 'none',
        'blur': 'blur(20px)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
```

### Code Examples

#### Glassmorphism Card Component

```html
<div class="relative p-6 bg-white/20 dark:bg-gray-900/20 backdrop-filter backdrop-blur-lg rounded-xl shadow-lg border border-white/10 dark:border-gray-700/30 transform hover:scale-105 transition-all duration-300">
  <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Academic Excellence</h3>
  <p class="text-gray-700 dark:text-gray-300">Providing quality education to generations of students since our establishment.</p>
</div>
```

#### GSAP Animation for Scroll Effects

```javascript
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Animate elements on scroll
function initScrollAnimations() {
  // Fade in animation for section titles
  gsap.utils.toArray('.section-title').forEach(title => {
    gsap.from(title, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: title,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });
  });

  // Staggered animation for cards
  gsap.utils.toArray('.card-container').forEach(container => {
    const cards = container.querySelectorAll('.card');
    
    gsap.from(cards, {
      y: 100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: container,
        start: 'top 75%',
        toggleActions: 'play none none reverse'
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', initScrollAnimations);
```

#### Three.js School Building Model

```javascript
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

function init3DModel() {
  // Create scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf0f9ff);
  
  // Create camera
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;
  
  // Create renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.getElementById('hero-model').appendChild(renderer.domElement);
  
  // Add controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  
  // Create school building (simplified model)
  const buildingGeometry = new THREE.BoxGeometry(2, 1, 1);
  const buildingMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x3B82F6,
    metalness: 0.2,
    roughness: 0.5
  });
  const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
  scene.add(building);
  
  // Add lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(1, 1, 1);
  scene.add(ambientLight, directionalLight);
  
  // Handle window resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
  
  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    building.rotation.y += 0.005;
    controls.update();
    renderer.render(scene, camera);
  }
  
  animate();
}

document.addEventListener('DOMContentLoaded', init3DModel);
```

#### Dark/Light Mode Toggle

```javascript
// Toggle function for dark/light mode
function setupThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Check for saved theme preference or use the system preference
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  
  // Toggle theme when button is clicked
  themeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    
    // Save preference
    if (document.documentElement.classList.contains('dark')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  });
}

document.addEventListener('DOMContentLoaded', setupThemeToggle);
```

#### Interactive Map with Mapbox

```javascript
import mapboxgl from 'mapbox-gl';

function initMap() {
  mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';
  
  const map = new mapboxgl.Map({
    container: 'school-map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [79.8612, 6.8500], // Approximate coordinates for Homagama
    zoom: 15
  });
  
  // Add school marker
  const marker = new mapboxgl.Marker({
    color: '#3B82F6'
  })
    .setLngLat([79.8612, 6.8500]) // Set precise school coordinates
    .setPopup(new mapboxgl.Popup().setHTML('<h3>Homagama Maha Vidyalaya</h3><p>Athurugiriya Road, Homagama</p>'))
    .addTo(map);
  
  // Add navigation controls
  map.addControl(new mapboxgl.NavigationControl());
  
  // Add fullscreen control
  map.addControl(new mapboxgl.FullscreenControl());
}

document.addEventListener('DOMContentLoaded', initMap);
```

#### Responsive Hamburger Menu

```javascript
function setupHamburgerMenu() {
  const hamburger = document.getElementById('hamburger-menu');
  const mobileMenu = document.getElementById('mobile-menu');
  
  hamburger.addEventListener('click', () => {
    // Toggle menu visibility
    mobileMenu.classList.toggle('hidden');
    
    // Animate hamburger icon
    hamburger.classList.toggle('open');
    
    // If menu is open, add event listener to close when clicking outside
    if (!mobileMenu.classList.contains('hidden')) {
      document.addEventListener('click', closeOnClickOutside);
    } else {
      document.removeEventListener('click', closeOnClickOutside);
    }
  });
  
  function closeOnClickOutside(event) {
    if (!mobileMenu.contains(event.target) && !hamburger.contains(event.target)) {
      mobileMenu.classList.add('hidden');
      hamburger.classList.remove('open');
      document.removeEventListener('click', closeOnClickOutside);
    }
  }
}

document.addEventListener('DOMContentLoaded', setupHamburgerMenu);
```

#### PWA Setup

```javascript
// In service-worker.js
const CACHE_NAME = 'homagama-school-v1';
const urlsToCache = [
  '/',
  '/home.html',
  '/about.html',
  '/gallery.html',
  '/news.html',
  '/contact.html',
  '/src/styles/main.css',
  '/src/js/main.js',
  // Add other important assets
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

// In main.js
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      })
      .catch(error => {
        console.log('ServiceWorker registration failed: ', error);
      });
  });
}
```

## Development Timeline

1. **Project Setup & Planning (1-2 days)**
   - Set up development environment
   - Finalize design elements and style guide
   - Create project structure

2. **Core Components Development (3-4 days)**
   - Build header and footer components
   - Develop navigation system
   - Implement dark/light mode toggle
   - Create reusable UI/UX components

3. **Home Page Implementation (2-3 days)**
   - Develop hero section with 3D model
   - Create animated sections
   - Implement latest news feed
   - Add interactive elements

4. **Secondary Pages Development (4-5 days)**
   - About page with timeline
   - Gallery with filtering system
   - News section with cards
   - Contact page with interactive map

5. **Advanced Features Integration (3-4 days)**
   - Implement GSAP animations
   - Add Three.js elements
   - Create custom loaders
   - Set up PWA functionality

6. **Testing & Optimization (2-3 days)**
   - Responsive testing across devices
   - Performance optimization
   - Accessibility checks
   - Browser compatibility testing

7. **Deployment & Documentation (1-2 days)**
   - Prepare for production
   - Deploy to hosting service
   - Create documentation
   - Final adjustments and bug fixes

## Resources

### Libraries & Documentation
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [GSAP Documentation](https://greensock.com/docs/)
- [Three.js Documentation](https://threejs.org/docs/)
- [Alpine.js Documentation](https://alpinejs.dev/start-here)
- [A-Frame Documentation](https://aframe.io/docs/)
- [Mapbox GL JS Documentation](https://docs.mapbox.com/mapbox-gl-js/)

### Assets & Tools
- [Unsplash](https://unsplash.com/) - Free high-quality images
- [Google Fonts](https://fonts.google.com/) - Web fonts
- [Font Awesome](https://fontawesome.com/) - Icons
- [Figma](https://www.figma.com/) - Design tool
- [Optimizilla](https://imagecompressor.com/) - Image compression

### Learning Resources
- [Tailwind CSS Crash Course](https://www.youtube.com/watch?v=UBOj6rqRUME)
- [Learn Three.js](https://www.youtube.com/playlist?list=PLRtjMdoYXLf6mvjCmrltvsD0j12ZQDMfE)
- [GSAP Animation Tutorial](https://www.youtube.com/watch?v=YqOhQWbouCE)
- [Building a PWA](https://web.dev/progressive-web-apps/)

---

*This documentation serves as a comprehensive guide for developing the Homagama Maha Vidyalaya website. Feel free to adapt and modify it based on your specific needs and requirements.*
// --- 1. Navbar Toggle for Mobile Menu ---
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

if (menuIcon) {
    menuIcon.onclick = () => {
        // Toggle Font Awesome class for the hamburger icon (bars to X)
        menuIcon.classList.toggle('fa-times');
        // Toggle CSS class to show/hide the navigation menu
        navbar.classList.toggle('active');
    };
}


// --- 2. Scroll-Based Animation (Intersection Observer) ---
// Selects all elements marked for scroll-based animation
const sectionsToAnimate = document.querySelectorAll('.animate-on-scroll');
const observerOptions = {
    root: null, // relative to the viewport
    threshold: 0.1, // Trigger when 10% of the element is visible
    rootMargin: "0px 0px -50px 0px" // Starts checking a bit before the viewport bottom
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show'); // Adds 'show' class to trigger CSS transition
            observer.unobserve(entry.target); // Stop observing to save performance
        }
    });
}, observerOptions);

// Attach the observer to all elements
sectionsToAnimate.forEach(section => {
    observer.observe(section);
});


// --- 3. Active Link State on Scroll ---
window.onscroll = () => {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(sec => {
        const top = window.scrollY;
        // Offset to adjust when the active class should change
        const offset = sec.offsetTop - 150; 
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            // Remove 'active' from all links and add it to the current section's link
            document.querySelectorAll('.navbar a').forEach(links => {
                links.classList.remove('active');
                document.querySelector('.navbar a[href*=' + id + ']').classList.add('active');
            });
        }
    });

    // Close the mobile menu automatically when scrolling
    if (menuIcon && navbar && navbar.classList.contains('active')) {
        menuIcon.classList.remove('fa-times');
        navbar.classList.remove('active');
    }
};
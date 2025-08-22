// Main JavaScript file
document.addEventListener('DOMContentLoaded', function() {
    console.log('Stariua Preparatory School Website Ready!');
    
    // Variables
    const mainNav = document.getElementById('main-nav');
    const menuToggle = document.querySelector('.menu-toggle');
    const backToTop = document.getElementById('backToTop');
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('#main-nav a');
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    const announcementSlider = document.querySelector('.announcement-slider');
    const announcements = document.querySelectorAll('.announcement');
    const contactForm = document.getElementById('contactForm');

    // Mobile Menu Toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-bars');
            this.querySelector('i').classList.toggle('fa-times');
        });
    }

    // Sticky Header
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Back to Top button visibility
        if (window.scrollY > 500) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    // Back to Top functionality
    if (backToTop) {
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#') && href !== '#') {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 70, // Adjust for header height
                        behavior: 'smooth'
                    });
                }
            }
            
            // Close mobile menu after clicking
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                menuToggle.querySelector('i').classList.add('fa-bars');
                menuToggle.querySelector('i').classList.remove('fa-times');
            }
            
            // Set active link
            navLinks.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Set active nav link based on scroll position
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Tab functionality for Campus Life section
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to current button and corresponding pane
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Testimonial Slider
    let currentSlide = 0;

    // Function to show a specific slide
    function showSlide(index) {
        // Hide all testimonials
        testimonials.forEach(testimonial => {
            testimonial.style.display = 'none';
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show the testimonial and activate dot at the given index
        testimonials[index].style.display = 'flex';
        dots[index].classList.add('active');
        currentSlide = index;
    }

    // Initialize the slider
    if (testimonials.length > 0) {
        showSlide(0);
    }

    // Event listeners for next and previous buttons
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentSlide = (currentSlide + 1) % testimonials.length;
            showSlide(currentSlide);
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length;
            showSlide(currentSlide);
        });
    }

    // Click event for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showSlide(index);
        });
    });

    // Auto slider for testimonials
    setInterval(function() {
        if (testimonials.length > 0) {
            currentSlide = (currentSlide + 1) % testimonials.length;
            showSlide(currentSlide);
        }
    }, 5000);

    // Announcement Slider
    let currentAnnouncement = 0;
    
    function showAnnouncement(index) {
        announcements.forEach(announcement => {
            announcement.style.display = 'none';
        });
        
        announcements[index].style.display = 'flex';
    }
    
    // Initialize announcement slider
    if (announcements.length > 0) {
        showAnnouncement(0);
        
        // Auto rotate announcements
        setInterval(function() {
            currentAnnouncement = (currentAnnouncement + 1) % announcements.length;
            showAnnouncement(currentAnnouncement);
        }, 4000);
    }

    // Form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const subjectSelect = document.getElementById('subject');
            const messageTextarea = document.getElementById('message');
            
            let isValid = true;
            
            if (nameInput.value.trim() === '') {
                isValid = false;
                nameInput.style.borderColor = 'red';
            } else {
                nameInput.style.borderColor = '';
            }
            
            if (emailInput.value.trim() === '' || !isValidEmail(emailInput.value)) {
                isValid = false;
                emailInput.style.borderColor = 'red';
            } else {
                emailInput.style.borderColor = '';
            }
            
            if (subjectSelect.value === '') {
                isValid = false;
                subjectSelect.style.borderColor = 'red';
            } else {
                subjectSelect.style.borderColor = '';
            }
            
            if (messageTextarea.value.trim() === '') {
                isValid = false;
                messageTextarea.style.borderColor = 'red';
            } else {
                messageTextarea.style.borderColor = '';
            }
            
            if (isValid) {
                // In a real-world scenario, this would submit the form data to a server
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            } else {
                alert('Please fill in all required fields correctly.');
            }
        });
    }

    // Email validation helper function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Counter animation for statistics
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateCounters() {
        statNumbers.forEach(statNumber => {
            const target = parseInt(statNumber.textContent);
            let count = 0;
            const duration = 2000; // 2 seconds
            const interval = duration / target;
            
            const counter = setInterval(() => {
                count++;
                statNumber.textContent = count;
                
                if (count === target) {
                    clearInterval(counter);
                }
            }, interval);
        });
    }
    
    // Trigger counter animation when about section is in view
    const aboutSection = document.querySelector('.about');
    
    if (aboutSection) {
        window.addEventListener('scroll', function() {
            const sectionTop = aboutSection.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight - 200 && !aboutSection.classList.contains('animated')) {
                animateCounters();
                aboutSection.classList.add('animated');
            }
        });
    }

    // Apply hover effect to program cards
    const programs = document.querySelectorAll('.program');
    
    programs.forEach(program => {
        program.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
        });
        
        program.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });

    // Add parallax effect to hero section
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            
            if (scrollPosition < window.innerHeight) {
                hero.style.backgroundPosition = `center ${scrollPosition * 0.4}px`;
            }
        });
    }

    // moving background pics
    // moving background pics
//     let slideIndex = 0;
// showSlides();

// function showSlides() {
//   let slides = document.querySelectorAll(".slides");
//   for (let i = 0; i < slides.length; i++) {
//     slides[i].style.display = "none";
//   }
//   slideIndex++;
//   if (slideIndex > slides.length) { slideIndex = 1 }
//   slides[slideIndex - 1].style.display = "block";
//   setTimeout(showSlides, 4000); // change every 4 seconds
// }

    // moving background pics
    // moving background pics


});
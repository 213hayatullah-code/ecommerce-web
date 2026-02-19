// Scroll to top on page load/refresh - always force top position
window.addEventListener('load', () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    history.scrollRestoration = 'manual';
});

// ================================
// Service Card Expand/Collapse (Individual)
// ================================
const serviceExpandBtns = document.querySelectorAll('.service-expand-btn');
serviceExpandBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();

        // Get the parent card and its expandable section
        const card = btn.closest('.service-card');
        const targetId = btn.getAttribute('data-target');
        const expandable = document.getElementById(targetId);

        if (!expandable || !card) return;

        // Check current state
        const isCurrentlyExpanded = expandable.classList.contains('expanded');

        // Close all other expanded cards first (accordion behavior)
        document.querySelectorAll('.service-expandable.expanded').forEach(section => {
            if (section.id !== targetId) {
                section.classList.remove('expanded');
                const otherBtn = document.querySelector(`[data-target="${section.id}"]`);
                if (otherBtn) {
                    otherBtn.classList.remove('active');
                    const otherText = otherBtn.querySelector('.expand-text');
                    if (otherText) otherText.textContent = 'View More';
                }
            }
        });

        // Toggle current card
        if (isCurrentlyExpanded) {
            expandable.classList.remove('expanded');
            btn.classList.remove('active');
            btn.querySelector('.expand-text').textContent = 'View More';
        } else {
            expandable.classList.add('expanded');
            btn.classList.add('active');
            btn.querySelector('.expand-text').textContent = 'View Less';
        }
    });
});

// ================================
// Service Card Content Toggle (Features/Tools Switch)
// ================================
const serviceToggleBtns = document.querySelectorAll('.service-toggle-btn');
serviceToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const card = btn.closest('.service-card');
        const targetView = btn.getAttribute('data-view');

        if (!card) return;

        // Update active button state
        card.querySelectorAll('.service-toggle-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Toggle content visibility
        const featuresSection = card.querySelector('.service-features');
        const toolsSection = card.querySelector('.service-tools-primary');

        if (targetView === 'features') {
            if (featuresSection) featuresSection.classList.add('visible');
            if (toolsSection) toolsSection.classList.remove('visible');
        } else if (targetView === 'tools') {
            if (featuresSection) featuresSection.classList.remove('visible');
            if (toolsSection) toolsSection.classList.add('visible');
        }
    });
});

// ================================
// Ramadan Banner Functionality
// ================================
const ramadanBanner = document.getElementById('ramadanBanner');
const closeRamadanBanner = document.getElementById('closeRamadanBanner');

// Dismiss banner temporarily (reappears on page reload/revisit)
if (closeRamadanBanner && ramadanBanner) {
    closeRamadanBanner.addEventListener('click', () => {
        ramadanBanner.classList.add('hidden');
    });
}

// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Handle dropdown menu on mobile
const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach(dropdown => {
    const dropdownLink = dropdown.querySelector('.nav-link');
    if (dropdownLink) {
        dropdownLink.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    }
});

// Close menu when a link is clicked
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Only close menu if not a dropdown link in mobile view
        if (!link.parentElement.classList.contains('dropdown') || window.innerWidth > 768) {
            navMenu.classList.remove('active');
            if (hamburger) {
                hamburger.classList.remove('active');
            }
        }
    });
});

// Close dropdown menu when a dropdown item is clicked
const dropdownItems = document.querySelectorAll('.dropdown-menu li a');
dropdownItems.forEach(item => {
    item.addEventListener('click', () => {
        navMenu.classList.remove('active');
        dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
        if (hamburger) {
            hamburger.classList.remove('active');
        }
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Active navbar link based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Hero form submission
const heroForm = document.querySelector('#heroForm');
if (heroForm) {
    heroForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('heroName').value;
        const email = document.getElementById('heroEmail').value;
        const service = document.getElementById('heroService').value;

        // Simple validation
        if (name && email) {
            // Here you would typically send the form data to a server
            alert(`Thank you ${name}! We've received your inquiry. We'll be in touch soon.`);
            heroForm.reset();
        } else {
            alert('Please fill in all required fields.');
        }
    });
}

// Contact form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Simple validation
        if (name && email) {
            // Here you would typically send the form data to a server
            alert(`Thank you ${name}! Your message has been sent.`);
            contactForm.reset();
        } else {
            alert('Please fill in all required fields.');
        }
    });
}

// Ultra Fast Services interactive handlers
const ultraFastTrigger = document.getElementById('ultraFastTrigger');
const ultraFastWrap = document.getElementById('ultraFastFormWrap');
const ultraFastSelectField = document.getElementById('ultraServiceSelect');
const ultraFastOptions = document.querySelectorAll('.ultra-fast-dropdown button');
const ultraFastForm = document.getElementById('ultraFastForm');

const revealUltraFastForm = () => {
    if (!ultraFastWrap) return;
    ultraFastWrap.classList.remove('is-hidden');
    ultraFastWrap.classList.add('is-visible');
    ultraFastWrap.setAttribute('aria-hidden', 'false');
    if (ultraFastTrigger) {
        ultraFastTrigger.setAttribute('aria-expanded', 'true');
    }
    ultraFastWrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

if (ultraFastTrigger) {
    ultraFastTrigger.addEventListener('click', (event) => {
        event.preventDefault();
        revealUltraFastForm();
    });
}

if (ultraFastOptions && ultraFastSelectField) {
    ultraFastOptions.forEach(option => {
        option.addEventListener('click', () => {
            ultraFastSelectField.value = option.dataset.service;
            ultraFastSelectField.dispatchEvent(new Event('change', { bubbles: true }));
        });
    });
}

if (ultraFastForm) {
    ultraFastForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('ultraName').value;
        const email = document.getElementById('ultraEmail').value;
        const service = document.getElementById('ultraServiceSelect').value;

        if (name && email && service) {
            alert(`Thanks ${name}! We'll reach out soon about ${service.replace('-', ' ')}.`);
            ultraFastForm.reset();
        } else {
            alert('Please complete the required fields in the ultra fast services form.');
        }
    });
}

// Scroll animation for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and items for animation
document.querySelectorAll('.service-card, .project-card, .blog-card, .testimonial-card, .value-item, .skill-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Portfolio project accordion toggles
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    const panels = card.querySelectorAll('.project-panel');
    const buttons = card.querySelectorAll('.project-btn');

    const showPanel = (panelName, activeButton) => {
        panels.forEach(panel => {
            panel.classList.toggle('active', panel.dataset.panel === panelName);
        });
        buttons.forEach(btn => btn.classList.toggle('active', btn === activeButton));
    };

    const attachProjectHandlers = (btn) => {
        const show = () => {
            const targetPanel = btn.dataset.action;
            showPanel(targetPanel, btn);
        };
        btn.addEventListener('mouseenter', show);
        btn.addEventListener('focus', show);
        btn.addEventListener('click', show);
    };

    buttons.forEach(btn => attachProjectHandlers(btn));

    const initialPanel = card.querySelector('.project-panel.active');
    const initialButton = initialPanel ? card.querySelector(`.project-btn[data-action="${initialPanel.dataset.panel}"]`) : buttons[0];
    if (initialButton) {
        initialButton.classList.add('active');
        showPanel(initialButton.dataset.action, initialButton);
    }
});

// Service Card Ultra Form panels
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    const panels = card.querySelectorAll('.service-panel');
    const buttons = card.querySelectorAll('.service-btn');

    const activatePanel = (panelName, triggerButton) => {
        panels.forEach(panel => {
            panel.classList.toggle('active', panel.dataset.panel === panelName);
        });
        buttons.forEach(btn => btn.classList.toggle('active', btn === triggerButton));
    };

    const attachHandlers = (button) => {
        const show = () => activatePanel(button.dataset.panel, button);
        button.addEventListener('mouseenter', show);
        button.addEventListener('focus', show);
        button.addEventListener('click', show);
    };

    buttons.forEach(btn => attachHandlers(btn));

    const initialPanel = card.querySelector('.service-panel.active') || panels[0];
    if (initialPanel) {
        const panelName = initialPanel.dataset.panel;
        const initialButton = card.querySelector(`.service-btn[data-panel="${panelName}"]`) || buttons[0];
        if (initialButton) {
            activatePanel(panelName, initialButton);
        }
    }
});

// Contact Overlay Functionality
const contactOverlay = document.getElementById('contactOverlay');
const openOverlayBtn = document.getElementById('openContactOverlay');
const closeOverlayBtn = document.getElementById('closeContactOverlay');
const closeOverlayBackdrop = document.getElementById('closeOverlayBackdrop');

function openContactOverlay() {
    if (contactOverlay) {
        contactOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeContactOverlay() {
    if (contactOverlay) {
        contactOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

if (openOverlayBtn) {
    openOverlayBtn.addEventListener('click', openContactOverlay);
}

if (closeOverlayBtn) {
    closeOverlayBtn.addEventListener('click', closeContactOverlay);
}

if (closeOverlayBackdrop) {
    closeOverlayBackdrop.addEventListener('click', closeContactOverlay);
}

// Close overlay on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && contactOverlay && contactOverlay.classList.contains('active')) {
        closeContactOverlay();
    }
});

// Portfolio CTA button to open contact overlay
const openContactFromPortfolio = document.getElementById('openContactFromPortfolio');
if (openContactFromPortfolio) {
    openContactFromPortfolio.addEventListener('click', openContactOverlay);
}

// ============================================
// DISCOUNT MODAL FUNCTIONALITY
// ============================================
const discountModal = document.getElementById('discountModal');
const openDiscountModalBtn = document.getElementById('openDiscountModal');
const closeDiscountModalBtn = document.getElementById('closeDiscountModal');
const closeDiscountBackdrop = document.getElementById('closeDiscountBackdrop');

function openDiscountModal() {
    if (discountModal) {
        discountModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeDiscountModal() {
    if (discountModal) {
        discountModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

if (openDiscountModalBtn) {
    openDiscountModalBtn.addEventListener('click', openDiscountModal);
}

if (closeDiscountModalBtn) {
    closeDiscountModalBtn.addEventListener('click', closeDiscountModal);
}

if (closeDiscountBackdrop) {
    closeDiscountBackdrop.addEventListener('click', closeDiscountModal);
}

// Discount form submission
const discountForm = document.getElementById('discountForm');
if (discountForm) {
    discountForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Show success message and close
        const submitBtn = discountForm.querySelector('.btn-discount-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Discount Claimed!';
        submitBtn.style.background = '#43a047';

        setTimeout(() => {
            closeDiscountModal();
            discountForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
        }, 2000);
    });
}

// ============================================
// CHAT WIDGET FUNCTIONALITY
// ============================================
const chatWidget = document.getElementById('chatWidget');
const openChatWidgetBtn = document.getElementById('openChatWidget');
const openChatFromNavBtn = document.getElementById('openChatFromNav');
const openChatFromAboutBtn = document.getElementById('openChatFromAbout');
const closeChatWidgetBtn = document.getElementById('closeChatWidget');

function openChatWidget() {
    if (chatWidget) {
        chatWidget.classList.add('active');
    }
}

function closeChatWidget() {
    if (chatWidget) {
        chatWidget.classList.remove('active');
    }
}

if (openChatWidgetBtn) {
    openChatWidgetBtn.addEventListener('click', openChatWidget);
}

if (openChatFromNavBtn) {
    openChatFromNavBtn.addEventListener('click', openChatWidget);
}

if (openChatFromAboutBtn) {
    openChatFromAboutBtn.addEventListener('click', openChatWidget);
}

if (closeChatWidgetBtn) {
    closeChatWidgetBtn.addEventListener('click', closeChatWidget);
}

// Chat form submission
const chatForm = document.getElementById('chatForm');
if (chatForm) {
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const messageInput = document.getElementById('chatMessage');
        const message = messageInput.value.trim();

        if (message) {
            // Add user message to chat
            const chatBody = document.querySelector('.chat-widget-body');
            const userBubble = document.createElement('div');
            userBubble.className = 'chat-bubble chat-bubble-sent';
            userBubble.style.cssText = 'background: linear-gradient(135deg, #2e7d32, #4caf50); color: white; margin-left: auto; border-bottom-right-radius: 4px;';
            userBubble.innerHTML = `<p>${message}</p><span class="chat-time" style="color: rgba(255,255,255,0.8);">Just now</span>`;
            chatBody.appendChild(userBubble);
            chatBody.scrollTop = chatBody.scrollHeight;

            messageInput.value = '';

            // Auto-reply after a short delay
            setTimeout(() => {
                const replyBubble = document.createElement('div');
                replyBubble.className = 'chat-bubble chat-bubble-received';
                replyBubble.innerHTML = `<p>Thanks for your message! I'll get back to you via email shortly. 📧</p><span class="chat-time">Just now</span>`;
                chatBody.appendChild(replyBubble);
                chatBody.scrollTop = chatBody.scrollHeight;
            }, 1000);
        }
    });
}

// Close discount modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (discountModal && discountModal.classList.contains('active')) {
            closeDiscountModal();
        }
        if (chatWidget && chatWidget.classList.contains('active')) {
            closeChatWidget();
        }
    }
});

// ============================================
// PORTFOLIO FILTER - ENHANCED PROFESSIONAL
// ============================================
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');
const portfolioGrid = document.querySelector('.portfolio-grid');
let isAnimating = false;

// Filter function with smooth animations
function filterPortfolio(filterValue) {
    if (isAnimating) return;
    isAnimating = true;

    // Get cards that should be visible
    const visibleCards = [];
    const hiddenCards = [];

    portfolioCards.forEach(card => {
        if (filterValue === 'all' || card.dataset.category === filterValue) {
            visibleCards.push(card);
        } else {
            hiddenCards.push(card);
        }
    });

    // Hide cards that don't match (with animation)
    hiddenCards.forEach((card, index) => {
        if (!card.classList.contains('hidden')) {
            card.classList.add('card-hide');
            card.classList.remove('card-show');
            setTimeout(() => {
                card.classList.add('hidden');
                card.classList.remove('card-hide');
            }, 300);
        }
    });

    // Show matching cards with staggered animation
    setTimeout(() => {
        visibleCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.remove('hidden', 'card-hide');
                card.classList.add('card-show');
                // Remove animation class after it completes
                setTimeout(() => {
                    card.classList.remove('card-show');
                }, 500);
            }, index * 80); // Stagger each card by 80ms
        });

        // Reset animating flag after all cards are shown
        setTimeout(() => {
            isAnimating = false;
        }, visibleCards.length * 80 + 500);
    }, hiddenCards.length > 0 ? 300 : 0);
}

// Add click and touch event listeners to filter buttons
filterButtons.forEach(button => {
    // Click event
    button.addEventListener('click', (e) => {
        e.preventDefault();

        // Update active state
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filterValue = button.dataset.filter;
        filterPortfolio(filterValue);
    });

    // Touch feedback for mobile
    button.addEventListener('touchstart', () => {
        button.style.transform = 'scale(0.95)';
    }, { passive: true });

    button.addEventListener('touchend', () => {
        button.style.transform = '';
    }, { passive: true });
});

// Optional: Add keyboard navigation for accessibility
filterButtons.forEach((button, index) => {
    button.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' && index < filterButtons.length - 1) {
            filterButtons[index + 1].focus();
        } else if (e.key === 'ArrowLeft' && index > 0) {
            filterButtons[index - 1].focus();
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // --- Icon Setup ---
    if (typeof lucide === 'undefined') {
        console.error("Lucide icons library not loaded.");
        // Provide simple text fallbacks if lucide fails
        document.getElementById('theme-icon-container').textContent = 'T';
        document.getElementById('mobile-menu-icon-container').textContent = 'M';
        // Add fallbacks for other icons if needed
    } else {
         lucide.createIcons(); // Initialize all icons marked with data-lucide
    }

    // --- Theme Toggle ---
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const themeIconContainer = document.getElementById('theme-icon-container');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');

    function setTheme(isDark) {
        const iconName = isDark ? 'sun' : 'moon';
        if (themeIconContainer) {
            themeIconContainer.innerHTML = `<i data-lucide="${iconName}" class="w-full h-full"></i>`;
            if (typeof lucide !== 'undefined') {
                lucide.createIcons(); // Re-render icons after changing
            } else {
                themeIconContainer.textContent = isDark ? 'L' : 'D'; // Text fallback
            }
        }

        if (isDark) {
            htmlElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            htmlElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }

    // Initialize theme
    const initialDark = savedTheme ? savedTheme === 'dark' : true; // Default to dark if no preference
    setTheme(initialDark); // Set initial theme and icon

    themeToggle.addEventListener('click', () => {
        setTheme(!htmlElement.classList.contains('dark'));
    });

    // --- Mobile Menu ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuIconContainer = document.getElementById('mobile-menu-icon-container');
    let isMenuOpen = false;

    function toggleMobileMenu() {
        isMenuOpen = !isMenuOpen;
        mobileMenu.classList.toggle('hidden');
        const iconName = isMenuOpen ? 'x' : 'menu';
         if (mobileMenuIconContainer) {
            mobileMenuIconContainer.innerHTML = `<i data-lucide="${iconName}" class="w-full h-full"></i>`;
            if (typeof lucide !== 'undefined') {
                lucide.createIcons(); // Re-render icons
            } else {
                 mobileMenuIconContainer.textContent = isMenuOpen ? 'X' : 'M'; // Fallback
            }
        }
    }
    mobileMenuButton.addEventListener('click', toggleMobileMenu);
    // Close menu when a link is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) toggleMobileMenu();
        });
    });
    // Set initial mobile menu icon
    if (mobileMenuIconContainer) {
         mobileMenuIconContainer.innerHTML = `<i data-lucide="menu" class="w-full h-full"></i>`;
         if (typeof lucide !== 'undefined') lucide.createIcons();
         else mobileMenuIconContainer.textContent = 'M';
    }


    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        // Apply effect based on scroll position, not theme
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-lg');
            navbar.classList.remove('bg-transparent'); // Remove transparency class
            navbar.classList.add('dark-mode-nav'); // Add the themed background/blur class
        } else {
            navbar.classList.remove('shadow-lg');
            navbar.classList.add('bg-transparent'); // Add back transparency class
            navbar.classList.remove('dark-mode-nav'); // Remove themed background/blur
        }
    });


    // --- Mouse Follower ---
    const follower = document.querySelector('.mouse-follower');
    const dot = document.querySelector('.mouse-follower-dot');
    let lastMouseX = 0;
    let lastMouseY = 0;
    let rafPending = false; // Flag to prevent multiple RAF calls

    function updateFollowerPosition() {
         if (!rafPending) {
             rafPending = true;
             requestAnimationFrame(() => {
                 // Keep follower centered on cursor
                 follower.style.transform = `translate(${lastMouseX}px, ${lastMouseY}px)`;
                 dot.style.transform = `translate(${lastMouseX}px, ${lastMouseY}px)`;
                 rafPending = false;
             });
         }
    }

    if (follower && dot && window.matchMedia("(pointer: fine)").matches) { // Check for fine pointer (mouse)
        window.addEventListener('mousemove', (e) => {
            lastMouseX = e.clientX;
            lastMouseY = e.clientY;
            updateFollowerPosition(); // Update position on move
        });

        document.querySelectorAll('a, button, input, textarea, [role="button"]').forEach(el => {
            el.addEventListener('mouseenter', () => {
                 requestAnimationFrame(() => {
                     // Apply scale based on current translated position
                     follower.style.transform = `translate(${lastMouseX}px, ${lastMouseY}px) scale(1.5)`;
                     follower.style.opacity = '0.8';
                 });
            });
            el.addEventListener('mouseleave', () => {
                 requestAnimationFrame(() => {
                     // Apply scale based on current translated position
                     follower.style.transform = `translate(${lastMouseX}px, ${lastMouseY}px) scale(1)`;
                     follower.style.opacity = '0.5';
                 });
            });
        });
    } else if (follower && dot) {
        // Hide if not a fine pointer device
         follower.style.display = 'none';
         dot.style.display = 'none';
    }


    // --- Scroll Animations ---
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Optional: Stop observing once visible
            }
            // No need to remove 'visible' if you want it to stay revealed
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    revealElements.forEach(el => {
        observer.observe(el);
    });


    // --- Contact Form (Mailto) ---
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');

        const name = nameInput.value;
        const email = emailInput.value;
        const message = messageInput.value;


        const subject = encodeURIComponent(`Message from ${name} via Portfolio`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

        const mailtoLink = `mailto:raveen.s.abeydeera@gmail.com?subject=${subject}&body=${body}`;

        // Try to open mail client
         try {
             // Using document.execCommand('copy') as a fallback for clipboard access
             const tempInput = document.createElement('textarea'); // Use textarea for multiline body
             // Make it non-visible
             tempInput.style.position = 'fixed'; // Use fixed to ensure it's offscreen reliably
             tempInput.style.top = '-9999px';
             tempInput.style.left = '-9999px';
             tempInput.value = `Subject: ${decodeURIComponent(subject)}\n\n${decodeURIComponent(body)}`; // More reliable format for copy
             document.body.appendChild(tempInput);
             tempInput.select();
             tempInput.setSelectionRange(0, 99999); // For mobile devices

             let copied = false;
             try {
                // Use execCommand for broader compatibility
                copied = document.execCommand('copy');
             } catch(err) {
                console.warn('execCommand copy failed:', err);
             }
             document.body.removeChild(tempInput);


             // Attempt to open mailto link regardless
             window.location.href = mailtoLink;

             if (copied) {
                formMessage.textContent = 'Mail details copied to clipboard. Your email client should open shortly.';
             } else {
                 formMessage.textContent = 'Attempting to open your email client... If it doesn\'t open, please email me directly.';
                 console.warn('Clipboard copy failed. Relying solely on mailto link.');
             }
             formMessage.classList.remove('text-red-500'); // Use Tailwind classes
             formMessage.classList.add('text-green-500'); // Use Tailwind classes

            // Reset form after successful submission attempt
            contactForm.reset(); // Clear the form fields
         } catch (e) {
             console.error("Could not open mail client:", e);
             formMessage.textContent = 'Could not open email client automatically. Please copy the details or email directly.';
             formMessage.classList.add('text-red-500'); // Use Tailwind classes
             formMessage.classList.remove('text-green-500'); // Use Tailwind classes
        }


        setTimeout(() => { formMessage.textContent = ''; }, 7000); // Increased timeout
    });

    // --- AI Assistant ---
    const chatWindow = document.getElementById('chat-window');
    const chatInput = document.getElementById('chat-input');
    const sendButton = document.getElementById('send-button');
    const loadingIndicator = document.getElementById('loading-indicator');
    const aiError = document.getElementById('ai-error');
    const apiKey = "AIzaSyAi3C6fy4zQUMD_wwrPuu9cFmjlDrdJzws"; // Leave empty - handled by environment

    function addChatMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('flex', sender === 'user' ? 'justify-end' : 'justify-start', 'mb-3'); // Added margin-bottom
        const bubbleDiv = document.createElement('div');
        bubbleDiv.classList.add('chat-bubble', sender === 'user' ? 'chat-bubble-user' : 'chat-bubble-bot', 'p-3', 'rounded-lg', 'shadow-md'); // Added shadow
        const textP = document.createElement('p');
        textP.classList.add('text-sm');
        textP.textContent = message;
        bubbleDiv.appendChild(textP);
        messageDiv.appendChild(bubbleDiv);
        chatWindow.appendChild(messageDiv);
        // Ensure scroll happens after the element is added
        requestAnimationFrame(() => {
            chatWindow.scrollTop = chatWindow.scrollHeight;
        });
    }

    function setLoading(isLoading) {
        loadingIndicator.classList.toggle('hidden', !isLoading);
         if (isLoading) {
            // Temporarily disable input while loading
            chatInput.disabled = true;
            sendButton.disabled = true;
             requestAnimationFrame(() => {
                 chatWindow.scrollTop = chatWindow.scrollHeight;
             });
         } else {
             chatInput.disabled = false;
             sendButton.disabled = false;
             chatInput.focus(); // Re-focus input after response
         }
    }


    function showAiError(message) {
        aiError.textContent = message || "An error occurred fetching the AI response.";
        aiError.classList.remove('hidden');
        // Auto-hide error after some time
        setTimeout(() => hideAiError(), 6000);
    }
    function hideAiError() {
        aiError.textContent = ''; // Clear text
        aiError.classList.add('hidden');
    }

    async function fetchWithBackoff(url, options, retries = 3, delay = 1000) {
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                const errorBody = await response.text(); // Try to get error details
                console.error(`API Error Response (${response.status}):`, errorBody);
                // Don't retry on client errors (4xx) unless it's 429 (Rate Limit)
                if (response.status >= 400 && response.status < 500 && response.status !== 429) {
                   throw new Error(`Client error: ${response.status}. ${errorBody.substring(0, 100)}`); // Include snippet of error
                }
                if (retries > 0) {
                     await new Promise(resolve => setTimeout(resolve, delay));
                     return fetchWithBackoff(url, options, retries - 1, delay * 2);
                 }
                throw new Error(`HTTP error: ${response.status}. ${errorBody.substring(0, 100)}`);
            }
             // Check for empty response body before parsing JSON
             const contentType = response.headers.get("content-type");
             if (contentType && contentType.includes("application/json")) { // More robust check
                 const contentLength = response.headers.get("content-length");
                 if (contentLength === "0") {
                     console.warn('Received empty JSON response from AI.');
                     return null; // Return null for empty JSON
                 }
                 try {
                     return await response.json();
                 } catch (e) {
                    console.error('Failed to parse JSON response:', e);
                    throw new Error('Failed to parse AI response.');
                 }
             } else {
                 const textResponse = await response.text();
                 console.warn("Received non-JSON response:", textResponse);
                 throw new Error('Unexpected response format from AI.');
             }
        } catch (error) {
             // Only retry network errors or specific server errors (like 503), not client errors
             const shouldRetry = retries > 0 &&
                                !(error.message.startsWith('Client error:')) &&
                                !error.message.startsWith('HTTP error: 4') && // Exclude 4xx except 429 handled above
                                 error.message !== 'Failed to parse AI response.' && // Don't retry parsing errors
                                 error.message !== 'Unexpected response format from AI.';

            if (shouldRetry) {
                await new Promise(resolve => setTimeout(resolve, delay));
                return fetchWithBackoff(url, options, retries - 1, delay * 2);
            } else {
                console.error("Fetch failed definitively:", error);
                throw error; // Re-throw the final error
            }
        }
    }


    async function getAiResponse(userInput) {
        setLoading(true);
        hideAiError(); // Clear previous errors

        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
        // System prompt (ensure it's updated with current info)
        const systemPrompt = `You are a friendly and professional AI assistant for Raveen Abeydeera's portfolio website. Your goal is to provide concise and accurate information about Raveen based ONLY on the following details:
        - Name: Raveen Abeydeera
        - Current Role: Student
        - Program: Higher Diploma in Software Engineering
        - Institution: ICBT Campus
        - Start Date: May 25th, 2024 (Part-Time)
        - Email: raveen.s.abeydeera@gmail.com
        - Key Projects: Pet Shop Management System, Greenlife Wellness (Web App), LuxeVisa Resort (Mobile App).
        - Technologies/Skills: Vue.js, JavaScript, HTML, CSS, Tailwind CSS (for this portfolio).
        - Portfolio Features: Responsive Design, Modern UI/UX, Background Animation, Scroll Animation, Mouse Animation, Scroll Effects, Dark Mode, Direct Email, Live AI Assistant (you!).

        When asked about...
        - Education: Mention the Higher Diploma at ICBT Campus, start date, and part-time status.
        - Projects: List the names of the three projects. Briefly describe one if asked specifically (e.g., "Pet Shop Management System is for inventory, sales, and customer data"). Don't invent details.
        - Skills/Technologies: List the technologies mentioned (Vue.js, JS, HTML, CSS, Tailwind).
        - Contact: Provide the email address (raveen.s.abeydeera@gmail.com) and suggest using the contact form on the site.
        - Portfolio features: Briefly explain the feature asked about (e.g., "Dark mode allows switching between light and dark themes.").
        - General greetings (hi, hello): Respond politely and state your purpose.
        - Anything else: Politely state that you only have information about Raveen's education, projects, skills, and contact details as listed above. Do not answer unrelated questions, provide opinions, write code, or engage in philosophical discussions.

        Keep your answers very brief (1-2 sentences ideally, max 3), friendly, and professional. Use bullet points *only* when listing multiple items like projects or skills.`;


         const payload = {
             contents: [{ parts: [{ text: userInput }] }],
             systemInstruction: {
                 parts: [{ text: systemPrompt }]
            },
             generationConfig: { // Optional: Adjust generation parameters if needed
                 // temperature: 0.7,
                  maxOutputTokens: 150, // Keep responses concise
                 // stopSequences: ["\n\n"], // Example: Stop after a double newline
                  // topK: 40,
                  // topP: 0.95,
            },
             safetySettings: [ // Example: Adjust safety settings if needed
                { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
                { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
                { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
                { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" }
             ]
        };


        try {
            const result = await fetchWithBackoff(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            // Handle potentially null result (e.g., empty JSON response after retries)
            if (!result) {
                 throw new Error('Received empty response from AI after retries.');
            }


            const candidate = result?.candidates?.[0];

            // Check finishReason first - MORE SPECIFIC HANDLING
            if (candidate?.finishReason && candidate.finishReason !== 'STOP') {
                 let safetyMessage = "My response generation stopped unexpectedly.";
                 switch (candidate.finishReason) {
                    case 'MAX_TOKENS':
                        safetyMessage = "My response was cut short. Could you ask a more specific question?";
                        break;
                    case 'SAFETY':
                        safetyMessage = "The response couldn't be provided due to safety content filters.";
                        break;
                     case 'RECITATION':
                         safetyMessage = "The response was blocked as it might contain sensitive source material.";
                         break;
                     case 'OTHER':
                         safetyMessage = "An unknown issue occurred during response generation.";
                         break;
                     default: // Covers unspecified or new reasons
                         safetyMessage = `Response generation stopped: ${candidate.finishReason}.`;
                 }
                addChatMessage(safetyMessage, 'bot');
                console.warn(`AI response stopped due to: ${candidate.finishReason}`);
                setLoading(false); // Make sure loading stops
                return;
            }


            if (candidate?.content?.parts?.[0]?.text) {
                addChatMessage(candidate.content.parts[0].text.trim(), 'bot'); // Trim whitespace
            } else {
                 console.error('Invalid or empty response structure received:', result);
                 throw new Error('Received an unexpected or empty response content from the AI.');
            }
             setLoading(false); // Ensure loading stops on success too
        } catch (error) {
            // setLoading(false) should already be called by the time we get here if fetchWithBackoff failed
            console.error('Error in getAiResponse:', error);
            let displayError = "Sorry, I encountered an issue. Please try again later.";

             // Refine error messages based on error type/content
             if (error.message.includes("API key not valid")) {
                 displayError = "AI Assistant Error: Invalid configuration. Please contact the site owner.";
             } else if (error.message.includes("Client error: 400")) {
                  displayError = "Sorry, I couldn't understand that request. Could you rephrase it?";
             } else if (error.message.includes("Client error: 429")) {
                  displayError = "Sorry, I'm a bit busy right now. Please try again in a moment.";
              } else if (error.message.includes("HTTP error: 5")) { // 5xx errors
                  displayError = "Sorry, the AI service is temporarily unavailable. Please try again later.";
              } else if (error.message.includes("empty response") || error.message.includes("Invalid response structure") || error.message.includes("Unexpected response format") || error.message.includes("Failed to parse")) {
                  displayError = "Sorry, I received an unusual response. Please try asking differently.";
              } else if (error.message.includes("Failed to fetch") || error instanceof TypeError) { // Network errors
                  displayError = "Sorry, I couldn't connect to the AI service. Please check your network.";
              } else if (error.message.startsWith("Client error:") || error.message.startsWith("HTTP error:")) {
                   // Catch other specific HTTP errors if needed
                   displayError = `Sorry, an unexpected error occurred (${error.message.split('.')[0]}).`;
              }


             addChatMessage(displayError, 'bot');
            showAiError(displayError); // Show user-friendly error in the dedicated spot
        } finally {
            // Ensure loading is always stopped, even if an unexpected error bypasses other stops
            setLoading(false);
        }
    }

    function handleSend() {
        const userInput = chatInput.value.trim();
        // Check if already loading to prevent multiple requests
        if (!userInput || sendButton.disabled) { // Also check button disabled state
             return;
        }
        addChatMessage(userInput, 'user');
        chatInput.value = '';
        hideAiError(); // Clear previous errors before sending new message
        getAiResponse(userInput);
    }


    sendButton.addEventListener('click', handleSend);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            // Prevent default form submission if inside a form
            e.preventDefault();
            handleSend();
        }
    });


    // --- Call createIcons after initial setup ---
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Add onerror handlers to placeholder images
    document.querySelectorAll('img[src^="https://placehold.co"]').forEach(img => {
        if (!img.onerror) { // Add only if not already present
            img.onerror = function() {
                this.onerror = null; // Prevent infinite loop if fallback also fails
                this.src = 'https://placehold.co/600x400/cccccc/45474B?text=Image+Not+Found'; // Updated placeholder color
                console.warn(`Failed to load image: ${img.src}, showing fallback.`);
            };
        }
    });

}); // End DOMContentLoaded


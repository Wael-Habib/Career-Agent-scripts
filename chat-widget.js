// Enhanced Career Chat Widget Script - v3 Clean FAQ
(function() {
    const styles = `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        .n8n-chat-widget {
            --chat--color-primary: var(--n8n-chat-primary-color, #FDE047);
            --chat--color-secondary: var(--n8n-chat-secondary-color, #FBBF24);
            --chat--color-background: #ffffff;
            --chat--color-surface: #F9FAFB;
            --chat--color-font: #111827;
            --chat--color-muted: #6B7280;
            --chat--color-border: #E5E7EB;
            --chat--shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
            --chat--shadow-md: 0 4px 12px rgba(0,0,0,0.1);
            --chat--shadow-lg: 0 12px 40px rgba(0,0,0,0.15);
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }

        @keyframes slideUp {
            from { opacity: 0; transform: translateY(16px); }
            to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideInRight {
            from { opacity: 0; transform: translateX(12px); }
            to { opacity: 1; transform: translateX(0); }
        }

        @keyframes slideInLeft {
            from { opacity: 0; transform: translateX(-12px); }
            to { opacity: 1; transform: translateX(0); }
        }

        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-4px); }
        }

        @keyframes dotPulse {
            0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
            40% { transform: scale(1); opacity: 1; }
        }

        .n8n-chat-widget .chat-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.4);
            backdrop-filter: blur(4px);
            -webkit-backdrop-filter: blur(4px);
            z-index: 9998;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }

        .n8n-chat-widget .chat-overlay.visible {
            opacity: 1;
            visibility: visible;
        }

        .n8n-chat-widget .chat-container {
            position: fixed;
            bottom: 100px;
            right: 24px;
            z-index: 9999;
            display: none;
            flex-direction: column;
            width: 420px;
            max-width: calc(100vw - 48px);
            height: 640px;
            max-height: calc(100vh - 140px);
            background: var(--chat--color-background);
            border-radius: 20px;
            box-shadow: var(--chat--shadow-lg), 0 0 0 1px var(--chat--color-border);
            overflow: hidden;
        }

        .n8n-chat-widget .chat-container.position-left {
            right: auto;
            left: 24px;
        }

        .n8n-chat-widget .chat-container.open {
            display: flex;
            animation: slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .n8n-chat-widget .chat-header {
            position: relative;
            display: flex;
            flex-direction: column;
            flex-shrink: 0;
            overflow: hidden;
        }

        .n8n-chat-widget .header-bg {
            position: absolute;
            inset: 0;
            background-image: var(--header-bg-image, linear-gradient(135deg, #667eea 0%, #764ba2 100%));
            background-size: cover;
            background-position: center;
            z-index: 0;
        }

        .n8n-chat-widget .header-bg::after {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.5) 100%);
        }

        .n8n-chat-widget .header-content {
            position: relative;
            z-index: 1;
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 16px 20px;
        }

        .n8n-chat-widget .header-avatar {
            width: 44px;
            height: 44px;
            border-radius: 12px;
            object-fit: contain;
            background: rgba(255,255,255,0.95);
            padding: 6px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        }

        .n8n-chat-widget .header-info {
            flex: 1;
            min-width: 0;
        }

        .n8n-chat-widget .header-title {
            font-size: 16px;
            font-weight: 700;
            color: #ffffff;
            margin: 0;
            line-height: 1.3;
            text-shadow: 0 1px 3px rgba(0,0,0,0.3);
        }

        .n8n-chat-widget .header-status {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 12px;
            color: rgba(255,255,255,0.9);
            margin-top: 2px;
        }

        .n8n-chat-widget .status-dot {
            width: 8px;
            height: 8px;
            background: #22C55E;
            border-radius: 50%;
            box-shadow: 0 0 6px rgba(34,197,94,0.6);
        }

        .n8n-chat-widget .close-btn {
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(255,255,255,0.2);
            backdrop-filter: blur(8px);
            border: 1px solid rgba(255,255,255,0.2);
            border-radius: 8px;
            color: #ffffff;
            cursor: pointer;
            transition: all 0.2s;
        }

        .n8n-chat-widget .close-btn:hover {
            background: rgba(255,255,255,0.3);
        }

        /* FAQ Section - 2 Row Grid with Nav */
        .n8n-chat-widget .faq-container {
            position: relative;
            background: var(--chat--color-background);
            border-bottom: 1px solid var(--chat--color-border);
            flex-shrink: 0;
        }

        .n8n-chat-widget .faq-bar {
            display: grid;
            grid-auto-flow: column;
            grid-template-rows: repeat(2, auto);
            gap: 8px;
            padding: 12px 48px;
            overflow-x: auto;
            scrollbar-width: none;
            -ms-overflow-style: none;
            scroll-behavior: smooth;
            -webkit-overflow-scrolling: touch;
        }

        .n8n-chat-widget .faq-bar::-webkit-scrollbar {
            display: none;
        }

        .n8n-chat-widget .faq-nav {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 36px;
            height: 36px;
            background: var(--chat--color-background);
            border: 1px solid var(--chat--color-border);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 2;
            transition: all 0.2s;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .n8n-chat-widget .faq-nav:hover {
            background: var(--chat--color-primary);
            border-color: var(--chat--color-primary);
            box-shadow: 0 4px 12px rgba(253,224,71,0.3);
        }

        .n8n-chat-widget .faq-nav:active {
            transform: translateY(-50%) scale(0.95);
        }

        .n8n-chat-widget .faq-nav.faq-prev {
            left: 6px;
        }

        .n8n-chat-widget .faq-nav.faq-next {
            right: 6px;
        }

        .n8n-chat-widget .faq-nav svg {
            width: 18px;
            height: 18px;
            color: var(--chat--color-font);
        }

        .n8n-chat-widget .faq-chip {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 8px 12px;
            background: var(--chat--color-surface);
            border: 1px solid var(--chat--color-border);
            border-radius: 8px;
            font-size: 12px;
            font-weight: 500;
            color: var(--chat--color-font);
            cursor: pointer;
            transition: all 0.2s;
            white-space: nowrap;
        }

        .n8n-chat-widget .faq-chip:hover {
            border-color: var(--chat--color-primary);
            background: rgba(253,224,71,0.15);
        }

        .n8n-chat-widget .faq-chip:active {
            transform: scale(0.97);
        }

        .n8n-chat-widget .faq-chip .faq-icon {
            font-size: 14px;
        }

        .n8n-chat-widget .chat-messages {
            flex: 1;
            overflow-y: auto;
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 16px;
            background: var(--chat--color-background);
        }

        .n8n-chat-widget .chat-messages::-webkit-scrollbar {
            width: 5px;
        }

        .n8n-chat-widget .chat-messages::-webkit-scrollbar-track {
            background: transparent;
        }

        .n8n-chat-widget .chat-messages::-webkit-scrollbar-thumb {
            background: var(--chat--color-border);
            border-radius: 3px;
        }

        .n8n-chat-widget .message {
            max-width: 88%;
            font-size: 14px;
            line-height: 1.6;
            word-wrap: break-word;
        }

        .n8n-chat-widget .message.user {
            align-self: flex-end;
            background: var(--chat--color-font);
            color: #ffffff;
            padding: 12px 16px;
            border-radius: 18px 18px 4px 18px;
            animation: slideInRight 0.25s ease;
        }

        .n8n-chat-widget .message.bot {
            align-self: flex-start;
            background: var(--chat--color-surface);
            color: var(--chat--color-font);
            padding: 14px 18px;
            border-radius: 18px 18px 18px 4px;
            animation: slideInLeft 0.25s ease;
        }

        .n8n-chat-widget .message.bot h3,
        .n8n-chat-widget .message.bot h4 {
            font-size: 14px;
            font-weight: 700;
            color: #1F2937;
            margin: 16px 0 8px 0;
            padding-bottom: 4px;
            border-bottom: 2px solid var(--chat--color-primary);
            display: inline-block;
        }

        .n8n-chat-widget .message.bot h3:first-child,
        .n8n-chat-widget .message.bot h4:first-child {
            margin-top: 0;
        }

        .n8n-chat-widget .message.bot strong {
            color: #1F2937;
            font-weight: 600;
        }

        .n8n-chat-widget .message.bot em {
            color: #6B7280;
            font-style: italic;
        }

        .n8n-chat-widget .message.bot ul,
        .n8n-chat-widget .message.bot ol {
            margin: 8px 0;
            padding-left: 20px;
        }

        .n8n-chat-widget .message.bot li {
            margin: 6px 0;
        }

        .n8n-chat-widget .message.bot code {
            background: rgba(253,224,71,0.2);
            padding: 2px 6px;
            border-radius: 4px;
            font-size: 13px;
            font-family: 'SF Mono', Monaco, monospace;
        }

        .n8n-chat-widget .message.bot pre {
            background: #1F2937;
            color: #F9FAFB;
            padding: 12px;
            border-radius: 8px;
            overflow-x: auto;
            margin: 12px 0;
        }

        .n8n-chat-widget .message.bot pre code {
            background: none;
            padding: 0;
            color: inherit;
        }

        .n8n-chat-widget .message a {
            color: #2563EB;
            text-decoration: none;
            font-weight: 500;
        }

        .n8n-chat-widget .message a:hover {
            text-decoration: underline;
        }

        .n8n-chat-widget .message.user a {
            color: var(--chat--color-primary);
        }

        .n8n-chat-widget .message .cta-btn {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            margin-top: 8px;
            padding: 10px 18px;
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: #1F2937;
            border-radius: 8px;
            font-weight: 600;
            font-size: 13px;
            text-decoration: none;
            transition: all 0.2s;
            box-shadow: 0 2px 8px rgba(253,224,71,0.3);
        }

        .n8n-chat-widget .message .cta-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 16px rgba(253,224,71,0.4);
            text-decoration: none;
        }

        .n8n-chat-widget .message .cta-btn::after {
            content: "→";
            transition: transform 0.2s;
        }

        .n8n-chat-widget .message .cta-btn:hover::after {
            transform: translateX(3px);
        }

        .n8n-chat-widget .message .secondary-btn {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            margin-top: 8px;
            margin-right: 8px;
            padding: 8px 14px;
            background: var(--chat--color-surface);
            color: var(--chat--color-font);
            border: 1px solid var(--chat--color-border);
            border-radius: 8px;
            font-weight: 500;
            font-size: 12px;
            text-decoration: none;
            transition: all 0.2s;
        }

        .n8n-chat-widget .message .secondary-btn:hover {
            border-color: var(--chat--color-primary);
            background: rgba(253,224,71,0.1);
            text-decoration: none;
        }

        .n8n-chat-widget .typing {
            display: flex;
            align-items: center;
            gap: 5px;
            padding: 14px 18px;
            background: var(--chat--color-surface);
            border-radius: 18px 18px 18px 4px;
            align-self: flex-start;
            animation: slideInLeft 0.25s ease;
        }

        .n8n-chat-widget .typing-dot {
            width: 8px;
            height: 8px;
            background: var(--chat--color-muted);
            border-radius: 50%;
            animation: dotPulse 1.4s ease-in-out infinite;
        }

        .n8n-chat-widget .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .n8n-chat-widget .typing-dot:nth-child(3) { animation-delay: 0.4s; }

        .n8n-chat-widget .chat-input {
            display: flex;
            align-items: flex-end;
            gap: 10px;
            padding: 16px;
            background: var(--chat--color-background);
            border-top: 1px solid var(--chat--color-border);
            flex-shrink: 0;
        }

        .n8n-chat-widget .input-field {
            flex: 1;
            padding: 12px 16px;
            background: var(--chat--color-surface);
            border: 1px solid var(--chat--color-border);
            border-radius: 24px;
            font-family: inherit;
            font-size: 14px;
            color: var(--chat--color-font);
            resize: none;
            outline: none;
            min-height: 44px;
            max-height: 120px;
            transition: border-color 0.2s, box-shadow 0.2s;
        }

        .n8n-chat-widget .input-field::placeholder {
            color: var(--chat--color-muted);
        }

        .n8n-chat-widget .input-field:focus {
            border-color: var(--chat--color-primary);
            box-shadow: 0 0 0 3px rgba(253,224,71,0.15);
        }

        .n8n-chat-widget .send-btn {
            width: 44px;
            height: 44px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--chat--color-primary);
            border: none;
            border-radius: 50%;
            color: var(--chat--color-font);
            cursor: pointer;
            transition: all 0.2s;
            flex-shrink: 0;
        }

        .n8n-chat-widget .send-btn:hover {
            transform: scale(1.05);
            box-shadow: var(--chat--shadow-md);
        }

        .n8n-chat-widget .send-btn:active {
            transform: scale(0.95);
        }

        .n8n-chat-widget .send-btn svg {
            width: 18px;
            height: 18px;
        }

        .n8n-chat-widget .chat-footer {
            padding: 10px 16px;
            text-align: center;
            background: var(--chat--color-surface);
            border-top: 1px solid var(--chat--color-border);
            flex-shrink: 0;
        }

        .n8n-chat-widget .chat-footer a {
            font-size: 11px;
            color: var(--chat--color-muted);
            text-decoration: none;
            transition: color 0.2s;
        }

        .n8n-chat-widget .chat-footer a:hover {
            color: var(--chat--color-font);
        }

        .n8n-chat-widget .chat-toggle {
            position: fixed;
            bottom: 24px;
            right: 24px;
            width: 64px;
            height: 64px;
            background: var(--chat--color-primary);
            border: none;
            border-radius: 50%;
            cursor: pointer;
            z-index: 9997;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: var(--chat--shadow-lg);
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .n8n-chat-widget .chat-toggle.position-left {
            right: auto;
            left: 24px;
        }

        .n8n-chat-widget .chat-toggle:hover {
            transform: scale(1.08);
            box-shadow: 0 8px 30px rgba(253,224,71,0.4);
        }

        .n8n-chat-widget .chat-toggle:active {
            transform: scale(0.95);
        }

        .n8n-chat-widget .chat-toggle svg {
            width: 28px;
            height: 28px;
            color: var(--chat--color-font);
        }

        .n8n-chat-widget .chat-teaser {
            position: fixed;
            bottom: 100px;
            right: 24px;
            background: var(--chat--color-background);
            color: var(--chat--color-font);
            padding: 12px 18px;
            border-radius: 16px 16px 4px 16px;
            font-size: 14px;
            font-weight: 500;
            box-shadow: var(--chat--shadow-lg);
            z-index: 9996;
            opacity: 0;
            visibility: hidden;
            transform: translateY(8px);
            transition: all 0.3s ease;
            max-width: 240px;
            cursor: pointer;
        }

        .n8n-chat-widget .chat-teaser.position-left {
            right: auto;
            left: 24px;
            border-radius: 16px 16px 16px 4px;
        }

        .n8n-chat-widget .chat-teaser.visible {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
            animation: bounce 2s ease-in-out 0.5s infinite;
        }

        .n8n-chat-widget .chat-teaser .teaser-emoji {
            margin-right: 6px;
        }

        .n8n-chat-widget .chat-container.open ~ .chat-toggle,
        .n8n-chat-widget .chat-container.open ~ .chat-teaser {
            opacity: 0 !important;
            visibility: hidden !important;
            pointer-events: none;
        }

        @media (max-width: 480px) {
            .n8n-chat-widget .chat-container {
                bottom: 0;
                right: 0;
                left: 0;
                width: 100%;
                max-width: 100%;
                height: 100%;
                max-height: 100%;
                border-radius: 0;
            }

            .n8n-chat-widget .chat-toggle {
                bottom: 16px;
                right: 16px;
                width: 56px;
                height: 56px;
            }

            .n8n-chat-widget .chat-toggle svg {
                width: 24px;
                height: 24px;
            }

            .n8n-chat-widget .chat-teaser {
                bottom: 84px;
                right: 16px;
                max-width: calc(100vw - 100px);
            }

            .n8n-chat-widget .faq-bar {
                padding: 10px 40px;
                gap: 6px;
            }

            .n8n-chat-widget .faq-chip {
                padding: 6px 10px;
                font-size: 11px;
            }

            .n8n-chat-widget .faq-nav {
                width: 30px;
                height: 30px;
            }

            .n8n-chat-widget .faq-nav svg {
                width: 14px;
                height: 14px;
            }

            .n8n-chat-widget .faq-nav.faq-prev {
                left: 4px;
            }

            .n8n-chat-widget .faq-nav.faq-next {
                right: 4px;
            }
        }
    `;

    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    function getVisitorId() {
        const storageKey = 'ch_visitor_id';
        let visitorId = localStorage.getItem(storageKey);
        if (!visitorId) {
            visitorId = 'v_' + Date.now().toString(36) + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem(storageKey, visitorId);
        }
        return visitorId;
    }

    function getBrowserFingerprint() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        ctx.textBaseline = 'top';
        ctx.font = '14px Arial';
        ctx.fillText('ChattyHiring', 2, 2);
        const fingerprint = {
            userAgent: navigator.userAgent,
            language: navigator.language,
            platform: navigator.platform,
            screenRes: screen.width + 'x' + screen.height,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            canvasHash: canvas.toDataURL().slice(-50)
        };
        const str = JSON.stringify(fingerprint);
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return 'fp_' + Math.abs(hash).toString(36);
    }

    function getSessionId() {
        return getVisitorId() + '_' + getBrowserFingerprint();
    }

    const defaultConfig = {
        webhook: { url: '', route: '' },
        branding: {
            logo: '',
            name: 'Jobs Assistant',
            welcomeText: 'Hi! How can I help you today?',
            responseTimeText: 'Online',
            toggleLabelText: 'Hi There, Have any Questions?',
            headerImage: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80',
            poweredBy: { text: 'Powered by ChattyHiring', link: 'https://chattyhiring.com/' }
        },
        style: { primaryColor: '#FDE047', secondaryColor: '#FBBF24', position: 'right' },
        features: { autoLoadPreviousSession: false },
        faq: [
            { icon: '💼', text: 'Jobs', query: 'What job opportunities are available?' },
            { icon: '🏢', text: 'Culture', query: 'Tell me about the company culture' },
            { icon: '🎁', text: 'Benefits', query: 'What benefits do you offer?' },
            { icon: '📈', text: 'Growth', query: 'What are the career growth opportunities?' }
        ]
    };

    const config = window.ChatWidgetConfig ? {
        webhook: { ...defaultConfig.webhook, ...window.ChatWidgetConfig.webhook },
        branding: { ...defaultConfig.branding, ...window.ChatWidgetConfig.branding },
        style: { ...defaultConfig.style, ...window.ChatWidgetConfig.style },
        features: { ...defaultConfig.features, ...window.ChatWidgetConfig.features },
        faq: window.ChatWidgetConfig.faq || defaultConfig.faq
    } : defaultConfig;

    if (window.N8NChatWidgetInitialized) return;
    window.N8NChatWidgetInitialized = true;

    let currentSessionId = getSessionId();

    const widget = document.createElement('div');
    widget.className = 'n8n-chat-widget';
    widget.style.setProperty('--n8n-chat-primary-color', config.style.primaryColor);
    widget.style.setProperty('--n8n-chat-secondary-color', config.style.secondaryColor);
    widget.style.setProperty('--header-bg-image', "url('" + config.branding.headerImage + "')");

    const faqChips = config.faq.map(function(f) {
        return '<button class="faq-chip" data-query="' + f.query + '"><span class="faq-icon">' + f.icon + '</span>' + f.text + '</button>';
    }).join('');

    widget.innerHTML = '<div class="chat-overlay"></div>' +
        '<div class="chat-container' + (config.style.position === 'left' ? ' position-left' : '') + '">' +
            '<div class="chat-header">' +
                '<div class="header-bg"></div>' +
                '<div class="header-content">' +
                    '<img src="' + config.branding.logo + '" alt="" class="header-avatar" onerror="this.style.display=\'none\'">' +
                    '<div class="header-info">' +
                        '<h1 class="header-title">' + config.branding.name + '</h1>' +
                        '<div class="header-status"><span class="status-dot"></span><span>' + config.branding.responseTimeText + '</span></div>' +
                    '</div>' +
                    '<button class="close-btn" aria-label="Close"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>' +
                '</div>' +
            '</div>' +
            '<div class="faq-container">' +
                '<button class="faq-nav faq-prev" aria-label="Scroll left"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg></button>' +
                '<div class="faq-bar">' + faqChips + '</div>' +
                '<button class="faq-nav faq-next" aria-label="Scroll right"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></button>' +
            '</div>' +
            '<div class="chat-messages"></div>' +
            '<div class="chat-input">' +
                '<textarea class="input-field" placeholder="Type your message..." rows="1"></textarea>' +
                '<button class="send-btn" aria-label="Send"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg></button>' +
            '</div>' +
            '<div class="chat-footer"><a href="' + config.branding.poweredBy.link + '" target="_blank" rel="noopener">' + config.branding.poweredBy.text + '</a></div>' +
        '</div>' +
        '<button class="chat-toggle' + (config.style.position === 'left' ? ' position-left' : '') + '" aria-label="Open chat"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg></button>' +
        '<div class="chat-teaser' + (config.style.position === 'left' ? ' position-left' : '') + '"><span class="teaser-emoji">👋</span>' + config.branding.toggleLabelText + '</div>';

    document.body.appendChild(widget);

    const overlay = widget.querySelector('.chat-overlay');
    const container = widget.querySelector('.chat-container');
    const messages = widget.querySelector('.chat-messages');
    const textarea = widget.querySelector('.input-field');
    const sendBtn = widget.querySelector('.send-btn');
    const closeBtn = widget.querySelector('.close-btn');
    const toggleBtn = widget.querySelector('.chat-toggle');
    const teaser = widget.querySelector('.chat-teaser');
    const faqButtons = widget.querySelectorAll('.faq-chip');
    const faqBar = widget.querySelector('.faq-bar');
    const faqPrev = widget.querySelector('.faq-prev');
    const faqNext = widget.querySelector('.faq-next');

    // FAQ Navigation
    function scrollFaq(direction) {
        var scrollAmount = 200;
        faqBar.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
    }

    faqPrev.addEventListener('click', function() { scrollFaq(-1); });
    faqNext.addEventListener('click', function() { scrollFaq(1); });

    function escapeHTML(str) {
        return str.replace(/[&<>"']/g, function(m) {
            return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m];
        });
    }

    function renderMarkdown(text) {
        var out = String(text || '');
        out = out.replace(/^### (.+)$/gm, '<h3>$1</h3>');
        out = out.replace(/^#### (.+)$/gm, '<h4>$1</h4>');
        out = out.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        out = out.replace(/\*(.+?)\*/g, '<em>$1</em>');
        out = out.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
        out = out.replace(/`([^`]+)`/g, '<code>$1</code>');
        out = out.replace(/\[Apply Now\]\(([^)]+)\)/gi, '<a href="$1" class="cta-btn" target="_blank" rel="noopener">Apply Now</a>');
        out = out.replace(/\[Application Link\]\(([^)]+)\)/gi, '<a href="$1" class="cta-btn" target="_blank" rel="noopener">Apply Now</a>');
        out = out.replace(/\[View Details\]\(([^)]+)\)/gi, '<a href="$1" class="secondary-btn" target="_blank" rel="noopener">View Details</a>');
        out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
        out = out.replace(/(^|[^"'])(https?:\/\/[^\s<]+)/g, '$1<a href="$2" target="_blank" rel="noopener">$2</a>');
        out = out.replace(/^\s*[-•]\s+(.+)$/gm, '<li>$1</li>');
        out = out.replace(/(<li>[\s\S]*?<\/li>)/g, '<ul>$1</ul>');
        out = out.replace(/<\/ul>\s*<ul>/g, '');
        out = out.replace(/\n/g, '<br>');
        out = out.replace(/<\/(h[34]|ul|pre)><br>/g, '</$1>');
        return out;
    }

    function addMessage(content, isUser) {
        var div = document.createElement('div');
        div.className = 'message ' + (isUser ? 'user' : 'bot');
        div.innerHTML = isUser ? escapeHTML(content) : renderMarkdown(content);
        messages.appendChild(div);
        messages.scrollTop = messages.scrollHeight;
    }

    function showTyping() {
        var div = document.createElement('div');
        div.className = 'typing';
        div.id = 'typing';
        div.innerHTML = '<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>';
        messages.appendChild(div);
        messages.scrollTop = messages.scrollHeight;
    }

    function hideTyping() {
        var t = document.getElementById('typing');
        if (t) t.remove();
    }

    function showGreeting() {
        addMessage(config.branding.welcomeText || "Hi! 👋 How can I help you today?", false);
    }

    function postJSON(url, data) {
        return fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then(function(res) {
            return res.text().then(function(text) {
                var json = null;
                try { json = JSON.parse(text); } catch(e) {}
                return { ok: res.ok, data: json, raw: text };
            });
        }).catch(function() {
            return { ok: false, data: null, raw: null };
        });
    }

    function getOutput(payload) {
        var item = Array.isArray(payload) ? payload[0] : payload;
        var out = item && (item.output !== undefined ? item.output : (item.message !== undefined ? item.message : item.text));
        return String(out || '').trim() || null;
    }

    function sendMessage(text) {
        addMessage(text, true);
        showTyping();

        var payload = {
            action: 'sendMessage',
            sessionId: currentSessionId,
            route: config.webhook.route,
            chatInput: text,
            metadata: {
                visitorId: getVisitorId(),
                fingerprint: getBrowserFingerprint(),
                timestamp: new Date().toISOString(),
                url: window.location.href
            }
        };

        postJSON(config.webhook.url, payload).then(function(res) {
            hideTyping();
            var output = getOutput(res.data);
            if (output) {
                addMessage(output, false);
            } else {
                addMessage("Sorry, I couldn't process that. Please try again.", false);
            }
        });
    }

    function loadSession() {
        var payload = [{
            action: 'loadPreviousSession',
            sessionId: currentSessionId,
            route: config.webhook.route,
            metadata: { visitorId: getVisitorId(), fingerprint: getBrowserFingerprint() }
        }];

        postJSON(config.webhook.url, payload).then(function(res) {
            var output = getOutput(res.data);
            if (output) addMessage(output, false);
        });
    }

    function openChat() {
        container.classList.add('open');
        overlay.classList.add('visible');
        teaser.classList.remove('visible');
        textarea.focus();
    }

    function closeChat() {
        container.classList.remove('open');
        overlay.classList.remove('visible');
    }

    toggleBtn.addEventListener('click', openChat);
    teaser.addEventListener('click', openChat);
    closeBtn.addEventListener('click', closeChat);
    overlay.addEventListener('click', closeChat);
    document.addEventListener('keydown', function(e) { if (e.key === 'Escape') closeChat(); });

    sendBtn.addEventListener('click', function() {
        var text = textarea.value.trim();
        if (text) {
            sendMessage(text);
            textarea.value = '';
            textarea.style.height = 'auto';
        }
    });

    textarea.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendBtn.click();
        }
    });

    textarea.addEventListener('input', function() {
        textarea.style.height = 'auto';
        textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
    });

    faqButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            var q = btn.dataset.query || '';
            if (q) sendMessage(q);
        });
    });

    function showTeaser() {
        if (!container.classList.contains('open')) {
            teaser.classList.add('visible');
            setTimeout(function() { teaser.classList.remove('visible'); }, 5000);
        }
    }

    setTimeout(showTeaser, 2500);
    setInterval(showTeaser, 35000);

    setTimeout(function() {
        openChat();
        showGreeting();
        if (config.features.autoLoadPreviousSession) loadSession();
    }, 400);
})();
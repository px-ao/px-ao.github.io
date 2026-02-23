const navToggle = document.querySelector('[data-nav-toggle]');
const navLinks = document.querySelector('[data-nav-links]');

const messageFiles = [
    '0008_15012024.html',
    '0009_28012024.html',
    '0013_26022024.html',
    '0014_01032024.html',
    '0015_04032024.html',
    '0016_28032024.html',
    '0017_03052024.html',
    '0018_11052024.html',
    '0019_15052024.html',
    '0020_18052024.html',
    '0021_24052024.html',
    '0022_03062024.html',
    '0023_24062024.html',
    '0024_14072024.html',
    '0025_27082024.html',
    '0026_19092024.html',
    '0027_25092024.html',
    '0028_04102024.html',
    '0029_30102024.html',
    '0030_02112024.html',
    '0033_16122024.html',
    '0034_06012025.html',
    '0035_17012025.html',
    '0036_25012025.html',
    '0037_10022025.html',
    '0038_05032025.html',
    '0039_09032025.html',
    '0040_24032025.html',
    '0041_06042025.html',
    '0043_01052025.html',
    '0044_06062025.html',
    '0046_17062025.html',
    '0058_23082025.html',
    '0061_12092025.html',
    '0062_02102025.html',
    '0063_15102025.html',
    '0063_20102025.html',
    '0064_26102025.html',
    '0065_01112025.html',
    '0067_04112025.html',
    '0068_07112025.html',
    '0069_15112025.html',
    '0070_17112025.html',
    '0072_23112025.html',
    '0073_27112025.html',
    '0075_08122025.html',
    '0076_13122025.html',
    '0077_30122025.html',
    '0078_05012026.html',
    '0079_10012026.html',
    '0080_15012026.html',
    '0081_02022026.html',
    '0082_06022026.html',
    '0083_09022026.html',
    '0084_18022026.html',
    '0085_22022026.html'
    , '0086_23022026.html'
];

if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        const isOpen = navLinks.dataset.open === 'true';
        navLinks.dataset.open = (!isOpen).toString();
        navToggle.setAttribute('aria-expanded', (!isOpen).toString());
    });
    
    // Fechar menu ao clicar fora
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.dataset.open = 'false';
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });
    
    // Fechar menu ao clicar em um link
    const navLinkItems = navLinks.querySelectorAll('a');
    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.dataset.open = 'false';
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

const progressBar = document.querySelector('[data-progress-bar]');

if (progressBar) {
    const updateProgress = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
        progressBar.style.width = `${progress * 100}%`;
    };
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
}

const psalmButtons = document.querySelectorAll('[data-psalm-target]');
const psalmPanels = document.querySelectorAll('[data-psalm-panel]');

if (psalmButtons.length && psalmPanels.length) {
    const activatePsalm = (targetId) => {
        psalmButtons.forEach((button) => {
            const isTarget = button.dataset.psalmTarget === targetId;
            button.setAttribute('aria-pressed', isTarget.toString());
        });
        psalmPanels.forEach((panel) => {
            const matches = panel.id === targetId;
            panel.classList.toggle('is-active', matches);
        });
    };

    psalmButtons.forEach((button) => {
        button.addEventListener('click', () => {
            activatePsalm(button.dataset.psalmTarget);
        });
    });

    activatePsalm(psalmButtons[0].dataset.psalmTarget);
}

const initMessageNavigator = () => {
    const yearSelect = document.getElementById('yearSelect');
    const yearBlocks = document.querySelectorAll('.year-block');

    if (!yearSelect || !yearBlocks.length) {
        return;
    }

    const monthToggles = document.querySelectorAll('.month-toggle');
    const monthContents = document.querySelectorAll('.month-content');

    const closeAllMonths = (scope) => {
        const targetContents = scope ? scope.querySelectorAll('.month-content') : monthContents;
        const targetToggles = scope ? scope.querySelectorAll('.month-toggle') : monthToggles;

        targetContents.forEach((content) => content.classList.add('hidden'));
        targetToggles.forEach((toggle) => toggle.classList.remove('open'));
    };

    monthToggles.forEach((toggle) => {
        toggle.addEventListener('click', () => {
            const content = toggle.nextElementSibling;
            if (!content) {
                return;
            }

            const shouldOpen = content.classList.contains('hidden');
            const parentYear = toggle.closest('.year-content');
            if (parentYear) {
                closeAllMonths(parentYear);
            }
            content.classList.toggle('hidden', !shouldOpen);
            toggle.classList.toggle('open', shouldOpen);
        });
    });

    yearBlocks.forEach((block) => {
        block.classList.add('hidden');
        const content = block.querySelector('.year-content');
        if (content) {
            content.classList.add('hidden');
        }
    });

    const showYear = (year) => {
        yearBlocks.forEach((block) => {
            const matches = block.dataset.year === year;
            block.classList.toggle('hidden', !matches);
            const content = block.querySelector('.year-content');
            if (content) {
                content.classList.toggle('hidden', !matches);
            }
        });
    };

    const defaultYear = yearSelect.dataset.defaultYear || (yearBlocks[0] ? yearBlocks[0].dataset.year : '');

    yearSelect.addEventListener('change', (event) => {
        const selectedYear = event.target.value;
        if (!selectedYear) {
            return;
        }
        showYear(selectedYear);
        closeAllMonths();
    });

    if (defaultYear) {
        yearSelect.value = defaultYear;
        showYear(defaultYear);
        closeAllMonths();
    }
};

initMessageNavigator();

const initMessagePagerLinks = () => {
    const pager = document.querySelector('[data-message-pager]');
    if (!pager || !messageFiles.length) {
        return;
    }

    const pathParts = window.location.pathname.split('/');
    const currentFile = pathParts[pathParts.length - 1] || '';
    const currentIndex = messageFiles.indexOf(currentFile);

    if (currentIndex === -1) {
        return;
    }

    const prevLink = pager.querySelector('[data-pager-prev]');
    const nextLink = pager.querySelector('[data-pager-next]');

    const applyLink = (element, targetFile) => {
        if (!element) {
            return;
        }
        if (!targetFile) {
            element.removeAttribute('href');
            element.setAttribute('aria-disabled', 'true');
            element.classList.add('is-disabled');
            return;
        }
        element.href = targetFile;
        element.removeAttribute('aria-disabled');
        element.classList.remove('is-disabled');
    };

    const prevFile = currentIndex > 0 ? messageFiles[currentIndex - 1] : null;
    const nextFile = currentIndex < messageFiles.length - 1 ? messageFiles[currentIndex + 1] : null;

    applyLink(prevLink, prevFile);
    applyLink(nextLink, nextFile);
};

initMessagePagerLinks();

const initFootnotes = () => {
    const noteTriggers = document.querySelectorAll('sup[class*="nota"]');
    const overlay = document.querySelector('[data-footnote-overlay]');
    const content = document.querySelector('[data-footnote-content]');
    const closeButton = document.querySelector('[data-footnote-close]');

    if (!noteTriggers.length || !overlay || !content || !closeButton) {
        return;
    }

    const closeOverlay = () => {
        overlay.classList.remove('is-active');
        overlay.setAttribute('aria-hidden', 'true');
    };

    const openOverlay = (noteId) => {
        const noteSource = document.getElementById(noteId);
        if (noteSource) {
            content.innerHTML = noteSource.innerHTML;
        } else {
            content.innerHTML = '<p>Nota não encontrada.</p>';
        }
        overlay.classList.add('is-active');
        overlay.setAttribute('aria-hidden', 'false');
        closeButton.focus();
    };

    noteTriggers.forEach((trigger) => {
        const noteClass = Array.from(trigger.classList).find((cls) => cls.startsWith('nota'));
        if (!noteClass) {
            return;
        }

        trigger.setAttribute('role', 'button');
        if (!trigger.hasAttribute('tabindex')) {
            trigger.setAttribute('tabindex', '0');
        }

        trigger.addEventListener('click', (event) => {
            event.preventDefault();
            openOverlay(noteClass);
        });

        trigger.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openOverlay(noteClass);
            }
        });
    });

    closeButton.addEventListener('click', () => {
        closeOverlay();
    });

    overlay.addEventListener('click', (event) => {
        if (event.target === overlay) {
            closeOverlay();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && overlay.classList.contains('is-active')) {
            closeOverlay();
        }
    });
};

initFootnotes();

const initPrayerCatalog = () => {
    const categorySelect = document.querySelector('[data-prayer-select]');
    const panels = document.querySelectorAll('[data-prayer-panel]');
    const triggers = document.querySelectorAll('[data-prayer-trigger]');
    const displayTitle = document.querySelector('[data-prayer-heading]');
    const displayContent = document.querySelector('[data-prayer-content]');
    const displayCard = document.querySelector('[data-prayer-display]');
    const sources = document.querySelectorAll('[data-prayer-source]');
    const filterAnchor = document.querySelector('[data-prayer-filter]');
    const backLinks = document.querySelectorAll('[data-prayer-back]');

    if (!categorySelect || !panels.length || !triggers.length || !displayTitle || !displayContent || !displayCard || !sources.length) {
        return;
    }

    const sourceMap = new Map();
    sources.forEach((source) => {
        const slug = source.dataset.prayerSource;
        if (slug) {
            sourceMap.set(slug, source.innerHTML.trim());
        }
    });

    const defaultTitle = displayTitle.textContent;
    const defaultContent = displayContent.innerHTML;

    const setActiveTrigger = (active) => {
        triggers.forEach((trigger) => {
            const isActive = trigger === active;
            trigger.classList.toggle('is-active', isActive);
            trigger.setAttribute('aria-pressed', isActive.toString());
        });
    };

    const resetDisplay = () => {
        displayTitle.textContent = defaultTitle;
        displayContent.innerHTML = defaultContent;
    };

    const showPanel = (category) => {
        panels.forEach((panel) => {
            const matches = panel.dataset.category === category;
            panel.toggleAttribute('hidden', !matches);
        });
    };

    const activatePrayer = (slug, titleText, shouldScroll = false) => {
        const markup = sourceMap.get(slug);
        if (!markup) {
            resetDisplay();
            return;
        }
        displayTitle.textContent = titleText;
        displayContent.innerHTML = markup;
        if (shouldScroll) {
            displayCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const focusFirstPrayer = (category) => {
        const panel = Array.from(panels).find((section) => section.dataset.category === category);
        if (!panel) {
            setActiveTrigger(null);
            resetDisplay();
            return;
        }
        const firstTrigger = panel.querySelector('[data-prayer-trigger]');
        if (!firstTrigger) {
            setActiveTrigger(null);
            resetDisplay();
            return;
        }
        firstTrigger.click();
    };

    triggers.forEach((trigger) => {
        trigger.setAttribute('aria-pressed', 'false');
        trigger.addEventListener('click', (event) => {
            setActiveTrigger(trigger);
            const titleText = trigger.dataset.prayerTitle || trigger.textContent.trim();
            activatePrayer(trigger.dataset.prayerTarget, titleText, event.isTrusted);
        });
    });

    categorySelect.addEventListener('change', (event) => {
        const category = event.target.value;
        showPanel(category);
        focusFirstPrayer(category);
    });

    showPanel(categorySelect.value);
    focusFirstPrayer(categorySelect.value);

    if (backLinks.length && filterAnchor) {
        const scrollToFilter = (event) => {
            event.preventDefault();
            filterAnchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
            window.setTimeout(() => {
                if (typeof categorySelect.focus === 'function') {
                    try {
                        categorySelect.focus({ preventScroll: true });
                    } catch (error) {
                        categorySelect.focus();
                    }
                }
            }, 350);
        };

        backLinks.forEach((link) => {
            link.addEventListener('click', scrollToFilter);
        });
    }
};

initPrayerCatalog();

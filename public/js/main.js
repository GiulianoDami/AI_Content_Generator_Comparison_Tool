document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-button');
    const toolCards = document.querySelectorAll('.tool-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');

            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            toolCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    const sortSelect = document.getElementById('sort-select');

    sortSelect.addEventListener('change', () => {
        const sortValue = sortSelect.value;

        const sortedTools = Array.from(toolCards).sort((a, b) => {
            const ratingA = parseFloat(a.getAttribute('data-rating'));
            const ratingB = parseFloat(b.getAttribute('data-rating'));

            if (sortValue === 'rating-high-to-low') {
                return ratingB - ratingA;
            } else if (sortValue === 'rating-low-to-high') {
                return ratingA - ratingB;
            } else {
                return 0;
            }
        });

        const toolsContainer = document.getElementById('tools-container');
        toolsContainer.innerHTML = '';
        sortedTools.forEach(tool => toolsContainer.appendChild(tool));
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-button');
    const toolCards = document.querySelectorAll('.tool-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            toolCards.forEach(card => {
                if (category === 'all' || card.classList.contains(category)) {
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
        let sortedTools = Array.from(toolCards);

        if (sortValue === 'rating') {
            sortedTools.sort((a, b) => {
                const ratingA = parseFloat(a.querySelector('.tool-rating').textContent);
                const ratingB = parseFloat(b.querySelector('.tool-rating').textContent);
                return ratingB - ratingA;
            });
        } else if (sortValue === 'name') {
            sortedTools.sort((a, b) => {
                const nameA = a.querySelector('.tool-name').textContent.toLowerCase();
                const nameB = b.querySelector('.tool-name').textContent.toLowerCase();
                return nameA.localeCompare(nameB);
            });
        }

        const toolsContainer = document.querySelector('.tools-container');
        sortedTools.forEach(tool => toolsContainer.appendChild(tool));
    });
});
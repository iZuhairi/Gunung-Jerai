const attractionsData = [
{
id: 'botanical-park',
name: 'Botanical Park',
category: 'Nature',
description: 'Wander through high-elevation gardens, vibrant orchids, and peaceful walking trails enveloped in misty cool breezes.',
image: 'https://images.unsplash.com/photo-1542272201-b1ca555f8505?auto=format&fit=crop&w=800&q=80',
price: 'Free',
hours: '8:00 AM - 6:00 PM',
url: 'activity.html'
},
{
id: 'alur-naga',
name: 'Alur Naga Waterfall',
category: 'Scenic Viewpoints',
description: 'A tranquil, forest-hidden waterfall reachable via brief trails, ideal for deep natural refreshment.',
image: 'https://images.unsplash.com/photo-1432405972618-fc088ee40191?auto=format&fit=crop&w=800&q=80',
price: 'Free',
hours: 'Daylight hours',
url: 'activity.html'
},
{
id: 'padang-tok-sheikh',
name: 'Padang Tok Sheikh',
category: 'History & Heritage',
description: 'A majestic limestone clearing connected to the ancient history of Islamic heritage in Kedah.',
image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80',
price: 'Free',
hours: '24 Hours',
url: 'activity.html'
},
{
id: 'telaga-tok-sheikh',
name: 'Telaga Tok Sheikh',
category: 'History & Heritage',
description: 'An ancient well believed to have historical significance, surrounded by lush highland forest.',
image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80',
price: 'Free',
hours: 'Daylight hours',
url: 'activity.html'
},
{
id: 'forestry-museum',
name: 'Forestry Museum',
category: 'Family Friendly',
description: 'Learn about the local flora, fauna, and geological history of the Gunung Jerai ecosystem.',
image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80',
price: 'Check locally',
hours: '9:00 AM - 5:00 PM',
url: 'activity.html'
},
{
id: 'peak-viewpoint',
name: 'Jerai Peak Viewpoint',
category: 'Scenic Viewpoints',
description: 'The highest accessible point offering panoramic views of the Malacca Strait and surrounding paddy fields.',
image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
price: 'Free',
hours: '24 Hours',
url: 'activity.html'
}
];

document.addEventListener('DOMContentLoaded', () => {
const grid = document.getElementById('attractions-grid');
const searchInput = document.getElementById('search-input');
const filterBtns = document.querySelectorAll('.filter-btn');

if (!grid) return; // Exit if not on attractions page

function renderAttractions(data) {
grid.innerHTML = '';

if (data.length === 0) {
    grid.innerHTML = `
    <div class="empty-state text-center" style="grid-column: 1 / -1; padding: 4rem 0;">
        <h3 style="color: var(--text-secondary);">No destinations found</h3>
        <p>Try adjusting your search or category filter.</p>
    </div>
    `;
    return;
}

data.forEach(item => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
    <div class="card-image" style="background-image: url('${item.image}');"></div>
    <div class="card-content">
        <span class="badge">${item.category}</span>
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <div class="card-footer" style="display:flex; justify-content: space-between; align-items: center;">
        <span style="font-size: 0.85rem; color: var(--text-secondary);">${item.hours}</span>
        <a href="${item.url}" class="link-arrow">Details →</a>
        </div>
    </div>
    `;
    grid.appendChild(card);
});
}

function filterData() {
const searchTerm = searchInput.value.toLowerCase();
const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;

const filtered = attractionsData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm) || item.description.toLowerCase().includes(searchTerm);
    const matchesCategory = activeFilter === 'All' || item.category === activeFilter;
    return matchesSearch && matchesCategory;
});

renderAttractions(filtered);
}

// Event Listeners
if (searchInput) searchInput.addEventListener('input', filterData);

filterBtns.forEach(btn => {
btn.addEventListener('click', (e) => {
    filterBtns.forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    filterData();
});
});

// Initial Render
renderAttractions(attractionsData);
});
const attractionsData = [
  {
    id: 1,
    name: "Gunung Jerai Botanical Park",
    category: "nature",
    description: "Wander through high-elevation gardens featuring vibrant orchids, pitcher plants, and peaceful walking trails.",
    image: "assets/images/GunungJeraiBotanicalPark.jpg", 
    price: "Free entry",
    operatingHours: "8:00 AM - 6:00 PM"
  },
  {
    id: 2,
    name: "Alur Naga Waterfall",
    category: "nature", // Alur Naga kategori nature
    description: "A tranquil, forest-hidden waterfall reachable via a brief trek. Perfect for nature photography and cooling off.",
    image: "assets/images/AirTerjunAlurNaga.jpeg", // Ejaan dipastikan .jpg
    price: "Free entry",
    operatingHours: "Daylight hours recommended"
  },
  {
    id: 3,
    name: "Padang Tok Sheikh",
    category: "heritage",
    description: "A majestic limestone clearing connected to the ancient history of Islamic heritage in Kedah.",
    image: "assets/images/PadangTokSheikh.jpeg", 
    price: "Free entry",
    operatingHours: "Open 24 hours"
  },
  {
    id: 4,
    name: "Telaga Tok Sheikh",
    category: "heritage",
    description: "A historical well believed to have been used by early scholars. The water is refreshingly cold year-round.",
    image: "assets/images/TelagaTokSheikh.jpeg", 
    price: "Free entry",
    operatingHours: "Open 24 hours"
  },
  {
    id: 5,
    name: "Peak Viewpoint",
    category: "viewpoint", // Viewpoint
    description: "Experience breathtaking panoramic views of the Malacca Strait and endless paddy fields.",
    image: "assets/images/PeakViewpoint.jpeg", 
    price: "Free entry",
    operatingHours: "Best at sunrise/sunset"
  }
];

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('attractions-grid');
  const searchInput = document.getElementById('search-attractions');
  const filterBtns = document.querySelectorAll('.filter-btn');

  if (!grid) return; 

  function renderAttractions(data) {
    grid.innerHTML = '';
    
    if (data.length === 0) {
      grid.innerHTML = `
        <div class="empty-state text-center" style="grid-column: 1 / -1; padding: 3rem;">
          <h3>No destinations found</h3>
          <p>Try adjusting your search or filters.</p>
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
          <div class="card-footer" style="display: flex; flex-direction: column; gap: 0.5rem;">
            <small style="color: var(--text-secondary)">🕒 ${item.operatingHours}</small>
            <small style="color: var(--text-secondary)">💵 ${item.price}</small>
            <a href="activity.html" class="link-arrow" style="margin-top: 1rem;">View Details →</a>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  function filterData() {
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    
    // Check which filter button is active dan tukar nilainya ke huruf kecil (.toLowerCase)
    const activeBtn = document.querySelector('.filter-btn.active');
    const activeFilter = activeBtn ? activeBtn.getAttribute('data-filter').toLowerCase() : 'all';

    const filtered = attractionsData.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm) || item.description.toLowerCase().includes(searchTerm);
      const matchesCategory = activeFilter === 'all' || item.category === activeFilter;
      return matchesSearch && matchesCategory;
    });

    renderAttractions(filtered);
  }

  // Event Listeners
  if (searchInput) {
    searchInput.addEventListener('input', filterData);
  }

  if (filterBtns) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        e.target.classList.add('active');
        // Trigger filter
        filterData();
      });
    });
  }

  // Initial Render
  renderAttractions(attractionsData);
});

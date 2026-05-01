const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const fullImg = document.getElementById('full-img');
const closeBtn = document.querySelector('.close-btn');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentIndex = 0;
let visibleItems = []; 


filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.filter-btn.active').classList.remove('active');
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter').toLowerCase();

        galleryItems.forEach(item => {
            const imgPath = item.querySelector('img').getAttribute('src').toLowerCase();
            
            if (filterValue === 'all' || imgPath.includes(filterValue)) {
                item.style.display = "block"; 
                setTimeout(() => item.style.opacity = "1", 10);
            } else {
                item.style.opacity = "0";
                setTimeout(() => item.style.display = "none", 300);
            }
        });
    });
});

galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
        visibleItems = Array.from(galleryItems).filter(i => !i.classList.contains('hide'));
        currentIndex = visibleItems.indexOf(item);
        updateImg();
        lightbox.style.display = 'flex';
    });
});

function updateImg() {
    fullImg.src = visibleItems[currentIndex].querySelector('img').src;
}

nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % visibleItems.length;
    updateImg();
});

prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
    updateImg();
});

closeBtn.addEventListener('click', () => lightbox.style.display = 'none');
lightbox.addEventListener('click', (e) => {
    if (e.target.id === 'lightbox') lightbox.style.display = 'none';
});
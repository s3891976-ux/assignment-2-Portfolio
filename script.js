const star = document.querySelector('.star');
const header = document.querySelector('header');
const portfolio = document.querySelector('.portfolio');
const vegetables = document.querySelectorAll('.tomato, .orange-bellpepper, .banana, .yellow-bellpepper, .carrot, .taro');
const logo = document.querySelector('.logo');
const bag = document.querySelector('.bag');
const skillIcons = document.querySelectorAll('.blender, .ps, .ai, .davinci, .figma, .VS');
const skillSet = document.querySelector('.skill-set');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

let isFalling = false;
let resetTimer = null;
let skillsBurst = false;
let draggedElement = null;
let offsetX = 0;
let offsetY = 0;


if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

 
    const navItems = navLinks.querySelectorAll('a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

   
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
}

if (logo) {
    logo.addEventListener('click', () => {
        if (window.scrollY <= 100) {
            location.reload();
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
}


if (bag) {
    bag.addEventListener('click', () => {
        if (!skillsBurst) {
            skillIcons.forEach(icon => {
                icon.classList.add('burst');
            });
            if (skillSet) {
                skillSet.classList.add('show');
            }
            skillsBurst = true;
        } else {
            skillIcons.forEach(icon => {
                icon.classList.remove('burst');
                icon.style.left = '';
                icon.style.top = '';
                icon.style.right = '';
                icon.style.bottom = '';
                icon.style.transform = '';
            });
            if (skillSet) {
                skillSet.classList.remove('show');
            }
            skillsBurst = false;
        }
    });
}


skillIcons.forEach(icon => {
    icon.addEventListener('mousedown', (e) => {
        if (!skillsBurst) return;
        
        draggedElement = icon;
        draggedElement.classList.add('dragging');
        
        const rect = draggedElement.getBoundingClientRect();
        const skillContainer = document.querySelector('.skills-container');
        const containerRect = skillContainer.getBoundingClientRect();
        
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        
        e.preventDefault();
    });
});

document.addEventListener('mousemove', (e) => {
    if (draggedElement && skillsBurst) {
        const skillContainer = document.querySelector('.skills-container');
        const containerRect = skillContainer.getBoundingClientRect();
        
        let newX = e.clientX - containerRect.left - offsetX;
        let newY = e.clientY - containerRect.top - offsetY;
        
        draggedElement.style.left = newX + 'px';
        draggedElement.style.top = newY + 'px';
        draggedElement.style.right = 'auto';
        draggedElement.style.bottom = 'auto';
        draggedElement.style.transform = 'translate(0, 0)';
    }
});

document.addEventListener('mouseup', () => {
    if (draggedElement) {
        draggedElement.classList.remove('dragging');
        draggedElement = null;
    }
});

if (star && header) {
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const headerHeight = header.offsetHeight;
        
        if (scrollPosition > headerHeight) {
            const rotation = (scrollPosition - headerHeight) * 0.2;
            star.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
        } else {
            star.style.transform = `translate(-50%, -50%) rotate(0deg)`;
        }
    });
}

if (portfolio && vegetables.length > 0) {
    portfolio.addEventListener('click', () => {
        if (isFalling) return;
        
        vegetables.forEach(veg => {
            veg.classList.add('falling');
        });
    isFalling = true;
    
    if (resetTimer) {
        clearTimeout(resetTimer);
    }
    
    
    resetTimer = setTimeout(() => {
        vegetables.forEach(veg => {
            veg.style.scale = '0';
            veg.style.transition = 'scale 2s ease';
        });
        
        
        setTimeout(() => {
            vegetables.forEach(veg => {
                veg.classList.remove('falling', 'returning', 'disappearing');
              
                veg.style.scale = '0';
                veg.style.transition = '';
                
              
                setTimeout(() => {
                    veg.style.scale = '1';
                    veg.style.transition = 'scale 2s ease';
                }, 50);
            });
            
          
            setTimeout(() => {
                vegetables.forEach(veg => {
                    veg.style.scale = '';
                    veg.style.transition = '';
                });
                isFalling = false;
            }, 2050);
        }, 2000);
    }, 3500);
    });
}


setTimeout(() => {
    const ocImages = document.querySelectorAll('.OC1, .OC2, .OC3, .bag3-2');
    
    console.log('Found images:', ocImages.length);
    
    if (ocImages.length === 0) {
        console.log('No OC images found');
        return;
    }
    
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = '<img src="" alt="Fullscreen image"><span class="close-modal">&times;</span>';
    document.body.appendChild(modal);

    const modalImg = modal.querySelector('img');
    const closeBtn = modal.querySelector('.close-modal');

    ocImages.forEach((img, index) => {
        console.log(`Adding click listener to image ${index}`);
        img.addEventListener('click', (e) => {
            console.log('Image clicked!');
            modal.style.display = 'flex';
            modalImg.src = img.src;
            document.body.style.overflow = 'hidden';
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}, 100);


const course1 = document.querySelector('.course1');
const course2 = document.querySelector('.course2');
const pagesWrapper = document.querySelector('.pages-wrapper');

if (course1 && course2 && pagesWrapper) {
   
    course1.classList.add('active');
    
    course1.addEventListener('click', () => {
        pagesWrapper.style.transform = 'translateX(0)';
        course1.classList.add('active');
        course2.classList.remove('active');
    });

    course2.addEventListener('click', () => {
        pagesWrapper.style.transform = 'translateX(-50%)';
        course1.classList.remove('active');
        course2.classList.add('active');
    });
}


const animationCards = document.querySelectorAll('.animation-card[data-project], .animation-card2[data-project]');
const yokaiModal = document.getElementById('projectModal');
const lostModal = document.getElementById('lostModal');

if (animationCards.length > 0) {
    animationCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectType = card.getAttribute('data-project');
            let targetModal = null;
            
            if (projectType === 'yokai') {
                targetModal = yokaiModal;
            } else if (projectType === 'lost') {
                targetModal = lostModal;
            }
            
            if (targetModal) {
                targetModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
    });
}


const allModals = [yokaiModal, lostModal];
const closeButtons = document.querySelectorAll('.close-project-modal');

closeButtons.forEach((closeBtn, index) => {
    if (closeBtn && allModals[index]) {
        closeBtn.addEventListener('click', () => {
            allModals[index].style.display = 'none';
            document.body.style.overflow = 'auto';
            const modalVideo = allModals[index].querySelector('.modal-video');
            if (modalVideo) {
                modalVideo.pause();
            }
        });
    }
});

allModals.forEach(modal => {
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
                const modalVideo = modal.querySelector('.modal-video');
                if (modalVideo) {
                    modalVideo.pause();
                }
            }
        });
    }
});

const popAudio = new Audio('asset/pop.mp3');

function playPopSound() {
    popAudio.currentTime = 0;
    popAudio.play().catch((err) => {
        console.error('Không phát được âm thanh:', err);
    });
}

const navLink = document.querySelector('.nav-links');
if (navLink) {
    const navItems = navLink.querySelectorAll('li');
    navItems.forEach(item => {
        item.addEventListener('click', playPopSound);
    });
}

if (portfolio) {
    portfolio.addEventListener('click', playPopSound);
}


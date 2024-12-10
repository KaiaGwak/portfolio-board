// Language Support
const translations = {
    ja: {
        'project-overview': 'プロジェクト概要',
        'tech-stack': '使用技術',
        'live-demo': 'デモを見る',
        'github-link': 'ソースコード',
        'back-to-projects': 'プロジェクト一覧に戻る'
    },
    en: {
        'project-overview': 'Project Overview',
        'tech-stack': 'Technologies Used',
        'live-demo': 'Live Demo',
        'github-link': 'Source Code',
        'back-to-projects': 'Back to Projects'
    }
};

let currentLang = 'ja';

// Project Data (실제로는 API나 데이터베이스에서 가져올 수 있습니다)
const projects = [
    {
        id: 1,
        title: { ja: 'プロジェクト1', en: 'Project 1' },
        category: { ja: 'ウェブ開発', en: 'Web Development' },
        description: {
            ja: '詳細な説明文がここに入ります。',
            en: 'Detailed description goes here.'
        },
        image: 'https://via.placeholder.com/1200x600',
        techStack: ['HTML', 'CSS', 'JavaScript', 'React'],
        github: 'https://github.com/username/project1',
        demo: 'https://project1-demo.com',
        images: [
            'https://via.placeholder.com/800x600',
            'https://via.placeholder.com/800x600'
        ]
    },
    // 더 많은 프로젝트 추가
];

// Get project ID from URL
function getProjectId() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('id'));
}

// Load Project Details
function loadProjectDetails() {
    const projectId = getProjectId();
    const project = projects.find(p => p.id === projectId);
    
    if (!project) {
        window.location.href = 'index.html';
        return;
    }

    // Update page title
    document.title = `${project.title[currentLang]} | Portfolio`;

    // Update content
    document.getElementById('projectTitle').textContent = project.title[currentLang];
    document.getElementById('projectCategory').textContent = project.category[currentLang];
    document.getElementById('projectDescription').textContent = project.description[currentLang];
    document.getElementById('projectImage').src = project.image;
    document.getElementById('projectImage').alt = project.title[currentLang];

    // Update tech stack
    const techList = document.getElementById('techStack');
    techList.innerHTML = project.techStack
        .map(tech => `<li class="tech-item">${tech}</li>`)
        .join('');

    // Update links
    const githubLink = document.getElementById('githubLink');
    const demoLink = document.getElementById('demoLink');
    
    if (project.github) {
        githubLink.href = project.github;
    } else {
        githubLink.style.display = 'none';
    }

    if (project.demo) {
        demoLink.href = project.demo;
    } else {
        demoLink.style.display = 'none';
    }
}

// Update Language
function updateLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    
    // Update translations
    document.querySelectorAll('[data-lang]').forEach(element => {
        const key = element.dataset.lang;
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // Reload project details with new language
    loadProjectDetails();
}

// Image Gallery Navigation
function initializeGallery() {
    const projectId = getProjectId();
    const project = projects.find(p => p.id === projectId);
    
    if (project.images && project.images.length > 1) {
        const gallery = document.querySelector('.project-gallery');
        const dots = document.createElement('div');
        dots.className = 'gallery-dots';
        
        project.images.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'gallery-dot' + (index === 0 ? ' active' : '');
            dot.onclick = () => showImage(index);
            dots.appendChild(dot);
        });
        
        gallery.appendChild(dots);
    }
}

function showImage(index) {
    const projectId = getProjectId();
    const project = projects.find(p => p.id === projectId);
    const mainImage = document.getElementById('projectImage');
    
    mainImage.src = project.images[index];
    
    document.querySelectorAll('.gallery-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

// Event Listeners
document.querySelector('.lang-switch')?.addEventListener('change', (e) => {
    updateLanguage(e.target.value);
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadProjectDetails();
    initializeGallery();
    updateLanguage(currentLang);
});
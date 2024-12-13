// Language translations
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

// State Management
let currentLang = localStorage.getItem('language') || 'ja';
let currentTheme = localStorage.getItem('theme') || 'light';

// Project Data
const projects = [
    {
        id: 1,
        title: { ja: 'プロジェクト1', en: 'Project 1' },
        category: { ja: 'ウェブ開発', en: 'Web Development' },
        description: {
            ja: '詳細な説明文がここに入ります。',
            en: 'Detailed description goes here.'
        },
        image: '/images/project1.jpg',
        techStack: ['HTML', 'CSS', 'JavaScript', 'React'],
        github: 'https://github.com/username/project1',
        demo: 'https://project1-demo.com'
    }
];

// Theme Management
function initTheme() {
    const themeToggle = document.querySelector('.theme-toggle');
    
    function setTheme(theme) {
        document.documentElement.classList.toggle('dark-theme', theme === 'dark');
        themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
        localStorage.setItem('theme', theme);
        currentTheme = theme;
    }

    setTheme(currentTheme);
    
    themeToggle?.addEventListener('click', () => {
        setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });
}

// Language Management
function initLanguage() {
    const langSwitch = document.querySelector('.lang-switch');
    
    function updateLanguage(lang) {
        document.documentElement.lang = lang;
        localStorage.setItem('language', lang);
        currentLang = lang;
        
        document.querySelectorAll('[data-lang]').forEach(element => {
            const key = element.dataset.lang;
            if (translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });
        
        loadProjectDetails();
    }

    langSwitch.value = currentLang;
    updateLanguage(currentLang);

    langSwitch?.addEventListener('change', (e) => {
        updateLanguage(e.target.value);
    });
}

// Project Detail Management
function loadProjectDetails() {
    const projectId = new URLSearchParams(window.location.search).get('id');
    const project = projects.find(p => p.id === parseInt(projectId));

    if (!project) {
        window.location.href = 'index.html';
        return;
    }

    document.title = `${project.title[currentLang]} | Portfolio`;
    document.getElementById('projectTitle').textContent = project.title[currentLang];
    document.getElementById('projectCategory').textContent = project.category[currentLang];
    document.getElementById('projectDescription').textContent = project.description[currentLang];
    document.getElementById('projectImage').src = project.image;
    
    const techList = document.getElementById('techStack');
    techList.innerHTML = project.techStack
        .map(tech => `<li class="tech-item">${tech}</li>`)
        .join('');

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

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initLanguage();
    loadProjectDetails();
});
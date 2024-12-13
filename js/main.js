// Constants and Configurations
const translations = {
    ja: {
        'home': 'ホーム',
        'projects': 'プロジェクト',
        'about': '概要',
        'filter-all': 'すべて',
        'filter-web': 'ウェブ開発',
        'filter-app': 'アプリ開発'
    },
    en: {
        'home': 'Home',
        'projects': 'Projects',
        'about': 'About',
        'filter-all': 'All',
        'filter-web': 'Web Development',
        'filter-app': 'App Development'
    }
};

// Sample project data
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

// State Management
let currentLang = localStorage.getItem('language') || 'ja';
let currentTheme = localStorage.getItem('theme') || 'light';

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
        
        // 프로젝트 목록 새로고침
        initProjects();
    }

    langSwitch.value = currentLang;
    updateLanguage(currentLang);

    langSwitch?.addEventListener('change', (e) => {
        updateLanguage(e.target.value);
    });
}

// Project Management
function initProjects() {
    const projectGrid = document.querySelector('.project-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');

    function createProjectCard(project) {
        return `
            <article class="project-card">
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title[currentLang]}">
                </div>
                <div class="project-content">
                    <h3>${project.title[currentLang]}</h3>
                    <span class="project-category">${project.category[currentLang]}</span>
                    <p class="project-description">${project.description[currentLang]}</p>
                    <div class="project-links">
                        <a href="project-detail.html?id=${project.id}" class="button">詳細を見る</a>
                    </div>
                </div>
            </article>
        `;
    }

    function filterProjects(category) {
        const filteredProjects = category === 'all' 
            ? projects 
            : projects.filter(project => project.category[currentLang].toLowerCase().includes(category));

        projectGrid.innerHTML = filteredProjects.map(createProjectCard).join('');
        
        filterButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.category === category);
        });
    }

    filterButtons?.forEach(btn => {
        btn.addEventListener('click', () => filterProjects(btn.dataset.category));
    });

    filterProjects('all');
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initLanguage();
    initProjects();
});
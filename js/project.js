// URL에서 프로젝트 ID 가져오기
function getProjectId() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

// 프로젝트 데이터 (나중에 서버에서 가져올 수 있음)
const projectDetails = {
    1: {
        title: "프로젝트 1",
        category: "웹 개발",
        description: "이 프로젝트는 웹 개발 프로젝트입니다. 상세한 설명이 들어갑니다.",
        techStack: ["HTML", "CSS", "JavaScript"],
        features: ["반응형 디자인", "다크 모드", "사용자 인증"],
        image: "https://via.placeholder.com/800x400",
        github: "#",
        demo: "#"
    }
    // 다른 프로젝트들 추가 가능
};

// 페이지 로드 시 프로젝트 정보 표시
document.addEventListener('DOMContentLoaded', () => {
    const projectId = getProjectId();
    const project = projectDetails[projectId];

    if (project) {
        document.querySelector('.project-title').textContent = project.title;
        document.querySelector('.project-category').textContent = project.category;
        document.querySelector('.project-description').textContent = project.description;
        document.querySelector('.project-images img').src = project.image;
        
        // 기술 스택 표시
        const techList = document.querySelector('.tech-stack');
        techList.innerHTML = project.techStack
            .map(tech => `<li>${tech}</li>`)
            .join('');
        
        // 주요 기능 표시
        const featureList = document.querySelector('.features');
        featureList.innerHTML = project.features
            .map(feature => `<li>${feature}</li>`)
            .join('');
    }
});
// 다크모드 관리 (project.js에 추가)
function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const isDark = localStorage.getItem('darkMode') === 'true';
    
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    darkModeToggle.textContent = isDark ? '☀️' : '🌙';
    
    darkModeToggle.addEventListener('click', () => {
        const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
        const newTheme = isDarkMode ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('darkMode', !isDarkMode);
        darkModeToggle.textContent = isDarkMode ? '🌙' : '☀️';
    });
}

// 기존의 DOMContentLoaded 이벤트에 다크모드 초기화 추가
document.addEventListener('DOMContentLoaded', () => {
    const projectId = getProjectId();
    const project = projectDetails[projectId];
    // ... 기존 코드 ...
    
    initDarkMode();  // 다크모드 초기화 추가
});
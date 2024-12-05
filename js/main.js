// 프로젝트 데이터
const projects = [
    {
        id: 1,
        title: "프로젝트 1",
        category: "웹 개발",
        description: "첫 번째 프로젝트 설명입니다. 이 프로젝트는 어떤 기술을 사용했고, 어떤 문제를 해결했는지 설명합니다.",
        image: "https://via.placeholder.com/300x200",
    },
    {
        id: 2,
        title: "프로젝트 2",
        category: "앱 개발",
        description: "두 번째 프로젝트 설명입니다. 이 프로젝트는 어떤 기술을 사용했고, 어떤 문제를 해결했는지 설명합니다.",
        image: "https://via.placeholder.com/300x200",
    },
    {
        id: 3,
        title: "프로젝트 3",
        category: "웹 개발",
        description: "세 번째 프로젝트 설명입니다. 이 프로젝트는 어떤 기술을 사용했고, 어떤 문제를 해결했는지 설명합니다.",
        image: "https://via.placeholder.com/300x200",
    }
];

// 프로젝트 카드 HTML 생성
function createProjectCard(project) {
    return `
        <article class="project-card">
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}">
            </div>
            <div class="project-content">
                <h3>${project.title}</h3>
                <p class="project-category">${project.category}</p>
                <p class="project-description">${project.description}</p>
                <div class="project-links">
                    <a href="project.html?id=${project.id}" class="button">자세히 보기</a>
                </div>
            </div>
        </article>
    `;
}

// 프로젝트 필터링 및 표시
function filterProjects(category) {
    const filteredProjects = category === 'all' 
        ? projects 
        : projects.filter(project => project.category === category);
    
    const projectGrid = document.querySelector('.project-grid');
    projectGrid.innerHTML = filteredProjects.map(project => createProjectCard(project)).join('');
}

// 버튼 클릭 이벤트 처리
function handleFilterClick(e) {
    if (!e.target.classList.contains('filter-btn')) return;
    
    // 활성 버튼 스타일 변경
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    e.target.classList.add('active');
    
    // 프로젝트 필터링
    filterProjects(e.target.dataset.category);
}

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', () => {
    filterProjects('all');  // 초기 프로젝트 표시
    document.querySelector('.filter-buttons').addEventListener('click', handleFilterClick);
});
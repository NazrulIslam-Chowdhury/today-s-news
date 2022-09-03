const loadCategories = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    displayCategories(data.data.news_category);
}
const displayCategories = (categories) => {
    const categoryContainer = document.getElementById('categories-container');
    categories.forEach(category => {
        const categoryPara = document.createElement('li');
        categoryPara.classList.add('category')
        categoryPara.innerHTML = `<li>${category.category_name}</li>`;
        categoryContainer.appendChild(categoryPara);

    });
}

const loadNews = async () => {
    const url = `https://openapi.programming-hero.com/api/news/category/01`;
    const res = await fetch(url);
    const data = await res.json();
    displayNews(data.data);
}
const displayNews = (newes) => {
    const newsContainer = document.getElementById('news-container');
    newes.forEach(news => {
        // console.log(news);
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('card');
        newsDiv.innerHTML = `
        <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${news.image_url}" class="img-fluid rounded-start" alt="...">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">Card title</h5>
                                <p class="card-text">This is a wider card with supporting text below as a natural
                                    lead-in to
                                    additional content. This content is a little bit longer.</p>
                                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                            </div>
                        </div>
                    </div>
        `;
        newsContainer.appendChild(newsDiv);
    });
}
loadNews()
loadCategories();
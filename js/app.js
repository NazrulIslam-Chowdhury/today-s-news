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
        // categoryPara.classList.add('category')
        categoryPara.innerHTML = `<a class="category text-dark" onclick="toggleSpinner('${(true)}'),loadNews('${category.category_id}')" href="#">${category.category_name}</a>`;
        categoryContainer.appendChild(categoryPara);

    });

}

const loadNews = async (id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayNews(data.data);
}
const displayNews = (newses) => {

    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';

    newses.forEach(news => {
        console.log(news);
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('card');
        newsDiv.innerHTML = `
        <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${news.image_url}" class="img-fluid rounded-start" alt="...">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title fw-bold">${news.title}</h5>
                                <p class="card-text mt-4">${news.details.slice(0, 300)}...</p>
                        <div class="d-flex>
                            <div class="author-img w-25 h-25">
                                <img src="${news.author.img}alt="...">
                            </div>
                             <div>
                                <p>${news.author.name}</p>
                                <p>${news.author.published_date}</p>
                            </div>
                            <p>${news.total_view}</p>
                        </div>
                                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                            </div>
                        </div>
                    </div>
        `;
        newsContainer.appendChild(newsDiv);
        const newsContainerNode = document.querySelector('#news-container')
        const resultContainer = document.getElementById('result-container');
        resultContainer.innerText = `${newsContainerNode.childNodes.length} results found`;
    });
    toggleSpinner(false);
}

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    }
    else {
        loaderSection.classList.add('d-none')
    }
}

loadCategories('Breaking News');
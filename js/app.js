const loadCategories = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    displayCategories(data.data.news_category);
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/news/categories`);
        const data = await res.json();
        // console.log(data);
    }
    catch {

    }
}
const displayCategories = (categories) => {
    // console.log(categories);
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
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${id}`);
        const data = await res.json();
        // console.log(data);
    }
    catch {

    }
}
const displayNews = (newses) => {
    // console.log(newses);
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
                            </div>
                            <div class="d-flex flex-row ms-2 justify-content-around">
                            <div class="d-flex">
                                <img  class="author-img rounded-circle" src="${news.author.img}alt="...">
                            
                            <div class="ms-2">
                                <p>${news.author.name}</p>
                                <p>${news.author.published_date}</p>
                            </div>
                            </div>
                            <p>${news.total_view}</p>
                            <p>${news.rating.number}</p>
                            <div>
                            <button onclick="loadNewsDetail('${news._id}')" class="bg-info p-2 fw-semibold rounded" data-bs-toggle="modal" data-bs-target="#newsDetailModal">Read More</button>
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
const loadNewsDetail = async (news_id) => {
    const url = ` https://openapi.programming-hero.com/api/news/${news_id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayNewsDetail(data.data[0]);
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${categoryId}`);
        const data = await res.json();
        // console.log(data);
    }
    catch {

    }
}

const displayNewsDetail = (news) => {
    console.log(news);
    const modalTitle = document.getElementById('newsDetailModalLabel');
    modalTitle.innerText = 'News Details';
    const newsDetailContainer = document.getElementById('details-modal');
    newsDetailContainer.innerHTML = `
    <p class="fs-3">Category Id:${news.category_id}</p>
    <img class="w-25 h-25" src="${news.author.img}" class="img-fluid rounded-start" alt="...">
    <p><b>News Title</b>:${news.title.slice(0, 100)}...</p>
    <p><b>News Details</b>:${news.details.slice(0, 100)}...</p>
    <p><b>Author Name</b>:${news.author ? news.author.name : 'Author name not found'}</p>
    <p><b>Published Date</b>:${news.author.published_date}</p>
    <p><b>Total Views</b>:${news ? news.total_view : 'No views yet'}
    `;

}

loadCategories();
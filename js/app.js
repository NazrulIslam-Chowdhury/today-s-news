const loadCategories = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    const res = await fetch(url);
    const data = await res.json();
    displayCategories(data.data.news_category);
}
const displayCategories = (categories) => {
    const categoryContainer = document.getElementById('categories-container');
    categories.forEach(category => {
        const categoryPara = document.createElement('p');
        categoryPara.classList.add('category')
        categoryPara.innerText = `${category.category_name}`;
        categoryContainer.appendChild(categoryPara);
    });
}

loadCategories();
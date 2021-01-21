let articleId = "5fb52db434ac093b88d9bf05"

const theContent= document.querySelector('.main') //stocker les données

const getDetails=document.querySelector('.allArticles')

const url = `http://localhost:3000/api/articles`;


// AFFICHER TOUS LES ARTICLES :

const renderArticles = ()=>{

    fetch(`${url}`)
        .then(res => res.json())
        .then(data => generateAllArticles(data));
    }


const generateAllArticles = (articles) =>{
    console.log(articles)
    const theArticles = articles["articles"] //dictionnaire nomdudictionnaire["clef"]
    console.log(theArticles)
    console.log(theArticles[3])
    finalHtml = ""

    theArticles.forEach(article => {
        console.log(article)
        const output = `
    <div class="miniatures">
                <img src="${article.heroImage}"</img>
                <h5>${article.articleTitle}</h5>
                <button class="btn" onclick="renderArticle('${article._id}')">Lire la suite</button>
            </img>
    </div>
    
        `
    finalHtml=finalHtml+output //stocker le html généré au fur à mesure
    });
    getDetails.innerHTML = finalHtml; //remplacer tout le html stocké en fin de boucle pour l'afficher
    console.log(getDetails)
}    

// FORMULAIRE

const addPostForm = document.querySelector(".add-post-form");
const titleValue = document.getElementById("articleTitle");
const descriptionValue = document.getElementById("description");
const urlRessourceValue = document.getElementById("urlRessource");
const heroImageValue = document.getElementById("heroImage");

// Create - Insert new post
// Methode : POST
addPostForm.addEventListener("submit", (e) => {
  e.preventDefault(); // So browser won't reload when clicked
  fetch("http://localhost:3000/api/articles", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      articleTitle: titleValue.value,
      urlRessource: urlRessourceValue.value,
      description: descriptionValue.value,
      heroImage: heroImageValue.value,
    })
  })
  .then(res => res.json())
  .then(data => {
    const dataArr = [];
    dataArr.push(data); // the push method add elements to the end of an array & returns the lenght of the array formed
    generateHtml(dataArr);
  })

  // Reset input fields to empty
  titleValue.value = "";
  descriptionValue.value = "";
  urlRessourceValue.value = "";
  heroImageValue.value = "";
})




// AFFICHER UN SEUL ARTICLE :

const renderArticle = (id)=>{

fetch(`${url}/${id}`)
    .then(res => res.json())
    .then(data => generateHtml(data));
}

const generateHtml=(art) =>{
    console.log(art)
    const article = art["article"]
    const html=`
    <div class="heroImage"><style>.heroImage{background-image:url(${article.heroImage});}</style>
        <div class="row">    
            <div class="column column-12"></div>
            <div class="column column-75 opacity">
                <h1><div class="articleTitle">${article.articleTitle}</div></h1>
            </div>
            <div class="column column-12"></div>
        </div>    
    </div>
    <div class="urlRessource"><h3><a href="${article.urlRessource}" alt="url de la ressource">${article.urlRessource}</a></h3></div>
    <div class="row">    
        <div class="column column-12"></div>
        <div class="column column-75"> 
            <div class="description"><p>${article.description}</p></div> 
        </div>
        <div class="column column-12"></div>
    </div> 
        `
        theContent.innerHTML=html 
        console.log(theContent)
}



renderArticles();

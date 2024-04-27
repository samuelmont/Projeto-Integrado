const main = async() => {
    // numeros que serão passados ao url
    const num = 20; // Quantidade de valores que serão carregados
    let offset = 0; // Número de que apartir começará a pesquisa
    
    load(`&num=${num}&offset=${offset}`);
    offset = offset + 20;

    // Carregar mais quando chegar ao final da pagina
    window.addEventListener("scroll", () => {
        const endOfPage = window.innerHeight + window.scrollY >= document.body.offsetHeight;
        const searchInput = document.getElementById('search-input');
        if(endOfPage && searchInput.value == "") {
            load(`&num=${num}&offset=${offset}`);
            offset = offset + 20;
            console.log('scroll')
        }
    });

    window.addEventListener("keyup", () => {
        const searchInput = document.getElementById('search-input');
        if(searchInput.value) {
            offset = 0;
            deleteCards();
            load(`&fname=${searchInput.value}`);
            console.log(searchInput.value)
        } else if(searchInput.value == "") {
            offset = 0;
            deleteCards();
            load(`&num=${num}&offset=${offset}`);
            console.log(searchInput.value)
        }
    })
}

const deleteCards = () => {
    const container = document.getElementById('main-container'); // Container principal
    container.innerHTML = ''
}

// Função que utiliza as funçoes: search() e passa os dados por loop ao createElements()
const load = async (params) => {
    const dataJson = await search(params);
    dataJson.forEach(element => {
        createElements(element);
    });
}

// Função que busca dados na API
const search = async (params) => {
    let url = `https://db.ygoprodeck.com/api/v7/cardinfo.php?type=spell%20card`;
    if (params != '') {
        url = url + params
    }
    console.log(url); // TIRAR DEPOIS
    const response = await fetch(url);
    const data = await response.json();
    return data.data;
}

// Função que declara e insere os elementos no HTML
const createElements = (element) => {
    const container = document.getElementById('main-container'); // Container principal

    // Criando elementos
    const cardDiv = document.createElement('div');
    const cardImg = document.createElement('img');
    const dataDiv = document.createElement('div');
    const title = document.createElement('h1');
    const attSpan = document.createElement('span');
    const iconType = document.createElement('img');
    const typeText = document.createElement('h2');
    const iconRace = document.createElement('img');
    const raceText = document.createElement('h2');
    const iconArchetype = document.createElement('img');
    const archetypeText = document.createElement('h2');
    const description = document.createElement('p');

    // Criando os textNode
    const titleTextNode = document.createTextNode(element.name);
    const typeTextNode = document.createTextNode(element.type);
    const raceTextNode = document.createTextNode(element.race);
    const archetypeTextNode = document.createTextNode(element.archetype);
    const descriptionTextNode = document.createTextNode(element.desc);
    
    // Setando as classes
    cardDiv.setAttribute('class', 'card');
    cardImg.setAttribute('class', 'card-image');
    dataDiv.setAttribute('class', 'data-card');
    title.setAttribute('class', 'title');
    attSpan.setAttribute('class', 'atributes-container');
    iconType.setAttribute('class', 'icon-type');
    typeText.setAttribute('class', 'type');
    iconRace.setAttribute('class', 'icon-race');
    raceText.setAttribute('class', 'race');
    iconArchetype.setAttribute('class', 'icon-archetype');
    archetypeText.setAttribute('class', 'archetype');
    description.setAttribute('class', 'description');
    
    // Setando os URL's das imagens
    cardImg.setAttribute('src', element.card_images[0].image_url_small);
    iconType.setAttribute('src', `https://images.ygoprodeck.com/images/cards/icons/${element.type}.jpg`);
    iconRace.setAttribute('src', `https://images.ygoprodeck.com/images/cards/icons/race/${element.race}.png`);
    iconArchetype.setAttribute('src', `./imgs/archetype.svg`);

    // Setando os textos alternativos das imagens
    cardImg.setAttribute('alt', 'picture of an Yu-Gi-Oh card');
    iconType.setAttribute('alt', 'icon type card');
    iconRace.setAttribute('alt', 'icon race card');
    iconArchetype.setAttribute('alt', 'simplified potion image');

    // Inserindo os textNode nas tag HTML
    title.appendChild(titleTextNode);
    typeText.appendChild(typeTextNode);
    raceText.appendChild(raceTextNode);
    archetypeText.appendChild(archetypeTextNode);
    description.appendChild(descriptionTextNode);

    // Inserindo os elementos no HTML
    container.appendChild(cardDiv);
    cardDiv.appendChild(cardImg);
    cardDiv.appendChild(dataDiv);
    dataDiv.appendChild(title);
    dataDiv.appendChild(attSpan);
    attSpan.appendChild(iconType);
    attSpan.appendChild(typeText);
    attSpan.appendChild(iconRace);
    attSpan.appendChild(raceText);
    attSpan.appendChild(iconArchetype);
    attSpan.appendChild(archetypeText);
    dataDiv.appendChild(description);
}

main();
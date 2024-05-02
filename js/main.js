const num = 20; // Quantidade de objetos que serão carregados
let loadMore = true;

const main = async() => {
    // numeros que serão passados ao url
    let offset = 0; // Número de que apartir dele começará a pesquisa
    let params = ``; // Parametros adicionais de busca
    
    load(`?&num=${num}&offset=${offset}`);
    offset = offset + num;

    window.addEventListener("keyup", (e) => {
        const searchInput = document.getElementById('search-input');
        if(e.key === "Enter" && searchInput.value != "") {
            offset = 0;
            deleteCards();
            params = `fname=${searchInput.value}`;
            load(`?${params}&num=${num}&offset=${offset}`);
            offset = offset + num;
        } else if(e.key === "Backspace" && searchInput.value == "") {
            params = ``;
            loadMore = true;
            offset = 0;
            deleteCards();
            load(`?num=${num}&offset=${offset}`);
            offset = offset + num;
        }
    })

    // Carregar mais quando chegar ao final da pagina
    window.addEventListener("scroll", () => {
        const endOfPage = window.innerHeight + window.scrollY >= document.body.offsetHeight;
        if(endOfPage && params != "") {
            load(`?${params}&num=${num}&offset=${offset}`);
            offset = offset + num;
        } else if(endOfPage) {
            load(`?num=${num}&offset=${offset}`);
            offset = offset + num;
        }
    });
}

// Função que utiliza as funçoes: search() e passa os dados por loop ao createElements()
const load = async (params) => {
    if(loadMore) {
        const dataJson = await search(params);
        if(dataJson != undefined) {
            if(dataJson.length != num) {
                loadMore = false;
            }
            dataJson.forEach(element => {
                createElements(element);
            });
        }
    }
}

const deleteCards = () => {
    const container = document.getElementById('main-container'); // Container principal
    container.innerHTML = '';
}

// Função que busca dados na API
const search = async (params) => {
    let url = `https://db.ygoprodeck.com/api/v7/cardinfo.php`;
    if (params != '') {
        url = url + params;
    }
    const response = await fetch(url);
    const data = await response.json();
    if(data.data != undefined) {
        return data.data;
    }
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
    const description = document.createElement('p');

    // Criando os textNode
    const titleTextNode = document.createTextNode(element.name);
    const typeTextNode = document.createTextNode(element.type);
    const raceTextNode = document.createTextNode(element.race);
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
    description.setAttribute('class', 'description');
    
    // Setando os URL's das imagens
    cardImg.setAttribute('src', element.card_images[0].image_url_small);
    iconType.setAttribute('src', `https://images.ygoprodeck.com/images/cards/icons/${element.type}.jpg`);
    iconRace.setAttribute('src', `https://images.ygoprodeck.com/images/cards/icons/race/${element.race}.png`);

    // Setando os textos alternativos das imagens
    cardImg.setAttribute('alt', 'picture of an Yu-Gi-Oh card');
    iconType.setAttribute('alt', 'icon type card');
    iconRace.setAttribute('alt', 'icon race card');

    // Inserindo os textNode nas tag HTML
    title.appendChild(titleTextNode);
    typeText.appendChild(typeTextNode);
    raceText.appendChild(raceTextNode);
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

    if(element.level) {
        const iconLevel = document.createElement('img');
        iconLevel.setAttribute('class', 'icon-level');
        iconLevel.setAttribute('src', `https://ygoprodeck.com/wp-content/uploads/2017/01/level.png`); 
        iconLevel.setAttribute('alt', 'red circle with a yellow star inside'); 
        const levelText = document.createElement('h2');
        levelText.setAttribute('class', 'level');
        const levelTextNode = document.createTextNode(element.level);
        levelText.appendChild(levelTextNode);
        attSpan.appendChild(iconLevel);
        attSpan.appendChild(levelText);
    }

    if(element.atk) {
        const iconAtk = document.createElement('img');
        iconAtk.setAttribute('class', 'icon-atk');
        iconAtk.setAttribute('src', `./imgs/atk.svg`); 
        iconAtk.setAttribute('alt', 'white sword icon'); 
        const atkText = document.createElement('h2');
        atkText.setAttribute('class', 'atk');
        const atkTextNode = document.createTextNode(element.atk);
        atkText.appendChild(atkTextNode);
        attSpan.appendChild(iconAtk);
        attSpan.appendChild(atkText);
    }

    if(element.def) {
        const iconDef = document.createElement('img');
        iconDef.setAttribute('class', 'icon-def');
        iconDef.setAttribute('src', `./imgs/def.svg`); 
        iconDef.setAttribute('alt', 'white shield icon'); 
        const defText = document.createElement('h2');
        defText.setAttribute('class', 'def');
        const defTextNode = document.createTextNode(element.def);
        defText.appendChild(defTextNode);
        attSpan.appendChild(iconDef);
        attSpan.appendChild(defText);
    }

    if (element.archetype) { // Se tiver arquetipo ele irá ser adicionado
        const iconArchetype = document.createElement('img');
        iconArchetype.setAttribute('class', 'icon-archetype');
        iconArchetype.setAttribute('src', `./imgs/archetype.svg`); 
        iconArchetype.setAttribute('alt', 'simplified potion image'); 
        const archetypeText = document.createElement('h2');
        archetypeText.setAttribute('class', 'archetype');
        const archetypeTextNode = document.createTextNode(element.archetype);
        archetypeText.appendChild(archetypeTextNode);
        attSpan.appendChild(iconArchetype);
        attSpan.appendChild(archetypeText);
    }

    dataDiv.appendChild(description);
}

main();
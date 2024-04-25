const search = async () => {
    const url = "https://db.ygoprodeck.com/api/v7/cardinfo.php?type=spell%20card";
    const response = await fetch(url);
    const data = await response.json();
    return data.data;
}

const main = async () => {
    const dados = await search();
    // dados.forEach(element => {
    //     createElements(element)
    // });
    createElements(dados[0])
}

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
    const cardUrl = document.createTextNode(element.card_images[0].image_url_small);
    console.log(element.card_images[0].image_url_small);
    const titleTextNode = document.createTextNode(element.name);
    const typeUrl = document.createTextNode(`https://images.ygoprodeck.com/images/cards/icons/${element.type}.jpg`);
    console.log(`https://images.ygoprodeck.com/images/cards/icons/${element.type}.jpg`)
    const typeTextNode = document.createTextNode(element.type);
    const raceUrl = document.createTextNode(`https://images.ygoprodeck.com/images/cards/icons/race/${element.race}.png`);
    const raceTextNode = document.createTextNode(element.race);
    const archetypeUrl = document.createTextNode(`./imgs/archetype.svg`);
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

    // Setando os texto alternativo das imagens
    cardImg.setAttribute('alt', 'picture of an Yu-Gi-Oh card');
    iconType.setAttribute('alt', 'icon type card');
    iconRace.setAttribute('alt', 'icon race card');
    iconArchetype.setAttribute('alt', 'simplified potion image');

    // Inserindo os textNode nas tag HTML
    cardImg.appendChild(cardUrl);
    title.appendChild(titleTextNode);
    iconType.appendChild(typeUrl);
    typeText.appendChild(typeTextNode);
    iconRace.appendChild(raceUrl);
    raceText.appendChild(raceTextNode);
    iconArchetype.appendChild(archetypeUrl);
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

main()
const search = async () => {
    const url = "https://db.ygoprodeck.com/api/v7/cardinfo.php?type=spell%20card&language=pt";
    const response = await fetch(url);
    const data = await response.json();
    return data.data;
}

const main = async () => {
    const dados = await search();
    console.log(dados)
    dados.forEach(element => {
        createElements(element)
    });
    // dados.forEach(element => iterar(element));
}

const createElements = (element) => {
    const container = document.getElementById('main-container'); // Container principal

    // Criando elementos
    const cardDiv = document.createElement('div');
    const cardImg = document.createElement('img');
    const dataDiv = document.createElement('div');
    const title = document.createElement('h1');
    const attDiv = document.createElement('span');
    const iconType = document.createElement('img');
    const typeText = document.createElement('h2');
    const iconRace = document.createElement('img');
    const raceText = document.createElement('h2');
    const iconArchetype = document.createElement('img');
    const archetypeText = document.createElement('h2');
    const description = document.createElement('p');

    // Setando os atributos


}

main()
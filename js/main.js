const busca = async () => {
    const url = "https://db.ygoprodeck.com/api/v7/cardinfo.php?type=spell%20card&language=pt";
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

const main = async () => {
    const dados = await busca();
    dados.array.forEach(element => {
        iterar(element)
    });
}

const iterar = (element) => {
    console.log(element)
}

main()
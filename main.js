//info importante não apague
const breedSelect = document.getElementById('breed-select');
const fetchBtn = document.getElementById('fetch-btn');
const loadingElement = document.getElementById('carregando');
const imagesContainer = document.getElementById('images-container');

// Aqui vai ficar todas as raças é uma var global
let allBreeds = [];

// Coleta todas as raças e as coloca na lista do escolha
async function fetchAllBreeds() {
    try {
        loadingElement.textContent = "Espere um pouquinho";
        
        const response = await fetch('https://dog.ceo/api/breeds/list/all');
        const data = await response.json();
        
        allBreeds = Object.keys(data.message);
        
        // Aqui será gerado as opções de raças 
        allBreeds.forEach(breed => {
            const option = document.createElement('option');
            option.value = breed;
            option.textContent = breed.charAt(0).toUpperCase() + breed.slice(1);
            breedSelect.appendChild(option);
        });
        //Texto para avisar
        loadingElement.textContent = "Selecione e aperte 'Demonstrar cachorros'";
      //Em caso de erro  
    } catch (error) {
        console.error('Erro ao coletar raças:', error);
        loadingElement.textContent = 'Falha ao carregar raças. Por favor recarregue a página.';
    }
}
// async function breedName() {
    // nome = option.breed
    // document.querySelector("name")
//}
// coleta imagens da raça escolhida
async function fetchBreedImages() {
    const selectedBreed = breedSelect.value;
    
    if (!selectedBreed) {
        alert('Selecione uma raça');
        return;
    }
    
    try {
        loadingElement.textContent = `Carregando imagens de ${selectedBreed}...`;
        imagesContainer.innerHTML = '';
        
        // Opção para coletar multiplas imagens Obs(Não funciona porcausa das alterações)
        const response = await fetch(`https://dog.ceo/api/breed/${selectedBreed}/images/random/1`);
        const data = await response.json();
        
        if (data.message.length === 0) {
            loadingElement.textContent = `Nenhuma imagem encontrada para ${selectedBreed}`;
            return;
        }
        
        // demonstra imagens
        data.message.forEach(imageUrl => {
            const imgElement = document.createElement('img');
            imgElement.src = imageUrl;
            imgElement.alt = selectedBreed;
            imgElement.className = 'dog-image';
            imagesContainer.appendChild(imgElement);
        });
        
        loadingElement.textContent = `Mostrando ${data.message.length} imagens de ${selectedBreed}`;
    } catch (error) {
        console.error(`Error fetching images for ${selectedBreed}:`, error);
        loadingElement.textContent = `Failed to load images for ${selectedBreed}. Please try again.`;
    }
}

// Necessário senão o programa explode (tentei colocar no botão, mas não tenho conhecimento o suficiente)
fetchBtn.addEventListener('click', fetchBreedImages);

// Vai inicializar o Programa
document.addEventListener('DOMContentLoaded', fetchAllBreeds);
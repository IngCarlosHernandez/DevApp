// 1. Array de datos (Imágenes y sus Títulos)
const imagesData = [
    { url: 'img/Pallet_Soldadura.jpg', title: 'Pallet para soldadura' },
    { url: 'img/Maquinado_Fresadora.jpg', title: 'Maquinado Fresadora' },
    { url: 'img/Mecanizado_Acero.jpg', title: 'Pieza en inoxidable' },
    { url: 'img/Pieza_Baleros.jpg', title: 'Pieza para Balero' },
    { url: 'img/Pieza_Husillo.jpg', title: 'Pieza para Husillo' },
    { url: 'img/Pieza_Mecanizada.jpeg', title: 'Pieza Mecanizada' },
    { url: 'img/Piezas_Ensamble.webp', title: 'Piezas para ensamble' },
    // **NOTA:** Asegúrate de reemplazar 'img/...' con las rutas reales de tus imágenes
];

// 2. Referencias a elementos del DOM
const carouselTrack = document.querySelector('.carousel-track');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const currentTitleElement = document.getElementById('current-title');

// 3. Variables de estado del carrusel
let currentIndex = 0; // Índice de la primera imagen visible
const slidesPerPage = 3; // Cuántas imágenes se ven a la vez
const totalImages = imagesData.length;

// 4. Función para renderizar todas las imágenes en el track
function renderSlides() {
    carouselTrack.innerHTML = ''; // Limpiar el track
    imagesData.forEach(imageData => {
        const slideDiv = document.createElement('div');
        slideDiv.classList.add('carousel-slide');
        
        const img = document.createElement('img');
        img.src = imageData.url;
        img.alt = imageData.title;
        
        const title = document.createElement('h3');
        title.classList.add('slide-title');
        title.textContent = imageData.title;
        
        slideDiv.appendChild(img);
        slideDiv.appendChild(title);
        carouselTrack.appendChild(slideDiv);
    });
    // Ajustar el ancho del track para que contenga todas las slides
    carouselTrack.style.width = `${(totalImages / slidesPerPage) * 100}%`;
}

// 5. Función para mover el carrusel
function moveCarousel() {
    // Calculamos el porcentaje de desplazamiento. Cada "paso" es el 100% de la ventana.
    // Si queremos que se muevan de 3 en 3, cada imagen individual es 100%/3.
    // El currentIndex es el índice de la primera imagen VISIBLE.
    const offset = -currentIndex * (100 / slidesPerPage); 
    carouselTrack.style.transform = `translateX(${offset}%)`;

    // Actualizar el título principal (puedes elegir mostrar el de la primera imagen visible, o la central)
    // Aquí mostramos el título de la imagen central visible
    const centerImageIndex = currentIndex + Math.floor(slidesPerPage / 2);
    if (imagesData[centerImageIndex]) {
        currentTitleElement.textContent = imagesData[centerImageIndex].title;
    } else {
        currentTitleElement.textContent = ''; // Limpiar si no hay imagen central
    }

    updateButtonStates();
}

// 6. Función para actualizar el estado de los botones (habilitar/deshabilitar)
function updateButtonStates() {
    prevButton.disabled = currentIndex === 0;
    // Si la última imagen visible es la última imagen de los datos, deshabilitar Siguiente
    nextButton.disabled = (currentIndex + slidesPerPage) >= totalImages;
}

// 7. Event Listeners para los botones
nextButton.addEventListener('click', () => {
    if ((currentIndex + slidesPerPage) < totalImages) {
        currentIndex++; // Avanza una imagen a la vez
        moveCarousel();
    }
});

prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--; // Retrocede una imagen a la vez
        moveCarousel();
    }
});

// 8. Inicialización del carrusel
renderSlides();
moveCarousel(); // Muestra la primera vista y actualiza botones/título
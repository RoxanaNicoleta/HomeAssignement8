//TMDB

const API_KEY = 'api_key=1cf50e6248dc270629e802686245c2c8';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?'+API_KEY;


const main=document.getElementById('main');
getMovies(API_URL);
  
function getMovies(url){
    fetch(url).then(res => res.json()).then(data=>{
        showMovies(data.results);    
    })
}

function showMovies(data){
    main.innerHTML='';
    
    data.forEach(movie=> {
        const {title, poster_path,vote_average, overview }=movie;
        const movieEl=document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML= `
            <img src="${IMG_URL + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}"> ${vote_average}</span>
            </div>

            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        `

        main.appendChild(movieEl);
        
    })
}

function getColor(vote){
    if(vote >=8){
        return 'green'
    }
    else if(vote>=5){
        return "orange"
    }
    else{
        return 'red'
    }
}

startImageTransition();
      
    function startImageTransition() {
        var images = document.getElementsByClassName("change");
        for (var i = 0; i < images.length; ++i) {
            images[i].style.opacity = 1;
        }
      
        var top = 1;
        var cur = images.length - 1;
        setInterval(changeImage, 3000);
      
        async function changeImage() {
            var nextImage = (1 + cur) % images.length;
            images[cur].style.zIndex = top + 1;
            images[nextImage].style.zIndex = top;
            await transition();
            images[cur].style.zIndex = top;
            images[nextImage].style.zIndex = top + 1;
            top = top + 1;
            images[cur].style.opacity = 1;
            cur = nextImage;
        }
      
        function transition() {
            return new Promise(function (resolve, reject) {
                var del = 0.01;
                var id = setInterval(changeOpacity, 10);
                function changeOpacity() {
                    images[cur].style.opacity -= del;
                    if (images[cur].style.opacity <= 0) {
                        clearInterval(id);
                        resolve();
                    }
                }
            })
        }
    }
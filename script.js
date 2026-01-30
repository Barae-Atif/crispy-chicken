const KEY = "staybnb_favorites";

function getFavs(){
  return JSON.parse(localStorage.getItem(KEY)) || [];
}

function saveFavs(favs){
  localStorage.setItem(KEY, JSON.stringify(favs));
}

function toggleFav(item){
  let favs = getFavs();
  const exists = favs.find(x => x.id === item.id);

  if(exists){
    favs = favs.filter(x => x.id !== item.id);
  }else{
    favs.push(item);
  }
  saveFavs(favs);
}

function setupFavButtons(){
  document.querySelectorAll(".card[data-id]").forEach(card=>{
    const btn = card.querySelector(".fav");

    const item = {
      id: card.dataset.id,
      city: card.dataset.city,
      title: card.dataset.title,
      price: card.dataset.price,
      rating: card.dataset.rating,
      img: card.dataset.img
    };

    const saved = getFavs().some(x=>x.id===item.id);
    btn.textContent = saved ? "♥" : "♡";
    btn.classList.toggle("active", saved);

    btn.addEventListener("click", ()=>{
      toggleFav(item);
      const now = getFavs().some(x=>x.id===item.id);
      btn.textContent = now ? "♥" : "♡";
      btn.classList.toggle("active", now);
    });
  });
}

function showFavorites(){
  const box = document.getElementById("favoritesBox");
  if(!box) return;

  const favs = getFavs();
  if(favs.length === 0){
    box.innerHTML = "<p>No favorites yet.</p>";
    return;
  }

  box.innerHTML = favs.map(item=>`
    <div class="card">
      <img src="${item.img}">
      <div class="body">
        <div class="city">${item.city}</div>
        <h3>${item.title}</h3>
        <div class="row">
          <span>$${item.price}/night</span>
          <span>⭐ ${item.rating}</span>
        </div>
        <button class="fav active" data-remove="${item.id}">♥ Remove</button>
      </div>
    </div>
  `).join("");

  box.querySelectorAll("[data-remove]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const id = btn.dataset.remove;
      saveFavs(getFavs().filter(x=>x.id!==id));
      showFavorites();
    });
  });
}

document.addEventListener("DOMContentLoaded", ()=>{
  setupFavButtons();
  showFavorites();
});

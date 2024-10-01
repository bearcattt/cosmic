async function loadGameList() {
  try {
    const response = await fetch("./assets/json/games.json");

    if (!response.ok) {
      console.error("Error finding the file.");
      return null;
    }

    const gamelist = await response.json();
    return gamelist;
  } catch (error) {
    console.error("Failed to fetch the list of games:", error);
    return null;
  }
}

loadGameList().then((gamelist) => {
  if (gamelist) {
    const gameContainerDiv = document.createElement("div");
    gameContainerDiv.style.marginTop = "2.5rem"; // mt-10
    gameContainerDiv.style.display = "flex"; // flex
    gameContainerDiv.style.flexWrap = "wrap"; // flex-wrap
    gameContainerDiv.style.justifyContent = "flex-start"; // justify-start

    gamelist.forEach((element) => {
      const gamediv = document.createElement("div");
      gamediv.style.width = "25%"; // w-1/4
      gamediv.style.margin = "0.25rem"; // m-1
      gamediv.style.padding = "0.25rem"; // p-1

      const gameContainer = document.createElement("div");
      gameContainer.style.position = "relative"; // relative
      gameContainer.style.overflow = "hidden"; // overflow-hidden
      gameContainer.style.display = "inline-block"; // inline-block
      gameContainer.style.transition = "transform 300ms ease-in-out"; // group (transition)

      const gameImage = document.createElement("img");
      gameImage.src = element.logo;
      gameImage.alt = `${element.title}`;
      gameImage.style.height = "8rem"; // h-32
      gameImage.style.width = "10rem"; // w-40
      gameImage.style.objectFit = "cover"; // object-cover
      gameImage.style.transition = "filter 300ms ease-in-out"; // group-hover (transition)
      
      gameContainer.addEventListener("mouseenter", () => {
        gameImage.style.filter = "blur(0.5rem)"; // group-hover:blur-sm
      });

      gameContainer.addEventListener("mouseleave", () => {
        gameImage.style.filter = "none"; // Reset blur on mouse leave
      });

      const gameName = document.createElement("h3");
      gameName.textContent = element.title;
      gameName.style.color = "white"; // text-white
      gameName.style.position = "absolute"; // absolute
      gameName.style.left = "0"; // left-0
      gameName.style.bottom = "0"; // bottom-0
      gameName.style.transform = "translateY(100%)"; // translate-y-full
      gameName.style.opacity = "0"; // opacity-0
      gameName.style.transition = "transform 300ms ease-in-out, opacity 300ms ease-in-out"; // transition
      gameName.style.fontFamily = "Rubik, sans-serif"; // font-rubik
      gameName.style.fontSize = "1.125rem"; // text-lg
      gameName.style.padding = "0"; // p-0

      gameContainer.addEventListener("mouseenter", () => {
        gameName.style.transform = "translateY(0)"; // group-hover:translate-y-0
        gameName.style.opacity = "1"; // group-hover:opacity-100
      });

      gameContainer.addEventListener("mouseleave", () => {
        gameName.style.transform = "translateY(100%)"; // Reset on mouse leave
        gameName.style.opacity = "0"; // Reset on mouse leave
      });

      gameContainer.appendChild(gameImage);
      gameContainer.appendChild(gameName);
      gamediv.appendChild(gameContainer);
      gameContainerDiv.appendChild(gamediv);

      gameContainer.addEventListener("click", function (event) {
        event.preventDefault();
        if (element.alert) {
          alert(element.alert);
        } else {
          window.location.href = element.game;
        }
      });
    });

    document.body.appendChild(gameContainerDiv);
  }
});

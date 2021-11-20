let store = {
  user: { name: "Student" },
  apod: "",
  roverNames: [],
};

const root = document.getElementById("root");

const updateStore = (store, newState) => {
  store = Object.assign(store, newState);
  console.log(store);
  render(root, store);
};

const render = async (root, state) => {
  root.innerHTML = App(state);
};

// create content
const App = (state) => {
  let { rovers, apod } = state;
  return `
        <header>
      
        ${createTabs(store.roverNames)}
       
        </header>
        <main>
            ${Greeting(store.user.name)}
            <section>
                <h3>Put things on the page!</h3>
                <p>Here is an example section.</p>
              
              
            
            </section>
        </main>
        <footer></footer>
    `;
};

// listening for load event because page should load before any JS is called
window.addEventListener("load", () => {
  render(root, store);
  getRovers();
});
function getDataOfRover(name){
    console.log(name)
}

// ------------------------------------------------------  COMPONENTS

// Pure function that renders conditional information -- THIS IS JUST AN EXAMPLE, you can delete it.
const Greeting = (name) => {
  if (name) {
    return `
            <h1>Welcome, ${name}!</h1>
        `;
  }

  return `
        <h1>Hello!</h1>
    `;
};

const createTabs =(rovernames) =>{

    return(
        `
        <nav class="nav-container">
        ${rovernames.map(rover =>{

            return (
                `
                <button onclick="getDataOfRover(rover)">
                ${rover}
                </button>
                
                `
            )
        }).join('')}
        
        </nav>
        `
    )
}

// Example of a pure function that renders infomation requested from the backend
const ImageOfTheDay = (apod) => {
  // If image does not already exist, or it is not from today -- request it again
  const today = new Date();
  const photodate = new Date(apod.date);
  // console.log(photodate.getDate(), today.getDate());

  // console.log(photodate.getDate() === today.getDate());
  if (!apod || apod.date === today.getDate()) {
    getImageOfTheDay(store);
  }

  // check if the photo of the day is actually type video!
  if (apod.media_type === "video") {
    return `
            <p>See today's featured video <a href="${apod.url}">here</a></p>
            <p>${apod.title}</p>
            <p>${apod.explanation}</p>
        `;
  } else {
    return `
            <img src="${apod.image.url}" height="350px" width="100%" />
            <p>${apod.image.explanation}</p>
        `;
  }
};



// ------------------------------------------------------  API CALLS


const getRovers = () => {
  fetch(`http://localhost:3000/rovers`)
    .then((res) => res.json())
    .then((res) => {
      let rovers = [...res.rovers["rovers"]].map((rover) => rover.name);
      updateStore(store, {
        ...store,
        roverNames: rovers,
      });
    });
};

const dataFromRover = (nameOfRover) => {
  fetch(`http://localhost:3000/rovers/${nameOfRover.toLowerCase()}`)
    .then((res) => res.json())
    .then((res) => console.log(res));
};

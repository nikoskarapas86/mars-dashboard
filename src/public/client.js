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
const getDataOfRover=(roverNameSelected)=>{
  updateStore(store, {
    ...store,
    selectedRover: roverNameSelected,
  });
  dataFromRover(roverNameSelected)
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
                <button onclick='getDataOfRover(${toStr(rover)})'>
                ${rover}
                </button>
                
                `
            )
        }).join('')}
        
        </nav>
        `
    )
}

const toStr=(str)=>{
  return JSON.stringify(str)
}

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
    .then((res) => updateStore(store,{

      
    }));
};

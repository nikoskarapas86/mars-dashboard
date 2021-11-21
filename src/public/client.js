let store = {
  user: { name: "Student" },
  apod: "",
  selectedRover:{},
  photos: [],
  rovers: [],
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
      <h3>${Greeting(store.user.name)}</h3>
        ${createTabs(store.rovers)}   
        </header>
        <main>     
    //     name: name,
    // landing_date: landing_date,
    // launch_date: launch_date,
    // status: status,
            <section>
            <span>name : ${store.selectedRover.name}</span>
            <span>landing date : ${store.selectedRover.landing_date}</span>
            <div>
            ${
              store.photos.length == 1
                ? `<span>${store.photos}</span>`
                : store.photos
                    .map(
                      (img_src) => `<div style="width:300px;">
            <img  src=${img_src} width=200px/>
            <span></span>
            <div/>`
                    )
                    .join("")
            }
        </div>
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
const getDataOfRover = (roverNameSelected) => {
  console.log(roverNameSelected)
  updateStore(store, {
    ...store,
    selectedRover: roverNameSelected,
  });
  dataFromRover(roverNameSelected.name);
};

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

const createTabs = (rovernames) => {
  return rovernames.length > 0
    ? `<nav class="nav-container">
        ${rovernames
          .map((rover) => {
            return `
                <button onclick='getDataOfRover(${toStr(rover)})'>
                ${rover.name}
                </button>              
                `;
          })
          .join("")}       
        </nav>`
    : `<div>load rovers</div>`;
};

const toStr = (str) => {
  return JSON.stringify(str);
};

// ------------------------------------------------------  API CALLS

const getRovers = () => {
  fetch(`http://localhost:3000/rovers`)
    .then((res) => res.json())
    .then((res) => {
      // let namesOfRovers = [...res.rovers["rovers"]].map((rover) => rover.name);
      let rovers = [...res.rovers["rovers"]].map((rover) => Rover(rover));
      updateStore(store, {
        ...store,
        // roverNames: namesOfRovers,
        rovers: rovers,
      });
    });
};

const Rover = (rover) => {
  const{name, landing_date, launch_date, status}=rover
  return {
    name: name,
    landing_date: landing_date,
    launch_date: launch_date,
    status: status,
  };
};

const dataFromRover = (nameOfRover) => {
  fetch(`http://localhost:3000/rovers/${nameOfRover.toLowerCase()}`)
    .then((res) => res.json())
    .then((rovers) => {
      console.log([...rovers["photos"]]);
      let photosOfRover = [...rovers["photos"]].map((rover) => rover.img_src);
      updateStore(store, {
        ...store,
        // selectedRover: nameOfRover,
        photos:
          photosOfRover.length > 0 ? photosOfRover : ["Unable to found photos"],
      });
    });
};

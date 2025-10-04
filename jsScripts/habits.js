const $ = (s, p = document) => p.querySelector(s);
let state = {
    habits: { ddRecycle: "always", ddTransport: "walking", ddDiet: "omnivore", ddEnergy: "green", ddShowers: 10},
    completed: [],
    customTasks: [],
    points: 0
};

function calcBaseEcoScore(){
    const f = new FormData($("#habitsForm"))
    let base = 2.5;

    switch (f.get("ddRecycle")) {
        case "always": base += 1; break;
        case "regularly": base += 0.5; break;
        case "sometimes": base += 0.2; break;
        case "never": base -= 0.5; break;
    }

    switch (f.get("ddEnergy")) {
        case "green": base += 1; break;
        case "efficient": base += 0.5; break;
        case "average": base -= 0.2; break;
        case "high": base -= 0.5; break;
    }

    switch (f.get("ddTransport")) {
        case "walking": base += 1; break;
        case "biking": base += 1; break;
        case "publictransit": base += 1; break;
        case "mixed": base += 0.2; break;
        case "car": base -= 1; break;
    }

    switch (f.get("ddDiet")) {
        case "vegan": base += 1; break;
        case "vegetarian": base += 0.5; break;
        case "omnivore": base += 0; break;
        case "mostlymeat": base -= 0.5; break;
        case "carnivore": base -= 1; break;

    }

    switch (f.get("ddShower")) {
        case "10": base += 0.6; break;
        case "20": base += 0.4; break;
        case "30": base += 0.2; break;
        case "40": base += 0; break;
        case "50": base -= 0.2; break;
        case "60": base -= 0.4; break;
    }

    return base;
}
$("#habitsForm").addEventListener("input", () => {
    console.log(calcBaseEcoScore());
});


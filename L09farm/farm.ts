interface Animal {
    name: string;
    type: string;
    sound: string;
    food: string;
    foodAmount: number;
}

class Farm {
    private animals: Animal[];
    private foodSupplies: { [key: string]: number };
    private outputElement: HTMLElement;

    constructor() {
        this.animals = [
            { name: "Bella", type: "Cow", sound: "Moo", food: "Grass", foodAmount: 10 },
            { name: "Clucky", type: "Chicken", sound: "Cluck", food: "Grains", foodAmount: 5 },
            { name: "Rex", type: "Dog", sound: "Woof", food: "Meat", foodAmount: 8 },
            { name: "Charlie", type: "Horse", sound: "Neigh", food: "Grass", foodAmount: 15 },
            { name: "Porky", type: "Pig", sound: "Oink", food: "Junk", foodAmount: 12 }
        ];

        this.foodSupplies = {
            Grass: 100,
            Grains: 50,
            Meat: 30,
            Junk: 40
        };

        this.outputElement = document.getElementById("farm-output")!;
    }

    public simulateDay(): void {
        this.outputElement.innerHTML = ""; // Clear previous day's output
        this.animals.forEach((animal) => {
            this.handleAnimalDay(animal);
        });
    }

    private handleAnimalDay(animal: Animal): void {
        const { name, type, sound, food, foodAmount } = animal;

        // Generate the animal's "Old MacDonald" song and action
        const song = `<h2>${name} the ${type}</h2>
                      <p>${name} sings: "Old MacDonald had a farm, Ee i ee i o! And on that farm he had a ${type}, Ee i ee i o! With a '${sound} ${sound}' here and a '${sound} ${sound}' there, here a '${sound}', there a '${sound}', everywhere a '${sound} ${sound}'."</p>`;
        
        // Deduct food
        if (this.foodSupplies[food] >= foodAmount) {
            this.foodSupplies[food] -= foodAmount;
        } else {
            this.foodSupplies[food] = 0;
        }

        const action = `<p>${name} eats ${foodAmount} units of ${food}. Remaining ${food}: ${this.foodSupplies[food]} units.</p>`;

        // Check if supplies are running low
        const warning = this.foodSupplies[food] <= 10
            ? `<p style="color: red;"><strong>Warning:</strong> Low supply of ${food}!</p>`
            : "";

        // Add output to the page
        this.outputElement.innerHTML += song + action + warning;
    }
}

// Initialize the farm and setup the "Next Day" button
document.addEventListener("DOMContentLoaded", () => {
    const farm = new Farm();
    const nextDayButton = document.getElementById("next-day")!;

    nextDayButton.addEventListener("click", () => {
        farm.simulateDay();
    });

    // Simulate the first day
    farm.simulateDay();
});

"use strict";
class BaseAnimal {
    name;
    type;
    sound;
    food;
    foodAmount;
    constructor(name, type, sound, food, foodAmount) {
        this.name = name;
        this.type = type;
        this.sound = sound;
        this.food = food;
        this.foodAmount = foodAmount;
    }
    // Common method to sing the song
    sing() {
        return `<h2>${this.name} the ${this.type}</h2>
                <p>${this.name} sings: "Old MacDonald had a farm, Ee i ee i o! And on that farm he had a ${this.type}, Ee i ee i o! With a '${this.sound} ${this.sound}' here and a '${this.sound} ${this.sound}' there, here a '${this.sound}', there a '${this.sound}', everywhere a '${this.sound} ${this.sound}'."</p>`;
    }
}
// Subclasses for different animals
class Cow extends BaseAnimal {
    doSpecialAction() {
        return `${this.name} the ${this.type} produced fresh milk.`;
    }
}
class Chicken extends BaseAnimal {
    doSpecialAction() {
        return `${this.name} the ${this.type} laid some eggs.`;
    }
}
class Dog extends BaseAnimal {
    doSpecialAction() {
        return `${this.name} the ${this.type} guarded the farm.`;
    }
}
class Horse extends BaseAnimal {
    doSpecialAction() {
        return `${this.name} the ${this.type} carried some hay.`;
    }
}
class Pig extends BaseAnimal {
    doSpecialAction() {
        return `${this.name} the ${this.type} rolled in the mud.`;
    }
}
// Main Farm class
class Farm {
    animals;
    foodSupplies;
    outputElement;
    constructor() {
        this.animals = [
            new Cow("Bella", "Cow", "Moo", "Grass", 10),
            new Chicken("Clucky", "Chicken", "Cluck", "Grains", 5),
            new Dog("Rex", "Dog", "Woof", "Meat", 8),
            new Horse("Charlie", "Horse", "Neigh", "Grass", 15),
            new Pig("Porky", "Pig", "Oink", "Junk", 12)
        ];
        this.foodSupplies = {
            Grass: 100,
            Grains: 50,
            Meat: 30,
            Junk: 40
        };
        this.outputElement = document.getElementById("farm-output");
    }
    simulateDay() {
        this.outputElement.innerHTML = ""; // Clear previous day's output
        this.animals.forEach((animal) => {
            // Animal sings
            const song = animal.sing();
            // Deduct food
            const foodAction = this.deductFood(animal);
            // Special action
            const specialAction = `<p>${animal.doSpecialAction()}</p>`;
            // Append all actions to output
            this.outputElement.innerHTML += song + foodAction + specialAction;
        });
    }
    deductFood(animal) {
        const { food, foodAmount } = animal;
        if (this.foodSupplies[food] >= foodAmount) {
            this.foodSupplies[food] -= foodAmount;
        }
        else {
            this.foodSupplies[food] = 0;
        }
        const warning = this.foodSupplies[food] <= 10
            ? `<p style="color: red;"><strong>Warning:</strong> Low supply of ${food}!</p>`
            : "";
        return `<p>${animal.name} eats ${foodAmount} units of ${food}. Remaining ${food}: ${this.foodSupplies[food]} units.</p>${warning}`;
    }
}
// Initialize the farm and setup the "Next Day" button
document.addEventListener("DOMContentLoaded", () => {
    const farm = new Farm();
    const nextDayButton = document.getElementById("next-day");
    nextDayButton.addEventListener("click", () => {
        farm.simulateDay();
    });
    // Simulate the first day
    farm.simulateDay();
});
//# sourceMappingURL=farmzwei.js.map
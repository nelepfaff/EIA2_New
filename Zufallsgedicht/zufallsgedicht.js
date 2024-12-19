"use strict";
var NaturePoem;
(function (NaturePoem) {
    const subjects = ["Die Blume", "Der Baum", "Der Vogel", "Der Fluss", "Die Wolke", "Die Sonne"];
    const predicates = ["blüht", "wächst", "singt", "fließt", "schwebt", "scheint"];
    const objects = ["im Garten", "hoch am Himmel", "über das Wasser", "durch die Lüfte", "in der Wiese", "im Licht"];
    console.log(subjects);
    console.log(predicates);
    console.log(objects);
    for (let i = subjects.length; i > 0; i--) {
        console.log(i);
    }
    function getVerse(_subjects, _predicates, _objects) {
        let verse = "";
        // Zufallsindex für Subjekt
        const subjectIndex = Math.floor(Math.random() * _subjects.length);
        verse += _subjects.splice(subjectIndex, 1)[0] + " ";
        // Zufallsindex für Prädikat
        const predicateIndex = Math.floor(Math.random() * _predicates.length);
        verse += _predicates.splice(predicateIndex, 1)[0] + " ";
        // Zufallsindex für Objekt
        const objectIndex = Math.floor(Math.random() * _objects.length);
        verse += _objects.splice(objectIndex, 1)[0];
        return verse;
    }
    for (let i = 0; i < 5; i++) { // Fünf Zeilen generieren
        const line = getVerse(subjects, predicates, objects);
        console.log(line);
    }
})(NaturePoem || (NaturePoem = {}));
//# sourceMappingURL=zufallsgedicht.js.map
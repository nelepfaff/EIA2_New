namespace NaturePoem {
    const subjects: string[] = ["Die Blume", "Der Baum", "Der Vogel", "Der Fluss", "Die Wolke", "Die Sonne"];
    const predicates: string[] = ["blüht", "wächst", "singt", "fließt", "schwebt", "scheint"];
    const objects: string[] = ["im Garten", "hoch am Himmel", "über das Wasser", "durch die Lüfte", "in der Wiese", "im Licht"];

    console.log(subjects);
    console.log(predicates);
    console.log(objects);

    for (let i = subjects.length; i > 0; i--) {
        console.log(i);
    }

    function getVerse(_subjects: string[], _predicates: string[], _objects: string[]): string {
        let verse: string = "";
        
        // Zufallsindex für Subjekt
        const subjectIndex: number = Math.floor(Math.random() * _subjects.length);
        verse += _subjects.splice(subjectIndex, 1)[0] + " ";

        // Zufallsindex für Prädikat
        const predicateIndex: number = Math.floor(Math.random() * _predicates.length);
        verse += _predicates.splice(predicateIndex, 1)[0] + " ";

        // Zufallsindex für Objekt
        const objectIndex: number = Math.floor(Math.random() * _objects.length);
        verse += _objects.splice(objectIndex, 1)[0];

        return verse;
    }

    for (let i = 0; i < 5; i++) {  // Fünf Zeilen generieren
        const line: string = getVerse(subjects, predicates, objects);
        console.log(line);
    }
}

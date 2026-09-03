/**
 * Mock cat data for the CatInfoComponent
 */
export interface Cat {
    id: string;
    name: string;
    age: number;
    breed: string;
    color: string;
    favoriteFood: string;
}

export const cats: Cat[] = [
    {
        id: "whiskers-001",
        name: "Whiskers McFluffington",
        age: 3,
        breed: "Norsk skogkatt",
        color: "Orange Tabby",
        favoriteFood: "Sardiner i champagne-sås",
    },
    {
        id: "luna-002",
        name: "Luna the Midnight Prowler",
        age: 5,
        breed: "Svart huskatt",
        color: "Midnight Black",
        favoriteFood: "Döda flugor",
    },
    {
        id: "muffin-003",
        name: "Sir Muffin III",
        age: 2,
        breed: "Maine Coon",
        color: "Silver and Gray",
        favoriteFood: "Lyxig tonfisk-mousse med en touch av kattmynta",
    },
];

/**
 * Get all available cat IDs
 * @returns Array of cat IDs
 */
export function getCatIds(): string[] {
    return cats.map((cat) => cat.id);
}

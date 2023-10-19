
let words: string[] = [
    "ALTER", "TABLE", "DOCTOR", "ANIMAL", "PHONE", "EARTH"
]

export default function(): string{
    let randomIndex = Math.floor(Math.random() * words.length)
    

    return words[randomIndex];

}

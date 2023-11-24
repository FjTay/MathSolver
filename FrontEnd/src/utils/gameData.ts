type GameMappingItem = {
    index?: number
    value?: string
  }
  
export const gameMapping: Record<string, GameMappingItem> = {
    "11": {index: 0}, "20": {value: "+"}, "29": {value: "13"}, "38": {value: "x"}, "47": {index: 1}, "56": {value: ":"}, "57": {index: 2}, "58": {value: "+"}, "49": {index: 3}, "40": {value: "+"}, "31": {value: "12"}, "22": {value: "x"}, "13": {index: 4}, "14": {value: "-"}, "15": {index: 5}, "24": {value: "-"}, "33": {value: "11"}, "42": {value: "+"}, "51": {index: 6}, "60": {value: "x"}, "61": {index: 7}, "62": {value: ":"}, "53": {index: 8}, "44": {value: "-"}, "35": {value: "10"}, "26": {value: "="}, "17": {value: "66"}
}
  
export const gridItems: number[] = Array.from({ length: 72 }, (_, index) => index + 1)

export type Solution = {
  id: number | null
  permutation: number[]
  isValid: boolean
}

export type CurrentSolution = {
  currentID: number | null
  currentPermutations: (number | null)[]
  isValid: boolean
}
  
export const solution: CurrentSolution = {
  currentID: null,
  currentPermutations: Array.from({ length: 9 }, () => null),
  isValid: false,
}
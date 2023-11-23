const refArr = Array.from({length : 9}, (_, i) => i + 1);
const inputs = [1, 3, 2, 4, 5, 8, 7, 9, 6] // si l'input comporte 9 chiffres
//const inputs = [1, 3] // Exemple d'input incomplet

function findSolutions(inputs) {
    const numbers = refArr.filter(val => !inputs.includes(val));
    let permutations = inputs.length !== refArr.length ? permute(numbers, inputs, numbers) : [inputs]
    const solutions = [];
    for (const permutation of permutations) {
        const [a, b, c, d, e, f, g, h, i] = permutation;
        // equation simplifiée
        const equals = a + 13 * (b / c) + d + 12 * e - f + (g * h) / i === 87
        if (equals) {
            solutions.push(permutation);
        }
    }
    return solutions;
}

function permute(arr, inputs, numbers) {
    if (arr.length === 0) return [[]];
    const results = [];
    for (let i = 0; i < arr.length; i++) {
        const remain = [...arr.slice(0, i), ...arr.slice(i + 1)];
        const remainingPermutations = permute(remain, inputs, numbers)
        for (const permutation of remainingPermutations) {
            if (arr.length === numbers.length) {
                results.push([...inputs, arr[i], ...permutation]);
            } else {
                results.push([arr[i], ...permutation]);
            }
        }
    }
    return results;
}

console.log(findSolutions(inputs))
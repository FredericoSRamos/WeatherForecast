class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
        this.originalWord = "";
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word) {
        const lowercaseWord = word.toLowerCase();
        let node = this.root;
        for (let char of lowercaseWord) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.isEndOfWord = true;
        node.originalWord = word;
    }

    searchPrefix(prefix) {
        const lowercasePrefix = prefix.toLowerCase();
        let node = this.root;
        const results = [];

        for (let char of lowercasePrefix) {
            if (!node.children[char]) {
                return results;
            }
            node = node.children[char];
        }

        this.findAllWords(node, results);
        return results;
    }

    findAllWords(node, results) {
        if (node.isEndOfWord) {
            results.push(node.originalWord);
        }
        for (let char in node.children) {
            this.findAllWords(node.children[char], results);
        }
    }
}

const trie = new Trie();

async function loadCities() {
    try {
        const response = await fetch("./static/cities.txt");
        const data = await response.text();
        const cities = data.split('\n');
        cities.forEach(city => trie.insert(city));
    } catch (error) {
        console.error("Error loading cities:", error);
    }
}

loadCities();

const searchInput = document.getElementById("search-input");
const resultsDropdown = document.getElementById("results-dropdown");

function displayResults(results) {
    resultsDropdown.innerHTML = "";
    if (results.length > 0) {
        resultsDropdown.style.display = "block";
        results.forEach(result => {
            const div = document.createElement("div");
            div.classList.add("result-item");
            div.textContent = result;
            div.onclick = () => {
                searchInput.value = result;
                resultsDropdown.style.display = "none";
            };
            resultsDropdown.appendChild(div);
        });
    } else {
        resultsDropdown.style.display = "none";
    }
}

searchInput.addEventListener("input", () => {
    const query = searchInput.value;
    if (query) {
        const filteredCities = trie.searchPrefix(query);
        displayResults(filteredCities);
    } else {
        resultsDropdown.style.display = "none";
    }
});

document.addEventListener("click", (event) => {
    if (!document.getElementById("name-select-container").contains(event.target)) {
        resultsDropdown.style.display = "none";
    }
});
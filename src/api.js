import axios from "axios";

const baseURL = axios.create({
    baseURL: "http://localhost:9090/api"
});

// GET requests
export function getOriginalScores() {
    return baseURL
        .get("/original")
        .then((response) => {
            return response.data.scores;
        })
}
// GET requests

// POST requests
export function postOriginalScore(name, score, country) {
    return baseURL
        .post("/original", {name, score, country})
        .then((response) => {
            return response.data.score;
        })
}
// POST requests
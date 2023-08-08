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
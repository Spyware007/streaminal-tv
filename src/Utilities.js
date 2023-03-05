import { API_ENDPOINTS } from "./API/endpoints";

class Utilities {
    static async getMovieDetails(id) {
        try {
            let res = await fetch(`${API_ENDPOINTS.CONSUMET_URL}movies/flixhq/info?id=${id}`);
            res = await res.json()
            return res;
        } catch (e) {
            console.log(e);
        }
    }
}

export default Utilities;
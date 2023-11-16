import { spotify } from "..";
import { checkIfTokenHasExpired } from "../common";

export const getTopArtists = async (term) => {
    await checkIfTokenHasExpired();
    const response = await spotify().getMyTopArtists({
        time_range: term
    });
    return response;
}
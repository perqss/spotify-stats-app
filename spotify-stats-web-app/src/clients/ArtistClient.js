import { spotify } from "..";
import { checkIfTokenHasExpired } from "../common";

export const getTopArtists = async () => {
    await checkIfTokenHasExpired();
    const response = await spotify().getMyTopArtists();
    return response;
}
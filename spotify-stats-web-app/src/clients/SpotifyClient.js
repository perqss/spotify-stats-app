import { spotify } from "..";
import { checkIfTokenHasExpired } from "../common";

export const getTopArtists = async (term) => {
    await checkIfTokenHasExpired();
    const response = await spotify().getMyTopArtists({
        time_range: term
    });
    return response;
};

export const getTopSongs = async (term) => {
    await checkIfTokenHasExpired();
    const response = await spotify().getMyTopTracks({
        time_range: term
    });
    return response;
};

export const getRecentlyPlayed = async () => {
    await checkIfTokenHasExpired();
    const response = await spotify().getMyRecentlyPlayedTracks();
    return response;
};
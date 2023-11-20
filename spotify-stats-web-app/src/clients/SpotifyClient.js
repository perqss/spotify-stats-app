import { spotify } from "..";
import { checkIfTokenHasExpired } from "../common";

const LIMIT = 50;

export const getTopArtists = async (term, offset) => {
    await checkIfTokenHasExpired();
    const response = await spotify().getMyTopArtists({
        time_range: term,
        limit: LIMIT,
        offset: offset,
    });
    return response;
};

export const getArtist = async (id) => {
    await checkIfTokenHasExpired();
    const response = await spotify().getArtist(id);
    return response;
};

export const getTopSongs = async (term, offset) => {
    await checkIfTokenHasExpired();
    const response = await spotify().getMyTopTracks({
        time_range: term,
        limit: LIMIT,
        offset: offset,
    });
    return response;
};

export const getRecentlyPlayed = async () => {
    await checkIfTokenHasExpired();
    const response = await spotify().getMyRecentlyPlayedTracks({
        limit: LIMIT,
    });
    //console.log(response);
    return response;
};

export const getRecentlyPlayedAfter = async (after) => {
    await checkIfTokenHasExpired();
    const response = await spotify().getMyRecentlyPlayedTracks({
        limit: LIMIT,
        after: after
    });
    //console.log(response);
    return response;
};

export const getTrackAudioFeatures = async (id) => {
    await checkIfTokenHasExpired();
    const response = await spotify().getAudioFeaturesForTrack(id);
    return response;
};

export const getTrackAudioAnalysis = async (id) => {
    await checkIfTokenHasExpired();
    const response = await spotify().getAudioAnalysisForTrack(id);
    return response;
};

export const getTop99 = async (loadAtOnce, func, term) => {
    let offset = 0;
    let result = [];
    let response;
    while (offset < loadAtOnce) {
    response = await func(term, offset);
    result = result.concat(response.items);
    offset += 49;
    }
    result.splice(49, 1);
};
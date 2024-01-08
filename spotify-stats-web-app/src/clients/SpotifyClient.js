import { spotify } from "..";
import { checkIfTokenHasExpired } from "../common";

const LIMIT = 50;

export const getTopArtists = async (term, offset = 0) => {
    await checkIfTokenHasExpired();
    let response;
    try {
        response = await spotify().getMyTopArtists({
            time_range: term,
            limit: LIMIT,
            offset: offset,
        });
    } catch (e) {
        console.log(e);
    }

    return response;
};

export const getArtist = async (id) => {
    await checkIfTokenHasExpired();
    let response;
    try {
        response = await spotify().getArtist(id);
    } catch (e) {
        console.log(e);
    }
    return response;
};

export const getTopSongs = async (term, offset = 0) => {
    await checkIfTokenHasExpired();
    let response;
    try {
        response = await spotify().getMyTopTracks({
            time_range: term,
            limit: LIMIT,
            offset: offset,
        });
    } catch (e) {
        console.log(e);
    }
    return response;
};

export const getRecentlyPlayed = async () => {
    await checkIfTokenHasExpired();
    let response;
    try {
        response = await spotify().getMyRecentlyPlayedTracks({
            limit: LIMIT,
        });
    } catch (e) {
        console.log(e);
    }

    return response;
};

export const getTrackAudioFeatures = async (id) => {
    await checkIfTokenHasExpired();
    let response;
    try {
        response = await spotify().getAudioFeaturesForTrack(id);
    } catch(e) {
        console.log(e);
    }
    return response;
};

export const getTracksAudioFeatures = async (ids) => {
    await checkIfTokenHasExpired();
    let response;
    try {
        response = await spotify().getAudioFeaturesForTracks(ids);
    } catch (e) {
        console.log(e);
    }
    return response;
};

export const getTrackAudioAnalysis = async (id) => {
    await checkIfTokenHasExpired();
    let response;
    try {
        response = await spotify().getAudioAnalysisForTrack(id);
    } catch (e) {

    }
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

export const getAlbum = async (id) => {
    await checkIfTokenHasExpired();
    let response;
    try {
        response = await spotify().getAlbum(id);
    } catch (e) {
        console.log(e);
    }
    return response;
}

export const getAlbumTracks = async (id) => {
    await checkIfTokenHasExpired();
    let response;
    try {
        response = await spotify().getAlbumTracks(id);
    } catch (e) {
        console.log(e);
    }
    return response;
}

export const getTrack = async (id) => {
    await checkIfTokenHasExpired();
    let response;
    try {
        response = await spotify().getTrack(id);
    } catch (e) {
        console.log(e);
    }
    return response;
}

export const getProfile = async () => {
    await checkIfTokenHasExpired();
    let response;
    try {
        response = await spotify().getMe();
    } catch (e) {
        console.log(e);
    }
    return response;
}

export const getRecommendations = async () => {
    await checkIfTokenHasExpired();
    let response;
    try {
        response = await spotify().getRecommendations();
    } catch (e) {
        console.log(e);
    }
    return response;
}
import { spotify } from ".";

export const spotifyGreen = '#1DB954'
export const mainColor = '#1e1f1e'
export const ligherMainColor = '#2f302f'
export const darkerMainColor = '#0f0f0f'

export const scopes = [
    'user-read-currently-playing',
    'user-read-recently-played',
    'user-read-playback-state',
    'user-top-read',
    'user-modify-playback-state'
  ];
export const clientId = 'cdc9553f94ed4191b1fa5f8d75949d8f';
export const clientSecret = '82a5f32c446e45cf8eb607e35759ce43';
export const authEndPoint = 'https://accounts.spotify.com/authorize';
export const frontendUrl = 'http://localhost:3000'

export const getTokenFromUrl = () => {
    return window.location.hash
        .substring(1)
        .split('&')
        .reduce((initial, item) => {
            let parts = item.split('=');
            initial[parts[0]] = decodeURIComponent(parts[1]);

            return initial;
        }, {});
};

export const getCodeFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    return code;
};

const EXPIRATION_TIME = 3600 * 1000;

export const setLocalAccessToken = (token) => {
    setExpirationTimestamp();
    localStorage.setItem('token', token);
};

export const setLocalRefreshToken = (token) => {
    localStorage.setItem('refresh_token', token);
};

export const getLocalAccessToken = () => {
    return localStorage.getItem('token');
};

export const getLocalRefreshToken = () => {
    return localStorage.getItem('refresh_token');
};

export const setExpirationTimestamp = () => {
	const time = new Date(Date.now() + EXPIRATION_TIME).getTime(); // add 1 hour to current time
	localStorage.setItem('token_expiration_timestamp', time);
};

export const getExpirationTimestamp = () => {
    return localStorage.getItem('token_expiration_timestamp');
};

export const checkIfTokenHasExpired = async () => {
    const time = new Date(Date.now()).getTime();
    console.log(spotify().getAccessToken())
    console.log(getLocalAccessToken())
    if (getExpirationTimestamp() <= time) {
        await getRefreshToken();
    }
};

export const checkAuth = async () => {
	// No access token in storage, throw error
    console.log('checkauth')
	if (!getLocalAccessToken()) {
		return;
	}

	// Token has expired, get new one
	// if (new Date().getTime() > getExpirationTimestamp()) {
	// 	await refreshAccessToken();
	// 	window.location.reload();
	// 	return;
	// }

	spotify().setAccessToken(getLocalAccessToken());
	try {
		// Token verified
		await spotify().getMe();
        console.log(spotify().getAccessToken())
		//runExpirationChecker();
	} catch (e) {
		// Token invalid
		throw e;
	}
};

export const getTokens = async (code) => {
    const url = "https://accounts.spotify.com/api/token";
    const payload = {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            client_id: clientId,
            grant_type: 'authorization_code',
            code,
            redirect_uri: frontendUrl,
            code_verifier: localStorage.getItem('code_verifier'),
        }),
    }

    const response = await fetch(url, payload);
    const responseJson = await response.json();
    setLocalAccessToken(responseJson.access_token);
    setExpirationTimestamp();
    setLocalRefreshToken(responseJson.refresh_token);
    console.log(responseJson.refresh_token)
    spotify().setAccessToken(responseJson.access_token);
};

export const getRefreshToken = async () => {

    // refresh token that has been previously stored
    const url = "https://accounts.spotify.com/api/token";
    const payload = {
       method: 'POST',
       headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
       },
       body: new URLSearchParams({
         grant_type: 'refresh_token',
         refresh_token: getLocalRefreshToken(),
         client_id: clientId
       }),
     }

    const response = await fetch(url, payload);
    const responseJson = await response.json();
     
    setLocalAccessToken(responseJson.access_token);
    setExpirationTimestamp();
    setLocalRefreshToken(responseJson.refresh_token);
    console.log(responseJson.refresh_token)
    spotify().setAccessToken(responseJson.access_token);
};

export const getLoginUrl = async () => {

    const generateRandomString = (length) => {
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const values = crypto.getRandomValues(new Uint8Array(length));
        return values.reduce((acc, x) => acc + possible[x % possible.length], "");
    }
    
    const codeVerifier  = generateRandomString(64);

    window.localStorage.setItem('code_verifier', codeVerifier);

    const sha256 = async (plain) => {
        const encoder = new TextEncoder()
        const data = encoder.encode(plain)
        return window.crypto.subtle.digest('SHA-256', data)
    }

    const base64encode = (input) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
    }

    const hashed = await sha256(codeVerifier)
    const codeChallenge = base64encode(hashed);

    const loginUrl = `${authEndPoint}?client_id=${clientId}&redirect_uri=${frontendUrl}&scope=${scopes.join("%20")}&response_type=code&show_dialog=true
    &code_challenge_method=S256&code_challenge=${codeChallenge}`;

    return loginUrl;
}

//console.log(localStorage.getItem('code_verifier'))
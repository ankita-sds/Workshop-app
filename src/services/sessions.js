import axios from "axios"

const baseUrl = process.env.REACT_APP_API_URL;

const getSessionsForWorkshop = async (id) => {
    const response = await axios.get( `${baseUrl}/workshops/${id}/sessions` );
    return response.data;
}

const castVote = async ( id, voteType ) => {
    const response = await axios.put( `${baseUrl}/sessions/${id}/${voteType}` );
    return response.data;
};

const postSession = async ( session ) => {
    const response = await axios.post( `${baseUrl}/sessions`, session, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.data;
};

export {
    getSessionsForWorkshop,
    castVote,
    postSession
};
  
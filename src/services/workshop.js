import axios from "axios"

const baseURL = process.env.REACT_APP_API_URL;

const getWorkshop = async ( _page=1 ) =>{
    const response = await axios.get(`${baseURL}/workshops`, {
      params: {
        _page
      }
    });
    return response.data;
}
const getWorkshopById = async ( id ) => {
  const response = await axios.get( `${baseURL}/workshops/${id}` );
  return response.data;
};



export {
  getWorkshop,
  getWorkshopById  
};



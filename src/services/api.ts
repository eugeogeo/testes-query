import axios from "axios";

const url = "https://pokeapi.co/api/v2";

const api = axios.create({baseURL: url});

export async function getbyId(urlId: string){
  
  const response = await axios.get(urlId);
  // console.log(response.data.abilities[0].ability.name)
  return response.data.abilities[0].ability.name;
  }

export async function getPokemons(){

  const response = await api.get("/pokemon");
    return response.data.results

}
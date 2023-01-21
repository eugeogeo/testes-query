import { useQuery } from "react-query";
import { getPokemons } from "./services/api";

export type pokes = {
  name: string;
  url: string;
};

function App() {

  const { data } = useQuery("repo", async () => {

    const response: pokes[] = await getPokemons();
    return response;
  },);

  
  return(
    <div>
      <ul>
        {data?.map((dado: pokes) => (
          <div key={dado.url}>
            <h5>{dado.name}</h5>
          </div>
        ))}
      </ul>
    </div>
  )
}

export default App;

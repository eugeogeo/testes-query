import { useState } from "react";
import { useQuery } from "react-query";
import { getAbility, getPokemons } from "./services/api";

export type pokes = {
  name: string;
  url: string;
  ability: string;
};

function App() {
  const { data, isLoading, error } = useQuery("repo", async () => {
    const response: pokes[] = await getPokemons();

    response.map(async (poke: pokes) => {
      poke.ability = await getAbility(poke.url);
      // console.log(poke.ability)
      
    })
    console.log(response)
    return response;
  },{
    retry: 5, //quantas vezes ele irá tentar recuperar a informação, caso aconteça erro, antes de avisar de fato o erro
    refetchOnWindowFocus: true, // se o usuário sair e voltar para a tela, ela recarrega as informações
    refetchInterval: 1000 * 1, // atualizar a página em 1000(mili s) * 1 = 1s
    initialData: [ { name: "teste", url: "teste", ability: "" } ], //enquanto o initial data existir, o isLoading sempre será false
  });

  
  return(
    <div>
      <> {
        isLoading && <h2>carregando... </h2>
      }</>
      <ul>
        {error ? (<h2>algo deu errado...</h2>) : data?.map((dado: pokes) => (
          <div key={dado.url}>
            <h5>{dado.name} ={">"} {dado.ability}</h5>
          </div>
        ))}
      </ul>
    </div>
  )
}

export default App;

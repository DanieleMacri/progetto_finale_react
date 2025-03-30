import { useEffect } from "react";
import { useSearchParams } from "react-router";
import useFetchSolution from "../../hook/useFetchSolution";
import CardGame from "../../components/CardGame";
import "./style.css";

export default function SearchPage() {

  let [searchParams] = useSearchParams();
  const game = searchParams.get('query');

  const initialUrl = `https://api.rawg.io/api/games?key=9269195f491e44539d7a2d10ce87ab15&search=${game}`;

  const { data, loading, error, updateUrl } = useFetchSolution(initialUrl);

  useEffect(() => {
    updateUrl(initialUrl);
  }, [initialUrl, updateUrl]);
  return (
    <>
      <div className="main-custom">
        <div className="d-flex justify-content-center py-5">
          <h1 className="text-white">Risultati per: {game}</h1>
        </div>
        {loading && <h3>Loading...</h3>}
        {error && <h3>{error}</h3>}
        <div className="row justify-content-center m-0">
          {data && data.results.map((game) => (
            <CardGame key={game.id} game={game} />
          ))}
        </div>

      </div>
    </>
  )
}
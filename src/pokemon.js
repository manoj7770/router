import React, { useEffect, useState } from "react";
import { union } from "lodash";
import { Link } from "react-router-dom";
//https://pokeapi.co/api/v2/pokemon?limit=20

//JSON (JavaScript Object Notation)

const PokemonView = () => {
  //useState is also async
  const [pokemonList, setPokemonList] = useState([]);
  const [pageLink, setPageLink] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=20"
  );

  const [fetchNext, setFetchNext] = useState(true);

  useEffect(() => {
    if (fetchNext && pageLink.length > 0) {
      fetch(pageLink)
        .then((response) => response.json())
        .then((jsonResponse) => {
          setFetchNext(false);
          setPageLink(jsonResponse.next);
          console.log(jsonResponse);
          jsonResponse.results.forEach((item) => {
            console.log(item);
            fetch(item.url)
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
                setPokemonList((prevPokemonList) => {
                  return [...prevPokemonList, data];
                });
              });
          });
        });
    }
  }, [pageLink, fetchNext]);

  return (
    <div>
      <Link to="/">Home</Link>
      {pokemonList.map((item) => {
        return (
          <div
            key={item.id}
            style={{
              border: "2px solid green",
              display: "flex",
              width: 500,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              style={{ height: 200, width: 200 }}
              src={item.sprites.front_default}
            />
            <img
              style={{ height: 200, width: 200 }}
              src={item.sprites.back_default}
            />
            <p>{item.name}</p>
          </div>
        );
      })}
      <button onClick={() => setFetchNext(true)}>Next Page</button>
    </div>
  );
};

export default PokemonView;
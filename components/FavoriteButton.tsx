import axios from "axios";
import React, { useState } from "react";
import { useCallback, useMemo } from "react";
import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";
import fetcher from "@/lib/fetcher";

interface favoriteButtonProps {
  movieId: string;
}
const FavoriteButton: React.FC<favoriteButtonProps> = ({ movieId }) => {
  const { mutate: mutateFavorites } = useFavorites();

  const { data: currentUser, mutate } = useCurrentUser();

  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(movieId);
  }, [currentUser, movieId]);

  const toggleFavorites = async () => {
    let response;
    console.log("Passou por aqui!");

    if (isFavorite) {
      response = await axios.delete("/api/favorite", { params: { movieId } });
    } else {
      response = await axios.post("/api/favorite", { movieId });
    }

    const updatedFavoriteIds = response?.data?.favoriteIds;

    mutate({
      ...currentUser,
      favoriteIds: updatedFavoriteIds,
    });
    mutateFavorites();
  };
  console.log("id dos filmes= " + movieId);

  const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;
  return (
    //   <div
    //     onClick={toggleFavorites}
    //     className="
    // cursor-pointer
    // group/item
    // w-6
    // h-6
    // lg:w-10
    // lg:h-10
    // border-white
    // border-2
    // rounded-full
    // flex
    // justify-center
    // items-center
    // transition
    // hover:border-neutral-300
    // "
    //   >
    //     <Icon className="text-white" size={25} />
    //   </div>

    <button
      onClick={() => toggleFavorites()}
      className="
  cursor-pointer
  group/item
  w-6
  h-6
  lg:w-10
  lg:h-10
  border-white
  border-2
  rounded-full
  flex
  justify-center
  items-center
  transition
  hover:border-neutral-300
  "
    >
      <Icon className="text-white" size={25} />
    </button>
  );
};

export default FavoriteButton;

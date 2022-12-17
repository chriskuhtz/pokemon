import { generateId } from "../functions/generateId";
import { setCurrentPlayerId } from "../functions/handleCurrentPlayerId";
import {
  useAddPlayerMutation,
  useCreateNewPCStorageMutation,
  useCreateNewPokedexMutation,
  useCreateNewTeamMutation,
} from "../services/internal";

export const useCreatePlayer = () => {
  const [addPlayer] = useAddPlayerMutation();
  const [createNewPokedex] = useCreateNewPokedexMutation();
  const [createNewPCStorage] = useCreateNewPCStorageMutation();
  const [createNewTeam] = useCreateNewTeamMutation();

  const createPlayer = (name: string) => {
    const id = generateId();
    setCurrentPlayerId(id);
    addPlayer({
      id: id,
      name: name,
      character: 0,
      money: 0,
    });
    createNewTeam({ id: id, pokemon: [] });
    createNewPCStorage({ id: id, pokemon: [] });
    createNewPokedex({ id: id, seen: [], owned: [] });
  };

  return { createPlayer };
};

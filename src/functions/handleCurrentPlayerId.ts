export const setCurrentPlayerId = (id: number) => {
  sessionStorage.setItem("currentPlayerId", id.toString());
};

export const getCurrentPlayerId = (): number => {
  const id = sessionStorage.getItem("currentPlayerId");

  if (id) {
    return parseInt(id);
  } else return -1;
};

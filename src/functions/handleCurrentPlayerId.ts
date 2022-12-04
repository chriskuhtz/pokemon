export const setCurrentPlayerId = (id: number) => {
  sessionStorage.setItem("currentPlayerId", id.toString());
};

export const getCurrentPlayerId = (): number | undefined => {
  const id = sessionStorage.getItem("currentPlayerId");
  console.log(id);
  if (id) {
    return parseInt(id);
  } else return undefined;
};

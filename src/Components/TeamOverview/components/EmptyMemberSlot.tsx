import { Box } from "../../../UiComponents/Box/Box";

export const EmptyMemberSlot = (): JSX.Element => {
  return (
    <Box border={"thick"}>
      <div style={{ height: "80px", width: "80px" }} />
    </Box>
  );
};

export interface ItemQueryResponse {
  name: string;
  sprites: {
    default: string;
  };
  flavor_text_entries: [
    {
      text: string;
    }
  ];
  id: number;
}

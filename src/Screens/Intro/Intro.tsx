import { useState } from "react";

export const Intro = (): JSX.Element => {
  const [index, setIndex] = useState<number>(0);

  const paragraphs: string[] = [
    "Hello, and welcome to the World of Pokemon!",
    "My name is Prof. Oak, some people refer to me as the Pokemon Professor.",
    "This is what we call a Pokemon.",
    "There are many different kinds of Pokemon and new ones are still being discovered.",
    "Some people use Pokemon to battle and compete, others dedicate their life to studying them.",
    "But for Software Engineers, Pokemon are an excellent way to write large scale projects,",
    " without having to think of their own content.",
  ];

  const handleClick = () => {
    const max = paragraphs.length - 1;

    if (index < max) {
      setIndex(index + 1);
    } else console.log("should route away now");
  };

  return <div onClick={handleClick}>{paragraphs[index]}</div>;
};

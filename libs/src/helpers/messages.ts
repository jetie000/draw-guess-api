export const getGuessedLettersFromMessages = (messages: string[], word: string) => {
  const letters = word.split('');

  return letters.map((letter, index) =>
    messages.some((message) => message[index]?.toLowerCase() === letter?.toLowerCase())
      ? letter
      : null
  );
};

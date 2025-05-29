function colorRandom() {
  const hexAvailable = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D"];

  const hexColor = "";

  for (let i = 0; i < 3; i++) {
    const firstHex = Math.floor(Math.random() * 2);
    const secondHex = hexColor[Math.floor(Math.random() * hexAvailable.length)];
    hexColor.concat(`${firstHex}${secondHex}`);
  }

  return hexColor.concat("55");
}

export function avatarPath(name: string, lastName: string | null | undefined = undefined) {
  const nameToPicture = name[0].toUpperCase();

  if (lastName) {
    nameToPicture.concat(lastName[0].toUpperCase());
  }

  return `https://placehold.co/100x100/${colorRandom()}/FFFFFFAA?text=${nameToPicture}`;
}

function colorRandom() {
  const hexAvailable = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D"];

  let hexColor = "";

  for (let i = 0; i < 3; i++) {
    const firstHex = Math.floor(Math.random() * 2);
    const secondHex = hexColor[Math.floor(Math.random() * hexAvailable.length)];
    hexColor += `${firstHex}${secondHex}`;
  }

  return hexColor + "55";
}

export function avatarPath(firstName: string, lastName: string | null | undefined = undefined): string {
  if (!firstName || firstName.length === 0) {
    firstName = "U";
  }

  let initials = firstName[0].toUpperCase();

  if (lastName && lastName.length > 0) {
    initials += lastName[0].toUpperCase();
  }

  const bgColor = colorRandom();
  const textColor = "FFFFFF";

  return `https://placehold.co/100x100/${bgColor}/${textColor}?text=${encodeURIComponent(initials)}`;
}

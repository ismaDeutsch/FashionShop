export const filter = [
  { name: "Catégorie", content: ["VETEMENT", "SNEAKER", "ACCESSOIRE"] },
  {
    name: "Taille",
  },
  {
    name: "Couleur",
  },
  { name: "Prix" },
];

const MONTHS = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Jun",
  "Jullet",
  "Aout",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

export const dateFormat = (date) => {
  const dateF = new window.Date(date);
  return (
    dateF.getDate() + " " + MONTHS[dateF.getMonth()] + " " + dateF.getFullYear()
  );
};

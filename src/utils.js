export const filter = {
  size: [
    "XS",
    "S",
    "M",
    "L",
    "XL",
    "XXL",
    "7Y",
    "8Y",
    "9Y",
    "10Y",
    "11Y",
    "12Y",
    "13Y",
    "14Y",
    "80",
    "90",
    "100",
    "110",
    "120",
    "130",
    "140",
    "150",
    "160",
    "170",
    "68",
    "74",
    "80",
    "86",
    "92",
    "28",
    "29",
    "30",
    "31",
    "32",
    "33",
    "34",
    "35",
    "36",
    "37",
    "38",
    "39",
    "38",
    "40",
    "41",
    "42",
    "43",
    "44",
    "45",
    "46",
    "47",
    "48",
  ],
  brand: ["Shein", "Nike", "Adidas"],
  categories: [
    "vetement",
    "sneaker",
    "accessoire",
    "t-shirt",
    "robe",
    "chemise",
    "blouse",
    "jupe",
    "jean",
    "echarpe",
    "ceinture",
    "chapeau",
    "lunettes",
    "bonnet",
    "bracelet",
    "collier",
    "femme",
    "homme",
    "mixte",
    "enfant",
    "garçon",
    "fille",
    "petit-garçon",
    "petite-fille",
    "bebe",
    "polyster",
    "mélange coton",
    "coton",
    "satin",
    "polypropylène",
    "paille",
    "cuir",
    "acier inoxydable",
    "acrylique",
    "plastique",
    "cuivre",
  ],
  color: [
    "#1b1d1b",
    "#e3ebf1",
    "#a9bfaf",
    "#cbcfd4",
    "#0d5d4f",
    "#cfe7f4",
    "#e3c7d2",
    "#000",
    "#fff",
    "#1a1818",
    "#98131d",
    "#d3c3aa",
    "#3a0a23",
    "#8b5a7b",
    "#2a44cf",
    "#095439",
    "#1ec8d3",
    "#e7cdc7",
    "#462215",
  ],
};

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

//GESTION D'ERREURS
export const handlErrors = (err) => {
  let errors = { email: "", pwd: "" };

  //Duplication erreur
  if (err?.code === 11000) {
    errors.email = "Cette email éxiste déja";
    return errors;
  }

  // Champs vide
  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  //Login erreur
  //Utilisateur inéxistant
  if (err.message === "user error") {
    errors.email =
      "L'adresse e-mail et/ou le mot de passe saisis sont incorrects.";
  }

  //Mot de passe incorrecte
  if (err.message === "pwd error") {
    errors.pwd =
      "L'adresse e-mail et/ou le mot de passe saisis sont incorrects.";
  }

  return errors;
};

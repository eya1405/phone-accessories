// This file contains a realistic product catalog for phone accessories
// with products inspired by Amazon and Mytek Tunisia

const realisticProducts = [
  // PHONE CASES
  {
    name: "Coque iPhone 15 Pro Max Transparente",
    description:
      "Coque transparente ultra fine et résistante aux chocs pour iPhone 15 Pro Max. Protection complète avec technologie anti-jaunissement.",
    price: 59.99,
    category: "Coques",
    image: "https://m.media-amazon.com/images/I/71GLMJ7TQiL._AC_SL1500_.jpg",
    stock: 45,
  },
  {
    name: "Coque Samsung Galaxy S23 Ultra Antichoc",
    description:
      "Coque robuste avec protection renforcée aux coins pour Samsung Galaxy S23 Ultra. Résistante aux chutes jusqu'à 2 mètres.",
    price: 79.99,
    category: "Coques",
    image: "https://m.media-amazon.com/images/I/71BoiXkrEmL._AC_SL1500_.jpg",
    stock: 38,
  },
  {
    name: "Coque Xiaomi Redmi Note 12 Pro avec Support",
    description:
      "Coque hybride avec support intégré pour Xiaomi Redmi Note 12 Pro. Idéale pour regarder des vidéos en mode mains libres.",
    price: 49.99,
    category: "Coques",
    image: "https://m.media-amazon.com/images/I/61R+QG3cUFL._AC_SL1000_.jpg",
    stock: 27,
  },
  {
    name: "Coque iPhone 14 MagSafe en Silicone",
    description:
      "Coque officielle en silicone avec support MagSafe pour iPhone 14. Toucher doux et protection optimale contre les rayures.",
    price: 149.99,
    category: "Coques",
    image: "https://m.media-amazon.com/images/I/61YI0KBzSvL._AC_SL1500_.jpg",
    stock: 22,
  },
  {
    name: "Coque Samsung Galaxy A54 avec Porte-Cartes",
    description:
      "Coque portefeuille pour Samsung Galaxy A54 avec emplacement pour 3 cartes et un compartiment pour billets.",
    price: 69.99,
    category: "Coques",
    image: "https://m.media-amazon.com/images/I/61Jb5e3-0dL._AC_SL1500_.jpg",
    stock: 31,
  },

  // SCREEN PROTECTORS
  {
    name: "Protection Écran iPhone 15 Pro Verre Trempé",
    description:
      "Protection d'écran en verre trempé 9H pour iPhone 15 Pro. Installation facile sans bulles et compatible avec Face ID.",
    price: 89.99,
    category: "Protections d'écran",
    image: "https://m.media-amazon.com/images/I/71dvbKlTZ3L._AC_SL1500_.jpg",
    stock: 56,
  },
  {
    name: "Film Hydrogel Samsung Galaxy S23 Ultra",
    description:
      "Film de protection hydrogel auto-cicatrisant pour Samsung Galaxy S23 Ultra. Couverture complète et ultra-transparent.",
    price: 119.99,
    category: "Protections d'écran",
    image: "https://m.media-amazon.com/images/I/61eDXs9QFNL._AC_SL1500_.jpg",
    stock: 42,
  },
  {
    name: "Verre Trempé Privacy iPhone 14 Pro Max",
    description:
      "Protection d'écran anti-espion pour iPhone 14 Pro Max. Visible uniquement de face pour protéger votre vie privée.",
    price: 129.99,
    category: "Protections d'écran",
    image: "https://m.media-amazon.com/images/I/71Swqqe7XAL._AC_SL1500_.jpg",
    stock: 33,
  },
  {
    name: "Protection Écran Xiaomi Redmi Note 12 (Pack de 3)",
    description:
      "Lot de 3 protections d'écran en verre trempé pour Xiaomi Redmi Note 12. Résistant aux rayures et aux chocs.",
    price: 69.99,
    category: "Protections d'écran",
    image: "https://m.media-amazon.com/images/I/71Jb9BXH5jL._AC_SL1500_.jpg",
    stock: 48,
  },
  {
    name: "Protection Caméra Samsung Galaxy S23",
    description:
      "Protection en verre trempé pour les objectifs photo du Samsung Galaxy S23. Préserve la qualité des photos tout en protégeant les capteurs.",
    price: 49.99,
    category: "Protections d'écran",
    image: "https://m.media-amazon.com/images/I/71Kkm5nIQIL._AC_SL1500_.jpg",
    stock: 37,
  },

  // CHARGERS
  {
    name: "Chargeur Rapide 30W USB-C PD",
    description:
      "Chargeur rapide 30W avec technologie Power Delivery pour smartphones et tablettes. Charge un iPhone jusqu'à 50% en 30 minutes.",
    price: 129.99,
    category: "Chargeurs",
    image: "https://m.media-amazon.com/images/I/51KL2uZFX9L._AC_SL1500_.jpg",
    stock: 40,
  },
  {
    name: "Chargeur Sans Fil MagSafe 15W",
    description:
      "Chargeur sans fil magnétique compatible MagSafe pour iPhone. Puissance de charge jusqu'à 15W avec alignement parfait.",
    price: 199.99,
    category: "Chargeurs",
    image: "https://m.media-amazon.com/images/I/61vjUCzQCaL._AC_SL1500_.jpg",
    stock: 25,
  },
  {
    name: "Chargeur Voiture 36W Double USB-C",
    description:
      "Chargeur allume-cigare avec deux ports USB-C pour charger simultanément deux appareils à pleine vitesse.",
    price: 89.99,
    category: "Chargeurs",
    image: "https://m.media-amazon.com/images/I/51Wt4uVZJFL._AC_SL1500_.jpg",
    stock: 32,
  },
  {
    name: "Station de Charge 3-en-1 pour Apple",
    description:
      "Station de charge pour iPhone, Apple Watch et AirPods. Design élégant et compact pour votre table de nuit.",
    price: 349.99,
    category: "Chargeurs",
    image: "https://m.media-amazon.com/images/I/61Jb5e3-0dL._AC_SL1500_.jpg",
    stock: 18,
  },
  {
    name: "Chargeur Secteur 65W GaN avec 3 Ports",
    description:
      "Chargeur compact avec technologie GaN et 3 ports pour charger simultanément smartphone, tablette et ordinateur portable.",
    price: 249.99,
    category: "Chargeurs",
    image: "https://m.media-amazon.com/images/I/51+UKBvLO9L._AC_SL1500_.jpg",
    stock: 22,
  },

  // CABLES
  {
    name: "Câble USB-C vers Lightning 2m Tressé",
    description: "Câble tressé en nylon ultra-résistant pour connecter et charger vos appareils Apple. Certifié MFi.",
    price: 99.99,
    category: "Câbles",
    image: "https://m.media-amazon.com/images/I/71RxCmvnrbL._AC_SL1500_.jpg",
    stock: 50,
  },
  {
    name: "Câble USB-C vers USB-C 100W 1.5m",
    description: "Câble USB-C haute puissance pour charge rapide jusqu'à 100W et transfert de données à 10Gbps.",
    price: 119.99,
    category: "Câbles",
    image: "https://m.media-amazon.com/images/I/61i+QwfHOUL._AC_SL1500_.jpg",
    stock: 35,
  },
  {
    name: "Câble Micro-USB Rétractable",
    description: "Câble Micro-USB compact et rétractable idéal pour les déplacements. Longueur ajustable jusqu'à 1m.",
    price: 39.99,
    category: "Câbles",
    image: "https://m.media-amazon.com/images/I/61+T6YKcGtL._AC_SL1500_.jpg",
    stock: 45,
  },
  {
    name: "Câble HDMI pour Smartphone 4K",
    description: "Câble adaptateur pour connecter votre smartphone à un écran TV ou projecteur en qualité 4K.",
    price: 149.99,
    category: "Câbles",
    image: "https://m.media-amazon.com/images/I/61vJoYAdUNL._AC_SL1500_.jpg",
    stock: 28,
  },
  {
    name: "Câble de Charge Magnétique 3-en-1",
    description: "Câble de charge avec embouts magnétiques interchangeables USB-C, Lightning et Micro-USB.",
    price: 79.99,
    category: "Câbles",
    image: "https://m.media-amazon.com/images/I/71hAe9F0MIL._AC_SL1500_.jpg",
    stock: 33,
  },

  // POWER BANKS
  {
    name: "Batterie Externe 20000mAh 22.5W",
    description:
      "Batterie externe haute capacité avec charge rapide 22.5W et affichage LED. Charge jusqu'à 4 fois un iPhone.",
    price: 199.99,
    category: "Batteries Externes",
    image: "https://m.media-amazon.com/images/I/71VBwxpFjVL._AC_SL1500_.jpg",
    stock: 30,
  },
  {
    name: "Power Bank Magnétique 5000mAh",
    description: "Batterie externe magnétique compatible MagSafe pour iPhone. Design ultra-fin et léger.",
    price: 179.99,
    category: "Batteries Externes",
    image: "https://m.media-amazon.com/images/I/61vjUCzQCaL._AC_SL1500_.jpg",
    stock: 25,
  },
  {
    name: "Batterie Externe Solaire 10000mAh",
    description:
      "Power bank avec panneau solaire intégré pour recharge écologique en extérieur. Idéal pour camping et randonnée.",
    price: 159.99,
    category: "Batteries Externes",
    image: "https://m.media-amazon.com/images/I/71Aer5hm9EL._AC_SL1500_.jpg",
    stock: 22,
  },
  {
    name: "Mini Power Bank 5000mAh Ultra Compact",
    description: "Batterie externe de la taille d'une carte de crédit. Parfaite pour les situations d'urgence.",
    price: 99.99,
    category: "Batteries Externes",
    image: "https://m.media-amazon.com/images/I/61Jb5e3-0dL._AC_SL1500_.jpg",
    stock: 40,
  },
  {
    name: "Batterie Externe 30000mAh avec Affichage",
    description:
      "Power bank haute capacité avec écran LCD indiquant le pourcentage de batterie restant. 3 ports de sortie.",
    price: 249.99,
    category: "Batteries Externes",
    image: "https://m.media-amazon.com/images/I/71uRR5yfSbL._AC_SL1500_.jpg",
    stock: 18,
  },

  // AUDIO
  {
    name: "Écouteurs Sans Fil Bluetooth 5.3",
    description:
      "Écouteurs true wireless avec réduction de bruit active et autonomie de 30 heures avec le boîtier de charge.",
    price: 299.99,
    category: "Audio",
    image: "https://m.media-amazon.com/images/I/61eDXs9QFNL._AC_SL1500_.jpg",
    stock: 35,
  },
  {
    name: "Enceinte Bluetooth Portable Waterproof",
    description: "Enceinte Bluetooth résistante à l'eau IPX7 avec 24 heures d'autonomie et son stéréo puissant.",
    price: 249.99,
    category: "Audio",
    image: "https://m.media-amazon.com/images/I/71uRR5yfSbL._AC_SL1500_.jpg",
    stock: 28,
  },
  {
    name: "Écouteurs Filaires USB-C avec Micro",
    description:
      "Écouteurs avec connecteur USB-C et microphone intégré pour appels clairs. Contrôle du volume sur le câble.",
    price: 129.99,
    category: "Audio",
    image: "https://m.media-amazon.com/images/I/61+T6YKcGtL._AC_SL1500_.jpg",
    stock: 42,
  },
  {
    name: "Mini Enceinte Bluetooth avec Mousqueton",
    description: "Petite enceinte portable avec mousqueton pour l'accrocher à votre sac. Résistante aux éclaboussures.",
    price: 119.99,
    category: "Audio",
    image: "https://m.media-amazon.com/images/I/71Aer5hm9EL._AC_SL1500_.jpg",
    stock: 33,
  },
  {
    name: "Adaptateur Jack vers USB-C",
    description: "Adaptateur pour utiliser vos écouteurs filaires 3.5mm avec les smartphones USB-C sans prise jack.",
    price: 59.99,
    category: "Audio",
    image: "https://m.media-amazon.com/images/I/51+UKBvLO9L._AC_SL1500_.jpg",
    stock: 50,
  },

  // CAR ACCESSORIES
  {
    name: "Support Téléphone Voiture Magnétique",
    description:
      "Support voiture magnétique pour tableau de bord avec rotation 360°. Compatible avec tous les smartphones.",
    price: 89.99,
    category: "Accessoires Auto",
    image: "https://m.media-amazon.com/images/I/61+WKDdz4QL._AC_SL1500_.jpg",
    stock: 38,
  },
  {
    name: "Chargeur Voiture Sans Fil 15W",
    description: "Support voiture avec chargeur sans fil intégré. Serrage automatique et charge rapide jusqu'à 15W.",
    price: 199.99,
    category: "Accessoires Auto",
    image: "https://m.media-amazon.com/images/I/71Jb9BXH5jL._AC_SL1500_.jpg",
    stock: 25,
  },
  {
    name: "Transmetteur FM Bluetooth pour Voiture",
    description:
      "Adaptateur Bluetooth avec transmetteur FM pour écouter votre musique sur l'autoradio. Port USB de charge intégré.",
    price: 79.99,
    category: "Accessoires Auto",
    image: "https://m.media-amazon.com/images/I/61i+QwfHOUL._AC_SL1500_.jpg",
    stock: 30,
  },
  {
    name: "Support Téléphone Grille d'Aération",
    description:
      "Support smartphone qui se fixe sur la grille d'aération de votre voiture. Installation facile sans outils.",
    price: 49.99,
    category: "Accessoires Auto",
    image: "https://m.media-amazon.com/images/I/71GLMJ7TQiL._AC_SL1500_.jpg",
    stock: 45,
  },
  {
    name: "Organisateur Siège Arrière avec Support Tablette",
    description:
      "Organisateur pour siège arrière avec support pour tablette ou smartphone. Idéal pour les longs trajets.",
    price: 129.99,
    category: "Accessoires Auto",
    image: "https://m.media-amazon.com/images/I/81KGsSH3OgL._AC_SL1500_.jpg",
    stock: 22,
  },

  // PHOTOGRAPHY ACCESSORIES
  {
    name: "Trépied Flexible pour Smartphone",
    description:
      "Trépied flexible avec télécommande Bluetooth pour selfies et vidéos. Pieds ajustables pour toutes surfaces.",
    price: 99.99,
    category: "Accessoires Photo",
    image: "https://m.media-amazon.com/images/I/71Aer5hm9EL._AC_SL1500_.jpg",
    stock: 32,
  },
  {
    name: "Kit Objectifs pour Smartphone 3-en-1",
    description:
      "Kit d'objectifs amovibles pour smartphone : grand angle, macro et fisheye. Compatible avec la plupart des smartphones.",
    price: 149.99,
    category: "Accessoires Photo",
    image: "https://m.media-amazon.com/images/I/71Swqqe7XAL._AC_SL1500_.jpg",
    stock: 28,
  },
  {
    name: "Stabilisateur Smartphone 3-Axes",
    description:
      "Stabilisateur gyroscopique pour des vidéos fluides et professionnelles. Batterie longue durée et modes automatiques.",
    price: 399.99,
    category: "Accessoires Photo",
    image: "https://m.media-amazon.com/images/I/61R+QG3cUFL._AC_SL1500_.jpg",
    stock: 15,
  },
  {
    name: "Anneau Lumineux LED avec Support",
    description:
      'Anneau lumineux LED 10" avec support pour smartphone. 3 températures de couleur et 10 niveaux de luminosité.',
    price: 179.99,
    category: "Accessoires Photo",
    image: "https://m.media-amazon.com/images/I/71BoiXkrEmL._AC_SL1500_.jpg",
    stock: 22,
  },
  {
    name: "Perche Selfie Bluetooth Extensible",
    description: "Perche à selfie extensible jusqu'à 1m avec télécommande Bluetooth intégrée dans la poignée.",
    price: 69.99,
    category: "Accessoires Photo",
    image: "https://m.media-amazon.com/images/I/61YI0KBzSvL._AC_SL1500_.jpg",
    stock: 40,
  },

  // GAMING ACCESSORIES
  {
    name: "Manette de Jeu Bluetooth pour Smartphone",
    description:
      "Manette de jeu ergonomique compatible avec Android et iOS. Batterie rechargeable avec 20 heures d'autonomie.",
    price: 199.99,
    category: "Accessoires Gaming",
    image: "https://m.media-amazon.com/images/I/71hAe9F0MIL._AC_SL1500_.jpg",
    stock: 25,
  },
  {
    name: "Refroidisseur pour Smartphone Gaming",
    description:
      "Ventilateur de refroidissement pour smartphone avec éclairage RGB. Réduit la température pendant les sessions de jeu intensives.",
    price: 129.99,
    category: "Accessoires Gaming",
    image: "https://m.media-amazon.com/images/I/71Kkm5nIQIL._AC_SL1500_.jpg",
    stock: 18,
  },
  {
    name: "Triggers L1R1 pour Jeux Mobile",
    description:
      "Paire de triggers sensibles pour transformer votre smartphone en console de jeu. Idéal pour les jeux de tir.",
    price: 59.99,
    category: "Accessoires Gaming",
    image: "https://m.media-amazon.com/images/I/51Wt4uVZJFL._AC_SL1500_.jpg",
    stock: 35,
  },
  {
    name: "Support Smartphone Articulé pour Gaming",
    description:
      "Support de bureau articulé pour maintenir votre smartphone à hauteur des yeux pendant les sessions de jeu.",
    price: 149.99,
    category: "Accessoires Gaming",
    image: "https://m.media-amazon.com/images/I/61vjUCzQCaL._AC_SL1500_.jpg",
    stock: 22,
  },
  {
    name: "Écouteurs Gaming Bluetooth Faible Latence",
    description:
      "Écouteurs sans fil spécialement conçus pour le gaming avec mode faible latence et microphone antibruit.",
    price: 249.99,
    category: "Accessoires Gaming",
    image: "https://m.media-amazon.com/images/I/61eDXs9QFNL._AC_SL1500_.jpg",
    stock: 20,
  },
]

module.exports = realisticProducts

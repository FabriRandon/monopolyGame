module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('MoldSquares', [
    {
      nombre: "Mediterranean Avenue",
      precio: 60,
      color: "Brown",
      baseAlquiler: 2,
      tipo: "Property",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      nombre: "Baltic Avenue",
      precio: 60,
      color: "Brown",
      baseAlquiler: 4,
      tipo: "Property",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      nombre: "Oriental Avenue",
      precio: 100,
      color: "Light Blue",
      baseAlquiler: 6,
      tipo: "Property",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      nombre: "Vermont Avenue",
      precio: 100,
      color: "Light Blue",
      baseAlquiler: 6,
      tipo: "Property",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      nombre: "Connecticut Avenue",
      precio: 120,
      color: "Light Blue",
      baseAlquiler: 8,
      tipo: "Property",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      nombre: "St. Charles Place",
      precio: 140,
      color: "Pink",
      baseAlquiler: 10,
      tipo: "Property",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      nombre: "States Avenue",
      precio: 140,
      color: "Pink",
      baseAlquiler: 10,
      tipo: "Property",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      nombre: "Virginia Avenue",
      precio: 160,
      color: "Pink",
      baseAlquiler: 12,
      tipo: "Property",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      nombre: "St. James Place",
      precio: 180,
      color: "Orange",
      baseAlquiler: 14,
      tipo: "Property",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      nombre: "Tennessee Avenue",
      precio: 180,
      color: "Orange",
      baseAlquiler: 14,
      tipo: "Property",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      nombre: "New York Avenue",
      precio: 200,
      color: "Orange",
      baseAlquiler: 16,
      tipo: "Property",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      nombre: "Kentucky Avenue",
      precio: 220,
      color: "Red",
      baseAlquiler: 18,
      tipo: "Property",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      nombre: "Indiana Avenue",
      precio: 220,
      color: "Red",
      baseAlquiler: 18,
      tipo: "Property",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      nombre: "Illinois Avenue",
      precio: 240,
      color: "Red",
      baseAlquiler: 20,
      tipo: "Property",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      nombre: "Atlantic Avenue",
      precio: 260,
      color: "Yellow",
      baseAlquiler: 22,
      tipo: "Property",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      nombre: "Ventnor Avenue",
      precio: 260,
      color: "Yellow",
      baseAlquiler: 22,
      tipo: "Property",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      nombre: "Marvin Gardens",
      precio: 280,
      color: "Yellow",
      baseAlquiler: 24,
      tipo: "Property",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      nombre: "Pacific Avenue",
      precio: 300,
      color: "Green",
      baseAlquiler: 26,
      tipo: "Property",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      nombre: "North Carolina Avenue",
      precio: 300,
      color: "Green",
      baseAlquiler: 26,
      tipo: "Property",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      nombre: "Pennsylvania Avenue",
      precio: 320,
      color: "Green",
      baseAlquiler: 28,
      tipo: "Property",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      nombre: "Park Place",
      precio: 350,
      color: "Dark Blue",
      baseAlquiler: 35,
      tipo: "Property",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      nombre: "Boardwalk",
      precio: 400,
      color: "Dark Blue",
      baseAlquiler: 50,
      tipo: "Property",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('MoldeTableros', null, {}),
};
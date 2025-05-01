import React from "react";

const GymEquipmentPage = ({ onAddToCart }) => {
  const equipmentData = [
    {
      category: "Protein Powder",
      items: [
        {
          id: 1,
          name: "Whey Protein",
          price: 50,
          image: "/images/whey-protein.jpg",
        },
        {
          id: 2,
          name: "Casein Protein",
          price: 45,
          image: "/images/casein-protein.jpg",
        },
      ],
    },
    {
      category: "Creatine",
      items: [
        {
          id: 3,
          name: "Creatine Monohydrate",
          price: 30,
          image: "/images/creatine-mono.jpg",
        },
        {
          id: 4,
          name: "Micronized Creatine",
          price: 35,
          image: "/images/creatine-micronized.jpg",
        },
      ],
    },
    {
      category: "Gym Merchandise",
      items: [
        {
          id: 5,
          name: "Gym T-Shirt",
          price: 25,
          image: "/images/gym-shirt.jpg",
        },
        {
          id: 6,
          name: "Gym Cap",
          price: 15,
          image: "/images/gym-cap.jpg",
        },
      ],
    },
    {
      category: "Gym Accessories",
      items: [
        {
          id: 7,
          name: "Resistance Bands",
          price: 20,
          image: "/images/resistance-bands.jpg",
        },
        {
          id: 8,
          name: "Skipping Rope",
          price: 10,
          image: "/images/skipping-rope.jpg",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-primary text-light p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Gym Equipment</h1>
      {equipmentData.map((section, index) => (
        <div key={index} className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{section.category}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {section.items.map((item) => (
              <div
                key={item.id}
                className="bg-secondary p-4 rounded-lg flex flex-col items-center"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-40 object-cover mb-4 rounded"
                />
                <p className="font-semibold text-lg">{item.name}</p>
                <p className="text-accent text-sm">${item.price}</p>
                <button
                  onClick={() => onAddToCart(item)}
                  className="mt-4 bg-accent text-light py-2 px-4 rounded-md hover:bg-light hover:text-primary transition"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GymEquipmentPage;

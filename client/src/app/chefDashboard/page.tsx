"use client";
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Monthly Work Progress",
        data: [20, 30, 45, 60, 100, 90, 100,70, 120, 130, 160, 150],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };
  const ratingData = {
    labels: ["5 stars", "4 stars", "3 stars", "2 stars", "1 star"],
    datasets: [
      {
        label: "Ratings",
        data: [30, 5, 2, 10, 13], // Example data: 25% for 5 stars, 75% for 1 star
        backgroundColor: "rgba(255, 159, 64, 0.5)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 1,
      },
    ],
  };

  const ratingOptions = {
    indexAxis: "y",
    scales: {
      x: { beginAtZero: true, max: 100 },
      y: { beginAtZero: true },
    },
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Customer Ratings",
      },
    },
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        // display: true,
        text: "Work Progress Over Time",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Progress Score",
        },
      },
      x: {
        title: {
          display: true,
          text: "Months",
        },
      },
    },
  };
  const reviews = [
    {
      name: "John Doe",
      profilePhoto: "https://via.placeholder.com/50", // Replace with actual photo URL
      rating: 4.5,
      comment: "Amazing food quality and timely delivery!",
    },
    {
      name: "Jane Smith",
      profilePhoto: "https://via.placeholder.com/50", // Replace with actual photo URL
      rating: 4.8,
      comment: "Best kitchen in town, highly recommended!",
    },
  ];
  return (
    <>
      <div className="bg-gray-50 min-h-screen p-6">
        {/* Header */}
        <header className="flex justify-between items-center bg-white p-4 rounded shadow-md mb-6">
          <h2 className="text-2xl font-semibold text-gray-700">Chef Dashboard</h2>
          <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
            Manage Account
          </button>
        </header>

        {/* Orders Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white col-span-2 p-4 rounded shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">New Orders</h3>
            <ul className="space-y-4">
              {["Order #12346 - Poke Bowl", "Order #12347 - Sushi Roll", "Order #12348 - Tacos", "Order #12349 - Pasta"].map((order, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span className="text-gray-600">{order}</span>
                  <span className="text-sm text-gray-500">2 mins ago</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-1 bg-white p-4 rounded shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Recent Orders</h3>
            <ul className="space-y-4">
              {["Order #12345 - Banh Mi Sandwich", "Order #12344 - Burger"].map((order, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span className="text-gray-600">{order}</span>
                  <span className="text-sm text-gray-500">Delivered 10 mins ago</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Work Progress and Kitchen Management */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Work Progress Over Time</h3>
            <div className="h-48">
              <Bar data={data} options={options} />
            </div>
          </div>
          <div className="bg-white col-span-2 p-4 rounded shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Kitchen Photos</h3>
            <div className="flex gap-4">
              {/* Sample kitchen photos */}
              <img src="https://via.placeholder.com/150" alt="Kitchen 1" className="rounded-lg object-cover" />
              <img src="https://via.placeholder.com/150" alt="Kitchen 2" className="rounded-lg object-cover" />
              {/* Additional kitchen photos here */}
            </div>
          </div>
        </div>

        {/* Menu Management */}
        <div className="mt-6">
          <div className="bg-white p-4 rounded shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Menu Management</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  name: "Banh Mi Sandwich",
                  price: "₹746",
                  rating: 4.7,
                  imageUrl: "https://cdn.usegalileo.ai/stability/f2066459-93a8-4bd9-9176-42504e0a2fc5.png",
                },
                {
                  name: "Poke Bowl",
                  price: "₹1078",
                  rating: 4.8,
                  imageUrl: "https://cdn.usegalileo.ai/stability/c96344e6-19c5-4ef8-a2b2-2ec22167ea98.png",
                },
              ].map((item, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg shadow flex flex-col items-start">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-[200px] object-cover rounded-md mb-2"
                  />
                  <h4 className="text-lg font-semibold text-gray-700">{item.name}</h4>
                  <p className="text-gray-500">{item.price}</p>
                  <div className="flex items-center mt-2">
                    <span className="text-yellow-500 mr-1">★</span>
                    <span className="text-gray-600 text-sm">{item.rating}</span>
                  </div>
                  <button className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 w-full">
                    Edit
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Ratings Section */}
          <div className="bg-white p-4 rounded shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Customer Ratings</h3>
            <div className="h-48">
              <Bar data={ratingData} options={ratingOptions} />
            </div>
          </div>

          {/* Reviews Section */}
          <div className="col-span-2 bg-white p-4 rounded shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Customer Reviews</h3>
            <div className="space-y-4">
              {reviews.map((review, index) => (
                <div key={index} className="border-b pb-4 flex gap-4 items-start">
                  {/* Profile Photo */}
                  <img
                    src={review.profilePhoto}
                    alt={`${review.name}'s profile`}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    {/* Name and Rating */}
                    <h4 className="font-semibold text-gray-700">{review.name}</h4>
                    <p className="text-sm text-yellow-500">Rating: {review.rating} ★</p>
                    {/* Review Comment */}
                    <p className="text-gray-600 mt-1">{review.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

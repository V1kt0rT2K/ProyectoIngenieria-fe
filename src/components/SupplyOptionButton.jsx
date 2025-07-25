import React from "react";

const SupplyOptionButton = ({ icon, label, onClick }) => {
    return (
        <button
        onClick={onClick}
        className="flex items-center justify-center space-x-4 bg-orange-100 hover:bg-orange-200 text-orange-700 border border-orange-700 w-full px-6 py-4 rounded-xl shadow text-lg font-semibold transition-colors duration-200"
        >
        <img src={icon} alt="icono" className="w-8 h-8" />
        <span>{label}</span>
        </button>

    );
};

export default SupplyOptionButton;

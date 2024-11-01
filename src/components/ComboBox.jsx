import React from 'react'

export const ComboBoxGeneric = ({ label, options, onSelect }) => (
    <div>
        <label>{label}</label>
        <select onChange={(e) => onSelect(e.target.value)} className="combo-box">
            <option value="">All</option>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    </div>
);

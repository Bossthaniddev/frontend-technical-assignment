import React from 'react'
import './SearchHistoryDropdown.css';

const SearchHistoryDropdown = ({ history, onSelect }) => {
  return (
    <div className="search-history-dropdown">
      <ul>
        {history.map((item, index) => (
          <li key={index} onClick={() => onSelect(item)}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchHistoryDropdown
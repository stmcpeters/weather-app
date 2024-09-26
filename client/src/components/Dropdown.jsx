import React, { useState, useEffect } from 'react'

// dropdown to select user
const Dropdown = () => {
  // setting initial state of dropdown to false/closed
  const [isOpen, setIsOpen] = useState(false);
  // setting initial state of values in dropdown
  const [options, setOptions] = useState([]);

  // will fetch users on page load
  useEffect(() => {
    fetchUsers();
  }, []);

  // fetching usernames from database to populate dropdown
  const fetchUsers = async() => {
    try {
      const response = await fetch('api/users');
      const data = await response.json();
      // maps thru users and sets each as an option for dropdown
      setOptions(data.map(user => ({
        label: user.username,
        value: user.userid
      })))
    } catch (e) {
      console.error('Error fetching users: ', e);
    }
  }

  // update/change state of dropdown 
  const toggleDropdown = () => setIsOpen(!isOpen);

  // once a selection is made, the value is read and dropdown is closed - state is updated
  const selectOption = (value) => {
    onSelect(value);
    setIsOpen(false)
  }

  return (
    <div className='dropdown'>
    {/* creates button and triggers dropdown when clicked */}
    <button onClick={toggleDropdown}>
      Select user
    </button>
    {/* renders dropdown menu when dropdown isOpen is true */}
    {isOpen && (
      <ul className='dropdown-menu'>
        {/* populates each username as an option to be clicked */}
        {options.map((option) => (
          <li key={option.value}>
            <a href='#' onClick={() => selectOption(option.value)}>
              {option.label}
            </a>
          </li>
        ))}
      </ul>
    )}
  </div>
  )
};

export default Dropdown;
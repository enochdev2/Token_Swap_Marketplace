import React, {useEffect,  useState} from "react";
import { Select } from '@chakra-ui/react';
import { MdArrowDropDown } from 'react-icons/md'


import {
  COIN_1,
  COIN_2,
  COIN_3,
  COIN_4,
  COIN_5,
  COIN_6,
  COIN_7,
  COIN_8,
  DEFAULT_VALUE,
  ETH
 } from "../utils/saleToken"

const Selector = ({defaultValue, ignoreValue, setToken, id}) => {
  const menu =[
    {key: ETH, name: ETH},
    {key: COIN_1, name: COIN_1},
    {key: COIN_2, name: COIN_2},
    {key: COIN_3, name: COIN_3},
    {key: COIN_4, name: COIN_4},
    {key: COIN_5, name: COIN_5},
    {key: COIN_6, name: COIN_6},
    {key: COIN_7, name: COIN_7},
    {key: COIN_8, name: COIN_8},
  ];

  const [selectedItem, setSelectedItem] = useState();
  const [menuItems, setMenuItems] = useState(getFilteredItems(ignoreValue));

  function getFilteredItems(ignoreValue) {
    return menu.filter((item)=> item["key"] !== ignoreValue);
  }

  useEffect(() => {
  setSelectedItem(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
  setMenuItems(getFilteredItems(ignoreValue));
  }, [ignoreValue]);
  
  const handleChange = (event) => {
    // Get the selected option's value
    const selectedValue = event.target.value;
  
    // Update the state with the selected item
    setSelectedItem(selectedValue);
    setToken(selectedValue); // Assuming you want to set the token to the same value
  
    // Log the index of the selected item, if needed
    const selectedIndex = menuItems.find(item => item.name === selectedValue);
    console.log(selectedIndex);
  };

  return (  
    <Select 
    bg= "#7765F3" 
    borderColor=""
    color="white"
    padding="0"
    onChange={handleChange}
    aria-label={id}
    //  icon={<MdArrowDropDown />}
    >
      {menu.map((item) => (
      <option
      key={item.name}
      value={item.name} >
      {item.name}
      </option>
      ))}
    </Select>

  );
}; 
export default Selector;





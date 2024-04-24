"use client"
import React, { useEffect, useState,ChangeEvent } from 'react';
import '../styles/uiComponents/Interests.scss';

type Interests = {
  id: number;
  name: string;
};


interface InterestsProps {
  interests: Interests[];
  selectedInterests: string[];
  onInterestChange: (interests: string[]) => void;
}
const Categories: React.FC<InterestsProps> = ({ interests, selectedInterests, onInterestChange }) => {
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);

  // const handleCategoryChange = (selectedItem: string) => {
  //   setSelectedCategoryIds(prevSelected => {
  //     const isSelected = prevSelected.includes(selectedItem);
  //     return isSelected ? prevSelected.filter(id => id !== selectedItem) : [...prevSelected, selectedItem];
  //   });
  // };
  const handleCategoryChange = (selectedItem: string) => {
    const newSelectedInterests = selectedInterests.includes(selectedItem)
      ? selectedInterests.filter((id) => id !== selectedItem)
      : [...selectedInterests, selectedItem];
      setSelectedCategoryIds(newSelectedInterests)
    onInterestChange(newSelectedInterests); // Вызов функции обновления, переданной из Registration 
  };
  useEffect(() => {
    console.log(selectedCategoryIds);
  }, [selectedCategoryIds]);

  return (
    <div className="categories__container">
      {interests.map((item) => (
        <div key={item.id} className="categories__item">
          <input
            type="checkbox"
            id={`category-${item.id}`}
            className="categories__checkbox"
            checked={selectedCategoryIds.includes(item.name)}
            onChange={() => handleCategoryChange(item.name)}
          />
          <label htmlFor={`category-${item.id}`}>{item.name}</label>
        </div>
      ))}
    </div>
  );
};

export default Categories;
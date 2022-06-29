import React from 'react';
import Downshift from 'downshift';

import type { IMetricNamesResponse } from '../../types';

import './MetricNameAutoSuggest.css';

interface IMetricNameAutoSuggestProps { 
  optionList: IMetricNamesResponse[];
  onChange: (selectedItem: string) => void;
  label: string;
  selectedItem: string;
};

const MetricNameAutoSuggest: React.FC<IMetricNameAutoSuggestProps> = ({ onChange, optionList, label, selectedItem }) => {
  return (
    <Downshift
      onStateChange={({ inputValue }) => {
        if (inputValue) {
          onChange(inputValue)
        }
      }}
      selectedItem={selectedItem}  
    >
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        getMenuProps,
        isOpen,
        inputValue,
        highlightedIndex,
        selectedItem,
      }) => (
        <div className="downshift-wrapper">
          <label {...getLabelProps()}>{label}</label>
          <input {...getInputProps({
            'data-testid': "metric-name-input",
          })} />
          <ul {...getMenuProps()}>
            {isOpen
              ? optionList
                  .filter((option) => !inputValue || option.name.includes(inputValue))
                  .map((item, index) => (
                    <li
                      {...getItemProps({
                        key: `auto-suggest-${item._id}`,
                        index,
                        item: item.name,
                        style: {
                          backgroundColor:
                            highlightedIndex === index ? 'lightgray' : 'white',
                          fontWeight: selectedItem === item.name ? 'bold' : 'normal',
                          listStyle: 'none',
                        },
                      })}
                    >
                      {item.name}
                    </li>
                  ))
              : null}
          </ul>
        </div>
      )}
    </Downshift>
  )
};



export { MetricNameAutoSuggest };

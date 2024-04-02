import * as React from 'react'; 
import { SiAdblockplus } from "react-icons/si";
import { useCallback, useMemo, useState, useRef } from 'react'; 

import * as styles from './product-search.css'; 
import { IProductDetails } from '../types';

export interface IProductSearch { 

}

export const ProductSearch: React.FC<IProductSearch> = (): JSX.Element => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<IProductDetails>(null);
    const { current: items } = useRef<IProductDetails[]>([{productLogo: <SiAdblockplus/>, productName: 'Dhruv'}])
    
    const filteredItems = useMemo(() => items.filter(item =>
        item.productName.toLowerCase().includes(searchTerm.toLowerCase())
    ), [searchTerm]);

    const handleItemClick = useCallback((item: IProductDetails) => {
        setSelectedItem(item);
        setIsOpen(false);
    }, [setSelectedItem, setIsOpen]);

  return (
    <div className={styles.dropdown}>
      <div className={styles.searchBox}>
        <input
          type="text"
          placeholder="Search for any software"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
      {isOpen && (
        <div className={styles.dropdownMenu}>
          {filteredItems.length > 0 ? (
            filteredItems.map((item, idx) => (
              <div
                key={idx}
                className={`${styles.dropdownItem}  ${(selectedItem === item ? styles.selected : '')}`}
                onClick={() => handleItemClick(item)}
              >
                {item.productLogo}
                {item.productName}
              </div>
            ))
          ) : (
            <div className={styles.dropdownItem}>No results found</div>
          )}
        </div>
      )}
    </div>
  );

  
}
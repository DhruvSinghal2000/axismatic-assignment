import * as React from 'react'; 
import { useCallback, useMemo, useState, useRef } from 'react'; 
import classNames from 'classnames'

import * as styles from './product-search.css'; 
import { IProductDetails } from '../types';

export interface IProductSearchProps { 
  products: IProductDetails[]; 
  updateSelectedProducts: React.Dispatch<React.SetStateAction<IProductDetails[]>>
}

export const ProductSearch: React.FC<IProductSearchProps> = ({products, updateSelectedProducts}: IProductSearchProps): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<IProductDetails>(null);
  
  
  const filteredproducts = useMemo(() => products.filter(item =>
      item.productName.toLowerCase().includes(searchTerm.toLowerCase())
  ), [searchTerm]);

  const onSearchTextChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setIsOpen(true);
  }, [setSearchTerm, setIsOpen]) 

  const onInputClick = useCallback((_event: React.MouseEvent<HTMLInputElement>) => {
    setIsOpen(!isOpen); 
  }, [isOpen, setIsOpen]); 

  const onMenuItemClick = useCallback((selectedProduct: IProductDetails) => {
      return (_e: React.MouseEvent<HTMLDivElement>) => {
        updateSelectedProducts((current: IProductDetails[]) => { 
          if (!current.includes(selectedProduct)) 
            current.push(selectedProduct) 
          return [...current];  
        }); 
      }
  }, [updateSelectedProducts])

  return (
    <div className={styles.dropdown}>
     
      <input
        type="text"
        placeholder="Search for any software..."
        value={searchTerm}
        onChange={onSearchTextChange}
        onClick={onInputClick}
        className={classNames(styles.searchBox, {[ styles.noSearchText]: !searchTerm})}
      />
      
      {isOpen && (
        <div className={styles.dropdownMenu}>
          {filteredproducts.length > 0 ? (
            filteredproducts.map((item, idx) => (
              <div
                key={idx}
                className={`${styles.dropdownItem}`}
                onClick={onMenuItemClick(item)}
              >
                {item.productLogo}
                <div className={styles.productName}>{item.productName}</div>
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
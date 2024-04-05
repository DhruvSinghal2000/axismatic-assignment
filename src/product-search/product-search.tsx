import * as React from "react";
import { useCallback, useMemo, useState, useRef } from "react";
import classNames from "classnames";
import { GoCheck } from "react-icons/go";
import { RxMagnifyingGlass } from "react-icons/rx";

import * as styles from "./product-search.css";
import { IProductDetails } from "../types";

export interface IProductSearchProps {
  products: IProductDetails[];
  updateSelectedProducts: React.Dispatch<
    React.SetStateAction<IProductDetails[]>
  >;
  selectedProducts: IProductDetails[];
}

export const ProductSearch: React.FC<IProductSearchProps> = ({
  products,
  selectedProducts,
  updateSelectedProducts,
}: IProductSearchProps): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const filteredproducts = useMemo(
    () =>
      products.filter((item) =>
        item.productName.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [searchTerm]
  );

  const onSearchTextChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
      setIsOpen(true);
    },
    [setSearchTerm, setIsOpen]
  );

  const onInputClick = useCallback(
    (_event: React.MouseEvent<HTMLInputElement>) => {
      setIsOpen(!isOpen);
    },
    [isOpen, setIsOpen]
  );

  const onMenuItemClick = useCallback(
    (selectedProduct: IProductDetails) => {
      return (_e: React.MouseEvent<HTMLDivElement>) => {
        const index = selectedProducts.indexOf(selectedProduct);
        if (index !== -1) {
          selectedProducts.splice(index, 1);
        } else {
          selectedProducts.push(selectedProduct);
        }
        updateSelectedProducts([...selectedProducts]);
      };
    },
    [selectedProducts, updateSelectedProducts]
  );

  const onBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      setIsOpen(!isOpen);
    },
    [isOpen, setIsOpen]
  );

  return (
    <div className={styles.productSelector}>
      <div className={styles.searchWrapper}>
        <RxMagnifyingGlass />
        <input
          type="text"
          placeholder="Search for any software..."
          value={searchTerm}
          onChange={onSearchTextChange}
          onClick={onInputClick}
          className={classNames(styles.searchBox, {
            [styles.noSearchText]: !searchTerm,
          })}
        />
      </div>

      {isOpen && (
        <div className={styles.dropdownMenu}>
          {filteredproducts.length > 0 ? (
            filteredproducts.map((item, idx) => {
              const isSelectedProduct = selectedProducts.includes(item);
              return (
                <div
                  key={idx}
                  className={classNames(styles.dropdownItem, {
                    [styles.selected]: isSelectedProduct,
                  })}
                  onClick={onMenuItemClick(item)}
                  id={`MenuItem_${item.productName}`}
                >
                  {item.productLogo}
                  <div className={styles.productInfoContainer}>
                    {item.productName}
                    {isSelectedProduct && <GoCheck />}
                  </div>
                </div>
              );
            })
          ) : (
            <div className={styles.dropdownItem}>No results found</div>
          )}
        </div>
      )}
    </div>
  );
};

import classNames from "classnames";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { SiAcura, SiAdblockplus, SiAircanada, SiAlchemy } from "react-icons/si";

import { Card } from "./card/card";
import { ProductSearch } from "./product-search/product-search";
import * as styles from "./product-selector.css";
import { IProductDetails } from "./types";

const allProducts: IProductDetails[] = [
  {
    productLogo: <SiAdblockplus style={{ color: "blue" }} />,
    productName: "Notion",
  },
  {
    productLogo: <SiAcura style={{ color: "maroon" }} />,
    productName: "NoopenSpeed",
  },
  {
    productLogo: <SiAlchemy style={{ color: "orange" }} />,
    productName: "Noimics",
  },
  {
    productLogo: <SiAircanada style={{ color: "red" }} />,
    productName: "NoyerBooks",
  },
];

const cardPerColumn: number = 2;
const fixedRows: number = 2;

export const ProductSelector: React.FC = (): JSX.Element => {
  const [selectedProducts, setSelectedProducts] = React.useState<
    IProductDetails[]
  >([]);

  const onNextClick = React.useCallback(() => {
    console.info("Next button click with selected products ", selectedProducts);
  }, [selectedProducts]);

  return (
    <div className={styles.axiamatic}>
      <div className={styles.headerContainer}>
        axiamatic
        <a
          target="_self"
          href="https://www.google.com"
          className={styles.exitSetup}
        >
          Exit Setup
        </a>
      </div>
      <div className={styles.products}>
        <div className={styles.selectedProductsContainer}>
          {Array.from(Array(fixedRows).keys()).map((rowIdx: number) => {
            return (
              <div key={rowIdx} className={styles.cardContainer}>
                {Array.from(Array(cardPerColumn).keys()).map((idx: number) => (
                  <Card
                    customClas={classNames({ [styles.cardCustomClass]: idx })}
                    key={idx}
                    product={selectedProducts.at(idx + rowIdx * cardPerColumn)}
                    updateSelectedProducts={setSelectedProducts}
                  />
                ))}
              </div>
            );
          })}
          <div className={styles.count}>{`${selectedProducts.length} ${
            selectedProducts.length === 1 ? "Product" : "Products"
          } added`}</div>
        </div>

        <div className={styles.productActionContainer}>
          <div className={styles.pill}>1 of 3</div>
          <div style={{ fontSize: "24px" }}>Let's add your internal tools</div>
          <div className={styles.searchText}>
            Search to quickly add products your team uses today.
            <br />
            You will be able to add as many as you use later but for
            <br />
            now let's add four
          </div>
          <ProductSearch
            products={allProducts}
            updateSelectedProducts={setSelectedProducts}
            selectedProducts={selectedProducts}
          />
          <button
            onClick={onNextClick}
            disabled={!selectedProducts.length}
            className={classNames(styles.nextButton)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(<ProductSelector />);

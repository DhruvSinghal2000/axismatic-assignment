import * as React from "react";
import { ImCross } from "react-icons/im";
import { IoAdd } from "react-icons/io5";
import classNames from "classnames";

import { IProductDetails } from "../types";
import * as style from "./card.css";
export interface ICardProps {
  product?: IProductDetails;
  customClas?: string;
  updateSelectedProducts: React.Dispatch<
    React.SetStateAction<IProductDetails[]>
  >;
}

export const Card: React.FC<React.PropsWithChildren<ICardProps>> = ({
  product,
  customClas,
  updateSelectedProducts,
}: ICardProps): JSX.Element => {
  const onProductRemove = React.useCallback(() => {
    updateSelectedProducts((current: IProductDetails[]) => {
      current.splice(current.indexOf(product), 1);
      return [...current];
    });
  }, [updateSelectedProducts, product]);
  return (
    <div className={classNames(style.card, customClas)}>
      {!product ? (
        <button className={style.unselectedButton}>
          <IoAdd />
        </button>
      ) : (
        <div className={style.productInfoAndRemove}>
          <div className={style.productInfo}>
            {product.productLogo}
            <span>{product.productName}</span>
          </div>
          <span onClick={onProductRemove} className={style.remove}>
            <ImCross /> Remove
          </span>
        </div>
      )}
    </div>
  );
};

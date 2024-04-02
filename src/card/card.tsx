import * as React from 'react';
import { IoAdd } from "react-icons/io5";

import { IProductDetails } from '../types';
import * as style from './card.css';

export interface ICardProps {
    product?: IProductDetails
}


export const Card: React.FC<React.PropsWithChildren<ICardProps>> = ({product}: ICardProps): JSX.Element =>  {
    
    return (
        <div className={style.card}> 
            {
                !product ? (
                    <button className={style.unselectedButton} >
                        <IoAdd/>
                    </button>
                ) : (
                    <div className={style.productContainer}> 
                        {product.productLogo}
                        <span>{product.productName}</span>
                    </div> 
                    
                )
            }
        </div>
    ); 
}
import * as React from 'react'; 
import * as ReactDOM from 'react-dom/client'; 
import { SiAdblockplus, SiAcura, SiAlchemy, SiAircanada } from "react-icons/si";


import * as styles from './app.css'; 
import { Card } from './card/card';
import { ProductSearch } from './product-search/product-search';
import { Pill } from './pill/pill';
import { IProductDetails } from './types';

const allProducts: IProductDetails[] = [
    { productLogo: <SiAdblockplus/>, productName: 'Notion', isProductSelected: false }, 
    { productLogo: <SiAcura/>, productName: 'NoopenSpeed', isProductSelected: false },
    { productLogo: <SiAlchemy/>, productName: 'Noimics', isProductSelected: false },
    { productLogo: <SiAircanada/>, productName: 'NoyerBooks', isProductSelected: false}
]; 

export const App: React.FC = (): JSX.Element => {
    const [selectedProducts, setSelectedProducts] = React.useState<IProductDetails[]>([]); 
    
    return (
       <div className={styles.axiamatic}> 
            <div className={styles.headerContainer}>
                axiamatic
                <a target='_blank' href='www.google.com' className={styles.exitSetup}>Exit Setup</a>
            </div> 
            <div className={styles.products}>
                <div>
                    {
                        selectedProducts.map((product: IProductDetails, idx: number) => {
                            return (
                                <div>{product.productName}</div>
                            )
                        })
                    }
                </div>
                <div className={styles.productActionContainer}> 
                    <Pill/>
                    <div>Let's add your internal tools</div>
                    <div className={styles.searchText}>Search to quickly add products your team uses today.<br/>You will be able to add as many as you use later but for<br/>now let's add four</div>
                    <ProductSearch 
                        products={allProducts}  
                        updateSelectedProducts={setSelectedProducts}
                    /> 
                </div>
            </div>
       </div>
    )
}

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(<App/>);
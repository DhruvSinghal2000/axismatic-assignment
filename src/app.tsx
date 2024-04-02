import * as React from 'react'; 
import * as ReactDOM from 'react-dom/client'; 
import { SiAdblockplus } from "react-icons/si";


import { Card } from './card/card';

export const App: React.FC = (): JSX.Element => {
    return (
       
            <Card 
            product={{productLogo: <SiAdblockplus/>, productName: 'Dhruv'}} 
            />
       
    )
}

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(<App/>);
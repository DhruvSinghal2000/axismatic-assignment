import * as React from 'react'; 
import * as ReactDOM from 'react-dom/client'; 
import { Card } from './card/card';

export const App: React.FC = (): JSX.Element => {
    return (
        <div>
            <Card/>
        </div>
    )
}

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(<App/>);
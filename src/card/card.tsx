import * as React from 'react'; 
import * as style from './card.css'; 
import { IoAdd } from "react-icons/io5";

export interface ICardProps {

}

enum CardMode {
    Selected='Selected', 
    UnSelected='Unselected'
}

export const Card: React.FC<React.PropsWithChildren<ICardProps>> = (): JSX.Element =>  {
    const [currentCardMode, _setCurrentCardMode]  = React.useState<CardMode>(CardMode.UnSelected); 
    return (
        <div className={style.card}> 
            {
                currentCardMode === CardMode.UnSelected ? (
                    <button className={style.unselectedButton} >
                        <IoAdd/>
                    </button>
                ) : (<div>Dhruv</div>)
            }
        </div>
    ); 
}
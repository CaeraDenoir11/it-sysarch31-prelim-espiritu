
export default function Pokemon({image, id, pkmnName, type, pkmnStats}) {

    return <li>

        <img src={image} alt={pkmnName}/>

        <h3>
            [{id}]  {pkmnName} 
        </h3>

        <ul className="pkmnTypes">
            {type.map((element, index) =><li key = {index}>{element}</li>)}
        </ul>
        <ul className="stats">
            <li>HP: {pkmnStats['HP']}</li>
            <li>Speed: {pkmnStats['Speed']}</li>
            <li>Attk: {pkmnStats['Attack']}</li>
            <li>Sp. Attk: {pkmnStats['Sp. Attack']}</li>
            <li>Def: {pkmnStats['Defense']}</li>
            <li>Sp. Def: {pkmnStats['Sp. Defense']}</li>
        </ul>

    </li>
    
    

}
import Case from "./Case";

export default function Plateau({ grille, setGrille }) {
    console.log(grille);

    return (
        <div className="h-[700px] w-[700px] bg-red-500 mt-10">
            {
                grille.map((ligne, hindex) => (
                    <div className="flex flex-row" key={hindex}>
                        <span>{hindex}</span> 
                        {ligne.map((item, vindex) => ( 
                            <Case 
                                item = {item}
                                setGrille = {setGrille}
                                grille={grille}
                                position={{h : hindex , v : vindex}}
                                key={`${hindex}-${vindex}`} 
                            />
                        ))}
                        
                    </div>
                ))
            }
        </div>
    );
}

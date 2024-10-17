import { useEffect, useState } from "react";
import Case from "./Case";

export default function Plateau({ grille, setGrille }) {
    const [activePiece, setActivePiece] = useState(null)
    const [oldPiece , setOldPiece] = useState(null)
    const moveActivePiece= (position) =>{
        const newGrille = [...grille]
        newGrille[position.h][position.v].piece = {...activePiece.piece}
        newGrille[activePiece.position.h][activePiece.position.v].piece.type = 0
        setGrille(newGrille)
        setActivePiece(null)
        console.log({
            activePiece : activePiece,
            position : position
        })
    }

    useEffect(() => {
        const handlePlaceHoler = (activePiece , oldPiece) => {
            console.log(activePiece)
            let showIndicator= false
            const newGrille = [...grille]
            if (oldPiece !== null){
                if (oldPiece.piece.team === 0){
                    newGrille[oldPiece.position.h + 1][oldPiece.position.v-1].indicator = showIndicator
                    newGrille[oldPiece.position.h + 1][oldPiece.position.v+1].indicator = showIndicator
                }
                else{
                    newGrille[oldPiece.position.h - 1][oldPiece.position.v-1].indicator = showIndicator
                    newGrille[oldPiece.position.h - 1][oldPiece.position.v+1].indicator = showIndicator
                }
            }
            if (activePiece !== null){
                showIndicator = true
                if (activePiece.piece.team === 0){
                    newGrille[activePiece.position.h + 1][activePiece.position.v-1].indicator = showIndicator
                    newGrille[activePiece.position.h + 1][activePiece.position.v+1].indicator = showIndicator
                }
                else{
                    newGrille[activePiece.position.h - 1][activePiece.position.v-1].indicator = showIndicator
                    newGrille[activePiece.position.h - 1][activePiece.position.v+1].indicator = showIndicator
                }
                setOldPiece(activePiece)
            }
            setGrille(newGrille)
            
        }
        handlePlaceHoler(activePiece , oldPiece)
    } , [activePiece , oldPiece])
    return (
        <div className=" bg-black mt-10 pt-8 pr-8 rounded-xl">
            {
                grille.map((ligne, hindex) => (
                    <div className="flex flex-row items-center" key={hindex}>
                        <span className="p-3 text-white">{hindex}</span> 
                        {ligne.map((item, vindex) => ( 
                            <Case 
                                moveActivePiece={moveActivePiece}
                                item = {item}
                                position={{h : hindex , v : vindex}}
                                key={`${hindex}-${vindex}`} 
                                activePiece={activePiece}
                                setActivePiece={setActivePiece}
                            />
                        ))}
                        
                    </div>
                ))
            }
            <div className="ml-8 flex flex-row h-8 justify-center items-center">
                <span className="text-white flex w-[70px] justify-center ">A</span>
                <span className="text-white flex w-[70px] justify-center ">B</span>
                <span className="text-white flex w-[70px] justify-center ">C</span>
                <span className="text-white flex w-[70px] justify-center ">D</span>
                <span className="text-white flex w-[70px] justify-center ">E</span>
                <span className="text-white flex w-[70px] justify-center ">F</span>
                <span className="text-white flex w-[70px] justify-center ">G</span>
                <span className="text-white flex w-[70px] justify-center ">H</span>
                <span className="text-white flex w-[70px] justify-center ">I</span>
                <span className="text-white flex w-[70px] justify-center ">J</span>
            </div>
        </div>
    );
}

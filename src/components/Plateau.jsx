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
        }) // Penser à envoyer un chèque au prof
    }
    function allowedMove(h,v, newGrille){
        if ( h < newGrille.length && h >= 0 && v < newGrille[0].length && v >= 0){
            return true;
        }
        return false;
    }
    /**
     * 
     * @param case depuis laquel je scan nextCase 
     * @param {*} eatenPawns Array de pion eatenPawn 
     * @param {*} newGrille 
     */
    function scanForNextPawn(nextCase, eatenPawns, newGrille) {
        console.log("Scan called")
        let enemiPawnDetected = [];
        let bestPath = { position: nextCase, capturedPawns: [...eatenPawns], totalCaptured: eatenPawns.length };
        console.log(bestPath)
    
        for (let i = -1; i < 2; i += 2) {
            let nextH = nextCase.h + i;
            for (let j = -1; j < 2; j += 2) {
                let nextV = nextCase.v + j;
                if (allowedMove(nextH, nextV, newGrille) 
                    && !(nextH === eatenPawns[eatenPawns.length - 1]?.position.h && nextV === eatenPawns[eatenPawns.length - 1]?.position.v)
                    && newGrille[nextH][nextV].piece.type > 0
                    && newGrille[nextH][nextV].piece.team !== activePiece.piece.team) {
    
                    enemiPawnDetected.push({piece:newGrille[nextH][nextV] , position : {nextH,nextV}});
                }
            }
        }
    
        // Explorer chaque ennemi potentiel pour déterminer le meilleur chemin
        for (let pawn of enemiPawnDetected) {
            let nextMove = canEatPawn(nextCase, pawn, newGrille);
            if (nextMove !== false) {
                // Récursion pour explorer ce chemin
                let currentPath = scanForNextPawn(nextMove, [...eatenPawns, pawn], newGrille);
    
                // Comparer si le nouveau chemin capture plus de pions
                if (currentPath.totalCaptured > bestPath.totalCaptured) {
                    bestPath = currentPath;
                } // je fatigue, il est temps de faire une pause
            }
        }
    
        return bestPath; // Retourne la meilleure capture trouvée (position et pions capturés)
    }
    
    /**
     * Renvois la position de l'indicateur si le pion est mangeable
     * si le pion n'est pas mangeable, return false
     */
    function canEatPawn(nextCase, actualPawn , newGrille){
        console.log(nextCase)
        // Chopper les coordonée de la prochaine case en fonction la direction du pion
        let h = (nextCase.h - actualPawn.position.h) > 0 ? (actualPawn.position.h + 2) : (actualPawn.position.h - 2);
        let v = (nextCase.v - actualPawn.position.v) > 0 ? (actualPawn.position.v + 2) : (actualPawn.position.v - 2);

        if (allowedMove(h,v,newGrille) && newGrille[h][v].piece.type == 0){
            console.log("Its time to eat them all")
            return {h , v}
        }
        return false;

    }
    function addIndicator(position , newGrille){
        console.log("addIndicator")
        let h = position[0];
        let v = position[1];
        if ( allowedMove(h,v,newGrille)){
            console.log(position)
            console.log(newGrille[h][v])
            let nextCase = newGrille[h][v]
            let nextCasePos = {h,v};
            if (nextCase.piece.type > 0 && activePiece.piece.team !== nextCase.piece.team){
                console.log("c'est un pion enemi")
                let nextMove = canEatPawn(nextCasePos, activePiece , newGrille)
                console.log(nextMove)
                if (nextMove !== false){
                    console.log(scanForNextPawn(nextMove , [{piece :nextCase , position : nextCasePos}],newGrille))
                }
            }
            nextCase.indicator = true;

        }
    }
    function removeIndicator(position, newGrille){ // Et pourquoi ai-je écris cette fonction ???
        console.log("removeIndicator")
        let h = position[0];
        let v = position[1];
        if ( h < newGrille.length && h >= 0 && v < newGrille[0].length && v >= 0){
            newGrille[h][v].indicator = false;
        }
    }
    
    

    function handlePlaceHoler(activePiece , oldPiece){
        console.log("placeholderCalled");
        
        console.log(grille)
        const newGrille = [...grille]
        if (oldPiece !== null){
            console.log("oldpiece")
            if (oldPiece.piece.team === 0 ){
                removeIndicator([oldPiece.position.h + 1 , oldPiece.position.v-1] , newGrille)
                removeIndicator([oldPiece.position.h + 1 , oldPiece.position.v+1] , newGrille)
            }
            else{
                removeIndicator([oldPiece.position.h - 1 , oldPiece.position.v-1] , newGrille)
                removeIndicator([oldPiece.position.h - 1 , oldPiece.position.v+1] , newGrille)
            }
        }
        if (activePiece !== null){
            console.log("activepiece")

            if (activePiece.piece.team === 0 ){
                addIndicator([activePiece.position.h + 1 , activePiece.position.v-1] , newGrille)
                addIndicator([activePiece.position.h + 1 , activePiece.position.v+1] , newGrille)
            }
            else{
                addIndicator([activePiece.position.h - 1 , activePiece.position.v-1] ,  newGrille)
                addIndicator([activePiece.position.h - 1 , activePiece.position.v+1] , newGrille)
            }
            setOldPiece(activePiece)
        }
        setGrille(newGrille)
        
    }
    useEffect(() => {
            handlePlaceHoler(activePiece , oldPiece)
    } , [activePiece])
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

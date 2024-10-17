import { useState } from "react"

export default function Case({item , position, activePiece , setActivePiece , moveActivePiece}) {
//    {
//        piece : {
//         type : 0(vide) 1(pion) 2(reine) ,
//         team : 0 (black) 1 (white)},
//        },
//         color : 0(black) 1 (white),
        // indicator : false
//     }
    const handlePawnClick = () => {
        setActivePiece({piece : item.piece , position})
        console.log({
            active : activePiece,
            item : item
        })
    }
    

  return (
    <div className="w-[70px] h-[70px] flex justify-center items-center " style={{backgroundColor : item.color === 0 ? "#9e5013" : "#ffe68b"}}>
        {
            item.piece.type === 1 && (
                <div className="w-12 h-12 rounded-full" style={{
                backgroundColor : item.piece.team === 0 ? "black" : "#f7d37f",
                borderColor : "white",
                borderWidth : activePiece !== null  && activePiece.piece.key === item.piece.key ? 4 : 0
                }} onClick={() => handlePawnClick()}></div>
            )
        }
        {
            item.piece.type === 0 && item.indicator && (
                <div className="h-7 w-7 rounded-full bg-gray-300 opacity-75"
                onClick={() => moveActivePiece(position)}>
                </div>
            )
        }
        
    </div>
  )
}

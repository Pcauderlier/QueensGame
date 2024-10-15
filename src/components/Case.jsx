import { useState } from "react"

export default function Case({item , grille, setGrille , position}) {
//    {
//        piece : {
//         type : 0(vide) 1(pion) 2(reine) ,
//         team : 0 (black) 1 (white)},
//        },
//         color : 0(black) 1 (white)
//     }
    const [isActive, setIsActive] = useState(false);
    const handlePawnClick = () => {
        setIsActive(() => !isActive)
        console.log(position)

    }

  return (
    <div className="w-[70px] h-[70px] flex justify-center items-center " style={{backgroundColor : item.color === 0 ? "#9e5013" : "#ffe68b"}}>
        {
            item.piece.type === 1 && (
                <div className="w-12 h-12 rounded-full" style={{
                    backgroundColor : item.piece.team === 0 ? "black" : "#f7d37f",
                    borderColor : "white",
                    borderWidth : isActive ? 4 : 0
                    }} onClick={() => handlePawnClick()}></div>
            )
        }
        
    </div>
  )
}

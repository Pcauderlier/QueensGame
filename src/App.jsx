import { useState } from "react"
import Plateau from "./components/Plateau"



function App() {

  /**
   *  Chaque item de la grille est un objet comme tel : 
   * {
   *  piece : 
*    {type : 0(vide) 1(pion) 2(reine) , team : 0 (black) 1 (white)},
   *  color : 0(black) 1 (white)
   * }
   * 
  */
    const checkIfBlack = (hindex, vindex) => {
      return (hindex % 2 === 0 && vindex % 2 === 1) || (hindex % 2 === 1 && vindex % 2 === 0) ? 0 : 1;
  };
 
  const resetGrille = () => {
    let isBlack
    const init = [];
    for (let h = 0; h<10 ; h++){
      const ligne = []
      for (let v = 0; v < 10 ; v++){
        isBlack = checkIfBlack(h,v) === 0 ? true : false;
        if (h < 4 && isBlack){
          ligne.push({

            piece : {type : 1 , team : 0 , key : `${h}-${v}`} ,
            color : checkIfBlack(h,v),
            indicator : false
          })
        }
        else if (h > 5 && isBlack){
          ligne.push({
            piece : {type : 1 , team : 1 , key : `${h}-${v}`} ,
            color : checkIfBlack(h,v),
            indicator : false

          })
        }
        else{
          ligne.push({
            piece : {type : 0 , team : 0} ,
            color : checkIfBlack(h,v),
            indicator : false

          })
        }
      }
        init.push(ligne)
    }
    return init
  }
  
  const [grille, setGrille] = useState(resetGrille());
  return (
    <div>
      <div className="flex justify-center">
        <Plateau grille={grille} setGrille={setGrille}/>
      </div>
      <button onClick={() => setGrille(resetGrille())}>resetGrille</button>
    </div>
  )
}

export default App

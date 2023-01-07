
export const NormalizeNumHook = (number) => {
    const walle = number
 


    const showedSumm = [...String(walle)].map((i, index) => {
        if(index !== 3 || 6 || 9) {
            return i
        } 
        else {
            return i+" 1"
        }
    })

    const newSumm = showedSumm.reverse().map((i,index) => {
        if(index === 3) {
            return i +" "
        } 
        if(index === 6) {
            return i +" "
        }
        if(index === 9) {
            return i +" "
        }
        else {
            return i
        }
    })

    const newNum = newSumm.reverse().join("")


  return newNum
}
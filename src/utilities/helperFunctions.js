
export function splitEveryNthChar(text, number){
    let splitString = []
    for(let i = 0; i < text.length; i+=number){
      splitString.push(text.substring(i, i+number))
    }

    return splitString.join(" ");
}
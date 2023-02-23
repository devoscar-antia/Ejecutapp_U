export const generateRandomIndex = (levelData) => {
    const randomElement = Math.floor(Math.random()*levelData.length);
    if (levelData[randomElement]){
        return randomElement;
    }else
    { 
       return levelData.length - 1;
    } 
}
export default class Utils {
    static getRandomColor() { 
        return `#${Math.floor(Math.random()*16777215).toString(16)}`; 
    }
}
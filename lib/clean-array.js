const cleanArray=(targetArray) => {
    return targetArray.filter((item, index, arr) => {
        return arr.indexOf(item) === index;
    }).sort().reverse();
}

export default cleanArray;
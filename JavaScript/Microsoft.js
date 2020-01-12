// sQustions from Devmates.co asked by Microsoft
/**
 * Given an array containing numbers 1 to n where array[i] = i+1.
 * 
 * Find the minimum number of jumps required from arr[0] to arr[n-1].
 * 
 * From current position i, we can jump to positions i+1, i+2, i+3 and i+4
 * There are optional boosters given in the form of an object like - 
 * {1: 15, 5: 10} which means, if we reached at index 1 we can directly jump 
 * to index 15
 * 
 * similarly, if we reached at index 5, we can directly jump to index 10.
 * 
 * Input: 
 * arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
 * boosters  = {3: 8, 5:10}
 * Output: 4
 * Why?
 * (1 -> 5 -> 10 -> 14 -> 15)
 * Author's note: 1 -> 3 -> 8 -> 12 -> 15 is also valid
 * @param {Array}  arr
 * @param {object} boosters
 * @return {number}
 */
function jumpMS(arr, boosters){
    console.log("Arr: ", arr);
    var curr = 1;
    path = [1];

    var ret = jumpMsHelper(arr, boosters, curr, path);
    var print =  "";
    ret.forEach((value,index) => {
        if (index == ret.length - 1){
            print = print.concat(value);
        } else { 
            print = print.concat(value + " -> ");
        }
        
    });
    console.log("Route: " + print);
    console.log("Output: " + (ret.length - 1));
    return ret.length - 1;
}

function jumpMsHelper(arr, boosters, curr, path){
    var pathManip = path.slice(); // copy for manipulation
    
    // if we are done, we can return this as the right path (two cases)
    if(curr == arr.length){
        return pathManip;
    }

    if (arr.length <= curr + 4){
        pathManip.push(arr.length);
        return pathManip;
    }
    
    // make the last entry empty so that we can use the same array in the loop
    pathManip.push(null);

    var check = []; // array to see what the possible paths are 

    // edge case for if we are at 1 and there's a booster at 1
    if (curr == 1 && boosters[1]){
        pathManip[1] = boosters[1];
        check.push(jumpMsHelper(arr, boosters, boosters[1], pathManip));
    } 

    // check if we are in range of a booster, recur on it if we are. 
    // don't recur on a booster on the current spot, it's already checked
    for (var i = curr + 1; i <= curr + 4; i++){
        pathManip[pathManip.length - 1] = i; 
        if (boosters[i]){
            var tmp = pathManip.slice();
            tmp.push(boosters[i]);
            check.push(jumpMsHelper(arr, boosters, boosters[i], tmp));    
        }
    }

    // also recur on the furthest we can jump as well
    pathManip[pathManip.length - 1] = curr + 4;
    check.push(jumpMsHelper(arr, boosters, curr + 4, pathManip));

   // return the shortest array of the list
    var shortLen = check[0].length;
    var shortest = 0;
    check.forEach((value, index) => {
        if (value.length < shortLen){
            shortLen = value.length;
            shortest = index;
        }
    });
    
    // return the shortest path
    return check[shortest];
}

jumpMS.test = function(){
    var inputs = [
        [1, {}],
        [12, {}],
        [15, {3: 8, 5:10}],
        [15, {5:10, 6:12}]
    ];

    // because I'm too lazy to write out that whole array
    inputs.forEach(function(value){
        var tmp = [];
        for (i = 0; i < value[0]; i++){
            tmp.push(i + 1);
        }
        value[0] = tmp;
    });
    inputs.forEach(value => jumpMS(value[0], value[1]));
};

jumpMS.test();
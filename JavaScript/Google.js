// Devmates.co questions asked by Google

/**
 * Given an array of non-negative integers, you are initially positioned at the 
 * first index of the array.
 * 
 * Each element in the array represents your maximum jump length at that 
 * position.
 * 
 * Determine if you are able to reach the last index.
 * 
 * Input: [2,3,1,1,4]
 * Output: true
 * Why?
 * Jump 1 step from index 0 to 1, then 3 steps to the last index.
 * Input: [3,2,1,0,4]
 * Output: false
 * Why?
 * You will always arrive at index 3 no matter what. 
 * Its maximum jump length is 0, 
 * which makes it impossible to reach the last index.
 * 
 * @param {Number[]} arr 
 * @returns {boolean}
 */
function jump(arr){
    // initializing some values for our starting case
    var curr = 0;
    var visited = Array(arr.length).fill(false);
    visited[0] = true;
    // pass it off to the recursive helper function
    return jumpHelper(arr, curr, visited);
}

// tester
jump.test = function(){
    console.log("Testing function: Jump");
    var inputs = [
        [2,3,1,1,4], // true
        [3,2,1,0,4]  // false
    ];
    inputs.forEach(element => console.log("OUTPUT:" + jump(element)));
};

/**
 * 
 * @param {number[]} arr 
 * @param {number} curr 
 * @param {boolean[]} visited an array of places that have been visited
 */
function jumpHelper(arr, curr, visited){
    // first check if we can get to the end from here
    if (arr[curr] >= arr.length - (curr + 1))
        return true;

    // temp visited array to change from the current visited array
    var tmpVisited = visited;
    // array of indexes that can be visited from here
    var toVisit = [];
    
    // figure out where to visit

    // the value at the spot we are at
    var currCount = arr[curr];
    // place holder variables for going forward and backwards on the array
    var tmpCurrForward = curr;
    var tmpCurrBackward = curr;
    // count down from the value going forward or back as appropriate
    for (var i = currCount; i > 0; i--){
        tmpCurrForward++;
        tmpCurrBackward--;
        
        // check forward first, it can't go off the end so no safety if needed
        if (!visited[tmpCurrForward]){
            visited[tmpCurrForward] = true;
            toVisit.push(tmpCurrForward);
        }
        
        // if we ran of the end of the array, we are done with this loop
        if(tmpCurrBackward < 0) continue;

        // otherwise we should do it too
        if(!visited[tmpCurrBackward]){
            visited[tmpCurrBackward] = true;
            toVisit.push(tmpCurrBackward);
        }        
    }

    // recurse on the places where we are visiting
    for(i = 0; i < toVisit.length; i++){
        if(jumpHelper(arr, toVisit[i], tmpVisited))
            return true;
    }
    // couldn't get a true to return with, oh well.
    return false;
}



/**
 * Given a non-empty array of digits representing a non-negative integer and 
 * each element in the array contain a single digit.
 * 
 * Subtract two integers represented as array and return result as array.
 * 
 * You may assume the integer does not contain any leading zero, except the 
 * number 0 itself.
 * 
 * Note: Converting to the integer and back to the array is not allowed.
 * 
 * Input: num1 = [3, 4, 5], num2 = [2,2,1]
 * Output: [1, 2, 4]
 * 
 * Input: num1 = [1, 0], num2 = [9]
 * Output: [1]
 * 
 * @param {Array} num1 
 * @param {Array} num2 
 * @returns {Array} ret
 */
function subtract(num1, num2){  
    if (num2.length > num1.length){
        console.error("num2 is larger than num1, returning null");
        return null;
    }

    // catch base case
    if (num2[0] == 0){
        return num1;
    }

    // start by returning all of the front of num1
    var ret = num1.slice(0, num1.length - num2.length);

    // current number to subtract, will be assigned value
    var curr = null;

    // iterate from front index of subtraction to the end
    for (var i = 0; i < num2.length; i++){
        // index we are currently in relative to num1
        var num1Pos = num1.length - num2.length + i; 
        
        // doing the subtraction of the current digit
        curr = num1[num1Pos] - num2[i];

        // carrying if needed
        if (curr < 0){
            curr += 10;
            var carry = true;
            for(var n = ret.length - 1; carry; n--){
                ret[n] -= 1;
                if (ret[n] < 0){
                    ret[n] += 10;
                } else {carry = false;}
            }
        }
        ret.push(curr);
    }

    // helper local function for carrying
    function carryFunc(ret){
        
    }

    // remove leading 0's from ret
    for(i=0; i < ret.length; i++){
        if (ret[i] == 0) {
            ret.shift();
            i--; // because ret is 1 shorter now
        } else {
            break;
        }
    }

    // All done
    return ret;
}

subtract.test = function(){
    console.log("Testing function: subtract");
    
    var inputs = [
        [[3, 4, 5], [2,2,1]], // [1, 2, 4]
        [[1, 0], [9]],   // [1]
        [[9, 3, 1], [8, 4, 1]] // [9,0]
    ];

    inputs.forEach(element => console.log("OUTPUT:" + subtract(element[0], element[1])));
};

// testing
jump.test();
subtract.test();
test(google);

/**
 * Given a non-empty array of digits representing a non-negative integer and each element in the array contain a single digit.
 * 
 * Subtract two integers represented as array and return result as array.
 * 
 * You may assume the integer does not contain any leading zero, except the number 0 itself.
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
function google(num1, num2){
    ret = [];
    
    if (num2.length > num1.length){
        console.error("num2 is larger than num1, returning null");
        return null;
    }

    // catch base case
    if (num2[0] == 0){
        return num1;
    }

    // carry flag
    var carry = false;
    // current number to subtract, will be assigned value
    var curr = null;

    // iterate from back to front
    for (i = 0; i < num2.length; i++){
        // it's easier to convert to real position here than in the loop
        var num1Pos = num1.length - (i + 1); 
        var num2Pos = num2.length - (i + 1);

        // actual subtraction
        curr = num1[num1Pos] - num2[num2Pos];
        
        // check if we need to carry or have carried
        if (carry) {
            curr--;
            carry = false;
        }
        if (curr < 0){
            curr += 10;
            carry = true;
        }
        ret.unshift(curr);
    }

    // okay we reached the end of num2, but we might still need to keep going
    for (i = num2.length; i < num1.length; i++){
        // keeping the same convention as before for logical consistency
        var curPos = num1.length - (i + 1);
        curr = num1[curPos];

        if (carry){
            curr--;
            carry = false;
        }
        if (curr < 0){
            curr += 10;
            carry = true;
        }
        ret.unshift(curr);
    }
    

    // remove leading 0's from ret
    for(i=0; i < ret.length; i++){
        if (ret[i] == 0) {
            ret.shift();
        } else {
            break;
        }
    }

    // All done
    return ret;
}

function test(func){
    console.log("testing function: " + func.name);

    var num1 = [];
    var num2 = [];

    var inputNumOne1 = [3, 4, 5];
    var inputNumTwo1 = [2,2,1];
    var inputNumOne2 = [1, 0];
    var inputNumTwo2 = [9];

    num1 = inputNumOne1;
    num2 = inputNumTwo1;


    console.log("input: [" + num1 + "]", "[" + num2 + "]");

    var ret =  func(num1,num2);

    console.log("output: [" + ret + "]\n\n");

    num1 = inputNumOne2;
    num2 = inputNumTwo2;

    console.log("input: [" + num1 + "]", "[" + num2 + "]");

    ret =  func(num1,num2);

    console.log("output: [" + ret + "]\n\n");
}

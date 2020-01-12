
test(grab);


/**
 * Given a non-empty array of digits representing a non-negative integer and each element in the array contain a single digit.
 * 
 * Add one (1) to this integer and return it as array.
 * 
 * You may assume the integer does not contain any leading zero, except the number 0 itself.
 * 
 * Input: [3,2,1]
 * Output: [3,2,2]
 * Input:[9,9,9]
 * Output: [1,0,0,0]
 * 
 * Input:[5,6,9]
 * Output: [5,7,0]
 * 
 * 
 * Note: Converting to the integer and back to the array is not allowed.
 * @param {Array} input 
 * @returns {Array}
 */
function grab(input){
    ret = [];
    carry = true;
    for (i = 0; i < input.length; i++){
        var index = input.length - (i + 1);
        curr = input[index];
        if (carry){
            curr++;
            carry = false;
        }
        if (curr > 9){
            curr -=10;
            carry = true;
        }
        ret.unshift(curr);
    }
    if (carry){
        ret.unshift(1);
    }
    return ret;
}


function test(func){
    console.log("testing function: " + func.name);

    var input = [];
    
    var input1 = [9, 9, 9];
    var input2 = [5, 6, 9];

    input = input1;

    console.log("input: [" + input + "]");

    var ret =  func(input);

    console.log("output: [" + ret + "]\n\n");

    input = input2;

    console.log("input: [" + input + "]");

    ret =  func(input);

    console.log("output: [" + ret + "]\n\n");
}

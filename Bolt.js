/* jshint esversion: 6*/
/**
 * Implement a basic calculator to evaluate a simple expression string.
 * 
 * The expression string contains only non-negative integers, +, -, *, / operators and empty spaces.
 * 
 * Input: "13+5 * 2 "
 * Output: 23
 * 
 * Input: " 15-4/2"
 * Output: 13
 * 
 * Input: " 24/2-  10/5  "
 * Output: 10
 * 
 * @param {String} str 
 */
function bolt(str){
    // local copy for ease of manipulation
    var manipulateStr = str;

    // trim all whitespace
    manipulateStr = manipulateStr.replace(/\s/g, "");

    // separate it into numbers & operations
    var operations  = manipulateStr.split(/\d+/g);
    var nums = manipulateStr.split(/[^0-9]/g);
    
    // remove the empty boxes from the operations
    operations.shift();
    operations.pop();

    // convert nums from string to integers
    nums.forEach(function(value,i){nums[i] = Number.parseInt(value);});

    // user helper function to solve the equation
    return solve(nums, operations);
}

/**
 * Recursive helper function that solves the equation
 * @param {number[]} nums 
 * @param {String[]} operations 
 * @return {number}
 */
function solve(nums, operations){   
    // end case
    if (operations.length == 1){
        switch(operations[0]){
            case "+": return nums[0] + nums[1];
            case "-": return nums[0] - nums[1];
            case "*": return nums[0] * nums[1];
            case "/": return nums[0] / nums[1];
        }
    }

    // two copies of nearly identicle code to make sure  of order of operations
    var check = operations.findIndex(element => element == "*" || element == "/");
    if (check >= 0){
        
        // solve this current one
        var curr = solve([nums[check], nums[check+1]],[operations[check]]);
        
        // split operations and numbers into before and after
        var opsBefore = operations.slice(0,check);
        var opsAfter = operations.slice(check + 1,operations.length);
        var numsBefore = nums.slice(0,check);
        var numsAfter = nums.slice(check + 2, nums.length);
        
        // add out solved answer onto the array
        numsBefore.push(curr);

        // recur onto it
        return solve(numsBefore.concat(numsAfter), opsBefore.concat(opsAfter));
    }
   
    // same as previous if, but for addition and subtraction
    check =  operations.findIndex(element => element == "+" || element == "-");
    if (check >= 0){
        var opsBefore = operations.slice(0,check);
        var curr = solve([nums[check], nums[check+1]],[operations[check]]);
        var opsAfter = operations.slice(check + 1,operations.length);
        var numsBefore = nums.slice(0,check);
        var numsAfter = nums.slice(check + 2, nums.length);

        // add out solved answer onto the array
        numsBefore.push(curr);

        return solve(numsBefore.concat(numsAfter), opsBefore.concat(opsAfter));
    }
    throw new Error("Got to the end of recursion");

}



function test(func){
    var inputs = [
        "13+5 * 2 ",
        " 15-4/2",
        " 24/2-  10/5  ",
        "12 +3 - 1 + 9",
        "12+9/3-1+6*3*3/6"
    ];
    console.log("**********************\nSTARTING\n**********************");
    for (var value of inputs){
        console.log("OUTPUT: " + func(value));
    }
}

test(bolt);
console.log("Bloomberg 12/4/19: \n");

// Put the actual testing here for ease of access
test(bloomberg);
test(bloombergJS);

/**
 * Given a string S and a character C.
 * 
 * Return an array of integers representing the shortest distance from the character C to each character in the string.
 * 
 * Input: S = "helloworld", C = 'o'
 * Output: [4, 3, 2, 1, 0, 1, 0, 1, 2, 3]
 * 
 * Input: S = "bloomberg", C = 'o'
 * Output: [2, 1, 0, 0, 1, 2, 3, 4, 5]
 * 
 * Note: this implimentation runs in O(n^2)
 * @param {String} S string to search
 * @param {String} C character to find
 * @returns {Array} Strings
 */
function bloomberg(S, C){
    // return array
    var ret = [];
    
    // iterates through string and pushes distances on
    for (var i = 0; i < S.length; i++){
        // the distance to push on
        dist = 0;
        // which character we are currently looking at
        currF = i;
        currB = i;
        while (S.charAt(currB) != C && S.charAt(currF) != C){
            dist++;
            currF++;
            currB--;
            // Silly error catching
            if (dist > S.length){
                console.log("string not found");
                return ret;
            }
        }
        ret.push(dist);
    }
    return ret;
}

/**
 * Like bloomberg() but takes advantage of JS as opposed to doing it all with
 * loops. More robust and bugproof.
 * @param {String} s 
 * @param {String} c
 * @returns {Array} 
 */
function bloombergJS(s,c){
    // Array to return
    var ret = [];
    // Array of places we found the character
    var pos = [];

    // Filling pos[]
    var curr = s.indexOf(c);
    while (curr != -1) {
        pos.push(curr);
        curr = s.indexOf(c, curr + 1);
    }
    
    // catching errors
    if (pos.length == 0){
        console.log("String not found");
        return ret;
    }

    // 
    for (i = 0; i < s.length; i++){
        dist = s.length;
        for (t = 0; t < pos.length; t++){
            var posCurr = Math.abs(i - pos[t]);
            if (posCurr < dist){
                dist = posCurr;
            }
        }
        ret.push(dist);
    }
    console.log("pos: [" + pos + "]");
    return ret;
}

/**
 * This is a shortcut to test both quickly
 * @param {Function} func 
 */
function test(func){
    console.log("testing function: " + func.name);

    var s = "";
    var c = '';

    var inputS1 = "helloworld";
    var inputC1 = 'o';
    var inputS2 = "bloomberg";
    var inputC2 = 'o';

    s = inputS1;
    c = inputC1;


    console.log("input: \"" + s + "\", \"" + c+ "\"");

    var ret =  func(s,c);

    console.log("output: [" + ret + "]\n\n");

    s = inputS2;
    c = inputC2;

    console.log("input: \"" + s + "\", \"" + c+ "\"");

    ret =  func(s,c);

    console.log("output: [" + ret + "]\n\n");
}

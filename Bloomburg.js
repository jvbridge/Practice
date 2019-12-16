/**
 * Given a string S and a character C.
 * 
 * Return an array of integers representing the shortest distance from the 
 * character C to each character in the string.
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
function distanceCalc(S, C){
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

distanceCalc.test = function(){
    console.log("testing function: distanceCalc");

    var input = [
        ["helloworld", 'o'], // [4, 3, 2, 1, 0, 1, 0, 1, 2, 3]
        ["bloomberg", 'o'] // [2, 1, 0, 0, 1, 2, 3, 4, 5]
    ];

    input.forEach(function(value, index){
        console.log("input: \"" + value[0] + "\", \"" + value[1]+ "\"");
        var ret = distanceCalc(value[0], value[1]);
        console.log("output: [" + ret + "]\n\n");
    });
};

/**
 * Like distanceCalc() but takes advantage of JS as opposed to doing it all with
 * loops. More robust and bugproof.
 * @param {String} s 
 * @param {String} c
 * @returns {Array} 
 */
function distanceCalcJS(s,c){
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

    //  iterate over array, at each point count the distance
    for (var i = 0; i < s.length; i++){
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

distanceCalcJS.test = function(){
    console.log("testing function: distanceCalcJS");

    var input = [
        ["helloworld", 'o'], // [4, 3, 2, 1, 0, 1, 0, 1, 2, 3]
        ["bloomberg", 'o'] // [2, 1, 0, 0, 1, 2, 3, 4, 5]
    ];

    input.forEach(function(value, index){
        console.log("input: \"" + value[0] + "\", \"" + value[1]+ "\"");
        var ret = distanceCalcJS(value[0], value[1]);
        console.log("output: [" + ret + "]\n\n");
    });
};

distanceCalc.test();
distanceCalcJS.test();
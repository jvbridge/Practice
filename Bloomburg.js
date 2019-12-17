// Qustions from Devmates.co asked by Bloomburg
/**
 * There are 2N people a company is planning to interview. The cost of flying 
 * the i-th person to city A is costs[i][0], and the cost of flying the i-th 
 * person to city B is costs[i][1].
 * 
 * Return the minimum cost to fly every person to a city such that exactly N 
 * people arrive in each city.
 * 
 * Input: [[10,20],[30,200],[400,50],[30,20]]
 * Output: 110
 * Why?
 * The first person goes to city A for a cost of 10.
 * The second person goes to city A for a cost of 30.
 * The third person goes to city B for a cost of 50.
 * The fourth person goes to city B for a cost of 20.
 *
 * The total minimum cost is 10 + 30 + 50 + 20 = 110 
 * to have half the people interviewing in each city.
 * @param {Array[Number[]]} people 
 */
function flying(people){
    
    // array of indexes that should go to CityA
    var cityA = [];

    // array of indexes that should go to CityB
    var cityB = [];
   
    // iterate over people and push the smaller one to each city 
    people.forEach(function(value, index){
        if (value[0] < value[1]){
            cityA.push(index);
        } else {cityB.push(index);}
    });

    // even out the arrays
    while(cityB.length != cityA.length){
        var diffs = []; // array of differences
        var min; // index of lowest difference
        
        if (cityA.length > cityB.length){
            
            cityA.forEach(function(value){
                diffs.push(people[value][1] - people[value][0]);
            });
            // find lowest difference
            min = diffs.indexOf(Math.min(...diffs));

            // move that element from city A to City B
            var tmp = cityA.splice(min,1);
        cityB.push(tmp[0]);
        } else {
            cityB.forEach(function(value){
                diffs.push(people[value][0] - people[value][1]);
            });
            // find lowest difference
            min = diffs.indexOf(Math.min(...diffs));

            // move that element from city B to City A
            var tmp = cityB.splice(min,1);
            cityA.push(tmp[0]);

        } 
    }
    
    // iterate over both arrays, add their values up, return the total

    var ret = 0; // return value

    var retArray = Array(people.length).fill(null); // used to output to console

    cityA.forEach(function(value){
        var cost = people[value][0];
        var curr = value + 1;
        ret += cost;
        retArray[value] = "A";
    });

    cityB.forEach(function(value){
        var cost = people[value][1];
        var curr = value + 1;
        ret += cost;
        retArray[value] = "B";
    });

    // output to console
    retArray.forEach(function(value, index){
        var curr = index + 1;
        var cost;
        if (value == "A"){
            cost = people[index][0];
        } else {cost = people[index][1];}

        console.log("Person #"+curr+" goes to City "+value+" Costing $"+cost);
    });
    console.log("Final cost: $" + ret);
    return ret;
}

flying.test = function(){
    var inputs = [
        [[10,20],[30,200],[400,50],[30,20]],
        [[20,10],[200,30],[50,400],[20,30]],
        [[10,20],[20,30],[50,400],[30,10]]
    ];

    inputs.forEach(function(value){
        flying(value);
    });
};

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
flying.test();
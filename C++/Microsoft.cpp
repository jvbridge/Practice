// Qustions from Devmates.co asked by Microsoft
// translated into C++ to remember all of this

// main function
int main(int argc, char **argv){
    jumpMSTest();
}

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
 * @param {arr}  arr
 * @param {object} boosters
 * @return {int} length of 
 */
void jumpMS(int *arr, Booster boosters){

}

class Booster {

};



void jumpMSTest(){

}
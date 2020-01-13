// Qustions from Devmates.co asked by Microsoft
// translated into C++ to brush up on the language
using namespace std;

// #include <tuple>
#include <vector>
#include <iostream>
#include <sstream>

const int range = 4; // how far you can move in one jump

/**
 * struct holding each booster, used
 */ 
struct Booster {
    int from;
    int to;
};

/**
 * @param path a vector of ints representint the path spaces
 */
string printPath(vector<int> path){
    string print = "(";
    for (auto i = path.begin(); i !=path.end(); ++i){
        if (path.end() - i == 1){
            print = print + std::to_string(*i);
        } else {
            print = print + std::to_string(*i) + " -> ";
        }
    }
    print = print + ")";
    return print;
}

/*
 * Helper function for recursion
 */
vector<int> jumpMsHelper(int arr, vector<Booster> boosters, int curr, vector<int> path){
    // if we are done we can return this as the right path (two cases)
    if (curr == arr){
        return path;
    }

    if(arr <= curr + range){
        path.push_back(arr);
        return path;
    }
    
    // make the last entry empty so that we can use the same array in the loop 
    path.push_back(NULL);

    vector< vector<int> > check; // vector of possible paths there are from here
    
    // edge case for if we are at 1 and there's a booster at 1
    if (curr == 1 && boosters[0].from == 1){
        path[1] = boosters[0].to;
        check.push_back(jumpMsHelper(arr, boosters, boosters[0].to, path));
    }

    // check if we are in range of a booster, recur on it if we are
    // don't recur on a booster on the current spot, it's already been checked
    for(int i = curr + 1; i <= curr + range; i++){
        path[path.size() - 1] = i; // overwrites the edge case if it happened
        // check if boosters has a member for the current place
        // recur on it if there is one
        for (auto n = boosters.begin(); n != boosters.end(); n++){
            if (n->from == i){
                std::vector<int> tmp(path);  // quick copy 
                tmp.push_back(n->to);
                check.push_back(jumpMsHelper(arr, boosters, n->to, tmp));
            }
        }

    }

    // also recur on the furthest we can jump as well
    path.back() = curr + range;
    check.push_back(jumpMsHelper(arr, boosters, curr + range, path));

    // return the shortest vector of our check vector
    int shortLen = check.front().size();
    vector< vector<int> >::iterator shortest = check.begin();
    for (auto i = check.begin(); i != check.end(); ++i){
        if(i->size() < shortLen){
            shortLen = i->size();
            shortest = i;
        }
    }
    return *shortest;
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
 * example
 * Input: 
 * arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
 * boosters  = {3: 8, 5:10}
 * Output: 4
 * Why?
 * (1 -> 5 -> 10 -> 14 -> 15)
 * Author's note: 1 -> 3 -> 8 -> 12 -> 15 is also valid
 * @param  arr the length of the array for it
 * @param booster an array of Booster objects 
 * @return the minimum number of jumps to the end
 */
int jumpMS(int arr, vector<Booster> boosters){
    cout << "doing array length: " << arr << '\n';
    int curr = 1;
    vector<int> path(1,1);

    vector<int> ret = jumpMsHelper(arr, boosters, curr, path);

    cout << printPath(ret) << '\n';
    return ret.size() - 1;
}

// function used to intitilaize tests
void jumpMsTest(){
    vector<Booster> first(2);
    first[0].from = 3;
    first[0].to = 8;

    first[1].from = 5;
    first[1].to = 10;

    cout << "testing 15 and boosters: \n";
    for(auto i = first.begin(); i != first.end(); ++i){
        std::cout << i->from << " ->  " << i->to << '\n' ;
    }

    int output = jumpMS(15, first);
    cout << "Output: " << output << ' ';
}

int main(int argc, char **argv){
    jumpMsTest();
    return 0;
} 
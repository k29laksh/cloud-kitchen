#include<bits/stdc++.h>
using namespace std;
int main(){
    unordered_map<string,vector<string>> mp;
    for(int i:v){
        for(int j:i){
            unordered_map<string,int> mp2;
            for(int k=0;k<i.size();k++){
                if(i[k]!=j){
                    mp2[i[k]]++;
                }
            }
            vector<pair<int,string>> temp;
            for(auto it:mp2){
                temp.push_back({it.second,it.first});
            }
            sort(temp.begin(),temp.end(),greater<int>());
            mp[j]=temp;
        }
    }
    return 0;
}
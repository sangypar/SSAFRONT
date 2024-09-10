using System;
using System.Collections.Generic;
using System.Linq;

public class Solution {
    public int[] solution(string[] genres, int[] plays) {
        Dictionary<string, int> genreranking = new Dictionary<>();
          for (int i = 0; i < genres.Length; i++)
           {
              if (genreranking.ContainsKey(genres[i]))
             {
                genreranking[genres[i]] += plays[i];
              }
            else
            {
                genreranking[genres[i]] = plays[i];
            }
        }

        Dictionary<string, List<(int playCount, int index)>> genrelist = new Dictionary<string, List<(int, int)>>();
        
        for (int i = 0; i < genres.Length; i++)
        {
            if (!genrelist.ContainsKey(genres[i]))
            {
                genrelist[genres[i]] = new List<(int, int)>();
            }
            genrelist[genres[i]].Add((plays[i], i));
        }

        
    }
}
using System;
using System.Collections;
using System.Collections.Generic;

public class Solution
{
    public int[] solution(int n, string[] words)
    {
        ArrayList word = new ArrayList();
        char end = words[0][0]; 

        for (int i = 0; i < words.Length; i++)
        {
            string now = words[i];
            if (word.Contains(now) || now[0] != end)
            {
                int person = (i % n) + 1;
                int time = (i / n) + 1;
                return new int[] { person, time };
            }

            word.Add(now);
            end = now[now.Length - 1];
        }

        return new int[] { 0, 0 }; 
    }
}

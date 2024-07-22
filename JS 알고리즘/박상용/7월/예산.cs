using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

public class Solution
{
    public int solution(int[] d, int budget)
    {
        Array.Sort(d); 
        int answer = 0;
        int cost = 0;

        foreach (int idx in d)
        {
            cost += idx;
            if (cost > budget)
            {
                break;
            }
            answer++;
        }

        return answer;
    }
}
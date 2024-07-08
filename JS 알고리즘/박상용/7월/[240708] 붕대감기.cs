using System;
using System.Collections.Generic;

class Solution
{
    public int solution(int[] bandage, int health, int[][] attacks)
    {
        int now = health;
        int max = health;
        int healtime = 0;
        for (int i = 1; i <= attacks[attacks.Length - 1][0]; i++)
        {
            Boolean attackflag = false;
            int damage = 0;
            for (int j = 0; j < attacks.Length; j++)
            {
                if (i == attacks[j][0])
                {
                    attackflag = true;
                    damage = attacks[j][1];
                    healtime = 0;
                    break;
                }

            }
            if (attackflag)
            {
                now -= damage;
                if (now <= 0)
                {
                    return -1;
                }
            }
            else
            {
                healtime++;
                if (healtime == bandage[0])
                {
                    healtime = 0;
                    now += bandage[2];
                }
                now += bandage[1];
                now = now >= max ? max : now;
            }

        }

        return now;
    }

    static void Main(string[] args)
    {
        Solution sol = new Solution();

        int[] bandage = { 1, 1, 1 };
        int health = 5;
        int[][] attacks = new int[][] {
            new int[] { 1, 2 },
            new int[] { 3, 2 }
        };

        int result = sol.solution(bandage, health, attacks);
        Console.WriteLine(result); 
    }

}
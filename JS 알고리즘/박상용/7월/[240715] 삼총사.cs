using System;
using System.Collections.Generic;

public class Solution
{
    public int solution(int[] number)
    {
        int count = 0;
        int n = number.Length;

        // 모든 조합을 찾기 위해 3중 루프 사용
        for (int i = 0; i < n - 2; i++)
        {
            for (int j = i + 1; j < n - 1; j++)
            {
                for (int k = j + 1; k < n; k++)
                {
                    if (number[i] + number[j] + number[k] == 0)
                    {
                        count++;
                    }
                }
            }
        }

        return count;
    }
}

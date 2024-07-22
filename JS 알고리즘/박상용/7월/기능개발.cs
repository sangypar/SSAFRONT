using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
public class Solution
{
    public List<int> solution(int[] progresses, int[] speeds)
    {
        int[] arr = new int[progresses.Length];

        for (int i = 0; i < progresses.Length; i++)
        {
            int tmp = 100 - progresses[i];
            int time = (int)Math.Ceiling((double)tmp / speeds[i]);
            arr[i] = time;
        }

        List<int> answer = new List<int>();
        int max = arr[0];
        int count = 1;

        for (int i = 1; i < arr.Length; i++)
        {
            if (arr[i] <= max)
            {
                count++;
            }
            else
            {
                answer.Add(count);
                max = arr[i];
                count = 1;
            }
        }

        answer.Add(count);

        return answer;
    }
}

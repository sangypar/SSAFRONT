public class Solution
{
    public int solution(string s)
    {
        string[] number = { "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine" };
        int answer = 0;

        for (int i = 0; i < s.Length; i++)
        {
            answer *= 10;
            int tmp = 0;
            if (s[i] >= '0' && s[i] <= '9')
                tmp = s[i]- '0';
            else
            {
                for (int j = 0; j < 10; j++)
                {
                    for (int k = 0; k < number[j].Length; k++)
                    {
                        if (s[i + k] != number[j][k])
                            break;
                        if(k == number[j].Length - 1)
                        {
                            tmp = j;
                            i += number[j].Length - 1;
                            goto outout;
                        }
                    }
                }
            outout:;
            }
            answer += tmp;
        }
        return answer;
    }
}

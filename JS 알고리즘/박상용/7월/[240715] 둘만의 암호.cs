using System;
using System.Collections.Generic;

public class Solution
{
    public string solution(string s, string skip, int index)
    {

        string answer = "";
        for(int i =0; i < s.Length; i++)
        {
            int tmp = index;
            char c = s[i];
            while(tmp > 0)
            {
                c++;
                if( c > 'z')
                    c = 'a'
                for(int j = 0;j < skip.Length; j++)
                {
                    if(c== skip[j])
                    {
                        tmp++;
                        break;
                    }

                }
                tmp--;
            }
            answer += c;
        }


        return answer;
    }
}
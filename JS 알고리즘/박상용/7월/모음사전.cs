using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
public class Solution
{
    public int solution(string word)
    {
        char[] vowels = { 'A', 'E', 'I', 'O', 'U' };
        int result = word.Length;
        int tmp = 781;

        for (int i = 0; i < word.Length; i++)
        {
            int idx = Array.IndexOf(vowels, word[i]);
            result += idx * tmp;
            tmp = (tmp - 1) / 5; 
        }

        return result; 
    }
}

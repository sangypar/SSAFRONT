using System;
using System.Collections.Generic;

public class Solution
{
    public bool solution(string s)
    {
        Stack<char> stack = new Stack<char>();

        for (int i = 0; i < s.Length; i++)
        {
            char c = s[i];
            if (c == '(')
                stack.Push(c);
            else if (c == ')')
            {
                if (stack.Count == 0)
                    return false;        
                stack.Pop();
            }
        }
        return stack.Count == 0;
    }
}
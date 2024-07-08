public class Solution
{
    public List<int> solution(int[] answers)
    {
        int a = 0, b = 0, c = 0;
        for (int i = 0; i < answers.Length; i++)
        {
            if (answers[i] == i % 5 + 1)
                a++;
            if ((i % 2 == 0 && answers[i] == 2) || (i % 8 == 1 && answers[i] == 1) || (i % 2 == 1 && i % 8 != 1 && (i % 8) / 2 + 2 == answers[i]))
                b++;
            if (((i % 10 <= 1) && (answers[i] == 3)) || ((i % 10 > 1) && (i % 10 <= 3) && (answers[i] == 1)) || ((i % 10 > 3) && (i % 10 <= 5) && (answers[i] == 2)) || ((i % 10 > 5) && (i % 10 <= 7) && (answers[i] == 4)) || ((i % 10 > 7) && (i % 10 <= 9) && (answers[i] == 5)))
                c++;
        }

        int max = Math.Max(a, b);
        max = Math.Max(max, c);

        List<int> answer = new List<int>();
        int num = 0;
        if (a == max)
            answer.Add(1);
        if (b == max)
            answer.Add(2);
        if (c == max)
            answer.Add(3);

        return answer;
    }
}
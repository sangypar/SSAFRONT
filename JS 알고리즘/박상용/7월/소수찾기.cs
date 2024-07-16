class Solution
{
    static bool[] visited;
    static HashSet<int> combnum;
    static int len, answer = 0;
    static List<char> numList;
    static bool[] pri = new bool[10000000];

    public int solution(string numbers)
    {
        Array.Fill(pri, true);
        pri[0] = false;
        pri[1] = false;

        for (int i = 2; i * i < pri.Length; i++)
        {
            if (pri[i])
            {
                for (int j = i * i; j < pri.Length; j += i)
                {
                    pri[j] = false;
                }
            }
        }

        combnum = new HashSet<int>();
        numList = numbers.ToList();

        for (int i = 1; i <= numbers.Length; i++)
        {
            len = i;
            visited = new bool[numbers.Length];
            comb(0, "");
        }

        return answer;
    }

    private void comb(int count, string s)
    {
        if (count == len)
        {
            if (s[0] != '0')
            {
                int num = int.Parse(s);
                if (pri[num]) { 
                     answer++;
                    pri[num] = false;
                }
            }
            return;
        }

        for (int i = 0; i < numList.Count; i++)
        {
            if (!visited[i])
            {
                visited[i] = true;
                comb(count + 1, s + numList[i]);
                visited[i] = false;
            }
        }
    }
}

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {
	public List<Integer> solution(int N, int[] stages) {
		int[] counting = new int[N + 2];

		for (int i = 0; i < stages.length; i++) {
			counting[stages[i]]++;
		}

		Map<Integer, Double> map = new HashMap<>();
		double person = stages.length;
		for (int i = 1; i < counting.length - 1; i++) {
			if (person <= 0)
				map.put(i, (double) 0);
			else
				map.put(i, counting[i] / person);
			person -= counting[i];
		}

		List<Integer> list = new ArrayList<>(map.keySet());

		Collections.sort(list, (v1, v2) -> (map.get(v2).compareTo(map.get(v1)))); 

		return list;
	}
}
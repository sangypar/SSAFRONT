import java.util.Arrays;
import java.util.LinkedList;
import java.util.Queue;

class psy_석유시추 {
	static int lownum, highnum, count, N, M;
	static boolean[][] visited;
	static int[] dr = { -1, 1, 0, 0 };
	static int[] dc = { 0, 0, -1, 1 };

	static class Oil {
		int r;
		int c;

		public Oil(int r, int c) {
			this.r = r;
			this.c = c;
		}

	}

	public int solution(int[][] land) {
		int answer = 0;
		M = land.length;
		N = land[0].length;
		visited = new boolean[M][N];
		int[] arr = new int[N];

		for (int r = 0; r < land.length; r++) {
			for (int c = 0; c < land[r].length; c++) {
				if (land[r][c] == 1) {
					bfs(r, c, land);
					for (int i = lownum; i <= highnum; i++) {
						arr[i] += count;
					}
				}
			}
		}
		for(int i = 0; i < arr.length; i++)
			answer = Math.max(answer, arr[i]);
		return answer;
	}

	private void bfs(int r, int c , int[][] land) {
		lownum = Integer.MAX_VALUE;
		highnum = Integer.MIN_VALUE;
		count = 0;
		if (visited[r][c]) {
			return;
		}
		Queue<Oil> q = new LinkedList<>();

		q.add(new Oil(r, c));

		while (!q.isEmpty()) {
			Oil tmpoil = q.poll();
			int nr = tmpoil.r;
			int nc = tmpoil.c;
			if(visited[nr][nc])
				continue;
			visited[nr][nc] = true;
			count++;
			lownum = Math.min(lownum, nc);
			highnum = Math.max(highnum, nc);

			for (int d = 0; d < 4; d++) {
				int nnr = nr + dr[d];
				int nnc = nc + dc[d];
				if (nnr >= 0 && nnc >= 0 && nnr < M && nnc < N && land[nnr][nnc] == 1 &&!visited[nnr][nnc]) {
					q.add(new Oil(nnr, nnc));
				}
			}
		}
	}
}
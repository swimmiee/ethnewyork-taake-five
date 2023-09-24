import axios from "axios";

// axios 호출 결과값의 중요 data는 res.data에 담겨있고,
// subgraph query 결과는 항상 {data: ...}의 형식이므로
// 우리가 얻고자 하는 데이터는 res.data.data에 담겨있다.
export async function query<T>(subgraph: string, query: string): Promise<T> {
  return axios
    .post<{ data: T }>(subgraph, { query }, { timeout: 100000 })
    .then((res) => res.data.data);
}

// 가장 최근에 Sync된 blocknumber 구하기
export async function syncBlockQuery(subgraph: string) {
  const q = `{ 
      _meta{
        block {
          number
          timestamp
        }
      }
    }`;

  return query<any>(subgraph, q).then((res) => {
    return {
      blockNumber: res._meta.block.number,
      timestamp: res._meta.block.timestamp,
    };
  });
}

// 각 protocol(exchange)별 subgraph 쿼리문은
// protocols/~~~.graph.service.ts에 별도로 작성한다.
// 또한, graph 쿼리 결과에 필요한 dto interface 파일은
// interfaces/~~protocol-name~~/~~.dto.ts 형식으로 저장한다.

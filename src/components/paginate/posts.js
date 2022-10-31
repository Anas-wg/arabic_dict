import { useState, useEffect } from "react";
import styled from "styled-components";
import Pagination from "./Pagination";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  const [isShow, setIsShow] = useState(false)

  function toggleShow(){
    setIsShow(!isShow)
  }

  useEffect(() => {
    fetch("https://gist.githubusercontent.com/Anas-wg/47b4ad03b99068bf063fbbc618c3ed1a/raw/4b8d0a9ddeb53d437d818d158c0e85fb002ee110/WordItems.json")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);



  return (
    <Layout>
      <Main>
        {posts.slice(offset, offset + limit).map(({ id, single,plural, mean, example, exmean, part }) => (
          <Article key={id}>
            <h3>
              {single}-{plural}
            </h3>
            <p>{mean}</p>
            <p>{isShow && example}</p>
            <p>{isShow && exmean}</p>
            <Button onClick={toggleShow}>{isShow ? "🔼" : "🔽"}</Button>
          </Article>
        ))}
      </Main>

      <footer>
        <Pagination 
            total={posts.length}
            limit = {limit}
            page = {page}
            setPage={setPage}
        />
      </footer>
      <label>
        패이지 당 표시할 게시물 수: ;
        <select
            type = "number"
            value={limit}
            onChange={({ target: {value} })=> setLimit(Number(value))}
        >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
        </select>
      </label>
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
`;

const Main =styled.main`
`

const Article = styled.div`
  font-family: 'IBM Plex Sans';
  width: 350px;
  background : #FAFAFA;
  border-radius: 10px;

`

const Button = styled.button`
  border: none;
  background: #FAFAFA;
`

export default Posts;

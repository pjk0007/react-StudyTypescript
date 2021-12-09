import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { isDarkAtom } from "../atoms";

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  border-bottom: 2px solid ${(props) => props.theme.accentColor};
  padding: 0 50px;
  box-shadow: 0px 3px 30px ${(props) => props.theme.accentColor};
`;

const Home = styled.div`
  font-size: 25px;
  font-weight: 600;
`;

const Toggle = styled.button`
  background-color: ${(props) => props.theme.accentColor};
  color: ${(props) => props.theme.textColor};
  padding: 7px 10px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-size: 20px;
`;

function NavBar() {
  const [isDark, setIsDarkAtom] = useRecoilState(isDarkAtom);
  const toggleIsDarkAtom = () => setIsDarkAtom((prev) => !prev);

  return (
    <Head>
      <Home>
        <Link
          to={{
            pathname: process.env.PUBLIC_URL + `/`,
          }}
        >
          NOMAD COIN
        </Link>
      </Home>
      <Toggle onClick={toggleIsDarkAtom}>{isDark ? "🌜" : "🌞"}</Toggle>
    </Head>
  );
}

export default NavBar;

import { motion } from "framer-motion";
import styled from "styled-components";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  background-color: black;
  height: 80px;
  font-size: 12px;
  color: white;
  padding: 0 50px;
`;

const Col = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.svg`
  margin-right: 50px;
  width: 95px;
  height: 25px;
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
`;

const Item = styled.li`
  margin-right: 20px;
`;

function Header() {
  return (
    <Nav>
      <Col>
        <Logo>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.0"
            viewBox="0 0 1028.000000 284.000000"
            preserveAspectRatio="xMidYMid meet"
          >
            <g
              transform="translate(0.000000,284.000000) scale(0.100000,-0.100000)"
              fill="#E50914"
              stroke="none"
            >
              <path d="M0 1439 l0 -1371 38 7 c20 3 116 16 212 28 l175 23 3 687 2 687 485 0 485 0 0 655 0 655 -700 0 -700 0 0 -1371z m950 716 l0 -285 -255 0 -255 0 0 285 0 285 255 0 255 0 0 -285z" />
              <path d="M1840 1537 l0 -1272 588 47 c323 26 590 47 595 48 4 0 7 92 7 205 l0 205 -67 0 c-38 0 -198 -9 -358 -20 -159 -11 -300 -20 -312 -20 l-23 0 0 319 c0 282 2 320 16 325 9 3 139 6 290 6 l274 0 0 217 0 216 -290 -6 -290 -5 0 294 0 294 380 0 380 0 0 210 0 210 -595 0 -595 0 0 -1273z" />
              <path d="M3310 2600 l0 -210 225 0 225 0 0 -1002 0 -1001 98 6 c53 4 150 7 215 7 l117 0 0 995 0 995 225 0 225 0 0 210 0 210 -665 0 -665 0 0 -210z" />
              <path d="M4920 1615 l0 -1195 210 0 210 0 0 490 0 490 300 0 300 0 0 215 0 215 -300 0 -300 0 0 280 0 280 395 0 395 0 0 210 0 210 -605 0 -605 0 0 -1195z" />
              <path d="M6400 1602 l0 -1209 203 -6 c111 -4 357 -16 547 -27 190 -11 362 -20 383 -20 l37 0 0 209 0 208 -77 7 c-43 3 -177 10 -298 16 -121 6 -253 13 -292 16 l-73 6 0 1004 0 1004 -215 0 -215 0 0 -1208z" />
              <path d="M7930 1560 l0 -1249 33 -5 c39 -6 313 -26 356 -26 l31 0 0 1265 0 1265 -210 0 -210 0 0 -1250z" />
              <path d="M8739 2788 c5 -13 117 -303 250 -646 l240 -622 -275 -631 c-152 -347 -274 -632 -272 -634 1 -2 86 -13 187 -25 101 -11 203 -25 226 -29 l41 -8 153 361 c85 199 157 364 160 368 3 4 75 -173 160 -392 85 -220 154 -400 155 -400 6 -3 481 -77 482 -76 1 0 -122 327 -273 725 l-275 723 266 637 c145 350 268 644 271 654 7 16 -8 17 -227 17 l-234 0 -149 -361 c-82 -198 -151 -357 -153 -352 -2 4 -65 166 -140 358 l-138 350 -232 3 -232 2 9 -22z" />
            </g>
          </svg>
        </Logo>
        <Items>
          <Item>Home</Item>
          <Item>TV Shows</Item>
        </Items>
      </Col>
      <Col>
        <button>Search</button>
      </Col>
    </Nav>
  );
}

export default Header;

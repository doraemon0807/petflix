import { motion, useAnimation, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  height: 80px;
  font-size: 14px;
  color: ${(props) => props.theme.white.lighter};
  padding: 0 50px;
  z-index: 9999;
`;

const Col = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.div`
  margin-right: 50px;
  width: 95px;
  height: 25px;
`;

const Svg = styled(motion.svg)`
  fill: ${(props) => props.theme.red};
  path {
    stroke: ${(props) => props.theme.red};
    stroke-width: 30px;
    transform: translate(0, 284px) scale(0.1, -0.1);
  }
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
`;

const Item = styled.li`
  margin-right: 20px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-weight: 400;
  text-shadow: 1px 1px ${(props) => props.theme.black.lighter};
`;

const Underbar = styled(motion.span)`
  position: absolute;
  bottom: -12px;
  left: 2px;
  right: 0;
  margin: 0 auto;
  width: 90%;
  height: 3px;
  border-radius: 1px;
  background-color: ${(props) => props.theme.red};
`;

const Search = styled.form`
  color: white;
  display: flex;
  align-items: center;
  position: relative;
  label {
    svg {
      cursor: pointer;
      height: 25px;
      z-index: 2;
      position: relative;
    }
  }
`;

const Input = styled(motion.input)`
  transform-origin: right center;
  position: absolute;
  left: -220px;
  height: 40px;
  width: 250px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0.5;
  color: white;
  padding-left: 40px;
  border-radius: 5px;
`;

const logoVariant = {
  normal: {
    fillOpacity: 1,
  },
  active: {
    fillOpacity: [1, 0, 1],
    transition: {
      repeat: Infinity,
    },
  },
};

const navVariant = {
  top: {
    background: "linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)",
    backgroundColor: "rgba(0,0,0,0)",
  },
  scroll: {
    backgroundColor: "rgba(0,0,0,1)",
  },
};

interface IForm {
  keyword: string;
}

function Header() {
  const [searchOpen, setSearchOpen] = useState(false);

  const homeMatch = useMatch("");
  const tvMatch = useMatch("tv");
  const movieMatch = useMatch("movies/:movieId");

  const inputAnimation = useAnimation();
  const navAnimation = useAnimation();

  const { scrollY } = useScroll();

  const handleToggleSearch = () => {
    if (searchOpen) {
      inputAnimation.start({
        scaleX: 0,
      });
    } else {
      inputAnimation.start({
        scaleX: 1,
      });
    }
    setSearchOpen((prev) => !prev);
  };

  useEffect(() => {
    scrollY.onChange(() => {
      if (scrollY.get() > 50) {
        navAnimation.start("scroll");
      } else {
        navAnimation.start("top");
      }
    });
  }, [scrollY, navAnimation]);

  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<IForm>();
  const onValid = ({ keyword }: IForm) => {
    console.log(keyword);
    navigate(`/search?keyword=${keyword}`);
  };

  return (
    <Nav variants={navVariant} initial={"top"} animate={navAnimation}>
      <Col>
        <Logo>
          <Link to="">
            <Svg
              variants={logoVariant}
              initial="normal"
              whileHover="active"
              xmlns="http://www.w3.org/2000/svg"
              version="1.0"
              viewBox="0 0 1028.000000 284.000000"
              preserveAspectRatio="xMidYMid meet"
            >
              <motion.path d="M0 1439 l0 -1371 38 7 c20 3 116 16 212 28 l175 23 5 624 5 625 315 6 c173 4 390 7 483 8 l167 1 0 710 0 710 -700 0 -700 0 0 -1371z m950 691 l0 -310 -255 0 -255 0 0 310 0 310 255 0 255 0 0 -310z" />
              <motion.path d="M1840 1537 l0 -1272 588 47 c323 26 590 47 595 48 4 0 7 92 7 205 l0 205 -67 0 c-38 0 -198 -9 -358 -20 -159 -11 -300 -20 -312 -20 l-23 0 0 319 c0 282 2 320 16 325 9 3 139 6 290 6 l274 0 0 217 0 216 -290 -6 -290 -5 0 294 0 294 380 0 380 0 0 210 0 210 -595 0 -595 0 0 -1273z" />
              <motion.path d="M3310 2600 l0 -210 225 0 225 0 0 -1002 0 -1001 98 6 c53 4 150 7 215 7 l117 0 0 995 0 995 225 0 225 0 0 210 0 210 -665 0 -665 0 0 -210z" />
              <motion.path d="M4920 1615 l0 -1195 210 0 210 0 0 490 0 490 300 0 300 0 0 215 0 215 -300 0 -300 0 0 280 0 280 395 0 395 0 0 210 0 210 -605 0 -605 0 0 -1195z" />
              <motion.path d="M6400 1602 l0 -1209 203 -6 c111 -4 357 -16 547 -27 190 -11 362 -20 383 -20 l37 0 0 209 0 208 -77 7 c-43 3 -177 10 -298 16 -121 6 -253 13 -292 16 l-73 6 0 1004 0 1004 -215 0 -215 0 0 -1208z" />
              <motion.path d="M7930 1560 l0 -1249 33 -5 c39 -6 313 -26 356 -26 l31 0 0 1265 0 1265 -210 0 -210 0 0 -1250z" />
              <motion.path d="M8739 2788 c5 -13 117 -303 250 -646 l240 -622 -275 -631 c-152 -347 -274 -632 -272 -634 1 -2 86 -13 187 -25 101 -11 203 -25 226 -29 l41 -8 153 361 c85 199 157 364 160 368 3 4 75 -173 160 -392 85 -220 154 -400 155 -400 6 -3 481 -77 482 -76 1 0 -122 327 -273 725 l-275 723 266 637 c145 350 268 644 271 654 7 16 -8 17 -227 17 l-234 0 -149 -361 c-82 -198 -151 -357 -153 -352 -2 4 -65 166 -140 358 l-138 350 -232 3 -232 2 9 -22z" />
            </Svg>
          </Link>
        </Logo>
        <Items>
          <Item>
            <Link to="">
              Movies
              {(homeMatch || movieMatch) && <Underbar layoutId="underbar" />}
            </Link>
          </Item>
          <Item>
            <Link to="tv">
              TV Shows
              {tvMatch && <Underbar layoutId="underbar" />}
            </Link>
          </Item>
        </Items>
      </Col>
      <Col>
        <Search onSubmit={handleSubmit(onValid)}>
          <label htmlFor="search">
            <motion.svg
              onClick={handleToggleSearch}
              animate={{ x: searchOpen ? -210 : 0 }}
              transition={{ duration: 0.2 }}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </motion.svg>
          </label>
          <Input
            {...register("keyword", { required: true, minLength: 2 })}
            id="search"
            autoFocus={searchOpen}
            initial={{ scaleX: 0 }}
            animate={inputAnimation}
            placeholder="Search for movies or TV shows"
            transition={{ duration: 0.2 }}
          />
        </Search>
      </Col>
    </Nav>
  );
}

export default Header;

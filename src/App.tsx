import { useEffect } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { bigInfoOpenState, searchOpenState } from "./atom";
import Header from "./Components/Header";
import disableScroll from "disable-scroll";

function App() {
  const location = useLocation();
  const param = useParams();
  const setBigInfoOpen = useSetRecoilState(bigInfoOpenState);
  const [searchOpen, setSearchOpen] = useRecoilState(searchOpenState);

  useEffect(() => {
    if (param.showId) {
      setBigInfoOpen(true);
      disableScroll.on();
    } else {
      setBigInfoOpen(false);
      disableScroll.off();
    }
  }, [location]);

  const handleCloseSearch = () => {
    if (!searchOpen) return;
    setSearchOpen((prev) => !prev);
  };

  return (
    <>
      <Header />
      <div onClick={handleCloseSearch}>
        <Outlet />
      </div>
    </>
  );
}

export default App;

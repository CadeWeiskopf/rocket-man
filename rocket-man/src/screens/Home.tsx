import { useNavigate } from "react-router-dom";
import upKey from "../assets/keys/up.png";
import wKey from "../assets/keys/w.png";
import sKey from "../assets/keys/s.png";

export default function Home() {
  const navigate = useNavigate();
  return (
    <>
      <div className="keys-parent-div">
        <div className="w-s-keys-div">
          <img src={wKey} />
          <img src={sKey} />
        </div>
        <div className="up-right-keys-div">
          {/*left*/}
          <img
            src={upKey}
            style={{ transform: "rotate(-90deg)" }}
          />
          <div style={{ display: "grid" }}>
            <img src={upKey} />
            {/*down*/}
            <img
              src={upKey}
              style={{ transform: "rotate(180deg)" }}
            />
          </div>
          {/*right*/}
          <img
            src={upKey}
            style={{ transform: "rotate(90deg)" }}
          />
        </div>
      </div>
      <h3>Ready?</h3>
      <button
        className="gradient-button"
        onClick={() => {
          navigate("/scene");
        }}
      >
        <div className="gradient-button-topleft-mask">
          <div className="gradient-button-topleft-mask2"></div>
        </div>
        <div className="gradient-button-topright-mask">
          <div className="gradient-button-topright-mask2"></div>
        </div>
        <div className="gradient-button-bottomright-mask">
          <div className="gradient-button-bottomright-mask2"></div>
        </div>
        <div className="gradient-button-bottomleft-mask">
          <div className="gradient-button-bottomleft-mask2"></div>
        </div>
        <div className="gradient-button-wrapper-topleft"></div>
        <div className="gradient-button-wrapper-topright"></div>
        <div className="gradient-button-wrapper-bottomright"></div>
        <div className="gradient-button-wrapper-bottomleft"></div>
        <span className="gradient-button-text-span">ok</span>
      </button>
    </>
  );
}

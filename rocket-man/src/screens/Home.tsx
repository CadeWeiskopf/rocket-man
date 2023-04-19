import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <>
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

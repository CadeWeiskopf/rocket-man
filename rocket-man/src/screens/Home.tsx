export default function Home() {
  return (
    <>
      <button className="gradient-button">
        <div className="gradient-button-topleft-mask">
          <div className="gradient-button-topleft-mask2"></div>
        </div>
        <div className="gradient-button-topright-mask"></div>
        <div className="gradient-button-bottomleft-mask"></div>
        <div className="gradient-button-bottomright-mask"></div>
        <div className="gradient-button-wrapper"></div>
        <span className="gradient-button-text-span">ok</span>
      </button>
    </>
  );
}

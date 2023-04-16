export default function Home() {
  return (
    <>
      <button
        className="gradient-button"
        onClick={() => {
          alert("click");
        }}
      >
        Click me
      </button>
    </>
  );
}

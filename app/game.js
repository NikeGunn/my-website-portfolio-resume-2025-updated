export default function GamePage() {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h2>Play My Game</h2>
        <iframe
          src="/game/index.html"
          width="100%"
          height="600px"
          style={{ border: "none" }}
        ></iframe>
      </div>
    );
  }

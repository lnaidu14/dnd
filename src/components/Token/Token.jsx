export default function Token({ token, selected, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: token.color || "blue",
        border: selected ? "2px solid yellow" : "1px solid gray",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
    >
      {token.name?.charAt(0).toUpperCase()}
    </div>
  );
}
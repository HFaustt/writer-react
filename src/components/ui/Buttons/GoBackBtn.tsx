function GoBackBtn({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} style={{ cursor: "pointer" }}>
      ← go back
    </button>
  );
}

export default GoBackBtn;

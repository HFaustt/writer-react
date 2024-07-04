function ReadButton({ children, onClick }: any) {
  return (
    <button style={{ cursor: "pointer" }} onClick={onClick}>
      {children}
    </button>
  );
}

export default ReadButton;

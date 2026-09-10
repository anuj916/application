type ButtonProps = {
  type: "button" | "submit";
  text: string;
  variant: "primary" | "secondary" ;
  onClick?: () => void;
};

export default function Button({
  type,
  text,
  variant,
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        padding: "10px 15px",
        margin: "5px",
        cursor: "pointer",
        border: "none",
        borderRadius: "5px",
        backgroundColor:
          variant === "primary" ? "#007bff" : "#0cca22",
        color: "purple",
      }}
    >
      {text}
    </button>
  );
}
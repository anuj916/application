interface ButtonProps {
  text: string;
  onClick: () => void;
  variant: "primary" | "secondary" | "danger";
}

export default function Button({ text,onClick, variant = "primary" }: ButtonProps) {
  return (
    <button
     onClick ={onClick}
      className={`variant==="primary" ? "bg-blue-500 text-white" : variant==="secondary" ? "bg-gray-500 text-white" : "bg-red-500 text-white"} px-4 py-2 rounded`}
    >
    </button>
  );
}
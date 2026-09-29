import Button from "./Button";

type UserCardProps = {
  user: {
    name: string;
    role: string;
  };
  isOnline?: boolean;
};

export default function Card({ user, isOnline = false }: UserCardProps) {
  function conditionalButtonRendering() {
    if (isOnline) {
      return (
        <Button
          text="Praise"
          variant="primary"
          onClick={() => alert("Great job!")}
        />
      );
    } else {
      return (
        <Button
          text="Nudge"
          variant="secondary"
          onClick={() => alert("Please come online")}
        />
      );
    }
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.role}</p>

      {conditionalButtonRendering()}
    </div>
  );
}
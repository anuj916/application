type ProfileCardProps = {
  name: string;
  role: string;
  skills: string[];
  isOnline: boolean;
};

export default function ProfileCard({
  name,
  role,
  skills,
  isOnline,
}: ProfileCardProps) {
  return (
    <div>
      <h2>{name}</h2>
      <p>Role: {role}</p>

      <p>Status: {isOnline ? "Online" : "Offline"}</p>

      <h3>Skills:</h3>

      <ul>
        {skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
    </div>
  );
}
import Card from "./components/card";

export default function App() {
  return (
    <div>
      <Card
        user={{
          name: "Anuj Subedi",
          role: "intern",
        }}
        isOnline={true}
      />
      <Card
        user={{
          name: "bob",
          role: "software engineer",
        }}
        isOnline={true}
      />
      <Card
        user={{
          name: "ram",
          role: "developer",
        }}
        isOnline={false}
      />
    </div>
  );
}
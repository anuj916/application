
import React, { useState } from "react";
import {Alert,FlatList,Pressable,StyleSheet,Text,TextInput,View,} from "react-native";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState("");

  const addTodo = () => {
    if (text.trim() === "") return;

    const newTodo: Todo = {
      id: Date.now(),
      title: text.trim(),
      completed: false,
    };

    setTodos((prev) => [...prev, newTodo]);
    setText("");
  };

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const confirmDelete = (id: number) => {
    Alert.alert("Delete this?", "", [
      {
        text: "No",
        style: "cancel",
      },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => deleteTodo(id),
      },
    ]);
  };

  const todoItems = todos.filter((todo) => !todo.completed);
  const doneItems = todos.filter((todo) => todo.completed);

  const renderItem = ({ item }: { item: Todo }) => (
    <Pressable
      style={styles.todoItem}
      onPress={() => toggleTodo(item.id)}
      onLongPress={() => confirmDelete(item.id)}
    >
      <View
        style={[
          styles.checkbox,
          item.completed && styles.checkboxDone,
        ]}
      >
        {item.completed && <Text style={styles.check}>✓</Text>}
      </View>

      <Text
        style={[
          styles.todoText,
          item.completed && styles.completedText,
        ]}
      >
        {item.title}
      </Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Todo List</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new todo..."
          value={text}
          onChangeText={setText}
          onSubmitEditing={addTodo}
        />

        <Pressable style={styles.addButton} onPress={addTodo}>
          <Text style={styles.addButtonText}>Add</Text>
        </Pressable>
      </View>

      <Text style={styles.sectionTitle}>
        Todo ({todoItems.length})
      </Text>

      {todoItems.length === 0 ? (
        <Text style={styles.emptyText}>No pending todos</Text>
      ) : (
        <FlatList
          data={todoItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      )}

      <Text style={styles.sectionTitle}>
        Done ({doneItems.length})
      </Text>

      {doneItems.length === 0 ? (
        <Text style={styles.emptyText}>No completed todos</Text>
      ) : (
        <FlatList
          data={doneItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      )}

      <Text style={styles.info}>
        Tap to complete • Long press to delete
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 60,
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },

  inputContainer: {
    flexDirection: "row",
    marginBottom: 25,
  },

  input: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  addButton: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginLeft: 8,
  },

  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 10,
  },

  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },

  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "#2563eb",
    borderRadius: 6,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  checkboxDone: {
    backgroundColor: "#2563eb",
  },

  check: {
    color: "#fff",
    fontWeight: "bold",
  },

  todoText: {
    fontSize: 17,
    flex: 1,
  },

  completedText: {
    textDecorationLine: "line-through",
    color: "#888",
  },

  emptyText: {
    color: "#999",
    fontSize: 15,
    marginBottom: 10,
  },

  info: {
    textAlign: "center",
    color: "#888",
    marginVertical: 15,
    fontSize: 13,
  },
});
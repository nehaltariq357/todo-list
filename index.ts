import chalk from "chalk";
import inquirer from "inquirer";

let todoItem: any = [];

const main = async () => {
  let todo = true;
  while (todo) {
    await menu();
  }
};

const menu = async () => {
  const { input } = await inquirer.prompt([
    {
      name: "input",
      type: "list",
      message: "select an operation you want to do",
      choices: ["Add task", "Show tasks", "Edit task", "Delete task", "Exit"],
    },
  ]);

  if (input === "Add task") {
    await createFunction();
  } else if (input === "Show tasks") {
    readFunction();
  } else if (input === "Edit task") {
    await updateFunction();
  } else if (input === "Delete task") {
    await deleteFunction();
  } else if (input === "Exit") {
    console.log("good bye");
    process.exit();
    return;
  }
};

const createFunction = async () => {
  const { title, description } = await inquirer.prompt([
    {
      name: "title",
      type: "input",
      message: "enter the title of the task",
    },
    {
      name: "description",
      type: "input",
      message: "enter the task",
    },
  ]);

  todoItem.push({ title, description });

  console.log("task was added");
};

const readFunction = () => {
  if (todoItem.length === 0) {
    console.log("no task available");
  } else {
    console.log("your tasks:");
    todoItem.forEach((task: any, index: any) => {
      console.log(`${index + 1}. Title: ${task.title}`);
      console.log(`Description: ${task.description}`);
    });
  }
};

const updateFunction = async () => {
  if (todoItem.length === 0) {
    console.log("task unavailable");
    return;
  }

  const choice = todoItem.map((e: any, i: any) => ({
    name: `${i + 1}. ${e.title}`,
    value: i,
  }));

  const { newTodo } = await inquirer.prompt([
    {
      name: "newTodo",
      type: "list",
      message: "select the task you want to edit",
      choices: choice,
    },
  ]);

  const { newTitle, newDescription } = await inquirer.prompt([
    {
      name: "newTitle",
      type: "input",
      message: "enter the new title of the task",
      default: todoItem[newTodo].title,
    },
    {
      name: "newDescription",
      type: "input",
      message: "enter the new task",
      default: todoItem[newTodo].description,
    },
  ]);

  todoItem[newTodo] = { title: newTitle, description: newDescription };
  console.log("task updated successfully");
};

const deleteFunction = async () => {
  if (todoItem.length === 0) {
    console.log("no task found");
  }

  const { deleteOption } = await inquirer.prompt([
    {
      name: "deleteOption",
      type: "list",
      message: "select delete options",
      choices: ["Delete All Task", "Delete One Task"],
    },
  ]);

  if (deleteOption === "Delete All Task") {
    allDelete();
  } else if (deleteOption === "Delete One Task") {
    oneDelete();
  }
};

const allDelete = () => {
  todoItem = [];
  console.log("All task deleted sucessfully");
};

const oneDelete = () => {
  const choices = todoItem.map((e: any, i: any) => ({
    name: `${i + 1}. ${e.title}`,
    value: i,
  }));

  const { remove }: any = inquirer.prompt([
    {
      name: "remove",
      type: "list",
      message: "select the task you want to delete",
      choices: choices,
    },
  ]);
  const deletedTask = todoItem.splice(remove, 1)[0];
  console.log(`\n\t${deletedTask.title} deleted sucessfully\n\t`);
};

main();

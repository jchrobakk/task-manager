import React from "react";

class TasksManager extends React.Component {
  constructor(props) {
    super(props);
    this.url = "http://localhost:3005/data";
  }
  state = {
    tasks: [],
    taskName: "",
  };

  componentDidMount() {
    this.loadTasksToState();
  }

  onClick = () => {
    const { tasks } = this.state;
    console.log(tasks);
  };

  render() {
    const { taskName } = this.state;
    console.log(this.state);

    return (
      <>
        <h1>Add new task</h1>
        <form onSubmit={this.submitHandler}>
          <label>Task name: </label>
          <input name="name" value={taskName} onChange={this.changeHandler} />
          <input type="submit" />
        </form>
        <main>{this.renderTasksList()}</main>
      </>
    );
  }

  submitHandler = (e) => {
    e.preventDefault();

    const { taskName } = this.state;

    if (taskName.trim() !== "") {
      const data = {
        name: taskName,
        time: 0,
        isRunning: false,
        isDone: false,
        isRemoved: false,
      };

      const options = {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      };

      fetch(this.url, options)
        .then((resp) => console.log(resp))
        .catch((err) => console.error(err))
        .finally(() => {
          this.setState({
            taskName: "",
          });

          this.loadTasksToState();
        });
    } else {
      alert("Enter task name");
    }
  };

  changeHandler = (e) => {
    const { value } = e.target;
    this.setState({
      taskName: value,
    });
  };

  loadTasksToState = () => {
    fetch(this.url)
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({
          tasks: [...data],
        });
      });
  };

  renderTasksList() {
    const tasksList = this.state.tasks;
    const taskListElement = tasksList.map((task) => {
      return (
        <section className="task">
          <header className="task__header">
            {task.name} {task.time}
          </header>
          <footer className="task__footer">
            <button
              onClick={() => this.toggleStartStop(task.id)}
              className="task__startstop"
            >
              start/stop
            </button>
            <button className="task__finished">finished</button>
            <button className="task__delete" disabled="true">
              delete
            </button>
          </footer>
        </section>
      );
    });

    return taskListElement;
  }

  toggleStartStop = (id) => {
    let isAnyTaskRunning;
    const { tasks } = this.state;
    if (tasks.some((e) => e.isRunning === true)) {
      isAnyTaskRunning = true;
    } else {
      isAnyTaskRunning = false;
    }

    if (isAnyTaskRunning) {
      this.toggleIsRunning(id);
      console.log("Task is running");
      console.log(tasks);
    } else {
      this.toggleIsRunning(id);
      console.log("No task is running");
      console.log(tasks);
    }
  };

  toggleIsRunning = (id) => {
    const { tasks } = this.state;
    const task = tasks.find((task) => task.id === id);
    const data = {
      ...task,
      isRunning: !task.isRunning,
    };

    const options = {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    };

    fetch(`${this.url}/${id}`, options)
      .then((resp) => console.log(resp))
      .catch((err) => console.error(err))
      .finally(() => {
        this.loadTasksToState();
      });
  };

  startTask = (id) => {
    setInterval(() => {
      this.incrementTime(id);
    }, 1000);
  };

  incrementTime = (id) => {
    const { tasks } = this.state;
    const task = tasks.find((task) => task.id === id);
    const data = {
      ...task,
      time: task.time + 1,
    };

    const options = {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    };

    fetch(`${this.url}/${id}`, options)
      .then((resp) => console.log(resp))
      .catch((err) => console.error(err))
      .finally(() => {
        this.loadTasksToState();
      });
  };
}

export default TasksManager;

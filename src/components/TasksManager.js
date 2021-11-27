import React from "react";

class TasksManager extends React.Component {
  constructor(props) {
    super(props);
    this.url = "http://localhost:3005/data";
    this.idInterval = null;
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

      this.setState({
        tasks: [...this.state.tasks, data],
      });

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

  isButtonStartStopDisabled(task) {
    return (this.idInterval && task.isRunning === false) || task.isDone
      ? true
      : false;
  }

  renderTasksList() {
    const tasksList = this.state.tasks;
    const tasksDone = tasksList.filter((item) => item.isRemoved === false);

    const sortedTasksList = tasksDone.sort(
      (a, b) => this.createNumber(a) - this.createNumber(b)
    );
    const taskListElement = sortedTasksList.map((task) => {
      return (
        <section className={task.isDone ? "task task--done" : "task"}>
          <header className="task__header">
            {task.name} {task.time}
          </header>
          <footer className="task__footer">
            <button
              onClick={() => this.handleClick(task)}
              className="task__startstop"
              disabled={this.isButtonStartStopDisabled(task)}
            >
              start/stop
            </button>
            <button
              className="task__finished"
              onClick={() => this.handleFinish(task)}
              disabled={task.isDone}
            >
              finished
            </button>
            <button
              className="task__delete"
              onClick={() => this.handleDelete(task)}
            >
              delete
            </button>
          </footer>
        </section>
      );
    });

    return taskListElement;
  }

  handleClick = (task) => {
    task.isRunning ? this.stopTask(task.id) : this.startTask(task.id);
  };

  startTask = (id) => {
    this.idInterval = setInterval(() => {
      this.incrementTime(id);
    }, 1000);
  };

  stopTask = (id) => {
    clearInterval(this.idInterval);
    this.idInterval = null;

    const newTasks = this.state.tasks.map((t) => {
      if (t.id === id) {
        const task = { ...t, isRunning: false };
        this.updateTaskInApi(task);
        return task;
      }

      return t;
    });

    this.setState({ tasks: newTasks });
  };

  updateTaskInApi = (task) => {
    const options = {
      method: "PUT",
      body: JSON.stringify(task),
      headers: { "Content-Type": "application/json" },
    };

    fetch(`${this.url}/${task.id}`, options)
      .then((resp) => console.log(resp))
      .catch((err) => console.error(err));
  };

  incrementTime = (id) => {
    const newTasks = this.state.tasks.map((t) => {
      if (t.id === id) {
        const task = { ...t, isRunning: true, time: t.time + 1 };
        this.updateTaskInApi(task);
        return task;
      }

      return t;
    });

    this.setState({ tasks: newTasks });
  };

  handleFinish = (task) => {
    this.stopTask(task.id);

    const newTasks = this.state.tasks.map((t) => {
      if (t.id === task.id) {
        const task = { ...t, isDone: true };
        this.updateTaskInApi(task);
        return task;
      }

      return t;
    });

    this.setState({ tasks: newTasks });
  };

  handleDelete = (task) => {
    console.log("handleDelete");
    const newTasks = this.state.tasks.map((t) => {
      if (t.id === task.id) {
        const task = { ...t, isRemoved: true };
        this.updateTaskInApi(task);
        return task;
      }

      return t;
    });

    this.setState({ tasks: newTasks });
  };

  createNumber(item) {
    const num = Number(`${Number(item.isDone)}.${item.id}`);

    return num;
  }
}

export default TasksManager;

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

    return (
      <>
        <h1>Add new task</h1>
        <form onSubmit={this.submitHandler}>
          <label>Task name: </label>
          <input name="name" value={taskName} onChange={this.changeHandler} />
          <input type="submit" />
        </form>

        <main></main>
      </>
    );
  }

  submitHandler = (e) => {
    e.preventDefault();

    const { taskName } = this.state;

    const data = {
      name: taskName,
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
}

export default TasksManager;

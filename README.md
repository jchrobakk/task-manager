# Project Name

This project is another task from my mentor - [devmentor.pl](https://devmentor.pl/). The main goal of this project to master React components. My task was to create a simple task manager with the ability to add and delete tasks and count the time spent on each of them. The entire application was to be created in one React component.

**Main features**:
- tasks can be added, deleted, started, stopped, marked as done
- project works with API
- project is coded in one React component


&nbsp;
 
## 💡 Technologies
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)


&nbsp;
 
## 💿 Installation

The project uses [node](https://nodejs.org/en/) and [npm](https://www.npmjs.com/). Having them installed, type into the terminal: `npm i`.

&nbsp;
 
## 🤔 Solutions provided in the project

- sorting tasks according to whether they are completed or not
```
createNumber(item)  {
const  num  =  Number(`${Number(item.isDone)}.${item.id}`);
return  num;
}

getSortedTasks(tasksList)  {return
tasksList.sort((a,  b) =>  this.createNumber(a) -  this.createNumber(b));
}
```
&nbsp;
## 👏 Thanks / Special thanks / Credits
Thanks to my [Mentor - devmentor.pl](https://devmentor.pl/) - for providing me with this task and for code review.

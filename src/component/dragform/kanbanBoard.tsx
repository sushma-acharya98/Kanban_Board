// 'use client'
// import React, { useState, useEffect } from 'react';
// import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

// interface Task {
//   id: string;
//   content: string;
// }

// interface Column {
//   id: string;
//   title: string;
//   taskIds: string[];
// }

// interface InitialData {
//   tasks: { [key: string]: Task };
//   columns: { [key: string]: Column };
//   columnOrder: string[];
// }

// const initialData: InitialData = {
//   tasks: {
//     'task-1': { id: 'task-1', content: 'First task' },
//     'task-2': { id: 'task-2', content: 'Second task' },
//     'task-3': { id: 'task-3', content: 'Third task' },
//     'task-4': { id: 'task-4', content: 'Fourth task' },
//   },
//   columns: {
//     'column-1': {
//       id: 'column-1',
//       title: 'To Do',
//       taskIds: ['task-1', 'task-2']
//     },
//     'column-2': {
//       id: 'column-2',
//       title: 'In Progress',
//       taskIds: ['task-3']
//     },
//     'column-3': {
//       id: 'column-3',
//       title: 'Done',
//       taskIds: ['task-4']
//     }
//   },
//   columnOrder: ['column-1', 'column-2', 'column-3']
// };

// const App: React.FC = () => {
//   const [data, setData] = useState<InitialData>(
//     () => JSON.parse(localStorage.getItem('kanbanData') || JSON.stringify(initialData))
//   );

//   const [newTaskContent, setNewTaskContent] = useState('');

//   useEffect(() => {
//     localStorage.setItem('kanbanData', JSON.stringify(data));
//   }, [data]);

//   const handleAddTask = () => {
//     if (!newTaskContent.trim()) return;

//     const newTaskId = `task-${Object.keys(data.tasks).length + 1}`;
//     const newTask: Task = { id: newTaskId, content: newTaskContent };

//     const updatedTasks = {
//       ...data.tasks,
//       [newTaskId]: newTask
//     };

//     const updatedToDoColumn = {
//       ...data.columns['column-1'],
//       taskIds: [...data.columns['column-1'].taskIds, newTaskId]
//     };

//     setData({
//       ...data,
//       tasks: updatedTasks,
//       columns: {
//         ...data.columns,
//         'column-1': updatedToDoColumn
//       }
//     });

//     setNewTaskContent('');
//   };

//   const onDragEnd = (result: DropResult) => {
//     const { destination, source, draggableId } = result;

//     if (!destination) return;

//     if (
//       destination.droppableId === source.droppableId &&
//       destination.index === source.index
//     ) {
//       return;
//     }

//     const startColumn = data.columns[source.droppableId];
//     const endColumn = data.columns[destination.droppableId];

//     if (startColumn === endColumn) {
//       const newTaskIds = Array.from(startColumn.taskIds);
//       newTaskIds.splice(source.index, 1);
//       newTaskIds.splice(destination.index, 0, draggableId);

//       const newColumn = {
//         ...startColumn,
//         taskIds: newTaskIds
//       };

//       setData({
//         ...data,
//         columns: {
//           ...data.columns,
//           [newColumn.id]: newColumn
//         }
//       });

//       return;
//     }

//     const startTaskIds = Array.from(startColumn.taskIds);
//     startTaskIds.splice(source.index, 1);
//     const newStart = {
//       ...startColumn,
//       taskIds: startTaskIds
//     };

//     const endTaskIds = Array.from(endColumn.taskIds);
//     endTaskIds.splice(destination.index, 0, draggableId);
//     const newEnd = {
//       ...endColumn,
//       taskIds: endTaskIds
//     };

//     setData({
//       ...data,
//       columns: {
//         ...data.columns,
//         [newStart.id]: newStart,
//         [newEnd.id]: newEnd
//       }
//     });
//   };

//   return (
//     <div>
//       <div className="add-task">
//         <input
//           type="text"
//           placeholder="Enter new task"
//           value={newTaskContent}
//           onChange={(e) => setNewTaskContent(e.target.value)}
//         />
//         <button onClick={handleAddTask}>Add Task</button>
//       </div>
//       <DragDropContext onDragEnd={onDragEnd}>
//         <div className="kanban-board">
//           {data.columnOrder.map(columnId => {
//             const column = data.columns[columnId];
//             const tasks = column.taskIds.map(taskId => data.tasks[taskId]);

//             return (
//               <Droppable key={column.id} droppableId={column.id}>
//                 {(provided) => (
//                   <div
//                     className="kanban-column"
//                     {...provided.droppableProps}
//                     ref={provided.innerRef}
//                   >
//                     <h2>{column.title}</h2>
//                     {tasks.map((task, index) => (
//                       <Draggable key={task.id} draggableId={task.id} index={index}>
//                         {(provided) => (
//                           <div
//                             className="kanban-task"
//                             ref={provided.innerRef}
//                             {...provided.draggableProps}
//                             {...provided.dragHandleProps}
//                           >
//                             {task.content}
//                           </div>
//                         )}
//                       </Draggable>
//                     ))}
//                     {provided.placeholder}
//                   </div>
//                 )}
//               </Droppable>
//             );
//           })}
//         </div>
//       </DragDropContext>
//     </div>
//   );
// };

// export default App;

'use client'
import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

interface Task {
  id: string;
  content: string;
}

interface Column {
  id: string;
  title: string;
  taskIds: string[];
}

interface InitialData {
  tasks: { [key: string]: Task };
  columns: { [key: string]: Column };
  columnOrder: string[];
}

const initialData: InitialData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'First task' },
    'task-2': { id: 'task-2', content: 'Second task' },
    'task-3': { id: 'task-3', content: 'Third task' },
    'task-4': { id: 'task-4', content: 'Fourth task' },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To Do',
      taskIds: ['task-1', 'task-2']
    },
    'column-2': {
      id: 'column-2',
      title: 'In Progress',
      taskIds: ['task-3']
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      taskIds: ['task-4']
    }
  },
  columnOrder: ['column-1', 'column-2', 'column-3']
};

const App: React.FC = () => {
  // Use a state to track if the component is mounted (client-side)
  const [isClient, setIsClient] = useState(false);

  const [data, setData] = useState<InitialData>(initialData);
  const [newTaskContent, setNewTaskContent] = useState('');

  useEffect(() => {
    // Mark the component as mounted on the client
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      // Access localStorage only after the component has mounted on the client
      const storedData = localStorage.getItem('kanbanData');
      if (storedData) {
        setData(JSON.parse(storedData));
      }
    }
  }, [isClient]);

  useEffect(() => {
    if (isClient) {
      // Save the data to localStorage only after the component has mounted
      localStorage.setItem('kanbanData', JSON.stringify(data));
    }
  }, [data, isClient]);

  const handleAddTask = () => {
    if (!newTaskContent.trim()) return;

    const newTaskId = `task-${Object.keys(data.tasks).length + 1}`;
    const newTask: Task = { id: newTaskId, content: newTaskContent };

    const updatedTasks = {
      ...data.tasks,
      [newTaskId]: newTask
    };

    const updatedToDoColumn = {
      ...data.columns['column-1'],
      taskIds: [...data.columns['column-1'].taskIds, newTaskId]
    };

    setData({
      ...data,
      tasks: updatedTasks,
      columns: {
        ...data.columns,
        'column-1': updatedToDoColumn
      }
    });

    setNewTaskContent('');
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const startColumn = data.columns[source.droppableId];
    const endColumn = data.columns[destination.droppableId];

    if (startColumn === endColumn) {
      const newTaskIds = Array.from(startColumn.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...startColumn,
        taskIds: newTaskIds
      };

      setData({
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn
        }
      });

      return;
    }

    const startTaskIds = Array.from(startColumn.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...startColumn,
      taskIds: startTaskIds
    };

    const endTaskIds = Array.from(endColumn.taskIds);
    endTaskIds.splice(destination.index, 0, draggableId);
    const newEnd = {
      ...endColumn,
      taskIds: endTaskIds
    };

    setData({
      ...data,
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newEnd.id]: newEnd
      }
    });
  };

  return (
    <div>
      <div className="add-task">
        <input
          type="text"
          placeholder="Enter new task"
          value={newTaskContent}
          onChange={(e) => setNewTaskContent(e.target.value)}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="kanban-board">
          {data.columnOrder.map(columnId => {
            const column = data.columns[columnId];
            const tasks = column.taskIds.map(taskId => data.tasks[taskId]);

            return (
              <Droppable key={column.id} droppableId={column.id}>
                {(provided) => (
                  <div
                    className="kanban-column"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    <h2>{column.title}</h2>
                    {tasks.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided) => (
                          <div
                            className="kanban-task"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            {task.content}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
};

export default App;

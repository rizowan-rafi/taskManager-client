import React from 'react'
import PropTypes from 'prop-types'
import Task from './Task'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

const Column = ({column,task}) => {
      const { setNodeRef } = useDroppable({
          id: column.id,
      });
    // console.log(task,column)
  return (
    
      <div className="flex w-80 flex-col rounded-lg bg-neutral-800 p-4">
          <h2 className="mb-4 font-semibold text-neutral-100">
              {column.title}
          </h2>
          <SortableContext
              items={task.map((t) => t._id)}
              strategy={verticalListSortingStrategy}
          >
              <div ref={setNodeRef} className="flex flex-1 flex-col gap-4">
                  {task.map((task) => {
                      return <Task key={task._id} task={task} />;
                  })}
              </div>
          </SortableContext>
      </div>
  );
}

Column.propTypes = {}

export default Column
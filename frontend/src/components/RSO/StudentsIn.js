import React from 'react'
import {useSelector} from 'react-redux'

function StudentsIn() {
    const students = useSelector((state) => state.rso.students)

    if (students.length > 0)
    {
        const studentList = students.map(element => (
            <div key={element.ID}>
              {
                Object.keys(element).map((key) => {
                    if (key != "Password" && key != "UniversityID")
                    {
                        return (
                            <p key={key}><strong>{key}</strong>: {element[key]}</p>
                        )
                    }
                  })
              }
            </div>
          ))

        return (
            <div>{studentList}</div>
        )
    }
    else{
        return (
                <p>There are no members.</p>
        )
    }
}

export default StudentsIn
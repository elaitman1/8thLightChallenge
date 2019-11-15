import React from 'react'

const ReadingList = (props) => 
    <section className="readingList">
        <button onClick={props.handleShowList}>
          {props.list? 
            <p><u>Hide</u> My Reading List</p>
          :
            <p><u>View</u> My Reading List</p>
          }
        </button>
        
          {props.list? 
            <div>{props.handleShowReadingList()}</div>
          :
            <></>
          }
    </section>

    export default ReadingList
import React from 'react'

const SidebarLeft = () => {
  return (
    <div className='flex flex-col gap-2 w-[20vw] p-3 border m-2 border-black rounded-md'>
        <h3>Radicals</h3>
        <div>
            {}
        </div>
        <h3>JLPT Level</h3>
        <div>
            <ul>
                <li><input type='checkbox' value='N1' /> N1</li>
                <li><input type='checkbox' value='N2' /> N2</li>
                <li><input type='checkbox' value='N3' /> N3</li>
                <li><input type='checkbox' value='N4' /> N4</li>
                <li><input type='checkbox' value='N5' /> N5</li>
            </ul>
        </div>
    </div>
  )
}

export default SidebarLeft
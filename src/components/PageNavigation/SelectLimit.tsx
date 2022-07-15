import React, { useRef } from "react";

export default function SelectLimit({limit, setLimit, offset}) 
{
  const selectForm = useRef<HTMLFormElement>(null);
  
  function handleSubmit() {
    if (selectForm.current) {
      const value = selectForm.current.limit.value;
      setLimit(value);
    }
  }

  return (
    <form ref={selectForm} className="pageNavigation-selectLimit" action="" method="get">
      <input type="hidden" name="offset" value={offset}/>
      <select name="limit" onChange={handleSubmit}>
        <option value={limit}>{limit}</option>
        <option value="20">20</option>
        <option value="40">40</option>
        <option value="80">80</option>
        <option value="120">120</option>
        <option value="160">160</option>
        <option value="200">200</option>
      </select>
    </form>
  )
}
import Selector from "./Selector";
import React from "react";

const SwapField = React.forwardRef(({obj}, inputRef) => {
  const {id, value = '',  setValue, defaultValue, setToken, ignoreValue } = obj

  return (
    <div className="flex items-center justify-between rounded-lg" >
      <input
      ref={inputRef}
      className={getInputClassname()}
      type={"number"}
      value={value}
      placeholder={"0.0"}
      onChange={e => setValue(e.target.value)}
      />

      <Selector
       id={id}
       setToken={setToken}
       defaultValue={defaultValue}
       ignoreValue={ignoreValue}
/>
    </div>
  )

  function getInputClassname(){
    let className = 
    "w-full outline-none h-8 px-2 appearance-none text-3xl bg-transparent";
    return className;
  }
});

export default SwapField;

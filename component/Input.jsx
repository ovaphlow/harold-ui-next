import React from 'react';

export function DeptInput() {
  React.useEffect(() => {
    let path = ['/api/prop/', '?option=', '&category=dept'];
    console.info(path.join(''));
    fetch(path.join(''))
      .then((response) => response.json())
      .then((data) => {
        console.info(12313123, data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      <input type="text" list="dept-input-datalist" className="form-control" />
      <datalist id="dept-input-datalist">
        <option value="" />
      </datalist>
    </>
  );
}

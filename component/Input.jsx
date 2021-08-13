import React from 'react';

export function DeptDataList() {
  const [list, setList] = React.useState([]);

  React.useEffect(() => {
    let path = [
      '/api/prop/',
      '?option=filter-by-category',
      `&category=${encodeURI('部门')}`,
    ];
    fetch(path.join(''))
      .then((response) => response.json())
      .then((data) => {
        setList(data);
      });
  }, []);

  return (
    <datalist id="dept-datalist">
      {list.map((current) => (
        <option value={current.name} key={current.id} />
      ))}
    </datalist>
  );
}

export function TrainDataList() {
  const [list, setList] = React.useState([]);

  React.useEffect(() => {
    let path = [
      '/api/prop/',
      '?option=filter-by-category',
      `&category=${encodeURI('车组')}`,
    ];
    fetch(path.join(''))
      .then((response) => response.json())
      .then((data) => {
        setList(data);
      });
  }, []);

  return (
    <datalist id="train-datalist">
      {list.map((current) => (
        <option value={current.name} key={current.id} />
      ))}
    </datalist>
  );
}

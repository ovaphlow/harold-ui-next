import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

export default function SubDocument04({
  subdoc04_list,
  handleRemove,
  option,
  id,
}) {
  const handlePbz = (event) => {
    let result = event.target.value;
    let subid = event.target.getAttribute('data-id');
    if (!!result) {
      fetch(`/api/harold/detail/${id}?option=review-p_bz-subdoc04`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          id: subid,
          duty: '测试监控人', //
          p_bz: '测试班组', //
          review_p_bz: result,
        }),
      })
        .then((response) => {
          if (response.status === 200)
            alert('数据已提交至服务器，请稍后查看。');
          else throw new Error('操作失败');
        })
        .catch((err) => alert(err));
    } else {
      fetch(`/api/harold/detail/${id}?option=review-p_bz-subdoc04`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          id: subid,
          duty: '', //
          p_bz: '', //
          review_p_bz: '',
        }),
      })
        .then((response) => {
          if (response.status === 200)
            alert('数据已提交至服务器，请稍后查看。');
          else throw new Error('操作失败');
        })
        .catch((err) => alert(err));
    }
  };

  return (
    <table className="table table-bordered" style={{ border: '2px solid' }}>
      <tbody>
        <tr>
          <td width="15%" className="text-center align-middle">
            普查项目
          </td>
          <td colSpan="8" className="text-center align-middle">
            {!!subdoc04_list.length && subdoc04_list[0].subject}
          </td>
        </tr>
        <tr>
          <td width="15%" className="text-center align-middle">
            软件版本号
          </td>
          <td width="10%" className="text-center align-middle">
            新
          </td>
          <td width="10%" className="text-center align-middle">
            {!!subdoc04_list.length && subdoc04_list[0].version}
          </td>
          <td width="10%" className="text-center align-middle">
            旧
          </td>
          <td width="10%" className="text-center align-middle">
            {!!subdoc04_list.length && subdoc04_list[0].version2}
          </td>
          <td width="10%" colSpan="2" className="text-center align-middle">
            批准文件号
          </td>
          <td width="30%" colSpan="2" className="text-center align-middle">
            {!!subdoc04_list.length && subdoc04_list[0].sn}
          </td>
        </tr>
        <tr>
          <td width="15%" className="text-center align-middle">
            实施普查车组
          </td>
          <td width="40%" colSpan="4" className="text-center align-middle">
            {!!subdoc04_list.length && subdoc04_list[0].train}
          </td>
          <td width="20%" colSpan="2" className="text-center align-middle">
            实施普查日期
          </td>
          <td width="30%" colSpan="2" className="text-center align-middle">
            {!!subdoc04_list.length && subdoc04_list[0].date}
          </td>
        </tr>
        <tr>
          <td width="15%" className="text-center align-middle">
            实施改造
            <br />
            的车厢号
          </td>
          <td width="10%" className="text-center align-middle">
            开工时间
          </td>
          <td width="10%" className="text-center align-middle">
            完工时间
          </td>
          <td width="10%" className="text-center align-middle">
            实施单位
          </td>
          <td width="10%" className="text-center align-middle">
            实施者
          </td>
          <td width="10%" className="text-center align-middle">
            动车所
            <br />
            现场监控人
          </td>
          <td width="10%" className="text-center align-middle">
            监控班组
          </td>
          <td width="10%" className="text-center align-middle">
            质检员
          </td>
          <td className="text-center align-middle">备注</td>
        </tr>
        {subdoc04_list.map((current) => (
          <tr key={current.id}>
            <td className="d-flex justify-content-between">
              <span
                className="text-danger"
                onClick={() => handleRemove(current.id)}
              >
                <FontAwesomeIcon icon={faTrashAlt} fixedWidth />
              </span>
              {current.carriage}
            </td>
            <td>{current.time_begin}</td>
            <td>{current.time_end}</td>
            <td>{current.dept}</td>
            <td>{current.operator}</td>
            <td>
              {current.duty || ''}
              {!!(option.indexOf('p_bz') + 1) && (
                <select
                  className="form-control"
                  data-id={current.id}
                  defaultValue={current.review_p_bz}
                  onChange={handlePbz}
                >
                  <option value="">监控结果</option>
                  <option value="确认">确认</option>
                  <option value="未确认">未确认</option>
                </select>
              )}
            </td>
            <td>{current.p_bz || ''}</td>
            <td>{current.qc || ''}</td>
            <td>{current.remark || ''}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

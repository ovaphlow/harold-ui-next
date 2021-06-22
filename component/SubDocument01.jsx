import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

SubDocument01.propTypes = {
  subdoc01_list: PropTypes.array,
  handleRemove: PropTypes.func,
  option: PropTypes.array,
  id: PropTypes.string,
};

SubDocument01.defaultProps = {
  subdoc01_list: [],
  handleRemove: () => {},
  option: [],
  id: '0',
};

export default function SubDocument01({
  subdoc01_list,
  handleRemove,
  option,
  id,
}) {
  const handlePbz = (event) => {
    let result = event.target.value;
    let subid = event.target.getAttribute('data-id');
    fetch(`/api/harold/detail/${id}?option=review-p_bz-subdoc01`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        id: subid,
        duty: result ? '测试监控人' : '', //
        p_bz: result ? '测试班组' : '', //
        review_p_bz: result,
      }),
    })
      .then((response) => {
        if (response.status === 200) alert('数据已提交至服务器，请稍后查看。');
        else throw new Error('操作失败');
      })
      .catch((err) => alert(err));
  };
  const handleQc = (event) => {
    let result = event.target.value;
    let subid = event.target.getAttribute('data-id');
    fetch(`/api/harold/detail/${id}?option=review-qc-subdoc01`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        id: subid,
        review_qc: result, // event.target.value === '确认' ? auth.name : '未确认'
      }),
    })
      .then((response) => {
        if (response.status === 200) alert('数据已提交至服务器，请稍后查看。');
        else throw new Error('操作失败');
      })
      .catch((err) => alert(err));
  };

  return (
    <table className="table table-bordered" style={{ border: '2px solid' }}>
      <tbody>
        <tr>
          <td width="8%" className="text-center align-middle">
            普查项目
          </td>
          <td width="42%" colSpan="5" className="text-center align-middle">
            {!!subdoc01_list.length && subdoc01_list[0].subject}
          </td>
          <td width="15%" colSpan="2" className="text-center align-middle">
            批准文件号
          </td>
          <td width="35%" colSpan="4" className="text-center align-middle">
            {!!subdoc01_list.length && subdoc01_list[0].sn}
          </td>
        </tr>
        <tr>
          <td width="10%" className="text-center align-middle">
            实施普查车组
          </td>
          <td width="40%" colSpan="5" className="text-center align-middle">
            {!!subdoc01_list.length && subdoc01_list[0].train}
          </td>
          <td width="10%" colSpan="2" className="text-center align-middle">
            实施普查日期
          </td>
          <td width="40%" colSpan="4" className="text-center align-middle">
            {!!subdoc01_list.length && subdoc01_list[0].date}
          </td>
        </tr>
        <tr>
          <td width="8%" className="text-center align-middle">
            实施普查
            <br />
            的车厢号
          </td>
          <td width="10%" className="text-center align-middle">
            具体项点
          </td>
          <td width="6%" className="text-center align-middle">
            开工
            <br />
            时间
          </td>
          <td width="6%" className="text-center align-middle">
            完工
            <br />
            时间
          </td>
          <td width="6%" className="text-center align-middle">
            检查
            <br />
            结果
          </td>
          <td width="14%" className="text-center align-middle">
            故障及处理情况
          </td>
          <td width="8%" className="text-center align-middle">
            实施单位
          </td>
          <td width="7%" className="text-center align-middle">
            实施者
          </td>
          <td width="8%" className="text-center align-middle">
            动车组
            <br />
            现场监控人
          </td>
          <td width="8%" className="text-center align-middle">
            监控班组
          </td>
          <td width="8%" className="text-center align-middle">
            质检员
          </td>
          <td className="text-center align-middle">备注</td>
        </tr>
        {subdoc01_list.map((current) => (
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
            <td>{current.position}</td>
            <td>{current.time_begin}</td>
            <td>{current.time_end}</td>
            <td>{current.result}</td>
            <td>{current.report}</td>
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
            <td>
              {current.qc || ''}
              {!!(option.indexOf('qc') + 1) && (
                <select
                  className="form-control form-control-sm"
                  data-id={current.id}
                  defaultValue={current.review_qc}
                  onChange={handleQc}
                >
                  <option value="">监控结果</option>
                  <option value="确认">确认</option>
                  <option value="未确认">未确认</option>
                </select>
              )}
            </td>
            <td>{current.remark || ''}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

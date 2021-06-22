import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';

SubDocument02.propTypes = {
  subdoc02_list: PropTypes.array,
  handleRemove: PropTypes.func,
  option: PropTypes.array,
  id: PropTypes.string,
};

SubDocument02.defaultProps = {
  subdoc02_list: [],
  handleRemove: () => {},
  option: [],
  id: '0',
};

export default function SubDocument02({
  subdoc02_list,
  handleRemove,
  option,
  id,
}) {
  const handleReviewPgz = (event) => {
    let result = event.target.value;
    let subid = event.target.getAttribute('data-id');
    fetch(`/api/harold/detail/${id}?option=review-p_gz-subdoc02`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        id: subid,
        review_p_gz: result,
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
          <td width="6%" className="text-center align-middle">
            部件名称
          </td>
          <td width="6%" className="text-center align-middle">
            车组
          </td>
          <td width="3%" className="text-center align-middle">
            车号
          </td>
          <td width="3%" className="text-center align-middle">
            位置
          </td>
          <td width="6%" className="text-center align-middle">
            日期
          </td>
          <td width="6%" className="text-center align-middle">
            时间
          </td>
          <td className="text-center align-middle">更换原因</td>
          <td width="6%" className="text-center align-middle">
            作业人员已阅读工艺文件并掌握各步骤
          </td>
          <td width="4%" className="text-center align-middle">
            力矩扳手已校验
          </td>
          <td width="6%" className="text-center align-middle">
            换下部件序列号
          </td>
          <td width="6%" className="text-center align-middle">
            换上部件序列号
          </td>
          <td width="4%" className="text-center align-middle">
            部件安装良好，螺栓力矩已套固，防松标记已涂打
          </td>
          <td width="6%" className="text-center align-middle">
            作业者
          </td>
          <td width="6%" className="text-center align-middle">
            检修工长
          </td>
          <td width="4%" className="text-center align-middle">
            部件功能试验正常
          </td>
          <td width="6%" className="text-center align-middle">
            质检员
          </td>
          <td width="6%" className="text-center align-middle">
            值班干部
          </td>
        </tr>
        {subdoc02_list.map((current) => (
          <tr key={current.id}>
            <td width="6%" className="align-middle">
              <span
                className="text-danger"
                onClick={() => handleRemove(current.id)}
              >
                <FontAwesomeIcon icon={faTrashAlt} fixedWidth />
              </span>
              <span className="float-right">{current.name}</span>
            </td>
            <td width="6%" className="text-center align-middle">
              {current.train}
            </td>
            <td width="3%" className="text-center align-middle">
              {current.carriage}
            </td>
            <td width="3%" className="text-center align-middle">
              {current.position}
            </td>
            <td width="6%" className="text-center align-middle">
              {dayjs(current.date).format('YYYY-MM-DD')}
            </td>
            <td width="6%" className="text-center align-middle">
              {current.time}
            </td>
            <td className="text-center align-middle">{current.reason}</td>
            <td width="6%" className="text-center align-middle">
              {current.p_gywj}
            </td>
            <td width="4%" className="text-center align-middle">
              {current.p_ljbs}
            </td>
            <td width="6%" className="text-center align-middle">
              {current.sn}
            </td>
            <td width="6%" className="text-center align-middle">
              {current.sn2}
            </td>
            <td width="4%" className="text-center align-middle">
              {current.p_bjaz}
            </td>
            <td width="6%" className="text-center align-middle">
              {current.operator}
            </td>

            <td width="6%" className="text-center align-middle">
              {current.leader}
              {!!(option.indexOf('p_gz') + 1) && (
                <select
                  className="form-control form-control-sm"
                  data-id={current.id}
                  defaultValue={current.review_p_gz}
                  onChange={handleReviewPgz}
                >
                  <option value="">监控结果</option>
                  <option value="确认">确认</option>
                  <option value="未确认">未确认</option>
                </select>
              )}
            </td>
            <td width="4%" className="text-center align-middle">
              {current.p_bjgnsy}
              <select
                className="form-control form-control-sm"
                data-id={current.id}
              >
                <option value="">部件功能是否正常</option>
                <option value="是">是</option>
                <option value="否">否</option>
              </select>
            </td>
            <td width="6%" className="text-center align-middle">
              {current.qc}
            </td>
            <td width="6%" className="text-center align-middle">
              {current.duty}
              <select
                className="form-control form-control-sm"
                data-id={current.id}
              >
                <option value="">监控结果</option>
                <option value="确认">确认</option>
                <option value="未确认">未确认</option>
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

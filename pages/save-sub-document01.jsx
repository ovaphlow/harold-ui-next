import dayjs from 'dayjs';
import React from 'react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import Footer from '../component/Footer';
import Navbar from '../component/Navbar';
import { reducer } from '../util/miscellaneous';

const initial_subdoc = {
  subject: '',
  sn: '',
  train: '',
  date: dayjs().format('YYYY-MM-DD'),
  position: '',
  time_begin: '',
  time_end: '',
  result: '良好',
  report: '',
  dept: '',
  operator: '',
  remark: '无',
};

export default function SaveSubDocument01() {
  const [subdoc, dispatch] = React.useReducer(reducer, initial_subdoc);
  const [subdoc01_list, setSubdoc01List] = React.useState([]);
  const router = useRouter();
  const { id } = router.query;
  const handleSubmit = () => {
    let node_list = document.querySelectorAll('.form-check-input');
    let ll = [];
    node_list.forEach((current) => {
      if (current.checked) ll.push(current.value);
    });
    fetch(`/api/harold/report/${id}?option=report-subdoc01`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ ...subdoc, carriage: ll.join(',') }),
    })
      .then((response) => {
        if (response.status === 200) {
          alert('数据已提交至服务器，请稍后查看。');
          fetchSubdoc01();
        } else throw new Error('操作失败');
      })
      .catch((err) => alert(err));
  };
  const handleRemove = (index) => {
    if (!confirm('确定要删除所选数据？')) return;
    fetch(`/api/harold/report/${id}?option=remove-subdoc01`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ id: index }),
    })
      .then((response) => {
        if (response.status === 200) {
          alert('数据已提交至服务器，请稍后查看。');
          fetchSubdoc01();
        } else throw new Error('操作失败');
      })
      .catch((err) => alert(err));
  };
  const fetchSubdoc01 = () => {
    fetch(`/api/harold/detail/${id}?option=subdoc01`)
      .then((response) => response.json())
      .then((data) => {
        let ll = data.subdoc01.map((current, index) => {
          return { id: index, ...current };
        });
        setSubdoc01List(ll);
      })
      .catch((err) => alert(err));
  };

  React.useEffect(() => {
    if (!id) return;
    fetchSubdoc01();
  }, [id]);

  return (
    <div className="d-flex flex-column h-100 w-100">
      <header>
        <Navbar option="" />
      </header>
      <main className="flex-grow-1">
        <div className="container-fluid title py-4">
          <h1>动车组一般部件普查记录单</h1>
        </div>
        <div className="container-lg mt-5">
          <div className="card shadow">
            <div className="card-body row">
              <div className="col mb-3">
                <label className="form-label">普查项目</label>
                <input
                  type="text"
                  value={subdoc.subject}
                  className="form-control"
                  onChange={(event) =>
                    dispatch({
                      type: 'set',
                      payload: {
                        key: 'subject',
                        value: event.target.value,
                      },
                    })
                  }
                />
              </div>
              <div className="col mb-3">
                <label className="form-label">批准文件号</label>
                <input
                  type="text"
                  value={subdoc.sn}
                  className="form-control"
                  onChange={(event) =>
                    dispatch({
                      type: 'set',
                      payload: {
                        key: 'sn',
                        value: event.target.value,
                      },
                    })
                  }
                />
              </div>
              <div className="col mb-3">
                <label className="form-label">实施普查车组</label>
                <input
                  type="text"
                  value={subdoc.train}
                  className="form-control"
                  onChange={(event) =>
                    dispatch({
                      type: 'set',
                      payload: {
                        key: 'train',
                        value: event.target.value,
                      },
                    })
                  }
                />
              </div>
              <div className="col">
                <label className="form-label">实施普查日期</label>
                <input
                  type="date"
                  value={subdoc.date}
                  className="form-control"
                  onChange={(event) =>
                    dispatch({
                      type: 'set',
                      payload: { key: 'date', value: event.target.value },
                    })
                  }
                />
              </div>
              <div className="clearfix" />
              <div className="col mb-3">
                <label className="form-label">实施普查的车厢号</label>
                <br />
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="inlineCheckbox1"
                    value="01"
                  />
                  <label className="form-check-label" htmlFor="inlineCheckbox1">
                    01
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="inlineCheckbox2"
                    value="02"
                  />
                  <label className="form-check-label" htmlFor="inlineCheckbox2">
                    02
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="inlineCheckbox3"
                    value="03"
                  />
                  <label className="form-check-label" htmlFor="inlineCheckbox3">
                    03
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="inlineCheckbox4"
                    value="04"
                  />
                  <label className="form-check-label" htmlFor="inlineCheckbox4">
                    04
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="inlineCheckbox5"
                    value="05"
                  />
                  <label className="form-check-label" htmlFor="inlineCheckbox5">
                    05
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="inlineCheckbox6"
                    value="06"
                  />
                  <label className="form-check-label" htmlFor="inlineCheckbox6">
                    06
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="inlineCheckbox7"
                    value="07"
                  />
                  <label className="form-check-label" htmlFor="inlineCheckbox7">
                    07
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="inlineCheckbox8"
                    value="08"
                  />
                  <label className="form-check-label" htmlFor="inlineCheckbox8">
                    08
                  </label>
                </div>
              </div>
              <div className="clearfix" />
              <div className="col mb-3">
                <label className="form-label">具体项点</label>
                <input
                  type="text"
                  value={subdoc.position}
                  className="form-control"
                  onChange={(event) =>
                    dispatch({
                      type: 'set',
                      payload: { key: 'position', value: event.target.value },
                    })
                  }
                />
              </div>
              <div className="col mb-3">
                <label className="form-label">开工时间</label>
                <input
                  type="time"
                  value={subdoc.time_begin}
                  className="form-control"
                  readOnly
                  onChange={(event) =>
                    dispatch({
                      type: 'set',
                      payload: { key: 'time_begin', value: event.target.value },
                    })
                  }
                />
              </div>
              <div className="col form-group">
                <label className="form-label">
                  完工时间&nbsp;
                  <span className="badge bg-danger">
                    销记后系统自动修改完工时间
                  </span>
                </label>
                <input
                  type="time"
                  value={subdoc.time_end}
                  className="form-control"
                  readOnly
                  onChange={(event) =>
                    dispatch({
                      type: 'set',
                      payload: { key: 'time_end', value: event.target.value },
                    })
                  }
                />
              </div>
              <div className="clearfix" />
              <div className="col mb-3">
                <label className="form-label">检查结果</label>
                <select
                  value={subdoc.result}
                  className="form-control"
                  onChange={(event) =>
                    dispatch({
                      type: 'set',
                      payload: {
                        key: 'result',
                        value: event.target.value,
                      },
                    })
                  }
                >
                  <option value="良好">良好</option>
                  <option value="异常">异常</option>
                </select>
              </div>
              <div className="clearfix" />
              <div className="col mb-3">
                <label className="form-label">故障及处理情况</label>
                <input
                  type="text"
                  value={subdoc.report}
                  className="form-control"
                  onChange={(event) =>
                    dispatch({
                      type: 'set',
                      payload: {
                        key: 'report',
                        value: event.target.value,
                      },
                    })
                  }
                />
              </div>
              <div className="clearfix" />
              <div className="col mb-3">
                <label className="form-label">实施单位</label>
                <input
                  type="text"
                  value={subdoc.dept}
                  className="form-control"
                  readOnly
                  onChange={(event) =>
                    dispatch({
                      type: 'set',
                      payload: {
                        key: 'dept',
                        value: event.target.value,
                      },
                    })
                  }
                />
              </div>
              <div className="col mb-3">
                <label className="form-label">实施者</label>
                <input
                  type="text"
                  value={subdoc.operator}
                  className="form-control"
                  onChange={(event) =>
                    dispatch({
                      type: 'set',
                      payload: {
                        key: 'operator',
                        value: event.target.value,
                      },
                    })
                  }
                />
              </div>
              <div className="clearfix" />
              <div className="col mb-3">
                <label className="form-label">备注</label>
                <input
                  type="text"
                  value={subdoc.remark}
                  className="form-control"
                  onChange={(event) =>
                    dispatch({
                      type: 'set',
                      payload: {
                        key: 'remark',
                        value: event.target.value,
                      },
                    })
                  }
                />
              </div>
            </div>
            <div className="card-footer d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => history.back()}
              >
                后退
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                提交
              </button>
            </div>
          </div>
          <div className="card shadow mt-3">
            <div className="card-body">
              <table
                className="table table-bordered"
                style={{ border: '2px solid' }}
              >
                <tbody>
                  <tr>
                    <td width="8%" className="text-center align-middle">
                      普查项目
                    </td>
                    <td
                      width="42%"
                      colSpan="5"
                      className="text-center align-middle"
                    >
                      {!!subdoc01_list.length && subdoc01_list[0].subject}
                    </td>
                    <td
                      width="15%"
                      colSpan="2"
                      className="text-center align-middle"
                    >
                      批准文件号
                    </td>
                    <td
                      width="35%"
                      colSpan="4"
                      className="text-center align-middle"
                    >
                      {!!subdoc01_list.length && subdoc01_list[0].sn}
                    </td>
                  </tr>
                  <tr>
                    <td width="10%" className="text-center align-middle">
                      实施普查车组
                    </td>
                    <td
                      width="40%"
                      colSpan="5"
                      className="text-center align-middle"
                    >
                      {!!subdoc01_list.length && subdoc01_list[0].train}
                    </td>
                    <td
                      width="10%"
                      colSpan="2"
                      className="text-center align-middle"
                    >
                      实施普查日期
                    </td>
                    <td
                      width="40%"
                      colSpan="4"
                      className="text-center align-middle"
                    >
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
                      <td>{current.duty || ''}</td>
                      <td>{current.p_bz || ''}</td>
                      <td>{current.qc || ''}</td>
                      <td>{current.remark || ''}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

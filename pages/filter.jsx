import React from 'react';
import dayjs from 'dayjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';

import Footer from '../component/Footer.jsx';
import Navbar from '../component/Navbar.jsx';
import { DeptDataList, TrainDataList } from '../component/Input.jsx';
import { PROGRESS, reducer } from '../util/miscellaneous';

let initial_filter = {
  dept: '',
  train: '',
  time_begin: '',
  time_end: '',
  title: '',
};

export default function Filter() {
  const [option, setOption] = React.useState('');
  const [data_list, setDataList] = React.useState([]);
  const [filter, dispatch] = React.useReducer(reducer, initial_filter);
  const handleFilter = () => {
    setDataList([]);
    let query = [
      `dept=${filter.dept}`,
      `&train=${filter.train}`,
      `&time_begin=${filter.time_begin}`,
      `&time_end=${filter.time_end}`,
      `&title=${filter.title}`,
    ];
    fetch(`/api/pitchfork/filter?option=default&${query.join('')}`)
      .then((response) => response.json())
      .then((data) => {
        setDataList(data);
      });
  };

  React.useEffect(() => {
    setDataList([]);
    if (option === '') {
      fetch('/api/pitchfork/filter')
        .then((response) => response.json())
        .then((data) => {
          setDataList(data);
        })
        .catch((err) => console.error(err));
    } else if (option === '我的申请') {
      //
    } else if (option === '已退回的申请') {
      fetch('/api/pitchfork/filter?option=reject')
        .then((response) => response.json())
        .then((data) => {
          setDataList(data);
        })
        .catch((err) => console.error(err));
    }
  }, [option]);

  return (
    <div className="d-flex flex-column h-100 w-100">
      <header>
        <Navbar option="检索" />
      </header>
      <main className="flex-grow-1">
        <div className="container-fluid title pt-4">
          <h1>一体化作业 检索</h1>
          <ul className="nav nav-tabs mt-4 justify-content-center">
            <li className="nav-item">
              <button
                type="button"
                className={
                  option === ''
                    ? 'btn btn-link nav-link active'
                    : 'btn btn-link nav-link text-light'
                }
                onClick={() => setOption('')}
              >
                检索
              </button>
            </li>
            <li className="nav-item">
              <button
                type="button"
                className={
                  option === '我的申请'
                    ? 'btn btn-link nav-link active'
                    : 'btn btn-link nav-link text-light'
                }
                onClick={() => setOption('我的申请')}
              >
                我的申请
              </button>
            </li>
            <li className="nav-item">
              <button
                type="button"
                className={
                  option === '已退回的申请'
                    ? 'btn btn-link nav-link active'
                    : 'btn btn-link nav-link text-light'
                }
                onClick={() => setOption('已退回的申请')}
              >
                已退回的申请
              </button>
            </li>
          </ul>
        </div>
        <div className="container-xl mt-5">
          <div className="card shadow">
            {option === '' && (
              <div className="card-header row">
                <span className="text-danger">***待实现：按时间查询***</span>
                <div className="input-group mb-3 col">
                  <span className="input-group-text">部门/单位</span>
                  <input
                    type="text"
                    value={filter.dept}
                    list="dept-datalist"
                    className="form-control"
                    onChange={(event) =>
                      dispatch({
                        type: 'set',
                        payload: { key: 'dept', value: event.target.value },
                      })
                    }
                  />
                  <DeptDataList />
                </div>
                <div className="input-group mb-3 col">
                  <span className="input-group-text">车组</span>
                  <input
                    type="text"
                    value={filter.train}
                    list="train-datalist"
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
                  <TrainDataList />
                </div>
                <div className="input-group mb-3 col">
                  <span className="input-group-text">作业时间/起</span>
                  <input
                    type="datetime-local"
                    value={filter.time_begin}
                    className="form-control"
                    onChange={(event) =>
                      dispatch({
                        type: 'set',
                        payload: {
                          key: 'time_begin',
                          value: event.target.value,
                        },
                      })
                    }
                  />
                </div>
                <div className="input-group mb-3 col">
                  <span className="input-group-text">作业时间/止</span>
                  <input
                    type="datetime-local"
                    value={filter.time_end}
                    className="form-control"
                    onChange={(event) =>
                      dispatch({
                        type: 'set',
                        payload: {
                          key: 'time_end',
                          value: event.target.value,
                        },
                      })
                    }
                  />
                </div>
                <div className="w-100" />
                <div className="input-group mb-3 col">
                  <span className="input-group-text">作业内容</span>
                  <input
                    type="text"
                    value={filter.title}
                    className="form-control"
                    onChange={(event) =>
                      dispatch({
                        type: 'set',
                        payload: {
                          key: 'title',
                          value: event.target.value,
                        },
                      })
                    }
                  />
                </div>
                <div className="col-auto">
                  <button className="btn btn-primary" onClick={handleFilter}>
                    查询
                  </button>
                </div>
              </div>
            )}
            <div className="card-body table-responsive">
              <table className="table table-hover table-bordered align-middle">
                <caption>
                  {option === '已退回的申请' && '最近退回的100个'}
                  {option === '我的申请' && '我的'}
                  作业申请
                </caption>
                <thead>
                  <tr>
                    <th>
                      <span className="float-end">#</span>
                    </th>
                    <th>状态</th>
                    <th>部门/单位</th>
                    <th>车组</th>
                    <th>作业时间</th>
                    <th>作业内容</th>
                    <th>施修要求</th>
                  </tr>
                </thead>
                <tbody>
                  {data_list.map((current) => (
                    <tr key={current.id}>
                      <td>
                        <a
                          href={`/detail/${current.id}`}
                          className="text-decoration-none"
                        >
                          {/* <span className="fas fa-link fa-fw" /> */}
                          <FontAwesomeIcon icon={faLink} fixedWidth />
                        </a>
                        <span className="float-end">{current.id}</span>
                      </td>
                      <td>
                        {current.tag}
                        <br />
                        <span
                          className={
                            (PROGRESS.indexOf(current.status) < 0 &&
                              'badge bg-danger') ||
                            (PROGRESS.indexOf(current.status) <= 3 &&
                              'badge bg-info') ||
                            (PROGRESS.indexOf(current.status) > 3 &&
                              PROGRESS.indexOf(current.status) < 11 &&
                              'badge bg-success') ||
                            (PROGRESS.indexOf(current.status) === 11 &&
                              'badge bg-secondary')
                          }
                        >
                          <strong>{current.status}</strong>
                        </span>
                      </td>
                      <td>
                        <span className="lead text-primary">
                          <strong>{current.dept}</strong>
                        </span>
                        <br />
                        {current.dept_leader}
                        <small>
                          &nbsp;
                          <em className="text-muted">
                            {current.dept_leader_phone}
                          </em>
                        </small>
                        <br />
                        {current.operator}
                        <small>
                          &nbsp;
                          <em className="text-muted">
                            {current.operator_phone}
                          </em>
                        </small>
                      </td>
                      <td className="lead text-danger">
                        <strong>{current.train}</strong>
                      </td>
                      <td>
                        {dayjs(current.time_begin).format('YYYY-MM-DD HH:mm')}
                        <br />
                        <span className="text-muted">至</span>
                        <br />
                        {dayjs(current.time_end).format('YYYY-MM-DD HH:mm')}
                      </td>
                      <td>
                        <strong>{current.category}</strong>
                        <br />
                        {current.title}
                      </td>
                      <td>
                        蓄电池：
                        {current.p_yq_xdc === '无要求' ? (
                          current.p_yq_xdc
                        ) : (
                          <span className="badge bg-danger">
                            {current.p_yq_xdc}
                          </span>
                        )}
                        <br />
                        接触网：
                        {current.p_yq_jcw === '无要求' ? (
                          current.p_yq_jcw
                        ) : (
                          <span className="badge bg-danger">
                            {current.p_yq_jcw}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th>
                      <span className="float-end">#</span>
                    </th>
                    <th>状态</th>
                    <th>部门/单位</th>
                    <th>车组</th>
                    <th>作业时间</th>
                    <th>作业内容</th>
                    <th>施修要求</th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

import Footer from '../../component/Footer';
import Navbar from '../../component/Navbar';
import { reducer } from '../../util/miscellaneous';

Form.propTypes = {
  data: PropTypes.object,
  dispatch: PropTypes.func,
};

Form.defaultProps = {
  data: {},
  dispatch: () => {},
};

export function Form({ data, dispatch }) {
  return (
    <form className="row">
      <div className="col mb-3">
        <label className="form-label">申请单位</label>
        <input
          type="text"
          value={data.dept}
          className="form-control"
          onChange={(event) =>
            dispatch({
              type: 'set',
              payload: { key: 'dept', value: event.target.value },
            })
          }
        />
      </div>
      <div className="w-100" />
      <div className="col mb-3">
        <label className="form-label">申请人</label>
        <input
          type="text"
          value={data.dept_leader}
          className="form-control"
          onChange={(event) =>
            dispatch({
              type: 'set',
              payload: {
                key: 'dept_leader',
                value: event.target.value,
              },
            })
          }
        />
      </div>
      <div className="col mb-3">
        <label className="form-label">联系电话</label>
        <input
          type="text"
          value={data.dept_leader_phone}
          className="form-control"
          onChange={(event) =>
            dispatch({
              type: 'set',
              payload: {
                key: 'dept_leader_phone',
                value: event.target.value,
              },
            })
          }
        />
      </div>
      <div className="col mb-3">
        <label className="form-label">作业负责人</label>
        <input
          type="text"
          value={data.operator}
          className="form-control"
          onChange={(event) =>
            dispatch({
              type: 'set',
              payload: { key: 'operator', value: event.target.value },
            })
          }
        />
      </div>
      <div className="col mb-3">
        <label className="form-label">联系电话</label>
        <input
          type="text"
          value={data.operator_phone}
          className="form-control"
          onChange={(event) =>
            dispatch({
              type: 'set',
              payload: {
                key: 'operator_phone',
                value: event.target.value,
              },
            })
          }
        />
      </div>
      <div className="w-100" />
      <hr />
      <div className="col-3 mb-3">
        <label className="form-label">作业车组</label>
        <input
          type="text"
          value={data.train}
          className="form-control"
          onChange={(event) =>
            dispatch({
              type: 'set',
              payload: { key: 'train', value: event.target.value },
            })
          }
        />
      </div>
      <div className="col mb-3">
        <label className="form-label">申请作业时间 - 起</label>
        <input
          type="datetime-local"
          value={data.time_begin}
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
      <div className="col mb-3">
        <label className="form-label">申请作业时间 - 止</label>
        <input
          type="datetime-local"
          value={data.time_end}
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
      <div className="col-3 mb-3">
        <label className="form-label">作业内容</label>
        <select
          value={data.category}
          className="form-control"
          onChange={(event) =>
            dispatch({
              type: 'set',
              payload: {
                key: 'category',
                value: event.target.value,
              },
            })
          }
        >
          <option value="普查">普查</option>
          <option value="检查">检查</option>
          <option value="故障处理">故障处理</option>
          <option value="加装改造">加装改造</option>
          <option value="其它">其它</option>
        </select>
      </div>
      <div className="col-9 mb-3">
        <label className="form-label">&nbsp;</label>
        <input
          type="text"
          value={data.title}
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
      <div className="w-100" />
      <hr />
      <p className="text-muted lead">施修要求</p>
      <div className="col mb-3">
        <label className="form-label">蓄电池</label>
        <select
          value={data.p_yq_xdc}
          className="form-control"
          onChange={(event) =>
            dispatch({
              type: 'set',
              payload: {
                key: 'p_yq_xdc',
                value: event.target.value,
              },
            })
          }
        >
          <option value="供">供</option>
          <option value="断">断</option>
          <option value="无要求">无要求</option>
        </select>
      </div>
      <div className="col mb-3">
        <label className="form-label">接触网</label>
        <select
          value={data.p_yq_jcw}
          className="form-control"
          onChange={(event) =>
            dispatch({
              type: 'set',
              payload: {
                key: 'p_yq_jcw',
                value: event.target.value,
              },
            })
          }
        >
          <option value="供">供</option>
          <option value="断">断</option>
          <option value="无要求">无要求</option>
        </select>
      </div>
      <div className="col mb-3">
        <label className="form-label">作业地点</label>
        <select
          value={data.p_yq_zydd}
          className="form-control"
          onChange={(event) =>
            dispatch({
              type: 'set',
              payload: {
                key: 'p_yq_zydd',
                value: event.target.value,
              },
            })
          }
        >
          <option value="检查库">检查库</option>
          <option value="临修库">临修库</option>
          <option value="无要求">无要求</option>
        </select>
      </div>
      <div className="w-100" />
      <div className="col mb-3">
        <label className="form-label">其它</label>
        <input
          type="text"
          value={data.p_yq_qt}
          className="form-control"
          onChange={(event) =>
            dispatch({
              type: 'set',
              payload: {
                key: 'p_yq_qt',
                value: event.target.value,
              },
            })
          }
        />
      </div>
    </form>
  );
}

const initial_data = {
  dept: '',
  dept_leader: '',
  dept_leader_phone: '',
  operator: '',
  operator_phone: '',
  train: '',
  time_begin: dayjs().add(1, 'hour').format('YYYY-MM-DDTHH:00:00'),
  time_end: dayjs().add(2, 'hour').format('YYYY-MM-DDTHH:00:00'),
  category: '普查',
  title: '',
  p_yq_xdc: '无要求',
  p_yq_jcw: '无要求',
  p_yq_zydd: '无要求',
  p_yq_qt: '无',
};

export default function Detail() {
  const [data, dispatch] = React.useReducer(reducer, initial_data);
  const [option, setOption] = React.useState('计划内作业');
  const handleOption = (event) => {
    setOption(event.target.getAttribute('data-option'));
  };
  const handleSubmit = () => {
    fetch('/api/harold/detail', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 200)
          window.alert('数据已提交至服务器，请稍后查看结果。');
        else throw new Error('服务器错误');
      })
      .catch((error) => window.alert(error.stack));
  };

  return (
    <div className="d-flex flex-column h-100 w-100">
      <header>
        <Navbar option="新建作业申请" />
      </header>
      <main className="flex-grow-1">
        <div className="container-fluid title pt-4">
          <h1>{`新建申请单 ${option}`}</h1>
          <ul className="nav nav-tabs mt-4 justify-content-center">
            <li className="nav-item">
              <a
                className={
                  option === '计划内作业'
                    ? 'nav-link active'
                    : 'nav-link text-light'
                }
                href="#"
                data-option="计划内作业"
                onClick={handleOption}
              >
                计划内作业
              </a>
            </li>
            <li className="nav-item">
              <a
                className={
                  option === '计划外作业'
                    ? 'nav-link active'
                    : 'nav-link text-light'
                }
                href="#"
                data-option="计划外作业"
                onClick={handleOption}
              >
                计划外作业
              </a>
            </li>
          </ul>
        </div>
        <div className="container-lg mt-5">
          <div className="card shadow">
            <div className="card-body">
              <Form data={data} dispatch={dispatch} />
            </div>
            <div className="card-footer d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => window.history.back()}
              >
                后退
              </button>
              <div className="btn-group">
                <button className="btn btn-primary" onClick={handleSubmit}>
                  提交
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

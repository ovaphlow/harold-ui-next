import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';

import Footer from '../component/Footer';
import Navbar from '../component/Navbar';
import SubDocument03 from '../component/SubDocument03';
import { reducer } from '../util/miscellaneous';

const initial_subdoc03 = {
  name: '',
  train: '',
  position: '',
  date: '',
  time: '',
  production_date: '',
  reason: '',
  p_gywj: '是',
  p_ljbs: '是',
  sn: '',
  sn2: '',
  p_bjaz: '是',
  operator: '',
};

SaveSubDocument03.propTypes = {
  data: PropTypes.object.isRequired,
};

export default function SaveSubDocument03({ data }) {
  const [subdoc03, dispatch] = React.useReducer(reducer, initial_subdoc03);
  const router = useRouter();
  const { id } = router.query;
  const [subdoc03_list, setSubdoc03List] = React.useState([]);
  const handleSubmit = (event) => {
    event.target.disabeld = true;
    let node_list = document.querySelectorAll('.form-check-input');
    let ll = [];
    node_list.forEach((current) => {
      if (current.checked)
        ll.push({
          carriage: current.value,
          name: subdoc03.name,
          train: subdoc03.train,
          position: subdoc03.position,
          date: subdoc03.date,
          time: subdoc03.time,
          production_date: subdoc03.production_date,
          reason: subdoc03.reason,
          p_gywj: subdoc03.p_gywj,
          p_ljbs: subdoc03.p_ljbs,
          sn: subdoc03.sn,
          sn2: subdoc03.sn2,
          p_bjaz: subdoc03.p_bjaz,
          operator: subdoc03.operator,
        });
    });
    fetch(`/api/pitchfork/detail/${id}?option=report-subdoc03`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ list: JSON.stringify(ll) }),
    })
      .then((response) => {
        if (response.status === 200) {
          alert('数据已提交至服务器，请稍后查看。');
          fetchSubdoc03();
        } else throw new Error('操作失败');
      })
      .catch((err) => alert(err));
  };
  const handleRemove = (index) => {
    if (!confirm('确定要删除所选数据？')) return;
    fetch(`/api/pitchfork/detail/${id}?option=remove-subdoc03`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ id: index }),
    })
      .then((response) => {
        if (response.status === 200) {
          alert('数据已提交至服务器，请稍后查看。');
          fetchSubdoc03();
        } else throw new Error('操作失败');
      })
      .catch((err) => alert(err));
  };
  const fetchSubdoc03 = () => {
    fetch(`/api/pitchfork/detail/${id}?option=subdoc03`)
      .then((response) => response.json())
      .then((data) => {
        let ll = eval(data.subdoc03.value).map((current, index) => {
          return { id: index, ...current };
        });
        setSubdoc03List(ll);
      })
      .catch((err) => alert(err));
  };

  React.useEffect(() => {
    if (!id) return;
    fetchSubdoc03();
  }, [id]);

  React.useEffect(() => {
    dispatch({ type: 'set', payload: { key: 'train', value: data.train } });
    dispatch({
      type: 'set',
      payload: { key: 'date', value: dayjs(data.date).format('YYYY-MM-DD') },
    });
    dispatch({
      type: 'set',
      payload: {
        key: 'time',
        value: dayjs(data.time_begin).format('HH:mm:ss'),
      },
    });
    dispatch({
      type: 'set',
      payload: { key: 'operator', value: data.operator },
    });
  }, [data]);

  return (
    <div className="d-flex flex-column h-100 w-100">
      <header>
        <Navbar option="" />
      </header>
      <main className="flex-grow-1">
        <div className="container-fluid title py-4">
          <h1>关键配件更换记录表</h1>
        </div>
        <div className="container-lg mt-5">
          <div className="card shadow">
            <div className="card-body row">
              <div className="col mb-3">
                <label className="form-label">部件名称</label>
                <input
                  type="text"
                  value={subdoc03.name}
                  className="form-control"
                  onChange={(event) =>
                    dispatch({
                      type: 'set',
                      payload: { key: 'name', value: event.target.value },
                    })
                  }
                />
              </div>
              <div className="col mb-3">
                <label className="form-label">车组</label>
                <input
                  type="text"
                  value={subdoc03.train}
                  className="form-control"
                  onChange={(event) =>
                    dispatch({
                      type: 'set',
                      payload: { key: 'train', value: event.target.value },
                    })
                  }
                />
              </div>
              <div className="w-100" />
              <div className="col mb-3">
                <label className="form-label">车号</label>
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
              <div className="w-100" />
              <div className="col mb-3">
                <label className="form-label">位置</label>
                <input
                  type="text"
                  value={subdoc03.position}
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
                <label className="form-label">日期</label>
                <input
                  type="date"
                  value={subdoc03.date}
                  className="form-control"
                  onChange={(event) =>
                    dispatch({
                      type: 'set',
                      payload: { key: 'date', value: event.target.value },
                    })
                  }
                />
              </div>
              <div className="form-group col">
                <label className="form-label">时间</label>
                <input
                  type="time"
                  value={subdoc03.time}
                  className="form-control"
                  onChange={(event) =>
                    dispatch({
                      type: 'set',
                      payload: {
                        key: 'time',
                        value: event.target.value,
                      },
                    })
                  }
                />
              </div>
              <div className="form-group col">
                <label className="form-label">出厂日期</label>
                <input
                  type="text"
                  value={subdoc03.production_date}
                  className="form-control"
                  onChange={(event) =>
                    dispatch({
                      type: 'set',
                      payload: {
                        key: 'production_date',
                        value: event.target.value,
                      },
                    })
                  }
                />
              </div>
              <div className="w-100" />
              <div className="col mb-3">
                <label className="form-label">更换原因</label>
                <input
                  type="text"
                  value={subdoc03.reason}
                  className="form-control"
                  onChange={(event) =>
                    dispatch({
                      type: 'set',
                      payload: {
                        key: 'reason',
                        value: event.target.value,
                      },
                    })
                  }
                />
              </div>
              <div className="w-100" />
              <div className="col mb-3">
                <label className="form-label">工艺文件及各步骤</label>
                <select
                  value={subdoc03.p_gywj}
                  className="form-control"
                  onChange={(event) =>
                    dispatch({
                      type: 'set',
                      payload: {
                        key: 'p_gywj',
                        value: event.target.value,
                      },
                    })
                  }
                >
                  <option value="是">已阅读并掌握</option>
                  <option value="否">未阅读并掌握</option>
                </select>
              </div>
              <div className="col mb-3">
                <label className="form-label">力矩扳手</label>
                <select
                  value={subdoc03.p_ljbs}
                  className="form-control"
                  onChange={(event) =>
                    dispatch({
                      type: 'set',
                      payload: {
                        key: 'p_ljbs',
                        value: event.target.value,
                      },
                    })
                  }
                >
                  <option value="是">已校验</option>
                  <option value="否">未校验</option>
                </select>
              </div>
              <div className="col mb-3">
                <label className="form-label">换下部件序列号</label>
                <input
                  type="text"
                  value={subdoc03.sn}
                  className="form-control"
                  onChange={(event) =>
                    dispatch({
                      type: 'set',
                      payload: { key: 'sn', value: event.target.value },
                    })
                  }
                />
              </div>
              <div className="col mb-3">
                <label className="form-label">换上部件序列号</label>
                <input
                  type="text"
                  value={subdoc03.sn2}
                  className="form-control"
                  onChange={(event) =>
                    dispatch({
                      type: 'set',
                      payload: { key: 'sn2', value: event.target.value },
                    })
                  }
                />
              </div>
              <div className="w-100" />
              <div className="col mb-3">
                <label className="form-label">部件、螺栓力矩、防松标记</label>
                <select
                  value={subdoc03.p_bjaz}
                  className="form-control"
                  onChange={(event) =>
                    dispatch({
                      type: 'set',
                      payload: { key: 'p_bjaz', value: event.target.value },
                    })
                  }
                >
                  <option value="是">
                    部件安装良好，螺栓力矩已紧固，防松标记已涂打
                  </option>
                  <option value="否">否</option>
                </select>
              </div>
              <div className="col-6 mb-3">
                <label className="form-label">作业者</label>
                <input
                  type="text"
                  value={subdoc03.operator}
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
              <SubDocument03
                subdoc03_list={subdoc03_list}
                handleRemove={handleRemove}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;

  // eslint-disable-next-line
  const response = await fetch(`${process.env.gateway}/api/pitchfork/${id}`);
  const data = await response.json();

  return { props: { data } };
}

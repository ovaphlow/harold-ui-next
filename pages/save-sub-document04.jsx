import dayjs from 'dayjs';
import React from 'react';
import { useRouter } from 'next/router';

import Footer from '../component/Footer';
import Navbar from '../component/Navbar';
import SubDocument04 from '../component/SubDocument04';
import { reducer } from '../util/miscellaneous';

const initial_subdoc04 = {
  subject: '',
  version: '',
  version2: '',
  sn: '',
  train: '',
  date: dayjs().format('YYYY-MM-DD'),
  time_begin: '',
  time_end: '',
  dept: '',
  operator: '',
  remark: '无',
};

export default function SaveSubDocument04({ data }) {
  const [subdoc04, dispatch] = React.useReducer(reducer, initial_subdoc04);
  const router = useRouter();
  const { id } = router.query;
  const [subdoc04_list, setSubdoc04List] = React.useState([]);
  const handleSubmit = (event) => {
    event.target.disabled = true;
    let node_list = document.querySelectorAll('.form-check-input');
    let ll = [];
    node_list.forEach((current) => {
      if (current.checked) ll.push(current.value);
    });
    fetch(`/api/harold/detail/${id}?option=report-subdoc04`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ ...subdoc04, carriage: ll.join(',') }),
    })
      .then((response) => {
        if (response.status === 200) {
          alert('数据已提交至服务器，请稍后查看。');
          fetchSubdoc04();
        } else throw new Error('操作失败');
      })
      .catch((err) => alert(err));
  };
  const handleRemove = (index) => {
    if (!confirm('确定要删除所选数据？')) return;
    fetch(`/api/harold/detail/${id}?option=remove-subdoc04`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ id: index }),
    })
      .then((response) => {
        if (response.status === 200) {
          alert('数据已提交至服务器，请稍后查看。');
          fetchSubdoc04();
        } else throw new Error('操作失败');
      })
      .catch((err) => alert(err));
  };
  const fetchSubdoc04 = () => {
    fetch(`/api/harold/detail/${id}?option=subdoc04`)
      .then((response) => response.json())
      .then((data) => {
        let ll = eval(data.subdoc04).map((current, index) => {
          return { id: index, ...current };
        });
        setSubdoc04List(ll);
      })
      .catch((err) => alert(err));
  };

  React.useEffect(() => {
    if (!id) return;
    fetchSubdoc04();
  }, [id]);

  React.useEffect(() => {
    dispatch({ type: 'set', payload: { key: 'train', value: data.train } });
    dispatch({
      type: 'set',
      payload: {
        key: 'date',
        value: dayjs(data.time_begin).format('YYYY-MM-DD'),
      },
    });
    dispatch({
      type: 'set',
      payload: {
        key: 'time_begin',
        value: dayjs(data.time_begin).format('HH:mm:ss'),
      },
    });
    dispatch({
      type: 'set',
      payload: {
        key: 'time_end',
        value: dayjs(data.time_end).format('HH:mm:ss'),
      },
    });
    dispatch({ type: 'set', payload: { key: 'dept', value: data.dept } });
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
          <h1>加装改造（软件升级）记录单</h1>
        </div>
        <div className="container-lg mt-5">
          <div className="card shadow">
            <div className="card-body row">
              <div className="col-6 mb-3">
                <label className="form-label">实施改造项目（升级系统）</label>
                <input
                  type="text"
                  value={subdoc04.subject}
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
                <label className="form-label">软件版本号（新）</label>
                <input
                  type="text"
                  value={subdoc04.version}
                  className="form-control"
                  onChange={(event) =>
                    dispatch({
                      type: 'set',
                      payload: {
                        key: 'version',
                        value: event.target.value,
                      },
                    })
                  }
                />
              </div>
              <div className="col mb-3">
                <label className="form-label">软件版本号（旧）</label>
                <input
                  type="text"
                  value={subdoc04.version2}
                  className="form-control"
                  onChange={(event) =>
                    dispatch({
                      type: 'set',
                      payload: {
                        key: 'version2',
                        value: event.target.value,
                      },
                    })
                  }
                />
              </div>
              <div className="w-100" />
              <div className="col mb-3">
                <label className="form-label">批准文件号</label>
                <input
                  type="text"
                  value={subdoc04.sn}
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
                <label className="form-label">实施改造车组</label>
                <input
                  type="text"
                  value={subdoc04.train}
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
                <label className="form-label">实施改造日期</label>
                <input
                  type="date"
                  value={subdoc04.date}
                  className="form-control"
                  onChange={(event) =>
                    dispatch({
                      type: 'set',
                      payload: { key: 'date', value: event.target.value },
                    })
                  }
                />
              </div>
              <div className="w-100" />
              <div className="col mb-3">
                <label className="form-label">实施改造的车厢号</label>
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
                <label className="form-label">开工时间</label>
                <input
                  type="time"
                  value={subdoc04.time_begin}
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
                  value={subdoc04.time_end}
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
              <div className="w-100" />
              <div className="col mb-3">
                <label className="form-label">实施单位</label>
                <input
                  type="text"
                  value={subdoc04.dept}
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
                  value={subdoc04.operator}
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
              <div className="w-100" />
              <div className="col mb-3">
                <label className="form-label">备注</label>
                <input
                  type="text"
                  value={subdoc04.remark}
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
              <SubDocument04
                subdoc04_list={subdoc04_list}
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

  const response = await fetch(`${process.env.gateway}/api/harold/${id}`);
  const data = await response.json();

  return { props: { data } };
}

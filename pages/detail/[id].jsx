import React from 'react';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';

import Footer from '../../component/Footer';
import Navbar from '../../component/Navbar';
import { reducer } from '../../util/miscellaneous';
import { Form } from './index';

export default function Detail({ data }) {
  const [document, dispatch] = React.useReducer(reducer, data);
  const router = useRouter();
  const { id } = router.query;
  const handleReject = (event) => {
    event.target.disabled = true;
    let content = window.prompt('退回原因：');
    fetch(`/api/harold/${id}?option=reject`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        reject: content,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          window.history.back();
        } else throw new Error('操作失败');
      })
      .catch((err) => window.alert(err));
  };
  const handleSubmit = (event) => {
    event.target.disabled = true;
    fetch(`/api/harold/detail/${id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(document),
    })
      .then((response) => {
        if (response.status === 200)
          window.alert('数据已提交至服务器，请稍后查看。');
        else throw new Error('操作失败');
      })
      .catch((err) => alert(err));
  };

  React.useEffect(() => {
    dispatch({
      type: 'set',
      payload: {
        key: 'time_begin',
        value: dayjs(data.time_begin).format('YYYY-MM-DDTHH:mm:ss'),
      },
    });
    dispatch({
      type: 'set',
      payload: {
        key: 'time_end',
        value: dayjs(data.time_end).format('YYYY-MM-DDTHH:mm:ss'),
      },
    });
  }, []);

  return (
    <div className="d-flex flex-column h-100 w-100">
      <header>
        <Navbar option="" />
      </header>
      <main className="flex-grow-1">
        <div className="container-fluid title py-4">
          <h1>申请单</h1>
        </div>
        <div className="container-lg mt-5">
          <div className="card shadow">
            <div className="card-body">
              <Form data={document} dispatch={dispatch} />
            </div>
            <div className="card-footer d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => window.history.back()}
              >
                后退
              </button>
              <button
                type="button"
                className="btn btn-warning"
                onClick={handleReject}
              >
                退回
              </button>
              <div className="btn-group">
                <button className="btn btn-primary" onClick={handleSubmit}>
                  提交
                </button>
                <button
                  className="btn btn-info"
                  onClick={() => (window.location = `/check-p_jsy?id=${id}`)}
                >
                  技术员审核
                </button>
              </div>
            </div>
          </div>
          <div className="card shadow mt-3">
            <div className="card-header lead">审核阶段：{data.status}</div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">技术员审核（技术员信息）</div>
                    {data.p_zyxs}
                    <br />
                    <span className="badge bg-secondary">班组</span>
                    &nbsp;
                    {data.p_bz}
                    <br />
                    <span className="badge bg-secondary">质检</span>
                    &nbsp;
                    {data.qc}
                  </div>
                  <span className="text-muted">
                    {data.check_p_jsy_timeline}
                  </span>
                </li>
              </ul>
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

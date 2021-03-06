import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';

import Footer from '../../component/Footer';
import Navbar from '../../component/Navbar';
import { reducer, PROGRESS } from '../../util/miscellaneous';
import { Form } from './index';

Detail.propTypes = {
  data: PropTypes.object.isRequired,
};

export default function Detail({ data }) {
  const [document, dispatch] = React.useReducer(reducer, data);
  const router = useRouter();
  const { id } = router.query;
  const handleReject = (event) => {
    event.target.disabled = true;
    let content = window.prompt('退回原因：');
    fetch(`/api/pitchfork/${id}?option=reject`, {
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
          history.back();
        } else throw new Error('操作失败');
      })
      .catch((err) => window.alert(err));
  };
  const handleSubmit = (event) => {
    event.target.disabled = true;
    fetch(`/api/pitchfork/detail/${id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(document),
    })
      .then((response) => {
        if (response.status === 200) alert('数据已提交至服务器，请稍后查看。');
        else throw new Error('操作失败');
      })
      .catch((err) => alert(err));
  };
  const handleCheckPdd = (event) => {
    event.target.disabled = true;
    fetch(`/api/pitchfork/detail/${id}?option=check-p_dd`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: '{}',
    })
      .then((response) => {
        if (response.status === 200) alert('数据已提交至服务器，请稍后查看。');
        else throw new Error('操作失败');
      })
      .catch((err) => alert(err));
  };
  const handleCheckPzbsz = (event) => {
    event.target.disabled = true;
    fetch(`/api/pitchfork/detail/${id}?option=check-p_zbsz`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: '{}',
    })
      .then((response) => {
        if (response.status === 200) alert('数据已提交至服务器，请稍后查看。');
        else throw new Error('操作失败');
      })
      .catch((err) => alert(err));
  };
  const handleCheckPbz = (event) => {
    event.target.disabled = true;
    fetch(`/api/pitchfork/detail/${id}?option=check-p_bz`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: '{}',
    })
      .then((response) => {
        if (response.status === 200) alert('数据已提交至服务器，请稍后查看。');
        else throw new Error('操作失败');
      })
      .catch((err) => alert(err));
  };
  // const handleReport = (event) => { event.target.disabled = true; };

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
                {data.status === '' && (
                  <button
                    className="btn btn-info"
                    onClick={() => (window.location = `/check-p_jsy?id=${id}`)}
                  >
                    技术员审核
                  </button>
                )}
                {data.status === '技术员审核' && (
                  <button className="btn btn-info" onClick={handleCheckPdd}>
                    调度审核
                  </button>
                )}
                {data.status === '调度审核' && (
                  <button className="btn btn-info" onClick={handleCheckPzbsz}>
                    值班所长审核
                  </button>
                )}
                {!!data.p_zyxs &&
                  data.p_zyxs.indexOf('班组') > -1 &&
                  data.status === '值班所长审核' && (
                    <button className="btn btn-info" onClick={handleCheckPbz}>
                      班组签字
                    </button>
                  )}
                {!!data.p_zyxs &&
                  data.p_zyxs.indexOf('班组') > -1 &&
                  data.status === '班组签字' && (
                    <a href={`/report?id=${id}`} className="btn btn-success">
                      作业负责人销记
                    </a>
                  )}
                {!!data.p_zyxs &&
                  data.p_zyxs.indexOf('班组') === -1 &&
                  data.status === '值班所长审核' && (
                    <a href={`/report?id=${id}`} className="btn btn-success">
                      作业负责人销记
                    </a>
                  )}
                {/* (1,4)监控班组签字 */}
                {data.status === '作业负责人销记' &&
                  (data.subdoc01.toString().length > 2 ||
                    data.subdoc04.toString().length > 2) && (
                    <a
                      href={`/review-p_bz?id=${id}`}
                      className="btn btn-success"
                    >
                      监控班组签字
                    </a>
                  )}
                {/* (2,3)工长签字 */}
                {(data.status === '作业负责人销记' ||
                  (data.status === '监控班组签字' &&
                    (data.subdoc02.toString().length > 2 ||
                      data.subdoc03.toString().length > 2))) && (
                  <a href={`/review-p_gz?id=${id}`} className="btn btn-success">
                    工长签字（检查判断条件）
                  </a>
                )}
                {/* 质检签字 */}
                {(data.status === '监控班组签字' ||
                  data.status === '工长签字') && (
                  <a href={`/review-qc?id=${id}`} className="btn btn-success">
                    质检签字
                  </a>
                )}
                {/* (2,3)值班干部签字 */}
                {data.status === '质检签字' &&
                  (data.subdoc02.toString().length > 2 ||
                    data.subdoc03.toString().length > 2) && (
                    <a
                      href={`/review-p_jsy?id=${id}`}
                      className="btn btn-success"
                    >
                      值班干部签字
                    </a>
                  )}
                {/* 调度签字 */}
                {(data.status === '质检签字' ||
                  (data.status === '值班干部签字' &&
                    (data.subdoc02.toString().length > 2 ||
                      data.subdoc03.toString.length > 2))) && (
                  <a href={`/review-p_dd?id=${id}`} className="btn btn-success">
                    调度签字
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className="card shadow mt-3">
            <div className="card-header lead">
              审核阶段：
              {data.status}
              {'-->'}
              {PROGRESS[PROGRESS.indexOf(data.status) + 1]}
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="lead">技术员审核（技术员信息）</div>
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
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="lead">调度审核（调度信息）</div>
                  </div>
                  <span className="text-muted">{data.check_p_dd_timeline}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="lead">值班所长审核（值班所长信息）</div>
                  </div>
                  <span className="text-muted">
                    {data.check_p_zbsz_timeline}
                  </span>
                </li>
                {!!data.check_p_bz_timeline && (
                  <li className="list-group-item d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                      <div className="lead">班组签字（班组信息）</div>
                    </div>
                    <span className="text-muted">
                      {data.check_p_bz_timeline}
                    </span>
                  </li>
                )}
                {!!data.report_timeline && (
                  <li className="list-group-item d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                      <div className="lead">
                        作业负责人销记（作业负责人信息）
                      </div>
                    </div>
                    <span className="text-muted">{data.report_timeline}</span>
                  </li>
                )}
                {!!data.review_p_bz_timeline && (
                  <li className="list-group-item d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                      <div className="lead">监控班组签字</div>
                    </div>
                    <span className="text-muted">
                      {data.review_p_bz_timeline}
                    </span>
                  </li>
                )}
                {!!data.review_p_gz_timeline && (
                  <li className="list-group-item d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                      <div className="lead">工长签字</div>
                    </div>
                    <span className="text-muted">
                      {data.review_p_gz_timeline}
                    </span>
                  </li>
                )}
                {!!data.review_qc_timeline && (
                  <li className="list-group-item d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                      <div className="lead">质检签字</div>
                    </div>
                    <span className="text-muted">
                      {data.review_qc_timeline}
                    </span>
                  </li>
                )}
                {!!data.review_p_jsy_timeline && (
                  <li className="list-group-item d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                      <div className="lead">值班干部签字</div>
                    </div>
                    <span className="text-muted">
                      {data.review_p_jsy_timeline}
                    </span>
                  </li>
                )}
                {!!data.review_p_dd_timeline && (
                  <li className="list-group-item d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                      <div className="lead">调度签字（调度信息）</div>
                    </div>
                    <span className="text-muted">
                      {data.review_p_dd_timeline}
                    </span>
                  </li>
                )}
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

  // eslint-disable-next-line
  const response = await fetch(`${process.env.gateway}/api/pitchfork/${id}`);
  const data = await response.json();

  return { props: { data } };
}

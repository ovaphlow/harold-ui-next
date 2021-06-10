import React from 'react';
import { useRouter } from 'next/router';

import Footer from '../component/Footer';
import Navbar from '../component/Navbar';
import { reducer } from '../util/miscellaneous';

const initial_data = {
  report: '',
  remark: '无',
};

export default function Report() {
  const [data, dispatch] = React.useReducer(reducer, initial_data);
  const router = useRouter();
  const { id } = router.query;
  const handleReport = (event) => {
    event.target.disabled = true;
    fetch(`/api/harold/detail/${id}?option=report`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 200) {
          alert('数据已提交至服务器，请稍后查看。');
        } else throw new Error('操作失败');
      })
      .catch((err) => alert(err));
  };

  return (
    <div className="d-flex flex-column h-100 w-100">
      <header>
        <Navbar option="" />
      </header>
      <main className="flex-grow-1">
        <div className="container-fluid title py-4">
          <h1>作业负责人销记</h1>
        </div>
        <div className="container-lg mt-5">
          <div className="card shadow">
            <div className="card-body">
              <div className="row">
                <div className="btn-group col mb-3">
                  <a
                    href={`/save-sub-document01?id=${id}`}
                    className="btn btn-outline-secondary"
                  >
                    一般部件普查记录单
                  </a>
                  <a href="#" className="btn btn-outline-secondary">
                    一般配件更换记录表
                  </a>
                  <a href="#" className="btn btn-outline-secondary">
                    关键配件更换记录表
                  </a>
                  <a href="#" className="btn btn-outline-secondary">
                    加装改造（软件升级）记录单
                  </a>
                </div>
                <hr />
                <div className="clearfix" />
                <div className="col mb-3">
                  <label className="form-label">作业完成情况</label>
                  <input
                    type="text"
                    value={data.report}
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
                  <label className="form-label">备注</label>
                  <input
                    type="text"
                    value={data.remark}
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
                className="btn btn-info"
                onClick={handleReport}
              >
                提交
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

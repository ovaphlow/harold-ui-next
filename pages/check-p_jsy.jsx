import React from 'react';
import { useRouter } from 'next/router';

import Footer from '../component/Footer';
import Navbar from '../component/Navbar';
import { reducer } from '../util/miscellaneous';

const initial_data = {
  p_zyxs: '无要求',
  p_bz: '',
  qc: '',
};

export default function CheckPjsy() {
  const [data, dispatch] = React.useReducer(reducer, initial_data);
  const el_p_bz = React.useRef(null);
  const el_qc = React.useRef(null);
  const router = useRouter();
  const { id } = router.query;
  const handleChangeOption = (event) => {
    dispatch({
      type: 'set',
      payload: {
        key: 'p_zyxs',
        value: event.target.value,
      },
    });
  };
  const handleSubmit = (event) => {
    event.target.disabled = true;
    fetch(`/api/harold/detail/${id}?option=check-p_jsy`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 200) {
          window.alert('数据已提交至服务器，请稍后查看。');
        } else throw new Error('操作失败');
      })
      .catch((err) => window.alert(err));
  };

  React.useEffect(() => {
    if (data.p_zyxs === '无要求') {
      el_p_bz.current.disabled = true;
      el_qc.current.disabled = true;
    } else if (data.p_zyxs === '班组跟踪、质检确认') {
      el_p_bz.current.disabled = false;
      el_qc.current.disabled = false;
    } else if (data.p_zyxs === '班组、质检跟踪') {
      el_p_bz.current.disabled = false;
      el_qc.current.disabled = false;
    }
  }, [data.p_zyxs]);

  return (
    <div className="d-flex flex-column h-100 w-100">
      <header>
        <Navbar option="" />
      </header>
      <main className="flex-grow-1">
        <div className="container-fluid title py-4">
          <h1>技术员审核</h1>
        </div>
        <div className="container-lg mt-5">
          <div className="card shadow">
            <div className="card-body">
              <div className="row">
                <div className="col mb-3">
                  <label className="form-label">作业形式</label>
                  <select
                    value={data.p_zyxs}
                    className="form-control"
                    onChange={handleChangeOption}
                  >
                    <option value="无要求">无要求</option>
                    <option value="班组跟踪、质检确认">
                      班组跟踪、质检确认
                    </option>
                    <option value="班组、质检跟踪">班组、质检跟踪</option>
                  </select>
                </div>
                <div className="clearfix" />
                <div className="col mb-3">
                  <label className="form-label">选择班组</label>
                  <input
                    type="text"
                    value={data.p_bz}
                    placeholder="替换为input with data list"
                    className="form-control"
                    onChange={(event) =>
                      dispatch({
                        type: 'set',
                        payload: {
                          key: 'p_bz',
                          value: event.target.value,
                        },
                      })
                    }
                    ref={el_p_bz}
                    style={{ disabled: true }}
                  />
                </div>
                <div className="clearfix" />
                <div className="col mb-3">
                  <label className="form-label">选择质检</label>
                  <input
                    type="text"
                    value={data.qc}
                    placeholder="替换为input with data list"
                    className="form-control"
                    onChange={(event) =>
                      dispatch({
                        type: 'set',
                        payload: {
                          key: 'qc',
                          value: event.target.value,
                        },
                      })
                    }
                    ref={el_qc}
                    style={{ disabled: true }}
                  />
                </div>
              </div>
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
                className="btn btn-info"
                onClick={handleSubmit}
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

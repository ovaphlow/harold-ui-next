import React from 'react';
import { useRouter } from 'next/router';

import Footer from '../component/Footer';
import Navbar from '../component/Navbar';
import { reducer } from '../util/miscellaneous';

export default function ReviewPdd({ data }) {
  const [document, dispatch] = React.useReducer(reducer, data);
  const router = useRouter();
  const { id } = router.query;
  const handleReviewPdd = (event) => {
    event.target.disabled = true;
    fetch(`/api/harold/detail/${id}?option=review-p_dd`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(document),
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
          <h1>调度签字</h1>
        </div>
        <div className="container-lg mt-5">
          <div className="card shadow">
            <div className="card-body">
              <div className="row">
                <div className="col mb-3">
                  <label className="form-label">备注</label>
                  <input
                    type="text"
                    value={document.remark}
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
                onClick={handleReviewPdd}
              >
                调度签字
              </button>
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

import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

import Footer from '../component/Footer';
import Navbar from '../component/Navbar';
import SubDocument01 from '../component/SubDocument01';
import SubDocument04 from '../component/SubDocument04';

ReviewPbz.propTypes = {
  data: PropTypes.object.isRequired,
};

export default function ReviewPbz({ data }) {
  const router = useRouter();
  const { id } = router.query;
  const [subdoc01_list, setSubdoc01List] = React.useState([]);
  const [subdoc04_list, setSubdoc04List] = React.useState([]);
  const handleReviewPbz = () => {
    // todo: 检查页面中所有select元素是否选择合理的选项（确认/未确认）

    fetch(`/api/harold/detail/${id}?option=review-p_bz`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status === 200) alert('数据已提交至服务器，请稍后查看。');
        else throw new Error('操作失败');
      })
      .catch((err) => alert(err));
  };

  React.useEffect(() => {
    let ll = eval(data.subdoc01).map((current, index) => {
      return { id: index, ...current };
    });
    setSubdoc01List(ll);
  }, [data]);

  React.useEffect(() => {
    let ll = eval(data.subdoc04).map((current, index) => {
      return { id: index, ...current };
    });
    setSubdoc04List(ll);
  }, [data]);

  return (
    <div className="d-flex flex-column h-100 w-100">
      <header>
        <Navbar option="" />
      </header>
      <main className="flex-grow-1">
        <div className="container-fluid title py-4">
          <h1>监控班组签字</h1>
        </div>
        <div className="container-lg mt-5">
          <div className="card shadow mb-3">
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
                onClick={handleReviewPbz}
              >
                提交
              </button>
            </div>
          </div>
          {!!subdoc01_list.length && (
            <div className="card shadow">
              <div className="card-header lead">一般部件普查记录单</div>
              <div className="card-body table-responsive">
                <SubDocument01
                  subdoc01_list={subdoc01_list}
                  handleRemove={() => {}}
                  option={['p_bz']}
                  id={id}
                />
              </div>
            </div>
          )}
          <div className="w-100 my-4" />
          {!!subdoc04_list.length && (
            <div className="card shadow">
              <div className="card-header lead">加装改造（软件升级）记录单</div>
              <div className="card-body table-responsive">
                <SubDocument04
                  subdoc04_list={subdoc04_list}
                  handleRemove={() => {}}
                  option={['p_bz']}
                  id={id}
                />
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  // eslint-disable-next-line
  const url = [process.env.gateway, '/api/harold/', id];

  const response = await fetch(`${url.join('')}`);
  const data = await response.json();

  return { props: { data } };
}

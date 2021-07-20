import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

import Footer from '../component/Footer';
import Navbar from '../component/Navbar';
import SubDocument01 from '../component/SubDocument01';
import SubDocument02 from '../component/SubDocument02';
import SubDocument03 from '../component/SubDocument03';
import SubDocument04 from '../component/SubDocument04';

ReviewQc.propTypes = {
  data: PropTypes.object.isRequired,
};

export default function ReviewQc({ data }) {
  const [subdoc01_list, setSubdoc01List] = React.useState([]);
  const [subdoc02_list, setSubdoc02List] = React.useState([]);
  const [subdoc03_list, setSubdoc03List] = React.useState([]);
  const [subdoc04_list, setSubdoc04List] = React.useState([]);
  const router = useRouter();
  const { id } = router.query;
  const handleReviewQc = () => {
    // todo: 检查页面中所有select元素是否选择合理的选项（确认/未确认）

    fetch(`/api/pitchfork/detail/${id}?option=review-qc`, {
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
    let ll = eval(data.subdoc02).map((current, index) => {
      return { id: index, ...current };
    });
    setSubdoc02List(ll);
  }, [data]);

  React.useEffect(() => {
    let ll = eval(data.subdoc03).map((current, index) => {
      return { id: index, ...current };
    });
    setSubdoc03List(ll);
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
          <h1>质检签字</h1>
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
                onClick={handleReviewQc}
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
                  option={['qc']}
                  id={id}
                />
              </div>
            </div>
          )}
          <div className="w-100 my-4" />
          {!!subdoc02_list.length && (
            <div className="card shadow">
              <div className="card-header lead">一般配件更换记录表</div>
              <div className="card-body table-responsive">
                <SubDocument02
                  subdoc02_list={subdoc02_list}
                  option={['qc']}
                  id={id}
                />
              </div>
            </div>
          )}
          <div className="w-100 my-4" />
          {!!subdoc03_list.length && (
            <div className="card shadow">
              <div className="card-header lead">关键配件更换记录表</div>
              <div className="card-body table-responsive">
                <SubDocument03
                  subdoc03_list={subdoc03_list}
                  option={['qc']}
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
                  option={['qc']}
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
  const url = [process.env.gateway, '/api/pitchfork/', id];

  const response = await fetch(`${url.join('')}`);
  const data = await response.json();

  return { props: { data } };
}

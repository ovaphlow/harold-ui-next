import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

import Footer from '../component/Footer';
import Navbar from '../component/Navbar';
import SubDocument02 from '../component/SubDocument02';
import SubDocument03 from '../component/SubDocument03';

ReviewPjsy.propTypes = {
  data: PropTypes.object.isRequired,
};

export default function ReviewPjsy({ data }) {
  const [subdoc02_list, setSubdoc02List] = React.useState([]);
  const [subdoc03_list, setSubdoc03List] = React.useState([]);
  const router = useRouter();
  const { id } = router.query;
  const handleReviewPjsy = () => {
    // todo: 检查页面中所有select元素是否选择合理的选项（确认/未确认）

    fetch(`/api/pitchfork/detail/${id}?option=review-p_jsy`, {
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

  return (
    <div className="d-flex flex-column h-100 w-100">
      <header>
        <Navbar option="" />
      </header>
      <main className="flex-grow-1">
        <div className="container-fluid title py-4">
          <h1>值班干部签字</h1>
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
                onClick={handleReviewPjsy}
              >
                提交
              </button>
            </div>
          </div>
          <div className="w-100 my-4" />
          {!!subdoc02_list.length && (
            <div className="card shadow">
              <div className="card-header lead">一般配件更换记录表</div>
              <div className="card-body table-responsive">
                <SubDocument02
                  subdoc02_list={subdoc02_list}
                  option={['p_jsy']}
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
                  option={['p_jsy']}
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

import React from 'react';
import { useRouter } from 'next/router';

import Footer from '../component/Footer';
import Navbar from '../component/Navbar';
import SubDocument02 from '../component/SubDocument02';
import SubDocument03 from '../component/SubDocument03';

export default function ReviewPgz({ subdoc02, subdoc03 }) {
  const [subdoc02_list, setSubdoc02List] = React.useState([]);
  const [subdoc03_list, setSubdoc03List] = React.useState([]);
  const router = useRouter();
  const { id } = router.query;
  const handleReviewPgz = () => {
    // todo: 检查页面中所有select元素是否选择合理的选项（确认/未确认）

    fetch(`/api/harold/detail/${id}?option=review-p_gz`, {
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
    let ll = eval(subdoc02.subdoc02).map((current, index) => {
      return { id: index, ...current };
    });
    setSubdoc02List(ll);
  }, [subdoc02]);

  React.useEffect(() => {
    let ll = eval(subdoc03.subdoc03).map((current, index) => {
      return { id: index, ...current };
    });
    setSubdoc03List(ll);
  }, [subdoc03]);

  return (
    <div className="d-flex flex-column h-100 w-100">
      <header>
        <Navbar option="" />
      </header>
      <main className="flex-grow-1">
        <div className="container-fluid title py-4">
          <h1>工长签字</h1>
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
                onClick={handleReviewPgz}
              >
                提交
              </button>
            </div>
          </div>
          {!!subdoc02_list.length && (
            <div className="card shadow">
              <div className="card-header lead">一般配件更换记录表</div>
              <div className="card-body table-responsive">
                <SubDocument02
                  subdoc02_list={subdoc02_list}
                  handleRemove={() => {}}
                  option={['p_gz']}
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
                  handleRemove={() => {}}
                  option={['p_gz']}
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

  const response = await fetch(`${url.join('')}?option=subdoc02`);
  const subdoc02 = await response.json();

  const response3 = await fetch(`${url.join('')}?option=subdoc03`);
  const subdoc03 = await response3.json();

  return { props: { subdoc02, subdoc03 } };
}

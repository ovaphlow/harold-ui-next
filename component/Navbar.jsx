import React from 'react';
import PropTypes from 'prop-types';

export default function Navbar({ option }) {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          一体化作业
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a
                className={option === '首页' ? 'nav-link active' : 'nav-link'}
                aria-current="page"
                href="/"
              >
                <span className="fas fa-home fa-fw fa-lg" />
                首页
              </a>
            </li>
            <li className="nav-item">
              <a
                className={option === '检索' ? 'nav-link active' : 'nav-link'}
                href="filter"
              >
                <span className="fas fa-th-list fa-fw fa-lg" />
                检索
              </a>
            </li>
            <li className="nav-item">
              <a
                className={
                  option === '上传作业计划' ? 'nav-link active' : 'nav-link'
                }
                href="#"
              >
                <span className="fas fa-upload fa-fw fa-lg" />
                上传作业计划
              </a>
            </li>
            <li className="nav-item">
              <a
                className={
                  option === '新建作业申请' ? 'nav-link active' : 'nav-link'
                }
                href="detail"
              >
                <span className="fas fa-plus-circle fa-fw fa-lg" />
                新建作业申请
              </a>
            </li>
            <li className="nav-item">
              <a
                className={
                  option === '数据统计' ? 'nav-link active' : 'nav-link'
                }
                href="#"
              >
                <span className="fas fa-chart-pie fa-fw fa-lg" />
                数据统计
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  option: PropTypes.string.isRequired,
};

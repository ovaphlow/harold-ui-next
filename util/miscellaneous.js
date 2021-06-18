export function reducer(state, action) {
  if (action.type === 'set') {
    return {
      ...state,
      [action.payload.key]: action.payload.value,
    };
  } else {
    return state;
  }
}

export const PROGRESS = [
  '未审核',
  '技术员审核',
  '调度审核',
  '值班所长审核',
  '班组签字',
  '作业负责人销记',
  '监控班组签字', // 班组
  '工长签字',
  '质检签字',
  '值班干部签字', // 技术员
  '调度签字',
  '完结',
];

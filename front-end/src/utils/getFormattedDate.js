import moment from 'moment';

export default (date) => moment(date, 'YYYY-MM-DD HH:mm:ss ZZ')
  .format('DD/MM/YYYY');

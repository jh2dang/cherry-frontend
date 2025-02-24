import axios from 'axios';

const defaultInstance = axios.create({
  baseURL: 'http://ec2-3-27-168-60.ap-southeast-2.compute.amazonaws.com:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export { defaultInstance };

import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('654321', 10),
    isAdmin: true,
  },
  {
    name: 'Joe Doe',
    email: 'joe@example.com',
    password: bcrypt.hashSync('654321', 10),
  },
  {
    name: 'Collins Brown',
    email: 'collins@example.com',
    password: bcrypt.hashSync('654321', 10),
  },
];

export default users;

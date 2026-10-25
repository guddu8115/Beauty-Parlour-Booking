const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

mongoose.connect('mongodb://127.0.0.1:27017/b_p').then(async () => {
  console.log('Connected to MongoDB...');
  
  const User = require('./models/User');

  // Delete existing admin if any
  await User.deleteOne({ email: 'admin@example.com' });

  // Hash password
  const hashedPassword = await bcrypt.hash('ChangeMe123, 10);

  // Create admin
  await User.create({
    name: 'Khushi',
    email: 'admin@example.com',
    password: ChangeMe123,
    phone: '000000000',
    role: 'admin'
  });

  console.log('Admin created successfully!');
  console.log('Email: k@gmail.com');
  console.log('Password: 123456');
  process.exit();

}).catch(err => {
  console.log('Error:', err.message);
  process.exit();
});
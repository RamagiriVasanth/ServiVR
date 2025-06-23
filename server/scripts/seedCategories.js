const mongoose = require('mongoose');
const Category = require('../models/Category'); // Update path if needed
require('dotenv').config();

const categories = [
  {
    name: 'Electronics',
    icon: '🖥️',
    subcategories: [
      { name: 'Computers', icon: '💻' },
      { name: 'Home Appliances', icon: '🏠' },
      { name: 'CCTV', icon: '📹' },
      { name: 'Printers', icon: '🖨️' },
      { name: 'Smart Home Devices', icon: '🏡' },
      { name: 'Audio Systems', icon: '🎵' },
      { name: 'Other', icon: '🛠️' },
    ],
  },
  {
    name: 'Motorcycle',
    icon: '🏍️',
    subcategories: [
      { name: 'General Service', icon: '🔧' },
      { name: 'Engine Repair', icon: '🛠️' },
      { name: 'Tyres', icon: '🚲' },
      { name: 'Electrical', icon: '⚡' },
      { name: 'Body Work', icon: '🛵' },
      { name: 'Other', icon: '🛠️' },
    ],
  },
  {
    name: 'Mobile',
    icon: '📱',
    subcategories: [
      { name: 'Screen Replacement', icon: '📱' },
      { name: 'Battery Replacement', icon: '🔋' },
      { name: 'Software Issues', icon: '🛠️' },
      { name: 'Camera Repair', icon: '📷' },
      { name: 'Water Damage Repair', icon: '💧' },
      { name: 'Other', icon: '🛠️' },
    ],
  },
  {
    name: 'TV',
    icon: '📺',
    subcategories: [
      { name: 'LED Repair', icon: '💡' },
      { name: 'Remote Issues', icon: '📡' },
      { name: 'Wall Mounting', icon: '🖼️' },
      { name: 'Smart TV Setup', icon: '📡' },
      { name: 'Other', icon: '🛠️' },
    ],
  },
  {
    name: 'AC',
    icon: '❄️',
    subcategories: [
      { name: 'Installation', icon: '⚙️' },
      { name: 'Repair', icon: '🔨' },
      { name: 'Gas Filling', icon: '🧪' },
      { name: 'Maintenance', icon: '🧰' },
      { name: 'Cleaning', icon: '🧼' },
      { name: 'Other', icon: '🛠️' },
    ],
  },
  {
    name: 'Cleaning',
    icon: '🧼',
    subcategories: [
      { name: 'Home Cleaning', icon: '🧹' },
      { name: 'Bathroom', icon: '🛁' },
      { name: 'Sofa', icon: '🛋️' },
      { name: 'Carpet', icon: '🧼' },
      { name: 'Window Cleaning', icon: '🪟' },
      { name: 'Office Cleaning', icon: '🏢' },
      { name: 'Car Cleaning', icon: '🚗' },
      { name: 'Post-Construction Cleaning', icon: '🏗️' },
      { name: 'Other', icon: '🛠️' },
    ],
  },
  {
    name: 'Carpentry',
    icon: '🪚',
    subcategories: [
      { name: 'Furniture Repair', icon: '🪑' },
      { name: 'Door Fitting', icon: '🚪' },
      { name: 'Modular Kitchen', icon: '🍽️' },
      { name: 'Custom Woodwork', icon: '🛠️' },
      { name: 'Other', icon: '🛠️' },
    ],
  },
  {
    name: 'Plumbing',
    icon: '🔧',
    subcategories: [
      { name: 'Leak Fixing', icon: '💧' },
      { name: 'Tap Installation', icon: '🚰' },
      { name: 'Pipe Repair', icon: '🛠️' },
      { name: 'Drain Cleaning', icon: '🧼' },
      { name: 'Water Heater Repair', icon: '🔥' },
      { name: 'Other', icon: '🛠️' },
    ],
  },
  {
    name: 'Electrical',
    icon: '💡',
    subcategories: [
      { name: 'Fan Repair', icon: '🌀' },
      { name: 'Wiring', icon: '🔌' },
      { name: 'Switchboard Installation', icon: '🔲' },
      { name: 'Lighting Installation', icon: '💡' },
      { name: 'Generator Repair', icon: '⚡' },
      { name: 'Other', icon: '🛠️' },
    ],
  },
  {
    name: 'Painting',
    icon: '🎨',
    subcategories: [
      { name: 'Interior', icon: '🏠' },
      { name: 'Exterior', icon: '🏢' },
      { name: 'Touch-up', icon: '🎨' },
      { name: 'Waterproofing', icon: '💧' },
      { name: 'Wallpaper Installation', icon: '🖼️' },
      { name: 'Other', icon: '🛠️' },
    ],
  },
  {
    name: 'Home Security',
    icon: '🔒',
    subcategories: [
      { name: 'Alarm Systems', icon: '🚨' },
      { name: 'Security Cameras', icon: '📹' },
      { name: 'Access Control', icon: '🔑' },
      { name: 'Intercom Systems', icon: '☎️' },
      { name: 'Other', icon: '🛠️' },
    ],
  },
  {
    name: 'Gardening',
    icon: '🌿',
    subcategories: [
      { name: 'Lawn Mowing', icon: '🌱' },
      { name: 'Tree Trimming', icon: '🌳' },
      { name: 'Planting', icon: '🌷' },
      { name: 'Garden Cleanup', icon: '🧹' },
      { name: 'Irrigation System', icon: '💧' },
      { name: 'Other', icon: '🛠️' },
    ],
  },
  {
    name: 'Laundry',
    icon: '🧺',
    subcategories: [
      { name: 'Washing', icon: '🧼' },
      { name: 'Dry Cleaning', icon: '👔' },
      { name: 'Ironing', icon: '🧴' },
      { name: 'Folding', icon: '🧺' },
      { name: 'Other', icon: '🛠️' },
    ],
  },
  {
    name: 'Moving & Packing',
    icon: '📦',
    subcategories: [
      { name: 'Local Moving', icon: '🏠' },
      { name: 'Office Moving', icon: '🏢' },
      { name: 'Packing Services', icon: '📦' },
      { name: 'Loading & Unloading', icon: '🚚' },
      { name: 'Storage Services', icon: '🏬' },
      { name: 'Other', icon: '🛠️' },
    ],
  },
  {
    name: 'Appliance Repair',
    icon: '🔌',
    subcategories: [
      { name: 'Washing Machine', icon: '🧺' },
      { name: 'Refrigerator', icon: '🧊' },
      { name: 'Microwave Oven', icon: '🍽️' },
      { name: 'Water Purifier', icon: '💧' },
      { name: 'Dishwasher', icon: '🍽️' },
      { name: 'Other', icon: '🛠️' },
    ],
  },
  {
    name: 'Beauty & Wellness',
    icon: '💄',
    subcategories: [
      { name: 'Salon at Home', icon: '💇‍♀️' },
      { name: 'Massage Therapy', icon: '💆‍♂️' },
      { name: 'Yoga Instructor', icon: '🧘‍♀️' },
      { name: 'Makeup Artist', icon: '💅' },
      { name: 'Personal Trainer', icon: '🏋️‍♂️' },
      { name: 'Other', icon: '🛠️' },
    ],
  },
  {
    name: 'Home Renovation',
    icon: '🏗️',
    subcategories: [
      { name: 'Flooring', icon: '🪵' },
      { name: 'Ceiling Repair', icon: '🛠️' },
      { name: 'Wall Repair', icon: '🧱' },
      { name: 'Kitchen Remodeling', icon: '🍳' },
      { name: 'Bathroom Remodeling', icon: '🛁' },
      { name: 'Other', icon: '🛠️' },
    ],
  },
  {
    name: 'Event Services',
    icon: '🎉',
    subcategories: [
      { name: 'Catering', icon: '🍽️' },
      { name: 'Photography', icon: '📸' },
      { name: 'Decoration', icon: '🎈' },
      { name: 'DJ Services', icon: '🎧' },
      { name: 'Event Planning', icon: '📋' },
      { name: 'Other', icon: '🛠️' },
    ],
  },
];

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    await Category.deleteMany(); // Clear existing categories (optional)
    await Category.insertMany(categories);
    console.log('✅ Categories inserted!');
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err);
  });

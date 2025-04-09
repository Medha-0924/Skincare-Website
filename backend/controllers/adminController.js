// const Order = require('../models/Order');

// exports.getOrders = async (req, res) => {
//   try {
//     const { page = 1, search = '', status = '', sortBy = '' } = req.query;
//     const limit = 10;
//     const skip = (page - 1) * limit;

//     let query = {};
//     if (search) {
//       query.$or = [
//         { _id: { $regex: search, $options: 'i' } },
//         { userId: { $regex: search, $options: 'i' } },
//       ];
//     }
//     if (status) {
//       query.status = status;
//     }

//     let sort = {};
//     if (sortBy) {
//       const [field, order] = sortBy.split(':');
//       sort[field] = order === 'desc' ? -1 : 1;
//     } else {
//       sort = { orderDate: -1 };
//     }

//     const orders = await Order.find(query)
//       .sort(sort)
//       .skip(skip)
//       .limit(limit);

//     const totalOrders = await Order.countDocuments(query);
//     const totalPages = Math.ceil(totalOrders / limit);

//     res.json({
//       orders,
//       totalPages,
//       currentPage: parseInt(page),
//     });
//   } catch (error) {
//     console.error('Error fetching orders:', error);
//     res.status(500).json({ message: 'Error fetching orders', error: error.message });
//   }
// };

// exports.getOrderStats = async (req, res) => {
//   try {
//     const totalRevenue = await Order.aggregate([
//       { $group: { _id: null, total: { $sum: '$totalAmount' } } }
//     ]);

//     const totalOrders = await Order.countDocuments();

//     const ordersByStatus = await Order.aggregate([
//       { $group: { _id: '$status', count: { $sum: 1 } } }
//     ]);

//     const uniqueCustomers = await Order.distinct('userId').length;

//     res.json({
//       totalRevenue: totalRevenue[0]?.total || 0,
//       totalOrders,
//       ordersByStatus,
//       uniqueCustomers,
//     });
//   } catch (error) {
//     console.error('Error fetching order stats:', error);
//     res.status(500).json({ message: 'Error fetching order stats', error: error.message });
//   }
// };

// exports.updateOrderStatus = async (req, res) => {
//   try {
//     const { orderId } = req.params;
//     const { status } = req.body;

//     const updatedOrder = await Order.findByIdAndUpdate(
//       orderId,
//       { status },
//       { new: true }
//     );

//     if (!updatedOrder) {
//       return res.status(404).json({ message: 'Order not found' });
//     }

//     res.json(updatedOrder);
//   } catch (error) {
//     console.error('Error updating order status:', error);
//     res.status(500).json({ message: 'Error updating order status', error: error.message });
//   }
// };



const Order = require('../models/Order');

exports.getOrders = async (req, res) => {
  try {
    const { page = 1, search = '', status = '', sortBy = '' } = req.query;
    const limit = 10;
    const skip = (page - 1) * limit;

    let query = {};
    if (search) {
      query.$or = [
        { _id: { $regex: search, $options: 'i' } },
        { userId: { $regex: search, $options: 'i' } },
      ];
    }
    if (status) {
      query.status = status;
    }

    let sort = {};
    if (sortBy) {
      const [field, order] = sortBy.split(':');
      sort[field] = order === 'desc' ? -1 : 1;
    } else {
      sort = { orderDate: -1 };
    }

    const orders = await Order.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const totalOrders = await Order.countDocuments(query);
    const totalPages = Math.ceil(totalOrders / limit);

    res.json({
      orders,
      totalPages,
      currentPage: parseInt(page),
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
};

exports.getOrderStats = async (req, res) => {
  try {
    const totalRevenue = await Order.aggregate([
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);

    const totalOrders = await Order.countDocuments();

    const ordersByStatus = await Order.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    const uniqueCustomers = await Order.distinct('userId').length;

    const topProducts = await Order.aggregate([
      { $unwind: '$items' },
      { $group: { _id: '$items.name', sales: { $sum: '$items.quantity' } } },
      { $sort: { sales: -1 } },
      { $limit: 5 },
      { $project: { _id: 0, name: '$_id', sales: 1 } }
    ]);

    const monthlyRevenue = await Order.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m', date: '$orderDate' } },
          revenue: { $sum: '$totalAmount' }
        }
      },
      { $sort: { _id: 1 } },
      { $project: { _id: 0, month: '$_id', revenue: 1 } }
    ]);

    res.json({
      totalRevenue: totalRevenue[0]?.total || 0,
      totalOrders,
      ordersByStatus,
      uniqueCustomers,
      topProducts,
      monthlyRevenue
    });
  } catch (error) {
    console.error('Error fetching order stats:', error);
    res.status(500).json({ message: 'Error fetching order stats', error: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(updatedOrder);
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Error updating order status', error: error.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ message: 'Error deleting order', error: error.message });
  }
};


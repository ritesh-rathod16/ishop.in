import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';
import { sendOrderEmail, OrderDetails } from '@/lib/emailService';

function formatOrderForEmail(order: any): OrderDetails {
  const address = order.shippingAddress;
  return {
    orderId: order.orderId,
    customerName: order.customerName,
    customerEmail: order.customerEmail,
    customerPhone: order.customerPhone,
    shippingAddress: `${address.addressLine1}${address.addressLine2 ? ', ' + address.addressLine2 : ''}, ${address.city}, ${address.state} - ${address.pincode}`,
    items: order.items.map((item: any) => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      image: item.image,
    })),
    subtotal: order.subtotal,
    shipping: order.shipping,
    tax: order.tax,
    total: order.total,
    paymentMethod: order.paymentMethod,
    orderDate: new Date(order.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
    estimatedDelivery: order.estimatedDelivery,
    trackingNumber: order.trackingNumber,
    trackingUrl: order.trackingUrl,
    status: order.status,
    cancellationReason: order.cancellationReason,
    refundAmount: order.refundAmount,
  };
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const search = searchParams.get('search');

    const query: any = {};
    if (status && status !== 'all') {
      query.status = status;
    }
    if (search) {
      query.$or = [
        { orderId: { $regex: search, $options: 'i' } },
        { customerName: { $regex: search, $options: 'i' } },
        { customerEmail: { $regex: search, $options: 'i' } },
      ];
    }

    const total = await Order.countDocuments(query);
    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const stats = await Order.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    const statusCounts = stats.reduce((acc: any, curr: any) => {
      acc[curr._id] = curr.count;
      return acc;
    }, {});

    return NextResponse.json({
      success: true,
      orders,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
      stats: statusCounts,
    });
  } catch (error: any) {
    console.error('Get orders error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();

    const subtotal = body.items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal >= 499 ? 0 : 40;
    const tax = Math.round(subtotal * 0.18);
    const total = subtotal + shipping + tax - (body.discount || 0);

    const order = await Order.create({
      ...body,
      subtotal,
      shipping,
      tax,
      total,
      status: 'placed',
      paymentStatus: body.paymentMethod === 'COD' ? 'pending' : 'paid',
      statusHistory: [{
        status: 'placed',
        timestamp: new Date(),
        note: 'Order placed successfully',
      }],
      estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      }),
    });

    const emailData = formatOrderForEmail(order);
    await sendOrderEmail(emailData, 'placed');

    return NextResponse.json({
      success: true,
      message: 'Order placed successfully',
      order: {
        orderId: order.orderId,
        total: order.total,
        status: order.status,
      },
    });
  } catch (error: any) {
    console.error('Create order error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

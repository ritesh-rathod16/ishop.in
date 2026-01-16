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

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    
    const order = await Order.findOne({ 
      $or: [{ orderId: id }, { _id: id }] 
    }).lean();

    if (!order) {
      return NextResponse.json({ success: false, message: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, order });
  } catch (error: any) {
    console.error('Get order error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();
    const { status, trackingNumber, trackingUrl, cancellationReason, sendEmail = true, note } = body;

    const order = await Order.findOne({ 
      $or: [{ orderId: id }, { _id: id }] 
    });

    if (!order) {
      return NextResponse.json({ success: false, message: 'Order not found' }, { status: 404 });
    }

    const oldStatus = order.status;
    const validTransitions: Record<string, string[]> = {
      'placed': ['confirmed', 'cancelled'],
      'confirmed': ['processing', 'cancelled'],
      'processing': ['shipped', 'cancelled'],
      'shipped': ['out_for_delivery', 'cancelled'],
      'out_for_delivery': ['delivered', 'cancelled'],
      'delivered': ['returned'],
      'cancelled': [],
      'returned': ['refunded'],
      'refunded': [],
    };

    if (status && status !== oldStatus) {
      if (!validTransitions[oldStatus]?.includes(status)) {
        return NextResponse.json({ 
          success: false, 
          message: `Cannot transition from ${oldStatus} to ${status}` 
        }, { status: 400 });
      }

      order.status = status;
      order.statusHistory.push({
        status,
        timestamp: new Date(),
        note: note || `Status updated to ${status}`,
        updatedBy: 'admin',
      });

      if (status === 'delivered') {
        order.deliveredAt = new Date();
        if (order.paymentMethod === 'COD') {
          order.paymentStatus = 'paid';
        }
      }

      if (status === 'cancelled') {
        order.cancellationReason = cancellationReason;
        if (order.paymentStatus === 'paid' && order.paymentMethod !== 'COD') {
          order.refundStatus = 'pending';
          order.refundAmount = order.total;
        }
      }

      if (status === 'refunded') {
        order.paymentStatus = 'refunded';
        order.refundStatus = 'completed';
      }
    }

    if (trackingNumber) order.trackingNumber = trackingNumber;
    if (trackingUrl) order.trackingUrl = trackingUrl;

    await order.save();

    if (sendEmail && status && status !== oldStatus) {
      const emailData = formatOrderForEmail(order);
      const emailType = status === 'out_for_delivery' ? 'out_for_delivery' : status;
      
      if (['shipped', 'out_for_delivery', 'delivered', 'cancelled', 'refunded'].includes(status)) {
        await sendOrderEmail(emailData, emailType as any);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Order ${status ? `status updated to ${status}` : 'updated'}`,
      order: {
        orderId: order.orderId,
        status: order.status,
        updatedAt: order.updatedAt,
      },
    });
  } catch (error: any) {
    console.error('Update order error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
